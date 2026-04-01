const Transaction = require('../models/Transaction');
const Media = require('../models/Media');

const checkAvailability = async (req, res) => {
    try {
        const { query } = req.query; 
        if (!query) return res.status(400).json({ message: 'Search query required' });

        const media = await Media.find({
            title: { $regex: query, $options: 'i' },
            isAvailable: true
        });
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const issueMedia = async (req, res) => {
    try {
        const { mediaId, memberId, issueDate, returnDate, remarks } = req.body;

        const media = await Media.findById(mediaId);
        if (!media) return res.status(404).json({ message: 'Media not found' });
        if (!media.isAvailable) return res.status(400).json({ message: 'Media is not available' });

        const iDate = new Date(issueDate);
        iDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (iDate < today) {
            return res.status(400).json({ message: 'Issue date cannot be in the past' });
        }

        const rDate = new Date(returnDate);
        const diffDays = Math.ceil((rDate - iDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 15) {
            return res.status(400).json({ message: 'Return date cannot exceed 15 days from issue date' });
        }
        if (diffDays < 0) {
            return res.status(400).json({ message: 'Return date cannot be before issue date' });
        }

        const transaction = await Transaction.create({
            mediaId, memberId, issueDate: iDate, returnDate: rDate, remarks
        });

        media.isAvailable = false;
        await media.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactionBySerialNo = async (req, res) => {
    try {
        const { serialNo } = req.params;
        const media = await Media.findOne({ serialNo });
        if (!media) return res.status(404).json({ message: 'Media not found' });

        const transaction = await Transaction.findOne({ mediaId: media._id, status: 'issued' }).populate('mediaId');
        if (!transaction) return res.status(404).json({ message: 'No active issue found for this media' });

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const returnMedia = async (req, res) => {
    try {
        const { transactionId, actualReturnDate } = req.body;

        const transaction = await Transaction.findById(transactionId).populate('mediaId');
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        if (transaction.status === 'returned') return res.status(400).json({ message: 'Already returned' });

        const rDate = new Date(actualReturnDate);
        const expectedDate = new Date(transaction.returnDate);

        // Calculate fine (e.g., $1 or Rs.10 per day overdue)
        let fineAmount = 0;
        if (rDate > expectedDate) {
            const diffDays = Math.ceil((rDate - expectedDate) / (1000 * 60 * 60 * 24));
            fineAmount = diffDays * 10; // Rs. 10 per day
        }

        transaction.actualReturnDate = rDate;
        transaction.fineAmount = fineAmount;
        transaction.status = 'returned';

        await transaction.save();

        const media = await Media.findById(transaction.mediaId._id);
        media.isAvailable = true;
        await media.save();

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const payFine = async (req, res) => {
    try {
        const { transactionId, remarks } = req.body;
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        if (transaction.fineAmount > 0 && !transaction.finePaid) {
            transaction.finePaid = true;
            transaction.remarks = remarks ? (transaction.remarks ? transaction.remarks + ' | ' + remarks : remarks) : transaction.remarks;
            await transaction.save();
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    checkAvailability,
    issueMedia,
    getTransactionBySerialNo,
    returnMedia,
    payFine
};

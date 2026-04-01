const Transaction = require('../models/Transaction');
const Membership = require('../models/Membership');
const Media = require('../models/Media');

const getActiveIssues = async (req, res) => {
    try {
        const issues = await Transaction.find({ status: 'issued' }).populate('mediaId');
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find({});
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMediaMasterList = async (req, res) => {
    try {
        const { type } = req.query; // 'book' or 'movie'
        const filter = type ? { type } : {};
        const media = await Media.find(filter);
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOverdueReturns = async (req, res) => {
    try {
        const today = new Date();
        const overdue = await Transaction.find({
            status: 'issued',
            returnDate: { $lt: today }
        }).populate('mediaId');
        res.json(overdue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getActiveIssues,
    getMemberships,
    getMediaMasterList,
    getOverdueReturns
};

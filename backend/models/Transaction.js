const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    mediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    },
    memberId: {
       
        type: String,
        required: false
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: true
    },
    actualReturnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['issued', 'returned'],
        default: 'issued'
    },
    remarks: {
        type: String
    },
    fineAmount: {
        type: Number,
        default: 0
    },
    finePaid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);

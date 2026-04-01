const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    mediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    },
    memberId: {
        // We will store the actual membership number or user name depending on the logic, 
        // to keep it simple let's just use string to represent who took it, or reference a Membership object. 
        // Since prompt says "Return Book: On confirm -> redirect to Fine Payment" - 
        // we probably don't even strictly need to link to membership for normal transactions, 
        // but let's link to Membership for consistency, or just keep string "userId".
        type: String,
        required: false
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate: {
        type: Date, // Expected return date (max 15 days from issueDate)
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

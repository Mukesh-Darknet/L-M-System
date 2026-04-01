const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in months: 6, 12, 24
        required: true,
        default: 6
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);

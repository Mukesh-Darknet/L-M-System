const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['book', 'movie'],
        required: true,
        default: 'book'
    },
    title: {
        type: String,
        required: true
    },
    authorOrDirector: {
        type: String,
        required: true
    },
    serialNo: {
        type: String,
        required: true,
        unique: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);

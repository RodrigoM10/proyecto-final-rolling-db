const mongoose = require('mongoose');
const MensajesSchema = mongoose.Schema({
    senderName: {
        type: String,
        required: true,
        trim: true,
    },
    senderEmail: {
        type: String,
        required: true,
        trim: true,
    },
    messege: {
        type: String,
        required: true,
        trim: true,
    },
    select: {
        type: String,
        trim: true,
    },
    checkbox: {
        type: Boolean,
    },
    register: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Mensaje', MensajesSchema);

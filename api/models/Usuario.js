const mongoose = require('mongoose');
const UsuariosSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    birthday: {
        day: {
            type: Number,
            required: true,
            trim: true,
        },
        month: {
            type: Number,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now(),
    },
    select: {
        type: Number,
        trim: true,
    },
    checkbox: {
        type: Boolean,
    },
});

module.exports = mongoose.model('Usuario', UsuariosSchema);

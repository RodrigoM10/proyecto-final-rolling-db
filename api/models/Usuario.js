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
        type: Date,
        required: true,
        default: Date.now(),
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    register: {
        type: Date,
        default: Date.now(),
    },
    role: {
        type: String,
        default: 'user',
        trime: true,
    },
    image: {
        type: String,
        trime: true,
    },
});

module.exports = mongoose.model('Usuario', UsuariosSchema);

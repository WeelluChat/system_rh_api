const mongoose = require('mongoose');

const userGlobal = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    typeUser: {
        type: String,
        enum: ['Admin_global'],
        default: 'Admin_global',
    }
})

module.exports = mongoose.model('UserGlobal', userGlobal);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idEmpresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true,
    },
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
    dateSend: {
        type: Date,
        default: Date.now,
    },
    typeUser: {
        type: String,
        enum: ['Operador', "Admin"],
        default: 'Operador',
    }
})

module.exports = mongoose.model('User', userSchema);
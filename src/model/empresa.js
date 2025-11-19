const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    nameFantasia: {
        type: String,
        required: true,
    },
    razaoSocial: {
        type: String,
        required: true,
    },
    cnpj: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Empresa', empresaSchema);

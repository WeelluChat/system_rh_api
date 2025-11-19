const mongoose = require("mongoose");
const formularioSchema = require('../model/formulario')

const candidateModel = new mongoose.Schema({
    idEmpresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    vaga: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    expectativaSalary: {
        type: Number,
        required: true,
    },
    ageExperience: {
        type: String,
        required: true,
    },
    dataEntrevista: {
        type: Date,
        required: true
    },
    chamadoIntrevista: {
        type: Boolean,
        required: false,
        default: false,
    },
    descricaoUser: {
        type: String,
        required: false,
        default: false
    },
    curriculoLink: {
        type: String,
        required: false,
    },
    formulario: [formularioSchema]
})

module.exports = mongoose.model('Candidate', candidateModel);
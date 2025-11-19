const mongoose = require("mongoose");

const formularioModel = new mongoose.Schema({
    comunication: {
        type: String,
        required: false
    },
    postura: {
        type: String,
        required: false
    },
    habilidades: {
        type: String,
        required: false
    },
    experiencia: {
        type: String,
        required: false
    },
    capacidade: {
        type: String,
        required: false
    },
    adequacao: {
        type: String,
        required: false
    },
    motivacao: {
        type: String,
        required: false
    },
    trabalho: {
        type: String,
        required: false
    },
    lideranca: {
        type: String,
        required: false
    },
    pontualidade: {
        type: String,
        required: false
    }
});

module.exports = formularioModel;
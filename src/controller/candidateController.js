const Candidate = require("../model/candidateModel");
const mongoose = require("mongoose")

exports.getAllCandidates = async (req, res) => {
    try {
        const idParaFiltrar = req.companyId || (req.user && req.user.idEmpresa);

        if (!idParaFiltrar) {
            return res.status(403).json({
                message: "ERRO CRÍTICO: ID da empresa não encontrado. Busca cancelada para evitar vazamento de dados."
            });
        }
        const objectIdEmpresa = new mongoose.Types.ObjectId(idParaFiltrar);

        const candidatesAll = await Candidate.find({
            idEmpresa: objectIdEmpresa
        });

        console.log(`Encontrados ${candidatesAll.length} candidatos para a empresa ${idParaFiltrar}`);

        res.status(200).json(candidatesAll);

    } catch (error) {
        console.error("Erro no getAllCandidates:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.createCandidates = async (req, res) => {
    try {
        const empresaId = req.companyId || (req.user && req.user.idEmpresa);

        if (!empresaId) {
            return res.status(403).json({ message: "Erro: Empresa não identificada para criar candidato." });
        }

        const {
            name, email, phone, vaga, status, expectativaSalary,
            ageExperience, dataEntrevista, chamadoIntrevista,
            descricaoUser, curriculoLink
        } = req.body;

        const newCandidate = await Candidate.create({
            name,
            email,
            phone,
            vaga,
            status,
            expectativaSalary,
            ageExperience,
            dataEntrevista,
            chamadoIntrevista,
            descricaoUser,
            curriculoLink,
            idEmpresa: empresaId
        });

        res.status(201).json({
            message: "Candidato criado com sucesso!",
            newCandidate
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
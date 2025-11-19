const canditate = require("../model/candidateModel");

exports.getAllCandidates = async (req, res) => {
    try {
        const candidatesAll = await canditate.find();
        res.status(200).json(candidatesAll)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

exports.createCandidates = async (req, res) => {
    const { name, email, phone, vaga, status, expectativaSalary, ageExperience, dataEntrevista, chamadoIntrevista, descricaoUser, curriculoLink } = req.body;
    try {
        const newCandidate = new canditate({
            name,
            email,
            phone,
            vaga,
            status,
            expectativaSalary,
            ageExperience,
            dataEntrevista,
            chamadoIntrevista, descricaoUser, curriculoLink
        });
        await newCandidate.save();
        res.status(200).json({ message: "Usuario criado com sucesso!", newCandidate: canditate })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

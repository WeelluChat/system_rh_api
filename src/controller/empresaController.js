const empresa = require("../model/empresa");

exports.GetAllEmpresas = async (req, res) => {
    try {
        const empresas = await empresa.find();
        res.status(200).json(empresas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createEmpresa = async (req, res) => {
    try {
        const empresaExists = await empresa.findOne({
            cnpj: req.body.cnpj
        })
        if (empresaExists) {
            return res.status(400).json({ message: "Empresa já cadastrada" })
        }
        const { nameFantasia, razaoSocial, cnpj, email } = req.body;
        const novaEmpresa = new empresa({
            nameFantasia,
            razaoSocial,
            cnpj,
            email
        })
        await novaEmpresa.save();
        res.status(201).json(novaEmpresa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
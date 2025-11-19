const jwt = require("jsonwebtoken");
const Empresa = require("../model/empresa");
const User = require("../model/usersModel");

async function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "Token não encontrado" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Usuário inválido" });
        }

        const empresa = await Empresa.findById(decoded.idEmpresa);
        if (!empresa) {
            return res.status(404).json({ message: "Empresa não encontrada" });
        }

        req.user = user;
        req.empresa = empresa;
        req.userId = user._id;
        req.companyId = empresa._id;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Token expirado ou inválido" });
    }
}

module.exports = auth;

const users = require("../model/usersModel");
const userGlobal = require("../model/userGlobalModel");
const bcrypt = require("bcryptjs");
const Empresa = require("../model/empresa");

exports.getUsers = async (req, res) => {
    try {
        const userList = await users.find().populate("idEmpresa", "_id");
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { idEmpresa, user, email, password, typeUser } = req.body;

    try {
        const empresaEncontrada = await Empresa.findById(idEmpresa);
        if (!empresaEncontrada) {
            return res.status(404).json({ message: "Empresa não encontrada" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const novoUsuario = new users({
            idEmpresa,
            user,
            email,
            password: hashedPassword,
            typeUser,
        });

        await novoUsuario.save();
        res.status(201).json({
            message: "Usuário criado com sucesso",
            usuario: novoUsuario,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUserGlobal = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createUserGlobal = new userGlobal({
            user: req.body.user,
            email: req.body.email,
            password: hashedPassword,
            dateSend: req.body.dateSend,
            typeUser: req.body.typeUser,
        });

        await createUserGlobal.save();
        res.status(200).json(createUserGlobal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

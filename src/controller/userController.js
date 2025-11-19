const users = require("../model/usersModel");
const userGlobal = require("../model/userGlobalModel");
const bcrypt = require("bcryptjs");
const Empresa = require("../model/empresa");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
    try {
        const userList = await users
            .find()
            .select("-password");

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

        const usuarioSeguro = novoUsuario.toObject();
        delete usuarioSeguro.password;

        res.status(201).json({
            message: "Usuário criado com sucesso",
            usuario: usuarioSeguro,
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario não encontrado!" });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ message: "Senha incorreta!" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                idEmpresa: user.idEmpresa
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userSafe = user.toObject();
        delete userSafe.password;

        res.status(200).json({
            message: "Login realizado",
            token,
            user: userSafe
        });

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

        const safe = createUserGlobal.toObject();
        delete safe.password;

        res.status(200).json(safe);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUserGlobal = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userGlobal.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuário Global não encontrado!" });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ message: "Senha incorreta!" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                global: true
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userSafe = user.toObject();
        delete userSafe.password;

        res.status(200).json({
            message: "Login Global realizado",
            token,
            user: userSafe
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

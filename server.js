const mongoose = require('mongoose');
const express = require("express");
const users = require("./src/controller/userController");
const cors = require('cors');
const empresas = require("./src/controller/empresaController");
const candidate = require("./src/controller/candidateController");
const auth = require("./src/middleware/middleware_token");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ------------------- USUARIOS --------------------

app.post("/user-login", users.userLogin);
app.post("/user-create", users.createUser);
app.post("/user-global-create", users.createUserGlobal);
app.get("/users", users.getUsers);

// ------------------- EMPRESA ---------------------

app.post("/empresa-create", empresas.createEmpresa);
app.get("/empresas", empresas.GetAllEmpresas);

// ------------------- CANDIDATOS ------------------

app.get('/candidates', auth, candidate.getAllCandidates);
app.post('/candidates-create', auth, candidate.createCandidates);

// -------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/system_rh", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

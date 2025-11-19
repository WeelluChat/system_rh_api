const mongoose = require('mongoose');
const express = require("express");
const users = require("./src/controller/userController");
const cors = require('cors');
const empresas = require("./src/controller/empresaController");
const candidate = require("./src/controller/candidateController")
const app = express();
app.use(express.json(
    {
        limit: '500mb'
    }
));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// USUARIOS
app.get("/users", users.getUsers);
app.post("/user-create", users.createUser);
app.post("/user-global-create", users.createUserGlobal);
app.post("/user-login", users.loginUser)
// USUARIOS

// EMPRESA
app.post("/empresa-create", empresas.createEmpresa);
app.get("/empresas", empresas.GetAllEmpresas);
// EMPRESA

// CANDIDATES
app.get('/candidates', candidate.getAllCandidates);
app.post('/candidates-create', candidate.createCandidates)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/system_rh", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar no MongoDB:", err));


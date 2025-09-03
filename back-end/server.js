const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// conecta ao banco SQLite
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

// cria tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`);

// rota de cadastro
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  const sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
  db.run(sql, [nome, email, senha], function (err) {
    if (err) {
      console.error("Erro ao inserir:", err.message);
      return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
    res.json({ message: "Usuário cadastrado com sucesso!", id: this.lastID });
    
  });
});

// rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // validação de email e senha //
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!email || !emailRegex.test(email)) {
    return res.status(400).json({ sucess: false,message: "Email inválido!" });
  }

  if (!senha || senha.length < 6) {
    return res.status(400).json({ sucess: false,message: "Senha inválida!" });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND senha = ?";
  db.get(sql, [email, senha], (err, row) => {
    if (err) {
      return res.status(500).json({ sucess: false, message: "Erro no servidor." });
    }
    if (!row) {
      return res.status(401).json({ sucess: false, message: "Credenciais inválidas!" });
    }
    res.json({ sucess: true, message: "Login bem-sucedido!", user: row });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

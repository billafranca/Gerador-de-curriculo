const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// conecta no sqlite, lembrar de usar node server.js pra conectar //
const db = new sqlite3.Database("users.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

// cria tabela no banco de dados e relaciona com users.db
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`);

// rota de cadastro
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido!" });
    }

    // Validação de senha
    if (senha.length < 6) {
      return res.status(400).json({ message: "Senha deve ter pelo menos 6 caracteres!" });
    }

    // Criptografa a senha ANTES de salvar
    const hashedPassword = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
    db.run(sql, [nome, email, hashedPassword], function (err) {
      if (err) {
        console.error("Erro ao inserir:", err.message);
        return res.status(500).json({ message: "Erro ao cadastrar usuário." });
      }
      res.json({ message: "Usuário cadastrado com sucesso!", id: this.lastID });
    });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ success: false, message: "Preencha todos os campos!" });
  }
  // consulta o usuário pelo email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro no servidor." });
    }
    if (!row) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas!" });
    }

  // isso aqui compara a senha hashada (criptografada) com a senha digitada //
    const senhaCorreta = await bcrypt.compare(senha, row.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas!" });
    }

    res.json({
      success: true,
      message: "Login bem-sucedido!",
      user: { id: row.id, nome: row.nome, email: row.email } // nunca mande a senha de volta
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

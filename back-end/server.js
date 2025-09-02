const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Configura o servidor Express
const app = express();
const port = 3000;

// Configura o body-parser para interpretar dados JSON
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário
    password: '', // Substitua pela sua senha
    database: 'gerador' // Banco de dados que você criou
});

// Verifica a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro de conexão com o banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

// Rota para cadastrar usuário
app.post('/cadastrar', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
        return res.json({ message: 'Preencha todos os campos!' });
    }

    // Verifica se o nome de usuário já existe no banco
    const queryCheck = 'SELECT id FROM usuarios WHERE nome = ?';
    db.execute(queryCheck, [nome], (err, result) => {
        if (err) {
            return res.json({ message: 'Erro ao verificar usuário: ' + err });
        }
        if (result.length > 0) {
            return res.json({ message: `Erro: usuário '${nome}' já existe!` });
        }

        // Caso o nome de usuário não exista, insere o novo usuário no banco
        const queryInsert = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        db.execute(queryInsert, [nome, email, senha], (err, result) => {
            if (err) {
                return res.json({ message: 'Erro ao cadastrar: ' + err });
            }
            res.json({ message: 'Cadastro realizado com sucesso!' });
        });
    });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

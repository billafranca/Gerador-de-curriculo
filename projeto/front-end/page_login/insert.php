<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$senha_usuario = $_POST['senha'] ?? '';

if (!empty($nome) && !empty($email) && !empty($senha_usuario)) {

    $host = 'localhost';
    $username = 'root';
    $senha_db = ''; // senha do MySQL
    $dbnome = 'gerador';

    $con = new mysqli($host, $username, $senha_db, $dbnome);

    if ($con->connect_error) {
        die("Erro de conexão: " . $con->connect_error);
    }

    $SELECT_QUERY = "SELECT nome FROM cadastro WHERE nome = ?";
    $INSERT_QUERY = "INSERT INTO cadastro (nome, email, senha) VALUES (?, ?, ?)";

    $stmt_select = $con->prepare($SELECT_QUERY);
    if (!$stmt_select) {
        die("Erro ao preparar SELECT: " . $con->error);
    }

    $stmt_select->bind_param("s", $nome);
    $stmt_select->execute();
    $stmt_select->store_result();

    if ($stmt_select->num_rows == 0) {
        $stmt_select->close();

        $stmt_insert = $con->prepare($INSERT_QUERY);
        if (!$stmt_insert) {
            die("Erro ao preparar INSERT: " . $con->error);
        }

        $stmt_insert->bind_param("sss", $nome, $email, $senha_usuario);
        $stmt_insert->execute();

        echo "boa men";
        $stmt_insert->close();
    } else {
        echo "erro: '$nome' já está registrado!";
        $stmt_select->close();
    }

    $con->close();
} else {
    echo "Preencha todos os campos!";
}
?>

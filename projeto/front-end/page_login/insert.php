<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if(isset($_POST['nome'], $_POST['email'], $_POST['senha'])) {

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Conexão com o banco
    $con = new mysqli('localhost', 'root', '', 'gerador');

    if($con->connect_error) {
        die("Erro de conexão: " . $con->connect_error);
    }

    // Verifica se já existe
    $sql = $con->prepare("SELECT id FROM usuarios WHERE nome = ?");
    $sql->bind_param("s", $nome);
    $sql->execute();
    $sql->store_result();

    if($sql->num_rows > 0){
        echo "Erro: usuário '$nome' já existe!";
        $sql->close();
    } else {
        $sql->close();
        // Insere no banco
        $ins = $con->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
        $ins->bind_param("sss", $nome, $email, $senha);

        if($ins->execute()){
            echo "Cadastro realizado com sucesso!";
        } else {
            echo "Erro ao cadastrar: " . $ins->error;
        }
        $ins->close();
    }

    $con->close();

} else {
    echo "Preencha todos os campos!";
}
?>

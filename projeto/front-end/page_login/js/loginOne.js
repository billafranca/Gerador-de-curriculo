// Quando o formulário for enviado
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio normal do formulário

    // Coleta os valores do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Prepara os dados para enviar para o servidor
    const dados = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Envia os dados para a rota correta do servidor
    fetch('http://localhost:3000/cadastro', {  // rota do backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Exibe a mensagem de sucesso ou erro

        // Se o cadastro deu certo (tem ID), redireciona para a página de ícones
        if (data.id) {
            window.location.href = '../page_icones/src/page_icones.html';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar usuário!');
    });
});

// 1️⃣ Listener do formulário
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // impede envio normal

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const dados = { nome, email, senha };

    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.id) {
            window.location.href = '../page_icones/src/page_icones.html';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar usuário!');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('home');
    const sobreLink = document.getElementById('sobre');
    const contatoLink = document.getElementById('contato');

    homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Redirecionando para a home page...');
        window.location.href = '../../front-end/page_entrada/page_entrada.html';
    });

    sobreLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    contatoLink.addEventListener('click', function(event) {
        event.preventDefault();
        let escolha = prompt(
            "Entre em contato com os desenvolvedores do projeto:\n" +
            "Digite 1 para Pedro Billafranca\n" +
            "Digite 2 para Lucas Rabello"
        );

        if (!escolha) return;
        escolha = escolha.trim();

        if (escolha === "1") {
            alert("Redirecionando para o GitHub de Pedro Billafranca...");
            window.location.href = "https://github.com/billafranca";
        } else if (escolha === "2") {
            alert("Redirecionando para o GitHub de Lucas Rabello...");
            window.location.href = "https://github.com/lucas-rabello-dev";
        } else {
            alert("Opção inválida. Tente novamente.");
        }
    });
});

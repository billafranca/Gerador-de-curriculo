document.addEventListener('DOMContentLoaded', function () {
    let homeLink = document.getElementById('home');
    let sobreLink = document.getElementById('sobre');
    let contatoLink = document.getElementById('contato');

    let form = document.getElementById('formulario');

    form.addEventListener('submit', function (event) {
        event.preventDefault();


        let nome = document.getElementById('nome').value.trim();
        let email = document.getElementById('email').value.trim();

        if (nome === '' || email === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        alert('login realizado, redirecionando... ');
        window.location.href = '../page_icones/src/page_icones.html';

    });

    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '../page_entrada/page_entrada.html';
        alert('redirecionando a home page...');
    });

    sobreLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    });


contatoLink.addEventListener('click', function (event) {
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

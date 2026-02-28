document.addEventListener('DOMContentLoaded', function () {
    let homeLink = document.getElementById('home');
    let sobreLink = document.getElementById('sobre');
    let btn = document.getElementById('btnComecar');
    let contatoLink = document.getElementById("contato");

    btn.addEventListener("click", function (event) {
        event.preventDefault();
        alert("redirecionando...");
        window.location.href = 'gerador.html';
    })

    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        alert('redirecionando para a home page ...');
        window.location.href = 'index.html';
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
    }})

});
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("botaoCadastro");
    let sobreLink = document.getElementById("sobre");
    let homeLink = document.getElementById("home");
    let contatoLink = document.getElementById("contato");

    homeLink.addEventListener('click', function (event) {
        alert("você está na página inicial!");
    });

    btn.addEventListener("click", function () {
        window.location.href = "login.html";
    })

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
    })
});
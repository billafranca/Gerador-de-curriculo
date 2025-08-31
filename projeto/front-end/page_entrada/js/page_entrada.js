document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("botaoCadastro");
    let sobreLink = document.getElementById("sobre");
    let homeLink = document.getElementById("home");

    homeLink.addEventListener('click', function (event) {
        alert("você está na página inicial!");
    });

    btn.addEventListener("click", function () {
        window.location.href = "../page_login/loginOne.html";
    })

    sobreLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

});
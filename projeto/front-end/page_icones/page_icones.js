document.addEventListener('DOMContentLoaded', function () {
    let homeLink = document.getElementById('home');
    let sobreLink = document.getElementById('sobre');
    let btn = document.getElementById('btnComecar');

    btn.addEventListener("click", function(){
        alert("redirecionando...");
        window.location.href = '../page_gerador/page_gerador.html';
    })

    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        alert('redirecionando para a home page ...');
        window.location.href = '../../page_entrada/page_entrada.html';
    });
    sobreLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });


});
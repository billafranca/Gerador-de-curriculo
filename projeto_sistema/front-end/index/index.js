document.addEventListener('DOMContentLoaded', function () {
    let homeLink = document.getElementById('home');
    let sobreLink = document.getElementById('sobre');

    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        alert('redirecionando para a home page ...');
        window.location.href = '../../page_explicativa/index.html';
    });
    sobreLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });


});
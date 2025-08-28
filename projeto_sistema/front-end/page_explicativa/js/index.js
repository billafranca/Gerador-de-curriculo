document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("botaoCadastro");
    let sobreLink = document.getElementById("sobre");

    btn.addEventListener("click", function() {
        window.location.href = "../login/loginOne.html";
    })

    sobreLink.addEventListener('click', function(event){
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

});
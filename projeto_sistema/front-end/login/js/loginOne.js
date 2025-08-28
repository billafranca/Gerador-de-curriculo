document.addEventListener('DOMContentLoaded', function(){
    let homeLink = document.getElementById('home');
    let sobreLink = document.getElementById('sobre');
    let contatoLink = document.getElementById('contato');

    let form = document.getElementById('formulario');

    form.addEventListener('submit', function(event){
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

        alert('Formulário enviado com sucesso!');
      
    });

    homeLink.addEventListener('click', function(event){
        event.preventDefault();
        window.location.href = '../page_explicativa/index.html';
        alert('redirecionando a home page...');
    });

    sobreLink.addEventListener('click', function(event){
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    contatoLink.addEventListener('click', function(event){
        event.preventDefault();
        window.location.href = 'https://github.com/billafranca';
    });

    });

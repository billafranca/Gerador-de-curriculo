document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        return alert("Preencha todos os campos!");
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);

                
                localStorage.setItem('user', JSON.stringify(data.user));

               
                window.location.href = 'page_icones.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao tentar logar usuário!');
        });
});

// Navegação do menu
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'index.html';
    });

    document.getElementById('sobre').addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    document.getElementById('contato').addEventListener('click', (event) => {
        event.preventDefault();
        let escolha = prompt(
            "Entre em contato com os desenvolvedores do projeto:\n" +
            "Digite 1 para Pedro Billafranca\n" +
            "Digite 2 para Lucas Rabello"
        );

        if (escolha?.trim() === "1") {
            window.location.href = "https://github.com/billafranca";
        } else if (escolha?.trim() === "2") {
            window.location.href = "https://github.com/lucas-rabello-dev";
        } else {
            alert("Opção inválida. Tente novamente.");
        }
    });

    document.getElementById('cadastroExistente').addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = 'login.html';
    })
});

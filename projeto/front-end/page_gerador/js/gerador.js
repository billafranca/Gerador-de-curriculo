document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('home');
    const sobreLink = document.getElementById('sobre');
    const select = document.getElementById("idiomaSelect");
    const container = document.getElementById("idiomasContainer");
    const form = document.getElementById("formulario");

    let idiomasSelecionados = [];

    
    select.addEventListener("change", () => {
        const valor = select.value;
        if (valor && !idiomasSelecionados.includes(valor)) {
            idiomasSelecionados.push(valor);
            atualizarTags();
        }
        select.selectedIndex = 0;
    });

    function atualizarTags() {
        container.innerHTML = "";
        idiomasSelecionados.forEach((idioma, index) => {
            const tag = document.createElement("div");
            tag.classList.add("idiomaTag");
            tag.textContent = idioma;

            const remover = document.createElement("span");
            remover.textContent = "×";
            remover.addEventListener("click", () => {
                idiomasSelecionados.splice(index, 1);
                atualizarTags();
            });

            tag.appendChild(remover);
            container.appendChild(tag);
        });
    }

   
    form.addEventListener('submit', function (event) {
        event.preventDefault();

       
        function validarCampo(id, nomeCampo) {
            const valor = document.getElementById(id).value.trim();
            if (!valor) {
                alert(`O campo "${nomeCampo}" é obrigatório.`);
                document.getElementById(id).focus();
                return false;
            }
            return true;
        }

        
        if (!validarCampo('nome', 'Nome Completo')) return;
        if (!validarCampo('email', 'Email')) {
            const email = document.getElementById('email').value.trim();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                alert("Digite um email válido!");
                document.getElementById('email').focus();
                return;
            }
        }
        if (!validarCampo('telefone', 'Telefone')) {
            const telefone = document.getElementById('telefone').value.trim();
            const regexTel = /^\+?\d{8,15}$/; 
            if (!regexTel.test(telefone)) {
                alert("Digite um telefone válido (apenas números, pode incluir +).");
                document.getElementById('telefone').focus();
                return;
            }
        }
        if (!validarCampo('endereco', 'Endereço')) return;
        if (!validarCampo('objetivo', 'Objetivo Profissional')) return;
        if (!validarCampo('formacao', 'Formação Acadêmica')) return;
        if (!validarCampo('experiencia', 'Experiência Profissional')) return;
        if (!validarCampo('habilidades', 'Habilidades')) return;

       
        if (idiomasSelecionados.length === 0) {
            alert("Selecione pelo menos um idioma.");
            select.focus();
            return;
        }

        
        const dadosFormulario = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            endereco: document.getElementById('endereco').value.trim(),
            objetivo: document.getElementById('objetivo').value.trim(),
            formacao: document.getElementById('formacao').value.trim(),
            experiencia: document.getElementById('experiencia').value.trim(),
            habilidades: document.getElementById('habilidades').value.trim(),
            certificacoes: document.getElementById('certificacoes').value.trim(),
            competencias: document.getElementById('competencias').value.trim(),
            idiomas: idiomasSelecionados
        };

        console.log(dadosFormulario);
        alert("ainda em desenvolvimento...");
    });

  
    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        alert('Redirecionando para a home page ...');
        window.location.href = '../page_entrada/page_entrada.html';
    });

    sobreLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
});

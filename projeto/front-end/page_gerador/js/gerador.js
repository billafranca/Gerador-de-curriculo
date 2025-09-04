document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('home');
    const sobreLink = document.getElementById('sobre');
    const select = document.getElementById("idiomaSelect");
    const container = document.getElementById("idiomasContainer");
    const form = document.getElementById("formulario");
    const contatoLink = document.getElementById("contato");

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

    function gerarPDFModeloSimples(dados) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setTextColor(dados.cor);
        doc.setFontSize(18);
        doc.text("Currículo", 105, 15, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);

        doc.text(`Nome: ${dados.nome}`, 20, 30);
        doc.text(`Email: ${dados.email}`, 20, 40);
        doc.text(`Telefone: ${dados.telefone}`, 20, 50);
        doc.text(`Endereço: ${dados.endereco}`, 20, 60);

        doc.text("Objetivo:", 20, 75);
        doc.text(dados.objetivo, 20, 82, { maxWidth: 170 });

        doc.text("Formação Acadêmica:", 20, 100);
        doc.text(dados.formacao, 20, 107, { maxWidth: 170 });

        doc.text("Experiência Profissional:", 20, 125);
        doc.text(dados.experiencia, 20, 132, { maxWidth: 170 });

        doc.text("Habilidades:", 20, 150);
        doc.text(dados.habilidades, 20, 157, { maxWidth: 170 });

        doc.text("Idiomas:", 20, 175);
        doc.text(dados.idiomas.join(", "), 20, 182, { maxWidth: 170 });

        if (dados.certificacoes) {
            doc.text("Certificações:", 20, 200);
            doc.text(dados.certificacoes, 20, 207, { maxWidth: 170 });
        }

        if (dados.competencias) {
            doc.text("Competências:", 20, 220);
            doc.text(dados.competencias, 20, 227, { maxWidth: 170 });
        }

        return doc;
    }

    function gerarPDFModeloColorido(dados) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFillColor(dados.cor);
        doc.rect(0, 0, 210, 297, 'F');

        doc.setTextColor("#ffffff");
        doc.setFontSize(18);
        doc.text("Currículo", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);

        doc.text(`Nome: ${dados.nome}`, 20, 40);
        doc.text(`Email: ${dados.email}`, 20, 50);
        doc.text(`Telefone: ${dados.telefone}`, 20, 60);
        doc.text(`Endereço: ${dados.endereco}`, 20, 70);

        doc.text("Objetivo:", 20, 85);
        doc.text(dados.objetivo, 20, 92, { maxWidth: 170 });

        doc.text("Formação Acadêmica:", 20, 110);
        doc.text(dados.formacao, 20, 117, { maxWidth: 170 });

        doc.text("Experiência Profissional:", 20, 135);
        doc.text(dados.experiencia, 20, 142, { maxWidth: 170 });

        doc.text("Habilidades:", 20, 160);
        doc.text(dados.habilidades, 20, 167, { maxWidth: 170 });

        doc.text("Idiomas:", 20, 185);
        doc.text(dados.idiomas.join(", "), 20, 192, { maxWidth: 170 });

        if (dados.certificacoes) {
            doc.text("Certificações:", 20, 210);
            doc.text(dados.certificacoes, 20, 217, { maxWidth: 170 });
        }

        if (dados.competencias) {
            doc.text("Competências:", 20, 230);
            doc.text(dados.competencias, 20, 237, { maxWidth: 170 });
        }

        return doc;
    }

    function gerarPDFModeloBarra(dados) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFillColor(dados.cor);
        doc.rect(0, 0, 50, 297, 'F');

        doc.setTextColor("#ffffff");
        doc.setFontSize(12);
        doc.text(dados.nome, 25, 20, { align: "center", baseline: "middle" });

        doc.setTextColor(0,0,0);
        doc.setFontSize(12);

        doc.text("Objetivo:", 60, 20);
        doc.text(dados.objetivo, 60, 27, { maxWidth: 140 });

        doc.text("Formação Acadêmica:", 60, 45);
        doc.text(dados.formacao, 60, 52, { maxWidth: 140 });

        doc.text("Experiência Profissional:", 60, 70);
        doc.text(dados.experiencia, 60, 77, { maxWidth: 140 });

        doc.text("Habilidades:", 60, 95);
        doc.text(dados.habilidades, 60, 102, { maxWidth: 140 });

        doc.text("Idiomas:", 60, 120);
        doc.text(dados.idiomas.join(", "), 60, 127, { maxWidth: 140 });

        if (dados.certificacoes) {
            doc.text("Certificações:", 60, 145);
            doc.text(dados.certificacoes, 60, 152, { maxWidth: 140 });
        }

        if (dados.competencias) {
            doc.text("Competências:", 60, 165);
            doc.text(dados.competencias, 60, 172, { maxWidth: 140 });
        }

        return doc;
    }

    // Validação e geração do PDF
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

        const modelo = document.getElementById("modelo").value;
        if (!modelo) {
            alert("Selecione um modelo de currículo.");
            return;
        }

        const cor = document.getElementById("cor").value;
        if (!cor) {
            alert("Selecione uma cor.");
            document.getElementById("cor").focus();
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
            idiomas: idiomasSelecionados,
            modelo: modelo,
            cor: cor
        };

        let doc;
        switch(modelo) {
            case "simples":
                doc = gerarPDFModeloSimples(dadosFormulario);
                break;
            case "colorido":
                doc = gerarPDFModeloColorido(dadosFormulario);
                break;
            case "barra":
                doc = gerarPDFModeloBarra(dadosFormulario);
                break;
            default:
                alert("Selecione um modelo válido!");
                return;
        }

        doc.save(`${dadosFormulario.nome}_curriculo.pdf`);

        alert("Currículo gerado com sucesso!");
        form.reset();
        idiomasSelecionados = [];
        atualizarTags();
    });

    // Navegação
    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        alert('Redirecionando para a home page ...');
        window.location.href = '../page_entrada/page_entrada.html';
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

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

        // Cabeçalho
        doc.setFillColor(dados.cor);
        doc.rect(0, 0, 210, 40, "F");

        doc.setTextColor("#ffffff");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text(dados.nome, 20, 25);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`${dados.email} | ${dados.telefone}`, 20, 33);

        // Se tiver foto
        if (dados.foto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                doc.addImage(e.target.result, "JPEG", 160, 10, 35, 35);
            };
            reader.readAsDataURL(dados.foto);
        }

        // Cor preta pro corpo
        doc.setTextColor(0, 0, 0);
        let y = 55;

        // Função helper para títulos
        function titulo(texto) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text(texto, 20, y);
            y += 4;
            doc.setDrawColor(dados.cor);
            doc.setLineWidth(0.5);
            doc.line(20, y, 190, y);
            y += 8;
        }

      

        // Formação
        titulo("Formação Acadêmica");
        doc.setFont("helvetica", "normal");
        doc.text(dados.formacao, 20, y, { maxWidth: 170 });
        y += 20;

        // Experiência
        titulo("Experiência Profissional");
        doc.setFont("helvetica", "normal");
        doc.text(dados.experiencia, 20, y, { maxWidth: 170 });
        y += 20;

        // Habilidades
        titulo("Habilidades");
        doc.setFont("helvetica", "normal");
        doc.text(dados.habilidades, 20, y, { maxWidth: 170 });
        y += 20;

        // Idiomas
        titulo("Idiomas");
        doc.setFont("helvetica", "normal");
        doc.text(dados.idiomas.join(", "), 20, y, { maxWidth: 170 });
        y += 20;

        // Certificações
        if (dados.certificacoes) {
            titulo("Certificações");
            doc.setFont("helvetica", "normal");
            doc.text(dados.certificacoes, 20, y, { maxWidth: 170 });
            y += 20;
        }

        // Competências
        if (dados.competencias) {
            titulo("Competências");
            doc.setFont("helvetica", "normal");
            doc.text(dados.competencias, 20, y, { maxWidth: 170 });
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
        doc.setFont("helvetica", "bold");
        doc.text("Currículo", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        doc.setFont("helvetica", "bold");
        doc.text("Nome:", 20, 40);
        doc.setFont("helvetica", "normal");
        doc.text(dados.nome, 50, 40);

        doc.setFont("helvetica", "bold");
        doc.text("Email:", 20, 50);
        doc.setFont("helvetica", "normal");
        doc.text(dados.email, 50, 50);

        doc.setFont("helvetica", "bold");
        doc.text("Telefone:", 20, 60);
        doc.setFont("helvetica", "normal");
        doc.text(dados.telefone, 50, 60);

        doc.setFont("helvetica", "bold");
        doc.text("Endereço:", 20, 70);
        doc.setFont("helvetica", "normal");
        doc.text(dados.endereco, 50, 70);

        

        doc.setFont("helvetica", "bold");
        doc.text("Formação Acadêmica:", 20, 110);
        doc.setFont("helvetica", "normal");
        doc.text(dados.formacao, 20, 117, { maxWidth: 170 });

        doc.setFont("helvetica", "bold");
        doc.text("Experiência Profissional:", 20, 135);
        doc.setFont("helvetica", "normal");
        doc.text(dados.experiencia, 20, 142, { maxWidth: 170 });

        doc.setFont("helvetica", "bold");
        doc.text("Habilidades:", 20, 160);
        doc.setFont("helvetica", "normal");
        doc.text(dados.habilidades, 20, 167, { maxWidth: 170 });

        doc.setFont("helvetica", "bold");
        doc.text("Idiomas:", 20, 185);
        doc.setFont("helvetica", "normal");
        doc.text(dados.idiomas.join(", "), 20, 192, { maxWidth: 170 });

        if (dados.certificacoes) {
            doc.setFont("helvetica", "bold");
            doc.text("Certificações:", 20, 210);
            doc.setFont("helvetica", "normal");
            doc.text(dados.certificacoes, 20, 217, { maxWidth: 170 });
        }

        if (dados.competencias) {
            doc.setFont("helvetica", "bold");
            doc.text("Competências:", 20, 230);
            doc.setFont("helvetica", "normal");
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
        doc.setFont("helvetica", "bold");
        doc.text(dados.nome, 25, 20, { align: "center", baseline: "middle" });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

       

        doc.setFont("helvetica", "bold");
        doc.text("Formação Acadêmica:", 60, 45);
        doc.setFont("helvetica", "normal");
        doc.text(dados.formacao, 60, 52, { maxWidth: 140 });

        doc.setFont("helvetica", "bold");
        doc.text("Experiência Profissional:", 60, 70);
        doc.setFont("helvetica", "normal");
        doc.text(dados.experiencia, 60, 77, { maxWidth: 140 });

        doc.setFont("helvetica", "bold");
        doc.text("Habilidades:", 60, 95);
        doc.setFont("helvetica", "normal");
        doc.text(dados.habilidades, 60, 102, { maxWidth: 140 });

        doc.setFont("helvetica", "bold");
        doc.text("Idiomas:", 60, 115);
        doc.setFont("helvetica", "normal");
        doc.text(dados.idiomas.join(", "), 60, 122, { maxWidth: 140 });

        if (dados.certificacoes) {
            doc.setFont("helvetica", "bold");
            doc.text("Certificações:", 60, 140);
            doc.setFont("helvetica", "normal");
            doc.text(dados.certificacoes, 60, 147, { maxWidth: 140 });
        }

        if (dados.competencias) {
            doc.setFont("helvetica", "bold");
            doc.text("Competências:", 60, 160);
            doc.setFont("helvetica", "normal");
            doc.text(dados.competencias, 60, 167, { maxWidth: 140 });
        }

        return doc;
    }




    // papai o baguio ta dahora
        const gerarPDFModeloModerno = (dados) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        
        doc.setFillColor(dados.cor);
        doc.rect(0, 0, 210, 50, "F");
        
        doc.setTextColor("#fff");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(26);
        doc.text(dados.nome, 20, 30);
        
        
        let y = 60;
        
        
        const criarSecao = (titulo, conteudo) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(dados.cor);
            doc.text(titulo, 20, y);
            y += 6;
            doc.setDrawColor(dados.cor);
            doc.setLineWidth(0.5);
            doc.line(20, y, 190, y);
            y += 8;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0,0,0);
            doc.text(conteudo, 20, y, { maxWidth: 170 });
            y += 18;
        };
        
        criarSecao("Formação Acadêmica", dados.formacao);
        criarSecao("Experiência Profissional", dados.experiencia);
        criarSecao("Habilidades", dados.habilidades);
        criarSecao("Idiomas", dados.idiomas.join(", "));
        if(dados.certificacoes) criarSecao("Certificações", dados.certificacoes);
        if(dados.competencias) criarSecao("Competências", dados.competencias);

        return doc;
    }



        function AlterarFonte(estilo) {
            const fonte = estilo;
            const doc = new jsPDF();

            switch (fonte) {
                case "arial":
                    doc.setFont("helvetica");
                    break;
                case "times":
                    doc.setFont("times");
                    break;
                case "courier":
                    doc.setFont("courier");
                    break;
                default:
                    doc.setFont("helvetica");
            }

            const fotoPerfil = document.getElementById("foto").files[0];

            if (fotoPerfil) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imgData = e.target.result;
                    doc.addImage(imgData, 'JPEG', 150, 10, 40, 40);
                    // Se quiser salvar já com a foto:
                    doc.save("curriculo_com_foto.pdf");
                };
                reader.readAsDataURL(fotoPerfil);
            }
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
                formacao: document.getElementById('formacao').value.trim(),
                experiencia: document.getElementById('experiencia').value.trim(),
                habilidades: document.getElementById('habilidades').value.trim(),
                certificacoes: document.getElementById('certificacoes').value.trim(),
                competencias: document.getElementById('competencias').value.trim(),
                idiomas: idiomasSelecionados,
                modelo: modelo,
                cor: cor,
                foto: document.getElementById("foto").files[0]

            };

            let doc;
            switch (modelo) {
                case "simples":
                    doc = gerarPDFModeloSimples(dadosFormulario);
                    break;
                case "colorido":
                    doc = gerarPDFModeloColorido(dadosFormulario);
                    break;
                case "barra":
                    doc = gerarPDFModeloBarra(dadosFormulario);
                    break;
                case "moderno":
                    doc = gerarPDFModeloModerno(dadosFormulario);
                    break;
                default:
                    alert("Selecione um modelo válido!");
                    return;
            }

            if (dadosFormulario.foto) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    doc.addImage(e.target.result, 'JPEG', 150, 10, 40, 40); 
                    doc.save(`${dadosFormulario.nome}_curriculo.pdf`);
                };
                reader.readAsDataURL(dadosFormulario.foto);
            } else {
                doc.save(`${dadosFormulario.nome}_curriculo.pdf`);
            }

            alert("Currículo gerado com sucesso!");
            form.reset();
            idiomasSelecionados = [];
            atualizarTags();
        });

        
        homeLink.addEventListener('click', function (event) {
            event.preventDefault();
            alert('Redirecionando para a home page ...');
            window.location.href = 'page_entrada.html';
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

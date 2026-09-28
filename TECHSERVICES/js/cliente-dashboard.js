document.addEventListener("DOMContentLoaded", function () {

    // Recupera a sessão do usuário
    const sessaoSalva =
        localStorage.getItem("techservices_sessao");


    // Usuário não está logado
    if (!sessaoSalva) {

        window.location.href = "../login.html";

        return;
    }


    const usuario =
        JSON.parse(sessaoSalva);


    // ==============================
    // NOME DO USUÁRIO
    // ==============================

    const nomeCompleto = usuario.nome;

    const primeiroNome =
        nomeCompleto.split(" ")[0];


    // Cabeçalho

    const titulo =
        document.querySelector(".portal-header h1");

    if (titulo) {

        titulo.innerHTML =
            `Olá, ${primeiroNome}! 👋`;
    }


    // Nome no menu lateral

    const nomeMenu =
        document.querySelector(".usuario-resumo strong");

    if (nomeMenu) {

        nomeMenu.textContent =
            nomeCompleto;
    }


    // ==============================
    // AVATAR
    // ==============================

    const avatar =
        document.querySelector(".avatar");

    if (avatar) {

        const partesNome =
            nomeCompleto.trim().split(" ");

        let iniciais =
            partesNome[0].charAt(0);

        if (partesNome.length > 1) {

            iniciais +=
                partesNome[
                    partesNome.length - 1
                ].charAt(0);
        }

        avatar.textContent =
            iniciais.toUpperCase();
    }


    // ==============================
    // SAIR
    // ==============================

    const botaoSair =
        document.querySelector(".sair");

    if (botaoSair) {

        botaoSair.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "techservices_sessao"
                );

            }
        );

    }

});
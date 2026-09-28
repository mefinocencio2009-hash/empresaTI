document.addEventListener("DOMContentLoaded", function () {

    const sessaoSalva =
        localStorage.getItem("techservices_sessao");

    // Não está logado
    if (!sessaoSalva) {

        window.location.href = "../login.html";

        return;
    }

    const usuario = JSON.parse(sessaoSalva);

    // Não é administrador
    if (usuario.tipo !== "admin") {

        alert("Acesso permitido somente para administradores.");

        window.location.href =
            "../cliente/dashboard.html";

        return;
    }


    // ==============================
    // DADOS DO ADMINISTRADOR
    // ==============================

    const nomeAdmin =
        document.querySelector(".usuario-resumo strong");

    if (nomeAdmin) {
        nomeAdmin.textContent = usuario.nome;
    }


    // ==============================
    // AVATAR
    // ==============================

    const avatar =
        document.querySelector(".usuario-resumo .avatar");

    if (avatar) {

        const partes =
            usuario.nome.trim().split(" ");

        let iniciais =
            partes[0].charAt(0);

        if (partes.length > 1) {

            iniciais +=
                partes[partes.length - 1].charAt(0);
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
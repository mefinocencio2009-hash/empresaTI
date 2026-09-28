const formularioLogin = document.querySelector("#form-login");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.querySelector("#email");
        const senha = document.querySelector("#senha");

        const erroEmail = document.querySelector("#erro-email");
        const erroSenha = document.querySelector("#erro-senha");
        const mensagemLogin = document.querySelector("#mensagem-login");


        // Limpa mensagens anteriores

        erroEmail.textContent = "";
        erroSenha.textContent = "";
        mensagemLogin.textContent = "";


        // Validação

        if (email.value.trim() === "") {

            erroEmail.textContent = "Informe seu e-mail.";

            email.focus();

            return;
        }


        if (senha.value === "") {

            erroSenha.textContent = "Informe sua senha.";

            senha.focus();

            return;
        }


        if (!email.checkValidity()) {

            erroEmail.textContent =
                "Digite um e-mail válido.";

            email.focus();

            return;
        }


        try {

            // Envia os dados para o servidor

            const resposta = await fetch(
                "/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.value.trim(),
                        senha: senha.value
                    })
                }
            );


            const dados = await resposta.json();


            // Login incorreto

            if (!resposta.ok) {

                mensagemLogin.textContent =
                    dados.mensagem || "E-mail ou senha incorretos.";

                return;
            }


            // Salva a sessão

            localStorage.setItem(
                "techservices_sessao",
                JSON.stringify(dados.usuario)
            );


            mensagemLogin.textContent =
                "Login realizado com sucesso!";


            // ==========================
            // REDIRECIONAMENTO
            // ==========================

            setTimeout(function () {

                if (dados.usuario.tipo === "admin") {

                    window.location.href =
                        "admin/dashboard.html";

                } else {

                    window.location.href =
                        "cliente/dashboard.html";

                }

            }, 500);


        } catch (erro) {

            console.error(
                "Erro ao realizar login:",
                erro
            );

            mensagemLogin.textContent =
                "Não foi possível conectar ao servidor.";

        }

    });

}
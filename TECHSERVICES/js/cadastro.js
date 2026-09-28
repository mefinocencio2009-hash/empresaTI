const formularioCadastro = document.querySelector("#form-cadastro");

if (formularioCadastro) {

    formularioCadastro.addEventListener("submit", async function (event) {

        event.preventDefault();


        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const telefone = document.querySelector("#telefone");
        const senha = document.querySelector("#senha");
        const confirmarSenha =
            document.querySelector("#confirmar-senha");

        const termos = document.querySelector("#termos");


        // ==============================
        // VALIDAÇÕES
        // ==============================

        if (
            nome.value.trim() === "" ||
            email.value.trim() === "" ||
            senha.value === "" ||
            confirmarSenha.value === ""
        ) {

            alert("Preencha todos os campos obrigatórios.");

            return;
        }


        if (nome.value.trim().length < 3) {

            alert("Digite seu nome completo.");

            nome.focus();

            return;
        }


        if (!email.checkValidity()) {

            alert("Digite um e-mail válido.");

            email.focus();

            return;
        }


        if (senha.value.length < 6) {

            alert(
                "A senha deve possuir pelo menos 6 caracteres."
            );

            senha.focus();

            return;
        }


        if (senha.value !== confirmarSenha.value) {

            alert("As senhas não são iguais.");

            confirmarSenha.focus();

            return;
        }


        if (!termos.checked) {

            alert(
                "Você precisa aceitar os termos de uso."
            );

            termos.focus();

            return;
        }


        // ==============================
        // ENVIO PARA A API
        // ==============================

        const dadosUsuario = {

            nome: nome.value.trim(),

            email: email.value.trim(),

            telefone: telefone.value.trim(),

            senha: senha.value

        };


        try {

            const resposta = await fetch(
                "/api/usuarios",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(dadosUsuario)
                }
            );


            const dados = await resposta.json();


            // ==============================
            // ERRO DA API
            // ==============================

            if (!resposta.ok) {

                alert(dados.mensagem);

                return;
            }


            // ==============================
            // CADASTRO REALIZADO
            // ==============================

            alert(
                "Conta criada com sucesso!\n\n" +
                "Agora você já pode entrar no portal."
            );


            // Vai para o login

            window.location.href = "../login.html";


        } catch (erro) {

            console.error(
                "Erro ao cadastrar usuário:",
                erro
            );

            alert(
                "Não foi possível realizar o cadastro.\n\n" +
                "Verifique se o servidor está funcionando."
            );

        }

    });

}
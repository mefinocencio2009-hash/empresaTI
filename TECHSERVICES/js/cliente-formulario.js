const formulario = document.querySelector("#form-chamado");

if (formulario) {

    formulario.addEventListener("submit", async function (event) {

        event.preventDefault();

        // ==============================
        // CAPTURA DOS CAMPOS
        // ==============================

        const titulo = document.querySelector("#titulo");
        const categoria = document.querySelector("#categoria");
        const descricao = document.querySelector("#descricao");

        const prioridade =
            document.querySelector(
                'input[name="prioridade"]:checked'
            );

        const dispositivo =
            document.querySelector("#dispositivo");

        const sistemaOperacional =
            document.querySelector("#sistema-operacional");

        const contato =
            document.querySelector("#contato");


        // ==============================
        // VERIFICAÇÃO DA SESSÃO
        // ==============================

        const sessaoSalva =
            localStorage.getItem("techservices_sessao");

        if (!sessaoSalva) {

            alert(
                "Sua sessão expirou. Faça login novamente."
            );

            window.location.href = "../login.html";

            return;
        }

        const usuario =
            JSON.parse(sessaoSalva);


        // ==============================
        // VALIDAÇÕES
        // ==============================

        if (
            titulo.value.trim() === "" ||
            categoria.value === "" ||
            descricao.value.trim() === "" ||
            !prioridade
        ) {

            alert(
                "Preencha todos os campos obrigatórios antes de enviar."
            );

            return;
        }


        if (titulo.value.trim().length < 5) {

            alert(
                "O título deve possuir pelo menos 5 caracteres."
            );

            titulo.focus();

            return;
        }


        if (descricao.value.trim().length < 20) {

            alert(
                "A descrição deve possuir pelo menos 20 caracteres."
            );

            descricao.focus();

            return;
        }


        // ==============================
        // DADOS DO CHAMADO
        // ==============================

        const novoChamado = {

            usuarioId: usuario.id,

            titulo: titulo.value.trim(),

            categoria: categoria.value,

            descricao: descricao.value.trim(),

            prioridade: prioridade.value,

            dispositivo: dispositivo.value,

            sistemaOperacional:
                sistemaOperacional.value,

            contato: contato.value,

            status: "aberto"

        };


        try {

            // ==============================
            // ENVIA PARA O SERVIDOR
            // ==============================

            const resposta = await fetch(
                "/api/chamados",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(novoChamado)
                }
            );


            const dados = await resposta.json();


            // ==============================
            // VERIFICA RESPOSTA
            // ==============================

            if (!resposta.ok) {

                alert(
                    dados.mensagem ||
                    "Não foi possível criar o chamado."
                );

                return;
            }


            // ==============================
            // SUCESSO
            // ==============================

            alert(
                "Chamado enviado com sucesso!\n\n" +
                "Nossa equipe irá analisar sua solicitação."
            );


            // Vai para Meus chamados

            window.location.href =
                "chamados.html";


        } catch (erro) {

            console.error(
                "Erro ao enviar chamado:",
                erro
            );

            alert(
                "Não foi possível conectar ao servidor.\n\n" +
                "Verifique se o TechServices está funcionando."
            );

        }

    });

}
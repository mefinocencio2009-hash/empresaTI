document.addEventListener("DOMContentLoaded", async function () {

    // ==============================
    // VERIFICA SESSÃO
    // ==============================

    const sessaoSalva =
        localStorage.getItem("techservices_sessao");

    if (!sessaoSalva) {

        window.location.href = "../login.html";

        return;
    }

    const usuario = JSON.parse(sessaoSalva);


    // ==============================
    // ELEMENTOS DA PÁGINA
    // ==============================

    const lista =
        document.querySelector(".chamados-lista");

    const campoBusca =
        document.querySelector("#buscar-chamado");

    const filtroStatus =
        document.querySelector("#filtro-status");

    const filtroCategoria =
        document.querySelector("#filtro-categoria");

    const contador =
        document.querySelector(".lista-cabecalho .tag");


    let chamados = [];


    // ==============================
    // BUSCA OS CHAMADOS
    // ==============================

    async function carregarChamados() {

        try {

            const resposta =
                await fetch("/api/chamados");

            if (!resposta.ok) {

                throw new Error(
                    "Erro ao buscar chamados."
                );

            }

            const dados =
                await resposta.json();


            // Cliente vê somente seus chamados

            chamados = dados.filter(function (chamado) {

                return chamado.usuarioId === usuario.id;

            });


            renderizarChamados();

        } catch (erro) {

            console.error(erro);

            lista.innerHTML = `
                <div class="mensagem-vazia">
                    <h3>Não foi possível carregar os chamados.</h3>
                    <p>Verifique se o servidor está funcionando.</p>
                </div>
            `;

        }

    }


    // ==============================
    // TRADUZ DADOS
    // ==============================

    function formatarCategoria(categoria) {

        const categorias = {

            hardware: "Hardware",
            software: "Software",
            rede: "Rede e Internet",
            sistema: "Sistema",
            seguranca: "Segurança",
            outro: "Outro"

        };

        return categorias[categoria] || categoria;

    }


    function formatarPrioridade(prioridade) {

        const prioridades = {

            baixa: "Baixa",
            media: "Média",
            alta: "Alta",
            urgente: "Urgente"

        };

        return prioridades[prioridade] || prioridade;

    }


    function formatarStatus(status) {

        const statusFormatados = {

            aberto: "Aberto",
            "em andamento": "Em andamento",
            andamento: "Em andamento",
            resolvido: "Resolvido"

        };

        return statusFormatados[status] || status;

    }


    function classeStatus(status) {

        if (
            status === "em andamento" ||
            status === "andamento"
        ) {

            return "andamento";

        }

        return status;

    }


    // ==============================
    // RENDERIZA OS CHAMADOS
    // ==============================

    function renderizarChamados() {

        const busca =
            campoBusca.value
                .trim()
                .toLowerCase();

        const statusSelecionado =
            filtroStatus.value;

        const categoriaSelecionada =
            filtroCategoria.value;


        const filtrados =
            chamados.filter(function (chamado) {

                const correspondeBusca =
                    chamado.id
                        .toString()
                        .includes(busca) ||

                    chamado.titulo
                        .toLowerCase()
                        .includes(busca);


                const statusChamado =
                    chamado.status === "em andamento"
                        ? "andamento"
                        : chamado.status;


                const correspondeStatus =
                    statusSelecionado === "todos" ||
                    statusChamado === statusSelecionado;


                const correspondeCategoria =
                    categoriaSelecionada === "todas" ||
                    chamado.categoria === categoriaSelecionada;


                return (
                    correspondeBusca &&
                    correspondeStatus &&
                    correspondeCategoria
                );

            });


        // Atualiza contador

        contador.textContent =
            `${filtrados.length} CHAMADO${filtrados.length !== 1 ? "S" : ""}`;


        // Nenhum chamado

        if (filtrados.length === 0) {

            lista.innerHTML = `
                <div class="mensagem-vazia">
                    <h3>Nenhum chamado encontrado.</h3>
                    <p>
                        Tente alterar os filtros ou abra um novo chamado.
                    </p>
                </div>
            `;

            return;

        }


        // Cria os cards

        lista.innerHTML =
            filtrados.map(function (chamado) {

                return `
                    <a
                        href="detalhes-chamado.html?id=${chamado.id}"
                        class="chamado-card"
                    >

                        <div class="chamado-identificacao">

                            <span class="chamado-numero">
                                #${chamado.id}
                            </span>

                            <h3>
                                ${chamado.titulo}
                            </h3>

                            <p>
                                Aberto em ${chamado.data}
                            </p>

                        </div>


                        <div class="chamado-dados">

                            <div>
                                <small>Categoria</small>

                                <span>
                                    ${formatarCategoria(chamado.categoria)}
                                </span>
                            </div>


                            <div>
                                <small>Prioridade</small>

                                <span class="prioridade ${chamado.prioridade}">
                                    ${formatarPrioridade(chamado.prioridade)}
                                </span>
                            </div>


                            <div>
                                <small>Status</small>

                                <span class="status ${classeStatus(chamado.status)}">
                                    ${formatarStatus(chamado.status)}
                                </span>
                            </div>

                        </div>


                        <span class="chamado-seta">
                            →
                        </span>

                    </a>
                `;

            }).join("");

    }


    // ==============================
    // FILTROS
    // ==============================

    campoBusca.addEventListener(
        "input",
        renderizarChamados
    );


    filtroStatus.addEventListener(
        "change",
        renderizarChamados
    );


    filtroCategoria.addEventListener(
        "change",
        renderizarChamados
    );


    // ==============================
    // INICIA
    // ==============================

    carregarChamados();

});
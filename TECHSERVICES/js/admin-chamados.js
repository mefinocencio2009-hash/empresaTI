const campoBusca = document.querySelector("#buscar");
const filtroStatus = document.querySelector("#status");
const filtroPrioridade = document.querySelector("#prioridade");
const filtroCategoria = document.querySelector("#categoria");
const botaoLimpar = document.querySelector("#limpar-filtros");

const chamados = document.querySelectorAll(".chamado-admin");
const resultadoFiltro = document.querySelector("#resultado-filtro");


function filtrarChamados() {

    const busca = campoBusca.value.toLowerCase().trim();
    const status = filtroStatus.value;
    const prioridade = filtroPrioridade.value;
    const categoria = filtroCategoria.value;

    let quantidadeVisivel = 0;


    chamados.forEach((chamado) => {

        const textoChamado = chamado.textContent.toLowerCase();

        const correspondeBusca =
            textoChamado.includes(busca);

        const correspondeStatus =
            status === "todos" ||
            chamado.dataset.status === status;

        const correspondePrioridade =
            prioridade === "todas" ||
            chamado.dataset.prioridade === prioridade;

        const correspondeCategoria =
            categoria === "todas" ||
            chamado.dataset.categoria === categoria;


        const deveExibir =
            correspondeBusca &&
            correspondeStatus &&
            correspondePrioridade &&
            correspondeCategoria;


        if (deveExibir) {

            chamado.style.display = "grid";

            quantidadeVisivel++;

        } else {

            chamado.style.display = "none";

        }

    });


    resultadoFiltro.textContent =
        `${quantidadeVisivel} resultado(s)`;

}


campoBusca.addEventListener("input", filtrarChamados);

filtroStatus.addEventListener("change", filtrarChamados);

filtroPrioridade.addEventListener("change", filtrarChamados);

filtroCategoria.addEventListener("change", filtrarChamados);


botaoLimpar.addEventListener("click", () => {

    campoBusca.value = "";

    filtroStatus.value = "todos";

    filtroPrioridade.value = "todas";

    filtroCategoria.value = "todas";

    filtrarChamados();

});
const formularioResposta = document.querySelector("#form-resposta");

const seletorStatus = document.querySelector("#alterar-status");

const statusTopo = document.querySelector("#status-topo");

const botaoSalvar = document.querySelector("#salvar-alteracoes");


/*
 * Atualiza o status apresentado no topo
 * do chamado.
 */

function atualizarStatus() {

    const status = seletorStatus.value;

    const nomesStatus = {
        aberto: "Aberto",
        andamento: "Em andamento",
        resolvido: "Resolvido",
        cancelado: "Cancelado"
    };

    statusTopo.textContent = nomesStatus[status];

    statusTopo.className = `status ${status}`;
}


/*
 * Atualiza o status sempre que
 * o administrador selecionar uma opção.
 */

seletorStatus.addEventListener("change", atualizarStatus);


/*
 * Salva as alterações do chamado.
 */

botaoSalvar.addEventListener("click", () => {

    atualizarStatus();

    alert("Alterações salvas com sucesso!");

});


/*
 * Envia uma resposta para o cliente.
 */

formularioResposta.addEventListener("submit", (event) => {

    event.preventDefault();

    const resposta = document.querySelector("#resposta");


    if (resposta.value.trim() === "") {

        alert("Digite uma resposta antes de enviar.");

        resposta.focus();

        return;
    }


    alert("Resposta enviada ao cliente!");

    resposta.value = "";

});
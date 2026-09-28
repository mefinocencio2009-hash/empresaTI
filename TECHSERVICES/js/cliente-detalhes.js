const API = "http://localhost:3000";

// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const numeroChamado = document.querySelector("#numero-chamado");
const tituloChamado = document.querySelector("#titulo-chamado");
const dataChamado = document.querySelector("#data-chamado");
const statusChamado = document.querySelector("#status-chamado");

const categoriaChamado = document.querySelector("#categoria-chamado");
const prioridadeChamado = document.querySelector("#prioridade-chamado");

const descricaoChamado = document.querySelector("#descricao-chamado");

const dispositivoChamado =
document.querySelector("#dispositivo-chamado");

const sistemaChamado =
document.querySelector("#sistema-chamado");

const contatoChamado =
document.querySelector("#contato-chamado");

const tecnicoChamado =
document.querySelector("#tecnico-chamado");

const nomeTecnico =
document.querySelector("#nome-tecnico");

const statusTecnico =
document.querySelector("#status-tecnico");

const atualizacaoChamado =
document.querySelector("#atualizacao-chamado");

const historicoData =
document.querySelector("#historico-data");

// ==========================================
// TRADUÇÃO DOS DADOS
// ==========================================

function formatarCategoria(categoria) {


const categorias = {
    hardware: "Hardware",
    software: "Software",
    rede: "Rede e Internet",
    sistema: "Sistema",
    seguranca: "Segurança",
    outro: "Outro"
};

return categorias[categoria] || categoria || "Não informado";


}

function formatarPrioridade(prioridade) {


const prioridades = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta",
    urgente: "Urgente"
};

return prioridades[prioridade] || prioridade || "Não informado";


}

function formatarStatus(status) {


const statusFormatados = {
    aberto: "Aberto",
    "em andamento": "Em andamento",
    resolvido: "Resolvido"
};

return statusFormatados[status] || status || "Aberto";


}

function formatarDispositivo(dispositivo) {


const dispositivos = {
    computador: "Computador",
    notebook: "Notebook",
    celular: "Celular",
    tablet: "Tablet",
    servidor: "Servidor",
    outro: "Outro"
};

return dispositivos[dispositivo] || "Não informado";


}

function formatarSistema(sistema) {


const sistemas = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    android: "Android",
    ios: "iOS",
    outro: "Outro"
};

return sistemas[sistema] || "Não informado";


}

function formatarContato(contato) {


const contatos = {
    email: "E-mail",
    telefone: "Telefone",
    whatsapp: "WhatsApp"
};

return contatos[contato] || "Não informado";


}

// ==========================================
// CLASSE DO STATUS
// ==========================================

function classeStatus(status) {


if (status === "resolvido") {
    return "resolvido";
}

if (status === "em andamento") {
    return "andamento";
}

return "aberto";


}

function classePrioridade(prioridade) {


if (prioridade === "urgente") {
    return "urgente";
}

if (prioridade === "alta") {
    return "alta";
}

if (prioridade === "media") {
    return "media";
}

return "baixa";


}

// ==========================================
// CARREGAR CHAMADO
// ==========================================

async function carregarChamado() {


try {

    // Pega o ID que veio na URL
    const parametros =
        new URLSearchParams(window.location.search);

    const id = parametros.get("id");


    if (!id) {

        alert("Chamado não encontrado.");

        window.location.href = "chamados.html";

        return;
    }


    const resposta =
        await fetch(`${API}/api/chamados/${id}`);


    if (!resposta.ok) {

        throw new Error(
            "Chamado não encontrado."
        );

    }


    const chamado = await resposta.json();


    // ==================================
    // PREENCHIMENTO
    // ==================================

    numeroChamado.textContent =
        `CHAMADO #${chamado.id}`;


    tituloChamado.textContent =
        chamado.titulo;


    dataChamado.textContent =
        `Aberto em ${chamado.data}`;


    historicoData.textContent =
        chamado.data;


    categoriaChamado.textContent =
        formatarCategoria(chamado.categoria);


    prioridadeChamado.textContent =
        formatarPrioridade(chamado.prioridade);


    prioridadeChamado.className =
        `prioridade ${classePrioridade(chamado.prioridade)}`;


    statusChamado.textContent =
        formatarStatus(chamado.status);


    statusChamado.className =
        `status ${classeStatus(chamado.status)}`;


    // ==================================
    // DESCRIÇÃO REAL DO CHAMADO
    // ==================================

    descricaoChamado.textContent =
        chamado.descricao ||
        "Nenhuma descrição foi informada.";


    // ==================================
    // INFORMAÇÕES ADICIONAIS
    // ==================================

    dispositivoChamado.textContent =
        formatarDispositivo(chamado.dispositivo);


    sistemaChamado.textContent =
        formatarSistema(chamado.sistemaOperacional);


    contatoChamado.textContent =
        formatarContato(chamado.contato);


    // ==================================
    // TÉCNICO
    // ==================================

    if (chamado.tecnico) {

        tecnicoChamado.textContent =
            chamado.tecnico;

        nomeTecnico.textContent =
            chamado.tecnico;

        statusTecnico.textContent =
            "Disponível";

    }


} catch (erro) {

    console.error(erro);

    alert(
        "Não foi possível carregar os dados do chamado."
    );

    window.location.href = "chamados.html";

}


}

// ==========================================
// MENSAGEM
// ==========================================

const formularioMensagem =
document.querySelector("#form-mensagem");

if (formularioMensagem) {


formularioMensagem.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const mensagem =
            document.querySelector("#mensagem").value.trim();


        if (mensagem.length < 5) {

            alert(
                "Digite uma mensagem com pelo menos 5 caracteres."
            );

            return;
        }


        alert(
            "Mensagem enviada com sucesso!"
        );


        document.querySelector("#mensagem").value = "";

    }
);


}

// ==========================================
// INICIAR
// ==========================================

carregarChamado();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const PORTA = 3000;
const ARQUIVO_DB = "./db.json";

// ==================================================
// CONFIGURAÇÕES
// ==================================================

app.use(cors());

app.use(express.json());

app.use(express.static("."));

// ==================================================
// FUNÇÕES DO BANCO DE DADOS
// ==================================================

function lerBanco() {


try {

    const dados = fs.readFileSync(
        ARQUIVO_DB,
        "utf8"
    );

    return JSON.parse(dados);

} catch (erro) {

    console.error(
        "Erro ao ler o banco de dados:",
        erro
    );

    return {
        usuarios: [],
        chamados: []
    };

}


}

function salvarBanco(dados) {


try {

    fs.writeFileSync(
        ARQUIVO_DB,
        JSON.stringify(
            dados,
            null,
            2
        )
    );

    return true;

} catch (erro) {

    console.error(
        "Erro ao salvar o banco de dados:",
        erro
    );

    return false;

}


}

// ==================================================
// TESTE DA API
// ==================================================

app.get("/api", function (req, res) {


res.json({

    mensagem:
        "API TechServices funcionando!"

});


});

// ==================================================
// USUÁRIOS
// ==================================================

// --------------------------------------------------
// LISTAR USUÁRIOS
// --------------------------------------------------

app.get("/api/usuarios", function (req, res) {


const banco = lerBanco();

res.json(
    banco.usuarios
);


});

// --------------------------------------------------
// CADASTRAR USUÁRIO
// --------------------------------------------------

app.post("/api/usuarios", function (req, res) {


const banco = lerBanco();

const {
    nome,
    email,
    telefone,
    senha
} = req.body;


// Validação

if (
    !nome ||
    !email ||
    !senha
) {

    return res.status(400).json({

        mensagem:
            "Preencha todos os campos obrigatórios."

    });

}


// Verifica e-mail duplicado

const usuarioExistente =
    banco.usuarios.find(
        usuario =>
            usuario.email.toLowerCase() ===
            email.trim().toLowerCase()
    );


if (usuarioExistente) {

    return res.status(409).json({

        mensagem:
            "Este e-mail já está cadastrado."

    });

}


// Gera ID

const novoId =
    banco.usuarios.length > 0
        ? Math.max(
            ...banco.usuarios.map(
                usuario => usuario.id
            )
        ) + 1
        : 1;


// Cria usuário

const novoUsuario = {

    id:
        novoId,

    nome:
        nome.trim(),

    email:
        email.trim().toLowerCase(),

    telefone:
        telefone
            ? telefone.trim()
            : "",

    senha,

    tipo:
        "cliente"

};


banco.usuarios.push(
    novoUsuario
);


const salvo =
    salvarBanco(banco);


if (!salvo) {

    return res.status(500).json({

        mensagem:
            "Não foi possível salvar o usuário."

    });

}


res.status(201).json({

    mensagem:
        "Usuário cadastrado com sucesso.",

    usuario: {

        id:
            novoUsuario.id,

        nome:
            novoUsuario.nome,

        email:
            novoUsuario.email,

        telefone:
            novoUsuario.telefone,

        tipo:
            novoUsuario.tipo

    }

});


});

// ==================================================
// LOGIN
// ==================================================

app.post("/api/login", function (req, res) {


const banco = lerBanco();

const {
    email,
    senha
} = req.body;


// Validação

if (
    !email ||
    !senha
) {

    return res.status(400).json({

        mensagem:
            "Informe seu e-mail e sua senha."

    });

}


// Procura usuário

const usuario =
    banco.usuarios.find(
        usuario =>
            usuario.email.toLowerCase() ===
            email.trim().toLowerCase() &&
            usuario.senha === senha
    );


// Não encontrado

if (!usuario) {

    return res.status(401).json({

        mensagem:
            "E-mail ou senha incorretos."

    });

}


// Login realizado

res.json({

    mensagem:
        "Login realizado com sucesso.",

    usuario: {

        id:
            usuario.id,

        nome:
            usuario.nome,

        email:
            usuario.email,

        telefone:
            usuario.telefone || "",

        tipo:
            usuario.tipo

    }

});


});

// ==================================================
// CHAMADOS
// ==================================================

// --------------------------------------------------
// LISTAR TODOS OS CHAMADOS
// --------------------------------------------------

app.get("/api/chamados", function (req, res) {


const banco = lerBanco();

res.json(
    banco.chamados
);


});

// --------------------------------------------------
// BUSCAR CHAMADO POR ID
// --------------------------------------------------

app.get("/api/chamados/:id", function (req, res) {


const banco = lerBanco();

const id =
    Number(req.params.id);


const chamado =
    banco.chamados.find(
        chamado =>
            Number(chamado.id) === id
    );


if (!chamado) {

    return res.status(404).json({

        mensagem:
            "Chamado não encontrado."

    });

}


res.json(
    chamado
);


});

// --------------------------------------------------
// CRIAR CHAMADO
// --------------------------------------------------

app.post("/api/chamados", function (req, res) {


const banco = lerBanco();


const {
    usuarioId,
    titulo,
    categoria,
    descricao,
    prioridade,
    dispositivo,
    sistemaOperacional,
    contato
} = req.body;


// ==================================================
// VALIDAÇÃO
// ==================================================

if (
    !usuarioId ||
    !titulo ||
    !categoria ||
    !descricao ||
    !prioridade
) {

    return res.status(400).json({

        mensagem:
            "Preencha todos os campos obrigatórios."

    });

}


// ==================================================
// VALIDA USUÁRIO
// ==================================================

const usuario =
    banco.usuarios.find(
        usuario =>
            Number(usuario.id) ===
            Number(usuarioId)
    );


if (!usuario) {

    return res.status(404).json({

        mensagem:
            "Usuário não encontrado."

    });

}


// ==================================================
// VALIDA TÍTULO
// ==================================================

if (
    titulo.trim().length < 5
) {

    return res.status(400).json({

        mensagem:
            "O título deve possuir pelo menos 5 caracteres."

    });

}


// ==================================================
// VALIDA DESCRIÇÃO
// ==================================================

if (
    descricao.trim().length < 20
) {

    return res.status(400).json({

        mensagem:
            "A descrição deve possuir pelo menos 20 caracteres."

    });

}


// ==================================================
// GERA ID DO CHAMADO
// ==================================================

const novoId =
    banco.chamados.length > 0
        ? Math.max(
            ...banco.chamados.map(
                chamado =>
                    Number(chamado.id)
            )
        ) + 1
        : 1001;


// ==================================================
// CRIA CHAMADO
// ==================================================

const novoChamado = {

    id:
        novoId,

    usuarioId:
        Number(usuarioId),

    titulo:
        titulo.trim(),

    categoria:
        categoria,

    prioridade:
        prioridade,

    descricao:
        descricao.trim(),

    dispositivo:
        dispositivo || "",

    sistemaOperacional:
        sistemaOperacional || "",

    contato:
        contato || "",

    status:
        "aberto",

    data:
        new Date().toLocaleDateString(
            "pt-BR"
        )

};


// ==================================================
// SALVA NO BANCO
// ==================================================

banco.chamados.push(
    novoChamado
);


const salvo =
    salvarBanco(banco);


if (!salvo) {

    return res.status(500).json({

        mensagem:
            "Não foi possível salvar o chamado."

    });

}


// ==================================================
// RESPOSTA
// ==================================================

res.status(201).json({

    mensagem:
        "Chamado criado com sucesso.",

    chamado:
        novoChamado

});


});

// ==================================================
// TRATAMENTO DE ERROS
// ==================================================

app.use(function (err, req, res, next) {


console.error(err);

res.status(500).json({

    mensagem:
        "Ocorreu um erro interno no servidor."

});


});

// ==================================================
// INICIAR SERVIDOR
// ==================================================

app.listen(
PORTA,
function () {


    console.log(
        `TechServices rodando em http://localhost:${PORTA}`
    );

}


);

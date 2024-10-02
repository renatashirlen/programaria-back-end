const express = require('express')

const app = express()
const porta = 3333

/* funções são sempre utilizadas com verbo e modo descritivo */

function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta)
}

app.listen(porta, mostraPorta)
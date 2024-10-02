//chamar o pacote express e criar uma instância do express
const express = require('express')

//configuração de rota - importar o módulo de roteamento do express
const router = express.Router()

const app = express()
const porta = 3333

// fazer função com request e response
function mostraOla(request, response) {
    response.send('Olá, mundo!')
}


// funções são sempre utilizadas com verbo e modo descritivo //
function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta)
}

//chamar a função de rota get() do express com dois parâmetros: o primeiro o endereço e o segundo chama a função que será executada
app.use(router.get('/ola', mostraOla))
//checa a porta
app.listen(porta, mostraPorta)

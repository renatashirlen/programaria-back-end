const express = require('express')

const router = express.Router()

const app = express()
const porta = 3333

// funções são sempre utilizadas com verbo e modo descritivo //

function mostraMulher(request, response) {
    response.json({
        nome: 'Renata Souza',
        imagem: 'https://drive.google.com/file/d/1xcOP0rOdVCMhMK38F6R-kK0-GQELUyGg/view?usp=sharing',
        minibio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    })
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)
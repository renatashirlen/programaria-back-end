const express = require("express") // INICIA O EXPRESS
const router = express.Router() // CONFIGURA A PRIMEIRA PARTE DA ROTA
const { v4: uuiudv4 } = require('uuid') // INICIA O UUID V4

const app = express() // INICIA O APP
app.use(express.json()) // TRATA AS REQUESTS EM JSON
const porta = 3333 // CRIA A PORTA

//definir um array e constante com informações
const mulheres = [
    {
        id: '1',
        nome: 'Simara Conceição',
        imagem: 'https://bit.ly/3LJIyOF',
        minibio: 'Desenvolvedora e instrutora'
    },

    {
        id: '2',
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'CEO & Founder da PrograMaria'
    },

    {
        id: '3',
        nome: 'Nina da Hora',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Senior Staff Software Engineer'
    }
]

// GET
function mostraMulheres(request, response) { //<---- toda função atrelada a uma rota precisa de req e resp
    response.json(mulheres)
}

// POST
function criaMulher (request, response) { 
    const novaMulher = { 
    id: uuiudv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio
    }

    mulheres.push(novaMulher)
    response.json(mulheres) 
}

/* [[ EXPLICANDO A FUNÇÃO CRIAMULHER ]]
function criaMulher (request, response) { 
    const novaMulher = { <--- cria o objeto mulher
    id: uuiudv4 <--- uma biblioteca que gera automático um id único
   ---------------------------------- <---- permitindo que a informação seja preenchida no envio da requisição
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio
    ----------------------------------
    }
    listaDeMulheres.push(novaMulher) <---- push serve para inseriur elementos num array
    response.json(listaDeMulheres) <---- usamos o JSON para enviar uma quantidade maior de dados
}
*/

//PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if(mulher.id === request.params.id) { //<--- igualdade absoluta em JS são 3 =
            return mulher // se id da mulher for igual, ele retorna essa mulher para alteração
        }
    }

    const mulherEncontrada = mulheres.find(encontraMulher) // caso o parâmetro nome seja igual
    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) { // caso o parâmetro minibio seja igual
        mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) { // caso o parâmetro imagem seja igual
        mulherEncontrada.imagem = request.body.imagem
    }
    response.json(mulheres) // armazena no json
}

//DELETE
function deletaMulher (request, response) {
    function todasMenosEla(mulher) {
        if(mulher.id !== request.params.id) {
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)
    response.json(mulheresQueFicam)
}


// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}



app.use(router.get('/mulheres', mostraMulheres)) // segunda configuação da rota GET / mulheres  
app.use(router.post('/mulheres', criaMulher)) // configura rota POST / mulheres  
app.use(router.patch('/mulheres/:id', corrigeMulher)) // configura rota PATCH / mulheres / id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configura rota DELETE / mulheres / id  
app.listen(porta, mostraPorta) //servidor ouve a porta


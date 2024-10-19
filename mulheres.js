const express = require("express") // INICIA O EXPRESS
const router = express.Router() // CONFIGURA A PRIMEIRA PARTE DA ROTA

const cors = require('cors') // IMPORTA O CORS QUE PERMITE CONSUMIR APIS PELO FRONT
const conectaBancoDeDados = require("./bancoDeDados") // importa o arquivo bancoDeDados.js
conectaBancoDeDados() // inicia a função que conecta o banco de dados

const Mulher = require('./mulherModel') // importa o arquivo mulherModel.js'
const mulherModel = require("./mulherModel")
const app = express() // INICIA O APP
app.use(express.json()) // TRATA AS REQUESTS EM JSON
app.use(cors()) // INICIA O CORS
const porta = 3333 // CRIA A PORTA

// GET
async function mostraMulheres(request, response) { //<---- toda função atrelada a uma rota precisa de req e resp
    try {
        const mulheresVindasDoBancoDeDados = await mulherModel.find()

        response.json(mulheresVindasDoBancoDeDados)

    } catch (erro) {
        console.error(erro)

    }
}

// POST
async function criaMulher (request, response) { 
    const novaMulher = new Mulher({ 
        nome: request.body.nome,
        imagem: request.body.imagem,
        citacao: request.body.citacao,
        minibio: request.body.minibio
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)

    } catch (erro) {
        console.log(erro)
    }

}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) { // caso o parâmetro minibio seja igual
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) { // caso o parâmetro imagem seja igual
            mulherEncontrada = request.body.imagem
        }

        if (request.body.citacao) { // caso o parâmetro citacao seja igual
            mulherEncontrada = request.body.citacao
        }
        
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados) // armazena no json

    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher (request, response) {

    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com sucesso!'})

    } catch (erro){
        console.log(erro)

    }
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


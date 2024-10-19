const mongoose = require('mongoose');
require('dotenv').config();

//define uma função assíncrona
async function conectaBancoDeDados() {
    try  {
        console.log('Conexão com o banco de dados iniciou.')

        await mongoose.connect(process.env.MONGODB_URL)

        console.log('Conexão com o banco de dados feita com sucesso!')
    } catch(erro) {
        console.log(erro)
    }
}

module.exports = conectaBancoDeDados
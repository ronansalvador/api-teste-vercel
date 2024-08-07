// Importa o Knex do arquivo db.js
const knex = require('../database/conexao')
const { message } = require('../schema/loginSchema')

const DBService = {
  // Função para criar a tabela `funcionario`
  create: async (req, res) => {
    console.log('entrou no create')
    try {
      const exists = await knex.schema.hasTable('funcionario')
      if (!exists) {
        await knex.schema.createTable('funcionario', (table) => {
          table.increments('id').primary()
          table.string('nome', 100).notNullable()
          table.string('email', 100).notNullable().unique()
          table.string('senha', 255).notNullable()
          table.string('cpf', 11).notNullable().unique() // Corrigido para string
          // Ou use o específico:
          // table.specificType('cpf', 'char(11)').notNullable().unique()
          table.string('telefone', 15)
          // dados dadosBancarios
          table.string('pix', 100)
          table.string('instituicao', 50)
          table.string('agencia', 50)
          table.string('conta', 50)
          table.string('cargo', 50)
        })
        console.log('Tabela `funcionario` criada com sucesso')
        res
          .status(200)
          .json({ message: 'Tabela `funcionario` criada com sucesso' })
      } else {
        console.log('Tabela `funcionario` já existe')
        res.status(201).json({ message: 'Tabela `funcionario` já existe' })
      }
    } catch (err) {
      console.error('Erro ao criar a tabela `funcionario`', err)
      throw err // Lança o erro para ser capturado no serviço ou controlador
    }
  },
}

// Exporta a classe FuncionarioService
module.exports = DBService

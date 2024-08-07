const knex = require('../database/conexao')

// Função para buscar usuários
const userService = {
  getUsers: async (req, res) => {
    try {
      const users = await knex.select('*').from('users')
      res.status(200).json(users)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
  },

  insertUser: async (req, res) => {
    const { name, email } = req.body

    try {
      const [newUser] = await knex('users')
        .insert({ name, email })
        .returning('*')

      console.log('Usuário inserido com sucesso:', newUser)
      res.status(201).json(newUser) // Retorna o usuário inserido com status 201 (Created)
    } catch (error) {
      console.error('Erro ao inserir usuário:', error)
      res.status(500).json({ error: 'Erro ao inserir usuário' })
    }
  },
}

module.exports = userService

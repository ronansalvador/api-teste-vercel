const knex = require('../database/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaToken = process.env.JWT_SECRET_KEY
require('dotenv').config()

const login = async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await knex('funcionario').where('email', email).first()

    if (!usuario) {
      return res
        .status(404)
        .json({ mensagem: 'E-mail e/ou senha inválido(s).' })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res
        .status(400)
        .json({ mensagem: 'E-mail e/ou senha inválido(s).' })
    }

    const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: '12h' })

    const { senha: _, ...usuarioLogado } = usuario

    return res.json({ usuario: usuarioLogado, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = login

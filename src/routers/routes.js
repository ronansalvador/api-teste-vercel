// src/routes/index.js

const express = require('express')
const userService = require('../services/users')
const router = express.Router()
const loginSchema = require('../schema/loginSchema.js')
const login = require('../controllers/login')
const DBService = require('../services/DBService.js')
const FuncionarioService = require('../services/funcionarios.js')

const validarRequisicao = require('../middleware/validarRequisicao.js')

// Rota de exemplo
router.get('/', (req, res) => {
  res.send('Olá, mundo!')
})

router.get('/initdb', DBService.create)

// router.get('/users', userService.getUsers)

// router.post('/users', userService.insertUser)

router.get('/func', FuncionarioService.getFuncionarios)
router.post('/func', FuncionarioService.insert)
router.post('/login', validarRequisicao(loginSchema), FuncionarioService.login)

module.exports = router

// {
//   "nome": "ciclano Oliveira",
//   "email": "ciclano@email.com",
//   "senha": "123456",
//   "cpf": "12345678901",
//   "telefone": "11987654321",
//   "pix": "ciclano@bank.com",
//   "instituicao": "Banco do Brasil",
//   "agencia": "0123",
//   "conta": "56789-1",
//   "cargo": "Gerente"
// }

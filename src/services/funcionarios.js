// Importa o Knex do arquivo db.js
const knex = require('../database/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sua_chave_secreta_aqui'

const FuncionarioService = {
  // Função para inserir dados na tabela `funcionario`
  insert: async (req, res) => {
    const {
      nome,
      email,
      senha,
      cpf,
      telefone,
      pix,
      instituicao,
      agencia,
      conta,
      cargo,
    } = req.body

    try {
      // Gera um hash para a senha com um salt
      const saltRounds = 10 // Número de iterações para o salt
      const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

      // Insere os dados no banco de dados
      const [id] = await knex('funcionario')
        .insert({
          nome,
          email,
          senha: senhaCriptografada, // Usa a senha criptografada
          cpf,
          telefone,
          pix,
          instituicao,
          agencia,
          conta,
          cargo,
        })
        .returning('id') // Retorna o ID do registro inserido

      res.status(201).json({ message: 'Funcionário inserido com sucesso', id })
    } catch (err) {
      console.error('Erro ao inserir funcionário', err)
      res.status(500).json({ error: `Erro ao inserir funcionário: ${err}` })
    }
  },

  // Função para obter todos os funcionários da tabela `funcionario`
  getFuncionarios: async (req, res) => {
    try {
      const funcionarios = await knex('funcionario').select('*')

      return res.status(200).json(funcionarios) // Retorna todos os funcionários encontrados
    } catch (err) {
      console.error('Erro ao buscar funcionários', err)
      throw err // Lança o erro para ser capturado no serviço ou controlador
    }
  },

  login: async (req, res) => {
    const { email, senha } = req.body

    // Verifica se o email e a senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    }

    try {
      // Busca o usuário pelo email no banco de dados
      const funcionario = await knex('funcionario').where({ email }).first()

      // Verifica se o funcionário foi encontrado
      if (!funcionario) {
        return res.status(401).json({ error: 'Email ou senha incorretos' })
      }

      // Compara a senha fornecida com a senha armazenada
      const senhaValida = await bcrypt.compare(senha, funcionario.senha)

      if (!senhaValida) {
        return res.status(401).json({ error: 'Email ou senha incorretos' })
      }

      // Gera o token JWT com os dados do usuário
      const token = jwt.sign(
        { id: funcionario.id, email: funcionario.email },
        JWT_SECRET,
        {
          expiresIn: '1h', // O token expira em 1 hora
        },
      )

      // Retorna o token JWT
      res.status(200).json({ message: 'Login bem-sucedido', token })
    } catch (err) {
      console.error('Erro ao fazer login', err)
      res.status(500).json({ error: 'Erro ao fazer login' })
    }
  },
}

// Exporta a classe FuncionarioService
module.exports = FuncionarioService

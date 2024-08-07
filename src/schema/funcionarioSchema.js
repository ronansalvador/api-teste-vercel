const joi = require('joi')

const funcionarioSchema = joi.object({
  id: joi.number().integer().optional().messages({
    'number.base': 'O campo ID deve ser um número.',
    'number.integer': 'O campo ID deve ser um número inteiro.',
  }),

  nome: joi.string().max(100).required().messages({
    'string.max': 'O campo nome pode ter no máximo 100 caracteres.',
    'any.required': 'O campo nome é obrigatório.',
    'string.empty': 'O campo nome é obrigatório.',
  }),

  email: joi.string().email().max(100).required().messages({
    'string.email': 'E-mail inválido.',
    'string.max': 'O campo e-mail pode ter no máximo 100 caracteres.',
    'string.empty': 'O campo e-mail é obrigatório.',
    'any.required': 'O campo e-mail é obrigatório.',
  }),

  senha: joi.string().min(4).max(255).required().messages({
    'any.required': 'O campo senha é obrigatório.',
    'string.empty': 'O campo senha é obrigatório.',
    'string.min': 'O campo senha deve conter no mínimo 4 caracteres.',
    'string.max': 'O campo senha pode ter no máximo 255 caracteres.',
  }),

  cpf: joi.string().length(11).required().messages({
    'any.required': 'O campo CPF é obrigatório.',
    'string.empty': 'O campo CPF é obrigatório.',
    'string.length': 'O campo CPF deve conter exatamente 11 caracteres.',
  }),

  telefone: joi.string().max(15).optional().allow('').messages({
    'string.max': 'O campo telefone pode ter no máximo 15 caracteres.',
  }),

  chave_pix: joi.string().max(100).optional().allow('').messages({
    'string.max': 'O campo chave PIX pode ter no máximo 100 caracteres.',
  }),

  instituicao: joi.string().max(50).optional().allow('').messages({
    'string.max': 'O campo instituição pode ter no máximo 50 caracteres.',
  }),

  agencia: joi.string().max(50).optional().allow('').messages({
    'string.max': 'O campo agência pode ter no máximo 50 caracteres.',
  }),

  conta: joi.string().max(50).optional().allow('').messages({
    'string.max': 'O campo conta pode ter no máximo 50 caracteres.',
  }),

  cargo: joi.string().max(50).optional().allow('').messages({
    'string.max': 'O campo cargo pode ter no máximo 50 caracteres.',
  }),
})

module.exports = funcionarioSchema

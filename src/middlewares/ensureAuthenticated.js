const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfigs = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  // pegando dados do token do usuário dentro do cabeçalho (header) da requisição
  const authHeader = request.header.authorization

  // verificando se o token existe
  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401)
  }

  // se o token existe. separando o token do cabeçalho e armazenando em uma variável
  const [, token] = authHeader.split(' ')

  try {
    // verificando se o token é válido. E apelidando como "user_id"
    const { sub: user_id } = verify(token, authConfigs.jwt.secret)

    // criando propriedade que nn existia na requisição e chamando ela de "user" e criando outra propriedade chamada de id, voltando ela para um número, que o "user_id"
    request.user = {
      id: Number(user_id)
    }

    // tudo certo, então continua a requisição/aplicação normal
    return next()
  } catch {
    // caso algo der errado
    throw new AppError('JWT Token inválido', 401)
  }
}

module.exports = ensureAuthenticated

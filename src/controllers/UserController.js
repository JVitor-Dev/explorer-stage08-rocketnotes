/**
 * máximo 5 funções
 * index - GET para listar vários registros.
 * show - GET para exibir um registro espefico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 *
 * se for precisar criar mais de 5 metodos é melhor criar um controller separado
 */
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { hash } = require('bcrypt')

class UserController {
  async create(request, response) {
    const { name, email, senha } = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExists) {
      console.log(
        `Email: ${checkUserExists.email}, já cadastrado para: ${checkUserExists.name}`
      )
      throw new AppError('Email já em uso.')
    }

    const hashedPassowrd = await hash(senha, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, hashedPassowrd]
    )

    return response.status(201).json()
  }
}

module.exports = UserController

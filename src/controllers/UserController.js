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

class UserController {
  async create(request, response) {
    const { name, email, senha } = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExists) {
      throw new AppError('Email já em uso.')
    }
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, senha]
    )

    return response.status(201).json({ message: 'User created' })
  }
}

module.exports = UserController

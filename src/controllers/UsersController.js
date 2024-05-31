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
const { hash } = require('bcrypt')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class UserController {
  async create(request, response) {
    try {
      const { name, email, password } = request.body

      const database = await sqliteConnection()
      const checkUserExists = await database.get(
        'SELECT * FROM users WHERE email = (?)',
        [email]
      )

      if (checkUserExists) {
        throw new AppError('Este e-mail já está em uso.')
      }

      const hashedPassword = await hash(password, 8)

      await database.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      )

      return response.status(201).json()
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

module.exports = UserController

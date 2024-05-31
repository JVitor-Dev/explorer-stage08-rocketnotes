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
const { hash, compare } = require('bcrypt')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { application } = require('express')

class UsersController {
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

  async update(request, response) {
    try {
      const { name, email, password, old_password } = request.body
      const { id } = request.params

      const database = await sqliteConnection()
      const user = await database.get('SELECT * FROM users WHERE id = (?)', [
        id
      ])

      if (!user) {
        throw new AppError('Usuário não encontrado.')
      }

      const userWithUpdatedEmail = await database.get(
        'SELECT * FROM users WHERE email = (?)',
        [email]
      )

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError('Este email já está em uso.')
      }

      user.name = name
      user.email = email

      if (password && !old_password) {
        throw new AppError(
          'Você precisa informa a senha antiga para redifinir a nova'
        )
      }

      if (password && old_password) {
        const checkOldPassword = await compare(old_password, user.password)

        if (!checkOldPassword) {
          throw new AppError('A senha antiga está incorreta.')
        }

        user.password = await hash(password, 8)
      }

      await database.run(
        `
      UPDATE users SET
      name = ?,
      email = ?,
      passord = ?,
      updated_at = ?
      WHERE id = ?`,
        [user.name, user.email, user.password, new Date(), id]
      )

      return response.json()
    } catch (error) {
      return response.status(400).json({ error: 'error catch' })
    }
  }
}

module.exports = UsersController

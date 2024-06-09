const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id //id do usuário logado
    const avatarFilename = request.file.filename // nome do arquivo enviado

    const diskStorage = new DiskStorage() // acessando as pastas com a foto enviada

    const user = await knex('users').where({ id: user_id }).first() // buscando dados do usuario no banco de dados

    // verificando se o usuário existe
    if (!user) {
      throw new AppError(
        'Somente usuários autenticados podem mudar o avatar',
        401
      )
    }

    // apagando foto antiga caso já haja alguma
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    // salvando a foto na pasta uploads
    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename //botando nova imagem no avatar

    await knex('users').update(user).where({ id: user_id }) // salvando no banco de dados

    return response.json(user) // retornando os dados atualizados
  }
}

module.exports = UserAvatarController

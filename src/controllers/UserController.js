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

class UserController {
  create(request, response) {
    const { name, email, senha } = request.body

    response.status(201).json({ name, email, senha })
  }
}

module.exports = UserController

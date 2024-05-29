const { Router } = require('express')

const usersRoutes = Router()

usersRoutes.post('/', (req, res) => {
  const { name } = req.body

  res.send(`Usuário logado: Bem vindo ${name}.`)
})

module.exports = usersRoutes

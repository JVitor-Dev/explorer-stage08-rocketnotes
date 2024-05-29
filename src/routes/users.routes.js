const { Router } = require('express')

const usersRoutes = Router()

usersRoutes.post('/', (req, res) => {
  const { name, email, senha } = req.body

  res.send(`Usuário: ${name}. E-mail: ${email}. Senha: ${senha}`)
})

module.exports = usersRoutes

// unir todos os grupos de rotas que estarão separadas por arquivos

const { Router } = require('express')

const usersRoutes = require('./users.routes')
const loginRoutes = require('./login.route')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/login', loginRoutes)

module.exports = routes

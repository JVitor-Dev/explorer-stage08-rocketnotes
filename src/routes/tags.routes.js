const { Router } = require('express')

const TagsController = require('../controllers/TagsController')

const tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.get('/:user_id', tagsController.index)
// tagsRoutes.post('/:user_id', tagsController.createNotes)
// tagsRoutes.get('/:id', tagsController.show)
// tagsRoutes.delete('/:id', tagsController.delete)

module.exports = tagsRoutes

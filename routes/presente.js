var express = require('express')
var router = express.Router()
var presenteController = require('../controllers/presente')

//Modificacion
router.get('/update/:codA', presenteController.updateForm)
router.post('/update/:codA', presenteController.update)

//Busqueda
router.get('/list', presenteController.search)

module.exports = router

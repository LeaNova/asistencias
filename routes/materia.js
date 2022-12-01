var express = require("express")
var router = express.Router()
var materiaController = require("../controllers/materia")
const auth = require('../middleware/auth')

//Index
router.get('/', auth.isCoordinador, materiaController.home)

//Alta
router.get('/create', auth.isCoordinador, materiaController.createForm)
router.post('/create', auth.isCoordinador, materiaController.create)

//Baja
router.get('/delete/:cod', auth.isCoordinador, materiaController.deleteForm)
router.post('/delete/:cod', auth.isCoordinador, materiaController.delete)

//Modificacion
router.get('/update/:cod', auth.isCoordinador, materiaController.updateForm)
router.post('/update/:cod', auth.isCoordinador, materiaController.update)

//Busquedas
router.get('/profesor', auth.isProfesor, materiaController.readOwn)

module.exports = router

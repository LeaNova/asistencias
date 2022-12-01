var express = require('express')
var router = express.Router()
var inscripcionController = require('../controllers/inscripcion')
const auth = require('../middleware/auth')

//Alta
router.get('/create', auth.isAlumno, inscripcionController.createForm)
router.post('/create', auth.isAlumno, inscripcionController.create)

//Busquedas
router.get('/list', auth.isProfesor, inscripcionController.list)
router.get('/alumno/list', auth.isAlumno, inscripcionController.readOwn)

//Acciones
router.post('/validar/:DNI/:cod', auth.isProfesor, inscripcionController.validate)

module.exports = router

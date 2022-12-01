var express = require("express")
var router = express.Router()
var asistenciaController = require("../controllers/asistencia")

//Alta
router.get('/create/:cod', asistenciaController.createForm)
router.post('/create/:cod', asistenciaController.create)

//Modificacion
router.post('/change/:codM/:codA', asistenciaController.change)

//Busquedas
router.get('/planilla/:cod', asistenciaController.list)

module.exports = router
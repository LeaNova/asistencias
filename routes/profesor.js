var express = require("express")
var router = express.Router()
var profesorController = require("../controllers/profesor")

//Index
router.get("/", profesorController.home)

//Alta
router.get("/create", profesorController.createForm)
router.post("/create", profesorController.create)

//Baja
router.get('/delete/:DNI/:cod', profesorController.deleteForm)
router.post('/delete/:DNI/:cod', profesorController.delete)

//Modificacion
router.get('/update/:DNI/:cod', profesorController.updateForm)
router.post('/update/:DNI/:cod', profesorController.update)

//Busquedas
router.get('/list/:DNI', profesorController.listMaterias)

module.exports = router;
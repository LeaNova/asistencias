var express = require('express');
var router = express.Router();
var horarioController = require('../controllers/horarioMateria');

//Home
router.get('/', horarioController.home)

//alta
router.get("/create", horarioController.createForm);
router.post("/create", horarioController.create);

//baja
router.get("/delete/:id", horarioController.deleteForm);
router.post("/delete/:id", horarioController.delete);

//modificacion
router.get("/update/:id", horarioController.updateForm);
router.post("/update/:id", horarioController.update);

module.exports = router;
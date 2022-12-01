var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuario");

//Registrarse
router.get("/signup", usuarioController.signupForm);
router.post("/signup", usuarioController.signup);

//Login
router.get("/login", usuarioController.loginForm);
router.post("/login", usuarioController.login);

//Logout
router.get("/logout", usuarioController.logout);

module.exports = router;

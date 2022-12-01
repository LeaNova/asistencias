const Usuario = require('../models').Usuario
const Access = require('../models').Access
const Alumno = require('../models').Alumno
const bcrypt = require('bcrypt')

exports.signupForm = async function(req, res) {
    const usuario = req.session.usuario
    const allAccess = await Access.findAll()
    res.render("./account/signup", { usuario: usuario, access: allAccess })
}

exports.signup = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    const allAccess = await Access.findAll()
    let valido = true
    try {
        let error
        //Revisa campo DNI
        if(!body.DNI) {
            error = "Ingrese nro. de DNI"
            valido = false
        } else if(contieneLetra(body.DNI)) {
            error = "Ingrese nro. de DNI valido."
            valido = false
        }

        //Revisa campo Nombre
        if(valido) {
            if(!body.nombre) {
                error = "Ingrese su/s nombre/s"
                valido = false
            } else if(contieneNumero(body.nombre)) {
                error = "Ingrese su/s nombre/s corractamente"
                valido = false
            }
        }

        //Revisa campo Apellido
        if(valido) {
            if(!body.apellido) {
                error = "Ingrese su/s apellido/s"
                valido = false
            } else if(contieneNumero(body.apellido)) {
                error = "Ingrese su/s apellido/s corractamente"
                valido = false
            }
        }

        //Revisa campo Mail
        if(valido) {
            if(!(body.mail)) {
                error = "Ingrese su direccion mail"
                valido = false
            } else if(!body.mail.includes("mail.com")) {
                error = "Ingrese una direccion mail valida"
                valido = false
            }
        }

        //Revisa campo Contraseña
        if(valido) {
            if(!body.pass) {
                error = "Ingrese una contraseña"
                valido = false
            }
        }
        
        let access
        let redirect

        if(valido) {
            if(usuario.Access.nombre == "Coordinador") {
                access = 2;
                redirect = "/profesor"
            } else {
                access = 3;
                redirect = "/"
            }

            let newUser = await Usuario.create({
                DNI: body.DNI,
                nombre: body.nombre,
                apellido: body.apellido,
                mail: body.mail,
                pass: body.pass,
                idAccess: access
            })

            let salt = await bcrypt.genSalt(10)
            newUser.pass = await bcrypt.hash(newUser.pass, salt)

            if(access == 3) {
                Alumno.create({
                    DNI: newUser.DNI
                })
            }

            newUser.save().then((doc) => res.status(201).redirect(redirect))
        } else {
            res.status(400).render("./account/signup", { usuario: usuario, error: error, access: allAccess })
        }
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrio"

        res.status(500).render("./account/signup", { usuario: usuario, error: error, access: allAccess })
    }
}

exports.loginForm = async function(req, res) {
    res.render("./account/login");
}

exports.login = async function(req, res) {
    const body = req.body;
    try {
        let usuario = await Usuario.findOne({
            include: Access,
            where: { mail: body.mail }
        });
        if(usuario) {
            let validPassword = await bcrypt.compare(body.pass, usuario.pass);
            if(validPassword) {
                req.session.isAutenticated = true;
                req.session.usuario = usuario;

                res.status(200).redirect("/");
            } else {
                let error = "Usuario o contraseña incorrecta"

                res.status(400).render("./account/login", { error: error });
            }
        } else {
            let error = "Usuario invalido"
            
            res.status(400).render("./account/login", { error: error });
        }
    } catch (ex) {
        console.log(ex);
        let error = "Algo inesperado ocurrio"

        res.status(400).render("./account/login", { error: error });
    }
}

exports.logout = async function(req, res) {
    req.session.destroy();
    res.redirect('./login')
}

//Validaciones
function contieneLetra(str) {
    return /[a-zA-z]/.test(str)
}

function contieneNumero(str) {
    return /[0-9]/.test(str)
}

exports.isCoordinador = function(req, res, next) {
    if(req.session.isAutenticated && req.session.isAutenticated == true && req.session.usuario.Access.nombre == "Coordinador") {
        next();
    } else {
        res.redirect("/");
    }
}

exports.isProfesor = function(req, res, next) {
    if(req.session.isAutenticated && req.session.isAutenticated == true && req.session.usuario.Access.nombre == "Profesor") {
        next();
    } else {
        res.redirect("/");
    }
}

exports.isBoth = function(req, res, next) {
    if(req.session.isAutenticated && req.session.isAutenticated == true && (req.session.usuario.Access.nombre == "Profesor" || req.session.usuario.Access.nombre == "Coordinador")) {
        next();
    } else {
        res.redirect("/");
    }
}

exports.isAlumno = function(req, res, next) {
    if(req.session.isAutenticated && req.session.isAutenticated == true && req.session.usuario.Access.nombre == "Alumno") {
        next();
    } else {
        res.redirect("/usuario/login");
    }
}

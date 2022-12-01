const Materia = require('../models').Materia
const Dictado = require('../models').Dictado
const Profesor = require('../models').Profesor
const Asistencia = require('../models').Asistencia
const Presente = require('../models').Presente

exports.home = async function(req, res) {
    const usuario = req.session.usuario
    const materias = await Materia.findAll({
        include: [ Dictado, {
            model: Asistencia,
            include: Presente
        } ],
        order: [['año', 'ASC']]
    })

    let asistencia = []
    for(let i = 0; i < materias.length; i++) {
        let porcentaje = contarPorcentaje(materias[i].Asistencia)
        let color = colorPorcentaje(porcentaje)
        asistencia.push({
            "codMateria": materias[i].codMateria,
            "porcentaje": porcentaje + "%",
            "color": color
        })
        console.log(asistencia[i])
    }

    res.render('./materia/index', { usuario: usuario, materias: materias, asistencia: asistencia })
}

//Alta
exports.createForm = async function(req, res) {
    const usuario = req.session.usuario
    const dictados = await Dictado.findAll()
    res.render('./materia/create', { usuario: usuario, dictados: dictados })
}

exports.create = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    const dictados = await Dictado.findAll()
    let valido = true

    try {
        let error = "Hubo un error"
        //Revisa campo Nombre
        if(!body.nombre) {
            error = "Ingrese nombre de la materia"
            valido = false
        }

        //Revisa el campo ciclo
        if(valido) {
            if(body.ciclo < new Date().getFullYear()) {
                error = "El ciclo debe ser este año o futuro"
                valido = false
            }
        }
        //Revisa campo Año
        if(valido) {
            if(!body.anio) {
                error = "Ingrese el año de cursada de la materia"
                valido = false
            } else if(body.anio < 1 || body.anio > 3) {
                error = "Ingrese un año entre 1 a 3"
                valido = false
            }
        }
        
        //Revisa campos fechas
        if(valido) {
            if(body.inicio && body.fin) {
                let fechaI = new Date(body.inicio)
                let fechaF = new Date(body.fin)
                if(fechaI > fechaF) {
                    error = "Las fechas de inicio y finalizacion deben ser validas"
                    valido = false
                }
            } else {
                error = "Ingrese las fechas de inicio y finalización"
                valido = false
            }
        }

        if(valido) {
            Materia.create({
                codMateria: generarCodigo(body.nombre) + "-" + body.ciclo,
                nombre: body.nombre,
                ciclo: body.ciclo,
                año: body.anio,
                inicio: body.inicio,
                fin: body.fin,
                idDictado: body.dictado
            }).then((result) => {
                let success = "Materia cargada correctamente"

                res.status(200).render('./materia/create', { usuario: usuario, success: success, dictados: dictados })
            }).catch((err) => {
                console.log(err)
                error = "No se pudo cargar la materia"

                res.status(400).render('./materia/create', { usuario: usuario, error: error, dictados: dictados })
            })
        } else {
            res.status(400).render("./materia/create", { usuario: usuario, error: error, dictados: dictados })
        }
    } catch (ex) {
        console.log(ex);
        let error = "Algo inesperado ocurrio"

        res.status(500).render('./materia/create', { usuario: usuario, error: error, dictados: dictados})
    }
}

//Baja
exports.deleteForm = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Materia.findByPk(req.params.cod, {
        include: Dictado
    })
    res.render('./materia/delete', { usuario: usuario, item: item })
}

exports.delete = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Materia.findByPk(req.params.cod, {
        include: Dictado
    })

    try {
        Materia.destroy({
            where: { codMateria: item.codMateria }
        }).then((result) => {
            let success = "La materia " + item.nombre + " fue borrado exitosamente"

            res.status(200).render('./result', { usuario: usuario, success: success })
        
        }).catch((err) => {
            console.log(err);
            let error = "No se pudo borrar la materia"

            res.status(400).render('./materia/delete', { usuario: usuario, error: error, item: item })
        })
    } catch (ex) {
        console.log(ex);
        let error = "Algo inesperado ocurrió"

        res.status(500).render('./materia/delete', { usuario: usuario, error: error, item: item })
    }
}

//Modificacion
exports.updateForm = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Materia.findByPk(req.params.cod)
    const dictados = await Dictado.findAll()

    res.render('./materia/create', { usuario: usuario, item: item, dictados: dictados })
}

exports.update = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    let item = await Materia.findByPk(req.params.cod)
    const dictados = await Dictado.findAll()
    let valido = true

    try {
        let error = "Hubo un error"
        //Revisa campo Nombre
        if(!body.nombre) {
            error = "Ingrese nombre de la materia"
            valido = false
        }

        //Revisa el campo ciclo
        if(valido) {
            if(body.ciclo < new Date().getFullYear()) {
                error = "El ciclo debe ser este año o futuro"
                valido = false
            }
        }
        //Revisa campo Año
        if(valido) {
            if(!body.anio) {
                error = "Ingrese el año de cursada de la materia"
                valido = false
            } else if(body.anio < 1 || body.anio > 3) {
                error = "Ingrese un año entre 1 a 3"
                valido = false
            }
        }
        
        //Revisa campos fechas
        if(valido) {
            if(body.inicio && body.fin) {
                let fechaI = new Date(body.inicio)
                let fechaF = new Date(body.fin)
                if(fechaI > fechaF) {
                    error = "Las fechas de inicio y finalizacion deben ser validas"
                    valido = false
                }
            } else {
                error = "Ingrese las fechas de inicio y finalización"
                valido = false
            }
        }

        if(valido) {
            Materia.update({
                nombre: body.nombre,
                ciclo: body.ciclo,
                año: body.anio,
                inicio: body.inicio,
                fin: body.fin,
                idDictado: body.dictado
            }, {
                where: { codMateria: item.codMateria }
            }).then((result) => {
                let success = "Materia actualizada correctamente"

                res.status(200).render('./materia/create', { usuario: usuario, success: success, item: item, dictados: dictados })
            }).catch((err) => {
                console.log(err)
                let error = "No se pudo actualizar la carrera"
                
                res.status(400).render('./materia/create', { usuario: usuario, error: error, item: item, dictados: dictados })
            })
        } else {
            res.status(400).render("./materia/create", { usuario: usuario, error: error, item: item, dictados: dictados })
        }
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"

        res.status(500).render('./materia/create', { usuario: usuario, error: error, item: item, dictados: dictados })
    }
}

//Busquedas
exports.readOwn = async function(req, res) {
    const usuario = req.session.usuario
    const materias = await Profesor.findAll({
        include: Materia,
        where: { DNI: usuario.DNI }
    })

    res.render('./materia/materias', { usuario: usuario, materias: materias })
}

//Funciones
function generarCodigo(strMat) {
    let codMateria
    let materia = ""
    let aux = strMat.toUpperCase().split(" ")
    let auxCant = aux.length

    if(auxCant > 2) {
        if(aux[auxCant -1] == "I" || aux[auxCant -1] == "II" || aux[auxCant -1] == "III" ) {
            let part = aux.pop()

            let palabras = aux.filter(x => x != "EN")
            .filter(x => x != "DE")
            .filter(x => x != "Y")

            for(i = 0; i < palabras.length; i++) {
                materia = materia + palabras[i].substring(0, 1)
            }

            materia = materia + part.length;
        } else {
            let palabras = aux.filter(x => x != "EN")
            .filter(x => x != "DE")
            .filter(x => x != "Y")

            for(i = 0; i < palabras.length; i++) {
                materia = materia + palabras[i].substring(0, 1)
            }
        }
    } else if (auxCant == 2) {
        if(aux[auxCant -1] == "I" || aux[auxCant -1] == "II" || aux[auxCant -1] == "III" ) {
            let part = aux.pop()

            materia = strMat.substring(0, 3).toUpperCase() + part.length;
        } else {
            let palabras = aux.filter(x => x != "EN")
            .filter(x => x != "DE")
            .filter(x => x != "Y")

            for(i = 0; i < palabras.length; i++) {
                materia = materia + palabras[i].substring(0, 1)
            }
        }
    } else {
        materia = strMat.substring(0, 3).toUpperCase()
    }

    codMateria = materia
    return codMateria
}

function contarPorcentaje(arr) {
    let cantPresentes = 0
    let cantTotal = 0
    let porcentaje = 0
    
    if(arr.length > 0) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].enCuenta) {
                for(let j = 0; j < arr[i].Presentes.length; j++) {
                    if(arr[i].Presentes[j].presente) {
                        cantPresentes++
                    }
                }
                cantTotal = cantTotal + arr[i].Presentes.length
            }
        }
        porcentaje = (cantPresentes / cantTotal) * 100
    }
    
    return porcentaje.toFixed(2)
}

function colorPorcentaje(porcentaje) {
    let color = ""
    if(porcentaje <= 33.33) {
        color = "rojo"
    } else if(porcentaje > 66.66) {
        color = "verde"
    } else {
        color = "amarillo"
    }

    return color
}

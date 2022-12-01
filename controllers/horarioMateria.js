const Horario = require('../models').HorarioMateria
const Materia = require('../models').Materia
const Dia = require('../models').Dia
const Profesor = require('../models').Profesor

exports.home = async function(req, res) {
    const usuario = req.session.usuario
    const horarios = await Profesor.findAll({
        include: {
            model: Materia,
            include: {
                model: Horario,
                include: Dia
            }
        },
        where: { DNI: usuario.DNI }
    })

    corregirHorarios(horarios)

    res.render('./horario/index', { usuario: usuario, horarios: horarios })
}

//Alta
exports.createForm = async function(req, res) {
    const usuario = req.session.usuario
    const matProfesor = await Profesor.findAll({
        attributes: ['codMateria'],
        include: Materia,
        where: { DNI: usuario.DNI }
    })
    const dias = await Dia.findAll()
    
    res.render("./horario/create", { usuario: usuario, matProfesor: matProfesor, dias: dias })
}

exports.create = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    const matProfesor = await Profesor.findAll({
        attributes: ['codMateria'],
        include: Materia,
        where: { DNI: usuario.DNI }
    })
    const dias = await Dia.findAll()
    let valido = true
    try {
        let error
        if(!body.horaInicio) {
            error = "Ingrese hora de inicio"
            valido = false
        }

        if(valido) {
            if(!body.horaFin) {
                error = "Ingrese hora de finalización"
                valido = false
            }
        }
        
        //Revisa si no tiene horarios superpuestos
        if(valido) {
            let conflicto = await horaSuperpuesta(body.horaInicio, body.dia, usuario.DNI)
            if(conflicto.length > 0) {
                error = "Se encontro conflicto con la/s siguiente/s materia/s"
                for(let i = 0; i < conflicto.length; i++) {
                    error = error + `
                    \n${conflicto[i].materia} entre ${conflicto[i].horario}hs los dias ${conflicto[i].dia}`
                }
                valido = false
            }
        }

        if(valido) {
            if(horaCorrecta(body.horaInicio, body.horaFin)) {
                Horario.create({
                    codMateria: body.materia,
                    horaInicio: body.horaInicio,
                    horaFin: body.horaFin,
                    idDia: body.dia
                }).then((result) => {
                    let success = "Hora cargada correctamente"

                    res.status(200).render("./horario/create", { usuario: usuario, success: success, matProfesor: matProfesor, dias: dias })
                }).catch((error) => res.json(error));
            } else {
                res.status(200).render("./horario/create", { usuario: usuario, success: success, matProfesor: matProfesor, dias: dias })
            }
        } else {
            res.status(400).render("./horario/create", { usuario: usuario, error: error, matProfesor: matProfesor, dias: dias })
        }
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrio"

        res.status(500).render("./horario/create", { usuario: usuario, error: error, matProfesor: matProfesor, dias: dias })
    }
}

//Baja
exports.deleteForm = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Horario.findOne({
        include: Materia,
        where: { idHorario: req.params.id }
    })

    corregirHora(item)

    res.render('./horario/delete', { usuario: usuario, item: item })
}

exports.delete = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Horario.findOne({
        include: Materia,
        where: { idHorario: req.params.id }
    })

    corregirHora(item)

    try {
        Horario.destroy({
            where: { idHorario: item.idHorario }
        }).then((result) => {
            let success = "Horario borrado correctamente"

            res.status(200).render('./horario/delete', { usuario: usuario, success: success, item: item })
        }).catch((err) => {
            console.log(err)
            let error = "No se pudo borrar el horario"

            res.status(400).render('./horario/delete', { usuario: usuario, error: error, item: item })
        })
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"
        
        res.status(500).render('./horario/delete', { usuario: usuario, error: error, item: item })
    }
}

//Modificacion
exports.updateForm = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Horario.findOne({
        include: Materia,
        where: { idHorario: req.params.id }
    })
    const matProfesor = await Profesor.findAll({
        attributes: ['codMateria'],
        include: Materia,
        where: { DNI: usuario.DNI }
    })
    const dias = await Dia.findAll()

    res.render("./horario/create", { usuario: usuario, item: item, matProfesor: matProfesor, dias: dias })
}

exports.update = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    let item = await Horario.findByPk(req.params.id)
    const matProfesor = await Profesor.findAll({
        attributes: ['codMateria'],
        include: Materia,
        where: { DNI: usuario.DNI }
    })
    const dias = await Dia.findAll()
    let valido = true

    try {
        let error
        if(!body.horaInicio) {
            error = "Ingrese hora de inicio"
            valido = false
        }

        if(valido) {
            if(!body.horaFin) {
                error = "Ingrese hora de finalización"
                valido = false
            }
        }
        
        //Revisa si no tiene horarios superpuestos
        if(valido) {
            let conflicto = await horaSuperpuesta(body.horaInicio, usuario.DNI)
            if(conflicto.length > 0) {
                error = "Se encontro conflicto con la/s siguiente/s materia/s"
                for(let i = 0; i < conflicto.length; i++) {
                    error = error + `\n${conflicto[i].materia} entre ${conflicto[i].horario}`
                }
                valido = false
            }
        }

        if(valido) {
            if(horaCorrecta(body.horaInicio, body.horaFin)) {
                Horario.update({
                    horaInicio: body.horaInicio,
                    horaFin: body.horaFin,
                    idDia: body.dia
                }, {
                    where: { idHorario: item.idHorario }
                })
            } else {
                res.status(400).render('./horario/create'), { usuario: usuario, error: error, matProfesor: matProfesor, dias: dias, item: item }
            }
        } else {
            res.status(400).render("./horario/create", { usuario: usuario, error: error, matProfesor: matProfesor, dias: dias })
        }
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"

        res.status(500).render('./horario/create'), { usuario: usuario, error: error, matProfesor: matProfesor, dias: dias, item: item }
    }
    
}

//Funciones
function corregirHorarios(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].Materium.HorarioMateria.length; j++) {
            //Inicio
            let horaI = arr[i].Materium.HorarioMateria[j].horaInicio.slice(0, -3)
            arr[i].Materium.HorarioMateria[j].horaInicio = horaI
            //Final
            let horaF = arr[i].Materium.HorarioMateria[j].horaFin.slice(0, -3)
            arr[i].Materium.HorarioMateria[j].horaFin = horaF
        }
    }
    return arr
}

async function horaSuperpuesta(inicio, dia, DNI) {
    const materias = await Profesor.findAll({
        include: [{
            model: Materia,
            attributes: ['codMateria', 'nombre'],
            include: {
                model: Horario,
                attributes: ['horaInicio', 'horaFin'],
                include: Dia
            }
        }],
        where: { DNI: DNI }
    })

    let horaI = parseInt(inicio.replace(":", ""))

    let conflicto = []
    for(let i = 0; i < materias.length; i++) {
        let item = materias[i].Materium

        for(let j = 0; j < item.HorarioMateria.length; j++) {
            let horario = item.HorarioMateria[j]
            let horaF = parseInt(horario.horaFin.replace(":", ""))
            
            if(horaF > horaI && horario.Dium.idDia == dia) {
                conflicto.push({
                    "materia": item.nombre,
                    "horario": horario.horaInicio.slice(0, -3) + " - " + horario.horaFin.slice(0, -3),
                    "dia": horario.Dium.dia
                })
            }
        }
    }

    return conflicto
}

function horaCorrecta(inicio, fin) {
    let horaI = parseInt(inicio.replace(":", ""))
    let horaF = parseInt(fin.replace(":", ""))

    return horaI < horaF
}

function corregirHora(horario) {
    let horaI = horario.horaInicio.slice(0, -3)
    horario.horaInicio = horaI

    let horaF = horario.horaFin.slice(0, -3)
    horario.horaFin = horaF

    return horario
}

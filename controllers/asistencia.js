const { Op } = require('sequelize')

const Asistencia = require('../models').Asistencia
const Materia = require('../models').Materia
const Horario = require('../models').HorarioMateria
const Dia = require('../models').Dia
const Profesor = require('../models').Profesor
const Rol = require('../models').Rol
const Alumno = require('../models').Alumno
const Presente = require('../models').Presente
const Usuario = require('../models').Usuario
const Inscripcion = require('../models').Inscripcion
const Condicion = require('../models').Condicion

//Alta
exports.createForm = async function(req, res) {
    const usuario = req.session.usuario
    const materia = await Materia.findByPk(req.params.cod)
    
    res.render('./asistencia/create', { usuario: usuario, materia: materia })
}

exports.create = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    const materia = await Materia.findByPk(req.params.cod)
    try {
        let generar = await createList(materia.codMateria, usuario.DNI)

        if(generar.length > 0) {
            for(let i = 0; i < generar.length; i++) {
                Asistencia.create({
                    codAsistencia: materia.codMateria + "-" + generar[i].codAsistencia,
                    codMateria: generar[i].codMateria,
                    fecha: generar[i].fecha,
                })
            }
            
            Profesor.update({
                generado: "true"
            }, {
                where: {
                    DNI: usuario.DNI,
                    codMateria: materia.codMateria
                }
            }).then((result) => {
                let success = "Asistencias agregadas"

                res.status(200).render('./asistencia/create', { usuario: usuario, success: success, materia: materia })
            })
        } else {
            let error = "Primero debe cargar horarios"
    
            res.status(500).render('./asistencia/create', { usuario: usuario, error: error, materia: materia })
        }
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"

        res.status(500).render('./asistencia/create', { usuario: usuario, error: error, materia: materia })
    }
}

//Modificacion
exports.change = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    const materia = await Materia.findByPk(req.params.codM)
    const asistencias = await Asistencia.findAll({
        where: { codMateria: materia.codMateria },
        order: [['fecha', 'ASC']]
    })
    const presentes = await Alumno.findAll({
        include: [{
            model: Usuario,
            attributes: ['nombre', 'apellido', 'mail'],
        }, {
            model: Inscripcion,
            include: {
                model: Condicion,
                where: { nombre: { [Op.notLike]: "Pendiente" } }
            },
            where: { codMateria: materia.codMateria }
        }, {
            model: Presente,
            include: {
                model: Asistencia,
                where: { codMateria: materia.codMateria }
            }
        }]
    })

    try {
        Asistencia.update({
            enCuenta: body.cambio ? "false" : "true"
        }, {
            where: { codAsistencia: req.params.codA }
        }).then((result) => {
            res.redirect(`/asistencia/planilla/${req.params.codM}`)
        })
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"

        res.render('./asistencia/list', { usuario: usuario, materia: materia, asistencias: asistencias, presentes: presentes})
    }
}

//Busquedas
exports.list = async function(req, res) {
    const usuario = req.session.usuario
    const materia = await Materia.findByPk(req.params.cod)
    const asistencias = await Asistencia.findAll({
        where: { codMateria: materia.codMateria },
        order: [['fecha', 'ASC']]
    })
    const presentes = await Alumno.findAll({
        include: [{
            model: Usuario,
            attributes: ['nombre', 'apellido', 'mail'],
        }, {
            model: Inscripcion,
            include: {
                model: Condicion,
                where: { nombre: { [Op.notLike]: "Pendiente" } }
            },
            where: { codMateria: materia.codMateria }
        }, {
            model: Presente,
            include: {
                model: Asistencia,
                where: { codMateria: materia.codMateria }
            }
        }]
    })

    res.render('./asistencia/list', { usuario: usuario, materia: materia, asistencias: asistencias, presentes: presentes})
}

//Funciones
async function createList(cod, DNI) {
    const materia = await Materia.findOne({
        attributes: ['codMateria', 'nombre', 'ciclo', 'inicio', 'fin'],
        include: [{
            model: Profesor,
            include: {
                model: Rol,
                where: { nombre: "Responsable" }
            },
            where: { DNI: DNI }
        }, {
            model: Horario,
            attributes: ['horaInicio', 'HoraFin'],
            include: Dia
        }],
        where: { codMateria: cod }
    })

    let fechaI = new Date(materia.inicio)
    fechaI.setHours(fechaI.getHours() +3)
    let fechaF = new Date(materia.fin)
    fechaF.setHours(fechaF.getHours() +3)

    let diaSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    let generar = []

    for(let inicio = fechaI; inicio < fechaF; inicio.setDate(inicio.getDate()+1)) {

        for(let i = 0; i < materia.HorarioMateria.length; i++) {
            if(diaSemana[inicio.getDay()] == materia.HorarioMateria[i].Dium.dia) {
                let dia = inicio.getDate() < 10 ? "0" + inicio.getDate() : inicio.getDate()
                let cod = (inicio.getMonth()+1) + "-" + dia + "hs" + materia.HorarioMateria[i].horaInicio.slice(0, -6)

                generar.push({
                    "codAsistencia": cod,
                    "codMateria": materia.codMateria,
                    "fecha": new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), materia.HorarioMateria[i].horaInicio.slice(0, -6), materia.HorarioMateria[i].horaInicio.slice(3, -3))
                })
            }
        }

        if(diaSemana[inicio.getDay()] == "Viernes") {
            inicio.setDate(inicio.getDate()+2)
        }
    }

    return generar
}

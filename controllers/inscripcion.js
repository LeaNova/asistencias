const { Op } = require('sequelize')

const Inscripcion = require('../models').Inscripcion
const Alumno = require('../models').Alumno
const Condicion = require('../models').Condicion
const Materia = require('../models').Materia
const Profesor = require('../models').Profesor
const Usuario = require('../models').Usuario
const Asistencia = require('../models').Asistencia
const Presente = require('../models').Presente

//Alta
exports.createForm = async function(req, res) {
    const usuario = req.session.usuario
    const materias = await traerMaterias(usuario.DNI)

    res.render('./inscripcion/create', { usuario: usuario, materias: materias })
}

exports.create = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body
    const materias = await traerMaterias(usuario.DNI)

    try {
        Inscripcion.create({
            DNI: usuario.DNI,
            codMateria: body.materia,
            idCondicion: 4
        }).then((result) => {
            let success = "Inscripcion realizada"

            res.status(200).render('./inscripcion/create', { usuario: usuario, success: success, materias: materias })
        }).catch((err) => {
            console.log(err)
            let error = "Error en la inscripcion"

            res.status(400).render('./inscripcion/create', { usuario: usuario, error: error, materias: materias })    
        })
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"
        
        res.status(500).render('./inscripcion/create', { usuario: usuario, error: error, materias: materias })
    }
}

exports.validate = async function(req, res) {
    const usuario = req.session.usuario
    const materias = await Profesor.findAll({
        include: Materia,
        where: { DNI: usuario.DNI}
    })

    let lista = []
    for(let i = 0; i < materias.length; i++) {
        let item = await Inscripcion.findAll({
            include: [{
                model: Condicion,
                where: { nombre: 'Pendiente'}
            }, {
                model: Alumno,
                include: {
                    model: Usuario,
                    attributes: ['DNI', 'nombre', 'apellido']
                }
            }],
            where: { codMateria: materias[i].codMateria }
        })
        lista.push(item)
    }

    try {
        let DNI = req.params.DNI
        let cod = req.params.cod
        Inscripcion.update({
           idCondicion: 1
        }, {
            where: {
                DNI: DNI,
                codMateria: cod
            }
        }).then((result) => {
            agregarFaltas(DNI, cod)

            res.redirect('/inscripcion/list')
        }).catch((err) => {
            console.log(err)
            let error = "No se pudo validar"

            res.status(400).render('./inscripcion/list', { usuario: usuario, error: error, materias: materias, lista: lista })
        })
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"

        res.status(500).render('./inscripcion/list', { usuario: usuario, error: error, materias: materias, lista: lista })
    }
}

//Busquedas
exports.list = async function(req, res) {
    const usuario = req.session.usuario
    const materias = await Profesor.findAll({
        include: Materia,
        where: { DNI: usuario.DNI}
    })

    let lista = []
    for(let i = 0; i < materias.length; i++) {
        let item = await Inscripcion.findAll({
            include: [{
                model: Condicion,
                where: { nombre: 'Pendiente'}
            }, {
                model: Alumno,
                include: {
                    model: Usuario,
                    attributes: ['DNI', 'nombre', 'apellido']
                }
            }],
            where: { codMateria: materias[i].codMateria }
        })
        lista.push(item)
    }

    res.render('./inscripcion/list', { usuario: usuario, materias: materias, lista: lista })
}

exports.readOwn = async function(req, res) {
    const usuario = req.session.usuario
    const materias = await Inscripcion.findAll({
        include: [ Materia, Condicion ],
        where: { DNI: usuario.DNI}
    })

    res.render('./inscripcion/index', { usuario: usuario, materias: materias })
}

//Funciones
async function traerMaterias(DNI) {
    const codigos = await Inscripcion.findAll({
       attributes: ['codMateria'],
       where: { DNI: DNI }
    })
    const codMaterias = codigos.map((cod) => cod.codMateria)
    const materias = await Materia.findAll({
        where: { codMateria: { [Op.notIn]: codMaterias } }
    })

    return materias
}

async function agregarFaltas(DNI, codM) {
    const asistencias = await Asistencia.findAll({
        where: { codMateria: codM }
    })

    if(asistencias.length > 0) {
        for(let i = 0; i < asistencias.length; i++) {
            Presente.create({
                codAsistencia: asistencias[i].codAsistencia,
                DNI: DNI
            })
        }
    }
}

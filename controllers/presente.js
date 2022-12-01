const { Op } = require('sequelize')

const Presente = require('../models').Presente
const Asistencia = require('../models').Asistencia
const Materia = require('../models').Materia

//Modificacion
exports.updateForm = async function(req, res) {
    const usuario = req.session.usuario
    const item = await Asistencia.findOne({
        include: [{
            model: Materia,
            attributes: ['nombre']
        }, {
            model: Presente,
            where: { DNI: usuario.DNI }
        }],
        where: { codAsistencia: req.params.codA }
    })
    const hora = new Date()

    let ok = horaOk(item, hora)
    
    res.render('./presente/create', { usuario: usuario, item: item, hora: hora, ok: ok })
}

exports.update = async function(req, res) {
    const usuario = req.session.usuario
    const item = await Asistencia.findOne({
        include: {
            model: Materia,
            attributes: ['nombre']
        },
        where: { codAsistencia: req.params.codA }
    })
    const hora = new Date()

    let ok = horaOk(item, hora)

    try {
        if(ok <= 30 && ok > 0) {
            Presente.update({
                presente: true
            }, {
                where: {
                    codAsistencia: req.params.codA,
                    DNI: usuario.DNI
                }
            }).then((result) => {
                let success = "Presente cargado correctamente"

                res.status(200).render('./result', { usuario: usuario, success: success })
            }).catch((err) => {
                console.log(err)
                let error = "No se pudo cargar el presente"

                res.status(400).render('./presente/create', { usuario: usuario, error: error, item: item, hora: hora, ok: ok })
            })
        } else {
            let error = "No se haga el pillo"

            res.status(400).render('./result', { usuario: usuario, error: error, item: item, hora: hora, ok: ok })
        }
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"

        res.status(500).render('./presente/create', { usuario: usuario, error: error, item: item, hora: hora, ok: ok })
    }
}

//Busquedas
exports.search = async function(req, res) {
    const usuario = req.session.usuario
    const fecha = new Date()
    const asistencias = await Asistencia.findAll({
        include: [{
            model: Materia,
            attributes: ['nombre']
        }, {
            model: Presente,
            where: { DNI: usuario.DNI }
        }],
        where: {
            fecha: { [Op.startsWith]: `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`},
        }
    })

    res.render('./presente/list', { usuario: usuario, asistencias: asistencias})
}

//Funciones
function horaOk(item, hora) {
    if(item != null) {
        let minActual = hora.getMinutes() < 10 ? "0" + hora.getMinutes() : hora.getMinutes()
        let horaActual = parseInt(hora.getHours() + "" + minActual)

        let minI = item.fecha.getMinutes() < 10 ? "0" + item.fecha.getMinutes() : item.fecha.getMinutes()
        let horaI = parseInt(item.fecha.getHours() + "" + minI)

        return horaActual - horaI
    }
}

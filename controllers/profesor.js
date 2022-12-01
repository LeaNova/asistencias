const { Op } = require('sequelize')

const Profesor = require('../models').Profesor
const Usuario = require('../models').Usuario
const Access = require('../models').Access
const Rol = require('../models').Rol
const Materia = require('../models').Materia

exports.home = async function(req, res) {
    const usuario = req.session.usuario
    let listaProfesores = await Usuario.findAll({
        include: {
            model: Access,
            where: { nombre: { [Op.like]: "Profesor" } }
        }
    });

    res.render('./profesor/index', { usuario: usuario, profesores: listaProfesores });
}

//Alta
exports.createForm = async function(req, res) {
    const usuario = req.session.usuario
    const profesores = await Usuario.findAll({
        include: {
            model: Access,
            where: {
                nombre: { [Op.like]: "Profesor" }
            }
        }
    });
    const roles = await Rol.findAll()
    const materias = await Materia.findAll()
    res.render('./profesor/create', { usuario: usuario, profesores: profesores, roles: roles, materias: materias })
}

exports.create = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body;
    const profesores = await Usuario.findAll({
        include: {
            model: Access,
            where: {
                nombre: { [Op.like]: "Profesor" }
            }
        }
    });
    const roles = await Rol.findAll()
    const materias = await Materia.findAll()

    try {
        Profesor.create({
            DNI: body.DNI,
            idRol: body.rol,
            codMateria: body.materia
        }).then((result) => {
            let success = "Profesor cargado correctamente"

            res.status(200).render('./profesor/create', { usuario: usuario, success: success, profesores: profesores, roles: roles, materias: materias })
        }).catch((err) => {
            console.log(err)
            let error = "No se pudo cargar el Profesor"

            res.status(200).render('./profesor/create', { usuario: usuario, error: error, profesores: profesores, roles: roles, materias: materias })
        })
    } catch (ex) {
        console.log(ex);
        let error = "Algo inesperado ocurrió"

        res.render('./profesor/create', { usuario: usuario, error: error, profesores: profesores, roles: roles, materias: materias })
    }
}

//Baja
exports.deleteForm = async function(req, res) {
    const usuario = req.session.usuario
    const item = await Profesor.findOne({
        include: [ {
            model: Usuario,
            attributes: ['DNI', 'nombre', 'apellido']
        }, Materia, Rol ],
        where: {
            DNI: req.params.DNI,
            codMateria: req.params.cod
        }
    })

    res.render('./profesor/delete', { usuario: usuario, item: item })
}

exports.delete = async function(req, res) {
    const usuario = req.session.usuario
    const item = await Profesor.findOne({
        include: [ {
            model: Usuario,
            attributes: ['DNI', 'nombre', 'apellido']
        }, Materia, Rol ],
        where: {
            DNI: req.params.DNI,
            codMateria: req.params.cod
        }
    })
    
    try {
        Profesor.destroy({
            where: {
                DNI: req.params.DNI,
                codMateria: req.params.cod
            }
        }).then((result) => {
            let success = "Profesor borrado exitosamente"

            res.status(200).render('./result', { usuario: usuario, success: success })
        }).catch((err) => {
            console.log(err)
            let error = "No se pudo borrar profesor"

            res.status(400).render('./profesor/delete', { usuario: usuario, error: error, item: item })
        })
    } catch (ex) {
        console.log(ex)
        let error = "Algo inesperado ocurrió"
        
        res.status(500).render('./profesor/delete', { usuario: usuario, error: error, item: item })
    }
}

//Modificacion
exports.updateForm = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Profesor.findOne({
        where: {
            DNI: req.params.DNI,
            codMateria: req.params.cod
        }
    });
    const profesores = await Usuario.findAll({
        include: {
            model: Access,
            where: {
                nombre: { [Op.like]: "Profesor" }
            }
        }
    });
    const roles = await Rol.findAll()
    const materias = await Materia.findAll()
    
    res.render('./profesor/create', { usuario: usuario, item: item, profesores: profesores, roles: roles, materias: materias })
}

exports.update = async function(req, res) {
    const usuario = req.session.usuario
    const body = req.body;
    let item = await Usuario.findOne({
        where: {
            DNI: req.params.DNI,
            codMateria: req.params.cod
        }
    });
    const profesores = await Usuario.findAll({
        include: {
            model: Access,
            where: {
                nombre: { [Op.like]: "Profesor" }
            }
        }
    });
    const listaRoles = await Rol.findAll()
    const listaMaterias = await Materia.findAll()

    try {
        Profesor.update({
            DNI: body.DNI,
            idRol: body.rol,
            codMateria: body.materia
        }, {
            where: {
                DNI: item.DNI,
                codMateria: item.cod
            }
        }).then((result) => {
            let success = "Profesor actualizado correctamente"

            res.status(200).render('./profesor/create', { usuario: usuario, success: success, item: item, profesores: profesores, roles: listaRoles, materias: listaMaterias })
        }).catch((err) => {
            console.log(err)
            let error = "No se pudo cargar el Profesor"

            res.status(400).render('./profesor/create', { usuario: usuario, error: error, item: item, profesores: profesores, roles: listaRoles, materias: listaMaterias })
        })
    } catch (ex) {
        console.log(ex);
        let error = "Algo inesperado ocurrió"

        res.status(500).render('./profesor/create', { usuario: usuario, error: error, item: item, profesores: profesores, roles: listaRoles, materias: listaMaterias })
    }
}

//Buscadores
exports.listMaterias = async function(req, res) {
    const usuario = req.session.usuario
    let item = await Usuario.findByPk(req.params.DNI)
    const proMateria = await Profesor.findAll({
        include: [ Materia, Rol ],
        where: { DNI: item.DNI }
    })

    res.render('./profesor/list', { usuario: usuario, item: item, materias: proMateria })
}

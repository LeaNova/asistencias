var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth')

const { Op } = require('sequelize')

const Alumno = require('../models').Alumno
const Usuario = require('../models').Usuario
const Inscripcion = require('../models').Inscripcion
const Condicion = require('../models').Condicion
const Materia = require('../models').Materia
const Dictado = require('../models').Dictado
const Horario = require('../models').HorarioMateria
const Dia = require('../models').Dia

/* GET home page. */
router.get('/', async function(req, res, next) {
  const usuario = req.session.usuario
  let coso
  let informe

  if(usuario) {
    let access = usuario.Access.nombre

    switch (access) {
      case "Coordinador": {
        coso = "Manten a los profesores a corriente de todo"
        informe = await verficar()
        break
      }
      case "Profesor": {
        coso = "Anime a sus alumnos para que brillen en el mañana"
        break
      }
      default: {
        coso = "Revise bien sus meterias y sus presentes a tiempo"
        break
      }
    }
  }

  res.render('index', { usuario: usuario, coso: coso, informe: informe })
})

router.get('/informe', auth.isCoordinador, async function(req, res, next) {
  const usuario = req.session.usuario
  let informe = await verficar()
  
  res.render('informe', { usuario: usuario, informe: informe })
})

async function verficar() {
  let informe = []

  const todo = await Alumno.findAll({
    include: [{
      model: Usuario,
      attributes: ['nombre', 'apellido']
    }, {
      model: Inscripcion,
      attributes: ['codMateria'],
      include: [{
        model: Condicion,
        attributes: [],
        where: { nombre: { [Op.notLike]: "Pendiente" } }
      }, {
        model: Materia,
        attributes: ['nombre'],
        include: [{
          model: Dictado,
          attributes: ['tipoDictado']
        }, {
          model: Horario,
          attributes: ['horaInicio', 'horaFin'],
          include: {
            model: Dia,
            attributes: ['dia']
          }
        }]
      }]
    }]
  })
  
  for(let i = 0; i < todo.length; i++) {
    let alumno = todo[i].Usuario

    //INSCRIPCIONES A COMPARAR
    for(let j = 0; j < todo[i].Inscripcions.length; j++) {
      let inscripciones = todo[i].Inscripcions[j]
      let cuatri = inscripciones.Materium.Dictado.tipoDictado

      for(let k = 0; k < todo[i].Inscripcions.length; k++) {
        let insAux = todo[i].Inscripcions[k]
        let cuatriAux = insAux.Materium.Dictado.tipoDictado
        
        //HORARIOS A COMPARAR
        for(let l = 0; l < inscripciones.Materium.HorarioMateria.length; l++) {
          let horaInicio = parseInt(inscripciones.Materium.HorarioMateria[l].horaInicio.replace(":", ""))
          let horaFin = parseInt(inscripciones.Materium.HorarioMateria[l].horaFin.replace(":", ""))
          let dia = inscripciones.Materium.HorarioMateria[l].Dium.dia

          for(let m = 0; m < insAux.Materium.HorarioMateria.length; m++) {
            let inicioAux = parseInt(insAux.Materium.HorarioMateria[m].horaInicio.replace(":", ""))
            let finAux = parseInt(insAux.Materium.HorarioMateria[m].horaFin.replace(":", ""))
            let diaAux = insAux.Materium.HorarioMateria[m].Dium.dia

            if(inscripciones.Materium.nombre != insAux.Materium.nombre
              && (horaInicio < finAux || horaFin < inicioAux)
              && dia == diaAux
              && mismoCuatri(cuatri, cuatriAux)) {

              informe.push({
                "alumno": alumno.nombre + " " + alumno.apellido,
                "materia": inscripciones.Materium.nombre,
                "dia": dia,
                "hora": inscripciones.Materium.HorarioMateria[l].horaInicio.slice(0, -3) + " - " + inscripciones.Materium.HorarioMateria[l].horaFin.slice(0, -3)
              })
            }
          }
        }
      }
    }
  }

  return informe
}

function mismoCuatri(cuatri, cuatriAux) {
  if(cuatri == cuatriAux) {
    return true
  }

  if(cuatri == "Anual" || cuatri == "Ambos Cuatrimestres" || cuatriAux == "Anual" || cuatriAux == "Ambos Cuatrimestres") {
    return true
  }

  if((cuatri == "1er Cuatrimestre" && (cuatriAux == "1er Bimestre" || cuatriAux == "2do Bimestre"))
  || (cuatriAux == "1er Cuatrimestre" && (cuatri == "1er Bimestre" || cuatri == "2do Bimestre"))) {
    return true
  }


  if((cuatri == "2do Cuatrimestre" && (cuatriAux == "3er Bimestre" || cuatriAux == "4to Bimestre"))
  || (cuatriAux == "2do Cuatrimestre" && (cuatri == "3er Bimestre" || cuatri == "4to Bimestre"))) {
    return true
  }

  return false
}

module.exports = router;

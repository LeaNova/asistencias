'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Inscripcion extends Model {
        static associate(models) {
            Inscripcion.belongsTo(models.Alumno, {foreignKey: "DNI"})
            Inscripcion.belongsTo(models.Materia, {foreignKey: "codMateria"})
            Inscripcion.belongsTo(models.Condicion, {foreignKey: "idCondicion"})
        }
    }
    Inscripcion.init({
        DNI: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        codMateria: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        idCondicion: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Inscripcion',
        tableName: 'inscripciones',
        timestamps: false
    });
    return Inscripcion;
};

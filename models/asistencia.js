'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Asistencia extends Model {
        static associate(models) {
            Asistencia.hasMany(models.Presente, {foreignKey: "codAsistencia"})
            Asistencia.belongsTo(models.Materia, {foreignKey: "codMateria"})
        }
    }
    Asistencia.init({
        codAsistencia: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        codMateria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        enCuenta: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: "true"
        }
    }, {
        sequelize,
        modelName: "Asistencia",
        tableName: "asistencias",
        timestamps: false
    });
    return Asistencia;
}
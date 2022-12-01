'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Alumno extends Model {
        static associate(models) {
            Alumno.belongsTo(models.Usuario, {foreignKey: "DNI"})
            Alumno.hasMany(models.Presente, {foreignKey: "DNI"})
            Alumno.hasMany(models.Inscripcion, {foreignKey: "DNI"})
        }
    }
    Alumno.init({
        DNI: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        }
    }, {
        sequelize,
        modelName: "Alumno",
        timestamps: false
    });
    return Alumno;
};

'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Materia extends Model {
        static associate(models) {
            Materia.hasMany(models.Profesor, { foreignKey: "codMateria" }),
            Materia.hasMany(models.Inscripcion, {foreignKey: "codMateria"}),
            Materia.hasMany(models.Asistencia, {foreignKey: "codMateria"}),
            Materia.hasMany(models.HorarioMateria, {foreignKey: "codMateria"}),
            Materia.belongsTo(models.Dictado, {foreignKey: "idDictado"})
        }
    }
    Materia.init({
        codMateria: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ciclo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        año: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idDictado: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Materia',
        tableName: 'materias',
        timestamps: false
    });
    return Materia;
};

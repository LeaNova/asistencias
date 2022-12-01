'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Profesor extends Model {
        static associate(models) {
            Profesor.belongsTo(models.Usuario, {foreignKey: "DNI"})
            Profesor.belongsTo(models.Rol, {foreignKey: "idRol"})
            Profesor.belongsTo(models.Materia, {foreignKey: "codMateria"})
        }
    }
    Profesor.init({
        DNI: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        codMateria: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        generado: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false"
        }
    }, {
        sequelize,
        modelName: 'Profesor',
        tableName: 'profesores',
        timestamps: false
    });
    return Profesor
};

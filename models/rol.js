'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rol extends Model {
        static associate(models) {
            Rol.hasMany(models.Profesor, {foreignKey: "idRol"})
        }
    }
    Rol.init({
        idRol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Rol',
        tableName: 'roles',
        timestamps: false
    });
    return Rol;
};

'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Condicion extends Model {
        static associate(models) {
            Condicion.hasMany(models.Inscripcion, {foreignKey: "idCondicion"})
        }
    }
    Condicion.init({
        idCondicion: {
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
        modelName: 'Condicion',
        tableName: 'condiciones',
        timestamps: false
    });
    return Condicion;
};

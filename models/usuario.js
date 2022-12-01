'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            //belongsTo se puede usar el include para rescatar la info
            Usuario.belongsTo(models.Access, {foreignKey: "idAccess"})
            Usuario.hasOne(models.Profesor, {foreignKey: "DNI"})
            Usuario.hasOne(models.Alumno, {foreignKey: "DNI"})
        }
    }
    Usuario.init({
        DNI: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idAccess: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: false
    });
    return Usuario;
};

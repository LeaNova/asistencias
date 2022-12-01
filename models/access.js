'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Access extends Model {
        static associate(models) {
            Access.hasMany(models.Usuario, {foreignKey: "idAccess"})
        }
    }
    Access.init({
        idAccess: {
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
        modelName: "Access",
        tableName: "access",
        timestamps: false
    })
    return Access;
}

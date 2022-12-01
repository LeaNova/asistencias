'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Dia extends Model {
        static associate(models) {
            Dia.hasMany(models.HorarioMateria, {foreignKey: "idDia"})
        }
    }
    Dia.init({
        idDia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dia: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Dia',
        tableName: 'dias',
        timestamps: false
    });
    return Dia;
};

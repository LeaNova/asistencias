'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Diactado extends Model {
        static associate(models) {
            Diactado.belongsToMany(models.Materia, {
                through: "idDictado",
                foreignKey:"idDictado"
            })
        }
    }
    Diactado.init({
        idDictado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipoDictado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mesInicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mesFin: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Dictado',
        timestamps: false
    });
    return Diactado;
};

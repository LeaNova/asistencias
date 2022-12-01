'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Presente extends Model {
        static associate(models) {
            Presente.hasMany(models.Asistencia, {foreignKey: "codAsistencia"})
            Presente.belongsTo(models.Alumno, {foreignKey: "DNI"})
        }
    }
    Presente.init({
        codAsistencia: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        DNI: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        presente: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false"
        }
    }, {
        sequelize,
        modelName: 'Presente',
        tableName: 'presentes',
        timestamps: false
    });
    return Presente
};


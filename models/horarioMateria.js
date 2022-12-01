'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class HorarioMateria extends Model {
        static associate(models) {
            HorarioMateria.belongsTo(models.Dia, {foreignKey: "idDia"})
            HorarioMateria.belongsTo(models.Materia, {foreignKey: "codMateria"})
        }
    }
    HorarioMateria.init({
        idHorario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codMateria: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false
        },
        horaFin: {
            type: DataTypes.TIME,
            allowNull: false
        },
        idDia: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'HorarioMateria',
        tableName: "horario_materias",
        timestamps: false
    });
    return HorarioMateria;
};

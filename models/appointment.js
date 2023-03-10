'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Pet);
    }
  }
  Appointment.init({
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    nextSteps: DataTypes.STRING,
    completeBy: DataTypes.DATE,
    followups: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
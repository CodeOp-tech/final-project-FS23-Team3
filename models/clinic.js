'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.belongsToMany(models.Pet, { through: "petsClinics" });
    }
  }
  Clinic.init({
    name: DataTypes.STRING,
    contactPhone: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longtitude: DataTypes.DECIMAL,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};
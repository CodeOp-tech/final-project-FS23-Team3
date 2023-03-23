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
      Clinic.hasMany(models.Appointment);
      Clinic.belongsToMany(models.Owner, { through: "ownersClinics" })
    }
  }
  Clinic.init({
    name: DataTypes.STRING,
    contactPhone: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longtitude: DataTypes.DECIMAL,
    address: DataTypes.STRING,
    clinicKey: DataTypes.STRING,
    PetId: DataTypes.INTEGER,
    OwnerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};
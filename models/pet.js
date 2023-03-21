'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.Owner);
      Pet.hasMany(models.Appointment);
      Pet.belongsToMany(models.Clinic, { through: "petsClinics" });
    }
  }
  Pet.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    img_filename: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};
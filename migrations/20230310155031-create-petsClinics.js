'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("petsClinics", {
      PetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pets",
          key: "id",
        },
        allowNull: false,
      },
      ClinicId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Clinics",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("petsClinics");
  },
};

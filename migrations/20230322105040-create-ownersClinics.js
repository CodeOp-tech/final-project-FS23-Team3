'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("ownersClinics", {
      OwnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Owners",
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
    return queryInterface.dropTable("ownersClinics");
  }
};

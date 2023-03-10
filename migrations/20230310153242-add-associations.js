'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Appointments", // name of Source model
      "PetId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Pets", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "Appointments", // name of Source model
      "PetId" // key we want to remove
    );
  },
};

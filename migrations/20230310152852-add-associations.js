'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Pets", // name of Source model
      "OwnerId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Owners", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "Pets", // name of Source model
      "OwnerId" // key we want to remove
    );
  },
};

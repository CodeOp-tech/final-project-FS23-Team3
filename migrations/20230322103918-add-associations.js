'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Clinics', 
      'OwnerId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Owners',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Clinics',
      'OwnerId'
      );
    }
  };

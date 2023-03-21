'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.addColumn(
      'Appointments', 
      'ClinicId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Clinics',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn(
      'Appointments',
      'ClinicId'
      );
  },
};

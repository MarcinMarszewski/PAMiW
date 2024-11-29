'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Profiles', 'Profiles_userId_fkey');
    await queryInterface.addConstraint('Profiles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Profiles_userId_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Profiles', 'Profiles_userId_fkey');
    await queryInterface.addConstraint('Profiles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Profiles_userId_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
  }
};
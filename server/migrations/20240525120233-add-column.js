'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ExchangeComments', 'readComment', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true, // or false, depending on your requirement
      defaultValue: false, // if applicable
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

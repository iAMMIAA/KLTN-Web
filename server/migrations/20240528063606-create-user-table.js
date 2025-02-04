'use strict';

const { DataTypes } = require("sequelize");
const TABLE_NAME = 'SignupLogIn';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
          type: DataTypes.INTEGER,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
          },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      useremail: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      userpassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirm_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      career: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      areaCode: {
        type: DataTypes.STRING,
        allowNull: true
      }
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

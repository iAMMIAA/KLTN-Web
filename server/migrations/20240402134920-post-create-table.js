'use strict';
const {DataTypes} = require("sequelize");
const TABLE_NAME = 'Exchanges';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(TABLE_NAME, {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            likeNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            shareNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            createdBy: {
                type: DataTypes.INTEGER
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(TABLE_NAME);
    }
};

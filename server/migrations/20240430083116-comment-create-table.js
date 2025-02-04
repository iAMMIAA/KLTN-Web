'use strict';

const { DataTypes } = require("sequelize");
const TABLE_NAME = 'ExchangeComments';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(TABLE_NAME, {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            exchangeId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            contentComment: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            readComment: { // Thêm cột readComment
                type: DataTypes.BOOLEAN,
                defaultValue: false, // Giá trị mặc định là false
                allowNull: false    
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
};



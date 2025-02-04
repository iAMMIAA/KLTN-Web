const { DataTypes } = require("sequelize");
const { sequelize } = require('./base.model');

exports.ExchangeLike = sequelize.define('ExchangeLikes', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    exchangeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Posts',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
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
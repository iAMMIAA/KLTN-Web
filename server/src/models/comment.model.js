const { DataTypes } = require("sequelize");
const { sequelize } = require('./base.model');
const {User} = require("./user.model");

const ExchangeComment = sequelize.define('ExchangeComments', {
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
    contentComment: {
        type: DataTypes.TEXT,
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

ExchangeComment.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user',
})

exports.ExchangeComment = ExchangeComment;
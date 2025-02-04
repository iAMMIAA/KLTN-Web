const { DataTypes } = require("sequelize");
const { sequelize } = require('./base.model');
const { ExchangeComment } = require('./comment.model');
const {User} = require("./user.model");
const {ExchangeLike} = require("./like.model");


const Exchange = sequelize.define('Exchanges', {
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

Exchange.hasMany(ExchangeComment, {
    foreignKey: 'exchangeId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'comments',
});

Exchange.hasMany(ExchangeLike, { foreignKey: 'exchangeId', as: 'like' })

Exchange.belongsTo(User, {
    foreignKey: 'createdBy',
    targetKey: 'id',
    as: 'user',
})

exports.Exchange = Exchange;

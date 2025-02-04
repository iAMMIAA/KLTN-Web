// Định nghĩa model Exchange
const { DataTypes } = require('sequelize');
const { sequelize } = require('./base.model');

const Exchange = sequelize.define('Exchange', {
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

module.exports = Exchange;

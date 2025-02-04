const { DataTypes } = require("sequelize");
const { sequelize } = require('./base.model');

exports.User = sequelize.define('SignupLogIn', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  useremail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userpassword: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { tableName: 'SignupLogIn', timestamps: false});
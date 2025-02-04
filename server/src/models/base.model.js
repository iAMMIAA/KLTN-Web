const { Sequelize } = require("sequelize");
const { APP_DB } = require("../config")

const sequelize = new Sequelize(APP_DB.database, APP_DB.username, APP_DB.password, {
    host: APP_DB.host,
    dialect: 'mysql',
})

exports.sequelize = sequelize;

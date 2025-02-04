require('dotenv').config({ path: './.env' });

exports.APP_DB = {
    database: process.env.BD_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.BD_HOST || 'localhost',
}

exports.APP_CONFIG = {
    debug: process.env.APP_DEBUG === 'true' || true,
}
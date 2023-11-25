const { path } = require('./lib');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })


const env = {
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_database: process.env.DB_DB,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PW,
    port: process.env.PORT,
    host: process.env.HOST,
    json_file: process.env.JSON_FILE,
    individual_mark: process.env.INDIVIDUAL_MARK,
}

module.exports = env;
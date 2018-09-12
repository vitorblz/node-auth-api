const mysql = require('mysql');

const createDBConnection = function createDBConnection(){
    return mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'auth',
        insecureAuth : true
    });
}
module.exports = createDBConnection;
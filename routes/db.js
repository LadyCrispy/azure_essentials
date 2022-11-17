/*
* Conexión a MySQL
 */

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cursotodo',
    password: 'cursotodo',
    database: 'cursotodo',
    port: 3306,
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connectado!');
});
module.exports = connection;

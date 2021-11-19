const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'107.178.222.202',
        user: 'root',
        password:'mypass',
        database:'SchDB'
    });
    return conn;
}
module.exports = newConnection;
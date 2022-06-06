const mysql = require('mysql2');
const config = require('./config.json');
const sql = `SELECT * FROM users`;

const dbConnection = mysql.createConnection(config);

dbConnection.connect((err) => {
    if (err) { throw err; }
    console.log("DB is successfully connected!");
});

dbConnection.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
});

module.exports = dbConnection;

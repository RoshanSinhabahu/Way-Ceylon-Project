const fs = require('fs');
const mysql = require('mysql2');
const path = require('path');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
};

const connection = mysql.createConnection(dbConfig);

const sqlPath = path.join(__dirname, 'setup_database.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL script:', err);
            connection.end();
            process.exit(1);
        }
        console.log('Database schema updated successfully.');
        connection.end();
    });
});

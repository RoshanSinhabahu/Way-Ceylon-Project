const mysql = require("mysql2");

// Create a connection pool to manage connections
const pool = mysql.createPool({
    host: "localhost",
    user: "root",       // Default XAMPP user
    password: "",       // Default XAMPP password is empty
    database: "way_ceylon",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Promisify the pool for async/await usage
const promisePool = pool.promise();

module.exports = promisePool;

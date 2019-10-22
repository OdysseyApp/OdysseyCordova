const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "11223344",
  database: "bluerose"
});

exports.connection = connection;

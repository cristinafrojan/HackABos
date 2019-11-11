"use strict";


require("dotenv").config();

const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

console.log("conexión establecida");


const query = "SELECT * FROM `emp`";

function tratarResultadoQuery(err, results, fields) {
  if (err) {
    console.error("ERROR!!!!!", err);
    process.exit(-1);
  }
  console.log(results);
  connection.close();
}

connection.query(query, tratarResultadoQuery);

const Sequelize = require('sequelize');
const mysql1 = require("mysql2");
const connection = mysql1.createConnection({
    host: "localhost",
    user: "root",
    password: "sristi147",
  });
  
  // Run create database statement
  connection.query(
    `CREATE DATABASE IF NOT EXISTS kernel`,
    function (err, results) {
    //   console.log(results);
    //   console.log(err);
    }
  );
  
  // Close the connection
  connection.end();

const  mysql = new Sequelize("kernel", "root", "sristi147", {
    dialect : "mysql",
    host : "localhost",

});

module.exports = mysql;
const Sequelize = require('sequelize');

const mysql = require('../model/database');


const Task =  mysql.define("task", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true,
    },
    username:{
        type : Sequelize.STRING,
        allowNull : false,
    },
    name :
    {
        type : Sequelize.STRING,
        allowNull : false,
    },
    taskTypes :
    {
        type : Sequelize.STRING,
        allowNull : false,
    }
   
});

module.exports = Task;
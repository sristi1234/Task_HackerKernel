const Sequelize = require('sequelize');

const mysql = require('../model/database');


const User =  mysql.define("user", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true,
    },
    name :
    {
        type : Sequelize.STRING,
        allowNull : false,
    },
    email:{
        type : Sequelize.STRING,
        allowNull : false,
    },
    phone:{
        type : Sequelize.STRING,
        allowNull : false,

    },
});

module.exports = User;
const { DataTypes } = require("sequelize");
const sequelize= require('./../Configuration/sequelize');


 const Category =sequelize.define('Category',{
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    }
},
    {
        tableName:"category",timestamps:true
    })
    module.exports= Category;
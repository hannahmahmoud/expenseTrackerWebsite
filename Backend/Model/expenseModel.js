const sequelize = require ('./../Configuration/sequelize');
 const {DataTypes} = require('sequelize');

 const Expenses= sequelize.define('Expenses',{
    description:{
        type:DataTypes.STRING,
        allowNull: false ,
        unique:true
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    categoryID:{
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
 },
    {'tableName':"expenses",timestamps:true})

    module.exports= Expenses;

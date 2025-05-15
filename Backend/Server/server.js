require('dotenv').config({ path: './config.env' });
const express = require('express');
const sequelize = require('./../Configuration/sequelize');
const app= require('./../app/app')
require('dotenv').config();

const PORT = process.env.PORT || 9999;
 

// Connect to DB
sequelize.authenticate()
  .then(() => {
    console.log(' DB connected.');
    return sequelize.sync(); // or sync({ alter: true })
  })
  .then(() => {
    console.log(' Models synced.');
    
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' DB connection failed:', err.message);
    process.exit(1);
  });

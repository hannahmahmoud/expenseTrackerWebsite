
 //importing pkgs
 let express= require('express');
 let { check }= require('express-validator');
 const middlewareValidator= require('./middlewareValidator');

 
 
 let app= express();
 //using this middle ware to access the request body
  app.use(express.json())
 
 
 exports.postCategory=[
     check('name')
     .notEmpty().withMessage('name is a required field!'),


     middlewareValidator
     
 ]

 
 
 
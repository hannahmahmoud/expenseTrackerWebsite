
 //importing pkgs
 let express= require('express');
 let { check }= require('express-validator');
 const middlewareValidator= require('./middlewareValidator');

 
 
 let app= express();
 //using this middle ware to access the request body
  app.use(express.json())
 
 
 exports.postExpenses=[
     check('description')
     .notEmpty().withMessage('description is a required field!'),

     check('amount')
     .notEmpty().withMessage('amount is a required field!'),
    
    
     check('date')
     .notEmpty().withMessage('date is a required field!'),
    
     
     
 
     check('categoryID').notEmpty().withMessage('category is a required field!'),
   

     middlewareValidator
     
 ]

 
 
 
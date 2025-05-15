
 //importing pkgs
 let express= require('express');
 let { check }= require('express-validator');
 const middlewareValidator= require('./middlewareValidator');

 
 
 let app= express();
 //using this middle ware to access the request body
  app.use(express.json())
 
 
 exports.signup=[
     check('firstName')
     .notEmpty().withMessage('first Name is a required field!'),

     check('lastName')
     .notEmpty().withMessage('last Name is a required field!'),
    
    
     check('email')
     .notEmpty().withMessage('email is a required field!')
     .isEmail().withMessage('please enter a valid email!'),
     
     
 
     check('password').notEmpty().withMessage('password is a required field!')
     .isLength({ min:8}).withMessage('Minimun length of a password field is 8, Please provide a password with this requiement!'),

     middlewareValidator
     
 ]
 exports.login = [
    check('email')
        .notEmpty().withMessage('email is a required field!')
        .isEmail().withMessage('please enter a valid email!'),
    
    check('password')
        .notEmpty().withMessage('password is a required field!')
        .isLength({ min: 8 }).withMessage('Minimun length of a password field is 8, Please provide a password with this requiement!'),
    
    middlewareValidator
];

 
 
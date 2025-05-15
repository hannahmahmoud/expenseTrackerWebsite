let express= require('express');
let authController= require('./../Controller/userController');
let authValidator= require('../Validators/userValidator');



let authRouter= express.Router();



authRouter.route('/signup').post(authValidator.signup,authController.signup);
authRouter.route('/login').post(authValidator.login,authController.login);



module.exports=authRouter;
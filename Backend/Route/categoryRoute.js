const express= require('express');
const categoryController= require('./../Controller/categoryController');
const categoryValidator= require('./../Validators/categoryValidator')
const authController= require('./../Controller/userController')
let categoryRouter= express.Router();


categoryRouter.route('/').get(authController.protectRoute,categoryController.getAllCategory);
categoryRouter.route("/newCategory").post(authController.protectRoute,categoryValidator.postCategory,categoryController.postCategory);
categoryRouter.route("/updateCategory/:id").post(authController.protectRoute,categoryController.updateCategory);
categoryRouter.route('/deleteCategory/:id').delete(authController.protectRoute,categoryController.deleteCategory)
module.exports =categoryRouter;
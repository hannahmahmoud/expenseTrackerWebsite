const express= require('express');
const expenseController= require('./../Controller/expenseController');
const expenseValidator= require('./../Validators/expensesVslidator')
const authController= require('./../Controller/userController')
let expenseRouter= express.Router();

expenseRouter.route("/newExpenses").post(authController.protectRoute,expenseValidator.postExpenses,expenseController.postExpenses);
expenseRouter.route("/updateExpenses/:id").put(authController.protectRoute,expenseController.updateExpenses);
expenseRouter.route('/deleteExpenses/:id').delete(authController.protectRoute,expenseController.deleteExpenses)
expenseRouter.route('/filter').get(authController.protectRoute,expenseController.getFilteredExpenses);
expenseRouter.route('/monthly-report').get(authController.protectRoute,expenseController.getFilteredExpenses);
module.exports =expenseRouter;
const express= require('express');
const expenseModel = require('./../Model/expenseModel');
const customError= require('./../Utils/customError');
const asyncHandlerFunc= require('./../Utils/asyncErrorHandlerFunc');
const categoryModel = require('./../Model/categoryModel');
const { fn, col, literal } = require('sequelize');
const { Op } = require('sequelize');


let app= express()
app.use(express.json())
//desc: post new expense
// route:/newExpenses
exports.postExpenses= asyncHandlerFunc(async (request , response , next)=>
    {
        const foundCategory= await categoryModel.findByPk(request.body.categoryID)
        if(! foundCategory)
            next(new customError("Category is NOTFOUND!"),404)
        const foundDescription = await expenseModel.findOne({where:{description:request.body.description, amount:request.body.amount}});
        if (foundDescription)
            next(new customError("expenses alr exits"));
        let newExpenses = await expenseModel.create({
            description:request.body.description,
            amount: request.body.amount,
            categoryID:request.body.categoryID,
            date:request.body.date,
            userID: request.user.id

        });

         response.status(201).json({
    status: 'Success',
    expense: newExpenses


})
    }
)
//desc delete expenses by id 
//route: /:id
exports.deleteExpenses= asyncHandlerFunc(async(request , response, next )=>
    {
        let foundExpense= await expenseModel.findByPk(request.params.id);
        if (!foundExpense){
            let error = next (new customError("Expenses is not Found!",404));

        }
        if (foundExpense.userID!= request.user.id)
    {
        next (new customError("you are not authorized to this action!"),403)
    }
        foundExpense= await expenseModel.destroy({where:{
            id:request.params.id
        }})

        response.status(204).json({
            status:"Success"
        });
})
//desc: update by id
// route: /:id
exports.updateExpenses= asyncHandlerFunc(async(request, response, next)=>{
    if (request.body==null)
        next(new customError("Request Body is empty"))
    let foundExpense= await expenseModel.findByPk(request.params.id);
    if (!foundExpense)
    next (new customError("Expense is notFOUND",404));

    if (foundExpense.userID!= request.user.id)
    {
        next (new customError("you are not authorized to this action!"),403)
    }

    const updatedData = {};
if (request.body.amount !== undefined) updatedData.amount = request.body.amount;
if (request.body.categoryID !== undefined) {
     const foundCategory= await categoryModel.findByPk(request.body.categoryID)
        if(! foundCategory)
            next(new customError("Category is NOTFOUND!"),404)

    updatedData.categoryID = request.body.categoryID};
if (request.body.date !== undefined) updatedData.date = request.body.date;
if (request.body.description !== undefined) updatedData.description = request.body.description;

foundExpense= await expenseModel.update(updatedData, {
  where: {
    id: request.params.id,
    userID:  request.user.id
  }
});
   response.status(201).json({
    status:"Sucess",
    updatedExpenses: foundExpense
   })
})


exports.getFilteredExpenses = asyncHandlerFunc(async (req, res, next) => {
  const { categoryID, startDate, endDate } = req.query;
  const userID = req.user.id;

  const whereClause = { userID };

  // Add filters only if provided
  if (categoryID) {
    whereClause.categoryID = categoryID;
  }

  if (startDate && endDate) {
    whereClause.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    whereClause.date = {
      [Op.gte]: new Date(startDate),
    };
  } else if (endDate) {
    whereClause.date = {
      [Op.lte]: new Date(endDate),
    };
  }

  const filteredExpenses = await expenseModel.findAll({
    where: whereClause,
    order: [['date', 'DESC']],
  });

  res.status(200).json({
    status: 'Success',
    results: filteredExpenses.length,
    expenses: filteredExpenses,
  });
});




exports.getMonthlyReport = asyncHandlerFunc(async (req, res, next) => {
  const userID = req.user.id;

  const monthlyReport = await expenseModel.findAll({
    attributes: [
      [fn('DATE_FORMAT', col('date'), '%Y-%m'), 'month'],
      [fn('SUM', col('amount')), 'totalAmount'],
    ],
    where: { userID },
    group: [literal('month')],
    order: [[literal('month'), 'DESC']],
  });

  res.status(200).json({
    status: 'Success',
    report: monthlyReport,
  });
});


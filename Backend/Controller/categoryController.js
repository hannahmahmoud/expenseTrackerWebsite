const express= require('express');
const customError= require('./../Utils/customError');
const asyncHandlerFunc= require('./../Utils/asyncErrorHandlerFunc');
const categoryModel = require('./../Model/categoryModel');


let app= express()
app.use(express.json())

exports.postCategory= asyncHandlerFunc(async (request , response , next)=>
    {
        const foundCategory= await categoryModel.findOne({where:{name : request.body.name}});
        if (foundCategory)
            next(new customError("category alr exits ",400))
        let newCategory = await categoryModel.create(request.body);

         response.status(201).json({
    status: 'Success',
    category: newCategory


})
    }
)
//desc delete expenses by id 
//route: /:id
exports.deleteCategory= asyncHandlerFunc(async(request , response, next )=>
    {
        let foundCategory= await categoryModel.findByPk(request.params.id);
        if (!foundCategory){
            next (new customError("category is not Found!",404));

        }
        
        foundCategory= await categoryModel.destroy({where:{
            id:request.params.id
        }})
        response.status(204);
})
//desc: update by id
// route: /:id
exports.updateCategory= asyncHandlerFunc(async(request, response, next)=>{
  let foundCategory= await categoryModel.findByPk(request.params.id);
        if (!foundCategory){
            next (new customError("category is not Found!",404));

        }
   
foundCategory=await Expense.update(request.body, {
  where: {
    id: request.params.id
  }
});

response.status(201).json({
    status:"Success",
    updatedCategory: foundCategory
}); 

})

exports.getAllCategory= asyncHandlerFunc(async (request, response , next)=>{
    const allCategory = await categoryModel.findAll();
    response.status(200).json({
        status:"Success",
        categories: allCategory
    })
    
})
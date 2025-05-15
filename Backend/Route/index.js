//importing pkgs

let authRoute = require('./userRoute');
let expenseRoute=require('./../Route/expenseRoute');
let categoryRoute = require ('./../Route/categoryRoute')


mountingRoute= (app)=>{
    
app.use('/services/users',authRoute);
app.use ('/servics/expenses',expenseRoute)
app.use('/servics/category',categoryRoute)




}
module.exports=mountingRoute;
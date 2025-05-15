// importing pkges

const express= require('express');
const globalMiddleware=require('../Controller/globalMiddlewareErrorHandler');
const mountingRoute= require('./../Route/index')
const hpp= require('hpp');
const xss = require('xss-clean');
const helmet= require('helmet');
const morgan= require('morgan')
const cors= require('cors')




let app= express();

app.use(helmet());
// Apply the rate limiting middleware to all requests.

//using middleware func
// to enable the request body
app.use(express.json({limit:'20kb'}))
// To remove data using these defaults:
// to enable the morgan 
app.use(morgan('dev'));
//rate limitng middleware
//hpp middlware
app.use(hpp());
// make sure this comes before any routes
//app.use(xss())

app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));

// Routes
mountingRoute(app);


//using global middleware error handler func
app.use(globalMiddleware);

 
module.exports= app;
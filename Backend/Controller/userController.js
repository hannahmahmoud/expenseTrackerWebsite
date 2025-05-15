const express = require('express');
require('dotenv').config();
const userModel = require('./../Model/userModel');
const customError = require('./../Utils/customError');
const jwt = require('jsonwebtoken');
const asyncHandlerFunc = require('./../Utils/asyncErrorHandlerFunc');
const util = require('util');

const app = express();
app.use(express.json());

exports.signup = asyncHandlerFunc(async (request, response, next) => {
  const foundUser = await userModel.findOne({ where: { email: request.body.email } });

  if (foundUser) {
    return next(new customError("Email is already used", 400));
  }



  const newUser = await userModel.create(request.body);
  newUser.password = undefined;


  response.status(201).json({
    status: 'Success',
    userData: newUser
  });
});

exports.login = asyncHandlerFunc(async (request, response, next) => {
  const { email, password } = request.body;

  const foundUser = await userModel.findOne({ where: { email } });

  if (!foundUser) {
    return next(new customError('Incorrect email!', 401));
  }

  const isMatch = await foundUser.comparePasswords(password);

  if (!isMatch) {
    return next(new customError('Incorrect password!', 404));
  }

  const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });

  response.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true
  });

  response.status(200).json({
    status: 'Success',
    token
  });
});

exports.protectRoute = asyncHandlerFunc(async (request, response, next) => {
  let token = request.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return next(new customError('TOKEN is NOT FOUND', 404));
  }

  token = token.split(' ')[1];

  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const foundUser = await userModel.findByPk(decoded.id);

  if (!foundUser) {
    return next(new customError('User is NOT FOUND', 404));
  }

  request.user = foundUser;
  next();
});

const globalMiddlewareErrorHandler = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    name: error.name
  });
};

module.exports = globalMiddlewareErrorHandler;

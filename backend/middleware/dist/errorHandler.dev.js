"use strict";

var errorHandler = function errorHandler(err, req, res, next) {
  var statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  errorHandler: errorHandler
};
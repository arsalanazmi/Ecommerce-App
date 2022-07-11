const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 404);
  }

  // Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web Token is invalid, Try Again!`;
    err = new ErrorHandler(message, 404);
  }

  // JWT Expire Error
  if (err.name === "TokenExpiredError") {
    const message = `Json web Token is invalid, Try Again!`;
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

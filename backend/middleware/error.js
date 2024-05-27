const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // MongoDB Cast error
    if (err.name === "CastError") {
        console.log('Hello Cast Error')
        const message = `Resource not Found. Invalid ${err.path}`;
        err = new ErrorHandler(400, message);
        next(err);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
        path: new Error(err).stack,
    })
};
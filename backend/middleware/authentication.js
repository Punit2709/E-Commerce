const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

const isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler(401, 'Please Login for Access the Resource'));
    }

    // console.log(token);

    // taking id which passed for making JWT data
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
}); 

module.exports = isAuthenticatedUser;
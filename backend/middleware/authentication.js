const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Please Login for Access the Resource"));
  }

  // console.log(token);

  // taking id which passed for making JWT data
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role)
    console.log(roles);
    console.log(roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          401,
          `${req.user.role} is not allow to access this resource`
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticatedUser, authorizeRoles };

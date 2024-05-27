const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Profile_id",
      url: "Profile URL",
    },
  });

  const token = user.getJWTToken();

  res.status(200).json({
    sucess: true,
    message: "User created",
    token,
  });
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check for given email or password is not empty
  if (!email || !password) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }

  // check for user exsist or not
  const user = await userModel.findOne({ email }).select("+password"); // provide password also

  if (!user) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }

  // user mill gaya password match karte hai
  let isPasswordMatched = user.comparePassword();

  // if password not matched
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    sucess: true,
    message: "User Logged In",
    token,
  });
});

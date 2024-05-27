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

  res.status(200).json({ sucess: true, message: "User created", token });
});

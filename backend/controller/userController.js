const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendJWTToken = require("../utils/sendJWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

  sendJWTToken(user, 201, "User Created", res);
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

  sendJWTToken(user, 200, "User Logged In", res);
});

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully",
  });
});

// forget password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "User not Found"));
  }

  let resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: ` E-Commerce Recovery Password`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    // if error occur so need to undefined variables so can't be miss used
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorHandler(
        500,
        error.message + "Email could not be sent. Please try again later."
      )
    );
  }
});

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await userModel.findOne({resetPasswordToken, resetPasswordExpire : {$gt : Date.now()}});

    if(!user){
      return next(new ErrorHandler(401, "Invalid Email or Password"));
    }

    if(req.body.password !== req.body.confirmPassword){
      return next(new ErrorHandler(400, "Password does not matched"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    
    sendJWTToken(user, 200, 'Password reset successfully', res)
});


// user details
exports.getUserDetails = catchAsyncError( async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  res.status(200).json({
    status:200,
    user
  })
});


// update Password 
exports.updateUserPassword = catchAsyncError( async (req, res, next) => {

  const user = await userModel.findById(req.user._id).select('+password');

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
  if(!isPasswordMatched){
    return next(new ErrorHandler(400, 'Invalid Old Password'));
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler(404, 'Password Does not matched'));
  }

  if(req.body.newPassword === req.body.oldPassword){
    return next(new ErrorHandler(404, 'New Password is same as Old Password'));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendJWTToken(user, 200, 'Password Changed Successfully', res);
});

// update profile
exports.updateUserProfile = catchAsyncError( async (req, res, next) => {

  const newData = {
    name : req.body.name, 
    email: req.body.email
  }

  const user = await userModel.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    message: 'User Data Update Successfully'
  })
});
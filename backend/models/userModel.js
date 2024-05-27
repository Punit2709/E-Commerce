const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User Name is Required"],
    maxlength: 30,
    minLength: [4, "Name Should have more than 4 Character"],
  },
  email: {
    type: String,
    required: [true, "User Email is Required"],
    unique: true,
    validate: [validator.isEmail, "Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [8, "Password Should have Atleast than 8 char"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  // no need to hash for update profile because already hased passwod is saved
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT-TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

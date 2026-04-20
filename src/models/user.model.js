const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [
      true,
      "Account already exist with this email address. Please login instead",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be atleast 8 characters long"],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

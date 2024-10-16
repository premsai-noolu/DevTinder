const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  passWord: String,
  age: Number,
  gender: String,
});

module.exports = mongoose.model("user", userSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid");
        }
      },
    },
    passWord: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("enter strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://lofrev.net/user-logo-pictures/",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Url must be valid one");
        }
      },
    },
    about: {
      type: String,
      default: "This is the deault info of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder@1320", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validPassword = async function (passwordInputByUser) {
  const user = this;
  const passWordHash = user.passWord;
  const ispasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passWordHash
  );
  return ispasswordValid;
};
module.exports = mongoose.model("user", userSchema);

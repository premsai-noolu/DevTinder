const express = require("express");
const authRouter = express.Router();
const { validation } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res) => {
  try {
    validation(req);
    const { firstName, lastName, emailId, passWord } = req.body;
    const passWordHash = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passWordHash,
    });
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, passWord } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassWordValid = await user.validPassword(passWord);
    if (isPassWordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 6 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successful!!");
});

module.exports = authRouter;

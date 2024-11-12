const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please Login");
    }
    const decodeddata = await jwt.verify(token, "Dev@Tinder@1320");
    const { _id } = decodeddata;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };

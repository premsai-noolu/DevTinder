const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user not found");
    }
    res.send(user.firstName + " sent an connection Request");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = requestRouter;

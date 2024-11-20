const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "gender",
      "about",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
    if (!isEditAllowed) {
      throw new Error("Invalid Edit Request1");
    }
    const loggedInuser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggedInuser[field] = req.body[field])
    );
    await loggedInuser.save();
    res.json({
      message: `${loggedInuser["firstName"]} ,Profile updated successfully`,
      data: loggedInuser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;

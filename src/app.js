const express = require("express");

const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { get } = require("mongoose");

app.use(express.json());

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);
  const user = await User.find({ emailId: userEmail });
  try {
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find({});
  try {
    if (users) {
      res.send(users);
    }
  } catch (err) {
    res.send("something went wrong");
  }
});

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the data:  " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userid = req.body.userId;
  try {
    await User.findByIdAndDelete(userid);
    res.send("the user with repectiveidd has been deleted");
  } catch (err) {
    res.send("something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  // const userid = req.body.userId;
  const userId = req.params?.userId;
  console.log(userId);
  const data = req.body;
  console.log(data);
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("skills can't be greater than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("the user data has been updated successfully");
  } catch (err) {
    res.send("something went wrong: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("databse connection established");
    app.listen(9999, () => {
      console.log("server is running on 9999");
    });
  })
  .catch((err) => {
    console.log("database connection not established");
  });

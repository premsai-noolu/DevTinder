const express = require("express");

const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the data");
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

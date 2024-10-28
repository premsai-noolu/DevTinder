const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { connectDB } = require("./config/database");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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

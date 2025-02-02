const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { connectDB } = require("./config/database");
const cors = require("cors");
require("dotenv").config();
require("node-cron");
require("date-fns");
require("./utils/cronjob");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

connectDB()
  .then(() => {
    console.log("databse connection established");
    app.listen(process.env.PORT, () => {
      console.log("server is running on 9999");
    });
  })
  .catch((err) => {
    console.log("database connection not established");
  });

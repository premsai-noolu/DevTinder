const express = require("express");

const app = express();

app.use("/greet", (req, res) => {
  res.send("Namaste Prem");
});

app.use("/user", (req, res) => {
  res.send("name is prem sai");
});

app.use("/test", (req, res) => {
  res.send("hello world test");
});

app.use((req, res) => {
  res.send("hello world 1");
});

app.listen(9999, () => {
  console.log("server is running on 9999");
});

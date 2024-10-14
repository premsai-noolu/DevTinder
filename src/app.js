const express = require("express");

const app = express();

app.get("/getuserdata", (req, res) => {
  try {
    throw new err("thos is a error");
    res.send("helloooooooooooooooooooooo");
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

app.get("/getdata", (req, res) => {
  throw new err("thos is a error");
  res.send("helloooooooooooooooooooooo");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong hoo");
  }
});

app.listen(9999, () => {
  console.log("server is running on 9999");
});

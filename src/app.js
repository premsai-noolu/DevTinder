const express = require("express");

const app = express();

app.use("/greet", (req, res) => {
  res.send("Namaste Prem");
});

app.use("/user", (req, res) => {
  res.send("Hahahahaha");
});

app.get("/user", (req, res) => {
  res.send({ firstname: "prem", lastname: "noolu" });
});

app.post("/user", (req, res) => {
  //Data saved to DB
  res.send("Data successfully saved to DB");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted from DB");
});

app.use("/hello/123", (req, res) => {
  res.send("hello hello123");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello hello");
});

app.use("/test", (req, res) => {
  res.send("hello world test");
});

// app.use((req, res) => {
//   res.send("hello world 1");
// });

app.listen(9999, () => {
  console.log("server is running on 9999");
});

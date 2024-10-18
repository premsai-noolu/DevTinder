const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Premsai:hPsKskz3okXJXCmP@namastenode.rdsee.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };

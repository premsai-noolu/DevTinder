const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Premsai:oRNfscfvomHe8DpH@namastenode.rdsee.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };

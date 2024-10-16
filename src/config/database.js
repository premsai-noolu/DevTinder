const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Premsai:RSacGWUe3tsaT0Xe@namastenode.rdsee.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };

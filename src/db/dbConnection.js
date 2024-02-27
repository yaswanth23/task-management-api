const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    process.exit(1);
  }
};
module.exports = connectDB;

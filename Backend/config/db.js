const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.error("error connecting to db");
    process.exit(1);
  }
};

module.exports = connectDB;

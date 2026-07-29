import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const connectionUrl =
    process.env.MONGODB_URL ||
    process.env.mongodb_url?.trim();

  if (!connectionUrl) {
    throw new Error("MONGODB_URL is not defined in .env");
  }

  try {
    await mongoose.connect(connectionUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

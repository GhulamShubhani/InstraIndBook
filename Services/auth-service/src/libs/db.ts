import mongoose from "mongoose";
import logger from "../utils/logger.utils";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      (process.env.MONGODB_URI_PRODUCTION as string) ||
        (process.env.MONGODB_URI_PRODUCTION as string)
    );
    if (connection.connection.readyState !== 1) {
      logger.error("MongoDB connection failed");
      console.error();
      process.exit(1);
    }
    logger.info("MongoDB connected successfully");
    console.log("MongoDB connected");
  } catch (error) {
    logger.error(`MongoDB connection failed due to: ${error}`);
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { connectDb };

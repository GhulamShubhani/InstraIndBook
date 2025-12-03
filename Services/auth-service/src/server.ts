import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { STATUS_CODES } from "./constant/message-status";
import logger from "./utils/logger.utils";
import { connectDb } from "./libs/db";

dotenv.config();

const app = express();

let dbConnection;
try {
  (async () => {
    dbConnection = await connectDb();
    if (dbConnection) {
      console.log("Database connection established successfully");
      logger.info("Database connection established successfully");
    } else {
      console.warn(
        "Running without database connection. Some features will be limited."
      );
      logger.error(
        "Running without database connection. Some features will be limited."
      );
    }
  })();
} catch (error) {
  console.error("Failed to initialize database connection:", error);
  logger.error("Failed to initialize database connection:", error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelistOrigin = [
  "http://localhost:5173",
  "http://localhost:5173/",
  "http://localhost:5174",
  "http://localhost:5175",
];

const methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"];
const allowHeaders = [
  "Content-Type",
  "Authorization",
  "X-Requested-With",
  "X-Access-Token",
  "requestaction",
  "requestactiondescription",
];

app.use(
  cors({
    origin: [...whitelistOrigin],
    credentials: true,
    methods: [...methods],
    allowedHeaders: [...allowHeaders],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(STATUS_CODES.SUCCESS).send({
    message: "*** Welcome to InstraIndBook Test API ***",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`server connect on port :${port}`);
});

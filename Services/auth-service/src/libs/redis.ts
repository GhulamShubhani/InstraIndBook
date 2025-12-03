import { createClient } from "redis";
import logger from "../utils/logger.utils";
import { Types } from "mongoose";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.error("Redis Error: ", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully!");
  logger.info("Connected to Redis successfully!");
});

redisClient.on("ready", () => {
  console.log("Redis client is ready!");
});

redisClient.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

const setNormalToken = async (
  userType: string,
  authId: string,
  id: string | Types.ObjectId,
  aToken: string,
  rToken: string
) => {
  if (id instanceof Types.ObjectId) {
    id = id.toString();
  }

  const key = `${userType}${authId}:${id}`;

  await redisClient.hSet(key, "accessToken", aToken);
  await redisClient.hSet(key, "refreshToken", rToken);
  await redisClient.expire(key, 7 * 24 * 60 * 60);
};

const removeTokenById = async (
  userType: string,
  authId: string,
  id: string | Types.ObjectId
) => {
  console.log(id);

  if (id instanceof Types.ObjectId) {
    id = id.toString();
  }
  const key = `${userType}${authId}:${id}`;

  await redisClient.del(key);
};

export { redisClient, setNormalToken, removeTokenById };

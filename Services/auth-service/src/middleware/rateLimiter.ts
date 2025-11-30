import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.utils";
import { redisClient } from "../libs/redis";


const sendCommand: any = async (...args: any) => {
  return redisClient.call(...(args as [string, ...string[]]));
};

const store = new RedisStore({ sendCommand });

export const sensitiveRateLimiter = (maxRequests: number) => {
  return rateLimit({
    windowMs: 10 * 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response, _next: NextFunction) => {
      logger?.warn?.(`Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({
        success: false,
        error: "Rate limit exceeded",
        statusCode: 429,
        message: "Too Many Requests",
      });
    },
    store,
  });
};

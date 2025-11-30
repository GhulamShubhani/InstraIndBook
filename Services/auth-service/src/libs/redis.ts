import redis from "redis";

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.connect();  // Manually connect to the Redis server

export { redisClient };

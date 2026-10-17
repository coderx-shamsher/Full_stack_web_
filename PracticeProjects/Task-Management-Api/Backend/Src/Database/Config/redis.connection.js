// src/Config/redis.connection.js
import  dotenv  from "dotenv";
import { createClient } from "redis";

dotenv.config({
    path : "../../../.env"
})

console.log(process.env.redis_url)

const redisClient = createClient({
  url: process.env.redis_url || "redis://127.0.0.1:6379",
});

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error.message);
});

redisClient.on("connect", () => {
  console.log("\n Connecting to Redis... \n");
});

redisClient.on("ready", () => {
  console.log(" Redis is ready to use ✅ \n ");
});

export default redisClient;
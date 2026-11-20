import { Redis } from "@upstash/redis";

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

export async function incrementNewsViews(newsId) {
  const redis = getRedis();

  if (!redis) {
    return null;
  }

  try {
    return await redis.incr(`news:views:${newsId}`);
  } catch {
    return null;
  }
}

export async function getNewsViews(newsId) {
  const redis = getRedis();

  if (!redis) {
    return null;
  }

  try {
    const count = await redis.get(`news:views:${newsId}`);
    return count ?? 0;
  } catch {
    return null;
  }
}

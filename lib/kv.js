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

const VISITOR_KEY_TTL_SECONDS = 60 * 60 * 24 * 2; // 2일 뒤 자동 만료 (하루치 집계 후 정리)

// KST(UTC+9) 기준 날짜로 키를 만들어서, 자정이 지나면 자연스럽게 새 키(카운트 0)로 넘어가게 한다.
function todayKstKey() {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export async function incrementTodayVisitors() {
  const redis = getRedis();

  if (!redis) {
    return null;
  }

  try {
    const key = `visitors:${todayKstKey()}`;
    const count = await redis.incr(key);
    await redis.expire(key, VISITOR_KEY_TTL_SECONDS);
    return count;
  } catch {
    return null;
  }
}

export async function getTodayVisitors() {
  const redis = getRedis();

  if (!redis) {
    return null;
  }

  try {
    const count = await redis.get(`visitors:${todayKstKey()}`);
    return count ?? 0;
  } catch {
    return null;
  }
}

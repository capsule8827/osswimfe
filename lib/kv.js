import { createClient } from "redis";

let clientPromise = null;

// 서버리스 환경에서 warm 인스턴스 사이에 연결을 재사용하기 위한 싱글턴.
// 연결에 실패하면 clientPromise를 비워서 다음 호출 때 재시도할 수 있게 한다.
function getRedisClient() {
  const url = process.env.REDIS_URL;

  if (!url) {
    return null;
  }

  if (!clientPromise) {
    clientPromise = (async () => {
      const client = createClient({ url });
      client.on("error", (err) => {
        console.error("Redis client error:", err);
      });
      await client.connect();
      return client;
    })().catch((err) => {
      clientPromise = null;
      throw err;
    });
  }

  return clientPromise;
}

export async function incrementNewsViews(newsId) {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  try {
    const client = await redis;
    return await client.incr(`news:views:${newsId}`);
  } catch {
    return null;
  }
}

export async function getNewsViews(newsId) {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  try {
    const client = await redis;
    const count = await client.get(`news:views:${newsId}`);
    return count !== null ? Number(count) : 0;
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
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  try {
    const client = await redis;
    const key = `visitors:${todayKstKey()}`;
    const count = await client.incr(key);
    await client.expire(key, VISITOR_KEY_TTL_SECONDS);
    return count;
  } catch {
    return null;
  }
}

export async function getTodayVisitors() {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  try {
    const client = await redis;
    const count = await client.get(`visitors:${todayKstKey()}`);
    return count !== null ? Number(count) : 0;
  } catch {
    return null;
  }
}

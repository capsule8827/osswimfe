import { NextResponse, connection } from "next/server";
import { incrementTodayVisitors } from "@/lib/kv";

export async function GET() {
  // 방문자 수는 요청마다 증가해야 하므로, 캐시/정적 생성을 명시적으로 막는다.
  await connection();
  const count = await incrementTodayVisitors();
  return NextResponse.json({ count });
}

import Link from "next/link";
import { notFound } from "next/navigation";
import PlaceholderBlock from "@/components/PlaceholderBlock";
import { getNewsById } from "@/lib/data";
import { incrementNewsViews } from "@/lib/kv";

// 조회수는 매 요청마다 증가해야 하므로 정적 생성 없이 항상 블로킹 렌더링한다.
export const instant = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getNewsById(id);

  if (!item) {
    return { title: "공지사항 정보 없음 | 오산시 수영연맹" };
  }

  return {
    title: `${item.title} | 오산시 수영연맹`,
    description: item.summary,
  };
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export default async function NewsDetailPage({ params }) {
  const { id } = await params;
  const item = getNewsById(id);

  if (!item) {
    notFound();
  }

  const views = await incrementNewsViews(id);

  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center bg-black text-white">
        <PlaceholderBlock
          label="NEWS & NOTICE"
          tone="dark"
          className="absolute inset-0 h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <span className="inline-block rounded-full bg-brand px-4 py-1 text-xs font-bold uppercase tracking-widest text-black">
            {item.category}
          </span>
          <h1 className="mt-5 break-keep text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {item.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm font-bold text-black/50 transition-colors hover:text-brand-strong"
        >
          ← 뉴스 목록으로
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-6">
          <span className="text-sm text-black/40">{formatDate(item.date)}</span>
          <span className="text-sm font-semibold text-black/50">
            조회수 {views ?? "-"}
          </span>
        </div>

        <p className="mt-8 text-base leading-relaxed text-black/70">{item.summary}</p>

        {item.attachment && (
          <a
            href={item.attachment.href}
            download
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-brand-dark"
          >
            {item.attachment.label}
            <span aria-hidden="true">↓</span>
          </a>
        )}

        {item.link && (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-black p-10 text-center text-white">
            <p className="text-sm text-white/50">관련 대회 정보를 확인해보세요.</p>
            <Link
              href={item.link}
              className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-4 text-base font-bold text-black transition-transform hover:scale-105 hover:bg-brand-dark"
            >
              자세히 보기 →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

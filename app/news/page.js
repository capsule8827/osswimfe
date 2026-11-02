import PlaceholderBlock from "@/components/PlaceholderBlock";
import { news } from "@/lib/data";

export const metadata = {
  title: "뉴스/공지사항 | 오산시 수영연맹",
  description: "오산시 수영연맹 공지사항 및 소식",
};

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export default function NewsPage() {
  const sorted = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center bg-black text-white">
        <PlaceholderBlock
          label="NEWS & NOTICE"
          tone="dark"
          className="absolute inset-0 h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand">News</p>
          <h1 className="mt-4 break-keep text-4xl font-black tracking-tight sm:text-6xl">뉴스/공지사항</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <ul className="divide-y divide-black/10 border-y border-black/10">
          {sorted.map((item) => (
            <li key={item.id} className="group py-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="inline-block w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                    {item.category}
                  </span>
                  <h2 className="text-lg font-extrabold text-black transition-colors group-hover:text-brand">
                    {item.title}
                  </h2>
                </div>
                <span className="shrink-0 text-sm text-black/40">{formatDate(item.date)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

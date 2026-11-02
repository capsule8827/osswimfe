import Link from "next/link";
import PlaceholderBlock from "@/components/PlaceholderBlock";
import CompetitionCard from "@/components/CompetitionCard";
import { EXTERNAL_APPLY_URL, getUpcomingCompetitions, getLatestNews } from "@/lib/data";

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export default function Home() {
  const upcoming = getUpcomingCompetitions(3);
  const latestNews = getLatestNews(3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[100vh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-black text-white">
        <PlaceholderBlock
          label="OSAN SWIMMING FEDERATION"
          tone="dark"
          className="absolute inset-0 h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand">
            Osan City Swimming Federation
          </p>
          <h1 className="mt-6 break-keep text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
            오산시
            <br />
            수영연맹
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg">
            물을 가르는 모든 순간, 오산시 수영연맹이 함께합니다.
            <br />
            대회 일정부터 선수 육성까지, 오산 수영의 중심.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={EXTERNAL_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-brand-dark"
            >
              대회 신청하기
            </a>
            <Link
              href="/competitions"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-bold text-white transition-colors hover:border-brand hover:text-brand"
            >
              대회일정 보기
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-xs font-semibold uppercase tracking-widest text-white/50">
          Scroll
        </div>
      </section>

      {/* About summary */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">About Us</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              오산시 수영연맹은
              <br />
              지역 수영 발전을 이끕니다.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/60">
              오산시 수영연맹은 생활체육 수영 저변 확대와 전문 선수 육성을 목표로 다양한 대회와
              강습 프로그램을 운영하고 있습니다. 모든 시민이 물과 가까워지는 그날까지,
              오산시 수영연맹이 앞장서겠습니다.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 border-b-2 border-brand pb-1 text-sm font-bold text-black transition-colors hover:text-brand"
            >
              연맹 소개 자세히 보기 →
            </Link>
          </div>
          <PlaceholderBlock label="OSAN SWIM" tone="light" className="h-72 w-full rounded-2xl sm:h-96" />
        </div>
      </section>

      {/* Upcoming competitions */}
      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Competitions</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                다가오는 대회
              </h2>
            </div>
            <Link
              href="/competitions"
              className="text-sm font-bold text-white/70 transition-colors hover:text-brand"
            >
              전체 일정 보기 →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((c) => (
              <div key={c.id} className="rounded-2xl bg-white">
                <CompetitionCard competition={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">News</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              최신 공지사항
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm font-bold text-black/60 transition-colors hover:text-brand"
          >
            전체 공지 보기 →
          </Link>
        </div>

        <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {latestNews.map((n) => (
            <li key={n.id}>
              <Link
                href="/news"
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="shrink-0 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                    {n.category}
                  </span>
                  <span className="font-semibold text-black transition-colors group-hover:text-brand">
                    {n.title}
                  </span>
                </div>
                <span className="text-sm text-black/40">{formatDate(n.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

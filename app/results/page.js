import PlaceholderBlock from "@/components/PlaceholderBlock";

export const metadata = {
  title: "경기결과 | 오산시 수영연맹",
  description: "오산시 수영연맹 대회 경기결과 및 종합점수 안내",
};

const RESULTS = [
  {
    title: "제1회 오산시수영연맹회장배 수영대회 - 학생부 경기결과",
    href: "/docs/results-student-final.pdf",
  },
  {
    title: "제1회 오산시수영연맹회장배 수영대회 - 학생부 종합점수",
    href: "/docs/results-student-score.pdf",
  },
  {
    title: "제1회 오산시수영연맹회장배 수영대회 - 성인부 경기결과",
    href: "/docs/results-adult-final.pdf",
  },
  {
    title: "제1회 오산시수영연맹회장배 수영대회 - 성인부 종합점수",
    href: "/docs/results-adult-score.pdf",
  },
];

export default function ResultsPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center bg-black text-white">
        <PlaceholderBlock
          label="RESULTS"
          tone="dark"
          className="absolute inset-0 h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-strong">Results</p>
          <h1 className="mt-4 break-keep text-4xl font-black tracking-tight sm:text-6xl">경기결과</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <p className="text-sm text-black/50">대회가 종료된 후 경기결과 및 종합점수를 PDF로 제공합니다.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {RESULTS.map((item) => (
            <div
              key={item.href}
              className="flex flex-col justify-between gap-5 rounded-2xl border border-black/10 p-6 transition-colors hover:border-brand"
            >
              <h3 className="break-keep text-lg font-extrabold leading-snug text-black">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-bold text-black transition-colors hover:border-brand hover:text-brand-strong"
                >
                  미리보기
                </a>
                <a
                  href={item.href}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-brand-dark"
                >
                  다운로드 (PDF)
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

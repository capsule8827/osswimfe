import PlaceholderBlock from "@/components/PlaceholderBlock";

export const metadata = {
  title: "소개 | 오산시 수영연맹",
  description: "오산시 수영연맹 소개, 비전, 조직도",
};

const ORG_CHART = [
  { role: "회장", name: "김oo" },
  { role: "수석부회장", name: "이oo" },
  {
    role: "부회장",
    name: "박oo · 최oo · 정oo",
  },
  {
    role: "이사",
    name: "강oo · 조oo · 윤oo · 임oo · 한oo",
  },
  { role: "사무국장", name: "오oo" },
  { role: "사무국 (운영·경기·홍보)", name: "연맹 사무처 직원" },
];

const VISION_ITEMS = [
  {
    title: "생활체육 저변 확대",
    desc: "시민 누구나 쉽게 수영을 배우고 즐길 수 있는 환경을 조성합니다.",
  },
  {
    title: "전문 선수 육성",
    desc: "유소년부터 마스터즈까지 체계적인 육성 시스템을 구축합니다.",
  },
  {
    title: "투명하고 공정한 운영",
    desc: "대회 운영과 연맹 행정 전반의 투명성과 공정성을 최우선으로 합니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[50vh] min-h-[360px] items-center justify-center bg-black text-white">
        <PlaceholderBlock label="ABOUT OSAN SWIM" tone="dark" className="absolute inset-0 h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand">About</p>
          <h1 className="mt-4 break-keep text-4xl font-black tracking-tight sm:text-6xl">연맹 소개</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Introduction</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          오산시 수영연맹 소개
        </h2>
        <p className="mt-6 text-base leading-relaxed text-black/60">
          오산시 수영연맹은 오산시 생활체육회 산하 공식 가맹단체로, 지역 내 수영 보급과 선수
          육성을 목적으로 설립되었습니다. 매년 다양한 규모의 대회를 개최하고, 유소년 및
          일반 동호인을 위한 강습 프로그램을 운영하며, 경기도 및 전국 단위 대회에 오산시
          대표 선수단을 파견하고 있습니다. (본 소개 문구는 임시 더미 텍스트입니다.)
        </p>
      </section>

      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Vision</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">연맹의 비전</h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VISION_ITEMS.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 p-6 transition-colors hover:border-brand"
              >
                <span className="text-sm font-black text-brand">0{idx + 1}</span>
                <h3 className="mt-4 text-lg font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Organization</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">조직도</h2>
        <p className="mt-4 text-sm text-black/50">
          * 아래 조직 구성 및 인명은 예시를 위한 더미 데이터입니다.
        </p>

        <div className="mt-10 space-y-3">
          {ORG_CHART.map((node) => (
            <div
              key={node.role}
              className="flex flex-col gap-2 rounded-xl border border-black/10 p-5 transition-colors hover:border-brand sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="inline-block w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                {node.role}
              </span>
              <span className="text-sm font-semibold text-black/70">{node.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

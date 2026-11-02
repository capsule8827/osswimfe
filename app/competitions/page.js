import PlaceholderBlock from "@/components/PlaceholderBlock";
import CompetitionCard from "@/components/CompetitionCard";
import { competitions } from "@/lib/data";

export const metadata = {
  title: "대회일정 | 오산시 수영연맹",
  description: "오산시 수영연맹 대회 일정 안내",
};

export default function CompetitionsPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center bg-black text-white">
        <PlaceholderBlock
          label="COMPETITIONS"
          tone="brand"
          className="absolute inset-0 h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand">Competitions</p>
          <h1 className="mt-4 break-keep text-4xl font-black tracking-tight sm:text-6xl">대회일정</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="text-sm text-black/50">
          총 {competitions.length}개의 대회가 등록되어 있습니다. (더미 데이터)
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((c) => (
            <CompetitionCard key={c.id} competition={c} />
          ))}
        </div>
      </section>
    </>
  );
}

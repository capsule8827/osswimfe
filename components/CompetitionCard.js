import Link from "next/link";
import PlaceholderBlock from "@/components/PlaceholderBlock";

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export default function CompetitionCard({ competition }) {
  return (
    <Link
      href={`/competitions/${competition.id}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10"
    >
      <PlaceholderBlock
        label={competition.category}
        tone="dark"
        className="h-48 w-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-6">
        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-strong">
          {competition.category}
        </span>
        <h3 className="mt-3 text-lg font-extrabold leading-snug text-black">
          {competition.title}
        </h3>
        <dl className="mt-4 space-y-1 text-sm text-black/60">
          <div className="flex gap-2">
            <dt className="font-semibold">일시</dt>
            <dd>{competition.dateLabel ?? formatDate(competition.date)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold">장소</dt>
            <dd>{competition.location}</dd>
          </div>
        </dl>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-black transition-colors group-hover:text-brand-strong">
          자세히 보기
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

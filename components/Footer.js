const SNS_LINKS = [
  { label: "Instagram", icon: "IG" },
  { label: "YouTube", icon: "YT" },
  { label: "Facebook", icon: "FB" },
  { label: "Blog", icon: "BL" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="text-xl font-black tracking-tight">오산수영연맹</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">오산스포츠센터 내 오산시수영연맹</p>
          </div>

          <div>
            <p className="text-sm font-bold text-white/80">SNS</p>
            <div className="mt-3 flex gap-3">
              {SNS_LINKS.map((sns) => (
                <a
                  key={sns.label}
                  href="#"
                  aria-label={sns.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white/70 transition-colors hover:border-brand hover:text-brand-strong"
                >
                  {sns.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 오산시 수영연맹. All rights reserved.</p>
          <p>본 사이트의 모든 대회 일정 및 정보는 더미 데이터이며 실제와 다를 수 있습니다.</p>
        </div>
      </div>
    </footer>
  );
}

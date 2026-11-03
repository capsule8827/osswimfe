const TONES = {
  dark: "bg-gradient-to-br from-black via-neutral-900 to-black",
  brand: "bg-gradient-to-br from-brand via-brand-dark to-black",
  light: "bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300",
};

export default function PlaceholderBlock({ label, tone = "dark", className = "" }) {
  const textTone = tone === "light" ? "text-black/40" : "text-white/70";

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${TONES[tone]} ${className}`}
    >
      <span className={`px-4 text-center text-sm font-bold uppercase tracking-widest ${textTone}`}>
        {label}
      </span>
    </div>
  );
}

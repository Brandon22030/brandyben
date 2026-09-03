export function Logo({ size = 32, mono = false }: { size?: number; mono?: boolean }) {
  const sw = size >= 40 ? 10 : size >= 28 ? 11 : size >= 20 ? 12 : 14;
  const ink = mono ? "currentColor" : "#F2F4F8";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-label="BRANDYBEN">
      <path d="M100 96A70 70 0 0 0 30 26" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="30" cy="96" r={sw} fill={ink} />
      <circle cx="30" cy="26" r={Math.round(sw * 0.82)} fill={mono ? "currentColor" : "#FFB84D"} />
    </svg>
  );
}

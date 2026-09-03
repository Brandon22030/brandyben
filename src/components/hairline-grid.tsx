import type { ReactNode } from "react";

export function HairlineGrid({
  children,
  className = "",
  rounded = "16px",
}: {
  children: ReactNode;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`grid gap-px overflow-hidden border border-white/[0.09] bg-white/[0.09] ${className}`}
      style={{ borderRadius: rounded }}
    >
      {children}
    </div>
  );
}

export function HairlineCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`bg-[#0A0C11] ${className}`}>{children}</div>;
}

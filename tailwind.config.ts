import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080B",
        surface: "#0E1016",
        signal: "#4F7CFF",
        amber: "#FFB84D",
        bone: "#F2F4F8",
        cool: "#8B93A7",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
} satisfies Config;

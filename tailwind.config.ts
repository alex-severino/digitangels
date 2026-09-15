import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0A0A0A",
        accent: {
          DEFAULT: "#5B8CFF",
          foreground: "#0A0A0A",
          muted: "#3D5FA8",
        },
        muted: {
          DEFAULT: "#1A1A1A",
          foreground: "#9C9C96",
        },
        border: "#262626",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": [
          "4.5rem",
          { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "600" },
        ],
        "display-xl": [
          "3.75rem",
          { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "600" },
        ],
        "display-lg": [
          "3rem",
          { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        "display-md": [
          "2.25rem",
          { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "600" },
        ],
        "display-sm": [
          "1.875rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        "label-lg": [
          "0.875rem",
          { lineHeight: "1.4", letterSpacing: "0.04em", fontWeight: "500" },
        ],
        "label-sm": [
          "0.75rem",
          { lineHeight: "1.35", letterSpacing: "0.06em", fontWeight: "500" },
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
};

export default config;

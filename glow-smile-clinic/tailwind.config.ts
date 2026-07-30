import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B2B2C", // deep midnight teal - trust, clinical calm
          900: "#071C1D",
          800: "#0B2B2C",
          700: "#123F41",
          600: "#1A5457",
        },
        porcelain: {
          DEFAULT: "#FAF7F1", // warm ivory, enamel-like
          100: "#FFFFFF",
          200: "#FAF7F1",
          300: "#F1EBDE",
        },
        glow: {
          DEFAULT: "#D4A054", // warm marigold - "glow"
          light: "#EFC98A",
          dark: "#B5813A",
        },
        bloom: {
          DEFAULT: "#E28B7D", // soft rose-coral - "smile" / skin
          light: "#F2B6AB",
          dark: "#C06B5D",
        },
        sage: {
          DEFAULT: "#7FA69A", // muted sage - hair/nature accent
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "url('/grain.svg')",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

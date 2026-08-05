import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        tomato: {
          50: "#fff3ed",
          100: "#ffe2d2",
          500: "#ef5b3d",
          600: "#d94327",
          700: "#b9341f"
        },
        basil: {
          50: "#eef8f1",
          100: "#d7eddd",
          600: "#2f7d4f",
          700: "#25643f"
        },
        cream: "#fffaf2",
        charcoal: "#2a2521"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(42, 37, 33, 0.12)"
      }
    }
  },
  plugins: [forms]
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        card: "var(--card)",
        border: "var(--border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        text: "var(--text)",
        muted: "#8E8C9C",
        success: "var(--success)",
        error: "var(--error)",
        yellow: "#FFE14D",
        pink: "#FF4FA3",
        sky: "#5CC8FF",
        lime: "#B6F36B",
        paper: "#FFF6E0",
        night: "#0B0B10",
        tile: "#15151C",
        line: "#25252F",
      },
      borderRadius: {
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

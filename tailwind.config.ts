import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#14120F",
        "void-light": "#1c1a16",
        paper: "#F2EDE4",
        "paper-dim": "#d8d2c8",
        safelight: "#B8492E",
        "safelight-glow": "#d4572f",
        steel: "#4B5A5E",
        grain: "#8C8577",
        "grain-light": "#a89e90",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.35em",
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.8rem, 4vw, 3.5rem)", { lineHeight: "1.05" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -2%)" },
          "20%": { transform: "translate(1%, 3%)" },
          "30%": { transform: "translate(-3%, 1%)" },
          "40%": { transform: "translate(3%, -1%)" },
          "50%": { transform: "translate(-1%, 2%)" },
          "60%": { transform: "translate(2%, -3%)" },
          "70%": { transform: "translate(-2%, 3%)" },
          "80%": { transform: "translate(1%, -2%)" },
          "90%": { transform: "translate(3%, 1%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.7s cubic-bezier(0.21, 0.47, 0.32, 0.98) forwards",
        "grain": "grain-shift 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};
export default config;

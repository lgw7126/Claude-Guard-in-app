/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: "#7AA884",
        charcoal: "#121212",
        surface: "#1E1E1E",
        "surface-2": "#252525",
        "warm-gray": "#A0A0A0",
      },
      keyframes: {
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "70%": { transform: "scale(1.18)", opacity: "0" },
          "100%": { transform: "scale(1.18)", opacity: "0" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.35s cubic-bezier(0.32,0.72,0,1) forwards",
        "fade-in": "fade-in 0.2s ease-out forwards",
        "spin-slow": "spin-slow 1.1s linear infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.215,0.61,0.355,1) infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ['class', '[data-theme="night"]'],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],

  daisyui: {
    styled: true,
    themes: ["emerald", "night"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};

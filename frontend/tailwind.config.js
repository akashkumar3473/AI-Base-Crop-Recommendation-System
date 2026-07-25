/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#79db9f",
        secondary: "#a5d8b8",
      },
    },
  },
  plugins: [],
};
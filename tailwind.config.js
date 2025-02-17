/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7D2A9A", // Purple
        secondary: "#E1CDE8", // Card Color
        background: "#f7f7f5", // Background Color
        text: "#2d2d2d", // Text Color
      },
    },
  },
  plugins: [],
};

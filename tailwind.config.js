/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      grayscale: {
        75: "75%",
        50: "50%",
      },
      contrast: {
        25: ".25",
      },
    },
  },
  plugins: [],
};

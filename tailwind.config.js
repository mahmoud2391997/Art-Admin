/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: 'var(--main-gray)',
      },
      fontFamily: {
        "eb-garamond": ['"EB Garamond"', "serif"],
      },
    },
  },
  plugins: [],
};

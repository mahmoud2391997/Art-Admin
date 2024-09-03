/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "eb-garamond": ['"EB Garamond"', "serif"],
        "Playwrite-CU": ['"Playwrite CU"', "cursive"],
        Sevillana: ['"Sevillana"', "cursive"],
      },
      keyframes: {
        moveVertical: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        snakeStroke: {
          "0%": {
            strokeDasharray: "10% 90%",
            strokeDashoffset: "0%",
          },
          "50%": {
            strokeDasharray: "90% 10%",
            strokeDashoffset: "100%",
          },
          "100%": {
            strokeDasharray: "10% 90%",
            strokeDashoffset: "0%",
          },
        },
      },
    },
    animation: {
      moveVertical: "moveVertical 5s ease-in-out infinite",
      snakeStroke: "snakeStroke 2s ease-in-out infinite",
    },
  },

  plugins: [],
});

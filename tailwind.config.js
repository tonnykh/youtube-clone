/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    // plugin(function ({ addUtilities }) {
    //   addUtilities({
    // ".scrollbar": {
    /* IE and Edge */
    // "-ms-overflow-style": { width: "10px" },
    /* Firefox */
    // "scrollbar-width": "10px",
    /* Safari and Chrome */
    //   "&::-webkit-scrollbar": {
    //     width: "10px",
    //     box-shadow: "inset 0 0 5px grey",
    // },
    // "::-webkit-scrollbar-track": {
    //    box-shadow: "inset 0 0 5px grey",
    //     border-radius: "10px",
    //   },
    // },
    //   });
    // }),
  ],
};

// ::-webkit-scrollbar {
//  width: 10px;
//}

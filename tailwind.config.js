/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Pretendard - Regular"],
      },
      colors: {
        main: "#9FBEF7",
        red: "#FF6D57",
        red_light: "#FFA6A6",
      },
      fontSize: {
        h1: ["48px", { fontWeight: "600" }],
        h2: ["40px", { fontWeight: "600" }],
        h3: ["32px", { fontWeight: "600" }],
        b1: ["32px", { fontWeight: "500" }],
        b2: ["24px", { fontWeight: "500" }],
        b3: ["20px", { fontWeight: "500", lineHeight: "30px" }],
        navi1: ["16px", { fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

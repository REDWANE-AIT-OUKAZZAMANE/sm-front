/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#141A23",
        textMuted: "#9CA0AC",
        textOrange: "#FA8F21",
      },
      fontSize: {
        dynamicXS: "clamp(0.8rem, 0.6vw, 1.5rem)",
        dynamicS: "clamp(1rem, 0.8vw, 2rem)",
        dynamicM: "clamp(1rem, 1vw, 2.2rem)",
        dynamicL: "clamp(1.6rem, 1.5vw, 2.6rem)",
        dynamicXL: "clamp(2.4rem, 2vw, 3.2rem)",
        dynamicIcon: "clamp(20rem, 20vw, 40rem)",
      },
      aspectRatio: {
        "4/5": "4 / 3",
      },
      gridTemplateColumns: {
        autofit: "repeat(auto-fit, minmax(22.66vw,1fr))",
      },
    },
  },
  plugins: [],
};

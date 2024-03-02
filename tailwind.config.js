/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#1C1C26",
        darkBlue: "#17171E",
        lightBlue: "#272836",
        borderColor: "#2c2d3c",
        purple: "#8D58EA",
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
      },
      boxShadow: {
        inShadow: "0px 0px 55px 20px #8D58EA inset",
      },
    },
  },
  plugins: [],
};

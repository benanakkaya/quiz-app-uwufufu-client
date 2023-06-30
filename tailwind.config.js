/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "0rem",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        customRed: "#E73929",
        customDark: "#212121",
        customLightDark: "#2C2C2C",
        customGray: "#3E3E3E",
        customLightGray: "#5C5C5C",
      },
    },
  },
  plugins: [],
};

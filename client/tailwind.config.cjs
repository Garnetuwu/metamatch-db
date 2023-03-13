/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#073048",
        indigo: "#0B4F6F",
        metal: "#20363F",
        onyx: "#34363E",
        "dirty-pink": "#745F64",
        black: "#0D131D",
        "light-blue": "#4B8495",
        sand: "#E1C4AC",
      },
      fontSize: {
        sm: "1rem",
        md: "1.3rem",
        lg: "1.5rem",
        xl: "2rem",
      },
    },
  },
  plugins: [],
};

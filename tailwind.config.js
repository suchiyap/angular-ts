/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontSize: {
      xs: "0.8rem",
      base: "0.9rem",
      lg: "1.15rem",
      xl: "1.3rem",
      "2xl": "1.5rem",
    },
    extend: {
      colors: {
        primary: "#4f46e5",
      },
    },
  },
  plugins: ["tailwindcss, autoprefixer"],
};

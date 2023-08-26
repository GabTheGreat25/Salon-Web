/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "320px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          default: "#FDA7DF",
          variant: "#FDB9E5",
          t2: "#FECAEC",
          t3: "#FED3EF",
          t4: "#FEDCF2",
          t5: "#FEE9F7",
        },
        secondary: {
          default: "#E056FD",
          variant: "#E678FD",
          t2: "#EC9AFE",
          t3: "#F0ABFE",
          t4: "#F3BBFE",
          t5: "#F9DDFF",
        },
        neutral: {
          primary: "#212B36",
          secondary: "#5E738A",
          800: "#333F4D",
          700: "#425263",
          600: "#516579",
          500: "#5E738A",
          300: "#8D9DAE",
          200: "#ADB9C6",
          100: "#CCD5DE",
          50: "#F4F6F8",
        },
      },
    },
  },
  plugins: [],
};

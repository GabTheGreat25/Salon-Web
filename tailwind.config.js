/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  prefix: "",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  corePlugins: {
    aspectRatio: false,
    preflight: true,
  },
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
      borderColor: ["autofill"],
      shadowFill: ["autofill"],
      textFill: ["autofill"],
      scrollbar: {
        DEFAULT: {
          size: "spacing.1",
          track: { background: "lightgray" },
          thumb: { background: "gray" },
          hover: { background: "darkgray" },
        },
        thin: {
          size: "2px",
          track: { background: "lightgray" },
          thumb: { background: "gray" },
          hover: { background: "darkgray" },
        },
        primary: {
          size: "1rem",
          track: { background: "#FED3EF" },
          thumb: { background: "#FDA7DF" },
          hover: { background: "#F78FB3" },
        },
        secondary: {
          size: ".5rem",
          track: { background: "#FED3EF" },
          thumb: { background: "#FDA7DF" },
          hover: { background: "#F78FB3" },
        },
      },
      tooltipArrows: (theme) => ({
        "danger-arrow": {
          borderColor: theme("colors.red.400"),
          borderWidth: 1,
          backgroundColor: theme("colors.red.200"),
          size: 10,
          offset: 10,
        },
      }),
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        card: {
          shadow: "#5e738a60",
          input: "#5e738a00",
        },
        light: {
          default: "#e5e5e5",
        },
        dark: {
          default: "#212B36",
        },
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
          300: "#8D9DAE",
          200: "#ADB9C6",
          100: "#CCD5DE",
          50: "#F4F6F8",
        },
      },
    },
  },
  daisyui: {
    themes: false,
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: false,
    themes: [
      {
        mytheme: {
          primary: "#FDA7DF",
          secondary: "#E056FD",
          accent: "#F78FB3",
          neutral: "#BE2EDD",
          "base-100": " #e5e5e5",
          info: "#248EF2",
          success: "#39B54A",
          warning: "#FFB400",
          error: "#FF0000",
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@kamona/tailwindcss-perspective"),
    require("@gradin/tailwindcss-scrollbar"),
    require("tailwindcss-labeled-groups")(["custom", "1"]),
    require("tailwindcss-css-filters"),
    require("tailwindcss-highlights"),
    require("tailwindcss-autofill"),
    require("tailwindcss-tooltip-arrow-after"),
    require("tailwindcss-debug-screens"),
    require("tailwindcss-gradients"),
    require("tailwindcss-border-gradients")(),
    require("daisyui"),
  ],
};

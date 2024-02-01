/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7749F8",
          secondary: "#F2994A",
          accent: "#1FB2A6",
          neutral: "#191D24",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#EB5757",
        },
      },
      "light",
    ],
  },
}
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        gray: "var(--gray)",
        graysecondary: "var(--gray-secondary)",
        graysilver: "var(--gray-silver)",
        graywhite: "var(--gray-white)",
        red: "var(--red)",
      },
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;

// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary & Secondary
        primary: "#1C2024",
        secondary: "#4F46E5",

        // Secondary color variations (Tint and Shade)
        indigo: {
          50: "#F1F0FD",
          100: "#E3E2FB",
          200: "#BFBCF6",
          300: "#9691EF",
          400: "#726BEA",
          500: "#4F46E5",
          600: "#3F38B7",
          700: "#2F2A88",
          800: "#26216E",
          900: "#1D1953",
        },

        // Primary color variations (Tint and Shade)
        slate: {
          50: "#EDEEEE",
          100: "#DBDCDD",
          200: "#ADAFB0",
          300: "#787A7C",
          400: "#494D50",
          500: "#1C2024",
          600: "#161A1D",
          700: "#111315",
          800: "#0D0F11",
          900: "#0A0C0D",
        },

        // Neutral colors
        neutral: {
          black: "#0C0C0C",
          white: "#F4F4F3",
          gray: {
            1: "#2D2D2D",
            2: "#444444",
            3: "#505050",
            4: "#717171",
          },
          light: {
            1: "#959595",
            2: "#C7C6C6",
            3: "#E7E7E7",
            4: "#F5F5F5",
          },
        },

        // Status colors
        status: {
          error: "#C91433",
          "error-light": "#FAE7EB",
          success: "#146C43",
          "success-light": "#D1F7E5",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;

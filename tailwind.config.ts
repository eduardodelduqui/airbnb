import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        xxs: '0.625rem',
      },
      boxShadow: {
        bottom: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
} satisfies Config;

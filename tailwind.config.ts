import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F7931A',
          600: '#EA8600',
          700: '#C97100',
        },
        black: {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
        },
        success: {
          DEFAULT: '#27AE60',
          light: '#2ECC71',
        },
        trust: {
          DEFAULT: '#2E86DE',
          light: '#3498DB',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          500: '#6C757D',
          900: '#212529',
        },
      },
      fontFamily: {
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

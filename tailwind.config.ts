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
        display: ['var(--font-fraunces)', 'Georgia', 'Times New Roman', 'serif'],
        heading: ['var(--font-fraunces)', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Display sizes for premium hero sections with improved legibility
        'display-xl': ['5rem', { lineHeight: '1', letterSpacing: '0.01em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '0.005em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '0em' }],
      },
      letterSpacing: {
        'tightest': '-0.075em',
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      fontWeight: {
        'extra-light': '200',
        'extra-bold': '800',
        'black': '900',
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Cartoon color palette - vibrant and playful
        primary: {
          50: '#fef7ee',
          100: '#fcecd6',
          200: '#f8d5ac',
          300: '#f3b878',
          400: '#ed9142',
          500: '#e9741d',
          600: '#da5a13',
          700: '#b54312',
          800: '#903617',
          900: '#742f16',
          950: '#3e1509',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e5fe',
          300: '#7cd2fd',
          400: '#36bcfa',
          500: '#0ca3eb',
          600: '#0082c9',
          700: '#0168a3',
          800: '#065786',
          900: '#0b496f',
          950: '#072e4a',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        cartoon: '4px 4px 0px 0px rgba(0, 0, 0, 0.1)',
        'cartoon-lg': '6px 6px 0px 0px rgba(0, 0, 0, 0.15)',
        'cartoon-xl': '8px 8px 0px 0px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;

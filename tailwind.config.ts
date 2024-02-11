import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        'menu': '18rem',
      },
      colors: {
        primary: '#202225',
        secondary: '#f472b6',
        gray: {
          900: '#191919',
          850: '#202225',
          800: '#242424',
          700: '#2f3136',
          600: '#36393f',
          500: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5'
        }
      },
      keyframes: {
        tilt__left: {
          from: { transform: 'rotate(0deg) translateX(0)' },
          to: { transform: 'rotate(-5deg) translateX(-100rem)' }
        },
        tilt__right: {
          from: { transform: 'rotate(0deg) translateX(0)' },
          to: { transform: 'rotate(5deg) translateX(100rem)' }
        },
      },
      animation: {
        tilt__left: 'tilt__left 1s',
        tilt__right: 'tilt__right 1s',
      }
    }
  },
  plugins: [],
};
export default config;

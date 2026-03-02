import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nexus: {
          900: '#050b19',
          800: '#0c1833',
          500: '#10b981'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(16, 185, 129, 0.25)'
      }
    }
  },
  daisyui: {
    themes: ['dark'],
    darkTheme: 'dark'
  },
  plugins: [daisyui]
};

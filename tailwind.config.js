/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#FFFFFF',
          offwhite: '#FBFBFD',
          gray: '#F5F5F7',
          grayLight: '#FBFBFD',
          grayDark: '#E8E8ED',
          border: '#D2D2D7',
          borderLight: 'rgba(0, 0, 0, 0.08)',
          text: '#1D1D1F',
          secondary: '#86868B',
          tertiary: '#6E6E73',
          blue: '#0071E3',
          blueHover: '#0077ED',
          blueDark: '#006EDB',
          dark: '#111112',
          card: '#F5F5F7',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Plus Jakarta Sans"',
          '"Inter"',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.022em',
        normal: '-0.011em',
        wide: '0.04em',
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'apple-card': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'apple-float': '0 12px 32px rgba(0, 0, 0, 0.08)',
        'apple-modal': '0 25px 60px -15px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'apple-sm': '10px',
        'apple-md': '14px',
        'apple-lg': '18px',
        'apple-xl': '24px',
      },
    },
  },
  plugins: [],
}

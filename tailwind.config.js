/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        apple: {
          gray: {
            1: '#1D1D1F',
            2: '#6E6E73',
            3: '#86868B',
            4: '#D2D2D7',
            5: '#F5F5F7',
            6: '#FAFAFA',
          },
          blue: '#0071E3',
        },
      },
      fontSize: {
        'hero-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
        'hero-lg': ['56px', { lineHeight: '1.07', letterSpacing: '-0.01em', fontWeight: '300' }],
        'hero-md': ['48px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body-lg': ['19px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      borderRadius: {
        'apple': '18px',
        'apple-sm': '12px',
        'apple-button': '980px',
      },
    },
  },
  plugins: [],
};

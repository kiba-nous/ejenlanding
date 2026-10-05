/** @type {import('tailwindcss').Config} */

/**
 * Design tokens.
 *
 * `brand`  — sky-blue scale. 400 (#61C0F5) is the fill colour for buttons
 *            and blocks; it only reaches AA contrast with dark text, so it
 *            always pairs with ink-950. 500 is the logo blue (#38B6FF); 600
 *            and 700 are the same hue, darkened, for blue text — 600 for
 *            headline accents and icons (3.8:1), 700+ for small text (AA).
 * `ink`    — warm "paper" tints at the light end (50–300) so pages read like
 *            printed tax forms, deepening into navy for text (400+).
 * `apple`  — legacy aliases kept so the unlinked /business, /tax-firms and
 *            /investors pages still render. New code should not use them.
 */
const brand = {
  DEFAULT: '#61C0F5',
  50: '#F1F9FE',
  100: '#E0F2FD',
  200: '#C4E8FB',
  300: '#98D6F9',
  400: '#61C0F5',
  500: '#38B6FF',
  600: '#0088D6',
  700: '#0A78B8',
  800: '#085F91',
  900: '#064F79',
  950: '#053F61',
};

const ink = {
  50: '#F7F6F2',
  100: '#EFEEE8',
  200: '#E2E0D8',
  300: '#CAC8BF',
  400: '#8E95A3',
  500: '#626B7C',
  600: '#465063',
  700: '#323C4E',
  800: '#1E2737',
  900: '#121A27',
  950: '#0A111C',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand,
        ink,
        cyan: { logo: '#25C6E6' },
        whatsapp: { DEFAULT: '#25D366', dark: '#1DA851' },
        // Legacy aliases — see note above.
        apple: {
          gray: {
            1: ink[900],
            2: ink[600],
            3: ink[500],
            4: ink[200],
            5: ink[100],
            6: ink[50],
          },
          blue: brand[600],
        },
      },
      fontSize: {
        'display-xl': ['4.25rem', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-sm': ['2.125rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        // Legacy sizes used by the unlinked pages.
        'hero-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
        'hero-lg': ['56px', { lineHeight: '1.07', letterSpacing: '-0.01em', fontWeight: '300' }],
        'hero-md': ['48px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body-lg': ['19px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
        // Legacy
        apple: '18px',
        'apple-sm': '12px',
        'apple-button': '980px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 26, 39, 0.04), 0 8px 24px -12px rgba(18, 26, 39, 0.12)',
        'card-hover': '0 2px 4px rgba(18, 26, 39, 0.05), 0 20px 40px -16px rgba(18, 26, 39, 0.18)',
        float: '0 24px 60px -20px rgba(11, 40, 61, 0.35)',
        ring: '0 0 0 1px rgba(18, 26, 39, 0.06)',
        // Hard offset shadow: reads as a sheet of paper lifted off the desk.
        paper: '0 1px 0 rgba(18, 26, 39, 0.04), 6px 6px 0 rgba(18, 26, 39, 0.9)',
        'paper-sm': '3px 3px 0 rgba(18, 26, 39, 0.9)',
      },
      backgroundImage: {
        // Textures only — the design uses flat colour, no decorative gradients.
        'dots': 'radial-gradient(rgba(18,26,39,0.08) 1px, transparent 1px)',
        // Ledger / graph paper.
        'ledger':
          'linear-gradient(rgba(22,121,181,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(22,121,181,0.07) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

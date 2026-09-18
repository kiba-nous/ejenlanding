/** @type {import('tailwindcss').Config} */

/**
 * Design tokens.
 *
 * `brand`  — derived from the logo's sky-blue → cyan gradient. 600 is the
 *            button/link colour (AA on white); 400 matches the logo mark.
 * `ink`    — cool, slightly blue-tinted neutrals so grey text sits well next
 *            to the brand blue instead of looking muddy.
 * `apple`  — legacy aliases kept so the unlinked /business, /tax-firms and
 *            /investors pages still render. New code should not use them.
 */
const brand = {
  50: '#EFF8FF',
  100: '#DBEEFF',
  200: '#BFE2FF',
  300: '#8FCEFF',
  400: '#4FB3FF',
  500: '#2196F3',
  600: '#0B76D8',
  700: '#085FB3',
  800: '#0A4E8F',
  900: '#0D3F70',
  950: '#08213D',
};

const ink = {
  50: '#F7F9FC',
  100: '#EEF2F7',
  200: '#DDE3EC',
  300: '#C3CCD9',
  400: '#8E9AAD',
  500: '#64718A',
  600: '#485468',
  700: '#343E50',
  800: '#1F2735',
  900: '#131A25',
  950: '#0B0F16',
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
        card: '0 1px 2px rgba(19, 26, 37, 0.04), 0 8px 24px -12px rgba(19, 26, 37, 0.12)',
        'card-hover': '0 2px 4px rgba(19, 26, 37, 0.05), 0 20px 40px -16px rgba(19, 26, 37, 0.18)',
        float: '0 24px 60px -20px rgba(8, 33, 61, 0.35)',
        ring: '0 0 0 1px rgba(19, 26, 37, 0.06)',
      },
      backgroundImage: {
        'brand-gradient': `linear-gradient(135deg, ${brand[600]} 0%, #25C6E6 100%)`,
        'hero-glow':
          'radial-gradient(60% 50% at 80% 10%, rgba(79,179,255,0.22) 0%, rgba(79,179,255,0) 70%), radial-gradient(40% 40% at 10% 90%, rgba(37,198,230,0.16) 0%, rgba(37,198,230,0) 70%)',
        'dots': 'radial-gradient(rgba(19,26,37,0.08) 1px, transparent 1px)',
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
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

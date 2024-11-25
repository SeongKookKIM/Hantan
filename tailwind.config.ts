import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.25rem',
      },
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        border: 'hsl(var(--primary))',
        input: 'hsl(var(--secondary))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      height: {
        screenVH: 'calc(100vh - 140px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.text-area': {
          resize: 'none',
          padding: '0.75rem 1rem',
          display: 'block',
          width: '100%',
          minHeight: '13rem',
          borderWidth: '2px',
          borderRadius: 'var(--radius)',
          outline: 'none',
          fontSize: '1.25rem',
          backgroundColor: 'hsl(var(--secondary))',
          overflow: 'hidden',
          marginTop: '1rem',
          cursor: 'pointer',
        },
        '.common-icon': {
          display: 'flex',
          gap: '0.25rem',
          alignItems: 'center',
          fontSize: '1.25rem',
          cursor: 'default',
        },
      })
    }),
  ],
}
export default config

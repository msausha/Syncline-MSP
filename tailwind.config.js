/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Optional: override Tailwind defaults with our fluid sizes if you prefer using class names
        'xs':   'var(--text-xs)',
        'sm':   'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg':   'var(--text-lg)',
        'xl':   'var(--text-xl)',
        '2xl':  'var(--text-2xl)',
        '3xl':  'var(--text-3xl)',
        '4xl':  'var(--text-4xl)',
        '5xl':  'var(--text-5xl)',
        '6xl':  'var(--text-6xl)',
      },
      lineHeight: {
        'tight':   'var(--leading-tight)',
        'normal':  'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
        'loose':   'var(--leading-loose)',
      },
    },
  },
  plugins: [],
}

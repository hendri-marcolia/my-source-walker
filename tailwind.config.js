/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          background: 'var(--theme-background)',
          foreground: 'var(--theme-foreground)',
          primary: 'var(--theme-primary)',
          secondary: 'var(--theme-secondary)',
          accent: 'var(--theme-accent)',
          muted: 'var(--theme-muted)',
        },
      },
      fontFamily: {
        game: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}

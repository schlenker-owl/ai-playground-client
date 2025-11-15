/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        accent2: 'var(--accent-2)'
      },
      borderColor: {
        edge: '#1c2025'
      },
      boxShadow: {
        panel: '0 10px 30px rgba(0,0,0,0.35)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}

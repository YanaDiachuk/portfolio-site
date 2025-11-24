import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        goth: {
          bg: '#0a0a0b',
          card: '#121216',
          accent: '#d0b37a',
        },
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        techno: ['"Orbitron"', 'sans-serif'],
        gothic: ['"UnifrakturMaguntia"', 'serif'],
      },
      boxShadow: {
        brass: '0 1px 0 #3a2f1a, inset 0 0 8px #2b2314',
      },
      backgroundImage: {
        plate: 'radial-gradient(circle at 30% 20%, #111 0, #0b0b0c 50%, #09090a 100%)',
      },
    },
  },
  plugins: [],
}
export default config

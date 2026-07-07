import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        papel: '#FBFAF8',   // fondo, como una hoja de examen
        tinta: '#1C2541',   // texto principal, azul tinta oscuro
        lapiz: '#B23A2E',   // acento, rojo lápiz de corrección
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;

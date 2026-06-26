/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f5f1",
        hbs: {
          green: "#6D9E51",
          blue: "#44ACFF",
          gold: "#ECB65F",
          purple: "#B331F1",
        },
        primary: {
          DEFAULT: "#44ACFF",
          foreground: "#ffffff",
        },
        border: "rgba(31, 31, 31, 0.1)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
    },
  },
  plugins: [],
}

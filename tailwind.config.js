/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components_legacy/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fffaeb",
        surface: "#fdf8e6",
        nawwi: {
          accent: "#b47878",
          secondary: "#ebc0bc",
          neutral: "#eadada",
        },
        brand: {
          orange: "#b47878", // Replaced with nawwi accent
          cream: "#fffaeb",
          dark: "#1F1F1F",
          gray: {
            400: "#71717A",
            500: "#52525B",
            600: "#3F3F46",
            700: "#27272A",
            800: "#18181B",
            900: "#09090B",
          }
        },
        primary: {
          DEFAULT: "#b47878", // Replaced with nawwi accent
          foreground: "#fffaeb",
        },
        border: "rgba(31, 31, 31, 0.1)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(180, 120, 120, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(180, 120, 120, 0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-size': '40px 40px',
      },
    },
  },
  plugins: [],
}

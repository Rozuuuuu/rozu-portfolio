/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "background": "#fff8f7",
        "surface-container-highest": "#fddbd6",
        "surface-container-low": "#fff0ee",
        "surface": "#fff8f7",
        "surface-container": "#ffe9e6",
        "on-secondary": "#ffffff",
        "on-tertiary-fixed": "#001c38",
        "error": "#ba1a1a",
        "inverse-primary": "#ffb4aa",
        "on-surface": "#291714",
        "primary-fixed": "#ffdad5",
        "on-primary-fixed-variant": "#930006",
        "on-secondary-fixed": "#410001",
        "tertiary-fixed": "#d2e4ff",
        "on-tertiary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "tertiary": "#005ea4",
        "on-error-container": "#93000a",
        "outline-variant": "#e8bcb6",
        "surface-bright": "#fff8f7",
        "on-tertiary-container": "#fdfcff",
        "on-surface-variant": "#5e3f3b",
        "error-container": "#ffdad6",
        "secondary-fixed-dim": "#ffb4aa",
        "secondary-container": "#fc6959",
        "on-background": "#291714",
        "surface-tint": "#c0000a",
        "tertiary-container": "#0077cd",
        "on-secondary-container": "#690003",
        "inverse-surface": "#402b28",
        "surface-container-high": "#ffe2dd",
        "on-error": "#ffffff",
        "inverse-on-surface": "#ffedea",
        "secondary-fixed": "#ffdad5",
        "on-primary-container": "#fffbff",
        "on-secondary-fixed-variant": "#8c1712",
        "surface-dim": "#f4d3ce",
        "on-tertiary-fixed-variant": "#004880",
        "surface-variant": "#fddbd6",
        "tertiary-fixed-dim": "#a1c9ff",
        "secondary": "#ae3026",
        "primary-container": "#e61919",
        "outline": "#936e69",
        "primary-fixed-dim": "#ffb4aa",
        "on-primary-fixed": "#410001",
        "on-primary": "#ffffff",
        "primary": "#bc000a"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "fontFamily": {
        "mono": ["'JetBrains Mono'", "monospace"],
        "sans": ["'JetBrains Mono'", "'Public Sans'", "system-ui", "sans-serif"],
        "headline": ["'JetBrains Mono'", "monospace"],
        "body": ["'Public Sans'", "sans-serif"],
        "label": ["'JetBrains Mono'", "monospace"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}

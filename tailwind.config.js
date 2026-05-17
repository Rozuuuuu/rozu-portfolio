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
        /* ── Pure Black & White System ── */
        "background": "#FFFFFF",
        "surface": "#FFFFFF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#FAFAFA",
        "surface-container": "#F5F5F5",
        "surface-container-high": "#EEEEEE",
        "surface-container-highest": "#E5E5E5",
        "surface-bright": "#FFFFFF",
        "surface-dim": "#E0E0E0",
        "surface-tint": "#000000",
        "surface-variant": "#F5F5F5",

        "on-surface": "#000000",
        "on-surface-variant": "#555555",
        "on-background": "#000000",

        "primary": "#000000",
        "on-primary": "#FFFFFF",
        "primary-container": "#111111",
        "on-primary-container": "#FFFFFF",
        "primary-fixed": "#E5E5E5",
        "primary-fixed-dim": "#CCCCCC",
        "on-primary-fixed": "#000000",
        "on-primary-fixed-variant": "#333333",
        "inverse-primary": "#FFFFFF",

        "secondary": "#333333",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#222222",
        "on-secondary-container": "#FFFFFF",
        "secondary-fixed": "#E5E5E5",
        "secondary-fixed-dim": "#CCCCCC",
        "on-secondary-fixed": "#000000",
        "on-secondary-fixed-variant": "#333333",

        "tertiary": "#555555",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#666666",
        "on-tertiary-container": "#FFFFFF",
        "tertiary-fixed": "#E5E5E5",
        "tertiary-fixed-dim": "#CCCCCC",
        "on-tertiary-fixed": "#000000",
        "on-tertiary-fixed-variant": "#333333",

        "error": "#000000",
        "on-error": "#FFFFFF",
        "error-container": "#E5E5E5",
        "on-error-container": "#000000",

        "outline": "#999999",
        "outline-variant": "#CCCCCC",

        "inverse-surface": "#111111",
        "inverse-on-surface": "#F5F5F5",
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
      },
      "animation": {
        "skeleton": "skeleton-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      "keyframes": {
        "skeleton-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}

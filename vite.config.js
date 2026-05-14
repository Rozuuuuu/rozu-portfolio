import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Force filesystem polling instead of native watchers.
    // Necessary on OneDrive / cloud-synced directories where
    // native fs events are unreliable on Windows.
    watch: {
      usePolling: true,
      interval: 500,
    },
    // Ensure HMR WebSocket stays connected
    hmr: {
      overlay: true,
    },
  },
})

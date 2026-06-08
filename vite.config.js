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
  // [PERF FIX 2] Vite build improvements
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
            }
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
  }
})

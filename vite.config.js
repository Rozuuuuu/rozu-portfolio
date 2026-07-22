import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchContributions } from './api/_contributions-core.js'

/**
 * Dev-only middleware so `npm run dev` (Vite) serves /api/contributions the
 * same way the Vercel serverless function does in production. The token is
 * read from the loaded env (server-side) and never reaches the client bundle.
 */
function contributionsDevApi(env) {
  return {
    name: 'dev-api-contributions',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contributions', async (_req, res) => {
        const { status, body } = await fetchContributions({
          token: env.GITHUB_TOKEN,
          username: env.GITHUB_USERNAME,
        })
        res.statusCode = status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (no VITE_ prefix filter) for server-side dev use only.
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [react(), contributionsDevApi(env)],
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
  }
})

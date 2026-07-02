import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// The dev server proxies "/api/*" to VITE_PROXY_TARGET, rewriting the "/api"
// prefix away. This lets the browser talk to the API without CORS: point the
// runtime base URL (in the UI) at "/api".
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const target = env.VITE_PROXY_TARGET || 'http://localhost:3000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})

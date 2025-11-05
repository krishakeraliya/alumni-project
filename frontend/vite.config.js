import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0',       // allow all local network connections
    port: 5173,            // same port as before
    strictPort: true,      // don't auto-change port
    cors: true,            // enable CORS for backend calls
  },

  // optional: to prevent HTTPS warning (if needed later)
  preview: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
  },
})

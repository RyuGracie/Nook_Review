import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  root: "./src",
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})


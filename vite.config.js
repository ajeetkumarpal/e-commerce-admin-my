import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
   server: {
    port: 5175, // frontend
    proxy: {
      '/api': 'http://localhost:4000', // backend
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site: https://g-tiwari.github.io/
export default defineConfig({
  plugins: [react()],
  base: '/', // IMPORTANT
})

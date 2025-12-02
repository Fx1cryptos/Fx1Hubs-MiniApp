// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  // Important for Farcaster Frames / Mini Apps
  server: {
    port: 3000,
    open: false,
    host: true, // exposes on network (useful when testing on phone)
  },
  preview: {
    port: 4173,
    open: true,
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Repo is published at https://loic06-test.github.io/portfolio/ so every
// asset URL must be prefixed with `/portfolio/` — otherwise the production
// build fetches `/assets/...` from the GitHub Pages domain root (404) and the
// page renders blank.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (
            id.includes('node_modules/@react-three/fiber') ||
            id.includes('node_modules/@react-three/drei')
          ) {
            return 'r3f'
          }
          if (id.includes('node_modules/gsap')) return 'gsap'
        },
      },
    },
  },
})

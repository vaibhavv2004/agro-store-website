import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.jpg'],
      manifest: {
        name: 'Eachur Agro Store',
        short_name: 'Agro Store',
        description: 'Trusted Agricultural Store for Quality Solutions',
        theme_color: '#4caf50',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'favicon.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
})

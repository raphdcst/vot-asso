import inertia from '@adonisjs/inertia/vite'
import adonisjs from '@adonisjs/vite/client'
import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  envPrefix: 'PUBLIC_',
  plugins: [
    vue(),
    inertia({ ssr: { enabled: false, entrypoint: 'inertia/ssr.ts' } }),
    adonisjs({ entrypoints: ['inertia/app.ts'], reload: ['resources/views/**/*.edge'] }),
    ui({
      router: 'inertia',
      colorMode: false,
      ui: {
        colors: {
          primary: 'red',
          neutral: 'stone',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '~/': `${import.meta.dirname}/inertia/`,
      '@generated': `${import.meta.dirname}/.adonisjs/client/`,
    },
  },

  server: {
    watch: {
      ignored: ['**/storage/**', '**/tmp/**'],
    },
  },

  assetsInclude: ['public/assets/**'],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})

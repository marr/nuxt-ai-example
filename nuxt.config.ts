// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  colorMode: {
    preference: 'dark'
  },
  runtimeConfig: {
    azureResourceName: '',
    mcpUrl: 'http://localhost:3000/__mcp/sse',
  },
  mdc: {
    highlight: {
      // noApiRoute: true
      shikiEngine: 'javascript'
    },
    components: {
      prose: true,
      map: {
        a: 'ULink'
      }
    }
  },

  css: ['@/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxt/test-utils', '@nuxt/content', 'nuxt-mcp'],
  vite: {
    optimizeDeps: {
      include: ['debug']
    },

    $server: {
      build: {
        rollupOptions: {
          output: {
            preserveModules: true
          }
        }
      }
    }
  },
})
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,

  runtimeConfig: {
    public: {
      // Root API URL (your staging host)
      apiHost: 'https://fillcart.staging.hbm.studio',
    },
  },

  modules: ['@nuxtjs/tailwindcss'],
  devtools: {
    enabled: false // Set to false to disable
  },


  app: {
    head: {
      title: 'Nuxt E-commerce Shop',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
    },
  },
});

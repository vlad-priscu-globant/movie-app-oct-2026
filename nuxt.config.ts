import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-17',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils/module', '@nuxtjs/supabase'],

  supabase: {
    types: '~~/shared/types/database.types.ts',
    redirect: false,
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ro' },
      title: 'MovieApp',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  // Private (server-only) keys. Override them with NUXT_TMDB_API_TOKEN and
  // NUXT_TMDB_BASE_URL. Nothing here goes into `public`, so TMDB credentials
  // never reach the client bundle.
  runtimeConfig: {
    tmdb: {
      apiToken: '',
      baseUrl: 'https://api.themoviedb.org/3',
    },
  },

  // Posters go through the app's own image endpoint (/_ipx locally, Vercel
  // Image Optimization in production), so the browser never calls TMDB's CDN.
  image: {
    domains: ['image.tmdb.org'],
  },

  typescript: {
    strict: true,
  },
})

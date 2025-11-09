import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
      public: {
        API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL
      }

  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxt/image',  '@nuxt/icon'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
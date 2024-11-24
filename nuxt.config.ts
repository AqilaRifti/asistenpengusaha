// @ts-nocheck
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      publicSupabaseKey: process.env.PUBLIC_SUPABASE_KEY,
      supabaseURL: process.env.SUPABASE_URL,
      twelveDataAPIKey: process.env.TWELVEDATA_API_KEY,
    },
    privateRuntimeConfig: {
      privateSupabaseKey: process.env.PRIVATE_SUPABASE_KEY,
    },
  },
  modules: [
    "@vite-pwa/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-lucide-icons",
    "@nuxt/image",
  ],
  colorMode: {
    classSuffix: "",
  },
  pwa: {
    name: "Asisten Pelajar Indonesia",
    short_name: "API",
    start_url: "/?home=True",
    display: "fullscreen",
    orientation: "portrait",
    theme_color: "#fff",
    background_color: "#222",
    description: "Asisten pelajar untuk indonesia",
    icons: [
      {
        src: "pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
  ssr: false,
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  components: true,
});
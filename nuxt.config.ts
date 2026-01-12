import Tailwind from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  compatibilityDate: "2025-07-15",

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "nuxt-security",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/color-mode",
    "motion-v/nuxt",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "vue-sonner/nuxt",
    "nuxt-lucide-icons",
    "@unlok-co/nuxt-stripe",
    "nuxt-countdown",
    "nuxt-tiptap-editor",
  ],

  stripe: {
    // Server
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {
        // your api options override for stripe server side
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      },
      // CLIENT
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
      // manualClientLoad: true, // if you want to have control where you are going to load the client
      // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      options: {},
    },
  },

  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [Tailwind(), svgLoader()],
  },

  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },

  buildModules: ["@nuxtjs/svg"],

  postcss: {
    plugins: {
      cssnano: {
        preset: "default",
      },
    },
  },

  image: {
    quality: 80,
    format: ["webp"],
  },

  app: {
    head: {
      title: "Welcome",
      titleTemplate: "%s - Downtown Jazz Jam",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
    rootAttrs: {
      "data-vaul-drawer-wrapper": "",
    },
    // pageTransition: { name: "slide", mode: "out-in" },
    // layoutTransition: { name: "slide", mode: "out-in" },
  },

  runtimeConfig: {
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
      serviceKey: process.env.SUPABASE_SERVICE_KEY,
    },
    // Stripe keys: server-side secret in `runtimeConfig.stripe.secretKey`,
    // and client-side publishable key under `runtimeConfig.public`.
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
    public: {
      buildAt: new Date().toLocaleString("nb-US", {
        timeZone: "Europe/Helsinki",
      }),
      environment: "production",
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      stripePublishableKey: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy:
        process.env.NODE_ENV === "production"
          ? {
              "default-src": ["'self'"],

              "script-src": [
                "'self'",
                "https:",
                "'unsafe-inline'",
                "'unsafe-eval'",
                "https://js.stripe.com",
              ],

              "frame-src": [
                "'self'",
                "https://js.stripe.com",
                "https://hooks.stripe.com",
                "https://m.stripe.network",
                "https://q.stripe.com",
                "https://r.stripe.com",
              ],

              // Important fallback for some browsers
              "child-src": [
                "'self'",
                "https://js.stripe.com",
                "https://hooks.stripe.com",
                "https://m.stripe.network",
                "https://q.stripe.com",
                "https://r.stripe.com",
              ],

              "connect-src": [
                "'self'",
                "https://api.stripe.com",
                "https://q.stripe.com",
                "https://r.stripe.com",
                "https://m.stripe.network",
                "https://misyrpoxvyxwrnhnmeww.supabase.co",
              ],

              "img-src": ["'self'", "data:", "https:"],

              "style-src": ["'self'", "'unsafe-inline'", "https:"],
            }
          : false,
    },
  },

  supabase: {
    redirectOptions: {
      exclude: ["*"],
    },
  },

  typescript: {
    strict: true,
  },

  telemetry: false,

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  colorMode: {
    storageKey: "dtjj-v2-color-mode",
    classSuffix: "",
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 0,
    },

    mode: "svg",
    class: "shrink-0",
    fetchTimeout: 2000,
    serverBundle: "local",
  },

  svg: {
    vueSvgLoader: {
      // vue-svg-loader options
    },
    svgSpriteLoader: {
      // svg-sprite-loader options
    },
    fileLoader: {
      // file-loader options
    },
  },
});

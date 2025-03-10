// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  site: {
    url: 'https://www.craft233.top'
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@nuxtjs/sitemap",
    "v-wave/nuxt"
  ],

  pages: true,

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "",
  },

  typescript: {
    shim: false,
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv",
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true,
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
                { rel: "icon", type: "image/x-icon", href: "favicon.ico" }
      ],

      meta: [
        {
          name: "description",
          content: "Craft233，一个休闲养老摸鱼系的Minecraft小服务器，欢迎加入我们，同我们一起成长！",
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1",
        },
        {
          property: "og:locale",
          content: "zh_CN",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          content: "Craft233 ｜ 主页",
        },
        {
          property: "og:url",
          content: "https://www.craft233.top",
        },
        {
          property: "og:site_name",
          content: "Craft233 ｜ 主页",
        },
        {
          property: "og:image",
          content: "https://www.craft233.top/assets/img/index/town.png",
        },
        {
          property: "og:image:width",
          content: "1920",
        },
        {
          property: "og:width:height",
          content: "1080",
        },
        {
          property: "og:image:type",
          content: "image/png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "Craft233 ｜ 主页",
        },
        {
          property: "twitter:description",
          content: "Craft233，一个休闲养老摸鱼系的Minecraft小服务器，欢迎加入我们，同我们一起成长！",
        },
        {
          itemprop: "name",
          content: "Craft233 | 主页",
        },
        {
          itemprop: "description",
          content: "Craft233，一个休闲养老摸鱼系的Minecraft小服务器，欢迎加入我们，同我们一起成长！",
        },
        {
          itemprop: "image",
          content: "https://res.neokoni.ink/craft233/img/icon_main.png",
        },
        {
          itemprop: "description",
          content: "Craft233，一个休闲养老摸鱼系的Minecraft小服务器，欢迎加入我们，同我们一起成长！",
        },
      ],
      // script
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
        defer: true
      }, {
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
        defer: true
      }]
    }
  },

  build: {
    transpile: ["vue-sonner"]
  },

  compatibilityDate: "2024-08-06"
});

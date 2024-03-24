export default defineNuxtConfig({
    
    ssr: false,
    
    devtools: { enabled: false },

    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },
    
    css: [ 'bootstrap/dist/css/bootstrap.min.css', '@fortawesome/fontawesome-svg-core/styles.css', '~/assets/css/styles.css' ],
    
    modules: [ '@nuxtjs/i18n', '@pinia/nuxt', ],

    i18n: {
        lazy: false,
        legacy: false,
        langDir: 'locales',
        defaultLocale: 'en',
        detectBrowserLanguage: {            
            useCookie: true,
            redirectOn: 'root',
            fallbackLocale: 'en',
        },
        locales: [
            { code:'en', file:'en.json',  },
        ],
    },
})

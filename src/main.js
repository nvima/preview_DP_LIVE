import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
// import { routes } from './routes.js'
// import { createRouter, createWebHistory } from 'vue-router'
// import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { messages } from './translations.js'
import { createHead } from "@vueuse/head"

let lang = "en"
if (typeof (Storage) !== "undefined") {
    let lLang = localStorage.getItem("lang")
    if (lLang) lang = lLang;
}

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: lang,
    fallbackLocale: 'de',
    messages,
})

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
//     scrollBehavior(_to, _from, _savedPosition) {
//         return { top: 0 }
//     },
//
// })

// router.beforeEach((_, _) => {
//     window.scrollTo(0, 0)
// })


const app = createApp(App)
const head = createHead({
    htmlAttrs: { lang: lang || 'en' },
})
app.use(i18n)
app.use(head)
// app.use(createPinia())
// app.use(router)
app.mount('#app')

export { i18n }

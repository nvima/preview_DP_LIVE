<template>
    <div class="text-gray-900/80 font-sans font-medium flex-inline h-screen">
        <Cart />
        <Header />
        <div class="z-10 relative mx-8">
            <div class="max-w-lg block m-auto sm:mt-24 mt-14 p-4 w-full border-2 border-gray-800/80 rounded-2xl">
                <template v-if="shopStore.messageHasSent">
                    <div class="text-center py-8">
                        {{ $t('weContactYou') }}
                    </div>
                </template>
                <template v-else>
                    <div>
                        <div class="p-2 font-bold">
                            {{ $t('email') }}
                        </div>
                        <input type="text"
                            :class="shopStore.Email != '' && !validateEmail(shopStore.Email) ? 'border-red-500' : 'border-gray-800/80'"
                            v-model="shopStore.Email"
                            class="w-full border rounded-2xl focus:border-current focus:ring-0">
                    </div>
                    <div class="mt-2">
                        <div class="p-2 font-bold">
                            {{ $t('message') }}
                        </div>
                        <textarea v-model="shopStore.Message"
                            class="w-full border rounded-2xl resize-none border-gray-800/80 focus:border-current focus:ring-0"></textarea>
                    </div>
                    <div class="flex mt-4">
                        <button @click="shopStore.createMessage(shopStore.Email, shopStore.Message)"
                            :disabled="shopStore.Email == '' || shopStore.Message == '' || !validateEmail(shopStore.Email)"
                            class="bg-delivery2 text-white font-bold py-2 px-4 rounded-2xl ml-auto disabled:opacity-60">
                            {{ $t('send') }}
                        </button>
                    </div>
                </template>
            </div>
        </div>
        <div class="fixed bottom-0 w-full max-h-[60%]">
            <svg xmlns="http://www.w3.org/2000/svg" class="z-10" version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"
                preserveAspectRatio="none" viewBox="0 0 1440 560">
                <g fill="none">
                    <path class="fill-delivery"
                        d="M 0,207 C 72,176.8 216,60.8 360,56 C 504,51.2 576,178.4 720,183 C 864,187.6 936,68.8 1080,79 C 1224,89.2 1368,203 1440,234L1440 560L0 560z" />
                    <path class="fill-delivery2"
                        d="M 0,446 C 96,412.8 288,281.2 480,280 C 672,278.8 768,434.2 960,440 C 1152,445.8 1344,335.2 1440,309L1440 560L0 560z" />
                </g>
            </svg>
        </div>
        <div class="fixed bottom-3 w-full z-10">
            <div class="flex w-full justify-center gap-4 text-white font-bold">
                <router-link :to="shopStore.shop.Settings.ShopLanguage == 'de' ? '/impressum' : '/legal-notice'"
                    class="hover:underline shrink-0">
                    {{ $t('legalNotice') }}
                </router-link>
                <router-link :to="shopStore.shop.Settings.ShopLanguage == 'de' ? '/datenschutz' : '/privacy-policy'"
                    class="hover:underline shrink-0">
                    {{ $t('dataPolicy') }}
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import Cart from '@/components/Cart.vue';
import Header from '@/components/Header.vue';
import { validateEmail } from '@/helper.js'
import { useShopStore } from '@/stores/shop'
import { useHead } from '@unhead/vue';
const shopStore = useShopStore()
useHead({
    title: shopStore.shop.Homepage.MetaTitle,
    meta: [
        {
            name: 'description',
            content: shopStore.shop.Homepage.MetaDescription
        },
        {
            property: 'og:title',
            content: shopStore.shop.Homepage.MetaTitle
        },
        {
            property: 'og:description',
            content: shopStore.shop.Homepage.MetaDescription
        },
        {
            name: 'robots',
            content: 'noindex,nofollow'
        },
    ]
})
</script>

<template>
    <div class="text-gray-900/80 font-sans font-medium flex-inline min-h-screen w-full">
        <Cart />
        <Header />
        <div class="my-8 mx-8">
            <div class="relative inline mx-8 z-10">
                <div class="m-auto max-w-5xl">
                    <div class="text-4xl font-extrabold text-center">
        {{$t('tos').toUpperCase()}}
                    </div>
                    <div class="whitespace-pre-wrap text-left mt-8 relative">
        {{ shopStore.shop.Homepage.TOS }}
                    </div>
                    <div class="min-h-[40%] h-80">
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center gap-4 text-white font-bold z-20 my-auto inset-x-1/2 fixed bottom-3">
            <router-link :to="shopStore.shop.Settings.ShopLanguage == 'de' ? '/impressum' : '/legal-notice'"
                class="hover:underline shrink-0">
                {{ $t('legalNotice') }}
            </router-link>
            <router-link :to="shopStore.shop.Settings.ShopLanguage == 'de' ? '/datenschutz' : '/privacy-policy'"
                class="hover:underline shrink-0">
                {{ $t('dataPolicy') }}
            </router-link>
        </div>
        <div class="fixed bottom-0 w-full max-h-[60%]">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0 0 1440 560">
                <g fill="none">
                    <path class="fill-delivery"
                        d="M 0,207 C 72,176.8 216,60.8 360,56 C 504,51.2 576,178.4 720,183 C 864,187.6 936,68.8 1080,79 C 1224,89.2 1368,203 1440,234L1440 560L0 560z" />
                    <path class="fill-delivery2"
                        d="M 0,446 C 96,412.8 288,281.2 480,280 C 672,278.8 768,434.2 960,440 C 1152,445.8 1344,335.2 1440,309L1440 560L0 560z" />
                </g>
            </svg>
        </div>
        <div class="fixed bottom-0 w-full max-h-[60%] z-10">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="none" viewBox="0 0 1440 560">
                <g fill="none">
                    <path class="fill-delivery2"
                        d="M 0,446 C 96,412.8 288,281.2 480,280 C 672,278.8 768,434.2 960,440 C 1152,445.8 1344,335.2 1440,309L1440 560L0 560z" />
                </g>
            </svg>
        </div>
    </div>
</template>
<script setup>
import Cart from '@/components/Cart.vue';
import Header from '@/components/Header.vue';
import { useShopStore } from '@/stores/shop'
import { useHead } from '@unhead/vue';
import { i18n } from '@/main.js'
const shopStore = useShopStore()
useHead({
  title: i18n.global.t('tos') + " | " + shopStore.shop.Homepage.ShopName,
  meta: [
    {
      name: 'robots',
      content: 'noindex,nofollow'
    },
  ]
})
</script>

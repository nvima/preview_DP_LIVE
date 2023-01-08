<template>
    <div class="absolute top-5 right-5">
        <LanguageSwitch />
    </div>

    <div class="mx-auto px-12 py-16 sm:p-24 bg-gray-200 h-screen">
        <div class="relative rounded-lg block lg:flex items-center bg-gray-100 shadow-xl h-full">
            <div
                class="relative w-full lg:w-3/5 lg:h-full h-1/2 overflow-hidden rounded-t-lg lg:rounded-t-none lg:rounded-l-lg">
                <img class="absolute inset-0 w-full h-full object-cover object-center" :src="currentShop.bg" alt="">
                <div class="absolute inset-0 w-full h-full bg-black opacity-60"></div>
                <div
                    class="absolute uppercase inset-0 w-full h-full flex items-center justify-center text-white text-3xl lg:text-6xl font-extra font-extrabold px-6">
                    {{ currentShop.name }}

                </div>
            </div>
            <div class="w-full lg:w-2/5 h-1/2 flex items-center bg-gray-100 rounded-lg">
                <div class="p-12 lg:pr-24 lg:pl-16 lg:py-12">
                    <p class="text-gray-600">
                        <i18n-t :keypath="currentShop.desc" scope="global">
                            <template v-slot:name>
                                <span class="text-gray-900">{{ currentShop.name }}</span>
                            </template>
                        </i18n-t>
                    </p>
                    <a class="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                        :href="'https://' + currentShop.design + '-' + (i18nLocale.locale.value == 'de' ? 'de' : 'en') + '.delivery.plus'"
                        target="_blank">
                        <span>{{ $t('liveDemo') }}</span>
                        <span class="text-xs ml-1">&#x279c;</span>
                    </a>
                </div>
                <svg class="hidden lg:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
                    viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="50,0 100,0 50,100 0,100" />
                </svg>
            </div>
            <button @click="beforeShop()"
                class="absolute top-1/2 -translate-y-1/2 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline">
                <span class="block" style="transform: scale(-1);">&#x279c;</span>
            </button>
            <button @click="nextShop()"
                class="absolute top-1/2 -translate-y-1/2 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline">
                <span class="block" style="transform: scale(1);">&#x279c;</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import { useHead } from '@unhead/vue';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from "vue-i18n";
import LanguageSwitch from '@/components/LanguageSwitch.vue';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const lang = urlParams.get('lang')
console.log(lang);
const i18nLocale = useI18n();
const shopCollection = ref([
    { name: 'Pizza Italian', desc: 'design1Desc', bg: 'design1bg.jpg', index: 0, design: 'design1' },
    { name: 'Candy Town', desc: 'design2Desc', bg: 'design2bg.jpg', index: 1, design: 'design2' },
]);
const currentShop = ref(null)
function nextShop() {
    if (currentShop.value.index === shopCollection.value.length - 1) {
        currentShop.value = shopCollection.value[0]
    } else {
        currentShop.value = shopCollection.value[currentShop.value.index + 1]
    }

}
function beforeShop() {
    if (currentShop.value.index === 0) {
        currentShop.value = shopCollection.value[shopCollection.value.length - 1]
    } else {
        currentShop.value = shopCollection.value[currentShop.value.index - 1]
    }
}

onBeforeMount(() => {
    currentShop.value = shopCollection.value[0];
});
useHead({
    title: "Delivery+ Previews",

    meta: [
        {
            name: 'description',
            content: 'Delivery+ Demo Shop Previews'
        },
        {
            name: 'robots',
            content: 'noindex,nofollow'
        },
    ]
})
</script>

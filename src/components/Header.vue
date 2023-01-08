<template>
    <!-- Mobile Cart Button -->
    <div @click="shopStore.toggleOpen = !shopStore.toggleOpen"
        :class="shopStore.toggleOpen || shopStore.cart.length == 0 ? 'hidden' : 'fixed'"
        class="fixed sm:hidden bottom-5 right-5 bg-white border drop-shadow-2xl border-gray-300 rounded-full h-16 w-16 z-20 cursor-pointer">
        <div class="flex justify-center items-center h-full">
            <button class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 z-20" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span v-if="shopStore.cart.length > 0"
                    class="rounded-full flex justify-center w-6 bg-delivery2 font-bold top-3 left-4 absolute text-white">
                    {{ shopStore.cart.length }}
                </span>
            </button>
        </div>
    </div>
    <!-- Top Nav -->
    <div id="header" class="bg-white w-full z-20" :class="fixedHeader ? 'h-16 shadow-xl fixed' : 'h-32'">
        <div class="flex h-full justify-between max-w-5xl m-auto">
            <div class="mt-auto mb-3 sm:block hidden ml-4 max-w-[96px]">
                <span class="mx-1 text-xl">
                    {{ shopStore.shop.Homepage.ShopName }}
                </span>
                <span class="text-delivery text-2xl">
                    {{ shopStore.shop.Homepage.ShopDescription }}
                </span>
            </div>
            <div class="flex mx-auto font-semibold">
                <router-link to="/" exact-active-class="bg-delivery text-white" class="flex items-stretch">
                    <div class="self-end p-4">
                        {{ $t('home') }}
                    </div>
                </router-link>
                <router-link to="/shop" exact-active-class="bg-delivery text-white" class="flex items-stretch">
                    <div class="self-end p-4">
                        {{ $t('menu') }}
                    </div>
                </router-link>
                <router-link to="/contact" exact-active-class="bg-delivery text-white" class="flex items-stretch">
                    <div class="self-end p-4">
                        {{ $t('contact') }}
                    </div>
                </router-link>
            </div>
            <div class="mt-auto pb-2 sm:block hidden mr-6 w-24">
                <button class="relative ml-16" @click="shopStore.toggleOpen = !shopStore.toggleOpen">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 ml-auto cursor-pointer z-20" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span v-if="shopStore.cart.length > 0"
                        class="rounded-full flex justify-center w-6 bg-delivery2 font-bold top-3 left-4 absolute text-white">
                        {{ shopStore.cart.length }}
                    </span>
                </button>
            </div>
        </div>
    </div>
    <!-- Placeholder for fixed header -->
    <div class="bg-white w-full" :class="fixedHeader ? 'h-32' : 'hidden'">
    </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
const shopStore = useShopStore()
const fixedHeader = ref(false)

function handleScroll() {
    if (window.scrollY >= 64) {
        fixedHeader.value = true;
    } else {
        fixedHeader.value = false;
    }
}

onBeforeMount(() => {
    window.addEventListener('scroll', handleScroll);
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})
</script>

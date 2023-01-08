<template>
    <template v-if="shopStore.showModal">
        <Modal />
    </template>
    <div class="text-gray-900/80 font-sans font-medium">
        <Cart />
        <Header />
        <div class="sm:pt-12 pt-6">
            <OpenHours :key="shopStore.reRenderId" />
            <Categorys />
        </div>
    </div>
</template>
<script setup>
import OpenHours from '@/components/OpenHours.vue'
import Categorys from '@/components/Categorys.vue';
import Modal from '@/components/Modal.vue';
import Cart from '@/components/Cart.vue';
import Header from '@/components/Header.vue';
import { useShopStore } from '@/stores/shop'
import { useHead } from '@unhead/vue';
import { watchEffect, onMounted } from 'vue';
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
onMounted(() => {
    shopStore.getAddressFromLocalStorage()
    if (!shopStore.paypal && shopStore.shop.Settings.Paypal) {
        shopStore.loadPaypalScript()
    }
})
watchEffect(() => {
    if (shopStore.toggleOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

})
</script>

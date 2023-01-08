<template>
    <div class="mb-12">
        <div class="max-w-5xl m-auto mt-4" v-for="category in shopStore.getSortedCategorys(shopStore.shop.Categorys)"
            :key="category.Id">
            <div class="mx-4">
                <div v-if="category.Image != ''" class="w-full md:h-36 h-24 sm:h-44 bg-cover bg-no-repeat rounded-2xl"
                    :style='"background-image: url(" + shopStore.cdn + category.Image + ")"'>
                </div>
                <div class="my-3 px-2">
                    <p class="text-2xl font-extrabold">{{ category.Title }}</p>
                    <p class="">{{ category.Description }}</p>
                </div>
            </div>
            <Products :products="category.Products" />
        </div>
        <div class="max-w-5xl m-auto p-4 h-screen" v-if="shopStore.shop.Categorys.length == 0">
            <h2>
                {{ $t('emptyMenu') }}
            </h2>
        </div>

    </div>
</template>
<script setup>
import Products from '@/components/Products.vue'
import { useShopStore } from '@/stores/shop'
defineProps(['categorys'])
const shopStore = useShopStore()
</script>

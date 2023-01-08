<template>
    <template v-for="product in shopStore.getSortedProducts(products)">
        <div v-if="product.Aviability" class="border rounded-2xl mx-4 my-4">
            <div class="flex relative px-3 py-3 cursor-pointer min-h-[87.5px]"
                @click="shopStore.clickOnProductButton(product)">
                <div class="flex-1">
                    <div class="flex flex-wrap">
                        <div class="text-xl font-semibold">{{ product.Title }}</div>
                        <div v-if="product.ProductInfo != ''"
                            class="text-xs text-blue-700 px-1 cursor-pointer text-center"
                            @click.stop="shopStore.openModal($t('additive'), product.ProductInfo, 'max-w-sm w-10/12')">
                            {{ $t('productInfo') }}
                        </div>
                    </div>
                    <div class="text-sm min-h-[17.5px]">{{ product.Description }}</div>
                    <div class="pt-1 font-normal italic">{{ shopStore.getAmountWithCurrency(product.Price) }}</div>
                </div>
                <div :class="product.Image == '' ? 'hidden' : ''"
                    :style='product.Image == "" ? "" : "background-image: url(" + shopStore.cdn + product.Image + ")"'
                    class="items-center justify-center w-20 h-20 bg-no-repeat bg-contain bg-center mr-12 flex-none">
                </div>
                <button
                    class="absolute top-2 right-2 inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            <template v-if="shopStore.showIngredientsOfProduct == product.Id">
                <Ingredients :product="product" />
            </template>
        </div>
    </template>
</template>
<script setup>
import Ingredients from '@/components/ingredients/Ingredients.vue'
import { useShopStore } from '@/stores/shop'
defineProps(['products'])
const shopStore = useShopStore()
</script>

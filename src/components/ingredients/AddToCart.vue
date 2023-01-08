<template>
    <div class="inline-flex items-center justify-center w-full pt-2">
        <div class="inline-flex items-center justify-center border rounded-2xl bg-white">
            <button class="inline-flex items-center justify-center w-10 h-10"
                @click="shopStore.selectedIngredientsOfProduct[product.Id].Counter--"
                :disabled="shopStore.selectedIngredientsOfProduct[product.Id].Counter < 2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>
            </button>
            <input class="inline-flex items-center justify-center w-12 h-10 border-none text-center	"
                v-model="shopStore.selectedIngredientsOfProduct[product.Id].Counter" disabled>
            <button class="inline-flex items-center justify-center w-10 h-10"
                @click="shopStore.selectedIngredientsOfProduct[product.Id].Counter++">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
        <button @click="shopStore.addToCart(shopStore.selectedIngredientsOfProduct[product.Id])"
            class="p-2 inline w-full ml-6 bg-delivery2 text-white font-bold rounded-2xl">
            {{
        shopStore.getAmountWithCurrency(shopStore.getTotalAmountOfProduct(shopStore.selectedIngredientsOfProduct[product.Id]))
            }}
        </button>
    </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
defineProps(['product'])
const shopStore = useShopStore()
</script>

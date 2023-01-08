<template>
    <div class="px-6 py-6 bg-gray-100 rounded-b-2xl">
        <!-- Ingredients - Multi -->
        <template v-if="Object.keys(product.Ingredients).length > 0">
            <div class="pb-1">{{ $t('ingredients') + ':' }}</div>
            <!-- Ingredients - Max 3 -->
            <div v-for="ingredient in shopStore.getSortedIngredients(product.Ingredients).slice(0, 3)"
                class="p-1 text-sm">
                <input :id="'input_' + ingredient[0] + '_' + product.Id" type="checkbox"
                    class="focus:ring-transparent text-delivery2 rounded"
                    :checked="ingredient[0] in shopStore.selectedIngredientsOfProduct[product.Id].Ingredients"
                    @change="shopStore.selectIngredient($event, product, ingredient)">
                <label class="align-middle p-1" :for="'input_' + ingredient[0] + '_' + product.Id">
                    {{ ingredient[1].Title }}
                    <span class="" v-if="ingredient[1].Price > 0">
                        (+{{ shopStore.getAmountWithCurrency(ingredient[1].Price) }})
                    </span>
                </label>
            </div>
            <!-- Ingredients - restlichen -->
            <div v-if="shopStore.showMoreIngredientsOfProduct.includes(product.Id)">
                <div v-for="ingredient in shopStore.getSortedIngredients(product.Ingredients).slice(3)"
                    class="p-1 text-sm">
                    <input :id="'input_' + ingredient[0] + '_' + product.Id" type="checkbox"
                        class="focus:ring-transparent text-delivery2 rounded"
                        :checked="ingredient[0] in shopStore.selectedIngredientsOfProduct[product.Id].Ingredients"
                        @change="shopStore.selectIngredient($event, product, ingredient)">
                    <label class="align-middle p-1" :for="'input_' + ingredient[0] + '_' + product.Id">
                        {{ ingredient[1].Title }}
                        <span class="" v-if="ingredient[1].Price > 0">
                            (+{{ shopStore.getAmountWithCurrency(ingredient[1].Price) }})
                        </span>
                    </label>
                </div>
            </div>
            <div v-if="Object.keys(product.Ingredients).length > 3" @click="shopStore.showMoreIngredientsOfProduct.includes(product.Id) ?
            shopStore.showMoreIngredientsOfProduct = shopStore.showMoreIngredientsOfProduct.filter(i => i !== product.Id) :
            shopStore.showMoreIngredientsOfProduct.push(product.Id)" class="text-blue-700 cursor-pointer mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" viewBox="0 0 24 24" stroke="currentColor"
                    :class="shopStore.showMoreIngredientsOfProduct.includes(product.Id) ? 'rotate-180' : ''"
                    fill="none">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span class="text-sm px-1">
                    {{ shopStore.showMoreIngredientsOfProduct.includes(product.Id) ? $t('showLess') : $t('showMore')
                    }}
                </span>
            </div>
        </template>
        <!-- Ingredients - Simple -->
        <template v-if="Object.keys(product.SimpleIngredients).length > 0">
            <SimpleIngredients :product="product" ingredients="SimpleIngredients" />
        </template>
        <!-- Ingredients - Simple_2s -->
        <template v-if="Object.keys(product.SimpleIngredient2s).length > 0">
            <SimpleIngredients :product="product" ingredients="SimpleIngredient2s" />
        </template>
        <!-- Ingredients - Simple_3s -->
        <template v-if="Object.keys(product.SimpleIngredient3s).length > 0">
            <SimpleIngredients :product="product" ingredients="SimpleIngredient3s" />
        </template>
        <!-- Add To Cart + Counter -->
        <AddToCart :product="product" />
    </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
import { onBeforeMount } from 'vue';
import SimpleIngredients from '@/components/ingredients/SimpleIngredients.vue';
import AddToCart from '@/components/ingredients/AddToCart.vue';
const props = defineProps({
    product: Object,
})

const shopStore = useShopStore()

onBeforeMount(() => {
    if (!(props.product.Id in shopStore.selectedIngredientsOfProduct)) {
        shopStore.selectedIngredientsOfProduct[props.product.Id] = {
            Id: props.product.Id,
            Title: props.product.Title,
            Description: props.product.Description,
            Price: props.product.Price,
            Tax: props.product.Tax,
            Ingredients: {},
            SimpleIngredients: {},
            SimpleIngredient2s: {},
            SimpleIngredient3s: {},
            Counter: 1,
        }
    }
})
</script>

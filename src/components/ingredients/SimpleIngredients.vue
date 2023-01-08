<template>
    <div class="pb-4">
        <div class="pb-1">{{ $t('accompaniment') + ':' }}</div>
        <select class="w-full focus:ring-transparent focus:border-current"
            @change="onChangeSimpleIngredients">
            <option v-if="simpleIngredients[0][1].Price > 0" value="0">
                <div class="inline">{{ $t('noAccompaniment') }}</div>
            </option>
            <option v-for="simpleIngredient in simpleIngredients" :value="simpleIngredient[0]">
                {{ simpleIngredient[1].Title }}
                <template v-if="simpleIngredient[1].Price > 0">
                    (+{{ shopStore.getAmountWithCurrency(simpleIngredient[1].Price) }})
                </template>
            </option>
        </select>
    </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
import { onBeforeMount, ref } from 'vue';
const props = defineProps({
    product: Object,
    ingredients: String
})
const shopStore = useShopStore()
const simpleIngredients = ref([])

onBeforeMount(() => {
    simpleIngredients.value = shopStore.getSortedIngredients(props.product[props.ingredients])
    if (Object.keys(shopStore.selectedIngredientsOfProduct[props.product.Id][props.ingredients]).length == 0) {
        if (simpleIngredients.value[0][1].Price == 0) {
            shopStore.selectedIngredientsOfProduct[props.product.Id][props.ingredients][simpleIngredients.value[0][0]] = simpleIngredients.value[0][1]
        }
    }
})

function onChangeSimpleIngredients(event) {
    if (event.target.value == "0") {
        shopStore.selectedIngredientsOfProduct[props.product.Id][props.ingredients] = {}
    } else {
        shopStore.selectedIngredientsOfProduct[props.product.Id][props.ingredients] = {}
        shopStore.selectedIngredientsOfProduct[props.product.Id][props.ingredients][event.target.value] = props.product[props.ingredients][event.target.value]
    }
}
</script>

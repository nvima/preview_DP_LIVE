<template>
  <div class="relative z-0 mt-4">
    <input type="text" v-model="shopStore.order[input]" id="floating_standard" class="block py-2.5 px-1 w-full text-gray-900 bg-transparent border-0 
      border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-delivery2 peer" placeholder=" "
      :class="required && shopStore.orderCheckbox && shopStore.order[input] == '' ? 'border-red-500':'border-gray-300'"/>
    <label for="floating_standard" class="px-1 absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
      peer-focus:left-0 peer-focus:text-delivery2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
      peer-focus:-translate-y-6">
      {{ label }}
    </label>
  </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
defineProps(['input', 'label', 'required'])
const shopStore = useShopStore()
</script>

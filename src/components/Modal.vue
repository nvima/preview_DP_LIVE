<template>
  <div class="fixed inset-0 z-40 bg-gray-700 bg-opacity-25"></div>
  <div
    class="fixed top-1/2 left-1/2 z-50 bg-white p-4 rounded overflow-auto -translate-y-1/2 -translate-x-1/2"
    :class='shopStore.modalClass'>
    <p class="text-sm font-bold">{{ shopStore.modalTitle }}</p>
    <div class="text-sm whitespace-pre-line">
      {{ shopStore.modalText }}
    </div>
    <svg @click="shopStore.showModal = false" class="absolute top-0 right-0 cursor-pointer h-6 w-6 m-2"
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
import { onMounted, onUnmounted } from 'vue';
const shopStore = useShopStore()

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  if(!shopStore.showMobileCart)
    document.body.style.overflow = 'auto'
})
</script>

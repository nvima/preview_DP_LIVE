<template>
    <div class="h-16 text-xl relative">
        <p class="text-center bold pt-4">{{ $t('paypal') }}</p>
        <button @click="shopStore.showAddressView = 'address'; shopStore.orderCheckbox = false"
            class="absolute cursor-pointer right-2 top-2 w-10 h-10 rounded-full bg-gray-100 inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </button>
    </div>
    <div class="px-4">
        <div id='paypal-button'></div>
    </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
import { onMounted } from 'vue';
const shopStore = useShopStore()
onMounted(async () => {
    try {
        await shopStore.paypal.Buttons({
            createOrder: function (_, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: shopStore.getTotalAmountOfCart
                        }
                    }]
                });
            },
            onApprove: function (_, actions) {
                return actions.order.capture().then(function (details) {
                    shopStore.createOrder(details.id)
                });
            },
            onCancel: function (_) {
                shopStore.orderCheckbox = false
                shopStore.showAddressView = 'address'
            },
            onError: function (err) {
                console.log('onError')
                console.log(err)
                shopStore.showAddressView = 'paymentError'
            }
        }).render("#paypal-button");
    } catch (error) {
        shopStore.showAddressView = 'paymentError'
        console.error("failed to render the PayPal Buttons", error);
    }
}) 
</script>

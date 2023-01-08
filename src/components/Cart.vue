<template>
    <div id="slideover-container" :class="shopStore.toggleOpen ? '' : 'invisible'"
        class="w-full h-full fixed inset-0 z-20 overflow-hidden">
        <div id="slideover-bg" @click="shopStore.toggleOpen = false"
            :class="shopStore.toggleOpen ? 'opacity-50' : 'opacity-0'"
            class="w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900"></div>
        <div id="slideover" :class="shopStore.toggleOpen ? '' : 'translate-x-full'"
            class="max-w-sm w-full bg-white h-full min-h-screen absolute right-0 duration-300 ease-out transition-all overflow-auto">
            <div class="min-h-screen" :key="shopStore.reRenderId">
                <div class="relative w-full bg-white top-0 z-30 overflow-auto pb-14">
                    <template v-if="shopStore.showAddressView == 'paymentError'">
                        <div class="h-16 text-xl relative">
                            <p class="text-center bold pt-4">{{ $t('incorrectPayment') }}</p>
                            <button @click="shopStore.showAddressView = 'cart'"
                                class="absolute cursor-pointer right-2 top-2 w-10 h-10 rounded-full bg-gray-100 inline-flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-4 text-center">{{ $t('incorrectPaymentText') }}</div>
                    </template>
                    <template v-else-if="shopStore.showAddressView == 'successPayment'">
                        <div class="h-16 text-xl relative">
                            <p class="text-center bold pt-4">{{ $t('successfulPayment') }}</p>
                            <button @click="shopStore.showAddressView = 'cart';"
                                class="absolute cursor-pointer right-2 top-2 w-10 h-10 rounded-full bg-gray-100 inline-flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-4 text-center">{{ $t('successfulPaymentText') }}</div>
                    </template>
                    <template v-else-if="shopStore.showAddressView == 'paypalCheckout'">
                        <PaypalCheckout />
                    </template>
                    <template v-else-if="shopStore.showAddressView == 'cart' || shopStore.isShopOpen() == false">
                        <button
                            class="absolute cursor-pointer right-2 top-2 w-10 h-10 rounded-full bg-gray-100 inline-flex items-center justify-center">
                            <svg @click="shopStore.reRender(); shopStore.toggleOpen = !shopStore.toggleOpen"
                                xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="p-2" v-if="shopStore.cart.length > 0">
                            <div class="self-center flex flex-col justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 block self-center" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <template v-for="(cartEntry, key) in shopStore.cart" :key="key">
                                <div class="flex mt-4">
                                    <div class="flex-none w-8 pt-2 text-sm">{{ cartEntry.Counter }}x </div>
                                    <div class="flex-1 max-w-full px-2 pt-2 text-sm">{{ cartEntry.Title }}</div>
                                    <div class="flex-none w-24 pt-2 text-sm text-right">
                                        {{
                                                shopStore.getAmountWithCurrency(shopStore.getTotalAmountOfProduct(cartEntry))
                                        }}
                                        <!--Delete Icon -->
                                        <svg v-on:click="shopStore.cart.splice(key, 1)"
                                            class="h-6 w-6 inline text-delivery2 cursor-pointer" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                                <div v-if="!shopStore.isIngredientsEmpty(cartEntry)" class="flex pb-2">
                                    <div class="flex-none w-8 px-2 text-sm"></div>
                                    <div class="px-2 text-sm italic pr-6">{{ shopStore.getIngredientsList(cartEntry) }}
                                    </div>
                                </div>
                            </template>
                            <div class="flex font-bold p-2 mt-4 border-t">
                                <div class="flex-none text-sm">{{ $t('total') }} </div>
                                <div class="flex-1 text-sm text-right pr-4">{{
                                        shopStore.getAmountWithCurrency(shopStore.getTotalAmountOfCart)
                                }}</div>
                            </div>
                            <template v-if="shopStore.getTotalAmountOfCart < shopStore.shop.Settings.MinimumOrderValue">
                                <div class="flex font-bold text-sm p-2 text-red-500">
                                    <div class="flex-none">{{ $t('missingAmount') }} </div>
                                    <div class="flex-1 text-right pr-4">
                                        {{
                                                shopStore.getAmountWithCurrency(shopStore.shop.Settings.MinimumOrderValue -
                                                    shopStore.getTotalAmountOfCart)
                                        }}
                                    </div>
                                </div>
                                <div class="text-sm font-bold text-center m-2 p-4 border-t">
                                    {{ $t('youHaveNotMinimumOrderValue', {
                                            amount:
                                                shopStore.getAmountWithCurrency(shopStore.shop.Settings.MinimumOrderValue)
                                        })
                                    }}
                                </div>
                            </template>
                            <template v-if="!shopStore.isShopOpen()">
                                <div class="text-sm text-center font-bold text-red-500 mx-2 p-4 border-t">
                                    {{ $t('weAreClosed') }}
                                </div>
                            </template>
                        </div>
                        <div v-else-if="shopStore.cart.length == 0" class="flex flex-col justify-center">
                            <div class="p-2 block self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 block self-center" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <div class="text-center mt-4">
                                {{ $t('plsChooseSomethingFromMenu') }}
                            </div>
                        </div>
                    </template>
                    <template v-else-if="shopStore.showAddressView == 'address'">
                        <div class="h-12 text-xl relative">
                            <p class="text-center bold pt-4">{{ $t('checkout') }}</p>
                            <button @click="shopStore.showAddressView = 'cart'"
                                class="absolute cursor-pointer right-2 top-2 w-10 h-10 rounded-full bg-gray-100 inline-flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-4">
                            <label :for="'toggle_saveAdress'" class="inline-flex relative">
                                <input type="checkbox" :id="'toggle_saveAdress'" v-model="shopStore.saveAddress"
                                    class="sr-only peer"
                                    @change="shopStore.saveAdressLocalStorage(shopStore.saveAddress)">
                                <div class="mr-4 min-w-[2.75rem] w-11 h-6 bg-gray-200 after:h-5 after:w-5 rounded-full 
                                    peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px]
                                    after:bg-white after:border-gray-300 after:border after:rounded-full
                                    after:transition-all peer-checked:bg-delivery2">
                                </div>
                                {{ $t('saveAddress') }}
                            </label>
                            <div class="mt-3">
                                <template v-if="shopStore.shop.Settings.Delivery">
                                    <input type="radio" v-model="shopStore.order.DeliveryType"
                                        class="focus:ring-transparent mr-2 text-delivery2"
                                        :class="shopStore.orderCheckbox && shopStore.order.DeliveryType == '' ? 'border-red-500' : ''"
                                        id="delivery_InputRadio" name="offer_pickup" value="delivery">
                                    <label class="mr-4" for="delivery_InputRadio">
                                        {{ $t('delivery') }}
                                    </label>
                                </template>
                                <template v-if="shopStore.shop.Settings.PickUp">
                                    <input type="radio" v-model="shopStore.order.DeliveryType"
                                        class="focus:ring-transparent text-delivery2"
                                        :class="shopStore.orderCheckbox && shopStore.order.DeliveryType == '' ? 'border-red-500' : ''"
                                        id="pickUp_InputRadio" name="offer_pickup" value="pickUp">
                                    <label class="p-1" for="pickUp_InputRadio">
                                        {{ $t('pickUp') }}
                                    </label>
                                </template>
                            </div>
                            <select v-model="shopStore.order.PaymentType"
                                class="w-full my-2 cursor-pointer focus:cursor-pointer focus:ring-transparent focus:border-gray-300"
                                :class="shopStore.orderCheckbox && shopStore.order.PaymentType == '' ? 'border-red-500' : 'border-gray-300'">
                                <option value="">{{ $t('choosePaymentMethod') }}</option>
                                <option v-if="shopStore.shop.Settings.CashPayment" value="cashPayment">{{
                                        $t('cashPayment')
                                }}</option>
                                <option v-if="shopStore.shop.Settings.Paypal && shopStore.paypal" value="paypal">{{
                                        $t('paypal')
                                }}
                                </option>
                            </select>
                            <FloatingInput :label="$t('name') + '*'" input="FullName" :required="true" />
                            <FloatingInput :label="$t('street') + '*'" input="Street" :required="true" />
                            <FloatingInput :label="$t('postalCode') + '*'" input="PostalCode" :required="true" />
                            <template v-if="!shopStore.isPostalCodeInDeliveryArea && shopStore.order.PostalCode != ''">
                                <div class="text-red-500 pl-2 font-bold">
                                    &bull; {{ $t('postalCodeNotInDeliveryArea') }}
                                    <p @click="shopStore.openModal($t('deliveryAreas'),
                                    shopStore.getDeliveryAreasTextFormatted($t('weDeliverInThisArea'), $t('postalCode'), $t('minimumOrderValue')), 'max-w-sm w-10/12')"
                                        class="inline font-extrabold cursor-pointer text-base text-blue-700">?</p>
                                </div>
                            </template>
                            <template v-else-if="shopStore.isPostalCodeInDeliveryArea && shopStore.getMinimumOrderValueOfPostalCode > shopStore.getTotalAmountOfCart &&
                            shopStore.order.PostalCode != ''">
                                <div class="text-red-500 pl-2 font-bold">
                                    &bull; {{ $t('minimumOrderValueForThisPostalCode', {
                                            amount:
                                                shopStore.getAmountWithCurrency(shopStore.getMinimumOrderValueOfPostalCode)
                                        })
                                    }}
                                    <p @click="shopStore.openModal($t('deliveryAreas'),
                                    shopStore.getDeliveryAreasTextFormatted($t('weDeliverInThisArea'), $t('postalCode'), $t('minimumOrderValue')), 'max-w-sm w-10/12')"
                                        class="inline font-extrabold cursor-pointer text-base text-blue-700">?</p>
                                </div>
                            </template>
                            <FloatingInput :label="$t('city') + '*'" input="City" :required="true" />
                            <FloatingInput :label="$t('email') + '*'" input="Email" :required="true" />
                            <template v-if="!validateEmail(shopStore.order.Email) && shopStore.order.Email != ''">
                                <div class="text-red-500  pl-2 font-bold">
                                    &bull; {{ $t('pleaseEnterValidEmail') }}
                                </div>
                            </template>
                            <FloatingInput :label="$t('phone') + '*'" input="Phone" :required="true" />
                            <FloatingInput :label="$t('notes')" input="Notes" :required="false" />
                            <div class="m-2 text-sm cursor-default">
                                <input class="focus:ring-transparent mr-2 text-delivery2" type="checkbox"
                                    id="agb_Checkbox" v-model="shopStore.orderCheckbox">
                                <label for="agb_Checkbox">
                                    <i18n-t keypath="term" scope="global">
                                        <template v-slot:amount>
                                            <p class="inline font-bold">
                                                {{ shopStore.getAmountWithCurrency(shopStore.getTotalAmountOfCart) }}
                                            </p>
                                        </template>
                                        <template v-slot:dataPolicy>
                                            <button
                                                @click="shopStore.openModal($t('dataPolicy'), shopStore.shop.Homepage.DataPolicy, 'h-5/6 w-10/12')"
                                                class="text-blue-700 hover:text-blue-600 cursor-pointer inline underline">
                                                {{ $t('dataPolicy') }}
                                            </button>
                                        </template>
                                        <template v-slot:tos>
                                            <button
                                                @click="shopStore.openModal($t('tos'), shopStore.shop.Homepage.TOS, 'h-5/6 w-10/12')"
                                                class="text-blue-700 hover:text-blue-600 cursor-pointer inline underline">
                                                {{ $t('tos') }}
                                            </button>
                                        </template>
                                    </i18n-t>
                                </label>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-if="(shopStore.cart.length > 0 && shopStore.showAddressView == 'cart') && shopStore.isShopOpen()"
                    class="fixed w-full max-w-sm bottom-0 p-2 z-30 bg-white h-14 border-t-2 mt-14">
                    <button class="p-2 text-center w-full disabled:bg-gray-400 bg-delivery2 rounded-2xl"
                        @click="shopStore.reRender(); shopStore.showAddressView = 'address'; shopStore.orderCheckbox = false"
                        :disabled="shopStore.getTotalAmountOfCart < shopStore.shop.Settings.MinimumOrderValue || !shopStore.isShopOpen()">
                        <div class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 relative text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span class="text-white font-bold tracking-wider">
                            {{ $t('checkout') }}
                        </span>
                    </button>
                </div>
                <div v-else-if="shopStore.showAddressView == 'address' && shopStore.isShopOpen()"
                    class="fixed w-full max-w-sm bottom-0 p-2 z-30 bg-white h-14 border-t-2 mt-14">
                    <button class="p-2 text-center w-full disabled:bg-gray-400 bg-delivery2 rounded-2xl"
                        @click="shopStore.reRender() && shopStore.isShopOpen() && shopStore.checkPaymentMethod() && shopStore.saveAdressLocalStorage(shopStore.saveAddress)"
                        :disabled="!shopStore.isOrderValid || !shopStore.isShopOpen()">
                        <span class="text-white">{{ $t('finalCheckout') }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import FloatingInput from '@/components/FloatingInput.vue';
import PaypalCheckout from '@/components/PaypalCheckout.vue';
import { useShopStore } from '@/stores/shop'
import { validateEmail } from '@/helper.js'
const shopStore = useShopStore()
</script>

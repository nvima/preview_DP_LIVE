<template>
    <div v-if="!shopStore.isShopOpen()" class="max-w-5xl m-auto">
        <div class="mx-4">
            <!-- <div class="w-full md:h-36 h-24 sm:h-44 bg-cover bg-no-repeat rounded-2xl" -->
            <!--     :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.CautionImage == "" ? "images/caution.jpg" : shopStore.shop.Homepage.CautionImage) + ")"'> -->
            <!-- </div> -->
            <div class="px-2 my-3">
                <p class="text-2xl font-extrabold">{{ $t('closed') }}</p>
                <p class="text-sm"></p>
                <p class="">{{ $t('outsideOfOpenHours') }}</p>
            </div>
        </div>
        <div class="border rounded-2xl mx-4 p-3">
            <div class="flex space-x">
                <p class="flex-initial w-36">
                    {{ $t('monday') + ':' }}
                </p>
                <p class="flex-initial w-44 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Monday,
                            shopStore.shop.OpenHours.MondayOpen,
                            shopStore.shop.OpenHours.MondayClose, shopStore.shop.OpenHours.MondayPause,
                            shopStore.shop.OpenHours.MondayPauseStart,
                            shopStore.shop.OpenHours.MondayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex space-x pt-1">
                <p class="flex-initial w-36">
                    {{ $t('tuesday') + ':' }}
                </p>
                <p class="flex-initial w-44 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Tuesday,
                            shopStore.shop.OpenHours.TuesdayOpen,
                            shopStore.shop.OpenHours.TuesdayClose, shopStore.shop.OpenHours.TuesdayPause,
                            shopStore.shop.OpenHours.TuesdayPauseStart,
                            shopStore.shop.OpenHours.TuesdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex space-x pt-1">
                <p class="flex-initial w-36">
                    {{ $t('wednesday') + ':' }}
                </p>
                <p class="flex-initial w-44 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Wednesday,
                            shopStore.shop.OpenHours.WednesdayOpen,
                            shopStore.shop.OpenHours.WednesdayClose, shopStore.shop.OpenHours.WednesdayPause,
                            shopStore.shop.OpenHours.WednesdayPauseStart,
                            shopStore.shop.OpenHours.WednesdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex space-x pt-1">
                <p class="flex-initial w-36">
                    {{ $t('thursday') + ':' }}
                </p>
                <p class="flex-initial w-44 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Thursday,
                            shopStore.shop.OpenHours.ThursdayOpen,
                            shopStore.shop.OpenHours.ThursdayClose, shopStore.shop.OpenHours.ThursdayPause,
                            shopStore.shop.OpenHours.ThursdayPauseStart,
                            shopStore.shop.OpenHours.ThursdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex space-x pt-1">
                <p class="flex-initial w-36">
                    {{ $t('friday') + ':' }}
                </p>
                <p class="flex-initial w-44 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Friday,
                            shopStore.shop.OpenHours.FridayOpen,
                            shopStore.shop.OpenHours.FridayClose, shopStore.shop.OpenHours.FridayPause,
                            shopStore.shop.OpenHours.FridayPauseStart,
                            shopStore.shop.OpenHours.FridayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex space-x pt-1">
                <p class="flex-initial w-36">
                    {{ $t('saturday') + ':' }}
                </p>
                <p class="flex-initial w-44 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Saturday,
                            shopStore.shop.OpenHours.SaturdayOpen,
                            shopStore.shop.OpenHours.SaturdayClose, shopStore.shop.OpenHours.SaturdayPause,
                            shopStore.shop.OpenHours.SaturdayPauseStart,
                            shopStore.shop.OpenHours.SaturdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex space-x pt-1">
                <p class="flex-initial w-36">
                    {{ $t('sunday') + ':' }}
                </p>
                <p class="flex-initial w-44 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Sunday,
                            shopStore.shop.OpenHours.SundayOpen,
                            shopStore.shop.OpenHours.SundayClose, shopStore.shop.OpenHours.SundayPause,
                            shopStore.shop.OpenHours.SundayPauseStart,
                            shopStore.shop.OpenHours.SundayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <p v-if="shopStore.isShopInHoliday()" class="font-semibold text-red-500">{{
                    shopStore.shop.Homepage.CautionText
            }}</p>
        </div>
    </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
const shopStore = useShopStore()
</script>

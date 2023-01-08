<template>
    <div class="h-auto text-center">
        <div class="text-4xl sm:text-5xl tracking-wider py-12 underline decoration-[5px] underline-offset-8 decoration-delivery">
            {{ $t('openHours') }}
        </div>
        <div class="pb-12 text-left p-2 sm:text-2xl text-xl font-thin">
            <div class="flex justify-center space-x sm:space-x-16 py-1">
                <p class="flex-none w-32">
                    {{ $t('monday') + ':' }}
                </p>
                <div class="flex-none w-40 text-center whitespace-pre-wrap">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Monday,
                            shopStore.shop.OpenHours.MondayOpen,
                            shopStore.shop.OpenHours.MondayClose, shopStore.shop.OpenHours.MondayPause,
                            shopStore.shop.OpenHours.MondayPauseStart,
                            shopStore.shop.OpenHours.MondayPauseEnd) || $t('closed')
                }}</div>
            </div>
            <div class="flex justify-center space-x sm:space-x-16 py-1">
                <p class="flex-none w-32">
                    {{ $t('tuesday') + ':' }}
                </p>
                <p class="flex-none w-40 whitespace-pre-wrap text-center">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Tuesday,
                            shopStore.shop.OpenHours.TuesdayOpen,
                            shopStore.shop.OpenHours.TuesdayClose, shopStore.shop.OpenHours.TuesdayPause,
                            shopStore.shop.OpenHours.TuesdayPauseStart,
                            shopStore.shop.OpenHours.TuesdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex justify-center space-x sm:space-x-16 py-1">
                <p class="flex-none w-32">
                    {{ $t('wednesday') + ':' }}
                </p>
                <p class="flex-none w-40 whitespace-pre-wrap text-center">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Wednesday,
                            shopStore.shop.OpenHours.WednesdayOpen,
                            shopStore.shop.OpenHours.WednesdayClose, shopStore.shop.OpenHours.WednesdayPause,
                            shopStore.shop.OpenHours.WednesdayPauseStart,
                            shopStore.shop.OpenHours.WednesdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex justify-center space-x sm:space-x-16 py-1">
                <p class="flex-none w-32">
                    {{ $t('thursday') + ':' }}
                </p>
                <p class="flex-none w-40 whitespace-pre-wrap text-center">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Thursday,
                            shopStore.shop.OpenHours.ThursdayOpen,
                            shopStore.shop.OpenHours.ThursdayClose, shopStore.shop.OpenHours.ThursdayPause,
                            shopStore.shop.OpenHours.ThursdayPauseStart,
                            shopStore.shop.OpenHours.ThursdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex justify-center space-x sm:space-x-16 py-1">
                <p class="flex-none w-32">
                    {{ $t('friday') + ':' }}
                </p>
                <p class="flex-none w-40 whitespace-pre-wrap text-center">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Friday,
                            shopStore.shop.OpenHours.FridayOpen,
                            shopStore.shop.OpenHours.FridayClose, shopStore.shop.OpenHours.FridayPause,
                            shopStore.shop.OpenHours.FridayPauseStart,
                            shopStore.shop.OpenHours.FridayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex justify-center space-x sm:space-x-16 py-1">
                <p class="flex-none w-32">
                    {{ $t('saturday') + ':' }}
                </p>
                <p class="flex-none w-40 whitespace-pre-wrap text-center">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Saturday,
                            shopStore.shop.OpenHours.SaturdayOpen,
                            shopStore.shop.OpenHours.SaturdayClose, shopStore.shop.OpenHours.SaturdayPause,
                            shopStore.shop.OpenHours.SaturdayPauseStart,
                            shopStore.shop.OpenHours.SaturdayPauseEnd) || $t('closed')
                }}</p>
            </div>
            <div class="flex justify-center space-x sm:space-x-16 py-1">
                <p class="flex-none w-32">
                    {{ $t('sunday') + ':' }}
                </p>
                <p class="flex-none w-40 whitespace-pre-wrap text-center">{{
                        shopStore.getOpenHoursTime(shopStore.shop.OpenHours.Sunday,
                            shopStore.shop.OpenHours.SundayOpen,
                            shopStore.shop.OpenHours.SundayClose, shopStore.shop.OpenHours.SundayPause,
                            shopStore.shop.OpenHours.SundayPauseStart,
                            shopStore.shop.OpenHours.SundayPauseEnd) || $t('closed')
                }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useShopStore } from '@/stores/shop'
const shopStore = useShopStore()
</script>

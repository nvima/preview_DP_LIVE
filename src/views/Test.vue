<template>
    <div id="homeview" class="cursor-default">
        <!-- Landing Section -->
        <div v-if="shopStore.shop"
            class="mobile:overflow-x-hidden relative bg-cover bg-center bg-no-repeat h-screen bg-black bg-opacity-60"
            :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.ShopImage == "" ?
            "images/bg.jpg" : shopStore.shop.Homepage.ShopImage) + ")"'>
            <div class="absolute h-full w-full bg-black bg-opacity-60"></div>
            <header class="absolute top-0 left-0 desktop:h-40 w-full desktop:text-center">
                <!-- MOBIL NAV -->
                <nav class="desktop:hidden" role="navigation">
                    <div id="mobilMenu" class="absolute top-8 right-2 z-10">
                        <input type="checkbox" class="block w-10 h-6 absolute top-0 left-0 opacity-0 z-20" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul class="flex flex-col text-white text-right absolute right-1 h-auto pt-4" id="menu">
                            <router-link to="/shop">
                                <li class="py hover:text-yellow-500">
                                    {{ $t('menu') }}
                                </li>
                            </router-link>
                            <div class="my-2 place-self-end h-1 w-12 bg-yellow-500 rounded"></div>
                            <a @click="scrollTo('openhour')">
                                <li class="py hover:text-yellow-500 cursor-pointer">
                                    {{ $t('openHours') }}
                                </li>
                            </a>
                            <div class="my-2 place-self-end h-1 w-12 bg-yellow-500 rounded "></div>
                            <a @click="scrollTo('contact')">
                                <li class="py hover:text-yellow-500 cursor-pointer">
                                    {{ $t('contact') }}
                                </li>
                            </a>
                        </ul>
                    </div>
                </nav><!-- MOBIL NAV ENDE -->
                <div class="flex h-full content-center flex-wrap align-middle mobile:p-4">
                    <div class="flex-auto text-white mobile:text-center">
                        <h1 class="title font-sans font-extrabold text-2xl desktop:text-4xl">
                            {{ shopStore.shop.Homepage.ShopName }}
                        </h1>
                        <h2 class="mobile:text-sm">
                            {{ shopStore.shop.Homepage.ShopDescription }}
                        </h2>
                    </div>
                    <nav class="flex-auto mobile:hidden m-3.5 font-semibold">
                        <router-link to="/shop" class="text-white p-4 hover:text-yellow-500">
                            {{ $t('menu') }}
                        </router-link>
                        <a @click="scrollTo('contact')" class="p-4 bg-yellow-500 text-black hover:bg-transparent hover:border-4 hover:px-3 hover:py-3
                            hover:border-yellow-500 hover:text-white cursor-pointer">
                            {{ $t('contact') }}
                        </a>
                        <a @click="scrollTo('openhour')" class="text-white p-4 hover:text-yellow-500 cursor-pointer">
                            {{ $t('openHours') }}
                        </a>
                    </nav>
                </div>
            </header>
            <div class="absolute text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-2/4 left-2/4">
                <h3 class="p-2 text-lg desktop:text-2xl font-bold text-yellow-500">
                    {{ shopStore.shop.Homepage.Title1 }}
                </h3>
                <div class="text-4xl font-extrabold desktop:text-6xl">
                    {{ shopStore.shop.Homepage.Title2 }}
                </div>
                <div class="text-4xl font-extrabold desktop:text-6xl">
                    {{ shopStore.shop.Homepage.Title3 }}
                </div>
                <router-link to="/shop">
                    <button
                        class="border-4 font-semibold border-yellow-500 p-4 mt-4 hover:bg-yellow-500 hover:text-black">
                        {{ shopStore.shop.Homepage.ButtonText }}
                    </button>
                </router-link>
            </div>
        </div><!-- Landing Section ENDE -->
        <!-- Öffnungszeiten-->
        <div id="openhour" class="h-full w-full my-4">
            <div class="bg-yellow-500 h-auto text-center text-black ">
                <div class="text-4xl font-extrabold desktop:text-6xl underline py-12"
                    style="text-decoration-thickness: 5px;text-underline-offset: 1rem;">
                    {{ $t('openHours') }}
                </div>
                <div class="pb-12 text-left p-2">
                    <div class="flex justify-center space-x desktop:space-x-16 py-1">
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
                    <div class="flex justify-center space-x desktop:space-x-16 py-1">
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
                    <div class="flex justify-center space-x desktop:space-x-16 py-1">
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
                    <div class="flex justify-center space-x desktop:space-x-16 py-1">
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
                    <div class="flex justify-center space-x desktop:space-x-16 py-1">
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
                    <div class="flex justify-center space-x desktop:space-x-16 py-1">
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
                    <div class="flex justify-center space-x desktop:space-x-16 py-1">
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
        </div><!-- Öffnungszeiten ENDE-->
        <!-- Diashow-->
        <div
            class="h-screen grid gap-4 desktop:grid-rows-12 desktop:grid-cols-3 grid-cols-1 grid-flow-col auto-cols-min">
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage1 == "" ? "images/1.jpg" : shopStore.shop.Homepage.GaleryImage1) + ")"'
                class="bg-center bg-cover row-span-2 mobile:row-span-3"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage2 == "" ? "images/2.jpg" : shopStore.shop.Homepage.GaleryImage2) + ")"'
                class="bg-center bg-cover row-span-3 mobile:row-span-3 row-start-3 mobile:row-start-4"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage3 == "" ? "images/3.jpg" : shopStore.shop.Homepage.GaleryImage3) + ")"'
                class="bg-center bg-cover row-span-4 mobile:row-span-3 row-start-6 mobile:row-start-7"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage4 == "" ? "images/4.jpg" : shopStore.shop.Homepage.GaleryImage4) + ")"'
                class="bg-center bg-cover row-span-3 mobile:hidden"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage5 == "" ? "images/5.jpg" : shopStore.shop.Homepage.GaleryImage5) + ")"'
                class="bg-center bg-cover row-span-3 mobile:hidden row-start-4"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage6 == "" ? "images/6.jpg" : shopStore.shop.Homepage.GaleryImage6) + ")"'
                class="bg-center bg-cover row-span-3 mobile:hidden row-start-7"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage7 == "" ? "images/7.jpg" : shopStore.shop.Homepage.GaleryImage7) + ")"'
                class="bg-center bg-cover row-span-4 mobile:hidden"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage8 == "" ? "images/8.jpg" : shopStore.shop.Homepage.GaleryImage8) + ")"'
                class="bg-center bg-cover row-span-3 mobile:hidden row-start-5"></div>
            <div :style='"background-image: url(" + shopStore.cdn + (shopStore.shop.Homepage.GaleryImage9 == "" ? "images/9.jpg" : shopStore.shop.Homepage.GaleryImage9) + ")"'
                class="bg-center bg-cover row-span-2 mobile:hidden"></div>
        </div>
        <!-- Reviews -->
        <div v-if="(shopStore.shop.Homepage.FeedbackName1 != '' && shopStore.shop.Homepage.FeedbackText1 != '') ||
        (shopStore.shop.Homepage.FeedbackName2 != '' && shopStore.shop.Homepage.FeedbackText2 != '') ||
        (shopStore.shop.Homepage.FeedbackName3 != '' && shopStore.shop.Homepage.FeedbackText3 != '')"
            class="h-full w-full mt-4">
            <div class="bg-yellow-500 h-auto text-center text-black ">
                <div class="text-4xl font-extrabold desktop:text-6xl underline py-12"
                    style="text-decoration-thickness: 5px;text-underline-offset: 1rem;">
                    {{ $t('feedbacks') }}
                </div>
                <div class="flex justify-center mobile:flex-col desktop:space-x-12 text-sm pb-8">
                    <div v-if="shopStore.shop.Homepage.FeedbackName1 != '' && shopStore.shop.Homepage.FeedbackText1 != ''"
                        class="flex-none desktop:w-60 mobile:px-12">
                        <div class="flex justify-center">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABnklEQVRIie3Wv04UURTH8Q8LsVEeQNiNWAq+gCUxSAJRDAW1JYR/MbHyUVDpaQxUPgCF2qoUJEJCKOgIYgMBkWJmk527uzNzR9aKX3KKMznnfO+fc+debvWf1BcR28BLTGME9fT7EX7iE7ZwcFODq+M9LvG3wC6wjgf/Cp3B7xLA0E4wWxW6gj8VoE3bRC0WOtMF+g2rGMPd1B5hGTstcVu4Ewsd1r68Z1gomEENS9ioAiVppBA6XqVQjBrau3e+11CSpQr3NLpByigsOhX4H3DVC3CoXdkZjxbExxyvV62J4YzvB/5h/Ni7KlO7J/vXRZl7IQQfBX7jBsHHeeC9wJ8oKNaXY6+D2P28QouyDfEd/QXwTuqX/YVeYDAvoa79B7JYAbwS1Nguk/QuSDrH0wjoszSntcZcmcQhnHaAL8lf9ppkpmdB7h4Gyo76hc7X4g9J0zzGPcm1OJYCdzrEX2GyLLSp5S7wGHsbC23qufZlL2OXeFMV2tQQ1iRHogz0M54UFY153tYlT6JpPEz9AfySXC5f8RFfImreqve6BtfExzfbxlpkAAAAAElFTkSuQmCC" />
                        </div>
                        <p class="font-semibold py-4">★★★★★</p>
                        {{ shopStore.shop.Homepage.FeedbackText1 }}
                        <p class="font-semibold py-4">{{ shopStore.shop.Homepage.FeedbackName1 }}</p>
                    </div>
                    <div v-if="shopStore.shop.Homepage.FeedbackName2 != '' && shopStore.shop.Homepage.FeedbackText2 != ''"
                        class="flex-none desktop:w-60 mobile:px-12">
                        <div class="flex justify-center">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABnklEQVRIie3Wv04UURTH8Q8LsVEeQNiNWAq+gCUxSAJRDAW1JYR/MbHyUVDpaQxUPgCF2qoUJEJCKOgIYgMBkWJmk527uzNzR9aKX3KKMznnfO+fc+debvWf1BcR28BLTGME9fT7EX7iE7ZwcFODq+M9LvG3wC6wjgf/Cp3B7xLA0E4wWxW6gj8VoE3bRC0WOtMF+g2rGMPd1B5hGTstcVu4Ewsd1r68Z1gomEENS9ioAiVppBA6XqVQjBrau3e+11CSpQr3NLpByigsOhX4H3DVC3CoXdkZjxbExxyvV62J4YzvB/5h/Ni7KlO7J/vXRZl7IQQfBX7jBsHHeeC9wJ8oKNaXY6+D2P28QouyDfEd/QXwTuqX/YVeYDAvoa79B7JYAbwS1Nguk/QuSDrH0wjoszSntcZcmcQhnHaAL8lf9ppkpmdB7h4Gyo76hc7X4g9J0zzGPcm1OJYCdzrEX2GyLLSp5S7wGHsbC23qufZlL2OXeFMV2tQQ1iRHogz0M54UFY153tYlT6JpPEz9AfySXC5f8RFfImreqve6BtfExzfbxlpkAAAAAElFTkSuQmCC" />
                        </div>
                        <p class="font-semibold py-4">★★★★★</p>
                        {{ shopStore.shop.Homepage.FeedbackText2 }}
                        <p class="font-semibold py-4">{{ shopStore.shop.Homepage.FeedbackName2 }}</p>
                    </div>
                    <div v-if="shopStore.shop.Homepage.FeedbackName3 != '' && shopStore.shop.Homepage.FeedbackText3 != ''"
                        class="flex-none desktop:w-60 mobile:hidden">
                        <div class="flex justify-center">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABnklEQVRIie3Wv04UURTH8Q8LsVEeQNiNWAq+gCUxSAJRDAW1JYR/MbHyUVDpaQxUPgCF2qoUJEJCKOgIYgMBkWJmk527uzNzR9aKX3KKMznnfO+fc+debvWf1BcR28BLTGME9fT7EX7iE7ZwcFODq+M9LvG3wC6wjgf/Cp3B7xLA0E4wWxW6gj8VoE3bRC0WOtMF+g2rGMPd1B5hGTstcVu4Ewsd1r68Z1gomEENS9ioAiVppBA6XqVQjBrau3e+11CSpQr3NLpByigsOhX4H3DVC3CoXdkZjxbExxyvV62J4YzvB/5h/Ni7KlO7J/vXRZl7IQQfBX7jBsHHeeC9wJ8oKNaXY6+D2P28QouyDfEd/QXwTuqX/YVeYDAvoa79B7JYAbwS1Nguk/QuSDrH0wjoszSntcZcmcQhnHaAL8lf9ppkpmdB7h4Gyo76hc7X4g9J0zzGPcm1OJYCdzrEX2GyLLSp5S7wGHsbC23qufZlL2OXeFMV2tQQ1iRHogz0M54UFY153tYlT6JpPEz9AfySXC5f8RFfImreqve6BtfExzfbxlpkAAAAAElFTkSuQmCC" />
                        </div>
                        <p class="font-semibold py-4">★★★★★</p>
                        {{ shopStore.shop.Homepage.FeedbackText3 }}
                        <p class="font-semibold py-4">{{ shopStore.shop.Homepage.FeedbackName3 }}</p>
                    </div>
                </div>
            </div>
        </div><!-- Reviews ENDE -->
        <!-- Footer/Contact -->
        <div v-if="true" id="contact" class="h-full w-full mt-4">
            <div class="bg-black h-auto text-white">
                <div class="flex justify-center mobile:flex-col desktop:space-x-12 py-16 desktop:pb-32">
                    <!-- Kontakt/Adresse -->
                    <div class="flex-none desktop:w-60 mobile:px-12">
                        <p class="text-lg font-semibold text-yellow-500 py-4 mobile:pt-12">
                            {{ $t('contact') }}
                        </p>
                        <p>&phone; <a class="py-0.5">{{ shopStore.shop.Settings.Telephone }}</a></p>
                        <p>&#9993; <a class="py-0.5">{{ shopStore.shop.Settings.Email }}</a></p>
                        <p class="text-lg font-semibold text-yellow-500 py-4 mobile:pt-12">
                            {{ $t('address') }}
                        </p>
                        <p>{{ shopStore.shop.Settings.Street }}</p>
                        <p>{{ shopStore.shop.Settings.City }}</p>
                        <p>{{ shopStore.shop.Settings.Country }}</p>
                    </div><!-- Kontakt/Adresse ENDE -->
                    <!-- Kontaktformular -->
                    <div class="flex-none desktop:w-60 mobile:px-12">
                        <p class="text-lg font-semibold text-yellow-500 py-3 mobile:pt-12">
                            {{ $t('question') }}
                        </p>
                        <div v-if="shopStore.messageHasSent" class="py-2">
                            {{ $t('weContactYou') }}
                        </div>
                        <div v-else>
                            <div class="input-container relative py-2 bg-transparent">
                                <input class=" bg-transparent w-full border-0 border-b h-12 focus:ring-transparent"
                                    :class="shopStore.Email != '' && !validateEmail(shopStore.Email) ? 'border-red-500' : ''"
                                    v-model="shopStore.Email" style="outline: none; shadow: none" type="text" required>
                                <label>{{ $t('email') }}</label>
                            </div>
                            <div class="input-container relative py-2 bg-transparent">
                                <input class="bg-transparent w-full border-0 border-b h-12 focus:ring-transparent"
                                    v-model="shopStore.Message" style="outline: none; shadow: none" type="text"
                                    required>
                                <label>{{ $t('message') }}</label>
                            </div>
                            <div class="m-1 pt-6">
                                <button @click="shopStore.createMessage(shopStore.Email, shopStore.Message)"
                                    :disabled="shopStore.Email == '' || shopStore.Message == '' || !validateEmail(shopStore.Email)"
                                    class="font-semibold border-2 border-yellow-500 w-full p-2 hover:bg-yellow-500 hover:text-black hover:cursor-pointer">
                                    {{ $t('send') }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="true" class="flex-none desktop:w-60 mobile:px-12">
                        <p class="text-lg font-semibold text-yellow-500 py-4 mobile:pt-12">
                            {{ $t('links') }}
                        </p>
                        <p>
                            <router-link
                                :to="shopStore.shop.Settings.ShopLanguage == 'de' ? '/impressum' : '/legal-notice'"
                                class="hover:text-yellow-500 hover:underline py-0.5">
                                {{ $t('legalNotice') }}
                            </router-link>
                        </p>
                        <p>
                            <router-link
                                :to="shopStore.shop.Settings.ShopLanguage == 'de' ? '/datenschutz' : '/privacy-policy'"
                                class="hover:text-yellow-500 hover:underline py-0.5">
                                {{ $t('dataPolicy') }}
                            </router-link>
                        </p>
                        <p>
                            <router-link :to="shopStore.shop.Settings.ShopLanguage == 'de' ? '/agb' : '/terms'"
                                class="hover:text-yellow-500 hover:underline py-0.5">
                                {{ $t('tos') }}
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div><!-- Footer/Contact -->
    </div>
</template>
<style scoped>
#homeview {
    font-family: 'Montserrat', sans-serif;
}

.input-container input:focus~label,
.input-container input:valid~label {
    top: 0px;
    font-size: 12px;
}

.input-container label {
    position: absolute;
    top: 30%;
    left: 10px;
    font-size: 16px;
    pointer-events: none;
    transition: all 0.5s ease-in-out;
}

#mobilMenu {
    -webkit-user-select: none;
    user-select: none;
}

#mobilMenu a {
    text-decoration: none;
    transition: color 0.3s ease;
}

#mobilMenu span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #fff;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        opacity 0.55s ease;
}

#mobilMenu span:first-child {
    transform-origin: 0% 0%;
}

#mobilMenu span:nth-last-child(2) {
    transform-origin: 0% 100%;
}

#mobilMenu input:checked~span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #fff;
}

#mobilMenu input:checked~span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}

#mobilMenu input:checked~span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
}

#menu {
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(110%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
}

#mobilMenu input:checked~ul {
    transform: none;
}
</style>
<script setup>
import { useShopStore } from '@/stores/shop'
import { validateEmail } from '@/helper.js'
import { useHead } from '@unhead/vue';
const shopStore = useShopStore()
useHead({
    title: shopStore.shop.Homepage.MetaTitle,
    meta: [
        {
            name: 'description',
            content: shopStore.shop.Homepage.MetaDescription
        },
        {
            property: 'og:title',
            content: shopStore.shop.Homepage.MetaTitle
        },
        {
            property: 'og:description',
            content: shopStore.shop.Homepage.MetaDescription
        },
        {
            name: 'robots',
            content: 'index,follow'
        },
    ]
})
function scrollTo(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}
</script>

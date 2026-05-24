<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';

interface NameItem {
    name: string;
    big: string;
    small: string;
    distance: string;
    time: string;
    img: string;
}

const current = ref(0);
const nameList: NameItem[] = [
    { name: 'MOON', big: 'MOON', small: 'See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.', distance: '384,400 KM', time: '3 DAYS', img: '2-1-Moon' },
    { name: 'MARS', big: 'MARS', small: 'Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!', distance: '225 MIL. KM', time: '9 MONTHS', img: '2-2-Mars' },
    { name: 'EUROPA', big: 'EUROPA', small: 'The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.', distance: '628 MIL. KM', time: '3 YEARS', img: '2-3-Europa' },
    { name: 'TITAN', big: 'TITAN', small: 'The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.', distance: '1.6 BIL. KM', time: '7 YEARS', img: '2-4-Titan' }
];

const getImg = (name: string) => {
    return new URL(`../assets/${name}.png`, import.meta.url).href;
};
</script>

<template>
    <div class="home-container">
        <NavBar />
        <div class="container mx-auto p-6 sm:p-10 md:p-12">
            <div class="flex flex-col gap-6">
                <div class="text-white text-center md:text-start">
                    <span class="pr-6 font-bold opacity-25 text-preset-6 md:text-preset-5">01</span>
                    <span class="text-preset-6 md:text-preset-5">PICK YOUR DESTINATION</span>
                </div>
                <div class="flex flex-col gap-8 items-center lg:flex-row">
                    <!--                                                                             w-3/4 占父層的3/4，隨大小縮小放大 -->
                    <img :src="getImg(nameList[current]?.img || '')" :alt="nameList[current]?.name"
                        class="w-1/2 max-w-[480px] p-[40px_30px] lg:p-[130px_30px]">
                    <div class="flex flex-col items-center mx-auto max-w-[540px] gap-10 lg:items-start md:p-0">
                        <div class="flex gap-8">
                            <button v-for="(item, index) in nameList" :key="item.name" @click="current = index"
                                class="text-white border-b-[3px] pb-2 cursor-pointer transition-all duration-300 ease-in-out"
                                :class="current === index ? 'border-white' : 'border-transparent hover:border-white/50'">
                                {{ item.name }}
                            </button>
                        </div>
                        <div>
                            <div class="text-white text-preset-2 text-center lg:text-start">{{ nameList[current]?.big }}
                            </div>
                            <div class="blue-300 text-preset-9 text-center lg:text-start lg:h-[130px]">{{
                                nameList[current]?.small }}</div>
                        </div>
                        <div class="h-px bg-white/25"></div>
                        <div class="gap-6 grid-flow-col sm:flex">
                            <div class="text-white flex flex-col gap-3 w-[210px] text-center lg:text-start">
                                <p class="text-preset-7 blue-300">AVG. DISTANCE</p>
                                <p class="text-preset-6">{{ nameList[current]?.distance }}</p>
                            </div>
                            <div class="text-white flex flex-col gap-3 text-center mt-6 lg:text-start sm:mt-0">
                                <p class="text-preset-7 blue-300">EST.TRAVEL TIME</p>
                                <p class="text-preset-6">{{ nameList[current]?.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    width: 100%;
    background-image: url(../assets/Render-2.jpg);
    background-position: center;
    background-size: cover;
}
</style>

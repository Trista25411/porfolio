<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';

interface InfoItem {
    work: string;
    name: string;
    intr: string;
    img: string;
}

const current = ref(0);
const infoList: InfoItem[] = [
    { work: 'COMMANDER', name: 'DOUGLAS HURLEY', intr: 'Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.', img: '3-1-base' },
    { work: 'MISSION SPECIALIST', name: 'MARK SHUTTLEWORTH', intr: 'Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.', img: '3-2-preview' },
    { work: 'PILOT', name: 'VICTOR GLOVER', intr: 'Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.', img: '3-3-pilot' },
    { work: 'FLIGHT ENGINEER', name: 'ANOUSHEH ANSARI', intr: 'Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.', img: '3-4-enigneer' }
];

const getImg = (name: string) => {
    return new URL(`../assets/${name}.png`, import.meta.url).href;
};
</script>

<template>
    <div class="home-container">
        <NavBar />
        <div class="container mx-auto p-6 sm:p-10 md:p-12">
            <div class="flex flex-col md:gap-6">
                <div class="text-white text-center mb-6 md:mb-0 sm:text-start">
                    <span class="pr-6 font-bold opacity-25 text-preset-6 md:text-preset-5">02</span>
                    <span class="text-preset-6 md:text-preset-5">MEET YOUR CREW</span>
                </div>
                <div class=" md:h-[600px] flex gap-8 items-end flex-col md:flex-row">
                    <div class="text-white text-center md:text-start mt-10 md:w-[540px]">
                        <div class="md:h-[500px]">
                            <div class="text-preset-4 opacity-50 mb-4">{{ infoList[current]?.work }}</div>
                            <div class="text-preset-3 mb-6">{{ infoList[current]?.name }}</div>
                            <div class="text-preset-9 blue-300 mb-10">{{ infoList[current]?.intr }}</div>
                        </div>
                        <div class="flex gap-4 pb-10 justify-center md:justify-start md:gap-10">
                            <button v-for="(item, index) in infoList" @click="current = index" :key="index"
                                class="bg-white cursor-pointer rounded-full transition-all duration-300 ease-in-out size-2 md:size-4"
                                :class="current === index ? 'bg-white opacity-100' : 'bg-white opacity-20'">
                            </button>
                        </div>
                    </div>
                    <div class="flex m-auto">
                        <img :key="current" :src="getImg(infoList[current]?.img || '')" :alt="infoList[current]?.name"
                            class="object-contain">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    width: 100%;
    background-image: url(../assets/Render-3.jpg);
    background-position: center;
    background-size: cover;
}
</style>

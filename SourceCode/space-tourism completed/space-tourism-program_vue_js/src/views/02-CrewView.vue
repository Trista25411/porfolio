<script setup>
import NavBar from '@/components/NavBar.vue';
// 要先定義current
import { ref } from 'vue';

const current = ref(0);
const Info = [
    { work: 'COMMANDER', name: 'DOUGLAS HURLEY', intr: 'Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.', img: '3-1-base' },
    { work: 'MISSION SPECIALIST', name: 'MARK SHUTTLEWORTH', intr: 'Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.', img: '3-2-preview' },
    { work: 'PILOT', name: 'VICTOR GLOVER', intr: 'Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.', img: '3-3-pilot' },
    { work: 'FLIGHT ENGINEER', name: 'ANOUSHEH ANSARI', intr: 'Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.', img: '3-4-enigneer' }
];

const getImg = (name) => {
    return new URL(`../assets/${name}.png`, import.meta.url).href;
};
</script>

<template>
    <div class="home-container">
        <NavBar />
        <div class="container mx-auto p-[24px] sm:p-[40px] md:p-[48px]">
            <div class="flex flex-col md:gap-[24px]">
                <div class="text-white text-center mb-[24px] md:mb-[0px] sm:text-start">
                    <span class="pr-[24px] font-bold opacity-25 text-preset-6 md:text-preset-5">02</span>
                    <span class="text-preset-6 md:text-preset-5">MEET YOUR CREW</span>
                </div>
                <div class=" md:h-[600px] flex gap-[32px] items-end flex-col md:flex-row">
                    <div class="text-white text-center md:text-start mt-[40px] md:w-[540px]">
                        <div class="md:h-[500px]">
                            <div class="text-preset-4 opacity-50 mb-[16px]">{{ Info[current].work }}</div>
                            <div class="text-preset-3 mb-[24px]">{{ Info[current].name }}</div>
                            <div class="text-preset-9 blue-300 mb-[40px]">{{ Info[current].intr }}</div>
                        </div>
                        <div class="flex gap-[16px] pb-[40px] justify-center md:justify-start md:gap-[40px]">
                            <!-- 無法顯示 => 
                             1. 要記得先定義 import { ref } from 'vue; const current = ref(0); 
                             2. 要綁定:key = "index"
                             3. 用opacity來顯示，若用bg-white跟bg-transpartent會不見
                             4. img也要綁定:key="current"-->
                            <button v-for="(item, index) in Info" @click="current = index" :key="index"
                                class="bg-white cursor-pointer rounded-full size-2 md:size-4 transition-all duration-300 ease-in-out"
                                :class="current === index ? 'bg-white opacity-100' : 'bg-white opacity-20'">
                            </button>
                        </div>
                    </div>
                    <div class="flex m-auto">
                        <img :key="current" :src="getImg(Info[current].img)" :alt="Info[current].name"
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
    height: 100vh;
    background-image: url(../assets/Render-3.jpg);
    background-position: center;
    background-size: cover;
}

@media (max-width:1440px) {
    .home-container{
        height: auto;
    }   
}
</style>

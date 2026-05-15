<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';

const current = ref(0);
const Tech = [
    { name: 'LAUNCH VEHICLE', intr: "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!", img: '4-1-Technology' },
    { name: 'SPACEPORT', intr: "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.", img: '4-2-Technology' },
    { name: 'SPACE CAPSULE', intr: "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.", img: '4-3-Technology' }
];

const getImg = (name) => {
    return new URL(`../assets/${name}.png`, import.meta.url).href;
};
</script>

<template>
    <div class="home-container flex flex-col">
        <NavBar />
        <div class="py-[48px] lg:pl-[125px]">
            <div class="flex flex-col gap-[24px]">
                <div class="text-white text-center pl-[40px] lg:p-[0px] sm:text-start">
                    <span class="pr-[24px] font-bold opacity-25 text-preset-6 md:text-preset-5">03</span>
                    <span class="text-preset-6 md:text-preset-5">SPACE LAUNCH 101</span>
                </div>
                <div class="flex flex-col-reverse justify-between items-center lg:flex-row gap-[32px]">
                    <div class="text-white max-w-[630px] h-[350px] flex flex-col lg:m-auto lg:flex-row lg:gap-[64px]">
                        <div class="flex justify-center items-center gap-[8px] lg:flex-col lg:gap-[16px] sm:gap-[32px]">
                            <button v-for="(item, index) in Tech" @click="current = index" :key="index"
                                class="rounded-full text-preset-4 size-10 border border-white/20 transition-all duration-300 ease-in-out lg:size-20 sm:size-14"
                                :class="current === index ? 'bg-white opacity-100 text-black' : 'bg-transparent text-white hover:bg-white hover:text-black'">
                                {{ index + 1 }}
                            </button>
                        </div>
                        <div class="my-auto text-center lg:text-start mt-[40px] p-[24px] lg:mt-[0px] sm:p-[0px]">
                            <div class="text-preset-4 mb-[16px]">THE TERMINOLOGY…</div>
                            <div class="text-preset-3 mb-[24px]">{{ Tech[current].name }}</div>
                            <div class="text-preset-9">{{ Tech[current].intr }}</div>
                        </div>
                    </div>
                    <!-- 照片放不滿版，用w-full跟w-auto，還有object-cover調整 -->
                    <div class="w-full lg:w-auto">
                        <img :key="current" :src="getImg(Tech[current].img)" :alt="Tech[current].name"
                            class="w-full object-cover h-[350px] lg:h-[600px] lg:object-contain">
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
    background-image: url(../assets/Render-4.jpg);
    background-position: center;
    background-size: cover;
}

@media (max-width:1440px) {
    .home-container{
        height: auto;
    }   
}
</style>

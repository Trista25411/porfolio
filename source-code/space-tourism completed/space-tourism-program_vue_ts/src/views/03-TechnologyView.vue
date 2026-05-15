<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';

interface TechItem {
    name: string;
    intr: string;
    img: string;
};

const current = ref(0);
const tech: TechItem[] = [
    { name: 'LAUNCH VEHICLE', intr: "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!", img: '4-1-Technology' },
    { name: 'SPACEPORT', intr: "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.", img: '4-2-Technology' },
    { name: 'SPACE CAPSULE', intr: "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.", img: '4-3-Technology' }
];

const getImg = (name: string) => {
    return new URL(`../assets/${name}.png`, import.meta.url).href;
};
</script>

<template>
    <div class="home-container flex flex-col">
        <NavBar />
        <div class="py-12 lg:pl-[125px]">
            <div class="flex flex-col gap-6">
                <div class="text-white text-center pl-10 lg:p-0 sm:text-start">
                    <span class="pr-6 font-bold opacity-25 text-preset-6 md:text-preset-5">03</span>
                    <span class="text-preset-6 md:text-preset-5">SPACE LAUNCH 101</span>
                </div>
                <div class="flex flex-col-reverse justify-between items-center lg:flex-row gap-8">
                    <div class="text-white max-w-[630px] h-[350px] flex flex-col lg:m-auto lg:flex-row lg:gap-16">
                        <div class="flex justify-center items-center gap-2 lg:flex-col lg:gap-4 sm:gap-8">
                            <button v-for="(item, index) in tech" @click="current = index" :key="index"
                                class="rounded-full text-preset-4 size-10 border border-white/20 cursor-pointer transition-all duration-300 ease-in-out lg:size-20 sm:size-14"
                                :class="current === index ? 'bg-white opacity-100 text-black' : 'bg-transparent text-white hover:bg-white hover:text-black'">
                                {{ index + 1 }}
                            </button>
                        </div>
                        <div class="my-auto text-center lg:text-start mt-10 p-6 lg:mt-0 sm:p-0">
                            <div class="text-preset-4 mb-4">THE TERMINOLOGY…</div>
                            <!-- 修改好上面也定義好規範，但還是報錯 顯示object is possibly undefined 
                             => 因為current預設是0，且陣列有3的，但TS會想說萬一是別的數開始，或者是空的，為了防範風險事先報錯
                             => 在 tech[current] 後面加個問號，代表：「如果這東西存在才讀取後面的屬性，不存在就回傳 undefined，不要報錯」-->
                            <div class="text-preset-3 mb-6">{{ tech[current]?.name }}</div>
                            <div class="text-preset-9">{{ tech[current]?.intr }}</div>
                        </div>
                    </div>
                    <div class="w-full lg:w-auto">
                        <!--                      原先寫法 getImg(tech[current].img) -->
                        <img :key="current" :src="getImg(tech[current]?.img || '')" :alt="tech[current]?.name"
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
    background-image: url(../assets/Render-4.jpg);
    background-position: center;
    background-size: cover;
}
</style>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';

const current = ref(0); // 呼叫函數並設定預設顯示第 0 個項目，若沒有寫0 => 只是把函數賦值給變數，沒有執行
const nameItems = [
    { name: 'MOON', big: 'MOON', small: 'See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.', distance: '384,400 KM', time: '3 DAYS', img: '2-1-Moon' },
    { name: 'MARS', big: 'MARS', small: 'Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!', distance: '225 MIL. KM', time: '9 MONTHS', img: '2-2-Mars' },
    { name: 'EUROPA', big: 'EUROPA', small: 'The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.', distance: '628 MIL. KM', time: '3 YEARS', img: '2-3-Europa' },
    { name: 'TITAN', big: 'TITAN', small: 'The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.', distance: '1.6 BIL. KM', time: '7 YEARS', img: '2-4-Titan' }
];

const getImg = (name) => {
    // new URL(path, base)：構造函數 => 把「相對路徑」拼接到「當前檔案路徑」上，產生一個完整的資源網址
    //              ↓ 相對於這份vue檔的相對路徑, ↓ 目前這份vue檔在瀏覽器的絕對位置. href將url物件轉為字串給img的src使用
    return new URL(`../assets/${name}.png`, import.meta.url).href;
};
</script>

<template>
    <div class="home-container">
        <NavBar />
        <div class="container mx-auto p-[24px] sm:p-[40px] md:p-[48px]">
            <div class="flex flex-col gap-[24px]">
                <div class="text-white text-center md:text-start">
                    <span class="pr-[24px] font-bold opacity-25 text-preset-6 md:text-preset-5">01</span>
                    <span class="text-preset-6 md:text-preset-5">PICK YOUR DESTINATION</span>
                </div>
                <div class="flex flex-col gap-[32px] items-center lg:flex-row">
                    <!--                                                                             w-3/4 占父層的3/4，隨大小縮小放大 -->
                    <img :src="getImg(nameItems[current].img)" :alt="nameItems[current].name"
                        class="w-1/2 max-w-[480px] p-[40px_30px] lg:p-[130px_30px]">
                    <!-- 點選name再顯示其資料，要把name另外用一個div做button包覆起來，不然全部包一塊，資訊都會放在裡面，就會變成四塊一起出現 -->
                    <div
                        class="flex flex-col items-center mx-auto max-w-[540px] gap-[40px] lg:items-start md:p-[0px]">
                        <div class="flex gap-[32px]">
                            <button v-for="(item, index) in nameItems" :key="item.name" @click="current = index"
                                class="text-white border-b-[3px] pb-[8px] transition-all duration-300 ease-in-out"
                                :class="current === index ? 'border-white' : 'border-transparent hover:border-white/50'">
                                {{ item.name }}
                            </button>
                        </div>
                        <div>
                            <div class="text-white text-preset-2 text-center lg:text-start">{{ nameItems[current].big }}</div>
                            <!-- 原先因字數不同，點選{{ item.name }}的時候會跟著變化，設定min-h多少就可以了 -->
                            <div class="blue-300 text-preset-9 text-center lg:text-start lg:h-[130px]">{{ nameItems[current].small }}</div>
                        </div>
                        <div class="h-[1px] bg-white/25"></div>
                        <div class="gap-[24px] grid-flow-col sm:flex">
                            <div class="text-white flex flex-col gap-[12px] w-[210px] text-center lg:text-start">
                                <p class="text-preset-7 blue-300">AVG. DISTANCE</p>
                                <p class="text-preset-6">{{ nameItems[current].distance }}</p>
                            </div>
                            <div
                                class="text-white flex flex-col gap-[12px] text-center mt-[24px] lg:text-start sm:mt-[0px]">
                                <p class="text-preset-7 blue-300">EST.TRAVEL TIME</p>
                                <p class="text-preset-6">{{ nameItems[current].time }}</p>
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
    height: 100vh;
    background-image: url(../assets/Render-2.jpg);
    background-position: center;
    background-size: cover;
}

@media (max-width:1440px) {
    .home-container{
        height: auto;
    }   
}
</style>

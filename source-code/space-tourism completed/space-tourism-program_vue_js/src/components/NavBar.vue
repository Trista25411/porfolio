<script setup>
import { ref } from 'vue';
// 「讀取」當前狀態 => 應用於:class="$route.path === item.path ..." 
import { useRoute, useRouter } from 'vue-router';
// route 用於監控當前網址路徑
const route = useRoute();
const router = useRouter();

// 控制漢堡條開關
const isOpen = ref(false);

const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'DESTINATION', path: '/dest' },
    { name: 'CREW', path: '/crew' },
    { name: 'TECHNOLOGY', path: '/tech' }
];

const navigate = (path => {
    router.push(path);
    isOpen.value = false; // 點擊後關閉選單
})
</script>

<template>
    <nav class="flex justify-between items-center relative w-full h-[88px] p-[32px_24px_32px_32px] md:h-[96px] md:p-[0_0_0_40px] lg:h-[136px] lg:p-[40px_0_0_24px]">
        <img src="../assets/Logo.png" alt="logo" class="size-12">
        <div class="hidden lg:block h-[1px] bg-white/25 flex-grow my-auto translate-x-8 z-10 "></div>

        <button @click="isOpen = !isOpen" :class="{ 'isActive': isOpen }"
            class="ham-btn size-6 relative z-20 md:hidden">
            <div class="line line-1 blue-300"></div>
            <div class="line line-2 blue-300"></div>
            <div class="line line-3 blue-300"></div>
        </button>

        <div :class="isOpen ? 'translate-x-0' : 'translate-x-full', 'md:translate-x-0'"
        class="bg-[#0B0D17]/15 backdrop-blur-[80px] fixed top-0 right-0 w-[254px] h-full px-[25px] md:bg-white/5 md:w-auto md:h-[96px] md:static md:flex lg:px-[64px]">
            <ul class="flex flex-col gap-[32px] p-[135px_0_135px_32px] md:flex-row md:p-[0_32px]">
                <li v-for="(item, index) in navItems" @click="navigate(item.path)"
                    class="text-white flex gap-[12px] border-r-[3px] md:border-b-[3px] md:border-r-[0px] items-center cursor-pointer"
                    :class="$route.path === item.path ? 'border-white' : 'border-transparent hover:border-white/50'">
                    <span class="text-preset-8-bold">{{ String(index).padStart(2, '0') }}</span>
                    <span class="text-preset-8">{{ item.name }}</span>
                </li>
            </ul>
        </div>

    </nav>

    <!-- 4. 完整寫法 無漢堡條 -->
    <!-- <nav class="nav-hamburger h-[135px] flex pt-[40px]">
        <img src="../assets/Logo.png" alt="logo" class="size-12 ml-[64px] my-auto">
        <div class="h-[1px] bg-white/25 flex-grow my-auto translate-x-8 z-10"></div>
        <div class="bg-white/5 backdrop-blur-[80px] flex gap-[48px] items-center px-[20px] lg:px-[64px] ">
            <button v-for="(item, index) in navItems" @click="$router.push(item.path)"
                :class="$route.path === item.path ? 'border-white' : 'border-transparent hover:border-white/50'"
                                                   底線沒有出在最底部 => 用h-full撐開，並用items-center讓文字垂直置中             
                class="text-white flex gap-[12px] border-b-[3px] h-full items-center">
                <span class="text-preset-8-bold">{{ String(index).padStart(2, '0') }}</span>
                <span class="text-preset-8">{{ item.name }}</span>
            </button>
        </div>
    </nav> -->


    <!-- 3. 原先寫法 沒漢堡條  ↑ -->
    <!-- <div class="navbar bg-transparent h-[135px] p-[40px_0_0_64px] flex overflow-x-hidden md:pl-[10px]">
        png才支援透明度，jpg無法
        <img src="../assets/Logo.png" alt="logo" class="bg-transparent w-[48px] h-[48px] m-[auto_30px]">
        <div class="h-[1px] bg-white opacity-25 my-auto flex-grow translate-x-8 z-10"></div>
        白色背景 5% 背景模糊 80
        < <div class="nav-right cursor-pointer bg-white/5 backdrop-blur-[80px] px-[64px] flex gap-[48px]">
            <div v-for="(item, index) in ['HOME', 'DESTINATION', 'CREW', 'TECHNOLOGY']"
                class="blo flex gap-[8px] items-center text-white">
                <span class="text-preset-8-bold">{{ String(index).padStart(2, '0') }}</span>
                <span class="text-preset-8">{{ item }}</span>
            </div>
        </div>
    </div> -->


    <!-- 2. 原先寫法 加入底線+導入其他頁面 -->
    <!-- $router.push => (讀取狀態) => 「切換頁面」而不重新整理網頁
    $router => (發送指令) => 前面判斷，後面判斷後看是否需切換頁面
    <div class="cursor-pointer bg-white/5 backdrop-blur-[80px] px-[20px] flex gap-[48px] lg:px-[64px]">
        <div v-for="(item, index) in navItems" @click="$router.push(item.path)"
            class="blo flex gap-[8px] items-center text-white border-b-[3px] hta"
            :class="$route.path === item.path ? 'border-white' : 'border-transparent hover:border-white/50'">
                                            忘記 {{ 這段 }} 怎麼寫
            <span class="text-preset-8-bold">{{ String(index).padStart(2, '0') }}</span>
            <span class="text-preset-8">{{ item.name }}</span>
        </div>
    </div> -->


    <!-- 1. 原先寫法-->
    <!-- <div class="navbar bg-transparent h-[135px] p-[40px_0_0_64px] flex overflow-x-hidden md:pl-[10px]">
        <img src="../assets/Logo.png" alt="logo" class="bg-transparent w-[48px] h-[48px] m-[auto_30px]">
        <div class="h-[1px] bg-white opacity-25 my-auto flex-grow translate-x-8 z-10"></div>
        <div class="nav-right bg-white/20 px-[64px] flex gap-[48px]">
            <div class="blo flex gap-[8px] items-center">
                <span class="text-preset-8-bold)">00</span>
                <span class="text">HOME</span>
            </div>
            <div class="blo flex gap-[8px] items-center">
                <span class="text-preset-8-bold)">01</span>
                <span class="text">DESTINATION</span>
            </div>
            <div class="blo flex gap-[8px] items-center">
                <span class="text-preset-8-bold)">02</span>
                <span class="text">CREW</span>
            </div>
            <div class="blo flex gap-[8px] items-center">
                <span class="text-preset-8-bold)">03</span>
                <span class="text">TECHNOLOGY</span>
            </div>
        </div>
    </div> -->
    <!-- 上方重覆程式太多，變更簡短寫法 => 查看上方 2. -->
</template>


<style scoped>
.line {
    background-color: #D0D6F9;
    width: 24px;
    height: 3px;
    position: absolute;
}

.line-1 {
    top: 25%;
}

.line-2 {
    top: 50%;
}

.line-3 {
    top: 75%;
}

.isActive .line-1 {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
}

.isActive .line-2 {
    display: none;
}

.isActive .line-3 {
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
}
</style>
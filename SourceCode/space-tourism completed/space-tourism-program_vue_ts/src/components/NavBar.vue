<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 定義navItem內容規範
// 屬性英文記得是小寫，不然大寫寫錯也會報錯
interface NavItem {
    name: string;
    path: string;
}

const route = useRoute();
const router = useRouter();
const isOpen = ref(false);

const navItems: NavItem[] = [
    { name: 'HOME', path: '/' },
    { name: 'DESTINATION', path: '/dest' },
    { name: 'CREW', path: '/crew' },
    { name: 'TECHNOLOGY', path: '/tech' }
];

// 原先只有寫(path)但會報錯，因沒制定他的屬性
// 所有function的參數都需要訂定是string還是number還是其他
// 屬性英文記得是小寫，不然大寫寫錯也會報錯
const navigate = (path: string) => {
    router.push(path);
    isOpen.value = false; 
};
</script>

<template>
    <!--                                                                                         h-[96px] 可直接用 h-24 (4為一單位)-->
    <nav
        class="flex justify-between items-center relative w-full h-[88px] p-[32px_24px_32px_32px] md:h-24 md:p-[0_0_0_40px] lg:h-[136px] lg:p-[40px_0_0_24px]">
        <img src="../assets/Logo.png" alt="logo" class="size-12">
        <!--                        原先寫 h-[1px] 但tailwind本身就有1px的 => h-px / flex-grow 直接打grow就可-->
        <div class="hidden lg:block h-px bg-white/25 grow my-auto translate-x-8 z-10 "></div>

        <button @click="isOpen = !isOpen" :class="{ 'isActive': isOpen }"
            class="ham-btn size-6 relative z-20 md:hidden">
            <div class="line line-1 blue-300"></div>
            <div class="line line-2 blue-300"></div>
            <div class="line line-3 blue-300"></div>
        </button>

        <!-- 原先寫法是 <div :class="isOpen ? 'translate-x-0' : 'translate-x-full', 'md:translate-x-0'"
         但中間的 , 在標準 HTML 中是很奇怪的，會提醒可能寫錯，應該用陣列語法 []-->
        <div :class="[isOpen ? 'translate-x-0' : 'translate-x-full', 'md:translate-x-0']"
            class="bg-[#0B0D17]/15 backdrop-blur-[80px] fixed top-0 right-0 w-[254px] h-full px-[25px] md:bg-white/5 md:w-auto md:h-24 md:static md:flex lg:px-16">
            <ul class="flex flex-col gap-8 p-[135px_0_135px_32px] md:flex-row md:p-[0_32px]">
                <li v-for="(item, index) in navItems" @click="navigate(item.path)"
                    class="text-white flex gap-3 border-r-[3px] md:border-b-[3px] md:border-r-0 items-center cursor-pointer"
                    :class="$route.path === item.path ? 'border-white' : 'border-transparent hover:border-white/50'">
                    <span class="text-preset-8-bold">{{ String(index).padStart(2, '0') }}</span>
                    <span class="text-preset-8">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </nav>
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
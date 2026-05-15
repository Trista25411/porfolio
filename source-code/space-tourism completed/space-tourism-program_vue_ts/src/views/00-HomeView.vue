<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <div class="home-container">
        <NavBar />
        <div class="container max-w-[1110px] grid grid-cols-1 py-[130px] mx-auto mt-6 md:mt-[200px] lg:grid-cols-2">
            <div class="b-left text-white text-center max-w-[510px] mx-auto lg:text-start">
                <div class="text-preset-7 blue-300">SO, YOU WANT TO TRAVEL TO</div>
                <div class="text-preset-1">SPACE</div>
                <div class="text-preset-9 blue-300">Let’s face it; if you want to go to space, you might as well genuinely go to outer
                    space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a
                    truly out of this world experience!</div>
            </div>
            <router-link to="/dest" class="b-right mx-auto mt-20 lg:m-auto">
                <div class="bg-white w-[270px] h-[270px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-[0_0_0_88px_rgba(255,255,255,0.1)]">
                    <div class="text-preset-4 blue-900">EXPLORE</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    width: 100%;
    background-image: url(../assets/Render-1.jpg);
    background-position: center;
    background-size: cover;
}

@media (max-width:1100px) {
    .container{
        padding: 130px 40px;
    }   
}
</style>
<script setup lang="ts">
import { ref } from 'vue';

const isDark = ref(false); //預設淺色模式
const darkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        // 增加 classlist, 沒辦法直接匯入base.css資訊，要在下方再寫一次
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    };
};
</script>

<template>
    <!-- 利用無障礙性: nav、main、selection、article -->
    <nav class="navbar">
        <RouterLink to="/" class="title">
            <h1>Where in the world?</h1>
        </RouterLink>
        <button type="button" class="mode" @click="darkMode">
            <span><ion-icon name="moon-outline"></ion-icon></span>
            <span>Dark Mode</span>
        </button>
    </nav>
    <RouterView />
</template>

<style>
:root {
    --color-back: hsl(0, 0%, 99%);
    --color-ele: hsl(0, 100%, 100%);
    --color-text: hsl(200, 15%, 8%);
    --color-input: hsl(0, 0%, 50%);
    --color-hover-bg: hsl(207, 26%, 17%);
    --color-hover-text: hsl(0, 100%, 100%);
}

body.dark-mode {
    --color-back: hsl(207, 26%, 17%);
    --color-ele: hsl(209, 23%, 22%);
    --color-text: hsl(0, 100%, 100%);
    --color-hover-bg: hsl(0, 0%, 99%);
    --color-hover-text: hsl(200, 15%, 8%);
}

* {
    box-sizing: border-box;
}

body {
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
}

span{
    font-size: var(--size-base);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 80px;
    box-shadow: var(--shadow);
}

.title {
    text-decoration: none;
    cursor: pointer;
}

.mode {
    background-color: transparent;
    height: 60px;
    border: 0.5px solid rgba(159, 159, 159, 0.5);
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    color: var(--color-text);
}

.mode:hover {
    background-color: var(--color-hover-bg);
    color: var(--color-hover-text);
}

@media (max-width:768px) {
    .navbar{
        padding: 20px;
    }
    .mode{
        height: 40px;
        padding: 0 10px;
    }
}

@media (max-width:425px) {
    .navbar{
        padding: 10px;
    }
}
</style>

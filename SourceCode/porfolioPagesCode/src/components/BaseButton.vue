<script setup lang="ts">
const props = defineProps<{
    icon?: string,
    name?: string,
    path?: string,
    theme?: 'default' | 'hover' | 'focus',
}>();

const getImgUrl = (name: string) => {
    return new URL(`../assets/icon/${name}.svg`, import.meta.url).href
};
</script>

<template>
    <button type="button" class="title-main" :class="theme">
        <img v-if="icon" :src="getImgUrl(icon)" alt="icon">
        <span>{{ name }}</span>
        <!-- 讓組件知道如果要另外寫東西進來要放在這裡 => projectproblemcard的button按鍵使用 -->
        <slot />
    </button>
</template>

<style scoped>
button {
    background-color: var(--white);
    border: 0.5px solid var(--border-color);
    border-radius: 20px;
    padding: 0 20px ;
    height: 50px;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
}

/* 設置預設的形式，若之後要改再其他地方做變更 */
button:hover {
    background-color: var(--btn-bg, var(--border-color));
    color: var(--btn-text, var(--white));
}

button:focus,
button.focus {
    background-color: var(--btn-bg, var(--black));
    color: var(--btn-text, var(--white));
}

img {
    padding: 5px 5px 2px 5px;
}

/* 用 filter 效果，讓 icon 變白色 */
button:hover img,
button:focus img,
button.focus img {
    /* brightness 將顏色都變黑的，再用 invert 反轉變成白色 */
    filter: brightness(0) invert(1);
}

@media (max-width:1000px) {
    span{
        font-size: var(--font-size-14);
    }
}
</style>
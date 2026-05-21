<script setup lang="ts">
const props = defineProps<{
    icon?: string,
    name?: string,
    path?: string,
    theme?: 'default' | 'hover' | 'focus',
}>();

const getImgUrl = (name: string) => {
    return new URL(`${import.meta.env.BASE_URL}icon/${name}.svg`, import.meta.url).href
};
</script>

<template>
    <button type="button" class="title-main" :class="theme">
        <img v-if="icon" :src="getImgUrl(icon)" alt="icon">
        <span>{{ name }}</span>
        <slot />
    </button>
</template>

<style scoped>
button {
    background-color: var(--white);
    color: var(--color-text);
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

button:hover img,
button:focus img,
button.focus img {
    filter: brightness(0) invert(1);
}

@media (max-width:1000px) {
    span{
        font-size: var(--font-size-14);
    }
}
</style>
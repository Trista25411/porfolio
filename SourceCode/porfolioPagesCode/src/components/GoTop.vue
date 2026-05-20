<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const isVisible = ref(false);
const isAtFooter = ref(false);

const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    isVisible.value = scrollY > 200;
    if (documentHeight - (scrollY + windowHeight) < 400) {
        isAtFooter.value = true;
    } else {
        isAtFooter.value = false;
    };
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

</script>

<template>
    <div v-if="isVisible" class="gotop-container" :class="{ 'is-stop-footer': isAtFooter }" @click="scrollToTop">
        <div class="go-top">TOP↑</div>
        <img src="../assets/pic/gotop.png" alt="gotop" class="gotop-pic">
    </div>
</template>

<style scoped>
.gotop-container {
    width: 200px;
    position: fixed;
    bottom: 5px;
    right: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 1s ease;
}

.gotop-container:hover {
    animation: jump 0.5s infinite;
}

@keyframes jump {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.gotop-pic {
    width: 50%;
}

.go-top {
    background-color: var(--green);
    color: var(--white);
    border: 1px solid var(--tech-yellow);
    border-radius: 20px;
    box-shadow: 2px 5px 8px var(--border-color);
    text-align: center;
    padding: 10px 15px;
    display: none;
}

.gotop-container:hover .go-top {
    display: block;
}

.is-stop-footer {
    position: fixed;
    bottom: 400px;
    right: 0;
}

@media (max-width:860px) {
    .gotop-container {
        width: 100px;
        height: auto;
    }

    .gotop-container:hover {
        animation: none;
    }

    .gotop-pic {
        width: 80%;
    }

    .is-stop-footer {
        bottom: 250px;
    }
}
</style>
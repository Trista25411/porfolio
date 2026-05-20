<script setup lang="ts">
import type { ProjectItem } from '@/data/projectcard';

defineProps<{
    item: ProjectItem;
}>();

const getImgUrl = (name: string) => {
    return `${import.meta.env.BASE_URL}pic/project/${name}.jpg`;
};
</script>

<template>
    <div v-if="item" class="project-container">
        <div class="card">
            <div class="top">
                <div class="left">
                    <img v-if="item.logo" :src="getImgUrl(item.logo)" alt="project-logo" class="logo">
                    <div class="ts-big">{{ item.title }}</div>
                </div>
            </div>
            <img :src="getImgUrl(item.pic)" alt="project-pic" class="pic">
            <div class="btm">
                <div class="intr-area">
                    <!-- 使用 p 和 v-for 生成 intr 陣列中不同行文字 -->
                    <!-- 原理： 找出item.intr的陣列，存入line中，並在陣列中有幾筆資料就生成幾個 p，之後拿出{{ line }} 已是純文字，所以不會有陣列出現 -->
                    <!-- 若直接用{{ item.intr }}會直接出現陣列資料 -->
                    <p v-for="(line, index) in item.intr" :key="index" class="intr ts-big">{{ line }}</p>
                </div>
                <div v-if="item.source[0].name" class="ts">
                    <span>來源：</span>
                    <span v-for="src in item.source" :key="src.name">{{ src.name }}</span>
                </div>
                <div class="tag-area">
                    <span v-for="tag in item.tech" :key="tag.name" class="ts tag">{{ tag.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    color: var(--color-text);
}

button {
    padding-bottom: 0;
}

button:hover {
    --btn-bg: var(--sage);
    --btn-text: var(--black);
}

.project-container {
    background-color: var(--cornflower);
    width: 500px;
    border-radius: 30px;
}

.project-container:hover {
    transition: 0.5s ease;
    box-shadow: 0 30px 40px rgba(0, 0, 0, 0.15);
}

.card {
    cursor: pointer;
}

.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    gap: 20px;
}

.left {
    display: flex;
    align-items: center;
    gap: 18px;
}

.logo {
    background-color: lemonchiffon;
    width: 50px;
    height: 50px;
    border-radius: 10px;
}

.demo {
    background-color: #6E7891;
    color: var(--white);
    border-radius: 5px;
    border: 1px solid var(--black);
    padding: 15px;
}

.pic {
    background-color: rgb(173, 194, 173);
    width: 100%;
}

.btm {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 40px 40px;
}

.intr-area {
    height: 120px;
}

.intr {
    padding-bottom: 5px;
}


.tag-area {
    height: 65px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.tag {
    background-color: var(--tech-yellow);
    padding: 5px 15px;
    border-radius: 20px;
}

@media (max-width:1350px) {
    .project-container {
        width: 350px;
    }

    .btm {
        padding: 10px 25px 25px;
    }

    .intr-area {
        height: 100px;
    }

    .tag {
        font-size: var(--font-size-14);
        padding: 5px 10px;
    }

    .demo :deep(span) {
        display: none;
    }
}

@media (max-width:900px) {
    .project-container {
        width: 350px;
    }

    .demo {
        padding: 0;
    }
}

@media (max-width:500px) {
    .project-container {
        width: 250px;
    }

    .demo {
        display: none;
    }
}
</style>
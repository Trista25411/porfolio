<script setup lang="ts">
import { ref } from 'vue';
import { Project } from '@/data/projectcard';

const isProjectOpen = ref(false);
const isMenuOpen = ref(false);

// 匯入資料夾 icon 圖示
const getImgUrl = (name: string) => {
    return new URL(`../assets/icon/${name}.svg`, import.meta.url).href
};

const navItems = ([
    { icon: 'about', iconFocus: 'about-black', name: '關於我', path: '/#about' },
    { icon: 'skill', iconFocus: 'skill-black', name: '技能與專長', path: '/#skill' },
    { icon: 'projects', iconFocus: 'projects-black', name: '專案作品', path: '/#projects' },
    { icon: 'life', iconFocus: 'life-black', name: '生活日常', path: '/#life' },
    { icon: 'contact', iconFocus: 'contact-black', name: '與我聯繫', path: '#contact' },
]);
</script>

<template>
    <div class="container">
        <button type="button" class="ham" @click="isMenuOpen = !isMenuOpen">
            <ion-icon :name="isMenuOpen ? 'close-outline' : 'menu-outline'" class="ham-btn"></ion-icon>
        </button>
        <!--                                                   點選 nav 中的某個東西，自動把 navbar 給隱藏 -->
        <div class="nav-area" :class="{ 'show': isMenuOpen }" @click="isMenuOpen = false">
            <div class="link">
                <RouterLink to="/">
                    <span class="full-logo">TRISTA的作品集</span>
                    <span class="mini-logo">Trista</span>
                </RouterLink>
            </div>

            <h2 v-for="item in navItems" :key="item.name" class="nav-group"
                @mouseenter="item.name === '專案作品' ? isProjectOpen = true : null"
                @mouseleave="item.name === '專案作品' ? isProjectOpen = false : null">
                <RouterLink class="list" :to="item.path" active-class="nav-active">
                    <img :src="getImgUrl(item.icon)" alt="item.name" class="icon-default">
                    <img :src="getImgUrl(item.iconFocus)" alt="item.name" class="icon-active">
                    <span class="text">{{ item.name }}</span>
                </RouterLink>

                <Transition name="slide">
                    <div v-if="item.name === '專案作品' && isProjectOpen" class="project-list">
                        <RouterLink v-for="proj in Project" :key="proj.id" :to="`/projects/${proj.id}`"
                            class="ts-big proj-item" active-class="active-proj"> {{ proj.title }}
                        </RouterLink>
                    </div>
                </Transition>
            </h2>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: var(--nafo-white);
    width: 300px;
    min-height: 100vh;
    border-right: 1px solid var(--bg-white);
}

/* 因routerlink是在.container裡面的 a，用routerlink來寫並不會變化 */
.container a {
    text-decoration: none;
    color: var(--color-text);
    letter-spacing: 0.03em;
    /* figma 3% */
}

.ham {
    display: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 10px 20px;
}

.ham-btn {
    width: 30px;
    height: 30px;
}

.nav-area {
    display: flex;
    /* flex-direction: column; */
    gap: 35px;
    padding: 80px 0 80px 30px;
    position: fixed;
}

.link a {
    font-family: var(--font-family-name);
    font-size: 26px;
    display: flex;
}

.mini-logo {
    display: none;
    width: 100px;
    height: 40px;
    text-align: center;
    border-radius: 30px;
}

.list {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 250px;
}

.list:hover,
.list:focus,
.proj-item:hover {
    border-bottom: 2px solid black;
    padding-bottom: 5px;
    font-weight: bold;
}

.icon-default,
.icon-active {
    width: 30px;
    height: 30px;
}

.icon-default {
    display: block;
}

.icon-active {
    display: none;
}

.list:hover .icon-default,
.list:focus .icon-default {
    display: none;
}

.list:hover .icon-active,
.list:focus .icon-active {
    display: block;
}

.project-list {
    display: flex;
    flex-direction: column;
    margin: 15px 15px 0 15px;
    gap: 12px;
    border-left: 1px solid var(--border-color);
    padding-left: 20px;
    position: absolute;
    background: var(--nafo-white);
}

@media (max-width:1650px) {
    .container {
        width: 100%;
        min-height: auto;
        position: fixed;
        z-index: 10;
        border-bottom: 1px solid var(--border-color);
    }

    .full-logo {
        display: none;
    }

    .mini-logo {
        display: block;
    }

    .nav-area {
        position: static;
        /* flex-direction: row; */
        padding: 10px 30px;
        display: flex;
        align-items: center;
    }

    .nav-area:hover {
        align-items: start;
    }

    .nav-group {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .project-list {
        position: static;
    }

    .list {
        width: auto;
        padding-right: 5px;
    }

    .text {
        font-size: var(--font-size-16);
    }
}

@media (max-width:1100px) {
    .list:hover .text {
        display: block;
    }

    .text {
        display: none;
    }

    .nav-group:hover .text {
        display: block;
    }
}

@media (max-width:700px) {
    .ham {
        display: block;
    }

    .nav-area {
        display: none;
        padding: 0;
    }

    .nav-area.show {
        display: block;
        width: 100%;
        position: absolute;
        top: 50px;
        left: 0;
        background-color: var(--nafo-white);
    }

    .mini-logo {
        display: none;
    }

    .nav-group {
        border-bottom: 1px solid var(--border-color);
        padding: 10px 0 10px 20px;
    }

    .text {
        display: block;
        font-size: var(--font-size-18);
    }

    .list:hover,
    .list:focus,
    .proj-item:hover {
        border: none;
    }
}
</style>
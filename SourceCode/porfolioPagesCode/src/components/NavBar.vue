<script setup lang="ts">
import { ref, watch } from 'vue';
import { Project } from '@/data/projectcard';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// const isProjectOpen = ref(false);
const isMenuOpen = ref(false);
// 手機版點擊切換
const isProjectOpen = ref(false);

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

//﹝專案作品﹞ 點擊行為
const handleNavClick = (itemName: string, itemPath: string, e: Event) => {
    if (itemName === '專案作品') {
        // 停止預設跳轉
        e.preventDefault();

        if (route.path === '/') {
            // 若在首頁，點擊專案作品跳轉到首頁專案區塊
            const element = document.getElementById('projects');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            isMenuOpen.value = false;
        } else {
            // 在某專案內頁時，點擊專案作品改為打開/關閉 project-list
            isProjectOpen.value = !isProjectOpen.value;
        }
    } else {
        // 點選其他按鈕，關閉重置
        isMenuOpen.value = false;
        isProjectOpen.value = false;
    }
};

// 點擊下拉選單某專案切換過去後，選單自動收回
const handleProjectItemClick = () => {
    isMenuOpen.value = false;
    isProjectOpen.value = false;
};

// 切換頁面就重置所有選單狀態
watch(() => route.path, () => {
    isMenuOpen.value = false;
    isProjectOpen.value = false;
})
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

                <RouterLink class="list" :to="item.path" active-class="nav-active"
                    @click="handleNavClick(item.name, item.path, $event)">
                    <img :src="getImgUrl(item.icon)" alt="item.name" class="icon-default">
                    <img :src="getImgUrl(item.iconFocus)" alt="item.name" class="icon-active">
                    <span class="text ts-big">{{ item.name }}</span>
                </RouterLink>

                <div v-if="item.name === '專案作品' && isProjectOpen" class="project-list">
                    <RouterLink v-for="proj in Project" :key="proj.id" :to="`/projects/${proj.id}`"
                        class="ts-big proj-item" active-class="active-proj"> {{ proj.title }}
                    </RouterLink>
                </div>
            </h2>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: var(--nafo-white);
    width: 100%;
    height: 70px;
    position: fixed;
    z-index: 10;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
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
    align-items: center;
    width: 100%;
    gap: 35px;
    padding: 0 40px;
}

.nav-group {
    position: relative;
    display: flex;
    flex-direction: column;
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
    padding: 20px 0;
}

.list:hover,
.list:focus,
.proj-item:hover {
    border-bottom: 2px solid black;
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
    background-color: var(--nafo-white);
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 1px solid var(--border-color);
    border-top: none;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
    padding: 20px;

    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 250px;
}

.proj-item {
    /* 不讓名稱過長折行 */
    white-space: nowrap;
}

@media (max-width:1650px) {
    .full-logo {
        display: none;
    }

    .mini-logo {
        display: block;
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
        position: relative;
    }

    .nav-area {
        display: none;
        padding: 0;
    }

    .nav-area.show {
        background-color: var(--nafo-white);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        position: fixed;
        top: 50px;
        left: 0;
        gap: 0;
        padding-top: 20px;
        height: calc(100vh - 70px);
        overflow-y: auto;
    }

    .mini-logo {
        display: none;
    }

    .nav-group {
        width: 100%;
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
        border-bottom: none;
    }

    .project-list {
        position: static;
        transform: none;
        border: none;
        background-color: transparent;
        box-shadow: none;
        border-left: 1px solid var(--border-color);
        margin: 10px 0 0 20px;
    }

    .project-list.mobile-show {
        display: flex;
    }
}
</style>
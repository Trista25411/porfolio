<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import ProjectProblemCard from '@/components/ProjectProblemCard.vue';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { Project } from '../data/projects';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeDeviceIdx = ref<number | null>(null);
const activeImgIdx = ref<number | null>(null);

const projectId = computed(() => Number(route.params.id));
const currentProject = computed(() => {
    return Project.find(p => p.id === projectId.value);
});

const baseUrl = import.meta.env.BASE_URL;
const getImgUrl = (name: string) => {
    return `${baseUrl}pic/project/${name}.jpg`;
};
const getImgIcon = (iconName: string) => {
    return `${baseUrl}icon/${iconName}.svg`;
};
const getRwdUrl = (name: string) => {
    return `${baseUrl}pic/project/${name}.png`;
};

const currentOverlay = computed(() => {
    if (activeDeviceIdx.value !== null && activeImgIdx.value !== null) {
        return currentProject.value?.RWD[activeDeviceIdx.value].img[activeImgIdx.value];
    };
    return null;
});

const isFirstImg = computed(() => {
    return activeDeviceIdx.value === 0 && activeImgIdx.value === 0;
});

const isLastImg = computed(() => {
    if (activeDeviceIdx.value === null || !currentProject.value) return true;
    const lastDeviceIdx = currentProject.value.RWD.length - 1;
    const lastImgIdx = currentProject.value.RWD[lastDeviceIdx].img.length - 1;
    return activeDeviceIdx.value === lastDeviceIdx && activeImgIdx.value === lastImgIdx;
});

const openOverlay = (dIdx: number, iIdx: number) => {
    activeDeviceIdx.value = dIdx;
    activeImgIdx.value = iIdx;
};
const closeOverlay = () => {
    activeDeviceIdx.value = null;
    activeImgIdx.value = null;
};

const nextImg = () => {
    if (isLastImg.value || activeDeviceIdx.value === null || activeImgIdx.value === null) return;
    const device = currentProject.value?.RWD[activeDeviceIdx.value];
    if (device && activeImgIdx.value < device.img.length - 1) {
        activeImgIdx.value++;
    } else {
        activeDeviceIdx.value++;
        activeImgIdx.value = 0;
    };
};
const prevImg = () => {
    if (isFirstImg.value || activeDeviceIdx.value === null || activeImgIdx.value === null) return;
    if (activeImgIdx.value > 0) {
        activeImgIdx.value--;
    } else {
        activeDeviceIdx.value--;
        activeImgIdx.value = currentProject.value!.RWD[activeDeviceIdx.value].img.length - 1;
    };
};

// 鍵盤與滑鼠操作
const handleKey = (e: KeyboardEvent) => {
    if (activeDeviceIdx.value === null) return;
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'Escape') closeOverlay();
};

// 監控裝置索引是否開啟大圖
watch(activeDeviceIdx, (newVal: number | null) => {
    document.body.style.overflow = newVal !== null ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', handleKey));
onUnmounted(() => window.removeEventListener('keydown', handleKey));
</script>

<template>
    <main v-if="currentProject" class="container">
        <section id="home">
            <RouterLink to="/">
                <BaseButton icon="left" name="回首頁" class="back" />
            </RouterLink>
            <div class="link">
                <a v-for="item in currentProject.links" :href="item.link" target="_blank">
                    <BaseButton :name="item.name" class="ts" />
                </a>
            </div>
        </section>

        <section id="title">
            <div class="name">
                <h1>{{ currentProject.title }}</h1>
                <div v-if="currentProject.source[0].name" class="ts-big">
                    <span>來源：</span>
                    <a v-for="src in currentProject.source" :key="src.name" :href="src.link" target="_blank">{{ src.name
                    }}</a>
                </div>
            </div>
            <img :src="getImgUrl(currentProject.pic)" alt="project-img">
        </section>

        <section id="tech">
            <h2>
                <ion-icon name="chevron-forward-outline"></ion-icon>
                <span>語言及框架</span>
            </h2>
            <div class="stack">
                <div v-for="item in currentProject.tech" class="language">
                    <img :src="getImgIcon(item.icon)" alt="">
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </section>

        <section id="motivation">
            <h2>
                <ion-icon name="chevron-forward-outline"></ion-icon>
                <span>製作動機與學習歷程</span>
            </h2>
            <div class="title-main">
                <div class="mot">{{ currentProject.motivation }}</div>
                <div v-for="his in currentProject.history" class="his">{{ his }}</div>
            </div>
        </section>

        <section id="challenge">
            <h2 class="problem">
                <ion-icon name="chevron-forward-outline"></ion-icon>
                <span>問題與解決方式</span>
            </h2>
            <ProjectProblemCard v-if="currentProject && currentProject.challenge" :items="currentProject.challenge" />
        </section>

        <section id="rwd">
            <h2>
                <ion-icon name="chevron-forward-outline"></ion-icon>
                <span>圖示 (點擊放大查看)</span>
            </h2>
            <div class="link">
                <a v-for="item in currentProject.links" :href="item.link" target="_blank">
                    <BaseButton :name="item.name" class="ts" />
                </a>
            </div>
            <div class="rwd-container">
                <div v-for="(item, dIdx) in currentProject.RWD" class="rwd-area">
                    <div class="rwd-name">{{ item.name }}</div>
                    <div class="img-group">
                        <img v-for="(imgPath, iIdx) in item.img" :src="getRwdUrl(imgPath)" :alt="item.name"
                            class="rwd-img" @click="openOverlay(dIdx, iIdx)">
                    </div>
                </div>
            </div>
            <Transition name="fade">
                <div v-if="currentOverlay" class="overlay" @click.self="closeOverlay">
                    <button v-show="!isFirstImg" type="button" class="btn prev" @click="prevImg">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </button>
                    <div class="overlay-content">
                        <img :src="getRwdUrl(currentOverlay)" alt="">
                    </div>
                    <button v-show="!isLastImg" type="button" class="btn next" @click="nextImg">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </button>
                    <button type="button" class="close-btn" @click="closeOverlay">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
            </Transition>
        </section>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 100px;
    padding: 30px 80px;
}

.container a {
    text-decoration: none;
}

#home {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
}

.back {
    border: 1px solid var(--border-color);
}

.link {
    display: flex;
    gap: 30px;
}

.link :deep(button) {
    background-color: rgb(162, 162, 203);
    color: var(--white);
    border-radius: 50px;
}

.name {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.name a {
    text-decoration: underline;
}

#title {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: -50px;
}

#title img {
    background-position: center;
    background-size: cover;
    width: 65%;
    border-radius: 20px;
}

.title-full {
    display: none;
}

#tech,
#motivation,
#challenge,
#rwd {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.stack {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
}

.language {
    background-color: var(--tech-yellow);
    display: flex;
    gap: 10px;
    border-radius: 60px;
    padding: 20px;
}

.mot {
    margin-bottom: 20px;
}

.his {
    padding-bottom: 5px;
}

.rwd-container {
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
}

.rwd-area {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.rwd-name {
    display: flex;
    justify-content: center;
}

.img-group {
    display: flex;
    align-items: start;
    justify-content: center;
}

.rwd-img {
    background-color: rgba(0, 0, 0, 0.03);
    height: 500px;
    object-fit: contain;
    object-position: top;
    margin-left: 10px;
    cursor: pointer;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay-content {
    height: 100%;
    overflow-y: auto;
    /* 隱藏滑動條 */
    scrollbar-width: none;
    padding-top: 80px;
}

.overlay-content img{
    width: 100%;
    max-width: 800px;
    height: auto;
    object-fit: contain;
}

.btn {
    position: absolute;
    background-color: var(--white);
    color: var(--black);
    width: 60px;
    height: 60px;
    font-size: var(--font-size-24);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.btn:hover,
.close-btn:hover {
    background-color: var(--white);
    color: var(--black);
}

.prev {
    left: 30px;
    top: 50%;
}

.next {
    right: 30px;
    top: 50%;
}

.close-btn {
    position: absolute;
    top: 12%;
    right: 5%;
    font-size: var(--font-size-36);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 1px 1px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

@media (max-width:1500px) {

    .btn,
    .close-btn {
        width: 50px;
        height: 50px;
    }

    .close-btn {
        top: 15%;
    }
}

@media (max-width:1200px) {
    .rwd-container {
        display: block;
    }

    .img-group {
        padding-bottom: 50px;
    }

    .rwd-img {
        width: 80%;
    }
}

@media (max-width:800px) {
    .container {
        padding: 30px 50px 0 50px;
        gap: 40px;
    }

    .link :deep(span) {
        font-size: var(--font-size-14);
    }

    #title {
        margin: 0;
    }

    #title img {
        width: 80%;
    }
}

@media (max-width:600px) {
    .container {
        padding: 30px 30px 0 30px;
        gap: 40px;
    }

    #home,
    .name {
        flex-direction: column;
        gap: 30px;
    }

    .name {
        align-items: start;
    }

    #title img {
        width: 100%;
    }

}
</style>
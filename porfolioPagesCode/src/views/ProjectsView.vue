<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import ProjectProblemCard from '@/components/ProjectProblemCard.vue';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { Project } from '../data/projectcard';
import { useRoute } from 'vue-router';

const route = useRoute();
// 設定預設索引值
// activeDeviceIdx : 裝置索引值 => pc = 0、tablet = 1、phone = 2
// activeImgIdx： 裝置下白天模式跟黑夜模式的索引值 => white = 0、black = 1
const activeDeviceIdx = ref<number | null>(null);
const activeImgIdx = ref<number | null>(null);

// 將 ID 轉換為數字
const projectId = computed(() => Number(route.params.id));
// 網頁中載入 data ，並找出對應的資料
const currentProject = computed(() => {
    return Project.find(p => p.id === projectId.value);
});
// 取得 title picture
const getImgUrl = (name: string) => {
    return new URL(`../assets/pic/project/${name}.jpg`, import.meta.url).href;
};
// 取得 tech icon
const getImgIcon = (iconName: string) => {
    return new URL(`../assets/icon/${iconName}.svg`, import.meta.url).href;
};
// 取得 rwd img
const getRwdUrl = (name: string) => {
    return new URL(`../assets/pic/project/${name}.png`, import.meta.url).href;
};

// 確保使用者有確切點選某張圖片，value不等於null的時候變化
const currentOverlay = computed(() => {
    if (activeDeviceIdx.value !== null && activeImgIdx.value !== null) {
        // 要確切的知道試點選哪一張圖片
        // 是否點選圖片，是RWD裝置圖片裡面的[哪一個裝置]中[白天還是黑夜]的圖
        return currentProject.value?.RWD[activeDeviceIdx.value].img[activeImgIdx.value];
    };
    return null;
});
// 判斷是否為第一張或是最後一張圖片，來決定是否隱藏 button prev、next
const isFirstImg = computed(() => {
    return activeDeviceIdx.value === 0 && activeImgIdx.value === 0;
});
const isLastImg = computed(() => {
    // if 後若只有一段程式碼，{} 可以省略
    // !currentProject => 在currentProject有資料的時候
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
    // 如果 device 是空的，這整行判斷就會變成 false ，若沒有設device &&，後面的device會報錯，因為若沒有讀取到資料會是underfined 網頁會跳不出來，ts有疑慮
    if (device && activeImgIdx.value < device.img.length - 1) {
        // value值增加，圖的索引數值變更時，就會自動換圖 (div有綁定變數)
        activeImgIdx.value++;
    } else {
        // 換下一個裝置，圖片索引值歸零
        activeDeviceIdx.value++;
        activeImgIdx.value = 0;
    };
};
const prevImg = () => {
    if (isFirstImg.value || activeDeviceIdx.value === null || activeImgIdx.value === null) return;
    if (activeImgIdx.value > 0) {
        activeImgIdx.value--;
    } else {
        // 要從這個裝置跳回上一個裝置最後一個圖
        activeDeviceIdx.value--;
        activeImgIdx.value = currentProject.value!.RWD[activeDeviceIdx.value].img.length - 1;
    };
};

// 鍵盤與滑鼠操作
const handleKey = (e: KeyboardEvent) => {
    if (activeDeviceIdx.value === null) return;
    // 'ArrowRight'、'ArrowLeft'、'Escape' 是瀏覽器控制的固定用法不能隨意變換
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'Escape') closeOverlay();
};

// 監控裝置索引是否開啟大圖
watch(activeDeviceIdx, (newVal: number | null) => {
    // 圖片放大，將背景的捲動條隱藏，不要跟著滑動，關閉時恢復滾動
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
                    <BaseButton :name="item.name" />
                </a>
            </div>
        </section>

        <section id="title">
            <h1 class="name">{{ currentProject.title }}</h1>
            <img :src="getImgUrl(currentProject.pic)" alt="project-img">
            <!-- :class="{ 'title-full': !(currentProject).pic }" -->
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
            <!-- ProjectProblemCard 內部定義了 v-if="items && items.length > 0"，但什麼都沒傳 -->
            <!-- 要從 currentProject 中提取出 challenge 的陣列傳給它 -->
            <ProjectProblemCard v-if="currentProject && currentProject.challenge" :items="currentProject.challenge" />
        </section>

        <section id="rwd">
            <h2>
                <ion-icon name="chevron-forward-outline"></ion-icon>
                <span>RWD圖示 (點擊放大查看)</span>
            </h2>
            <div class="link">
                <a v-for="item in currentProject.links" :href="item.link" target="_blank">
                    <BaseButton :name="item.name" />
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
    padding: 80px;
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

#title {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

#title img {
    background-color: lightblue;
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
    justify-content: space-around;
    gap: 50px;
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
    justify-content: center;
    align-items: start;
    gap: 30px;
}

.rwd-img {
    width: 300px;
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
    padding-top: 250px;
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
}

.next {
    right: 30px;
}

.close-btn {
    position: absolute;
    top: 10%;
    right: 5%;
    font-size: var(--font-size-36);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 1px 1px 8px;
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
        padding: 80px 50px 0 50px;
        gap: 40px;
    }

    .link :deep(span) {
        font-size: var(--font-size-14);
    }

    #title img {
        width: 80%;
    }
}

@media (max-width:600px) {
    .container {
        padding: 80px 30px 0 30px;
        gap: 40px;
    }

    #home {
        flex-direction: column;
        gap: 30px;
    }

    #title img {
        width: 100%;
    }
}
</style>
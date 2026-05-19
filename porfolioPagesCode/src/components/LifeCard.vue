<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import BaseButton from './BaseButton.vue';
import { allPhotos } from '../data/lifecard';

// 設定預設圖片數量
const activeCategory = ref('全部');
const getInitial = () => {
    const width = window.innerWidth
    if (width < 650) return 1;
    if (width < 1200) return 2;
    if (width < 1900) return 3;
    if (width < 2200) return 4;
    if (width < 2500) return 5;
    return 6;
};
// 預設圖片隨著視窗大小變化
const showLimit = ref(getInitial());
// 原先進入伺服器只會載入一次，因要隨著視窗大小，要跟著一起變動
const handleReize = () => {
    if (!isAllShow.value) {
        showLimit.value = getInitial();
    };
};

onMounted(() => {
    window.addEventListener('resize', handleReize)
});
// vue 跳轉還會在伺服器中，要隨時刪掉不然會積太多導致電腦運轉不順
onUnmounted(() => {
    window.removeEventListener('resize', handleReize)
});

// tags
const lifeItems = ([
    { icon: 'camera', name: '全部' },
    { icon: 'scenery', name: '風景' },
    { icon: 'food', name: '美食' },
    { icon: 'handmade', name: '手作' },
]);

const getImgUrl = (name: string) => {
    // 原先寫法: return new URL(`../assets/pic/life/${name}.jpeg`, import.meta.url).href;
    // 但系統抓取不到顯示404 undfineds => Vite 有時候會因為太過「精簡」，導致在靜態分析時沒辦法確定基礎路徑起點在哪裡，特別是在 Storybook 這種多層環境下，它解析出來的路徑就會變成undefined`。
    // 明確地把路徑字串先賦值給變數，提高編譯器成功解析「相對路徑」的機率
    const path = `../assets/pic/life/${name}.jpeg`;
    return new URL(path, import.meta.url).href;
};

// 類別篩選
const filterPhotos = computed(() => {
    if (activeCategory.value === '全部') {
        return shuffle(allPhotos);
    }
    return allPhotos.filter(p => p.category === activeCategory.value)
});

const displayPhotos = computed(() => {
    return filterPhotos.value.slice(0, showLimit.value);
});

// 判斷是否已全部顯示
const isAllShow = computed(() => {
    return showLimit.value >= filterPhotos.value.length
});

const toggleShow = () => {
    if (isAllShow.value) {
        showLimit.value = getInitial();
    } else {
        // 一開始顯示的圖片數量大於 2，每次點擊『查看更多』就增加跟初始數量一樣多的張數；
        // 若初始數量小於或等於 2 （例如手機版只顯示 1 張），那每次就固定增加 4 張
        // 一樣是用 => 條件 ? 成立時的結果 : 不成立時的結果
        const step = getInitial() > 2 ? getInitial() : 3;
        showLimit.value += step;
    };
};

// 設定點選類別回歸預設圖片張數
watch(activeCategory, () => {
    showLimit.value = getInitial();
});

// 設置亂數顯示圖片
// TypeScript
const shuffle = <T>(arr: T[]): T[] => {
    // 因原始資料的順序就已經被妳改掉了，使用[...arr] 複製一份複本出來，保持原始資料完整
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
};
</script>

<template>
    <div class="life-container">
        <div class="tags title-main">
            <BaseButton v-for="item in lifeItems" :icon="item.icon" :name="item.name"
                :theme="activeCategory === item.name ? 'focus' : 'default'" @click="activeCategory = item.name" />
        </div>
        <div class="lifecards">
            <div v-for="item in displayPhotos" :key="item.id" :class="['card', item.size]">
                <div class="img-box">
                    <img :src="getImgUrl(item.pic)" alt="pic">
                </div>
                <div class="card-text">{{ item.text }}</div>
            </div>
        </div>
        <div class="more-content">
            <div v-if="showLimit > getInitial()" @click="showLimit = getInitial()" class="more">
                <span class="more-text">收起內容</span>
                <ion-icon name="chevron-up-outline"></ion-icon>
            </div>
            <div v-if="!isAllShow && filterPhotos.length > getInitial()" @click="toggleShow" class="more">
                <span class="more-text">顯示更多</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
        </div>
    </div>
</template>

<style scoped>
.life-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
}

.lifecards {
    display: flex;
    /* 一行空間不夠就換行 */
    flex-wrap: wrap;
    gap: 40px 20px;
}

.card {
    /* 確保圖片不會被壓縮 */
    flex-shrink: 0;
}

.img-box img {
    width: 100%;
    border-radius: 20px;
}

.large {
    width: 300px;
}

.wide {
    width: 350px;
}

.card-text {
    padding: 5px;
}

.more-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.more {
    cursor: pointer;
    font-size: 18px;
    padding: 20px;
    transition: transform 0.4s ease;
}

.more:hover {
    transform: translateY(12px);
}

.more:hover .more-text,
.more:hover ion-icon {
    color: var(--green);
}

@media (max-width:700px) {
    .tags :deep(button) {
        height: auto;
        padding: 5px 15px 5px 10px;
    }

    .life-container,
    .tags {
        gap: 20px;
    }

    .large {
        width: 250px;
    }

    .wide {
        width: 300px;
    }
}
</style>
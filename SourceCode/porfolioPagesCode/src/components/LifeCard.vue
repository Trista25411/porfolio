<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import BaseButton from './BaseButton.vue';
import { allPhotos } from '../data/lifecard';

const moreRef = ref<HTMLElement | null>(null);
const lessRef = ref<HTMLElement | null>(null);
// 存放洗牌過後的所有照片
const shufflePhotos = ref([...allPhotos]);

const getImgUrl = (name: string) => {
    const path = `${import.meta.env.BASE_URL}pic/life/${name}.JPEG`;
    return path;
};

// 預設圖片數量
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

// 圖片隨著視窗大小變化
const showLimit = ref(getInitial());
const handleReize = () => {
    if (!isAllShow.value) {
        showLimit.value = getInitial();
    };
};

// tags
const lifeItems = ([
    { icon: 'camera', name: '全部' },
    { icon: 'scenery', name: '風景' },
    { icon: 'food', name: '美食' },
    { icon: 'handmade', name: '手作' },
]);

// 亂數顯示圖片
const shuffle = <T>(arr: T[]): T[] => {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
};

// 專門更新洗牌資料，防止每次點擊都要洗一次
const updateShuffledData = ()=>{
    shufflePhotos.value = shuffle(allPhotos);
};

// 類別篩選
const filterPhotos = computed(() => {
    if (activeCategory.value === '全部') {
        return shufflePhotos.value;
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

// 顯示更多按鍵
const toggleShow = () => {
    if (isAllShow.value) {
        showLimit.value = getInitial();
    } else {
        const step = getInitial() > 2 ? getInitial() : 3;
        showLimit.value += step;
    };
};

// 收起內容
const collpaseBtn = () => {
    showLimit.value = getInitial();
    setTimeout(() => {
        moreRef.value?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
};

// 點選類別回歸預設圖片張數
watch(activeCategory, () => {
    showLimit.value = getInitial();
    if (activeCategory.value === '全部') {
        updateShuffledData();
    }
});

onMounted(() => {
    window.addEventListener('resize', handleReize);
    // 進入畫面初始化洗牌一次
    updateShuffledData();
});

onUnmounted(() => {
    window.removeEventListener('resize', handleReize)
});
</script>

<template>
    <div ref="moreRef" class="life-container">
        <div class="tags title-main">
            <BaseButton v-for="item in lifeItems" :icon="item.icon" :name="item.name"
                :theme="activeCategory === item.name ? 'focus' : 'default'" @click="activeCategory = item.name" />
        </div>
        <div class="lifecards">
            <div v-for="item in displayPhotos" :key="item.id" :class="['card', item.size]">
                <div :class="['img-box', item.size]">
                    <img :src="getImgUrl(item.pic)" alt="pic">
                </div>
                <div class="card-text">{{ item.text }}</div>
            </div>
        </div>
        <div ref="lessRef" class="more-content">
            <div v-if="showLimit > getInitial()" @click="collpaseBtn" class="more">
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
    flex-wrap: wrap;
    gap: 40px 20px;
}

.card {
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
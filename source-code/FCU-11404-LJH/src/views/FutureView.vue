<script setup>
import { ref, computed } from 'vue';

// 匯入banner元件及圖片 
import Banner from '@/components/sections/Banner.vue';

// 引入「未來研究室」頁面所有尺寸的 Banner 圖片
import banner1920 from '@/assets/img/banner/future-banner-1920.png';
import banner1400 from '@/assets/img/banner/future-banner-1400.png';
import banner1200 from '@/assets/img/banner/future-banner-1200.png';
import banner996 from '@/assets/img/banner/future-banner-996.png';
import banner765 from '@/assets/img/banner/future-banner-765.png';
import banner576 from '@/assets/img/banner/future-banner-576.png';

// 建立要傳遞給 Banner 元件的 sources 陣列
const futureBannerSources = [
    { media: '(min-width: 1401px)', srcset: banner1920 },
    { media: '(min-width: 1201px)', srcset: banner1400 },
    { media: '(min-width: 997px)', srcset: banner1200 },
    { media: '(min-width: 766px)', srcset: banner996 },
    { media: '(min-width: 577px)', srcset: banner765 },
];

// 指定預設/最小尺寸的圖片
const futureDefaultBannerSrc = banner576;

// 匯入宣導輪播元件及圖片、json資料
import CaseCardCarousel from '@/components/CaseCardCarousel.vue';
import AwarenessData from '@/assets/data/future_awareness.json';

// 匯入影音輪播元件
import VideoCarousel from '@/components/VideoCarousel.vue';

// 匯入測驗輪播元件、橘色按鈕元件、JSON 資料
import InfoCardCarousel from '@/components/InfoCardCarousel.vue';
// 將 CategoryButton 替換為 FilterButton
import FilterButton from '@/components/button/FilterButton.vue';
import InfoData from '@/assets/data/future_test.json';
import IconExternal from '@/components/icons/external.vue';

// 匯入相關連結元件
import LearningAll from '@/components/pagesections/LearningAll.vue';

// 了解自己區塊
// 定義一個響應式變數來追蹤目前選取的類別
const activeCategory = ref('全部');
// 從 JSON 中提取所有不重複的類別
const categories = ['全部', ...new Set(InfoData.flatMap(section => section.items.map(item => item.category)))];

// 定義一個亂數排序的函式
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// 使用 computed 屬性來動態篩選卡片
const filteredCards = computed(() => {
    // 將所有卡片整合成一個一維陣列
    const allCards = InfoData.flatMap(section =>
        section.items.map(item => ({
            ...item,
            sectionTitle: section.sectionTitle,
        }))
    );
    // 如果 activeCategory 是 '全部'，則回傳所有亂數排序後的卡片
    if (activeCategory.value === '全部') {
        return shuffleArray(allCards);
    }
    // 否則，只回傳符合目前 activeCategory 的卡片（不亂數排序，因為分類後通常希望順序固定）
    return allCards.filter(card => card.category === activeCategory.value);
});

// 處理按鈕點擊事件
const selectCategory = (category) => {
    activeCategory.value = category;
};
</script>

<template>
    <Banner :sources="futureBannerSources" :default-src="futureDefaultBannerSrc" bigText="未來研究室"
        smallText="NextGen Lab" />

    <!-- 簡介 -->
    <div class="about row mx-auto">
        <div class="col-12 col-xxl-6 text-center text-xxl-start">
            <div class="text-h1 space-1">關於未來研究室</div>
            <div class="text-p">你的專屬成長實驗室，整合各種資訊網站，帶你探索自我的無限可能。</div>
        </div>
        <div class="col-12 col-xxl-6">
            <img src="../assets/img/future/future-draw.png" alt="">
        </div>
    </div>
    <div class="space-area"></div>

    <!-- 宣導 -->
    <div class="awareness-area c-bg-gray-area my-auto">
        <div class="awareness row mx-auto">
            <div class="col-12 space-1">
                <div class=" col-xl-10 text-h1 space-1">別覺得自己不會遇到！實際上都在身邊發生！</div>
                <div>←點選滑動向左，直接滑動向右→</div>
            </div>
            <div class="go-left-info col-12 col-xl-2 text-p pt-3 text-end mb-5 c-text-gray-icon">← 向左拉動查看</div>
        </div>
        <div class="awareness-carousel-wrapper">
            <CaseCardCarousel :awarenessData="AwarenessData" />
        </div>
    </div>
    <div class="space-2"></div>
    <div class="video c-bg-gray-area">
        <div class="video-container mx-auto">
            <div class="text-h1 space-1">影音酷搜</div>
            <div class="video-carousel-wrapper">
                <VideoCarousel />
            </div>
        </div>
    </div>

    <!-- 了解自己 -->
    <div class="understand c-bg-gray-area d-flex flex-column justify-content-center">
        <div class="under-content">
            <div class="text-h1 space-1 text-white">了解你自己</div>
            <div class="tag-area categories">
                <FilterButton v-for="category in categories" :key="category" :text="category"
                    @click="selectCategory(category)" :is-active="activeCategory === category" />
            </div>
            <div class="text-p text-white">
                <div class="test"></div>
                <div>我是誰？未來適合做什麼？測測看就知道！ </div>
                <div>提供多種有趣的心理測驗，從興趣、性向到職能特質，幫你一步步釐清自我，發掘潛力！</div>
                <div class="web">
                    <div>以下資訊點選將連結至外部網站進行測驗
                        <IconExternal class="c-icon-size-27" />
                    </div>
                </div>
            </div>
        </div>
        <InfoCardCarousel :cards="filteredCards" />
    </div>
    <div class="space-2"></div>

    <!-- 相關資源 -->
    <div class="connect-area c-bg-gray-area ">
        <div class="connect mx-auto">
            <div class="text-h1 space-1">相關資源連結</div>
            <LearningAll />
        </div>
    </div>
    <div class="space-2"></div>
</template>

<style scoped>
.awareness,
.connect {
    max-width: 1400px;
}

.aboout,
.awareness-area,
.video,
.understnad,
.connect-area {
    padding-bottom: 20px;
    padding: 0 45px;
}

/* 簡介 */
.about {
    width: 1400px;
}

.about img {
    width: 80%;
    margin: 0 auto;
    display: block;
}

.space-area {
    height: 250px;
    background-image: url(../assets/img/future/future-awareness/bg-gray.svg);
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
}

/* 影音 */
.video-container {
    max-width: 1400px;
}

/* 了解自己 ------------------------- */
.understand {
    height: 1340px;
    background-image: url(../assets/img/future/future-bg-orange.svg);
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 100px;
}

.under-content {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.web {
    margin: 50px 0;
}

/* 相關連結 */
.connect.mx-auto {
    padding-bottom: 35px;
}

.tag-area {
    margin-bottom: 24px;
}

/* 使用 :deep() 選擇器覆寫 FilterButton 樣式，達到反轉效果 */
/* 預設狀態 (反轉為 FilterButton 的 active 狀態) */
.tag-area :deep(.filter-button) {
    background-color: var(--color-orange-500);
    color: var(--color-white-base);
    border-color: var(--color-orange-light);
}

/* 啟用(active)與懸停(hover)狀態 (反轉為 FilterButton 的預設狀態，並使用指定的淡橘色邊框) */
.tag-area :deep(.filter-button.active),
.tag-area :deep(.filter-button:hover) {
    background-color: var(--color-blue-500);
    color: var(--color-white-base);
    border-color: var(--color-white-base);
}

@media (min-width:1024px) {
    .go-left-info {
        display: none;
    }
}

@media (max-width: 1399px) {
    .about {
        width: 100%;
    }

    .about .col-12 img {
        max-width: 50%;
        height: auto;
        margin-top: 80px;
    }
}
</style>
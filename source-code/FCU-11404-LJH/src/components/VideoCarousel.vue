<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 匯入影音元件及json
import eventVideoData from '@/assets/data/EventVideo.json';
// 匯入 CategoryButton 元件 
import CategoryButton from '@/components/button/CategoryButton.vue';

// 設定 Swiper 要使用的模組
const modules = [Pagination, Navigation];

// 從 YouTube URL 中提取影片 ID 的輔助函式
function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

// 直接篩選出所有「宣導」類型的影片
const filteredVideoCards = ref(eventVideoData.filter(video => video.category === '宣導與展覽').map((video, index) => ({
    id: index,
    videoId: getYouTubeId(video.link),
    category: video.category,
    title: video.title,
    categoryUrl: '#',
    titleUrl: '#',
    learnMoreUrl: '#',
    isLoaded: false // 新增 loading 狀態
})));

// 響應式斷點設定
const VideoBreakpoints = {
    // swiper.js用slidesPerView設置
    // 在 px以內(下方px數字) 的螢幕
    0: {
        slidesPerView: 1, // 一個卡片
        snapAlign: 'center',
        wrapAround: false,
    },
    // 在 px 以上的螢幕
    1600: {
        slidesPerView: 2, // 顯示三個卡片
        snapAlign: 'center',
        wrapAround: false,
    }
};
</script>

<template>
    <div class="video-carousel-wrapper">
        <swiper :space-between="30" :centered-slides="false" :modules="modules"
            :navigation="{ nextEl: '.video-button-next', prevEl: '.video-button-prev' }" :pagination="{ clickable: true }"
            class="mySwiper" :breakpoints="VideoBreakpoints">
            <swiper-slide v-for="video in filteredVideoCards" :key="video.id">
                <div class="activity-card c-bg-white-base c-text-primary ui-radius-80 c-shadow-soft d-flex flex-column">
                    <div class="video-container">
                        <div v-if="!video.isLoaded" class="video-placeholder" @click="video.isLoaded = true">
                            <img :src="`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`" :alt="video.title"
                                class="video-thumbnail">
                            <div class="play-button"></div>
                        </div>
                        <iframe v-else :src="`https://www.youtube.com/embed/${video.videoId}?autoplay=1`"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div class="info-container d-flex flex-column">
                        <div class="categories">
                            <CategoryButton :text="video.category" />
                        </div>
                        <a :href="video.titleUrl" class="title-link">
                            <div class="activity-title text-h3" :title="video.title">{{ video.title }}</div>
                        </a>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="swiper-button-prev video-button-prev">
            <img src="../assets/img/future/future-awareness/left-button.png" alt="Previous">
        </div>
        <div class="swiper-button-next video-button-next">
            <img src="../assets/img/future/future-awareness/right-button.png" alt="Next">
        </div>
    </div>
</template>

<style scoped>
.video-carousel-wrapper {
    position: relative;
}

/* 輪播本身 */
.mySwiper {
    width: 100%;
    height: auto;
    padding-bottom: 50px;
}

.activity-card {
    width: auto;
    height: auto;
    overflow: hidden;
}

.activity-card .video-container {
    width: 100%;
    height: 390px;
}

.activity-card .video-container iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.activity-card .info-container {
    padding: 45px;
    flex-grow: 1;
}

/* 為了讓 info-container 內的佈局與之前保持一致，保留 margin-bottom */
.categories {
    margin-bottom: 32px;
}

.title-link {
    text-decoration: none;
}

.activity-title {
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: calc(var(--font-size-h3) * 1.5 * 2);
    transition: color 0.3s;
}

/* 加入loading效果點選再載入 */
.video-container {
    position: relative;
    width: 100%;
    height: 386px;
    overflow: hidden;
}

.video-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: #000;
}

.video-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
}

/* loading播放按鍵 */
.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    /* 播放按鈕的圓圈大小 */
    height: 80px;
    border-radius: 50%;
    background-color: rgba(104, 104, 104, 0.6);
    /* 半透明黑色背景 */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
    /* 新增過渡效果 */
}

/* 播放按鈕中間的三角形 */
.play-button::before {
    content: '';
    border-style: solid;
    border-width: 18px 0 18px 28px;
    border-color: transparent transparent transparent var(--color-white-base);
    margin-left: 5px;
}

/* 滑鼠懸停時的樣式變化 */
.video-placeholder:hover .play-button {
    background-color: rgba(255, 255, 255, 0.8);
    /* 懸停時加深背景顏色 */
    transform: translate(-50%, -50%) scale(1.1);
    /* 懸停時放大按鈕 */
}

/* 確保 iframe 填滿容器 */
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* 輪播導航按鈕樣式 */
:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
    display: none;
}

.video-button-prev,
.video-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background-color: var(--color-white-base);
    color: var(--color-blue-500);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
}

.video-button-prev {
    left: -100px;
}

.video-button-next {
    right: -100px;
}

/* 分頁器樣式 */
:deep(.swiper-pagination) {
    bottom: 0px;
}

:deep(.swiper-pagination-bullet) {
    width: 12px;
    height: 12px;
    background-color: #e0e0e0;
    opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: var(--color-blue-500);
}

/* 變版修改 */
@media (max-width: 1630px) {
    .video-button-prev {
        left: 20px; 
    }

    .video-button-next {
        right: 20px; 
    }
}
</style>
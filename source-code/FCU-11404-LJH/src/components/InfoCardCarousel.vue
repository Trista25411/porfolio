<!-- 未來研究室 → 測驗元件+左右輪播版 -->
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

// 結構化的卡片資料 API 
const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => []
  },
  description: {
    type: String,
    default: ''
  }
});

// 定義一個函式來處理圖片的動態路徑
const getImageUrl = (name) => {
  return new URL(`../assets/img/future/future-test/${name}`, import.meta.url).href;
};

// 輪播基本設定
const carouselSettings = {
  itemsToShow: 1.25, // 顯示 1.25 個項目，讓兩側卡片可見 
  wrapAround: false, // 確保沒有循環，箭頭會隱藏
  snapAlign: 'center', // 項目居中對齊
};

// 響應式斷點設定
const carouselBreakpoints = {
  // vue3用itemsToShow設置
  // 在 px以內(下方px數字) 的螢幕
  0: {
    itemsToShow: 1, // 一個卡片
    snapAlign: 'center',
    wrapAround: false,
  },
  950: {
    itemsToShow: 2,
    snapAlign: 'center',
    wrapAround: false,
  },
  // 在 px 以上的螢幕
  1500: {
    itemsToShow: 3, // 顯示三個卡片
    snapAlign: 'center',
    wrapAround: false,
  }
};
</script>

<template>
  <div class="info-carousel-container">
    <Carousel :settings="carouselSettings" :breakpoints="carouselBreakpoints">
      <Slide v-for="(card, index) in cards" :key="index">
        <a :href="card.link" target="_blank" rel="noopener noreferrer"
          class="info-card c-text-primary c-bg-white-base ui-radius-48 c-shadow-soft">
          <div class="img-container ui-radius-26 c-bg-white-base d-flex justify-content-center align-items-center">
            <img :src="getImageUrl(card.imageUrl)" alt="Card Image" class="card-image">
          </div>
          <div class="card-body">
            <div class="card-title text-h3">
              {{ card.title }}
              <svg class="external-link-icon" width="27" height="27" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                  stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 3H21V9" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10 14L21 3" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
          </div>
          <div v-if="card.description" class="card-description">{{ card.description }}</div>
        </a>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.info-card {
  width: 650px;
  height: 400px;
  padding: 45px;
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  max-width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  display: block;
  /* 讓整個卡片區域都是可點擊的 */
}

.card-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 16px;
  /* 根據你的設計調整與圖片的間距 */
  text-align: start;
}

/* 移除多餘的卡片內容容器 */
.img-container {
  width: 550px;
  height: 180px;
  overflow: hidden;
  max-width: 100%;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card-body {
  margin-top: 32px;
}

.card-title {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 200ms cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.external-link-icon {
  transition: stroke 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.external-link-icon path {
  stroke: var(--color-text-primary, #2C3E50);
  transition: stroke 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.info-card:hover .card-image {
  transform: scale(1.2);
}

.info-card:hover .card-title {
  color: var(--color-blue-500, #16B4D6);
  text-decoration: underline;
}

.info-card:hover .external-link-icon path {
  stroke: var(--color-blue-500, #16B4D6);
}

.info-carousel-container {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  max-width: 1440px;
  margin: 0 auto;
}

.carousel__slide {
  padding: 10px;
  transform: scale(0.8);
  opacity: 0.5;
  transition: all 0.3s ease;
  cursor: pointer;
}

.carousel__slide--active {
  transform: scale(1);
  opacity: 1;
  z-index: 10;
}

.carousel__prev,
.carousel__next {
  background-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

/* carousel__prev, .carousel__next 選擇器是全域
需要使用 :deep() 偽類來強制應用樣式 */
:deep(.carousel__prev) {
  left: -50px;
}

:deep(.carousel__next) {
  right: -50px;
}

/* 變版修改 */
@media (max-width:1500px) {
  :deep(.carousel__prev) {
    left: 10px;
  }

  :deep(.carousel__next) {
    right: 10px;
  }
}

@media (max-width: 900px) {
  .carousel__slide,
  .carousel__slide--active {
    transform: none;
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .info-card {
    width: 100%;
    height: auto;
    padding: 24px;
    border-radius: 24px;
  }

  .img-container {
    height: 200px;
  }

  .card-body {
    margin-top: 24px;
  }
}
</style>
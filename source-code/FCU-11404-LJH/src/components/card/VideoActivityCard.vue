<script setup>
import { ref } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';

// 定義 props，讓父元件可以傳遞一個包含所有卡片資訊的物件
const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({
      videoId: 'dQw4w9WgXcQ', // 預設的影片 ID
      category: '預設分類',
      categoryUrl: '#',
      title: '這是一個預設的活動標題',
      titleUrl: '#',
      learnMoreUrl: '#'
    })
  }
});

// 定義此組件可以發出的自訂事件
const emit = defineEmits(['category-click']);

// 當分類按鈕被點擊時，呼叫此函式
function handleCategoryClick() {
  // 發出名為 'category-click' 的事件，並把分類名稱當作資料傳出去
  emit('category-click', props.cardData.category);
  // 點擊分類按鈕時，平滑滾動到網頁最上方
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 追蹤影片是否已載入
const isLoaded = ref(false);
</script>

<template>
  <div class="activity-card c-bg-white-base c-text-primary ui-radius-80 c-shadow-soft">
    <div class="video-container">
      <div v-if="!isLoaded" class="video-placeholder" @click="isLoaded = true">
        <img :src="`https://img.youtube.com/vi/${cardData.videoId}/hqdefault.jpg`" :alt="cardData.title"
          class="video-thumbnail">
        <div class="play-button"></div>
      </div>
      <iframe v-else :src="`https://www.youtube.com/embed/${cardData.videoId}?autoplay=1`" title="YouTube video player"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div class="info-container">
      <div class="categories">
        <CategoryButton :text="cardData.category" :href="cardData.categoryUrl" @click.prevent="handleCategoryClick" />
      </div>
      <a :href="cardData.titleUrl" class="title-link">
        <div class="activity-title text-h3" :title="cardData.title">{{ cardData.title }}</div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  width: 686px;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 上方影片區域 */
.activity-card .video-container {
  width: 100%;
  height: 386px;
  position: relative;
  overflow: hidden;
}

.activity-card .video-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

/* 下方資訊顯示區 */
.activity-card .info-container {
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* 活動卡片元件分類 */
.activity-card { /* 確保能選到 CategoryButton 內的元素 */
  margin-bottom: 32px;
}

.activity-card .title-link {
  text-decoration: none;
}

.activity-card .activity-title {
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: calc(var(--font-size-h3) * 1.5 * 2);
  transition: color 0.3s;
}

.activity-card .title-link:hover .activity-title {
  color: var(--color-blue-500);
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

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(104, 104, 104, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.play-button::before {
  content: '';
  border-style: solid;
  border-width: 18px 0 18px 28px;
  border-color: transparent transparent transparent var(--color-white-base);
  margin-left: 5px;
}

.video-placeholder:hover .play-button {
  background-color: rgba(255, 255, 255, 0.8);
  transform: translate(-50%, -50%) scale(1.1);
}

@media (max-width: 768px) {
  .activity-card {
    width: 600px;
  }
}

@media (max-width: 576px) {
  .activity-card {
    width: 360px;
  }
}
</style>
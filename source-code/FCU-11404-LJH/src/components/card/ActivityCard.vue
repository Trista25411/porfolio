<script setup>
import { defineProps, defineEmits } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';

defineProps({
  cardData: {
    type: Object,
    required: true
  }
});

// 定義元件可以發出的自訂事件
const emit = defineEmits(['category-clicked', 'tag-clicked']);

// 建立處理點擊事件的函式
function onCategoryClick(category) {
  emit('category-clicked', category);
  // 點擊分類按鈕時，平滑滾動到網頁最上方
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onTagClick(tag) {
  emit('tag-clicked', tag);
  // 點擊標籤時，平滑滾動到網頁最上方
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div class="activity-card c-bg-white-base c-text-primary ui-radius-80 c-shadow-soft">
    <img :src="cardData.imageUrl" class="card-img-top" alt="活動圖片">
    <div class="card-body">
      <CategoryButton
        :text="cardData.category"
        @click.stop="onCategoryClick(cardData.category)"
      />
      
      <div class="card-title text-h3 ">{{ cardData.title }}</div>
      <div class="card-text text-p">
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="info-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <p class="event-time truncate-text" :title="cardData.eventTime">{{ cardData.eventTime }}</p>
        </div>
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="info-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p class="location-text truncate-text" :title="cardData.location">{{ cardData.location }}</p>
        </div>
      </div>
      <div class="card-tags">
        <span v-for="tag in cardData.tags" :key="tag.text" class="tag" @click.stop="onTagClick(tag.text)">
          <span class="hash">#</span>{{ tag.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  width: auto;
  min-height: 47.6875rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.activity-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.card-img-top {
  width: 100%;
  height: 333px;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 44px 44px 48px 44px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
}

.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  margin-top: 24px;
}

.card-text {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* 確保文字區塊容器的寬度能正確計算 */
  width: 100%;
}

.info-item {
  display: flex;
  align-items: center;
  /* 確保 info-item 本身寬度正確 */
  width: 100%;
}

.info-icon {
  flex-shrink: 0; /* 確保圖示不會被壓縮 */
  margin-right: 12px;
  width: 24px;
  height: 24px;
  color: var(--font-color-black);
}

.event-time,
.location-text {
  margin: 0;
  white-space: nowrap;      
  overflow: hidden;        
  text-overflow: ellipsis;  /* 顯示省略號 */
  min-width: 0;             /* 允許元素寬度縮小到 0 */
}

.card-tags {
  margin-top: auto;
  padding-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 0;
}

.tag {
  font-size: var(--font-size-p);
  color: var(--color-blue-500);
  font-weight: var(--font-weight-normal);
  margin-right: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}

.tag:hover {
  color: #12829c; /* 滑鼠懸停時加深顏色 */
}

.tag .hash {
  margin-right: 4px;
}
</style>
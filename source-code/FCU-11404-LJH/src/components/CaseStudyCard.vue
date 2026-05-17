<!-- 未來實驗室案例元件 -->
<script setup>
import { ref } from 'vue';
import CategoryButton from '@/button/CategoryButton.vue';

// 定義 props，讓父元件可以傳遞資料進來
defineProps({
  caseData: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// 加入「換行並顯示所有內容」和「多行省略」切換方式
const isTruncated = ref(true);
const toggleTruncate = () => {
  isTruncated.value = !isTruncated.value;
};
</script>

<template>
  <div class="case-study-card d-flex align-items-center ui-radius-48 c-shadow-soft">
    <div class="image-container">
      <img :src="caseData.imageUrl" alt="案例研究圖片" class="case-image">
    </div>
    <div class="info-container d-flex flex-column">
      <div class="mb-24">
        <CategoryButton :text="caseData.category" />
      </div>
      <div class="mb-19">
        <a :href="caseData.titleLink" class="title-link">
          <h3 class="card-title text-h3">{{ caseData.title }}</h3>
        </a>
        <p class="card-content text-p">{{ caseData.content }}</p>
      </div>
      <div class="d-flex flex-wrap align-items-center mb-19">
        <a v-for="(tag, index) in caseData.tags" :key="index" :href="tag.link" class="tag-link">
          #{{ tag.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-study-card {
  width: 1400px;
  height: 548px;
  background-color: var(--color-white-base, #FDFDFD);
  border: 1px solid #E0E0E0;
  overflow: hidden;
}

.image-container {
  padding: 40px 0 40px 40px;
  flex-shrink: 0;
}

.case-image {
  width: 565px;
  height: 468px;
  border-radius: 26px;
  object-fit: cover;
}

.info-container {
  flex-grow: 1;
  height: 100%;
  padding: 44px;
  color: var(--color-text-primary, #2C3E50);
}

.mb-24 {
  margin-bottom: 24px;
}

.mb-19 {
  margin-bottom: 19px;
}

.card-title {
  margin-bottom: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
}

.title-link:hover {
  color: var(--color-orange-500, #FF7F50);
}

.text-p {
  /* 為了當 isTruncated 為 false 時，讓換行符號生效 */
  white-space: pre-line;
}

.tag-link {
  font-size: var(--font-size-p, 22px);
  color: var(--color-blue-500, #16B4D6);
  text-decoration: none;
  margin-right: 16px;
  transition: color 0.3s;
}

.tag-link:hover {
  color: var(--color-orange-500, #FF7F50);
}

.learn-more {
  font-size: var(--font-size-p, 22px);
  color: var(--color-blue-500);
  text-decoration: none;
  font-weight: var(--font-weight-bold, 700);
  display: inline-flex;
  align-items: center;
  transition: color 0.3s ease;
}

.learn-more .icon {
  width: 42px;
  height: 42px;
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.learn-more:hover p {
  text-decoration: underline;
}

.learn-more:hover .icon {
  transform: translateX(5px);
}

.learn-more:hover .icon circle {
  fill: var(--color-blue-500);
}

.learn-more:hover .icon path {
  stroke: var(--color-white-base);
}
</style>

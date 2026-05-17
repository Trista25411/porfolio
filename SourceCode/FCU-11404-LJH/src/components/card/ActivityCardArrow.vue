<script setup>
import CategoryButton from '@/components/button/CategoryButton.vue';
import LearnMoreButton from '@/components/button/LearnMoreButton.vue';

defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({
      imageUrl: 'https://placehold.co/447x333/EFEFEF/333?text=Image',
      category: { text: '分類', url: '#' },
      title: { text: '活動標題', url: '#' },
      moreUrl: '#'
    })
  }
});

// 定義此元件可以發出的事件
const emit = defineEmits(['image-click']);

// 處理點擊事件的函式
function handleCardClick() {
  // 發出 'image-click' 事件，通知父元件
  emit('image-click');
}
</script>

<template>
  <div class="activity-card c-bg-white-base c-text-primary ui-radius-80 c-shadow-soft">
    <img :src="cardData.imageUrl" class="card-img-top" alt="活動圖片" @click="handleCardClick" style="cursor: pointer;">
    <div class="card-body">
      <div class="card-category">
        <router-link :to="{ path: '/video', query: { category: cardData.category.text } }">
          <CategoryButton :text="cardData.category.text" />
        </router-link>
      </div>
      <a @click.prevent="handleCardClick" href="#" class="card-title h3" style="cursor: pointer;">
        {{ cardData.title.text }}
      </a>
      <LearnMoreButton :to="cardData.moreUrl" @click.prevent="handleCardClick" />
    </div>
  </div>
</template>

<style scoped>
/* router-link 的點擊區域與按鈕一致，並移除底線 */
.card-category .router-link-active,
.card-category .router-link-exact-active,
.card-category a {
  text-decoration: none;
  display: inline-block;
  /* 讓連結範圍符合按鈕大小 */
}

.activity-card {
  width: auto;
  background-color: var(--color-white-base);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.activity-card .card-img-top {
  width: 100%;
  height: 333px;
  object-fit: cover;
}

.activity-card .card-body {
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.activity-card .card-category {
  margin-bottom: 32px;
}

.activity-card .card-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-font-black);
  line-height: 1.4;
  text-decoration: none;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: auto;
  /* 將 "了解更多" 推到最下方 */
}

.activity-card .card-title:hover {
  color: var(--color-blue-500);
  transition: color 0.3s;
}

@media (max-width: 768px) {
  .activity-card {
    width: 600px;
  }
}

@media (max-width: 576px) {
  .activity-card {
    width: auto;
  }
}
</style>
<script setup>
import { defineProps, defineEmits } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import IconExternal from '@/components/icons/external.vue';

// 定義元件從父元件接收的資料
defineProps({
  unit: {
    type: Object,
    required: true
  }
});

// 定義元件向父元件發送的事件
const emit = defineEmits(['category-click']);

// 從原檔案搬移過來的圖片路徑處理函式
function getImageUrl(name) {
  return new URL(`../../assets/img/future/future-links/${name}`, import.meta.url).href;
}

// 當卡片內的分類按鈕被點擊時，通知父元件
function selectCategoryInCard(category) {
  emit('category-click', category);
}
</script>

<template>
  <div class="learning-unit-card c-bg-white-base c-text-primary ui-radius-56 c-shadow-soft mt-4">
    <div class="row g-0 h-100">
      <div class="col-md-5 card-img-content">
        <img :src="getImageUrl(unit.imageUrl)" class="learning-unit-img" :alt="unit.title">
      </div>
      <div class="col-md-7 d-flex align-items-center">
        <div class="card-body-right">
          <div class="mb-auto">
            <div class="categories">
              <CategoryButton
                :text="unit.category"
                class="card-category-button"
                @click="selectCategoryInCard(unit.category)"
              />
            </div>
            <div class="text-h3 card-title c-text-primary">
              <a :href="unit.link" class="text-decoration-none stretched-link-custom">
                {{ unit.title }}
              </a>
            </div>
            <p class="text-p mt-4">
              {{ unit.description }}
            </p>
          </div>
          <div class="mt-4 text-end">
<BaseButton size="medium" shape="pill" variant="solid">
  <a :href="unit.link" target="_blank" rel="noopener noreferrer">
    <span>前往查看</span>
    <IconExternal class="c-icon-size-18 c-transition-transform icon-scale-on-hover" />
  </a>
</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories :deep(.card-category-button) {
  cursor: pointer;
  transition: all 0.2s ease;
}

.categories :deep(.card-category-button:hover) {
  background-color: var(--color-orange-500, #F76B1C);
  color: var(--color-white-base);
  border-color: var(--color-orange-500, #F76B1C);
}

.learning-unit-card {
  max-width: 1400px;
  height: auto;
  overflow: hidden;
  border: 1px solid var(--color-white-base);
  margin: auto;
}

.learning-unit-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-body-right {
  padding: 44px 44px 44px 73px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

card-img-content {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: white;
}

.stretched-link-custom {
  position: relative;
}

.stretched-link-custom::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}

@media (max-width: 992px) {
  .card-body-right {
    padding: 32px;
  }
}

@media (max-width: 767px) {
  .learning-unit-img {
    height: 250px;
  }

  .card-body-right {
    padding: 24px;
  }
}
</style>
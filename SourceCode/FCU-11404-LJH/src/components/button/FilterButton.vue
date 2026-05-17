<!-- 大分類按鈕 -->
<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  // text: 按鈕上要顯示的文字
  text: {
    type: String,
    required: true
  },
  // isActive: 決定按鈕是否處於啟用狀態，預設為 false
  isActive: {
    type: Boolean,
    default: false
  }
});

// 定義元件可以發出的事件
defineEmits(['click']);
</script>

<template>
  <button
    type="button"
    class="filter-button text-p fw-bold ui-radius-999"
    :class="{ active: isActive }"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<style scoped>
/* 元件的獨立樣式 (從 ResourceMapView.vue 整合而來) */
.filter-button {
  background-color: var(--color-white-base); 
  color: var(--color-text-primary);
  padding: 12px 28px;
  border: 2px solid var(--color-orange-500);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  -webkit-tap-highlight-color: transparent; /* 移除行動裝置點擊高光 */
}

/* 當按鈕被滑鼠懸停(hover)或處於啟用(active)狀態時的樣式 */
.filter-button:hover,
.filter-button.active {
  background-color: var(--color-orange-500); 
  color: var(--color-white-base);          
  border-color: var(--color-orange-500);     
}

@media (max-width: 820px) {
  .filter-button {
    padding: 8px 18px;
  }
}
</style>
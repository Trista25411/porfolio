<!-- 橘色按鈕 -->
<script setup>
defineProps({
  // 按鈕上顯示的文字
  text: {
    type: String,
    required: true 
  }
});
</script>

<template>
  <!-- 顯示傳入的 text prop -->
  <button type="button" class="category-button c-bg-orange-500 c-text-white-base text-p">
    {{ text }}
  </button>
</template>

<style scoped>
.category-button {
  padding: 8px 18px;
  border-radius: 18px;
  /* 依字體的寬高去做延伸 (Hug) */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 移除按鈕預設邊框並設定游標樣式 */
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.category-button:hover {
  opacity: 0.9;
}
</style>

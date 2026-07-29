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
  <button type="button" class="category-button c-bg-orange-500 c-text-white-base text-p">
    {{ text }}
  </button>
</template>

<style scoped>
.category-button {
  padding: 8px 18px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.category-button:hover {
  opacity: 0.9;
}
</style>

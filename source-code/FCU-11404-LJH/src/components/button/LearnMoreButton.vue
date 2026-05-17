<script setup>
import { defineProps } from 'vue';
// 定義元件屬性，接收一個 'to' 來指定連結路徑
defineProps({
  to: {
    type: [String, Object], // to 可以是字串或物件
    required: true
  }
});
</script>

<template>
  <router-link :to="to" class="learn-more text-p">
    <p class="mb-0">了解更多</p>
    <svg class="icon" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="20" fill="var(--color-white-base)" stroke="currentColor" stroke-width="2"/>
      <path d="M17.5 13.125L26.25 21L17.5 28.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </router-link>
</template>

<style scoped>
/* 樣式從 ActivityCardArrow.vue 搬移過來 */
.learn-more {
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-500);
  text-decoration: none;
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-top: 24px;
}

.learn-more .icon {
  width: 42px;
  height: 42px;
  margin-left: 12px;
  transition: transform 0.3s ease;
}

.learn-more:hover .icon {
    transform: translateX(5px);
}
</style>
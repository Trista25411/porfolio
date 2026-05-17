 <!-- 活動logo卡片(正方形) -->
<template>
  <div class="interactive-card c-shadow-soft ui-radius-48">
    <div class="card-icon">
      <img :src="iconSrc" :alt="title" class="ui-radius-26" />
    </div>
    <h4 class="card-title text-h4">{{ title }}</h4>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.interactive-card {
  width: 264px;
  height: 265px;
  padding: 35px 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-white-base);
  transition: background-color 200ms cubic-bezier(0, 0, 0.58, 1);
  cursor: pointer;
}

.interactive-card .card-icon {
  width: 135px;
  height: 135px;
  background-color: var(--color-gray-area);
  border-radius: 25px; 
  transition: background-color 200ms cubic-bezier(0, 0, 0.58, 1);
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
}

.interactive-card .card-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}

.interactive-card .card-title {
  margin-top: 24px;
  color: var(--color-text-primary);
  transition: color 200ms cubic-bezier(0, 0, 0.58, 1);
}

.interactive-card:hover {
  background-color: var(--color-blue-500);
}

.interactive-card:hover .card-icon {
  background-color: var(--color-white-base);
}

.interactive-card:hover .card-title {
  color: var(--color-white-base);
}
</style>
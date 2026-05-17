<script setup>
defineProps({
  // 按鈕上顯示的文字
  text: {
    type: String,
    required: true 
  },
  to: {
    type: String,
    required: true 
  },
  icon: {
    type: String,
    default: null
  }
});
</script>

<template>
  <router-link :to="to" class="custom-blue-button c-bg-blue-500 c-text-white-base text-small text-sm-p fw-bold">
    <span>{{ text }}</span>
    <i v-if="icon" :class="['bi', `bi-${icon}`, 'ms-2']"></i>
  </router-link>
</template>

<style scoped>
.custom-blue-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  width: auto;
  height: auto;
  padding: 0.75rem 1.375rem;
  /* padding: 12px 22px; */
  border-radius: 50px;
  border: 2px solid var(--color-white-base);
}

.custom-blue-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.custom-blue-button > span {
  display: inline-block;
}

.custom-blue-button > i {
  font-size: 0.9em;
  font-weight: bold;
}
</style>
<script setup>
// 使用 defineProps 定義元件接收的資料
defineProps({
  // 按鈕預設樣式
  size: {
    type: String,
    default: 'medium', 
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  shape: {
    type: String,
    default: 'rounded', 
    validator: (value) => ['rounded', 'pill'].includes(value)
  },
  variant: {
    type: String,
    default: 'solid', 
    validator: (value) => ['solid', 'outline'].includes(value)
  }
})
</script>

<template>
  <div class="base-button text-p ui-radius-999" :class="[
    `button--size-${size}`,
    `button--shape-${shape}`,
    `button--variant-${variant}`
  ]">
    <slot></slot>
  </div>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.base-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button--variant-solid {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
  border: 2px solid var(--color-white-base);
}

.button--variant-outline {
  background-color: transparent;
  color: var(--color-blue-500);
  border: 2px solid var(--color-blue-500);
}

.button--variant-outline:hover {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
}

/* 使用 :deep() 重置樣式 */
.base-button> :deep(*) {
  margin: 0 4px;
}

.base-button> :deep(button),
.base-button> :deep(a) {
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.base-button> :deep(a) {
  text-decoration: none;
}

.button--size-medium > :deep(a),
.button--size-medium > :deep(button) {
  padding: 0.75rem 1.375rem; /* 12px 22px */
}
.button--size-small > :deep(a),
.button--size-small > :deep(button) {
  padding: 0.5rem 1.125rem; /* 8px 18px */
}

.button--size-large > :deep(a),
.button--size-large > :deep(button) {
  padding: 0.75rem 1.375rem; /* 12px 22px */
}

.base-button:hover :deep(.icon-down-on-hover) {
  transform: translateY(var(--spacing-hover-shift));
}

.base-button:hover :deep(.icon-right-on-hover) {
  transform: translateX(var(--spacing-hover-shift));
}

.base-button:hover :deep(.icon-scale-on-hover) {
  transform: scale(var(--scale-hover-icon));
}

</style>
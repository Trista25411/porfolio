<script setup>
defineProps({
  // 控制按鈕大小
  size: {
    type: String,
    default: 'medium', // 預設為中等大小
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  // 控制按鈕形狀
  shape: {
    type: String,
    default: 'rounded', // 預設為圓角
    validator: (value) => ['rounded', 'pill'].includes(value)
  },
  // 控制樣式變體 (實心 vs. 外框)
  variant: {
    type: String,
    default: 'solid', // 預設為實心
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
  /* 佔位，避免切換時跳動 */
}

.button--variant-outline {
  background-color: transparent;
  color: var(--color-blue-500);
  border: 2px solid var(--color-blue-500);
}

.button--variant-outline:hover {
  background-color: var(--color-blue-500);
  /* 外框按鈕 hover 填滿 */
  color: var(--color-white-base);
}

/* 讓裡面的元素有間距 */
.base-button> :deep(*) {
  margin: 0 4px;
}

/* 使用 :deep() 來自動重置插槽內 button 和 a 標籤的樣式 */
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

/* 針對 a 標籤移除底線 */
.base-button> :deep(a) {
  text-decoration: none;
}

/* 條件規則：根據父層的 class，將 padding 加到內層的 a 或 button 上 */
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

/*
  當滑鼠移到整個 .base-button 元件上時，
  透過 :deep() 找到插槽內對應 class 的 icon，並套用 transform
*/
.base-button:hover :deep(.icon-down-on-hover) {
  transform: translateY(var(--spacing-hover-shift));
}

.base-button:hover :deep(.icon-right-on-hover) {
  transform: translateX(var(--spacing-hover-shift));
}

/* 當滑鼠移到按鈕上時，讓帶有 .icon-scale-on-hover 的圖示放大 */
.base-button:hover :deep(.icon-scale-on-hover) {
  transform: scale(var(--scale-hover-icon));
}

</style>
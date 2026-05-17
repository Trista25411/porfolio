<script setup>
import { ref, reactive, watch, nextTick, onUnmounted } from 'vue';
const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  modelValue: { type: [String, Array], required: true },
  theme: { type: String, default: 'orange' },
  multiple: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);
const isOpen = ref(false);

// 建立對應 DOM 元素的 ref
const toggleButton = ref(null); // 對應觸發按鈕
const menuRef = ref(null);      // 對應彈出的選單

// 建立一個響應式物件來存放選單的動態 CSS
const menuStyle = reactive({
  top: '0px',
  left: '0px',
  width: '0px'
});

// 計算並設定選單位置的函式
const calculatePosition = () => {
  if (toggleButton.value) {
    const rect = toggleButton.value.getBoundingClientRect();
    menuStyle.top = `${rect.bottom + 8}px`; // 定位在按鈕下方 8px
    menuStyle.left = `${rect.left}px`;
    menuStyle.width = `${rect.width}px`;
  }
};

// 抽離出獨立的開/關選單函式
const openMenu = () => {
  isOpen.value = true;
  nextTick(() => { // 等待 DOM 更新後再計算位置
    calculatePosition();
  });
};

const closeMenu = () => {
  isOpen.value = false;
};

// 監聽選單開合，來管理事件監聽器
watch(isOpen, (newValue) => {
  if (newValue) {
    window.addEventListener('scroll', calculatePosition, true);
    window.addEventListener('resize', calculatePosition);
  } else {
    window.removeEventListener('scroll', calculatePosition, true);
    window.removeEventListener('resize', calculatePosition);
  }
});

function isOptionActive(option) {
  if (props.multiple) {
    return props.modelValue.includes(option);
  }
  return props.modelValue === option;
}

function selectOption(option) {
  if (props.multiple) {
    const newValue = [...props.modelValue];
    const index = newValue.indexOf(option);
    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option);
    }
    emit('update:modelValue', newValue);
  } else {
    emit('update:modelValue', option);
    closeMenu(); // 單選後關閉選單
  }
}

// 點擊外部關閉選單的邏輯
const handleClickOutside = (event) => {
  if (isOpen.value && toggleButton.value && !toggleButton.value.contains(event.target) && menuRef.value && !menuRef.value.contains(event.target)) {
    closeMenu();
  }
};

watch(isOpen, (val) => {
  if (val) {
    document.addEventListener('click', handleClickOutside, true);
  } else {
    document.removeEventListener('click', handleClickOutside, true);
  }
});

// 元件銷毀時清理事件監聽器，避免記憶體洩漏
onUnmounted(() => {
  window.removeEventListener('scroll', calculatePosition, true);
  window.removeEventListener('resize', calculatePosition);
  document.removeEventListener('click', handleClickOutside, true);
});
</script>

<template>
  <div class="dropdown-filter" :class="`theme-${theme}`">
    <button ref="toggleButton" type="button" class="custom-dropdown-trigger" @click="isOpen ? closeMenu() : openMenu()"
      :class="{ active: isOpen }">
      <span>{{ label }}</span>
      <i class="bi bi-chevron-down"></i>
    </button>
    <Teleport to="body">
      <transition name="fade">
        <ul ref="menuRef" v-if="isOpen" class="dropdown-menu-teleported" :class="`theme-${theme}`" :style="menuStyle">
          <li v-for="option in options" :key="option" @click.stop="selectOption(option)"
            :class="{ active: isOptionActive(option) }">
            <i v-if="multiple" class="bi" :class="isOptionActive(option) ? 'bi-check-square-fill' : 'bi-square'"></i>
            {{ option }}
          </li>
        </ul>
      </transition>
    </Teleport>
  </div>
</template>

<style>
.mobile-filter-container.is-sticky {
background: linear-gradient(to bottom, rgba(255, 255, 255, 0.623) 40%, transparent 100%);  top: 6.25rem; 
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  margin: 0;
  padding-bottom: 1rem; 
}

.dropdown-filter {
  position: relative;
  width: 100%;
}

.custom-dropdown-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  background-color: var(--color-white-base);
  border: 2px solid;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-dropdown-trigger .bi-chevron-down {
  transition: transform 0.3s ease;
}

.custom-dropdown-trigger.active .bi-chevron-down {
  transform: rotate(180deg);
}

/* --- 顏色主題 --- */
.theme-orange .custom-dropdown-trigger {
  color: var(--color-orange-500);
  border-color: var(--color-orange-500);
}

.theme-orange .custom-dropdown-trigger.active,
.dropdown-menu-teleported.theme-orange li.active {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
}

.theme-blue .custom-dropdown-trigger {
  color: var(--color-blue-500);
  border-color: var(--color-blue-500);
}

.theme-blue .custom-dropdown-trigger.active,
.dropdown-menu-teleported.theme-blue li.active {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
}

/* --- 下拉選單 (傳送後) 的樣式 --- */
.dropdown-menu-teleported {
  position: fixed;
  /* 改為 fixed 定位，才能搭配 JS 計算顯示在視窗任何位置 */
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: var(--color-white-base);
  z-index: 9999;
  /* --- 藥丸形狀 --- */
  border-radius: var(--radius-26);
  border-width: 2px;
  border-style: solid;
  box-shadow: var(--c-shadow-soft);
  overflow: hidden;
  /* 確保內容不超出圓角 */
}

/* 根據主題設定邊框顏色 */
.dropdown-menu-teleported.theme-orange {
  /* border-color: var(--color-orange-500); */
  border: unset;
}

.dropdown-menu-teleported.theme-blue {
  /* border-color: var(--color-blue-500); */
  border: unset;
}

.dropdown-menu-teleported li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 16px;
}

.dropdown-menu-teleported li:hover {
  background-color: var(--color-gray-area);
}

.dropdown-menu-teleported li .bi {
  font-size: 1.1em;
}

/* 動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
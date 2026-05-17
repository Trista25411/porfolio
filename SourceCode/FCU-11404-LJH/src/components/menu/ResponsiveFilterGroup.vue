<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import FilterButton from '@/components/button/FilterButton.vue';

// 增加一個新的 prop 'sticky'，並設定預設值為 true
const props = defineProps({
  buttons: { type: Array, required: true },
  activeCategory: { type: String, required: true },
  sticky: { type: Boolean, default: true } // 這個就是新開關！
});

const emit = defineEmits(['update:activeCategory']);
const buttonTexts = computed(() => {
  if (props.buttons.length > 0 && typeof props.buttons[0] === 'object') {
    return props.buttons.map(btn => btn.text);
  }
  return props.buttons;
});

const isDropdownOpen = ref(false);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectCategory(category) {
  emit('update:activeCategory', category);
  isDropdownOpen.value = false;
}

const filterRef = ref(null);
const isSticky = ref(false);
let initialTop = 0;

const handleScroll = () => {
  if (window.innerWidth <= 769 && filterRef.value) {
    if (window.scrollY > initialTop) {
      isSticky.value = true;
    } else {
      isSticky.value = false;
    }
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  // --- 【修改 2】: 只有在 sticky 功能開啟時，才加入滾動監聽 ---
  if (props.sticky) {
    if (filterRef.value) {
      initialTop = filterRef.value.offsetTop;
    }
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  // --- 【修改 3】: 同樣地，只有在 sticky 功能開啟時，才需要移除監聽 ---
  if (props.sticky) {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div ref="filterRef" class="filter-group-wrapper" :class="{ 'is-sticky': isSticky && sticky }">
    <div class="desktop-filters">
      <FilterButton v-for="btnText in buttonTexts" :key="btnText" :text="btnText"
        :is-active="activeCategory === btnText" @click="selectCategory(btnText)" />
    </div>
    <div class="mobile-filter">
      <button type="button" class="mobile-filter-toggle" :class="{ active: isDropdownOpen }" @click="toggleDropdown">
        <span class="pe-3">{{ activeCategory }}</span>
        <i class="bi bi-chevron-down"></i>
      </button>
      <transition name="fade">
        <ul v-if="isDropdownOpen" class="mobile-filter-dropdown">
          <li v-for="btnText in buttonTexts" :key="btnText" @click="selectCategory(btnText)"
            :class="{ active: activeCategory === btnText }">
            {{ btnText }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.filter-group-wrapper {
  padding-top: var(--sticky-placeholder-height, 0);
}

.filter-group-wrapper.is-sticky .mobile-filter {
  position: fixed;
  top: 6.25rem;
  /* 100px */
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  background-color: var(--color-white-base);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  --sticky-placeholder-height: 62px;
  border-bottom: 1px solid var(--color-gray-line);
}

/* --- 固定與非固定狀態的樣式切換 --- */
.filter-group-wrapper.is-sticky .mobile-filter-toggle {
  border-radius: 0;
  border: none;
  /* color: var(--color-orange-500); */
  border-bottom: 2px solid var(--color-orange-500);
  color: var(--color-orange-500);
}

.filter-group-wrapper:not(.is-sticky) .mobile-filter-toggle {
  border-radius: var(--radius-999);
  border: 2px solid var(--color-orange-500);
}

.filter-group-wrapper.is-sticky .mobile-filter-dropdown {
  top: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.filter-group-wrapper:not(.is-sticky) .mobile-filter-dropdown {
  top: calc(100% + 8px);
  border-radius: 16px;
}

.desktop-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.mobile-filter {
  display: none;
}

@media (max-width: 769px) {
  .desktop-filters {
    display: none;
  }

  .mobile-filter {
    display: block;
    position: relative;
    width: 100%;
    padding: 0;
  }

  .mobile-filter-toggle {
    width: 100%;
    padding: 1rem 1.5rem;
  }
}

/* --- 手機版下拉選單按鈕樣式 --- */
.mobile-filter-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  /* color: var(--color-orange-500); */
  background-color: var(--color-white-base);
  cursor: pointer;
}

.mobile-filter .mobile-filter-toggle.active {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
}

.mobile-filter-toggle .bi-chevron-down {
  transition: transform 0.3s ease;
}

.mobile-filter-toggle.active .bi-chevron-down {
  transform: rotate(180deg);
}

/* --- 手機版下拉選單本體樣式 --- */
.mobile-filter-dropdown {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: var(--color-white-base);
  border: 1px solid var(--color-gray-line);
  box-shadow: var(--c-shadow-soft);
  z-index: 10;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
}

.mobile-filter-dropdown li {
  padding: 12px 28px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mobile-filter-dropdown li:hover {
  background-color: var(--color-gray-area);
}

.mobile-filter-dropdown li.active {
  background-color: var(--color-orange-light);
  color: var(--color-text-primary);
  font-weight: 700;
}

/* --- 選單出現/消失的動畫 --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

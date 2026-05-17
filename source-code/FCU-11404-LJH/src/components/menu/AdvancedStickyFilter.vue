<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import DropdownFilter from '@/components/menu/DropdownFilter.vue';
const props = defineProps({
  // 分類篩選器相關
  categories: { type: Array, required: true },
  activeCategory: { type: String, required: true },
  // 標籤篩選器相關
  tags: { type: Array, required: true },
  activeTags: { type: Array, required: true },
});

const emit = defineEmits(['update:activeCategory', 'update:activeTags']);

// 置頂 (Sticky) 狀態相關邏輯 
const filterContainerRef = ref(null);
const isSticky = ref(false);
let initialTop = 0;

const handleScroll = () => {
  if (window.innerWidth <= 769 && filterContainerRef.value) {
    if (initialTop > 0 && window.scrollY > initialTop) {
      isSticky.value = true;
    } else {
      isSticky.value = false;
    }
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  // 使用 nextTick 確保 DOM 元素已渲染
  if (filterContainerRef.value) {
    initialTop = filterContainerRef.value.offsetTop;
  }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 處理篩選
const tagButtonLabel = computed(() => {
  if (props.activeTags.length === 0) return '全部標籤';
  return `已選 ${props.activeTags.length} 項`;
});

// 在橫向捲動模式下點擊標籤的處理函式
const handleStickyTagClick = (option, type) => {
  if (type === 'category') {
    emit('update:activeCategory', option);
  } else if (type === 'tag') {
    // 沿用 InformationView 中的複選邏輯
    const conflictingPairs = { '青少年': '全年齡', '全年齡': '青少年', '開放報名': '報名截止', '報名截止': '開放報名' };
    const newTags = [...props.activeTags];
    const index = newTags.indexOf(option);

    if (index > -1) {
      newTags.splice(index, 1);
    } else {
      const conflictingTag = conflictingPairs[option];
      if (conflictingTag && newTags.includes(conflictingTag)) {
        newTags.splice(newTags.indexOf(conflictingTag), 1);
      }
      newTags.push(option);
    }
    emit('update:activeTags', newTags);
  }
};
</script>

<template>
  <div ref="filterContainerRef">
    <div :style="{ height: isSticky ? '80px' : 'auto' }">
      <div class="advanced-filter-wrapper" :class="{ 'is-sticky': isSticky }">
        <div v-if="!isSticky" class="initial-state">
          <DropdownFilter
            theme="orange"
            :label="activeCategory"
            :options="categories"
            :modelValue="activeCategory"
            @update:modelValue="emit('update:activeCategory', $event)"/>
          <DropdownFilter
            theme="blue"
            :label="tagButtonLabel"
            :options="tags"
            :modelValue="activeTags"
            @update:modelValue="emit('update:activeTags', $event)"
            :multiple="true"/>
        </div>

        <div v-else class="sticky-state">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="handleStickyTagClick(cat, 'category')"
            :class="['sticky-tag', activeCategory === cat ? 'active-orange' : 'inactive']">{{ cat }}
          </button>
          <div class="divider"></div>
          <button
            v-for="tag in tags"
            :key="tag"
            @click="handleStickyTagClick(tag, 'tag')"
            :class="['sticky-tag', activeTags.includes(tag) ? 'active-blue' : 'inactive']">{{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.advanced-filter-wrapper {
  transition: all 0.3s ease;
  background-color: var(--color-white-base);
}

.advanced-filter-wrapper.is-sticky {
  position: fixed;
  top: 6.25rem; /* 100px */
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--color-gray-line);
  padding: 0 1rem;
}

/* --- 初始狀態：並排下拉選單 --- */
.initial-state {
  display: flex;
  gap: 1rem;
  padding: 0 1rem 1.5rem 1rem;
}

/* --- 置頂狀態：橫向捲動標籤 --- */
.sticky-state {
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem 0;
  /* 隱藏滾動條 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.sticky-state::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.sticky-tag {
  display: inline-block;
  padding: 8px 16px;
  margin-right: 0.5rem;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.sticky-tag.inactive {
  background-color: #f3f4f6; /* light gray */
  color: var(--color-text-primary);
}
.sticky-tag.inactive:hover {
  background-color: #e5e7eb; /* slightly darker gray */
}
.sticky-tag.active-orange {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
}
.sticky-tag.active-blue {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
}

.divider {
  height: 24px;
  width: 1px;
  background-color: #e5e7eb; /* light gray */
  margin: 0 1rem;
  flex-shrink: 0;
}
</style>
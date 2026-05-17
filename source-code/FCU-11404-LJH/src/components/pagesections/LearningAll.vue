<script setup>
import { ref, computed, watch } from 'vue';
// 移除 CategoryButton，因為它現在只在 LearningCard 中使用
import ResponsiveFilterGroup from '@/components/menu/ResponsiveFilterGroup.vue';
// 引入新的 LearningCard 元件
import LearningCard from '@/components/card/LearningCard.vue'; // 假設 LearningCard.vue 與此檔案在同目錄
import FutureLinks from '@/assets/data/future_links.json';

defineOptions({
  name: 'LearningUnitList'
});

const learningAllRef = ref(null);
const categoryButtons = ref([
  '全部資源', '心理健康與成長', '學習資訊', '升學與職涯探索', '法律知識與權益保障'
]);

const learningUnits = ref(FutureLinks);
const selectedCategory = ref('全部資源');
const filteredLearningUnits = computed(() => {
  if (selectedCategory.value === '全部資源') {
    return learningUnits.value;
  }
  return learningUnits.value.filter(unit => unit.category === selectedCategory.value);
});

watch(selectedCategory, () => {
  if (learningAllRef.value) {
    const elementPosition = learningAllRef.value.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 220;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
});

// 負責接收從 LearningCard 子元件傳來的事件
function selectCategory(category) {
  selectedCategory.value = category;
};
</script>

<template>
  <div ref="learningAllRef">
    <div class="filter-buttons categories mb-5">
      <ResponsiveFilterGroup :buttons="categoryButtons" v-model:activeCategory="selectedCategory" :sticky="false" />
    </div>
    <LearningCard
      v-for="unit in filteredLearningUnits"
      :key="unit.id"
      :unit="unit"
      @category-click="selectCategory"
    />

  </div>
</template>

<style scoped>
/* 卡片相關樣式都已移至 LearningCard.vue，樣式清空 */
</style>
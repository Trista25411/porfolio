<script setup>
import { ref, computed, watch } from 'vue';

// 匯入banner元件及圖片
import Banner from '@/components/sections/Banner.vue';
import banner1920 from '@/assets/img/banner/resource-map-banner-1920.png';
import banner1400 from '@/assets/img/banner/resource-map-banner-1400.png';
import banner1200 from '@/assets/img/banner/resource-map-banner-1200.png';
import banner996 from '@/assets/img/banner/resource-map-banner-996.png';
import banner765 from '@/assets/img/banner/resource-map-banner-765.png';
import banner576 from '@/assets/img/banner/resource-map-banner-576.png';

const resourceMapBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

const resourceMapDefaultBannerSrc = banner576;

import ContactCard from '@/components/card/ContactCard.vue';
// 匯入JSON 檔案
import unitsData from '@/assets/data/ResourceMapView_id.json';
import BaseButton from '@/components/button/BaseButton.vue';
import IconDown from '@/components/icons/down.vue';

// 引入新的響應式元件
import ResponsiveFilterGroup from '@/components/menu/ResponsiveFilterGroup.vue';

const filterButtons = ref([
  '全部分類', '家庭與成長支援', '安全與保護', '健康與防治', '就業與職涯', '社區參與', '政府與資源平台'
]);

const activeCategory = ref('全部分類');
const visibleCount = ref(8);
const socialIconMap = {
  'FB': { class: 'bi bi-facebook', name: 'Facebook' },
  'IG': { class: 'bi bi-instagram', name: 'Instagram' },
  'YT': { class: 'bi bi-youtube', name: 'YouTube' }
};

const allCards = ref(unitsData.map(unit => {
  return {
    id: unit.id,
    website: unit.website || '#',
    imageUrl: new URL(`../assets/img/resourcemap/${unit.img}`, import.meta.url).href,
    categories: unit.categories,
    title: unit.name,
    phone: unit.phone,
    email: unit.email,
    address: unit.address,
    socialIcons: (unit.socials || []).map(social => {
      const iconInfo = socialIconMap[social.type];
      if (!iconInfo) return null;
      return {
        ...iconInfo,
        url: social.url
      };
    }).filter(Boolean)
  };
}));

const filteredCards = computed(() => {
  if (activeCategory.value === '全部分類') {
    return allCards.value;
  }
  return allCards.value.filter(card =>
    card.categories.includes(activeCategory.value)
  );
});

const displayedCards = computed(() => {
  return filteredCards.value.slice(0, visibleCount.value);
});

const showLoadMoreButton = computed(() => {
  return visibleCount.value < filteredCards.value.length;
});

// 移除 setCategory 函式，改用 watch 處理副作用
// function setCategory(category) {
//   activeCategory.value = category;
//   visibleCount.value = 8;
// }
watch(activeCategory, (newCategory, oldCategory) => {
  // 當分類改變時，重設顯示的卡片數量
  if (newCategory !== oldCategory) {
    visibleCount.value = 8;
  }
});

function loadMore() {
  visibleCount.value += 8;
}

// 讓 ContactCard 也能觸發分類變更
function setCategoryFromCard(category) {
  activeCategory.value = category;
}
</script>

<template>
  <div class="resource-map-page">
    <Banner :sources="resourceMapBannerSources" :default-src="resourceMapDefaultBannerSrc" bigText="資源地圖"
      smallText="Support Map" />
    <div class="content-section container-padding">
      <div class="content-container">
        <h1 class="text-h1 page-title">資源地圖</h1>
        <div class="filter-buttons-group">
          <ResponsiveFilterGroup :buttons="filterButtons" v-model:activeCategory="activeCategory" />
        </div>
        <div class="card-grid">
          <ContactCard v-for="card in displayedCards" :key="card.id" :card-data="card"
            @category-clicked="setCategoryFromCard" />
        </div>
        <div class="load-more-container">
          <BaseButton v-if="showLoadMoreButton" size="large" shape="pill" variant="solid">
            <button @click="loadMore">
              <span>了解更多</span>
              <IconDown class="c-icon-size-16 c-transition-transform icon-down-on-hover" />
            </button>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-map-page {
  background-image: url(@/assets/img/bg-gray-event-all.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}

.content-section {
  margin-top: 132px;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 54px;
}

.filter-buttons-group {
  margin-bottom: 100px;
}

.card-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.load-more-container {
  text-align: center;
  margin-top: 100px;
  padding-bottom: 150px;
}

@media (max-width: 769px) {
  .content-section {
    margin-top: 80px;
  }

  .page-title {
    margin-bottom: 30px;
  }

  .filter-buttons-group {
    margin-bottom: 60px;
  }

  .card-grid {
    gap: 40px;
  }

  .load-more-container {
    margin-top: 80px;
    padding-bottom: 100px;
  }

  .load-more-button {
    font-size: 20px;
    padding: 12px 22px;
  }
}
</style>
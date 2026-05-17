<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import Banner from '@/components/sections/Banner.vue';
import banner1920 from '@/assets/img/banner/video-banner-1920.png';
import banner1400 from '@/assets/img/banner/video-banner-1400.png';
import banner1200 from '@/assets/img/banner/video-banner-1200.png';
import banner996 from '@/assets/img/banner/video-banner-996.png';
import banner765 from '@/assets/img/banner/video-banner-765.png';
import banner576 from '@/assets/img/banner/video-banner-576.png';

const videoBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];
const videoDefaultBannerSrc = banner576;

import ResponsiveFilterGroup from '@/components/menu/ResponsiveFilterGroup.vue';
import ActivityCardArrow from '@/components/card/ActivityCardArrow.vue';
import VideoActivityCard from '@/components/card/VideoActivityCard.vue';
import ImageLightbox from '@/components/modal/ImageLightbox.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import IconDown from '@/components/icons/down.vue'
import eventPhotoData from '@/assets/data/EventPhotos.json';
import eventVideoData from '@/assets/data/EventVideo.json';

const route = useRoute();
const modules = ref([]);
const isLightboxVisible = ref(false);
const lightboxStartIndex = ref(0);
// 用來存放「當前被點擊活動」的所有圖片
const lightboxImages = ref([]);
const orangeButtons = ref([
  { text: '全部類型' },
  { text: '休閒娛樂' },
  { text: '競賽與體育' },
  { text: '學習與成長' },
  { text: '宣導與展覽' },
  { text: '公益與志工' },
]);

const activeCategory = ref('全部類型');
const visiblePhotoCount = ref(6);

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// 處理 JSON 資料時，額外保存 allPhotos 和 fullTitle
const allActivityCards = ref(eventPhotoData.map(event => {
  let category = event.category;
  if (category === '公益與志工服務') {
    category = '公益與志工';
  }
  return {
    id: event.id,
    // 卡片封面圖仍然使用第一張照片
    imageUrl: new URL(`../assets/img/eventphotos/${event.photos[0]}`, import.meta.url).href,
    category: { text: category, url: '#' },
    title: { text: event.title, url: '#' },
    moreUrl: '#',
    // 【新增】將原始的 photos 陣列和 title 保存起來，以供燈箱使用
    allPhotos: event.photos, // 保存所有照片檔名
    fullTitle: event.title // 保存完整標題
  };
}));

const allVideoCards = ref(eventVideoData.map((video, index) => ({
  id: index,
  videoId: getYouTubeId(video.link),
  category: video.category,
  title: video.title,
  categoryUrl: '#',
  titleUrl: '#',
  learnMoreUrl: '#'
})));

const filteredActivityCards = computed(() => {
  if (activeCategory.value === '全部類型') {
    return allActivityCards.value;
  }
  return allActivityCards.value.filter(card => card.category.text === activeCategory.value);
});

const displayedActivityCards = computed(() => {
  return filteredActivityCards.value.slice(0, visiblePhotoCount.value);
});

const showLoadMorePhotosButton = computed(() => {
  return visiblePhotoCount.value < filteredActivityCards.value.length;
});

const filteredVideoCards = computed(() => {
  if (activeCategory.value === '全部類型') {
    return allVideoCards.value;
  }
  return allVideoCards.value.filter(video => video.category === activeCategory.value);
});

const openLightbox = (clickedCardId) => {
  // 從所有活動卡片中，找到被點擊的那一張
  const clickedCard = allActivityCards.value.find(card => card.id === clickedCardId);
  if (clickedCard && clickedCard.allPhotos) {
    // 將該活動的所有照片檔名，轉換成 ImageLightbox 元件需要的格式
    lightboxImages.value = clickedCard.allPhotos.map((photoName, index) => ({
      id: `${clickedCard.id}-${index}`, // 建立一個唯一的 key
      imageUrl: new URL(`../assets/img/eventphotos/${photoName}`, import.meta.url).href,
      title: { text: clickedCard.fullTitle } // 標題對所有照片都一樣
    }));

    // 設定從第一張圖片開始顯示
    lightboxStartIndex.value = 0;
    // 顯示
    isLightboxVisible.value = true;
  }
};

// 關閉時，清空圖片陣列
const closeLightbox = () => {
  isLightboxVisible.value = false;
  lightboxImages.value = []; // 清空陣列是個好習慣
};

function updateCategoryFromRoute(categoryName) {
  const targetCategory = categoryName || '全部類型';
  const isValidCategory = orangeButtons.value.some(btn => btn.text === targetCategory);
  if (isValidCategory) {
    activeCategory.value = targetCategory;
  }
}

function loadMorePhotos() {
  visiblePhotoCount.value += 6;
}

watch(activeCategory, (newCategory, oldCategory) => {
  if (newCategory !== oldCategory) {
    visiblePhotoCount.value = 6;
  }
});

watch(
  () => route.query.category,
  (newCategory) => {
    updateCategoryFromRoute(newCategory);
  }
);

onMounted(() => {
  updateCategoryFromRoute(route.query.category);
});

function setCategoryFromCard(category) {
  activeCategory.value = category;
}
</script>

<template>
  <div class="video-view">
    <Banner :sources="videoBannerSources" :default-src="videoDefaultBannerSrc" bigText="活動影音" smallText="Event Video" />
    <main class="main-content container-padding">
      <ResponsiveFilterGroup :buttons="orangeButtons" v-model:activeCategory="activeCategory" class="mb-5" />
      <div class="section-title text-h1">活動照片</div>
      <div class="activity-card-grid">
        <ActivityCardArrow v-for="card in displayedActivityCards" :key="card.id" :card-data="card"
          @image-click="openLightbox(card.id)" />
      </div>
      <div class="blue-button-container">
        <BaseButton v-if="showLoadMorePhotosButton" size="large" shape="pill" variant="solid">
          <button @click="loadMorePhotos" class="button-content">
            <span>探索更多</span>
            <IconDown class="load-more-icon c-transition-transform c-icon-size-16 icon-down-on-hover" />
          </button>
        </BaseButton>
      </div>
    </main>
    <div class="video-section-wrapper ">
      <div class="section-title text-h1">活動影片</div>
      <div class="video-carousel-container">
        <swiper :key="activeCategory" :slides-per-view="'auto'" :space-between="30" :centered-slides="false"
          :modules="modules" class="mySwiper">
          <swiper-slide v-for="video in filteredVideoCards" :key="video.id">
            <VideoActivityCard :card-data="video" @category-click="setCategoryFromCard" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <ImageLightbox :images="lightboxImages" :start-index="lightboxStartIndex" :show="isLightboxVisible"
      @close="closeLightbox" />
  </div>
</template>

<style scoped>
.video-view {
  background-image: url(../assets/img/bg-gray-event-all.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: var(--font-main);
  color: var(--color-text-primary);
}

.main-content {
  max-width: 1400px;
  margin: 132px auto 0;
  padding: 0 20px;
}

.button-group {
  justify-content: center;
}

.section-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: 50px;
}

.activity-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 28px;
}

.blue-button-container {
  text-align: center;
  margin-top: 50px;
}

.video-section-wrapper {
  margin-top: 220px;
}

.video-carousel-container {
  padding-left: 50px;
  position: relative;
}

.mySwiper {
  width: 100%;
  height: 800px;
  padding-bottom: 20px;
}

.swiper-slide {
  width: auto;
}

@media (max-width: 1400px) {
  .main-content {
    max-width: 992px;
  }

  .activity-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .video-carousel-container {
    padding-left: 20px;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-top: 80px;
  }

  .activity-card-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .video-section-wrapper {
    margin-top: 150px;
  }

  .video-carousel-container {
    padding-left: 15px;
  }
}
</style>
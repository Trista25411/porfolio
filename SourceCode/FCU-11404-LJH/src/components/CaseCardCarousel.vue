<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

// 匯入 CategoryButton 元件
import CategoryButton from '@/components/button/CategoryButton.vue';

// 匯入圖片資源
// 動態載入圖片，先載入所有圖片，使用 import.meta.glob
const imageUrls = import.meta.glob('@/assets/img/future/future-awareness/*.{jpg,png,svg}');
const resolvedImages = ref({});

// 定義 props，接收從父元件傳來的 awarenessData
const props = defineProps({
  awarenessData: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// 在元件掛載時解析所有圖片路徑
onMounted(async () => {
  for (const item of props.awarenessData) {
    const path = `/src/assets/img/future/future-awareness/${item.imageUrl}`;
    const module = await imageUrls[path]();
    resolvedImages.value[item.id] = module.default;
  }
});

const modules = [Mousewheel];
const swiperOptions = {
  // 3. 開啟滾輪控制
  mousewheel: {
    forceToAxis: true, // 重要：這會讓它只捕捉橫向滾動，不會干擾到頁面垂直捲動
  },
// 讓 Swiper 監控 DOM 變化自動更新
  observer: true,
  observeParents: true,
  
  breakpoints: {
    // 當視窗寬度 >= 1024px 時
    1024: {
      slidesPerView: 1.2,
      spaceBetween: 50,
      centeredSlides: false, // 桌面版靠左
    },
    // 當視窗寬度 < 1024px 時
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true, // 手機版居中
    },
  }
};

// 追蹤目前展開的卡片索引，初始值為 -1 
const expandedCardIndex = ref(-1);

// 切換卡片的展開狀態
const toggleExpand = (index) => {
  // 如果點擊的卡片已經是展開狀態，則收回
  if (expandedCardIndex.value === index) {
    expandedCardIndex.value = -1;
  } else {
    // 否則，展開這張卡片
    expandedCardIndex.value = index;
  }
};

// 檢查卡片是否處於展開狀態
const isExpanded = (index) => {
  return expandedCardIndex.value === index;
};
</script>

<template>
  <div class="awareness-carousel-wrapper">
    <swiper v-if="props.awarenessData.length > 0" v-bind="swiperOptions" :modules="modules" :navigation="false" :pagination="false" class="awarenessSwiper">
      <swiper-slide v-for="(item, index) in props.awarenessData" :key="index">
        <div class="case-study-card d-flex align-items-center ui-radius-48 c-shadow-soft c-bg-white-base">
          <div class="image-container d-flex justify-content-center align-items-center"
            :class="{ 'is-expanded': isExpanded(index) }">
            <img :src="resolvedImages[item.id]" alt="案例研究圖片" class="case-image">
          </div>
          <div class="info-container d-flex flex-column">
            <div class="mb-24">
              <CategoryButton :text="item.category" />
            </div>
            <div class="mb-19 content-wrapper">
              <div class="card-title text-h3">{{ item.title }}</div>
              <p class="card-content text-p"
                :class="{ 'long-content': item.description.length > 100, 'is-expanded': isExpanded(index) }">{{
                  item.description }}</p>
              <div class="expand-btn-container" v-if="item.description.length > 100">
                <button @click="toggleExpand(index)" class="expand-btn c-text-blu-500 text-p">
                  {{ isExpanded(index) ? '收回' : '查看更多' }} <span class="arrow">{{ isExpanded(index) ?
                    '↑' : '↓' }}</span>
                </button>
              </div>
            </div>
            <div class="d-flex flex-wrap align-items-center mb-19">
              <a v-for="(tag, tagIndex) in item.tags" :key="tagIndex" :href="tag.link"
                class="tag-link text-p c-text-blu-500"> #{{ tag.text }}</a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
:deep(.swiper-slide) {
  height: auto;
  display: flex;
}
.case-study-card {
  height: auto;
  border: 1px solid #E0E0E0;
  transition: all 0.5s ease-in-out;
  border-radius: 48px;
  overflow: hidden;
}

.image-container {
  width: 560px;
  padding: 40px;
  flex-shrink: 0;
  /* 設定一個預設的最小高度，確保圖片區塊在收起時不會太小 */
  height: 180px;
}

/* 展開時的 .image-container 樣式 */
.image-container.is-expanded {
  /* 展開時高度自動，讓圖片完整顯示 */
  height: auto;
}

/* 圖片本身的樣式 */
.case-image {
  width: 80%;
  border-radius: 25px;
  object-fit: cover;
}

/* 圖片在展開狀態下的樣式 */
.image-container.is-expanded .case-image {
  width: 100%;
  /* 讓圖片在展開時填滿容器 */
}

.info-container {
  flex-grow: 1;
  padding: 44px;
  color: var(--color-text-primary, #2C3E50);
  overflow: hidden;
}

.content-wrapper {
  position: relative;
}

.card-content {
  line-height: 1.6;
  white-space: pre-line;
  max-height: 180px;
  overflow: hidden;
  position: relative;
}

.card-content:not(.long-content) {
  max-height: none;
}

/* 展開狀態的樣式 */
.card-content.is-expanded {
  max-height: 2000px;
}

/* 漸層遮罩，只在長內容且未展開時顯示 */
.card-content.long-content:not(.is-expanded)::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, rgba(253, 253, 253, 1), rgba(253, 253, 253, 0));
  pointer-events: none;
}

.mb-24 {
  margin-bottom: 24px;
}

.card-title {
  margin-bottom: 24px;
  white-space: normal;
  overflow-wrap: break-word;
}

.expand-btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  transition: color 0.3s;
}

.expand-btn:hover {
  color: var(--color-orange-500, #FF7F50);
}

.expand-btn .arrow {
  margin-left: 5px;
  font-size: 1.2em;
}

.tag-link {
  text-decoration: none;
  margin-right: 16px;
  transition: color 0.3s;
}

.tag-link:hover {
  color: var(--color-orange-500, #FF7F50);
}

.awareness {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.awareness-carousel-wrapper {
  position: relative;
  overflow: hidden;
}

  /* 增加 padding 為陰影預留空間 */
.awareness-carousel-wrapper :deep(.swiper) {
  padding-bottom: 20px;
}

.awareness-carousel-wrapper :deep(.case-study-card) {
  margin-bottom: 20px;
}

.awarenessSwiper {
  width: 100%;
  height: auto;
  padding: 0 ;
}

@media (min-width: 1024px) {
  .case-study-card {
    display: flex;
    flex-direction: row;
  }

  .image-container {
    padding: 40px 0 40px 40px;
  }

  .info-container {
    padding: 45px;
  }

  .awarenessSwiper {
    padding-left: max(20px, calc(50% - 700px)) !important;
  }
}

@media (max-width: 1023px) {
  .text-h1 {
    font-size: 24px;
    padding: 0 20px;
    margin-bottom: 20px;
  }

  .awareness-carousel-wrapper {
    padding: 0;
  }

  .awarenessSwiper {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .case-study-card {
    border-radius: 20px;
    display: flex;
    flex-direction: column;
  }

  .image-container {
    padding: 20px 20px 0;
    width: 100%;
    height: 180px;
  }

  .case-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-container.is-expanded .case-image {
        height: auto;
    }

  .info-container {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
    margin-bottom: 15px;
    white-space: normal;
  }

  .card-content {
    font-size: 16px;
    max-height: 120px;
  }

  .expand-btn {
    font-size: 16px;
  }

  .tag-link {
    font-size: 16px;
  }

  .mb-24 {
    margin-bottom: 15px;
  }

  .mb-19 {
    margin-bottom: 10px;
  }
}
</style>
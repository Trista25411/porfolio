<script setup>
import { ref, shallowRef, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Banner from '../components/sections/Banner.vue';

// banner圖片
import banner1920 from '@/assets/img/banner/home-banner-1920.png';
import banner1400 from '@/assets/img/banner/home-banner-1400.png';
import banner1200 from '@/assets/img/banner/home-banner-1200.png'; // 檔名有個多餘的 r，我先修正
import banner996 from '@/assets/img/banner/home-banner-996.png';
import banner765 from '@/assets/img/banner/home-banner-765.png';
import banner576 from '@/assets/img/banner/home-banner-576.png';

// 建立符合 Banner 元件 props 格式的資料
const bannerSources = [
  // 當螢幕寬度大於等於 1401px 時，使用 1920 的圖
  { media: '(min-width: 1401px)', srcset: banner1920 },
  // 當螢幕寬度大於等於 1201px 時，使用 1400 的圖
  { media: '(min-width: 1201px)', srcset: banner1400 },
  // 當螢幕寬度大於等於 997px 時，使用 1200 的圖
  { media: '(min-width: 997px)', srcset: banner1200 },
  // 當螢幕寬度大於等於 766px 時，使用 996 的圖
  { media: '(min-width: 766px)', srcset: banner996 },
  // 當螢幕寬度大於等於 577px 時，使用 765 的圖
  { media: '(min-width: 577px)', srcset: banner765 },
  // 當螢幕寬度大於等於 361px 時，使用 576 的圖
];

// 指定一張預設/最小尺寸的圖片
const defaultBannerSrc = banner576;

import EventBanner from '@/components/card/EventBanner.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import IconRight from '@/components/icons/right.vue';
import IconDown from '@/components/icons/down.vue'
import IconLeisure from '@/components/iconsecd/IconLeisure.vue';
import IconCompetition from '@/components/iconsecd/IconCompetition.vue';
import IconLearning from '@/components/iconsecd/IconLearning.vue';
import IconExhibition from '@/components/iconsecd/IconExhibition.vue';
import IconCharity from '@/components/iconsecd/IconCharity.vue';

// 匯入資源地圖的 JSON 資料
import resourceMapData from '@/assets/data/ResourceMapView_id.json';
// 匯入活動列表的 JSON 資料
import eventListData from '@/assets/data/EventList.json';

// 圖片資源
import policeImg from '@/assets/img/index/informap/police.png';
import teenagerImg from '@/assets/img/index/informap/teenager.png';
import sportImg from '@/assets/img/index/informap/sport.png';
import educateImg from '@/assets/img/index/informap/educate.png';
import societyImg from '@/assets/img/index/informap/society.png';
import healthImg from '@/assets/img/index/informap/health.png';
import familyImg from '@/assets/img/index/informap/family.png';
import poisonImg from '@/assets/img/index/informap/poison.png';
import yingxiImg from '@/assets/img/index/informap/yingxi.png';
import welfareImg from '@/assets/img/index/informap/welfare.png';
import showjyuImg from '@/assets/img/index/informap/showjyu.png';
import gardenhopeImg from '@/assets/img/index/informap/gardenhope.png';

const router = useRouter();
const modules = [Navigation];

const getBannerImageUrl = (name) => {
  return new URL(`../assets/img/event/information/${name}`, import.meta.url).href;
};

const featuredEventOrder = ['d05_results', 'e01_old', 'c04_ability', 'e02_eye', 'c09_teenager', 'c03_dream'];
const featuredEvents = computed(() => {
  const eventMap = new Map(eventListData.map(event => [event.id, event]));
  return featuredEventOrder.map(id => {
    const event = eventMap.get(id);
    if (!event || !event.imageBannerUrl) {
      console.warn(`精選活動 ID '${id}' 在 EventList.json 中找不到，或缺少 imageBannerUrl。`);
      return null;
    }

    const eventTime = event.dateTime.startsWith('時間:') ? event.dateTime.substring(3).trim() : event.dateTime;
    const locationText = event.location.startsWith('地點:') ? event.location.substring(3).trim() : event.location;

    // 根據 targetAudience 動態產生標籤和對應的連結
    const dynamicTags = [];
    const audience = event.targetAudience || ''; // 確保 targetAudience 欄位存在

    if (audience.includes('青少年')) {
      dynamicTags.push({
        text: '青少年',
        link: `/information?tag=青少年` // 點擊後導向 InformationView 並篩選 '青少年'
      });
    } else if (audience.includes('全年齡')) {
      dynamicTags.push({
        text: '全年齡',
        link: `/information?tag=全年齡` // 點擊後導向 InformationView 並篩選 '全年齡'
      });
    }

    // 回傳給 EventBanner 的 props 物件
    return {
      id: event.id,
      // category.url 動態指向 InformationView 並帶上分類 query
      category: {
        text: event.category,
        url: `/information?category=${encodeURIComponent(event.category)}`
      },
      title: event.title,
      eventTime: eventTime,
      location: { text: locationText, url: "#" }, // 地點連結維持不變，因為沒有對應頁面
      imageUrl: getBannerImageUrl(event.imageBannerUrl),
      // 使用上面產生的 dynamicTags
      tags: dynamicTags,
    };
  }).filter(event => event !== null);
});

// 活動類別項目
const eventCategories = shallowRef([
  { name: "休閒娛樂", iconComponent: IconLeisure },
  { name: "競賽與體育", iconComponent: IconCompetition },
  { name: "學習與成長", iconComponent: IconLearning },
  { name: "宣導與展覽", iconComponent: IconExhibition },
  { name: "公益與志工服務", iconComponent: IconCharity },
]);

// 建立圖片檔名與匯入圖片變數的對應關係
const imageMap = {
  '01_taichung_police_department.png': policeImg,
  '02_taichung_juvenile_guidance_committee.png': teenagerImg,
  '09_taichung_sports_bureau.png': sportImg,
  '05_taichung_education_bureau.png': educateImg,
  '06_taichung_social_bureau.png': societyImg,
  '07_taichung_health_bureau_mini_satellite.png': healthImg,
  '10_taichung_d_vand_sa_prevention_center.png': familyImg,
  '11_moj_anti_drug_base.png': poisonImg,
  '17_ying_si_welfare_foundation.png': yingxiImg,
  '16_cwlf_child_welfare_league_foundation.png': welfareImg,
  '15_chang_shiou_ju_charity_foundation.png': showjyuImg,
  '13_the_garden_of_hope_foundation.png': gardenhopeImg,
};

// 根據 JSON 資料動態生成資源地圖連結
const infoMapAreas = ref(
  resourceMapData
    .filter(item => imageMap[item.img]) // 只選取有對應圖片的資料
    .map(item => ({
      name: item.name,
      imageSrc: imageMap[item.img], // 從對應表中取得圖片
      link: item.website, // 從 JSON 中取得官網連結
    }))
);

// 跳轉到 InformationView 的方法
const goToInformation = (categoryName) => {
  router.push({ path: '/information', query: { category: categoryName } });
};
</script>

<template>
  <Banner :sources="bannerSources" :default-src="defaultBannerSrc" bigText="從這裡開始，
    成為自己的英雄！" smallText="找活動、學技能、交朋友，一站搞定！" />

  <!-- 簡介 -->
  <div class="section-container intr-area container-padding">
    <div class="row align-items-center flex-column flex-lg-row">
      <div class="col-lg-5 order-1 order-lg-2">
        <div class="intr-text">
          <div class="text-h1">少年英雄聯盟是什麼？</div>
          <div class="text-p">
            我們是一個專為臺中青少年打造的平台，集合活動資訊、學習資源和各種支援服務。
          </div>
          <div class="text-p">
            想參加酷活動、探索未來方向，這裡都找得到！
          </div>
          <BaseButton size="large" shape="pill" variant="solid" class="bluebutton">
            <router-link to="/about">
              <span>了解更多</span>
              <IconRight class="c-icon-size-16 c-transition-transform icon-right-on-hover" />
            </router-link>
          </BaseButton>
        </div>
      </div>
      <div class="col-lg-7 order-2 order-lg-1">
        <img src="../assets/img/index/index-intr.svg" alt="少年英雄聯盟簡介圖" class="intr-img">
      </div>
    </div>
  </div>

  <!-- 精選活動 -->
  <div class="event-area">
    <div class="section-container">
      <div class="row justify-content-center">
        <div class="col-12 text-h1 space-1">精選活動</div>
        <div class="col-12">
          <swiper :navigation="true" :modules="modules" :slides-per-view="1" :space-between="30" class="mySwiper">
            <swiper-slide v-for="(event, index) in featuredEvents" :key="index">
              <!-- EventBanner 元件接收處理好的 props 並正確渲染連結 -->
              <EventBanner :eventData="event" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>

  <!-- 活動分類 -->
  <div class="event-cata-area c-bg-gray-area">
    <div class="section-container">
      <div class="row">
        <div class="text-h1 space-1 col-12">活動分類</div>
        <div class="event-cata-icon-wrapper col-12">
          <div class="event-cata-icon">
            <div v-for="(category, index) in eventCategories" :key="index"
              class="cata text-h4 c-bg-white-base ui-radius-48 c-shadow-soft" @click="goToInformation(category.name)">
              <component :is="category.iconComponent" />
              <div class="fw-bold">{{ category.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 未來研究室 -->
  <div class="lab">
    <div class="section-container lab-container">
      <div class="row align-items-center flex-column-reverse flex-lg-row">
        <div class="col-lg-5">
          <div class="text-area">
            <div class="lab-title">
              <div class="bold">對未來感到迷茫？</div>
              <div class="bold">想更了解自己？</div>
            </div>
            <div class="sub-content">
              <div>這裡整合各種資訊網站，</div>
              <div>帶你探索自我的無限可能！</div>
            </div>
            <BaseButton size="large" shape="pill" variant="solid" class="bluebutton">
              <router-link to="/future">
                <span>了解更多</span>
                <IconRight class="c-icon-size-16 c-transition-transform icon-right-on-hover" />
              </router-link>
            </BaseButton>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="lab-pic">
            <img src="@/assets/img/index/index-lab-pic.png" alt="未來研究室示意圖" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 資源地圖 -->
  <div class="map-area c-bg-gray-area">
    <div class="section-container">
      <div class="row">
        <div class="text-h1 space-1 col-12">資源地圖</div>
        <div class="connect col-12">
          <div v-for="(area, index) in infoMapAreas" :key="index" class="area">
            <!-- 連結現在會動態指向 JSON 中的 website -->
            <a :href="area.link" target="_blank" rel="noopener noreferrer">
              <img :src="area.imageSrc" :alt="area.name">
            </a>
          </div>
        </div>
        <BaseButton size="large" shape="pill" variant="solid" class="bluebutton2 mx-auto">
          <router-link to="/resource-map">
            <span>了解更多</span>
            <IconDown class="c-icon-size-16 c-transition-transform icon-down-on-hover" />
          </router-link>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-container {
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
}

/* intr ------------------------------------- */
.intr-area {
  margin-top: 100px;
  margin-bottom: 100px;
}

.intr-area .row {
  --bs-gutter-x: 100px;
}

.intr-img {
  width: 100%;
  display: block;
}

.intr-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  height: 100%;
}

/* event component------------------------------------------- */
.event-area {
  padding-top: 100px;
  padding-bottom: 100px;
  background-image: url(../assets/img/index/index-bg-gray-event.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 100px;
}

.event-area .mySwiper {
  padding-bottom: 40px;
}

/* 使用 :deep() 選擇器來影響 Swiper 的內部元素 */
.event-area :deep(.swiper-button-next),
.event-area :deep(.swiper-button-prev) {
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  border: 1px solid #EAEAEA;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  top: 50%;
  transform: translateY(-50%);
}

.event-area :deep(.swiper-button-next)::after,
.event-area :deep(.swiper-button-prev)::after {
  content: '';
}

.event-area :deep(.swiper-button-next) {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 18L15 12L9 6' stroke='%2333363F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
}

.event-area :deep(.swiper-button-prev) {
  transform: translateY(-50%) rotate(180deg);
  /* 將左箭頭旋轉 */
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 18L15 12L9 6' stroke='%2333363F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
}

.event-area :deep(.swiper-button-next.swiper-button-disabled),
.event-area :deep(.swiper-button-prev.swiper-button-disabled) {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}

.event-area :deep(.swiper-slide) {
  height: auto;
  display: flex;
  justify-content: center;
}

/* event-cata ----------------------------- */
.event-cata-area {
  padding-top: 100px;
  padding-bottom: 100px;
}

.event-cata-icon-wrapper {
  padding: 0 25px;
}

.event-cata-icon {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.cata {
  width: 16rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5625rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  --svg-color: var(--color-blue-500);
  cursor: pointer;
}

.cata svg {
  transition: color 0.3s ease;
}

.cata:hover {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
  --svg-color: var(--color-white-base);
}

/* lab ------------------------------- */
.lab {
  background-color: var(--color-gray-area);
  background-image: url(../assets/img/bg-orange.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 1200px;
  display: flex;
  align-items: center;
}

.lab-container .row {
  --bs-gutter-x: 50px;
}

.text-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  color: #fff;
  height: 100%;
}

.lab-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

.sub-content {
  font-size: var(--font-size-p);
  line-height: 1.5;
}

.lab-pic img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.bluebutton {
  max-width: 160px;
  align-self: flex-end;
}

/* infor map-------------------------------- */
.map-area {
  padding: 100px 0;
}

.connect {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 50px;
}

.area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.area img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.area a:hover img {
  opacity: 0.9;
  transform: translateY(-5px);
}


/* 按鈕-------------------------------- */
.bluebutton {
  max-width: 160px;
  align-self: flex-end;
}


.bluebutton2 {
  width: fit-content;
}

/* infor map-------------------------------- */
@media (max-width: 992px) {
  .intr-area .row {
    --bs-gutter-x: 1.5rem;
  }

  .intr-text {
    margin-bottom: 50px;
    text-align: center;
  }

  .intr-text .bluebutton {
    margin: 0 auto;
  }

  .lab {
    height: auto;
    padding: 100px 0;
  }

  .lab-container .row {
    --bs-gutter-x: 1.5rem;
  }

  .lab-pic {
    margin-bottom: 50px;
  }

  .text-area {
    text-align: center;
  }

  .bluebutton {
    align-self: center;
  }
}

@media (max-width: 1200px) {
  .connect {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .connect {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .connect {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
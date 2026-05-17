<script setup>
import BaseButton from '@/components/button/BaseButton.vue';
// 匯入 Banner 組件
import Banner from '@/components/sections/Banner.vue';
// 引入「關於我們」頁面所有尺寸的 Banner 圖片
import banner1920 from '@/assets/img/banner/about-banner-1920.png';
import banner1400 from '@/assets/img/banner/about-banner-1400.png';
import banner1200 from '@/assets/img/banner/about-banner-1200.png';
import banner996 from '@/assets/img/banner/about-banner-996.png';
import banner765 from '@/assets/img/banner/about-banner-765.png';
import banner576 from '@/assets/img/banner/about-banner-576.png';

// 建立要傳遞給 Banner 元件的 sources 陣列
const aboutBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

// 指定預設/最小尺寸的圖片
const aboutDefaultBannerSrc = banner576;

import markImg from '@/assets/img/about/AboutMark.png';
import flagImg from '@/assets/img/about/AboutFlag.png';
import peopleImg from '@/assets/img/about/AboutPeople.png';
import activityImg from '@/assets/img/about/AboutActivity.png';
import learningImg from '@/assets/img/about/AboutLearning.png';
import careImg from '@/assets/img/about/AboutCare.png';
</script>

<template>
  <div class="about-view">
    <Banner :sources="aboutBannerSources" :default-src="aboutDefaultBannerSrc" big-text="關於聯盟" small-text="About us" />
    <main class="container main-content">
      <div class="row content-block align-items-center">
        <div class="col-lg-6 text-center">
          <img :src="markImg" alt="聯盟起源標誌" class="img-fluid content-img content-img-1">
        </div>
        <div class="col-lg-6">
          <div class="text-content">
            <h2 class="text-h2 mb-3">聯盟起源：我們的精神與印記</h2>
            <h3 class="text-h3 mb-5">用愛的網絡守護青少年成長</h3>
            <p class="text-p text-start">
              在這個快速變動的世界，青少年面臨著來自學業、家庭、人際、心理等多方面的挑戰。有時候，你可能不知道該找誰幫忙、去哪裡尋求協助。「少年英雄聯盟」，為了幫助每一位青少年更自信地面對成長的過程，臺中市政府整合各局處與社會資源，無論是找活動、尋求資源或傾訴，我們都在這裡。
            </p>
          </div>
        </div>
      </div>

      <div class="row content-block align-items-center">
        <div class="col-lg-6 order-lg-2 text-center">
          <img :src="flagImg" alt="聯盟旗幟" class="img-fluid content-img content-img-2">
        </div>
        <div class="col-lg-6 order-lg-1">
          <div class="text-content">
            <p class="text-p text-start">
              「少年英雄聯盟」的成立，是為了打造一個專屬於青少年的支持平台。我們相信，透過整合性的資源與服務，可以為青少年建構一個更友善、更支持的成長環境，讓每一位少年英雄都能在這裡找到方向、獲得力量。
            </p>
          </div>
        </div>
      </div>

      <div class="row content-block align-items-center">
        <div class="col-lg-6 text-center">
          <img :src="peopleImg" alt="聯盟成員" class="img-fluid content-img content-img-3">
        </div>
        <div class="col-lg-6">
          <div class="text-content">
            <div class="text-h2 mb-3">宗旨</div>
            <div class="text-p">
              <div>少年英雄聯盟致力於：</div>
              <div>1. 激發青少年「陽光、活力、健康」的潛能。</div>
              <div>2. 提供學習、家庭、情感、人際困擾的實用協助。</div>
              <div>3. 創造交流平台，幫助你找到歸屬感與成長動力。</div>
              <div>我們相信，每個人的故事都值得被書寫，這裡是你的支援。</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="objectives-section">
      <div class="container objectives-content">
        <div class="row">
          <div class="col-12 text-center text-md-start">
            <h2 class="text-h2 mb-3">理念</h2>
            <p class="text-p mb-5 text-start">本平台提供一個人生旅途中的一個起點。透過多元的探索、豐富的學習，以及溫暖的關懷，找到屬於自己的方向，並勇敢地邁出前進的步伐。

            </p>
          </div>
        </div>
        <div class="row justify-content-center">
          <!-- Item 1 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="objective-card">
              <img :src="activityImg" alt="多元活動" class="img-fluid">
     <BaseButton size="large" shape="pill" variant="solid" class="mt-3">
        <router-link to="/information">
          <span>多元活動</span>
        </router-link>
      </BaseButton>
            </div>
          </div>
          <!-- Item 2 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="objective-card">
              <img :src="learningImg" alt="學習資源" class="img-fluid">
      <BaseButton size="large" shape="pill" variant="solid" class="mt-3">
        <router-link to="/future">
          <span>學習資源</span>
        </router-link>
      </BaseButton>
            </div>
          </div>
          <!-- Item 3 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="objective-card">
              <img :src="careImg" alt="關懷協詢" class="img-fluid">
      <BaseButton size="large" shape="pill" variant="solid" class="mt-3">
        <router-link to="/resource-map">
          <span>關懷協詢</span>
        </router-link>
      </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  font-family: var(--font-family-sans);
  color: var(--color-text-primary);
}

.main-content {
  max-width: 1200px;
}

.content-block {
  margin-bottom: 114px;
}

.content-block:last-child {
  padding-bottom: 114px;
  margin-bottom: 0;
}

.content-img-1 {
  max-width: 542px;
}

.content-img-2 {
  max-width: 503px;
}

.content-img-3 {
  max-width: 457px;
}

.text-content {
  text-align: left;
}

h2.mb-3 {
  margin-bottom: 20px !important;
}

h3.mb-5 {
  margin-bottom: 53px !important;
}

.objectives-section {
  background-image: url('../assets/img/about/bg-gray-small.svg');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  min-height: 798px;
  padding: 150px 0 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.objectives-content {
  max-width: 1200px;
}

.objectives-section p {
  margin-top: 20px;
}

.objective-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.objective-card img {
  width: 324px;
  height: 324px;
  object-fit: contain;
  border-radius: 1.5rem;
}

@media (min-width: 992px) {
  .content-block .col-lg-6:nth-child(1) {
    padding-right: 57px;
  }

  .content-block .col-lg-6:nth-child(2) {
    padding-left: 57px;
  }
}

@media (max-width: 992px) {
  .main-content {
    padding-left: 25px;
    padding-right: 25px;
  }

  .content-block {
    margin-bottom: 60px;
  }

  .content-block .col-lg-6 {
    padding: 0;
  }

  .text-content {
    margin-top: 2rem;
    text-align: center;
  }

  .content-img {
    width: 70%;
    height: auto;
  }

  .objectives-section {
    padding: 60px 25px;
    min-height: auto;
  }
}
</style>
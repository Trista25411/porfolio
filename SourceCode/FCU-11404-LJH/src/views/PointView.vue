<script setup>
import Banner from '@/components/sections/Banner.vue';

// 引入「集點活動」頁面所有尺寸的 Banner 圖片
import banner1920 from '@/assets/img/banner/point-banner-1920.png';
import banner1400 from '@/assets/img/banner/point-banner-1400.png';
import banner1200 from '@/assets/img/banner/point-banner-1200.png';
import banner996 from '@/assets/img/banner/point-banner-996.png';
import banner765 from '@/assets/img/banner/point-banner-765.png';
import banner576 from '@/assets/img/banner/point-banner-576.png';

// 建立要傳遞給 Banner 元件的 sources 陣列
const pointBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

// 指定預設/最小尺寸的圖片
const pointDefaultBannerSrc = banner576;
</script>

<template>
  <div class="point-view-page">
    <Banner :sources="pointBannerSources" :default-src="pointDefaultBannerSrc" bigText="聯盟象徵與集點活動"
      smallText="Badge & Points" />
    <div class="container-fluid content-container">

      <!-- 聯盟標章框 -->
      <div class="info-section">
        <div class="row align-items-center">
          <div class="col-lg-6 text-center">
            <img src="@/assets/img/about/PointMark.png" alt="聯盟標章" class="img-fluid img-point-mark">
          </div>
          <div class="col-lg-6">
            <div class="text-content">
              <h1 class="text-h2">聯盟標章：參與與累積的印記</h1>
              <p class="text-p">
                聯盟標章是「少年英雄聯盟」活動的基礎，也是您參與活動的證明。<br>
                只要認真參與聯盟實體活動，即可獲得一枚聯盟標章。<br>
                每枚標章同時代表1點，可用於後續的集點活動兌換精美禮品。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 簡介框 -->
      <div class="info-section section-spacing-113">
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-2 text-center">
            <img src="@/assets/img/about/PointBadge.png" alt="聯盟徽章" class="img-fluid img-point-badge">
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="text-content">
              <div class="text-h2">聯盟徽章：榮譽與認同的印記</div>
              <p class="text-p">
                聯盟徽章（LJH = League of Juvenile Heroes），<br>
                藍色象徵青空萬里、白色代表純潔正義，
                表彰與肯定在活動中的優異表現、成就、貢獻與參與的榮譽標誌，
                並響應我們聯盟的宗旨「陽光、活力、健康」，激勵每位佩戴者積極向上，共同為未來的願景努力，是精神上的承載。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 榮譽集點活動框 -->
    <div class="activity-section section-spacing-50">
      <div class="activity-inner">
        <div class="c-text-white-base">
          <div class="text-h1">榮譽集點活動 活動辦法</div>
          <p class="text-p">參加活動 ➜ 收集標章 ➜ 集點換好禮！</p>
        </div>
        <div class="activity-pic">
          <img src="@/assets/img/about/PointInfo.png" alt="榮譽集點活動辦法">
        </div>
      </div>
    </div>

    <div class="container-fluid content-container">
      <div class="info-section section-spacing-50">
        <div class="row align-items-center">
          <div class="col-lg-6 text-center">
            <img src="@/assets/img/about/PointHow.png" alt="如何獲得聯盟標章" class="img-fluid img-point-how">
          </div>
          <div class="col-lg-6">
            <div class="text-content">
              <h1 class="text-h2">如何獲得聯盟標章及徽章？</h1>
              <p class="text-p">
                標章：參加一個活動即可獲得1個標章。<br>
                一級徽章： 收集5個「聯盟標章」可換得。<br>
                特級徽章： 收集15個「聯盟標章」或對聯盟有特殊貢獻者。<br>
                領取： 活動現場主辦單位服務處。<br>
                注意： 同一活動標章不可重複領取。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 標章換好禮框 -->
      <div class="info-section section-spacing-113">
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-2 text-center">
            <img src="@/assets/img/about/Pointgift.png" alt="標章換好禮" class="img-fluid img-point-gift">
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="text-content">
              <div class="text-h2">累積標章換好禮</div>
              <p class="text-p">
                收集標章可兌換精美禮品：<br>
                2點： 動物造型酒精噴瓶1個。<br>
                4點： 英國熊鏡面伸縮手機架1個。<br>
                6點： 英國熊自動開收摺疊傘1把。<br>
                8點： LOU露小熊法蘭絨毯1個。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 兌換領取地點框 -->
    <div class="location-section-bg section-spacing-113">
      <div class="container-fluid content-container">
        <div class="info-section">
          <div class="row align-items-center">
            <div class="col-lg-6 text-center">
              <img src="@/assets/img/about/PointMap.png" alt="兌換領取地圖" class="img-fluid img-point-map">
            </div>
            <div class="col-lg-6">
              <div class="text-content">
                <h1 class="text-h2">兌換與領取地點總覽</h1>
                <p class="text-p">
                  標章/徽章： 活動現場主辦單位服務處。<br>
                  集點禮品：臺中市少年輔導委員會或臺中市政府警察局少年警察隊。<br>
                  地址： 408 臺中市南屯區干城街2號
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-h1 {
  margin-bottom: 2.5rem;
}

.point-view-page {
  overflow-x: hidden;
  background-color: var(--color-white-base, #fff);
}

.content-container {
  max-width: 1300px;
  padding: 0 50px;
  margin: 0 auto;
}

.info-section {
  padding-top: 113px;
}

.content-container>.info-section:first-of-type {
  padding-top: 113px;
}

.img-point-mark {
  width: 542px;
}

.img-point-badge {
  width: 469px;
}

.img-point-how {
  width: 589px;
}

.img-point-gift {
  width: 542px;
}

.img-point-map {
  width: 500px;
}

.text-content {
  padding: 0 1rem;
}

.row.align-items-center>[class^="col-"] {
  padding: 0 40px;
}

.section-spacing-113 {
  padding-top: 113px;
}

.section-spacing-50 {
  padding-top: 50px;
}

.activity-section {
  background-image: url('@/assets/img/bg-blue-sm.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 1200px;
  padding: 80px 50px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}

.activity-inner {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.activity-pic img {
  max-width: 100%;
  height: auto;
}

.location-section-bg {
  background-image: url('@/assets/img/about/bg-gray-small.svg');
  height: 798px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 113px;
}

.location-section-bg .info-section {
  padding-top: 0;
}

@media (max-width: 992px) {
  .info-section .row>[class^="col-"] {
    padding: 0 15px;
    margin-bottom: 40px;
  }

  .info-section .img-fluid {
    width: 70%;
    height: auto;
  }

  .text-content {
    text-align: center;
  }

  .activity-section {
    min-height: auto;
  }

  .activity-inner {
    flex-direction: column;
    text-align: center;
  }

  .activity-pic {
    margin-top: 40px;
  }

  .activity-section h1 {
    font-size: var(--font-size-h2, 2.1875rem);
  }

  .activity-section p {
    font-size: var(--font-size-h4, 1.5rem);
  }

  .location-section-bg {
    height: auto;
    padding: 80px 0;
  }
}

@media (max-width: 768px) {
  .content-container {
    padding: 0 20px;
  }

  .info-section,
  .section-spacing-113,
  .section-spacing-50,
  .activity-section,
  .location-section-bg {
    padding-top: 60px;
    margin-top: 0;
  }

  .content-container>.info-section:first-of-type {
    padding-top: 60px;
  }
}
</style>
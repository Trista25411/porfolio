<script setup>
import { ref } from 'vue';

// 定義元件的響應式資料
const currentUpdateDate = ref('2025.08.13');

// 在 Vue 3 的 <script setup> 中，這裡定義的變數和函式會自動暴露給模板使用
// 不需要像舊的 Options API 那樣寫在 data() 方法中
</script>

<template>
  <footer class="custom-footer c-bg-gray-area">
    <div class="wave-container">
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 200" preserveAspectRatio="none">
        <path
          d="M0 13.72C0 3.64 9.46 7.54 117.85.98C226.23-5.58 400.73 21.33 553.5 61.46C706.26 101.6 841.02 132.09 993.78 118.71C1146.55 105.33 1259.49 55.61 1488.02 58.87C1716.55 62.12 1845.81 123.69 1920 179.17V200H0Z"
          class="wave-fill"></path>
      </svg>
    </div>

    <div class="content c-bg-blue-500 c-text-white-base">
      <div class="container-padding">
        <div class="footer-content-container">
          <div class="row justify-content-between align-items-end">

            <div class="col-12 col-md-8">
              <div class="row gx-lg-4 align-items-end">
                <div class="col-12 col-lg-auto pe-80">
                  <div class="text-h4 title">少年英雄聯盟</div>
                  <ul class="text-p list-unstyled list mb-4 mb-lg-0">
                    <li><i class="bi bi-calendar-check me-2"></i>政府行政機關辦公日曆表</li>
                    <li><i class="bi bi-clock me-2"></i>辦公時間：08:00-17:00</li>
                    <li><i class="bi bi-clock-history me-2"></i>中午休息：12:00-13:00</li>
                  </ul>
                </div>

                <div class="col-12 col-lg-auto">
                  <div class="text-h4 title">網站資訊</div>
                  <ul class="text-p list-unstyled list mb-0">
                    <li><i class="bi bi-people me-2"></i>瀏覽人次：117,459</li>
                    <li><i class="bi bi-arrow-clockwise me-2"></i>更新日期：{{ currentUpdateDate }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-3 mt-4 mt-md-0">
              <div class="browser-icons">
                <div class="text-h4 mb-3 text-start">建議使用以下瀏覽器</div>
                <div class="text-small row justify-content-center">
                  <div class="col-3">
                    <i class="bi bi-browser-chrome"></i>
                    <p class="mt-3">Chrome</p>
                  </div>
                  <div class="col-3">
                    <i class="bi bi-browser-firefox"></i>
                    <p class="mt-3">FireFox</p>
                  </div>
                  <div class="col-3">
                    <i class="bi bi-browser-edge"></i>
                    <p class="mt-3">Edge</p>
                  </div>
                  <div class="col-3">
                    <i class="bi bi-browser-safari"></i>
                    <p class="mt-3">Safari</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* **修改點 2: 新增 footer-content-container 樣式** */
/* 這個 class 用來設定內容的最大寬度與置中 */
.footer-content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.custom-footer {
  width: 100%;
  line-height: 1.2;
}

.wave-container {
  bottom: 100%;
  left: 0;
  width: 100%;
  line-height: 0;
  margin-bottom: -1px;
}

.wave {
  display: block;
  width: 100%;
}

.wave-fill {
  fill: var(--color-blue-500);
  /* 直接使用顏色值，因為 :root 在 scoped style 中可能無法跨 SVG 作用 */
}

.content {
  padding-top: 1rem;
  padding-bottom: var(--container-padding);
  /* **修改點 3: 移除左右 padding，交由 .container-padding 控制** */
  /* padding-left: var(--spacing-4); */
  /* padding-right: var(--spacing-4); */
}


.title {
  margin-bottom: 1.5rem;
}

.list li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.browser-icons i {
  font-size: 34px;
}

.pe-80 {
  padding-right: 80px;
}

@media (max-width: 992px) {
  .content {
    padding-top: 2rem;
    padding-bottom: 3rem;
  }

  .title {
    margin-top: 1.5rem;
  }
}
</style>
<!-- 相關單位元件組 -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BlueButton from './button/BaseButton.vue';

// 儲存全部 12 個單位的完整列表。
// **請將下方的 `url` 和 `imgSrc` 替換成您實際的網址和圖片連結。**
const allUnits = ref([
  { id: 1, name: '單位一', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+1' },
  { id: 2, name: '單位二', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+2' },
  { id: 3, name: '單位三', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+3' },
  { id: 4, name: '單位四', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+4' },
  { id: 5, name: '單位五', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+5' },
  { id: 6, name: '單位六', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+6' },
  { id: 7, name: '單位七', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+7' },
  { id: 8, name: '單位八', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+8' },
  { id: 9, name: '單位九', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+9' },
  { id: 10, name: '單位十', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+10' },
  { id: 11, name: '單位十一', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+11' },
  { id: 12, name: '單位十二', url: '#', imgSrc: 'https://placehold.co/320x105/f0f0f0/333?text=單位+12' },
]);

// --- 響應式邏輯 (RWD Logic) ---
const windowWidth = ref(window.innerWidth);

// 處理視窗大小變化的函式
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// 元件掛載時，新增監聽器來偵測視窗寬度變化
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// 元件卸載時，移除監聽器，這是一個好習慣，可以避免記憶體洩漏
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 使用 `computed` 屬性來動態決定要顯示的單位列表
const displayedUnits = computed(() => {
  // Bootstrap 的 'lg' 中斷點是 992px。
  // 當螢幕寬度小於 992px (即進入雙欄或單欄模式時)，只顯示前 6 個單位。
  if (windowWidth.value < 992) {
    return allUnits.value.slice(0, 6);
  }
  // 在大螢幕上 (四欄模式)，則顯示全部 12 個單位。
  return allUnits.value;
});
</script>

<template>
  <!-- 元件根容器
    使用 d-flex、flex-column 和 align-items-center 來實現內容的垂直排列與水平置中。
    max-width 限制了元件在超寬螢幕下的最大寬度，符合設計稿的 1400px 規範。 -->
  <div class="related-units-container container-fluid d-flex flex-column align-items-center py-5">
    
    <!-- 單位 Logo 網格佈局 - 使用 Bootstrap 5 的 Grid 系統，並透過 class 實現響應式欄位變化。 - `g-custom` 和 `mb-custom` 是自定義的間距 class。 -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-custom mb-custom">
      <!-- 使用 v-for 迴圈來渲染 `displayedUnits`。 `displayedUnits` 是一個計算屬性，它會根據螢幕寬度動態返回 6 個或 12 個單位。 -->
      <div v-for="unit in displayedUnits" :key="unit.id" class="col d-flex justify-content-center">
        <!-- 每個單位都是一個可點擊的連結 (`<a>`) - `:href` 綁定單位的連結網址。 - `target="_blank"` 點擊後在新分頁開啟。 -->
        <a :href="unit.url" class="unit-item" target="_blank" rel="noopener noreferrer">
          <!-- 單位 Logo 圖片 - `:src` 綁定圖片來源。 - `onerror` 提供圖片載入失敗時的備用方案。 -->
          <img 
            :src="unit.imgSrc" 
            :alt="unit.name + ' Logo'" 
            class="img-fluid"
            onerror="this.onerror=null;this.src='https://placehold.co/320x105/E0E0E0/BDBDBD?text=Image+Not+Found';">
        </a>
      </div>
    </div>

    <!-- 查看更多按鈕 - 引入並使用您提供的 BlueButton 元件 -->
    <BlueButton text="查看更多" href="#" icon="chevron-down" />
  </div>
</template>

<style scoped>
.related-units-container {
  max-width: 1400px;
}

/* 間距 (gap) 來符合 40px 的設計稿要求 */
.g-custom {
  --bs-gutter-x: 40px;
  --bs-gutter-y: 40px;
}

/* 網格與按鈕的底部距離 */
.mb-custom {
  margin-bottom: 48px;
}

.unit-item {
  display: block;
  width: 320px;
  height: 105px;
  border-radius: 8px;
  overflow: hidden; 
  background-color: #f0f0f0; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.unit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.unit-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .unit-item {
    width: 160px;
    height: 52px;
  }
  
  .g-custom {
    --bs-gutter-y: 24px;
  }
}
</style>
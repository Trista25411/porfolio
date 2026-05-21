<!-- 相關單位元件組 -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BlueButton from './button/BaseButton.vue';

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

// 響應式
const windowWidth = ref(window.innerWidth);

// 視窗大小變化的函式
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const displayedUnits = computed(() => {
  if (windowWidth.value < 992) {
    return allUnits.value.slice(0, 6);
  }
  return allUnits.value;
});

// 元件掛載偵測視窗寬度變化
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="related-units-container container-fluid d-flex flex-column align-items-center py-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-custom mb-custom">
      <div v-for="unit in displayedUnits" :key="unit.id" class="col d-flex justify-content-center">
        <a :href="unit.url" class="unit-item" target="_blank" rel="noopener noreferrer">
          <img :src="unit.imgSrc" :alt="unit.name + ' Logo'" class="img-fluid"
            onerror="this.onerror=null;this.src='https://placehold.co/320x105/E0E0E0/BDBDBD?text=Image+Not+Found';">
        </a>
      </div>
    </div>
    <BlueButton text="查看更多" href="#" icon="chevron-down" />
  </div>
</template>

<style scoped>
.related-units-container {
  max-width: 1400px;
}

.g-custom {
  --bs-gutter-x: 40px;
  --bs-gutter-y: 40px;
}

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
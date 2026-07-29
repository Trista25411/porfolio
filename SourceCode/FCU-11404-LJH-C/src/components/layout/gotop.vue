<template>
  <!-- 使用 transition 讓按鈕的出現與消失有淡入淡出效果 -->
  <transition name="fade">
    <div v-if="showButton" class="go-top-button" @click="scrollToTop" title="回到頂部">
      <img :src="goTopIcon" alt="Go Top" />
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import goTopIcon from '@/assets/img/go-top.png';

// 建立一個響應式變數來控制按鈕的顯示狀態
const showButton = ref(false);

// 定義滾動事件的處理函式
const handleScroll = () => {
  // 當垂直滾動的距離 > 1080px 時，顯示按鈕，否則隱藏
  if (window.scrollY > 1080) {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
};

// 定義點擊後平滑滾動到頁面頂部的方法
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', 
  });
};

// 當元件掛載到 DOM 上時，新增滾動事件監聽器
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 當元件從 DOM 中卸載時，移除滾動事件監聽器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.go-top-button {
  position: fixed;
  bottom: var(--container-padding);
  right: var(--container-padding);
  z-index: 999;
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.15));
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms ease-out;
}

.go-top-button:hover {
  bottom: calc(var(--container-padding) - 0.25rem);
}

.go-top-button img {
  max-width: 100%;
  height: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width:576px) {
  .go-top-button {
    bottom: calc(var(--container-padding) + var(--container-padding));
  }

  .go-top-button:hover {
    bottom: calc(var(--container-padding) + var(--container-padding) - 0.25rem);
  }
}

@media (max-width:994px) {
  .go-top-button {
    width: 50px;
    height: 50px;
  }
}
</style>

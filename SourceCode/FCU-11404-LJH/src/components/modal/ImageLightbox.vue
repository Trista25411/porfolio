<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  images: { type: Array, required: true },
  startIndex: { type: Number, default: 0 },
  show: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);
const currentIndex = ref(props.startIndex);
watch(() => props.startIndex, (newIndex) => {
  currentIndex.value = newIndex;
});
watch(() => props.show, (isVisible) => {
  if (isVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const currentImage = computed(() => {
  if (!props.images || props.images.length === 0) {
    return null;
  }
  return props.images[currentIndex.value];
});

const nextImage = () => {
  if (props.images.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  }
};

const prevImage = () => {
  if (props.images.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
  }
};

const closeLightbox = () => {
  emit('close');
};

const handleKeydown = (e) => {
  if (!props.show) return;
  if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'Escape') {
    closeLightbox();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <transition name="lightbox-fade">
    <div v-if="show" class="lightbox-overlay" @click.self="closeLightbox">
      <button class="close-btn" @click="closeLightbox" aria-label="關閉燈箱">&times;</button>
      <div class="lightbox-container">
        <button class="nav-btn prev" @click="prevImage" aria-label="上一張">&#10094;</button>
        <div class="image-wrapper" v-if="currentImage">
          <transition name="image-fade" mode="out-in">
            <img :key="currentImage.id" :src="currentImage.imageUrl" :alt="currentImage.title.text" class="main-image">
          </transition>
          <div class="image-title text-p fw-bold">{{ currentImage.title.text }}</div>
          <div class="pagination-dots">
            <span
              v-for="(image, index) in images"
              :key="image.id"
              class="dot"
              :class="{ 'active': index === currentIndex }"
              @click="currentIndex = index"
              :aria-label="`跳至第 ${index + 1} 張`">
            </span>
          </div>
        </div>
        <button class="nav-btn next" @click="nextImage" aria-label="下一張">&#10095;</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.lightbox-overlay {
padding-top: 6.25rem; ;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* 提高 z-index 值以覆蓋 Navbar */
}

.lightbox-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
}

.image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: calc(100% - 120px);
}

.main-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 16px;
  background-color: #333;
}

.image-title {
  color: var(--color-white-base);
  margin-top: 16px;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 3rem;
  color: var(--color-white-base);
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}

.nav-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s;
  user-select: none;
}

.nav-btn:hover {
  color: var(--color-white-base);
}

.pagination-dots {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.dot.active {
  background-color: var(--color-blue-500);
  transform: scale(1.1);
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.4s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-btn {
    font-size: 1.5rem;
  }
}
</style>
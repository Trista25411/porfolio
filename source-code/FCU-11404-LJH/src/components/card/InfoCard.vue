<!-- 未來實驗所測驗卡片元件 -->
<script scoped>
export default {
  name: 'InfoCard',
  props: {
    // 圖片來源 URL
    imgSrc: {
      type: String,
      required: true,
      default: 'https://placehold.co/598x277/f5f5f5/2c3e50?text=Image' // 預設佔位圖片
    },
    // 卡片標題
    title: {
      type: String,
      required: true,
      default: '預設標題'
    },
    // 點擊後導向的連結
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<template>
  <div class="info-card c-text-primary c-bg-white-base ui-radius-48 c-shadow-soft">
    <a :href="link" target="_blank" rel="noopener noreferrer" class="card-link">
      <div class="img-container ui-radius-26">
        <img :src="imgSrc" alt="Card Image" class="card-image">
      </div>
      <div class="card-body">
        <h3 class="card-title text-h3">
          {{ title }}
          <svg class="external-link-icon" width="27" height="27" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
              stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 3H21V9" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 14L21 3" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </h3>
      </div>
    </a>
  </div>
</template>

<style scoped>
.info-card {
  width: 686px;
  height: 436px;
  padding: 44px;
  transition: all 0.3s ease;
  overflow: hidden;
  /* 確保圖片放大時不會超出圓角範圍 */
  cursor: pointer;
  max-width: 100%;
  /* 確保在小螢幕上不會爆版 */
  box-sizing: border-box;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.img-container {
  width: 598px;
  height: 277px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  max-width: 100%;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card-body {
  margin-top: 32px;
}

.card-title {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 200ms cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.external-link-icon {
  transition: stroke 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.external-link-icon path {
  stroke: var(--color-text-primary, #2C3E50);
  transition: stroke 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.info-card:hover .card-image {
  transform: scale(1.2);
}

.info-card:hover .card-title {
  color: var(--color-blue-500, #16B4D6);
  text-decoration: underline;
}

.info-card:hover .external-link-icon path {
  stroke: var(--color-blue-500, #16B4D6);
}

@media (max-width: 768px) {
  .info-card {
    width: 100%;
    height: auto;
    padding: 24px;
    border-radius: 24px;
  }

  .img-container {
    height: 200px;
  }

  .card-body {
    margin-top: 24px;
  }
}
</style>

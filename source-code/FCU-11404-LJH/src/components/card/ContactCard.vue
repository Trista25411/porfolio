<!-- 資源地圖 元件+橘色按鈕 -->
<script setup>
import { computed } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';

const emit = defineEmits(['category-clicked']);
const props = defineProps({
  cardData: {
    type: Object,
    required: true
  }
});

function handleCategoryClick(category) {
  emit('category-clicked', category);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const telLink = computed(() => `tel:${props.cardData.phone.replace(/[\s()-]/g, '')}`);

// 確保 email 地址能使用 mailto
const emailLink = computed(() => {
  const emailData = props.cardData.email;
  //  email 是物件且有 url 屬性，則使用 url
  if (emailData && typeof emailData === 'object' && emailData.url) {
    return emailData.url;
  }
  //  email 是物件但沒有 url 屬性（表示是一般信箱），或 email 本身就是一個字串
  if (emailData && (typeof emailData === 'object' || typeof emailData === 'string')) {
    // 獲取信箱文字
    const emailAddress = typeof emailData === 'object' ? emailData.text : emailData;
    // 判斷是否為有效的 email 格式
    if (emailAddress && emailAddress.includes('@')) {
      return `mailto:${emailAddress}`;
    }
  }
  // 否則，不產生連結
  return '#';
});

// 顯示 email 的文字
const emailText = computed(() => {
  const emailData = props.cardData.email;
  //  email 是物件且有 text 屬性，則顯示 text
  if (emailData && typeof emailData === 'object' && emailData.text) {
    return emailData.text;
  }
  // email 是字串，則顯示該字串
  if (emailData && typeof emailData === 'string') {
    return emailData;
  }
  return '無';
});

const mapLink = computed(() => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.cardData.address)}`);
</script>

<template>
  <div class="contact-card c-text-primary c-shadow-soft">
    <a :href="cardData.website" target="_blank" rel="noopener noreferrer" class="card-img-link">
      <img :src="cardData.imageUrl" class="card-img-content" :alt="cardData.title">
    </a>
    <div class="card-info c-bg-white-base">
      <div class="info-content-wrapper">
        <div class="categories">
          <CategoryButton v-for="cat in cardData.categories" :key="cat" :text="cat" @click="handleCategoryClick(cat)" />
        </div>
        <div>
          <div class="text-h3 card-title">
            <a :href="cardData.website" target="_blank" rel="noopener noreferrer" :title="cardData.title">
              {{ cardData.title }}
            </a>
          </div>
          <p class="text-p card-text-item" v-if="cardData.phone && cardData.phone !== '無'">
            <i class="bi bi-telephone-fill"></i>
            <a :href="telLink" :title="cardData.phone">
              <span>電話：{{ cardData.phone }}</span>
            </a>
          </p>
          <p class="text-p card-text-item" v-if="emailText !== '無'">
            <i class="bi bi-envelope-fill"></i>
            <a :href="emailLink" :title="emailText" :target="emailLink.startsWith('mailto:') ? '' : '_blank'"
              :rel="emailLink.startsWith('mailto:') ? '' : 'noopener noreferrer'">
              <span>信箱：{{ emailText }}</span>
            </a>
          </p>
          <p class="text-p card-text-item" v-if="cardData.address && cardData.address !== '無'">
            <i class="bi bi-geo-alt-fill"></i>
            <a :href="mapLink" target="_blank" rel="noopener noreferrer" :title="cardData.address">
              <span>地址：{{ cardData.address }}</span>
            </a>
          </p>

          <div class="icon-block">
            <a v-for="icon in cardData.socialIcons" :key="icon.name" :href="icon.url" target="_blank"
              rel="noopener noreferrer" :title="icon.name">
              <i :class="icon.class" class="social-icon c-text-gray-icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ... (保留原本的 CSS 樣式) ... */
</style>

<style scoped>
.contact-card {
  width: 100%;
  max-width: 95vw;
  height: auto;
  border-radius: 56px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-img-link {
  flex-shrink: 0;
  display: block;
  background-color: white;
}

.card-img-content {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.card-info {
  flex-grow: 1;
  padding: 44px 73px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.info-content-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.card-title {
  margin-bottom: 24px;
}

.card-text-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-block {
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.social-icon {
  font-size: 40px;
  transition: color 0.3s ease;
  background-color: transparent;
}

.social-icon:hover {
  color: var(--color-blue-500);
}

.card-info a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.card-info a:hover {
  color: var(--color-blue-500);
  text-decoration: underline;
}

@media (min-width: 769px) {
  .contact-card {
    flex-direction: row;
  }

  .card-img-link {
    width: 42.85%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-img-content {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .card-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .info-content-wrapper {
    width: 100%;
  }

  .icon-block {
    margin-top: auto;
    padding-top: 24px;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .card-info {
    padding: 32px;
  }

  /* 調整卡片內的橘色按鈕大小 */
  /* CategoryButton 是子元件，使用 :deep() 來影響其樣式 */
  .categories :deep(.category-button) {
    font-size: 14px;
    padding: 6px 14px;
  }

  .social-icon {
    font-size: 32px;
  }
}
</style>
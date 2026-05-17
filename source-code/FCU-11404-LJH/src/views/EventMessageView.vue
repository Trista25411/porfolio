<script setup>
import { computed } from 'vue';
// 匯入 JSON 活動資料
import allActivitiesRaw from '@/assets/data/EventList.json';
// 匯入 BlueButton 組件
import BlueButtonTag from '@/components/BlueButtonTag.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

// --- 輔助函式 (與 InformationView.vue 完全同步) ---
const rocToGregorian = (rocDateString) => {
  if (!rocDateString) return null;
  const match = rocDateString.match(/(?:(\d{2,3})年)?(\d{1,2})月(\d{1,2})日/);
  if (match) {
    const year = match[1] ? parseInt(match[1], 10) + 1911 : new Date().getFullYear();
    const month = parseInt(match[2], 10) - 1; // JS 月份是 0-11
    const day = parseInt(match[3], 10);
    return new Date(year, month, day);
  }
  return null;
};

const getRegistrationStatusTag = (activity) => {
  const now = new Date();
  const notes = activity.notes || '';
  const registration = activity.registration || '';
  const dateTime = activity.dateTime || '';

  // 關鍵字判斷
  if (registration.includes('額滿') || notes.includes('額滿') || registration.includes('報名截止')) {
    return '報名截止';
  }

  // 日期判斷
  const sourceString = `${notes} ${dateTime}`;
  const endDateMatch = sourceString.match(/(?:至|止於|截止於|止)\s*(\d{2,3}年?\d{1,2}月\d{1,2}日)/);

  if (endDateMatch) {
    const endDate = rocToGregorian(endDateMatch[1]);
    if (endDate && now > endDate) {
      return '報名截止';
    }
  }
  return '開放報名';
};

const getDefaultImage = (category) => {
  try {
    switch (category) {
      case '休閒娛樂':
        return new URL('../assets/img/event/default-cover/leisure_and_entertainment.png', import.meta.url).href;
      case '競賽與體育':
        return new URL('../assets/img/event/default-cover/sports_and_competitions.png', import.meta.url).href;
      case '學習與成長':
        return new URL('../assets/img/event/default-cover/learning_and_development.png', import.meta.url).href;
      case '宣導與展覽':
        return new URL('../assets/img/event/default-cover/promotion_and_exhibition.png', import.meta.url).href;
      case '公益與志工服務':
        return new URL('../assets/img/event/default-cover/public_welfare_and_volunteer_service.png', import.meta.url).href;
      default:
        return `https://placehold.co/800x1000/cccccc/FFFFFF?text=無圖片`;
    }
  } catch (error) {
    console.error("取得預設圖片URL時發生錯誤:", error);
    return `https://placehold.co/800x1000/cccccc/FFFFFF?text=圖片錯誤`;
  }
};

const parsedLinks = computed(() => {
  if (!event.value || !event.value.links || event.value.links === '無') return [];
  const linkLines = event.value.links.split('\n').filter(line => line.trim() !== '');
  return linkLines.map(line => {
    let url = '';
    let label = '';
    const separator = line.includes('：') ? '：' : ':';
    const parts = line.split(separator);

    if (parts.length > 1 && parts[1].trim().startsWith('http')) {
      label = parts[0].trim();
      url = parts.slice(1).join(separator).trim();
    } else {
      url = line.trim();
      label = '相關連結';
    }

    let iconClass = 'bi bi-link-45deg';
    if (url.includes('facebook.com')) iconClass = 'bi bi-facebook';
    else if (url.includes('google.com')) iconClass = 'bi bi-google';
    else if (url.includes('.gov.tw')) iconClass = 'bi bi-bank';
    else if (url.includes('youtube.com')) iconClass = 'bi bi-youtube';
    return { url, label, iconClass };
  });
});

const event = computed(() => {
  const foundEvent = allActivitiesRaw.find(activity => activity.id === props.id);
  if (!foundEvent) return null;
  const imageUrl = foundEvent.imageUrl
    ? new URL(`../assets/img/event/information/${foundEvent.imageUrl}`, import.meta.url).href
    : getDefaultImage(foundEvent.category);
  return {
    ...foundEvent,
    imageUrl: imageUrl,
    descriptionHtml: (foundEvent.description || '').replace(/\n/g, '<br>'),
    notesHtml: (foundEvent.notes || '').replace(/\n/g, '<br>'),
    organizerHtml: (foundEvent.organizer || '').replace(/\n/g, '<br>'),
    registrationHtml: (foundEvent.registration || '').replace(/\n/g, '<br>'),
    fee: foundEvent.fee || '未提供',
    dateTime: (foundEvent.dateTime || '').replace(/時間:\s*/, ''),
    location: (foundEvent.location || '').replace(/地點:\s*/, ''),
  };
});

// 計算屬性，用來取得活動對象標籤
const audienceTag = computed(() => {
  if (!event.value || !event.value.targetAudience) {
    return null;
  }
  if (event.value.targetAudience.includes('青少年')) {
    return '青少年';
  }
  if (event.value.targetAudience.includes('全年齡')) {
    return '全年齡';
  }
  return null;
});

const registrationInfo = computed(() => {
  if (!event.value) {
    return { text: '報名截止', isOpen: false };
  }
  const statusTag = getRegistrationStatusTag(event.value);
  if (statusTag === '開放報名') {
    return { text: '立即報名', isOpen: true };
  } else {
    return { text: '報名截止', isOpen: false };
  }
});


const handleRegistrationClick = () => {
  if (registrationInfo.value.isOpen) {
    const registrationLink = parsedLinks.value.find(link =>
      link.url.includes('forms.gle') || link.url.includes('google.com/forms')
    );
    if (registrationLink) {
      window.open(registrationLink.url, '_blank', 'noopener,noreferrer');
    } else if (parsedLinks.value.length > 0) {
      window.open(parsedLinks.value[0].url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('此活動為開放報名狀態，但未提供可點擊的連結。');
    }
  }
};
</script>

<template>
  <div class="event-bg container-padding">
    <div class="c-container">
      <div v-if="event" class="content">
        <!-- 麵包屑 -->
        <div class="breadcrumbs text-p">
          <router-link to="/information">活動訊息</router-link> /
          <span class="bread c-text-blu-500">{{ event.title }}</span>
          <div class="event-title text-h1">{{ event.title }}</div>
        </div>

        <!-- 主要內容區塊 -->
        <div class="event-message d-flex">
          <!-- 左側活動內容 -->
          <div class="event-content d-flex flex-column ui-radius-36">
            <img :src="event.imageUrl" alt="活動主圖" class="event-pic">
            <div class="event-text">
              <!-- 活動介紹 -->
              <div class="event-header d-flex align-items-center flex-md-row">
                <div class="text-h2 me-auto">活動介紹</div>
                <div class="header-buttons">
                  <BlueButtonTag v-if="audienceTag" :text="audienceTag" :to="`/information?tag=${audienceTag}`" />
                  <BlueButtonTag v-if="event.category" :text="event.category"
                    :to="`/information?category=${event.category}`" />
                </div>
              </div>
              <div class="et-text text-p d-flex flex-column" v-html="event.descriptionHtml"></div>

              <!-- 活動資訊 -->
              <div class="section-divider d-xxl-none">
                <div class="text-h2">活動資訊</div>
                <div class="text-h4 space">日期與時間</div>
                <div class="info text-p">{{ event.dateTime }}</div>
                <div class="text-h4 space">活動地點</div>
                <div class="info text-p" v-html="event.location.replace(/\n/g, '<br>')"></div>
                <div class="text-h4 space">活動對象</div>
                <div class="info text-p">{{ event.targetAudience }}</div>
                <div class="text-h4 space">主辦/承辦單位</div>
                <div class="info text-p" v-html="event.organizerHtml"></div>
              </div>

              <!-- 注意事項 -->
              <div class="section-divider">
                <div class="text-h2">注意事項</div>
                <div class="et-text text-p" v-html="event.notesHtml"></div>
              </div>

              <!-- 報名資訊 -->
              <div class="section-divider d-xxl-none">
                <div class="text-h2">報名資訊</div>
                <div class="signup">
                  <div class="sign-left">
                    <i class="bi bi-cash-coin info-icon"></i>
                    <div class="text-h4">活動費用：</div>
                  </div>
                  <div class="sign-right text-p">{{ event.fee }}</div>
                </div>
                <div class="signup">
                  <div class="sign-left">
                    <i class="bi bi-people-fill info-icon"></i>
                    <div class="text-h4">活動名額：</div>
                  </div>
                  <div class="sign-right text-p" v-html="event.registrationHtml"></div>
                </div>
                <!-- 報名狀態按鈕 -->
                <div class="mt-4">
                  <button class="btn-register w-100 ui-radius-36 text-h3"
                    :class="registrationInfo.isOpen ? 'btn-register-open' : 'btn-register-closed'"
                    :disabled="!registrationInfo.isOpen" @click="handleRegistrationClick">
                    {{ registrationInfo.text }}
                  </button>
                </div>
              </div>

              <!-- 相關連結 -->
              <div v-if="parsedLinks.length > 0" class="section-divider">
                <div class="text-h2">相關連結</div>
                <div class="related-links-container">
                  <a v-for="(link, index) in parsedLinks" :key="index" :href="link.url" target="_blank"
                    rel="noopener noreferrer" class="link-tag">
                    <i :class="link.iconClass"></i>
                    <span>{{ link.label }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- 右側活動資訊 (1400px 以上顯示) -->
          <div class="event-info d-none d-xxl-block ui-radius-36">
            <!-- 上方資訊 -->
            <div class="event-info-top">
              <div class="text-h2">活動資訊</div>
              <div class="text-h4 space">日期與時間</div>
              <div class="info text-p">{{ event.dateTime }}</div>
              <div class="text-h4 space">活動地點</div>
              <div class="info text-p" v-html="event.location.replace(/\n/g, '<br>')"></div>
              <div class="text-h4 space">活動對象</div>
              <div class="info text-p">{{ event.targetAudience }}</div>
              <div class="text-h4 space">主辦/承辦單位</div>
              <div class="info text-p" v-html="event.organizerHtml"></div>
            </div>

            <!-- 下方資訊 -->
            <div class="event-info-down section-divider">
              <div class="text-h2">報名資訊</div>
              <div class="signup">
                <div class="sign-left">
                  <i class="bi bi-cash-coin info-icon"></i>
                  <div class="text-h4">活動費用：</div>
                </div>
                <div class="sign-right text-p">{{ event.fee }}</div>
              </div>
              <div class="signup">
                <div class="sign-left">
                  <i class="bi bi-people-fill info-icon"></i>
                  <div class="text-h4">活動名額：</div>
                </div>
                <div class="sign-right text-p" v-html="event.registrationHtml"></div>
              </div>

              <!-- 報名狀態按鈕 -->
              <div class="mt-4">
                <button class="btn-register w-100 ui-radius-36 text-h3"
                  :class="registrationInfo.isOpen ? 'btn-register-open' : 'btn-register-closed'"
                  :disabled="!registrationInfo.isOpen" @click="handleRegistrationClick">
                  {{ registrationInfo.text }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 如果找不到活動，顯示提示訊息 -->
      <div v-else class="container not-found">
        <div class="event-title text-h1">找不到活動</div>
        <p>您所尋找的活動不存在或已被移除。</p>
        <router-link to="/information" class="back-button">返回活動列表</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-bg {
  background-image: url(../assets/img/bg-gray-event.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
}

/* container --------------------------------------- */
.c-container {
  max-width: 1300px;
  width: 100%;
  line-height: 1.4;
  margin: 0 auto;
  padding: 6.25rem 0;
  /* 100px */
  margin: unset;

}

.not-found {
  text-align: center;
  padding: 100px 0;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--color-blue-500);
  color: white;
  text-decoration: none;
  border-radius: 25px;
}

/* 麵包屑 ------------------------------------------------- */
.breadcrumbs a {
  text-decoration: none;
  color: inherit;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.event-title {
  margin-top: 45px;
}

/* 主要活動內容 ----------------------------------- */
.event-message {
  gap: 3.125rem;
  /* 50px */
  align-items: flex-start;
}

.event-content,
.event-info {
  background-color: var(--color-white-base);
  box-shadow: var(--c-shadow-soft);
  margin: 30px 0;
}

.event-content {
  width: 800px;
  flex-shrink: 0;
}

.event-info {
  flex-grow: 1;
  padding: 3.125rem;
  /* 50px */
}

.event-pic {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-36) var(--radius-36) 0 0;
}

.event-text {
  padding: 3.125rem;
  /* 50px */
}

/* 活動介紹標題區塊樣式 */
.event-header {
  margin-bottom: 30px;
}

.event-header .et-name {
  margin-bottom: 0;
}

.header-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: end;
}

@media (max-width: 600px) {
  .header-buttons {
    gap: 4px;
  }
}

@media (max-width: 442px) {
  .event-text {
    /* 20px */
    padding: 3.125rem 1.25rem 1.25rem;
    padding: 3.125rem 0;
    background-color: unset;
  }

  .event-content {
    background-color: unset;
    box-shadow: unset;
  }

  .event-pic {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    /* 36px */
    border-radius: 2.25rem;
  }
}

.et-text :deep(p) {
  margin-bottom: 1em;
}

/* 分隔線樣式 */
.section-divider {
  border-top: 2px solid var(--color-gray-line);
  margin-top: 40px;
  padding-top: 40px;
}

/* 相關連結樣式 */
.related-links-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
}

.link-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #f0f7ff;
  color: var(--color-blue-500);
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid #d0e8ff;
}

.link-tag:hover {
  background-color: #e0f0ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.link-tag i {
  font-size: 1.2em;
}

/* 活動與報名資訊 -----------------------------------*/
.space {
  margin-bottom: 15px;
}

.info {
  margin-bottom: 30px;
}

.signup {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.sign-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  margin-right: 15px;
}

.info-icon {
  font-size: 18px;
  margin: 5px 8px 0 0;
  color: #333;
  width: 18px;
  text-align: center;
}

.sign-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: right;
}

/* 報名按鈕樣式 */
.btn-register {
  padding: 36px 24px;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
}

.btn-register-open {
  background-color: var(--color-blue-500);
}

.btn-register-open:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.btn-register-closed {
  background-color: #b0b0b0;
  cursor: not-allowed;
  opacity: 0.8;
}

@media (max-width: 1400px) {

  .event-message {
    flex-direction: column;
  }

  .event-content {
    width: 100%;
  }
}
</style>
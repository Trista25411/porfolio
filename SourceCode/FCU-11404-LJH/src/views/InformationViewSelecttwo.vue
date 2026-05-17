<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // 引入 useRoute
// 匯入banner元件及圖片
import CategoryButton from '@/components/button/CategoryButton.vue';
import ActivityCard from '@/components/card/ActivityCard.vue';
// 匯入您的 JSON 活動資料
import allActivitiesRaw from '@/assets/data/EventList.json';

const router = useRouter();
const route = useRoute(); // 初始化 route
const activeCategories = ref([]); // 當前選擇的類型陣列
const activeTags = ref([]); // 當前選擇的 Tag 陣列
const allActivities = ref([]); // 存放處理過的所有活動資料
const visibleItemsCount = ref(6);
const itemsPerLoad = 6;

// --- 按鈕資料 ---
const categoryButtons = ref([
  '全部類型', '休閒娛樂', '競賽與體育', '學習與成長', '宣導與展覽', '公益與志工服務'
]);
const tagButtons = ref(['青少年', '全年齡', '開放報名', '報名截止']);

const rocToGregorian = (rocDateString) => {
  if (!rocDateString) return null;
  const match = rocDateString.match(/(?:(\d{2,3})年)?(\d{1,2})月(\d{1,2})日/);
  if (match) {
    const year = match[1] ? parseInt(match[1], 10) + 1911 : new Date().getFullYear();
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    return new Date(year, month, day);
  }
  return null;
};

const getRegistrationStatus = (activity) => {
  const now = new Date(); // 使用當前真實時間
  const notes = activity.notes || '';
  const registration = activity.registration || '';
  const dateTime = activity.dateTime || '';

  if (registration.includes('額滿') || notes.includes('額滿') || registration.includes('報名截止')) {
    return '報名截止';
  }

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
        return `https://placehold.co/447x333/cccccc/FFFFFF?text=無圖片`;
    }
  } catch (error) {
    console.error("Error getting default image URL:", error);
    return `https://placehold.co/447x333/cccccc/FFFFFF?text=圖片錯誤`;
  }
};

onMounted(() => {
  allActivities.value = allActivitiesRaw.map(activity => {
    const registrationStatus = getRegistrationStatus(activity);
    let audienceTag = '其他';
    if (activity.targetAudience.includes('青少年')) audienceTag = '青少年';
    else if (activity.targetAudience.includes('全年齡')) audienceTag = '全年齡';

    const displayTags = [];
    if (audienceTag !== '其他') displayTags.push({ text: audienceTag });
    displayTags.push({ text: registrationStatus });

    return {
      id: activity.id,
      imageUrl: activity.imageUrl
        ? new URL(`../assets/img/information/${activity.imageUrl}`, import.meta.url).href
        : getDefaultImage(activity.category),
      category: activity.category,
      title: activity.title,
      eventTime: (activity.dateTime || '').replace(/時間:\s*/, ''),
      location: (activity.location || '').replace(/地點:\s*/, ''),
      tags: displayTags,
      _registrationStatus: registrationStatus,
      _targetAudience: audienceTag
    };
  });

  // 從 URL query 讀取篩選條件並設定
  const categoryFromQuery = route.query.category;
  if (categoryFromQuery && categoryButtons.value.includes(categoryFromQuery)) {
    activeCategories.value = [categoryFromQuery];
  }

  const tagFromQuery = route.query.tag;
  if (tagFromQuery && tagButtons.value.includes(tagFromQuery)) {
    activeTags.value = [tagFromQuery];
  }
});

const filteredActivities = computed(() => {
  let activities = allActivities.value;

  if (activeCategories.value.length > 0) {
    activities = activities.filter(activity => activeCategories.value.includes(activity.category));
  }

  if (activeTags.value.length > 0) {
    activities = activities.filter(activity => {
      return activeTags.value.every(tag => {
        switch (tag) {
          case '青少年':
          case '全年齡':
            return activity._targetAudience === tag;
          case '開放報名':
          case '報名截止':
            return activity._registrationStatus === tag;
          default:
            return false;
        }
      });
    });
  }
  return activities;
});

const displayedActivities = computed(() => {
  return filteredActivities.value.slice(0, visibleItemsCount.value);
});

const hasMoreActivities = computed(() => {
  return visibleItemsCount.value < filteredActivities.value.length;
});

// --- 事件處理 ---
const handleCardClick = (activity) => {
  router.push({ name: 'EventDetail', params: { id: activity.id } });
};

const selectCategory = (category) => {
  if (category === '全部類型') {
    activeCategories.value = [];
  } else {
    const index = activeCategories.value.indexOf(category);
    if (index > -1) {
      activeCategories.value.splice(index, 1);
    } else {
      activeCategories.value.push(category);
    }
  }
  visibleItemsCount.value = itemsPerLoad;
};

const selectTag = (tag) => {
  const conflictingPairs = {
    '青少年': '全年齡',
    '全年齡': '青少年',
    '開放報名': '報名截止',
    '報名截止': '開放報名'
  };

  const newTags = [...activeTags.value];
  const clickedTagIndex = newTags.indexOf(tag);

  if (clickedTagIndex !== -1) {
    newTags.splice(clickedTagIndex, 1);
  } else {
    const conflictingTag = conflictingPairs[tag];
    if (conflictingTag) {
      const conflictingTagIndex = newTags.indexOf(conflictingTag);
      if (conflictingTagIndex !== -1) {
        newTags.splice(conflictingTagIndex, 1);
      }
    }
    newTags.push(tag);
  }

  activeTags.value = newTags;
  visibleItemsCount.value = itemsPerLoad;
};


const loadMore = () => {
  visibleItemsCount.value += itemsPerLoad;
};
</script>

<template>
  <div class="event-info-page">
    <div class="content-section">
      <div class="content-container">
        <div class="filter-group category-group">
          <CategoryButton v-for="btnText in categoryButtons" :key="btnText" :text="btnText" :class="{
            active: (btnText === '全部類型' && activeCategories.length === 0) || activeCategories.includes(btnText)
          }" @click="selectCategory(btnText)" class="filter-button" />
        </div>
        
        <!-- Tag 文字 + 藍色按鈕組 (目標對象篩選) -->
        <div class="filter-group tag-group">
          <span class="tag-label">Tag：</span>
          <button v-for="btnText in tagButtons" :key="btnText"
            :class="['filter-button', { active: activeTags.includes(btnText) }]" @click="selectTag(btnText)">
            {{ btnText }}
          </button>
        </div>

        <!-- 卡片組 -->
        <div class="card-grid">
          <ActivityCard v-for="card in displayedActivities" :key="card.id" :card-data="card"
            @click="handleCardClick(card)" />
        </div>
        <div v-if="displayedActivities.length === 0" class="no-results">
          <p>找不到符合條件的活動</p>
        </div>

        <!-- 了解更多按鈕 -->
        <div v-if="hasMoreActivities" class="load-more-container">
          <button @click="loadMore" class="load-more-button">
            <span>了解更多</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
              class="icon-arrow-down">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-info-page {
  background-image: url(../assets/img/bg-gray-event-all.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}

.content-section {
  margin-top: 132px;
  padding: 0 20px;
  padding-bottom: 100px;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.filter-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.category-group {
  margin-bottom: 40px;
}

.tag-group {
  margin-bottom: 100px;
}

.tag-label {
  font-size: 24px;
  font-weight: 700;
  color: #2C3E50;
  margin-right: 16px;
}

.filter-group .filter-button {
  display: inline-block;
  text-decoration: none;
  background-color: #FDFDFD;
  color: #2C3E50;
  font-size: 22px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  font-family: inherit;
  /* 確保字體一致 */
}

.category-group .filter-button {
  border: 2px solid #FC8458;
}

.category-group .filter-button:hover,
.category-group .filter-button.active {
  background-color: #FC8458;
  color: #FDFDFD;
  border-color: #FC8458;
}

.tag-group .filter-button {
  border: 2px solid #16B4D6;
}

.tag-group .filter-button:hover,
.tag-group .filter-button.active {
  background-color: #16B4D6;
  color: #FDFDFD;
  border-color: #16B4D6;
}

.card-grid {
  display: grid;
  gap: 41px 29px;
  grid-template-columns: repeat(3, 1fr);
  min-height: 500px;
}

.no-results {
  text-align: center;
  font-size: 24px;
  color: #888;
  padding: 80px 0;
  grid-column: 1 / -1;
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.load-more-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 22px;
  font-size: 22px;
  font-weight: 700;
  color: #FDFDFD;
  background-color: #16B4D6;
  border: 2px solid #FDFDFD;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.load-more-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.load-more-button .icon-arrow-down {
  transition: transform 0.3s ease;
}

.load-more-button:hover .icon-arrow-down {
  transform: translateY(2px);
}

@media (max-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 769px) {
  .content-section {
    margin-top: 80px;
  }

  .card-grid {
    grid-template-columns: 1fr;
    min-height: 300px;
  }

  .tag-group {
    margin-bottom: 60px;
  }

  .load-more-container {
    margin-top: 80px;
  }
}
</style>
<!-- InformationView.vue -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Banner from '@/components/sections/Banner.vue';
import banner1920 from '@/assets/img/banner/information-banner-1920.png';
import banner1400 from '@/assets/img/banner/information-banner-1400.png';
import banner1200 from '@/assets/img/banner/information-banner-1200.png';
import banner996 from '@/assets/img/banner/information-banner-996.png';
import banner765 from '@/assets/img/banner/information-banner-765.png';
import banner576 from '@/assets/img/banner/information-banner-576.png';
const infoBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

const infoDefaultBannerSrc = banner576;
import ActivityCard from '@/components/card/ActivityCard.vue';
import CollapsibleFilterPanel from '@/components/menu/CollapsibleFilterPanel.vue';
import allActivitiesRaw from '@/assets/data/EventList.json';
import BaseButton from '@/components/button/BaseButton.vue';
import IconDown from '@/components/icons/down.vue';

const router = useRouter();
const route = useRoute();
const activeCategory = ref('全部類型');
const activeTags = ref([]);
const allActivities = ref([]);
const visibleItemsCount = ref(6);
const itemsPerLoad = 6;
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
  const now = new Date();
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
      case '休閒娛樂': return new URL('@/assets/img/event/default-cover/leisure_and_entertainment.png', import.meta.url).href;
      case '競賽與體育': return new URL('@/assets/img/event/default-cover/sports_and_competitions.png', import.meta.url).href;
      case '學習與成長': return new URL('@/assets/img/event/default-cover/learning_and_development.png', import.meta.url).href;
      case '宣導與展覽': return new URL('@/assets/img/event/default-cover/promotion_and_exhibition.png', import.meta.url).href;
      case '公益與志工服務': return new URL('@/assets/img/event/default-cover/public_welfare_and_volunteer_service.png', import.meta.url).href;
      default: return `https://placehold.co/447x333/cccccc/FFFFFF?text=無圖片`;
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
imageUrl: activity.imageUrl ? new URL(`../assets/img/event/information/${activity.imageUrl}`, import.meta.url).href : getDefaultImage(activity.category),      category: activity.category,
      title: activity.title,
      eventTime: (activity.dateTime || '').replace(/時間:\s*/, ''),
      location: (activity.location || '').replace(/地點:\s*/, ''),
      tags: displayTags,
      _registrationStatus: registrationStatus,
      _targetAudience: audienceTag
    };
  });
});

const setFiltersFromRoute = (query) => {
  const categoryFromQuery = query.category;
  if (categoryFromQuery && categoryButtons.value.includes(categoryFromQuery)) {
    activeCategory.value = categoryFromQuery;
  } else { activeCategory.value = '全部類型'; }
  const tagFromQuery = query.tag;
  if (tagFromQuery && tagButtons.value.includes(tagFromQuery)) {
    activeTags.value = [tagFromQuery];
  } else { activeTags.value = []; }
};

watch(() => route.query, (newQuery) => { setFiltersFromRoute(newQuery); }, { immediate: true });
const filteredActivities = computed(() => {
  let activities = allActivities.value;
  if (activeCategory.value !== '全部類型') {
    activities = activities.filter(activity => activity.category === activeCategory.value);
  }
  if (activeTags.value.length > 0) {
    activities = activities.filter(activity => {
      return activeTags.value.every(tag => {
        switch (tag) {
          case '青少年': case '全年齡': return activity._targetAudience === tag;
          case '開放報名': case '報名截止': return activity._registrationStatus === tag;
          default: return false;
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

const handleCardClick = (activity) => {
  router.push({ name: 'EventDetail', params: { id: activity.id } });
};

const selectCategory = (category) => {
  activeCategory.value = category;
};

const selectTag = (tag) => {
  const conflictingPairs = {
    '青少年': '全年齡', '全年齡': '青少年',
    '開放報名': '報名截止', '報名截止': '開放報名'
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
};

const loadMore = () => {
  visibleItemsCount.value += itemsPerLoad;
};

// 監聽任何一個篩選條件的變化，來重置顯示的項目數量
watch([activeCategory, activeTags], () => {
    visibleItemsCount.value = itemsPerLoad;
}, { deep: true });
</script>

<template>
  <div class="event-info-page">
    <Banner :sources="infoBannerSources" :default-src="infoDefaultBannerSrc" bigText="活動訊息" smallText="Event List" />
    <section class="content-section container-padding">
      <div class="content-container">

        <!-- 電腦版篩選器 -->
        <div class="desktop-filters">
          <div class="filter-group category-group">
            <button v-for="btnText in categoryButtons" :key="btnText"
              :class="['filter-button-orange', { active: activeCategory === btnText }]"
              @click="selectCategory(btnText)">
              {{ btnText }}
            </button>
          </div>
          <div class="filter-group tag-group">
            <span class="tag-label">Tag：</span>
            <button v-for="btnText in tagButtons" :key="btnText"
              :class="['filter-button-blue', { active: activeTags.includes(btnText) }]" @click="selectTag(btnText)">
              {{ btnText }}
            </button>
          </div>
        </div>

        <!-- 手機版篩選器 (替換成新元件) -->
        <div class="mobile-filters">
          <CollapsibleFilterPanel
            :categories="categoryButtons"
            v-model:activeCategory="activeCategory"
            :tags="tagButtons"
            v-model:activeTags="activeTags"
          />
        </div>

        <!-- 卡片列表 -->
        <div class="card-grid">
          <ActivityCard v-for="card in displayedActivities" :key="card.id" :card-data="card"
            @click="handleCardClick(card)" @category-clicked="selectCategory" @tag-clicked="selectTag" />
        </div>
        <div v-if="displayedActivities.length === 0" class="no-results">
          <p>找不到符合條件的活動</p>
        </div>
<div v-if="hasMoreActivities" class="load-more-container">
  <BaseButton size="large" shape="pill" variant="solid">
    <button @click="loadMore">
      <span>了解更多</span>
      <IconDown class="c-icon-size-16 c-transition-transform icon-down-on-hover" />
    </button>
  </BaseButton>
</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- 手機版/電腦版篩選器切換 --- */
.desktop-filters {
  display: block;
}
.mobile-filters {
  display: none;
}

@media (max-width: 769px) {
  .desktop-filters {
    display: none;
  }
  .mobile-filters {
    display: block;
  }
}

/* --- 原有樣式 --- */
.event-info-page {
  background-image: url(@/assets/img/bg-gray-event-all.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
.content-section {
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
.filter-button-orange {
  background-color: var(--color-white-base);
  color: var(--color-text-primary);
  padding: 12px 28px;
  border: 2px solid var(--color-orange-500);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 22px;
  font-weight: bold;
  border-radius: 999px;
}
.filter-button-orange:hover,
.filter-button-orange.active {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
}
.filter-button-blue {
  background-color: #FDFDFD;
  color: #2C3E50;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #16B4D6;
}
.filter-button-blue:hover,
.filter-button-blue.active {
  background-color: #16B4D6;
  color: #FDFDFD;
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
  .filter-button-blue,
  .filter-button-orange {
    font-size: 16px;
    padding: 8px 20px;
  }
  .tag-label {
    font-size: 18px;
  }
  .load-more-container {
    margin-top: 80px;
  }
}
</style>
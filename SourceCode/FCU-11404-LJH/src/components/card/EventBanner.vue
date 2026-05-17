<script setup>
import CategoryButton from '@/components/button/CategoryButton.vue';

// 使用 defineProps 定義元件接收的資料
defineProps({
    eventData: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="event-banner c-bg-white-base c-text-primary ui-radius-80 c-shadow-soft">
        <div class="event-info c-text-primary">
            <router-link :to="eventData.category.url" style="align-self: flex-start; text-decoration: none;">
                <CategoryButton :text="eventData.category.text" />
            </router-link>
            <div class="event-text">
                <router-link :to="{ name: 'EventDetail', params: { id: eventData.id } }" class="event-title text-h3">{{
                    eventData.title }}</router-link>
                <div class="event-description text-p">
                    <div class="info-line">
                        <i class="bi bi-calendar3 icon"></i>
                        <span class="info-text">{{ eventData.eventTime }}</span>
                    </div>
                    <div class="info-line">
                        <i class="bi bi-geo-alt-fill icon"></i>
                        <a :href="eventData.location.url" target="_blank" rel="noopener noreferrer" class="info-text">
                            {{ eventData.location.text }}
                        </a>
                    </div>
                </div>
            </div>
            <div class="event-tags">
                <router-link v-for="tag in eventData.tags" :key="tag.text" :to="tag.link"
                    class="event-tag text-p c-text-blu-500">
                    <span class="hash">#</span>{{ tag.text }}
                </router-link>
            </div>
        </div>
        <router-link :to="{ name: 'EventDetail', params: { id: eventData.id } }" class="event-image-link">
            <img :src="eventData.imageUrl" alt="活動圖片" class="event-image">
        </router-link>
    </div>
</template>

<style scoped>
.event-banner {
    width: 100%;
    max-width: 1400px;
    min-height: 34.1875rem;
    /* 547px */
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    /* 在手機上，圖片在上，資訊在下 */
}

/* 左側資訊區 */
.event-info {
    width: 35%;
    padding: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    /* 讓資訊區塊填滿剩餘空間 */
    min-width: 0;
    /* 在 flex 佈局中，內容過長時可以被正確截斷 */
}

.event-text {
    margin-top: 24px;
}

.event-title {
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 最多顯示兩行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    color: var(--c-text-primary);
}

.event-title:hover {
    text-decoration: underline;
}

.event-description {
    margin-top: 24px;
}

.info-line {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.info-line:last-child {
    margin-bottom: 2;
}

.info-line .icon {
    margin-right: 8px;
    font-size: 22px;
    flex-shrink: 0;
    /* 防止圖示被壓縮 */
}

/* 針對時間與地點文字的截斷樣式 */
.info-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 顯示省略號 */
    color: inherit;
    text-decoration: none;
    transition: color 0.3s;
}

.info-line a.info-text:hover {
    color: var(--color-blue-500);
    text-decoration: underline;
}

.event-tags {
    /* 【修正】原為 .event-tag，應為 .event-tags 才有作用 */
    padding-top: 24px;
}

.event-tag {
    text-decoration: none;
    transition: color 0.3s ease, opacity 0.3s ease;
}

.event-tag:not(:last-child) {
    margin-right: 16px;
}

.event-tag .hash {
    margin-right: 4px;
}

/* 右側圖片區 */
.event-image-link {
    display: block;
    width: 100%;
    height: 300px;
}

.event-image {
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
}

img {
    width: 100%;
}

.event-image-link:hover .event-image {
    opacity: 0.9;
}

/* 當螢幕寬度大於 1024px 時，恢復設計稿的排版 */
@media (min-width: 1024px) {
    .event-banner {
        flex-direction: row;
        height: 34.1875rem;
        /* 547px */
    }
    .event-image-link {
        width: 800px;
        height: 100%;
    }
}
@media (max-width: 1024px) {
    .event-info {
        width: 100%;
    }
}

@media (max-width: 1324px) {
    .event-info {
        width: 100%;
    }
}
</style>
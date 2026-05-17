<script setup>
const props = defineProps({
    // 改成接收一個 sources 陣列，裡面包含多個圖片來源
    sources: {
        type: Array,
        required: true,
        // 範例格式: [{ media: '(min-width: 1400px)', srcset: '...' }]
    },
    // 一個預設的圖片，給不支援 <picture> 的舊瀏覽器或當作最小尺寸圖片
    defaultSrc: {
        type: String,
        required: true,
    },
    bigText: { type: String, default: '大標題' },
    smallText: { type: String, default: '副標題' },
});
</script>

<template>
    <div class="banner">
        <picture>
            <source v-for="source in sources" :key="source.media" :srcset="source.srcset" :media="source.media">
            <img :src="defaultSrc" alt="Banner" class="banner-image">
        </picture>

        <div class="banner-text container-padding">
            <div class="text-area">
                <div 
                  class="text-h1 text-lg-h0" 
                  style="white-space: pre-line;"
                >
                    {{ bigText }}
                </div>

                <div class="text-h4 text-md-h3">{{ smallText }}</div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.banner {
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-bottom: 12.5rem;
    /* 200px */
}

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.banner-text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    position: absolute;
    left: 0;
    top: 0;
    color: white;
    justify-content: center;
    align-items: center;
}

.text-area {
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap: 0.8125rem;
    /* 13px */
    text-shadow: 0px 3px 5px #00000080;
}

@media (max-width: 1399px) {
    .banner {
        /* 100px */
        margin-bottom: 6.25rem;
        /* 50px */
        margin-bottom: 3.125rem;
    }
}
</style>
<script setup lang="ts">
import { challengeItem } from '@/data/projects';
import { ref, onMounted, watch, nextTick } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
    items: challengeItem[];
}>();

const currentItem = ref(0);
const isScrolled = ref(false);
const beforeContainer = ref<HTMLDivElement | null>(null);
const afterContainer = ref<HTMLDivElement | null>(null);

const numberDisplay = (num: number) => {
    return (num + 1).toString().padStart(2, '0');
};

const baseUrl = import.meta.env.BASE_URL;
const getImgUrl = (name: string | undefined) => {
    if (!name) return;
    return `${baseUrl}pic/project/${name}.png`;
};

// 結論圖片滑動查看
const initDragScroll = (el: HTMLDivElement) => {
    let isDown = false;
    let startX: number;
    let startY: number;
    let scrollLeft: number;
    let scrollTop: number;

    const start = (e: MouseEvent) => {
        isDown = true;
        el.classList.add('grabbing');
        startX = e.pageX - el.offsetLeft;
        startY = e.pageY - el.offsetTop;
        scrollLeft = el.scrollLeft;
        scrollTop = el.scrollTop;
    };

    const end = (e: MouseEvent) => {
        isDown = false;
        el.classList.remove('grabbing');
    };

    const move = (e: MouseEvent) => {
        if (!isDown) return;
        // 計算移動距離
        const x = e.pageX - el.offsetLeft;
        const y = e.pageY - el.offsetTop;
        const walkX = (x - startX) * 1.5;
        const walkY = (y - startY) * 1.5;
        el.scrollLeft = scrollLeft - walkX;
        el.scrollTop = scrollTop - walkY;
    };

    el.addEventListener('mousedown', start);
    el.addEventListener('mouseleave', end);
    el.addEventListener('mouseup', end);
    el.addEventListener('mousemove', move);

    return () => {
        el.removeEventListener('mousedown', start);
        el.removeEventListener('mouseleave', end);
        el.removeEventListener('mouseup', end);
        el.removeEventListener('mousemove', move);
    };
};

let cleanUpBefore: (() => void) | null = null;
let cleanUpAfter: (() => void) | null = null;

const setupScroll = () => {
    if (cleanUpBefore) cleanUpBefore();
    if (cleanUpAfter) cleanUpAfter();

    nextTick(() => {
        if (beforeContainer.value) cleanUpBefore = initDragScroll(beforeContainer.value);
        if (afterContainer.value) cleanUpAfter = initDragScroll(afterContainer.value);
    });
};

const handleScroll = () => {
    isScrolled.value = true;
};

watch(currentItem, () => {
    setupScroll();
});

onMounted(() => {
    setupScroll();
});
</script>

<template>
    <div v-if="items && items.length > 0">
        <div class="content">
            <div class="btn">
                <BaseButton v-for="(item, index) in items" :key="index" :class="{ 'active': currentItem === index }"
                    class="ts" @click="currentItem = index">
                    <span class="num">{{ numberDisplay(index) }}</span>
                    <span>{{ item.name }}</span>
                </BaseButton>
            </div>
            <h2>{{ items[currentItem].name }}</h2>
            <div class="problem-area">
                <div class="frame">
                    <div class="tag">Situation (情況)</div>
                    <div>{{ items[currentItem].situation }}</div>
                </div>
                <div class="frame">
                    <div class="tag">Task (目標)</div>
                    <div>{{ items[currentItem].task }}</div>
                </div>
            </div>
            <div class="action-area">
                <div class="action">Action (處理方式)</div>
                <div v-for="act in items[currentItem].action" class="act-line">
                    <img :src="`${baseUrl}icon/leaves.svg`" alt="action-icon">
                    <span>{{ act }}</span>
                </div>
            </div>
            <div class="result-area">
                <div class="result">Result (結論)</div>
                <div>{{ items[currentItem].result }}</div>

                <div v-if="items[currentItem].img || items[currentItem].resultImg" class="img-group">

                    <div v-if="items[currentItem].img"
                        :class="['before-area', { 'full-width': !items[currentItem].resultImg }]">
                        <div class="title-main">Before</div>
                        <div class="scroll-wrapper" @scroll="handleScroll">
                            <div class="scroll-box" ref="beforeContainer">
                                <img :src="getImgUrl(items[currentItem].img)" alt="before-img">
                            </div>
                            <div class="scroll-hint">上下左右滑動查看細節</div>
                        </div>
                    </div>
                    <div v-if="items[currentItem].resultImg"
                        :class="['after-area', { 'full-width': !items[currentItem].img }]">
                        <div class="title-main">After</div>
                        <div class="scroll-wrapper">
                            <div class="scroll-box" ref="afterContainer">
                                <img :src="getImgUrl(items[currentItem].resultImg)" alt="after-img">
                            </div>
                            <div class="scroll-hint">上下左右滑動查看細節</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    gap: 60px;
}

button {
    padding: 0 20px 3px 0;
}

button:hover {
    --btn-bg: var(--storm);
    --btn-text: var(--black);
}

:deep(button.active) {
    background-color: var(--sage);
    color: var(--black);
}

.btn {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25px;
}

.active {
    display: flex;
    justify-content: center;
}

.num {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    padding: 3px;
}

.problem,
.action-area,
.result-area {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.tag,
.action,
.result {
    padding: 10px 25px;
    border-radius: 20px;
}

.problem-area {
    display: flex;
    gap: 30px;
}

.problem.full-width.frame {
    width: 50%;
}

.problem {
    flex-wrap: wrap;
}

.frame {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: 30px;
    padding: 30px;
}

.tag {
    background-color: var(--bubbles);
    margin-bottom: 20px;
}

.action {
    background-color: var(--green);
    color: var(--white);
    border: 1px solid #14B8A6;
    width: 200px;
}

.act-line {
    border: 1px solid var(--green);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.result-area {
    background-color: rgba(251, 231, 122, 0.5);
    border-radius: 30px;
    padding: 40px;
}

.result {
    background-color: var(--color-text);
    color: var(--white);
    width: 200px;
}

.img-group {
    display: flex;
    gap: 20px;
    align-items: stretch;
}

.before-area,
.after-area {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.scroll-wrapper {
    position: relative;
    width: 100%;
}

.scroll-box {
    height: 300px;
    overflow: auto;
    background-color: #f0f0f0;
    border-radius: 10px;
}

.scroll-box::-webkit-scrollbar {
    display: none;
}

.scroll-box img {
    width: 150%;
    display: block;
    border: 2px solid var(--sage);
    object-position: top left;
    -webkit-user-drag: none;
}

.scroll-box.grabbing {
    user-select: none;
}

.scroll-hint {
    position: absolute;
    bottom: 10px;
    right: 8px;
    background: rgba(155, 91, 17, 0.8);
    color: var(--white);
    padding: 3px 12px;
    font-size: 12px;
    border-radius: 4px;
    opacity: 1;
    transition: opacity 0.3s;
}

.scroll-wrapper:hover .scroll-hint {
    opacity: 0;
}

@media (max-width:1100px) {
    button {
        padding: 0 15px 0px 0;
    }

    .num {
        width: 28px;
        height: 28px;
    }

    .problem {
        flex-direction: row;
    }

    .frame {
        width: 50%;
    }
}

@media (max-width:800px) {
    .content {
        padding: 30px;
        gap: 30px;
    }

    .problem-area {
        flex-direction: column;
    }

    .btn {
        gap: 20px;
    }

    .frame {
        width: 100%;
    }

    .img-group {
        flex-direction: column;
    }

    .before-area,
    .after-area {
        width: 100%;
    }
}

@media (max-width:430px) {

    .action,
    .result {
        width: 100%;
    }
}
</style>
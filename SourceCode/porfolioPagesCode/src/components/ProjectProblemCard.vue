<script setup lang="ts">
import { challengeItem } from '@/data/projectcard';
import { ref, onMounted, watch, nextTick } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
    items: challengeItem[];
}>();

// 預設顯示第一個挑戰
const currentItem = ref(0);

const numberDisplay = (num: number) => {
    return (num + 1).toString().padStart(2, '0');
};

const getImgUrl = (name: string | undefined) => {
    if (!name) return;
    const path = `${import.meta.env.BASE_URL}pic/project/${name}.png`;
    return new URL(path, import.meta.url).href;
};

// 照片可自由滑動 "Custom Scroll" / "Drag-to-Scroll" => 手機版依原生觸控滾動，電腦版透過 JS 模擬抓取（Grab）
// HTMLDivElement  => HTML <div> 元素
// 定義容器的 Ref 型別
const beforeContainer = ref<HTMLDivElement | null>(null);
const afterContainer = ref<HTMLDivElement | null>(null);

// el: 自定義命名 => 常用 el 或 container 來代表傳入函數的 DOM 節點
const initDragScroll = (el: HTMLDivElement) => {
    let isDown = false;
    let startX: number;
    let startY: number;
    let scrollLeft: number;
    let scrollTop: number;

    // e: 自定義命名 => 常用縮寫 e 或 evt，代表事件物件 (點擊或移動滑鼠，瀏覽器產生的座標、按鍵等資訊的物件)
    const start = (e: MouseEvent) => {
        isDown = true;
        el.classList.add('grabbing');
        // 計算起始值
        // e.pageX / e.pageY =>滑鼠相對於整個網頁的座標
        // offsetLeft / offsetTop => 該容器距離瀏覽器最左邊/最頂邊的距離
        // 這裡只需要知道滑鼠「在容器內」的相對位置 => 減去偏移量後，得到的 startX 就是滑鼠點擊在容器裡的哪一個點
        // scrollLeft / scrollTop：紀錄點擊那一刻，容器原本已經(向左 / 向上)捲動了多少距離
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
        // 阻止瀏覽器預設「選取文字」或「拖動圖片」行為，沒設置有時候會以為要選取文字而造成反白及拖曳出現禁止符號
        // e.preventDefault();
        // 之後發現在css設置user-select: none;、-webkit-user-drag: none;可以不用寫這個，單寫還是會出現禁止符號

        // 計算移動距離
        const x = e.pageX - el.offsetLeft;
        const y = e.pageY - el.offsetTop;
        // 計算「手要滑多遠，圖要跑多快」
        // 現在滑鼠位置減掉起始位置，等於「滑鼠移動了多少像素」
        // * 數值 => 「靈敏度係數」，常用 1.5
        const walkX = (x - startX) * 1.5;
        const walkY = (y - startY) * 1.5;
        //               「減法」=>當滑鼠往右拉（正數）時，圖片捲軸應該要往左捲動，視覺上圖片才會往右跑
        el.scrollLeft = scrollLeft - walkX;
        el.scrollTop = scrollTop - walkY;
    };

    el.addEventListener('mousedown', start);
    el.addEventListener('mouseleave', end);
    el.addEventListener('mouseup', end);
    el.addEventListener('mousemove', move);

    // 回傳清理函數，使用者頻繁進出頁面會掛載很多監聽器，導致網站越來越卡 => 記憶體洩漏 (Memory Leak)
    // 為什麼 return 就可以代表清理？ => 函數被呼叫時（onMounted），它執行了 addEventListener，最後 return 的函數就是執行 removeEventListener
    // 這個回傳的「清理小工具」存進了 cleanUpBefore
    return () => {
        el.removeEventListener('mousedown', start);
        el.removeEventListener('mouseleave', end);
        el.removeEventListener('mouseup', end);
        el.removeEventListener('mousemove', move);
    };
};

// 先宣告兩個變數，用來存放「未來的清理工具」
// () => void：「不接收參數，也不回傳東西」的函數（ = 清理函數）
// | null：一開始還沒掛載，預設值是 null
let cleanUpBefore: (() => void) | null = null;
let cleanUpAfter: (() => void) | null = null;

const setupScroll = () => {
    // 如果 cleanUpBefore 裡面有存東西（代表之前有成功掛載監聽器），執行它！(執行 removeEventListener)
    // 完整寫法： if (cleanUpBefore) { cleanUpBefore(); }
    if (cleanUpBefore) cleanUpBefore();
    if (cleanUpAfter) cleanUpAfter();

    nextTick(() => {
        // 當組件掛載（畫面出現）時，執行 initDragScroll，會掛上監聽器，並把回傳的「清理小工具」存進 cleanUpBefore 變數裡
        // 完整寫法為: if (beforeContainer.value) { cleanUpBefore = initDragScroll(beforeContainer.value); }
        if (beforeContainer.value) cleanUpBefore = initDragScroll(beforeContainer.value);
        if (afterContainer.value) cleanUpAfter = initDragScroll(afterContainer.value);
    });
};

onMounted(() => {
    setupScroll();
});

watch(currentItem, () => {
    setupScroll();
});

</script>

<template>
    <!-- v-if="...." => 當資料真的存在且不是空陣列時，才顯示下面的內容 -->
    <div v-if="items && items.length > 0">
        <div class="content">
            <div class="btn">
                <BaseButton v-for="(item, index) in items" :key="index" :class="{ 'active': currentItem === index }" class="ts"
                    @click="currentItem = index">
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
                    <img src="../assets/icon/leaves.svg" alt="action-icon">
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
                        <div class="scroll-wrapper">
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
    /* 顯示抓取手勢 */
    cursor: grab;
    border: 2px solid var(--sage);
    object-position: top left;
    /* 禁止預設拖曳行為 => 圖片拉出顯示禁止符號 */
    -webkit-user-drag: none;
}

.scroll-box.grabbing {
    /* 變抓緊的手勢 */
    cursor: grabbing;
    /* 抓取時禁止選取文字 => 反白 */
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
import type { Meta, StoryObj } from '@storybook/vue3';
import ProjectProblemCard from "./ProjectProblemCard.vue";

const meta: Meta<typeof ProjectProblemCard> = {
    title: 'components/ProjectProblemCard',
    component: ProjectProblemCard
}
export default meta;
type Story = StoryObj<typeof ProjectProblemCard>;

export const Default: Story = {
    args: {
        items:[             {
                name: '舊有資訊架構過於破碎',
                img: '',
                situation: '原網站資訊分散於各處，使用者難以在短時間內找到所需資訊，且各頁面風格不一。',
                task: '規劃清晰的資訊層級、整合各局處資源，降低使用者獲取資訊的點擊次數。',
                action: [
                    '對現有資料清單進行分類，並將重複性質的功能進行歸納，定義核心與選配欄位。',
                    '採用資訊階層化設計，將核心功能與次要資訊區隔，並設計直覺的導覽切換機制。',
                    '建立統一的資料介面，確保前端各模組的渲染邏輯與視覺風格維持一致。'
                ],
                result: '簡化全站資訊架構，大幅降低了使用者尋找資訊步驟，提升資訊獲取效率。',
                resultImg: ''
            },
            {
                name: '動態內容擴充輪播組件',
                img: 'ljh-card-ori',
                situation: '反詐騙宣導區塊須承載長度不一的圖文資訊，原本卡片高度不一、圖片溢出且缺乏良好的跨裝置操作體驗。',
                task: '加入「查看更多/收回」自動判斷功能，修復 Swiper 容器的渲染衝突，並優化雙指手勢觸控體驗。',
                action: [
                    '設定條件來計算字數，當內容超過 100 字時自動產生「查看更多」按鈕與漸層遮罩。',
                    '結合 Swiper-slide 的高度自適應，強制同列卡片垂直高度對齊，修復與容器間的渲染衝突並解決圖片溢出邊界問題。',
                    '加入平滑的展開動畫與 object-fit: cover 屬性，並支援觸控板/手勢滑動以提升操作直覺。'
                ],
                result: '解決所有解析度下的高度對齊與圖片變形缺陷，透過觸控手勢支援，讓跨裝置使用者皆享有同樣流暢的互動體驗。',
                resultImg: 'ljh-card-now',
            },
            {
                name: '影音載入黑屏與效能瓶頸',
                img: 'ljh-youtube-ori',
                situation: '網頁初次載入時須同時呈現多個 YouTube 影片資源，導致瀏覽器發出過多請求，造成頁面卡頓與大片黑塊的視覺缺陷。',
                task: '為影片組件加入 Lazy Loading 機制，在使用者點擊前不載入實體影音資源。',
                action: [
                    '在 Vue 3 中建立 isLoaded 響應式狀態，預設為 false 阻止 iframe 渲染。',
                    '利用 YouTube Image API 抓取縮圖，並用 CSS 偽元素製作播放按鈕引導使用者點擊。',
                    '封裝組件化開發解析 URL，監聽點擊事件，當使用者主動點擊時才動態渲染 <iframe>。',
                ],
                result: '大幅減少初始頁面請求的資源，消除頁面載入期間的黑屏現象，顯著提升渲染效能。',
                resultImg: 'ljh-youtube-now'
            },]
    }
}

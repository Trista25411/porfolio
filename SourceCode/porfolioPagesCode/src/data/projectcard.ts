export interface techItem {
    icon: string;
    name: string;
}

export interface sourceItem {
    name: string;
    link: string;
};

export interface imgItem {
    name: string;
    // 將圖片都改成陣列，只需要用v-for去生成，不然分成string | string[] 匯入時要寫v-if跟v-else
    img: string[];
};

export interface linkItem {
    name: string;
    link: string;
};

export interface challengeItem {
    name: string;
    img: string;
    situation: string;
    task: string;
    action: string[];
    result: string;
    resultImg: string;
}

export interface ProjectItem {
    id: number,
    logo: string;
    title: string;
    pic: string;
    // 要放多個標籤，用陣列引入
    tech: techItem[];
    intr: string[];
    motivation: string;
    history: string[];
    source: sourceItem[];
    challenge: challengeItem[];
    RWD: imgItem[];
    links: linkItem[];
};

export const Project: ProjectItem[] = [
    {
        id: 1,
        logo: 'ljhlogo',
        title: '少年英雄聯盟 改版製作',
        pic: 'ljh',
        tech: [
            { icon: 'vue', name: 'Vue 3' },
            { icon: 'ts', name: 'TypeScript' },
            { icon: 'boostrap', name: 'Boostrap' },
            { icon: 'RWD', name: 'RWD' }
        ],
        intr: ['針對政府大型活動網站進行網頁重構。負責優化資料架構、UI 設計以及全站響應式開發。'],
        motivation: '改善現有網站資訊碎片化的問題，透過重構提升青少年的參與度與資訊獲取效率。',
        history: [
            '1. 資訊架構規劃，掌握大型活動網站的分類系統 。',
            '2. 整合不同局處資源，建立統一且流暢的數位服務入口。',
            '3. 運用 @media，確保內容在不同裝置能夠完整呈現。'
        ],
        source:
            [{ name: '少年英雄聯盟', link: 'https://ljh.taichung.gov.tw/' }],
        challenge: [
            {
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
            },
            {
                name: '跨部門資料同步完整度',
                img: '',
                situation: '整合多個政府局處 API 時，發現原始資料格式不一且常有欄位缺失，導致前端讀取屬性時報錯中斷。',
                task: '建立資料驗證與轉換，確保異常或缺失的外部資料不會引發頁面崩潰。',
                action: [
                    '使用 TS 定義型別 Interface，對原始 JSON 資料進行約束。',
                    '封裝資料專用的 Mapper 函式，對缺失的欄位手動提供安全的預設值（Fallback value）。',
                    '在資料請求層加入 try...catch 捕捉 API 異常，確保單一接口故障時不會連帶影響其他正常模組',
                ],
                result: '系統容錯與穩定度大幅提升，即使部分局處資料臨時故障，主頁面仍能維持正常顯示與運作。',
                resultImg: ''
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: ['ljh-pc'] },
            { name: '平板 (768px)', img: ['ljh-tablet'] },
            { name: '手機 (375px)', img: ['ljh-phone'] },
        ],
        links: [
            { name: 'Figma', link: 'https://www.figma.com/design/JWyOtRYrt2dizQXnjMqpkG/%E5%B0%91%E5%B9%B4%E8%8B%B1%E9%9B%84%E8%81%AF%E7%9B%9F-%E7%B6%B2%E7%AB%99%E6%94%B9%E7%89%88?node-id=0-1&t=UyEUi9r5smnDAMOq-1' },
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/SourceCode/FCU-11404-LJH' },
            { name: 'DEMO', link: 'https://trista25411.github.io/porfolio/projectsLink/LJH/index.html#/' },
        ],
    },
    {
        id: 2,
        logo: 'frontendlogo',
        title: 'REST-Counrties API ',
        pic: 'rest-b',
        tech: [
            { icon: 'vue', name: 'Vue 3' },
            { icon: 'js', name: 'JavaScript' },
            { icon: 'ts', name: 'TypeScript' },
            { icon: 'RWD', name: 'RWD' },
        ],
        intr: ['練習標準 RESTful API 串接流程，研究非同步資料處理、複雜 JSON 解析以及動態路由轉場。'],
        motivation: '透過實作掌握前端與後端資料交換的穩定性與錯誤處理。',
        history: [
            '1. 練習標準的 API 請求與錯誤處理流程。',
            '2. 將原始 JSON 資料轉化為前端渲染所需的格式。',
            '3. 掌握非同步語法與 Vue 組件掛載的生命週期。',
            '4. 透過路由參數動態獲取特定國家資料，並實現多頁面的資料同步切換。'
        ],
        source:
            [{ name: 'Frontend Mentor REST Countries API', link: 'https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3' }],
        challenge: [
            {
                name: '數據延遲與渲染衝突',
                img: 'rest-white-ori',
                situation: '當網頁開啟或組件掛載時，因 API 資訊回傳存在時間差，Vue 在數據尚未完整載入前即嘗試存取屬性，引發渲染中斷與白屏',
                task: '控制 DOM 的啟動時機，確保數據完整獲取並通過驗證後，才啟動畫面渲染流程。',
                action: [
                    '在畫面最外層容器加入 v-if 設定「數據存在才顯示」指令。',
                    '利用 Vue 的響應式機制，監控資料寫入狀態，過渡 Loading State。',
                    '對物件屬性採用 Optional Chaining, ?. 進行安全存取，防止未定義而報錯。'
                ],
                result: '解決異步資料載入與畫面顯示的時間落差，消除了網頁初始化時的白屏與報錯中斷。',
                resultImg: ''
            },
            {
                name: '欄位結構解析錯誤',
                img: 'rest-native-ori',
                situation: '在國家詳情頁呈現「Native Name」資訊時，因直接抓取了整個原始 JSON 物件結構而非具體文字，導致頁面渲染出錯誤的程式碼片段。',
                task: '校準物件的存取路徑，將複雜的巢狀結構資料正確轉譯為易讀的字串。',
                action: [
                    '檢查 API 回傳的 JSON 結構，定位出 Native Name 。',
                    '修正屬性存取語法，指向數據結構中最內層的文字欄位（例如使用 Object.values() 取值）。',
                    '對解析後的數據類型進行過濾，排除多餘的程式結構碼，確保畫面僅接收純文字，顯示正確資訊。'
                ],
                result: '詳情頁的國家名稱顯示恢復正常，提升介面資訊的正確性',
                resultImg: 'rest-native-now'
            },
            {
                name: '路由參數變動但視圖未更新',
                img: 'rest-path-ori',
                situation: '在詳情頁點擊「Border Countries」連結跳轉時，瀏覽器網址列已改變，但 Vue 組件並未重新觸發生命週期，導致畫面無法顯示。',
                task: '建立網址變動與資料請求的連動機制，確保路由參數更新時能即時重新撈取對應國家的資料。',
                action: [
                    '在組件內部設定 watch 監聽器，即時偵測 Vue Router 中的 route.params 變動。',
                    '當偵測到鄰國 ID 變動時，主動重新呼叫 API 請求函式。',
                    '清空當前舊資料狀態並重置位置，載入新國家資料以維持資訊同步。'
                ],
                result: '實現流暢的同組件動態跳轉功能，確保國家詳情在多頁面來回切換時始終保持資料同步。',
                resultImg: ''
            },
            {
                name: '圖片失效與資源備援',
                img: 'rest-pic-ori',
                situation: '受第三方 API 的 SVG 資源不穩定影響，首頁列表中部分國旗無法正常顯示，但點入詳情頁卻有圖片，造成兩端視圖不一致',
                task: '統一兩端圖片資源的抓取規格，並建立穩定的 CDN 資源備援載入邏輯，確保兩邊圖片顯示一致。',
                action: [
                    '檢查並對比首頁與詳情頁的資料源，統一加入格式的邏輯判斷，優先調用高穩定度的檔案連結。',
                    '在 <img> 標籤上綁定 @error 事件，當外部 SVG 載入失敗時自動觸發 Fallback 備用邏輯。',
                    '優化加載路徑，確保首頁列表與詳情頁共享同一套經過驗證的圖片資源。'
                ],
                result: '解決首頁與詳情頁圖片不一致的問題，在外部第三方資源波動時，網頁仍保持視覺一致性。',
                resultImg: ''
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: ['rest-pc-w', 'rest-pc-b'] },
            { name: '平板 (768px)', img: ['rest-tablet-w', 'rest-tablet-b'] },
            { name: '手機 (375px)', img: ['rest-phone-w', 'rest-phone-b'] },
        ],
        links: [
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/SourceCode/REST%20Countries%20API' },
            { name: 'DEMO', link: 'https://trista25411.github.io/porfolio/projects/REST-Countries-API_vue_ts/' },
        ],
    },
    {
        id: 3,
        logo: 'frontendlogo',
        title: 'Space-Tourism',
        pic: 'space',
        tech: [
            { icon: 'vue', name: 'Vue 3' },
            { icon: 'ts', name: 'TypeScript' },
            { icon: 'tailwind', name: 'Tailwind' },
            { icon: 'RWD', name: 'RWD' }
        ],
        intr: ['根據設計稿還原，並練習將專案從純 JS 遷移至 TS 環境。'],
        motivation: '透過實際商業 UI 需求製作出，掌握 Data-Driven UI，透過 TS 檢查降低執行期錯誤，掌握更嚴謹的開發流程。',
        history: [
            '1. 學習將現有專案從 JS 遷移至 TS，掌握型別定義與靜態檢查，降低執行錯誤。',
            '2. 練習從本地 JSON 提取數據，並根據使用者操作動態切換內容。',
            '3. 強化對 UI 細節的觀察，確保間距、字級與切換動畫精準還原。',
            '4. 處理多層級背景大圖，平衡畫面與加載速度 。'
        ],
        source:
            [{ name: 'Frontend Mentor Space-tourism', link: 'https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3' }],
        challenge: [
            {
                name: '背景圖視覺失衡與載入問題',
                img: '',
                situation: '隨著分頁切換不同背景圖時，在極端螢幕尺寸（如 3K 螢幕或手機端）易出現顯示比例失真、局部被裁切或大圖載入過慢造成的白屏閃爍。',
                task: '優化背景圖響應式加載，並利用 CSS 排版技術確保在大螢幕下版面配置不崩潰',
                action: [
                    '在 Vue 動態組件中實作 Preload，在切換分頁前將下一張大圖寫入瀏覽器快取，消除閃爍。',
                    '採用 CSS Grid minmax() 與 grid-template-columns 靈活分配側邊間距，搭配 object-fit: cover 鎖定寬螢幕下的最大呈現邊界。'
                ],
                result: '頁面載入速度提升，且從 375px 到 3000px+ 的各種解析度下，均展現出完美比例且不崩潰的視覺沉浸感。',
                resultImg: ''
            },
            {
                name: '頁面轉場動畫衝突',
                img: '',
                situation: '在切換頁面，畫面文字更新過於突兀，缺乏流暢沉浸感。',
                task: '實作平滑的淡入淡出（Fade-in/out）與位移轉場動畫，且確保動畫執行期間不會引發 DOM 佈局跳動。',
                action: [
                    '引入 Vue 原生 <Transition> 組件封裝資料區域，並設定 mode="out-in" 確保舊資料完全消失後才渲染新內容。',
                    '搭配 CSS Keyframes 與 transform 定義平移與透明度變化，模擬輕量級的空間推移效果。',
                    '為動畫容器設定固定的寬高或彈性排版，防止新舊組件在交替的一瞬間產生垂直排版被擠壓的推移 Bug。'
                ],
                result: '創造符合專案風格的流暢轉場，提升了使用者切換分頁的體驗感',
                resultImg: ''
            },
            {
                name: 'JSON 資料型別定義挑戰',
                img: '',
                situation: '依賴本地 data.json 提供所有數據，若僅使用 JS 的 loose typing 容易在渲染過程中因拼寫錯誤或屬性缺失而引發執行期報錯。',
                task: '利用 TS 建立嚴格的 Interface 與 Union Types，從開發端攔截所有不合規的資料存取。',
                action: [
                    '分析 data.json 的內容，為專案建立了層級化的型別宣告文件',
                    '針對 Planet、Crew 等不同模組進行強型別約束，並利用 Union Types 鎖定特定的字串常數（如導覽標籤）。',
                    '重構 Vue 組件的 props 與 computed，全面修復 IDE 的紅字警告，確保編譯階段的安全性。'
                ],
                result: '成功攔截了多次因屬性拼寫錯誤導致的潛在 Bug，大幅縮短了偵錯時間，並強化了程式碼的可重構性。',
                resultImg: ''
            },
            {
                name: 'GitHub Pages SPA 路由失效',
                img: '',
                situation: 'GitHub Pages 預設在伺服器端尋找與 URL 路徑對應的實體檔案，當使用者在子頁面直接刷新瀏覽器時，會導致伺服器返回 404 錯誤，因實體路徑並不存在 。',
                task: '修改路由定向，確保使用者可以直接存取子 URL 或重新整理頁面。',
                action: [
                    '當 404 發生時，自定義的錯誤頁面會攔截當前 URL 並將其轉換為查詢參數，隨後重定向至根目錄的 index.html。',
                    'Svelte Router 在初始化時解析查詢參數，將應用程序恢復至正確的狀態 。',
                ],
                result: '可正常切換頁面，重新刷新頁面時順暢，解決平台技術限制',
                resultImg: ''
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: ['space-pc'] },
            { name: '平板 (768px)', img: ['space-tablet'] },
            { name: '手機 (375px)', img: ['space-phone'] },
        ],
        links: [
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/SourceCode/space-tourism%20completed' },
            { name: 'DEMO', link: 'https://trista25411.github.io/porfolio/projectsLink/SpaceTourismVueTs/index.html' },
        ],
    },

    {
        id: 4,
        logo: 'hojilogo',
        title: '合記出版社 改版設計',
        pic: 'hoji',
        tech: [
            { icon: 'figma', name: 'Figma' },
            { icon: 'uiux', name: 'UI/UX' },
            { icon: 'RWD', name: 'RWD' }
        ],
        intr: ['傳統醫學出版社官網現代化視覺重構。', '簡化配色系統建立專業感，優化書籍檢索流程。'],
        motivation: '解決目錄過長且難以查找需求書籍，建立以讀者為中心的數位體驗。',
        history: [
            '1. 學習分類繁雜醫學文獻，重新規劃資訊層級以優化導覽流程。 ',
            '2. 分析使用者搜尋習慣，重塑過濾器與結果呈現頁面的互動邏輯。',
            '3. 針對醫學內容提供高對比度、易讀性強的字體排版與色彩規範。',
        ],
        source:
            [{ name: '合記出版社', link: 'https://www.hochitw.com/' }],
        challenge: [
            {
                name: '傳統網站配色雜亂',
                img: 'hoji-color-ori',
                situation: '舊版官網配色缺乏一致性，導致品牌形象不夠鮮明且亮色過多干擾讀者閱讀視線。',
                task: '精簡色彩計畫，建立一套符合專業醫學出版專業形象的視覺系統。',
                action: [
                    '建立配色系統，提取品牌核心色彩，並制定輔助色與中性色規範，確保介面視覺平衡。',
                    '規範所有導覽按鈕、標籤與文字層級的配色邏輯，移除雜亂的次級色調。',
                    '將非核心的亮色元素替換為一致的中性深色調，確保高對比度與易讀性。'
                ],
                result: '網站整體呈現出更為現代、清爽且具信賴感的醫療專業風格，提升長時間查找書籍時的閱讀舒適度。',
                resultImg: ''
            },
            {
                name: '導覽列目錄過長',
                img: 'hoji-dropdown-ori',
                situation: '現有的樹狀下拉選單展開後會長達數屏，使用者在滑動過程中極易失去方向，且難以返回上一層級。',
                task: '重新梳理資訊架構（IA），將導覽入口精簡至最直覺的數量。',
                action: [
                    '將原本繁雜的 27 項類別整合修訂為 12 項核心大類。',
                    '將過於細分、碎片化的次級目錄隱藏，改整合至列表頁面的側邊過濾器中。',
                    '在全站各節點加入「麵包屑（Breadcrumbs）」導覽，方便使用者隨時一鍵跳轉回上一層級。'
                ],
                result: '分類跳轉率顯著降低，平均查找書籍的盲目滑動時間縮短，大幅提升了讀者在行動端的留存意願。',
                resultImg: 'hoji-color-now'
            },
            {
                name: '搜尋書籍流程過於繁瑣',
                img: '',
                situation: '書籍類別繁多且目錄層級過深，使用者若想尋找特定專業醫學書，需要點擊多次且缺乏即時反饋。',
                task: '優化搜尋欄位的互動邏輯，並提升首頁與分類頁的資訊檢索辨識效率。',
                action: [
                    '重塑首頁區塊排版，優先展示熱門考用書籍與新書速報，縮短高需求使用者的路徑。',
                    '在書籍類別中引入動態篩選器，允許使用者在同一頁面點選標籤即可即時更新符合條件的書籍。',
                    '設計具備 Autocomplete 功能的搜尋欄，能根據關鍵字即時回饋結果的體驗。'
                ],
                result: '搜尋與購書流程變得直覺流暢，尋找特定專業醫學書籍的時間大幅縮短，優化整體的用戶體驗。',
                resultImg: ''
            },
        ],
        RWD: [
            { name: '首頁', img: ['hoji-index'] },
            { name: '書籍列表', img: ['hoji-search'] },
            { name: '商品頁', img: ['hoji-book'] },
        ],
        links: [
            { name: 'PPT', link: 'https://canva.link/8fhi8vupcfgkt26' },
            { name: 'Figma', link: 'https://www.figma.com/design/My72LeZ5UxFBYTfKYAeXRJ/%E5%B0%8F%E7%B5%84-%E5%90%88%E8%A8%98?node-id=21-7945&t=Oyxv41PRs1cRlCNw-1' },
            { name: 'Prototype', link: 'https://www.figma.com/proto/My72LeZ5UxFBYTfKYAeXRJ/%E5%B0%8F%E7%B5%84-%E5%90%88%E8%A8%98?node-id=1338-25487&p=f&viewport=724%2C41%2C0.02&t=f32LruVcFzp9Dhcm-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1338%3A25487&page-id=21%3A7945' },
        ],
    },
    {
        id: 5,
        logo: 'microsoftlogo',
        title: 'Microsoft 首頁仿切',
        pic: 'microsoft',
        tech: [
            { icon: 'html', name: 'HTML 5' },
            { icon: 'css', name: '原生CSS' },
            { icon: 'RWD', name: 'RWD' }
        ],
        intr: ['商業網站 CSS 切版練習', '不依賴框架，僅使用原生 CSS 挑戰複雜的排版邏輯與響應式切換'],
        motivation: '深入理解 Layout Algorithms，掌握 Grid 與 Flexbox 的協作模式。',
        history: [
            '1. 深入理解 Flexbox 與 Grid 佈局在複雜商務網站中的應用。',
            '2. 掌握在無框架支援下，手寫響應式斷點的最佳實踐。',
            '3. 處理多層級導覽選單與卡片式元件的排列邏輯。'
        ],
        source:
            [{ name: 'Microsoft', link: 'https://www.microsoft.com/zh-tw' }],
        challenge: [
            {
                name: '自定義輪播圖控制邏輯',
                img: '',
                situation: '首頁輪播圖須達成自動播放、高畫質響應式切換與自定義控制介面，且必須符合微軟官方提供的網頁功能規範。',
                task: '不使用 JS，只利用原生 HTML5 標籤屬性與 CSS 達成複雜的 Swiper 配置。',
                action: [
                    '採用原生 `<swiper-container>` 標籤，將輪播所需的 autoplay 等配置以正確的 JSON 字串屬性形式傳入。',
                    '使用標準 `<picture>` 標籤配合多組 `<source srcset>` 媒體查詢，針對不同螢幕尺寸自動切換對應解析度的大圖。',
                    '透過 CSS 絕對定位與 transform 屬性精確控制文字區塊（.banner-block），確保文字在視窗縮放時始終維持完美居中。'
                ],
                result: '復刻出與微軟官網一致的動態輪播互動，且降低了瀏覽器在初始化時的 JavaScript 執行負擔。',
                resultImg: 'microsoft-swiper-now'
            },
            {
                name: '矩陣佈局的動態重組',
                img: 'microsoft-card-ori',
                situation: '微軟首頁的四格產品卡片區域在不同解析度下必須保持相同的安全間距，且部分版面比重需要隨斷點動態改變。',
                task: '避免在 HTML 結構中加入過多無意義的排版輔助標籤，純粹依靠 CSS 佈局演算法達成結構重新排列。',
                action: [
                    '採用 flex-wrap: wrap 彈性排版，並靈活運用 width: calc() 動態計算減去 gap 後的精確卡片寬度。',
                    '在特定 @media 斷點下，利用 CSS Grid 的 grid-template-columns 重新定義網格矩陣。',
                    '調整 flex-direction 或 order 屬性，確保視窗在縮放時，內容的視覺權重依然符合設計邏輯。'
                ],
                result: '程式碼結構極其精簡，在各種裝置下皆能完美對齊，可維護性高於傳統 float 排版。',
                resultImg: 'microsoft-card-now'
            },
            {
                name: '不使用 JS 的 Go-top 按鈕',
                img: 'microsoft-gotop-ori',
                situation: '回到頁首按鈕須隨捲動高度淡入，且在滑到最底部時不能遮擋導覽列與頁尾資訊，使用 fixed 無法自動停在頁尾上方。',
                task: '純粹使用 CSS 達成動態定位與淡入動畫，並精確控制活動範圍。',
                action: [
                    '使用 position: sticky 取代傳統的 position: fixed，並設定 bottom: 20px 讓按鈕在滑到頁尾時自然觸發停留邊界。',
                    '引入 animation-timeline: scroll(root)，將 CSS 淡入動畫的進度百分比與瀏覽器的原生滾動條深度進行硬體級綁定。',
                    '設定 animation-range 定義按鈕從透明（opacity: 0）到完全顯示（opacity: 1）的精確滾動區間。'
                ],
                result: '達成流暢滾動特效，免除了瀏覽器對 JS 監聽滾動事件帶來的效能損耗，加深了對原生 CSS 排版與動畫潛能的實踐能力。',
                resultImg: 'microsoft-gotop-now'
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: ['microsoft-pc'] },
            { name: '平板 (768px)', img: ['microsoft-tablet'] },
            { name: '手機 (375px)', img: ['microsoft-phone'] },
        ],
        links: [
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/SourceCode/Microsoft-index%20RWD' },
            { name: 'DEMO', link: 'https://trista25411.github.io/porfolio/projectsLink/Microsoft/index.html' },
        ],
    },
    {
        id: 6,
        logo: 'my',
        title: '此個人作品集網站製作',
        pic: 'porfolio',
        tech: [
            { icon: 'vue', name: 'Vue 3' },
            { icon: 'ts', name: 'TypeScript' },
            { icon: 'storybook', name: 'StoryBook' }
        ],
        intr: ['結合 TypeScript、Vue、及 Storybook 進行開發，建立高維護性與自動化部署網站。'],
        motivation: '整合設計與開發技能，並優化作品集展示的資料管理流程。',
        history: [
            '1. 學習運用 STAR 原則系統化闡述開發過程中的技術挑戰與對策。',
            '2. 利用 Vue 動畫與轉場效果，提升使用者瀏覽作品時的層次感與引導性。',
            '3. 學習運用 EmailJS 實作無後端發信系統及 Storybook 元件文件化。',
            '4. 利用自動化部署與組件化開發，建立個人網站。'
        ],
        source:
            [{ name: '', link: '' }],
        challenge: [
            {
                name: '動態資料路徑與組件匯入失效',
                img: '',
                situation: '從 JSON 讀取圖片路徑或定義組件時，Vite 常無法正確解析動態拼接的路徑 。',
                task: '建立可靠的資源匯入邏輯，確保圖片與組件在 Build 後仍能正確顯示。',
                action: [
                    '使用 new URL(path, import.meta.url).href 明確路徑起點，提高編譯器解析成功率 。',
                    '建立組件 Mapping 物件，利用 <component :is="..."> 根據名稱動態切換，取代字串直接匯入。',
                ],
                result: '成功實作資料驅動介面，修改 JSON 即可自動更新全站作品。',
                resultImg: ''
            },
            {
                name: '留言功能與第三方服務整合',
                img: 'porfolio-emailjs-ori',
                situation: '作品集具備聯絡功能，但不使用後端伺服器與資料庫。',
                task: '串接 EmailJS 第三方服務，實作純前端的發信功能。',
                action: [
                    '串接 EmailJS API，並在 Vue 組件中監聽 submit 事件以處理發信請求。',
                    '使用原生 HTML5 驗證機制，對 Email 格式與內容長度進行雙重檢查。',
                    '加入 Loading State 與 Debounce，避免使用者重覆點擊造成重複發信。'
                ],
                result: '成功建立輕量化的溝通管道，降低維護成本。',
                resultImg: 'porfolio-emailjs-now'
            },
            {
                name: '環境效能瓶頸與資源優化',
                img: 'porfolio-eperm-ori',
                situation: '製作專案存取圖片時，檔案資料夾頻繁出現卡死，在 VS Code 內部修改檔案卻完全正常，影響開發效率。',
                task: '解除檔案系統被開發進程鎖定的狀態，恢復資料夾的操作權限。',
                action: [
                    '暫停 VS Code 終端機內執行的 npm run dev 伺服器，釋放其對目錄的監控控制碼。',
                    '使用 Ctrl + Shift + P 執行 Reload Window ，強制中斷編輯器對路徑的佔用。',
                    '檢查是否有雲端同步服務鎖定該目錄，重啟檔案資源管理器進行操作 。'
                ],
                result: '解決頻繁發生的環境鎖定問題，確保開發工作不因檔案操作受阻。',
                resultImg: 'porfolio-eperm-now'
            },
            {
                name: '專案部署與線上環境衝突',
                img: 'porfolio-git-ori',
                situation: '要將多個獨立開發的 Vue 3 專案，以子資料夾的形式共同部署在同一個 GitHub Pages 伺服器中，但在上線後遇到了「白屏、404、以及只有顯示NavBar的現象',
                task: '確保所有專案在線上環境能正常運作、流暢切換分頁，並且在線上 API 發生異常或延遲時，能無縫切換至本地的 data.json 備用資料進行渲染',
                action: [
                    '將 data.json 移至 public/ 根目錄中，並將原先的 import 語法改寫為瀏覽器原生 await fetch，解決失效問題。',
                    '伺服器 Jekyll 預設封鎖 Vite 底線開頭檔案（如 _plugin-vue），修改 GitHub 配置並將 Build 切換為 GitHub Actions (Static HTML)，解除伺服器的命名限制。',
                    '因 Base URL 與入口網址（如夾帶 index.html）造成的認知落差，在 router/index.ts 導入了 alias（別名），將線上的特殊網址引導至首頁，順利觸發 onMounted 渲染。',
                ],
                result: '所有子專案皆部署成功，多個分頁切換流暢，學會 SPA 路由機制，並了解如何處理「本機與線上環境的行為落差」。',
                resultImg: 'porfolio-git-now'
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: ['porfolio-pc'] },
            { name: '平板 (768px)', img: ['porfolio-tablet'] },
            { name: '手機 (375px)', img: ['porfolio-phone'] },
        ],
        links: [
            { name: 'Figma', link: 'https://www.figma.com/design/NUSFnOzYqcr6h4z3hhVRQw/Portfolio-website?node-id=807-9074&t=pPUb9uPevY8yr3PN-1' },
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/SourceCode/porfolioPagesCode' },
        ],
    },
];



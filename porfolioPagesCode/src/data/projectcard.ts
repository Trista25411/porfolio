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
                task: '優化資訊層級，並整合各局處資源，降低獲取資訊的點擊次數。',
                action: [
                    '現有資料清單進行分類與重複性質的功能歸納，定義核心與選配欄位。',
                    '採用資訊階層化設計，將核心功能與次要資訊區隔，並設計明顯的導覽切換機制。',
                    '建立統一的資料介面，確保前端渲染邏輯的一致性。'
                ],
                result: '網站資訊簡化，提升使用者獲取資訊的效率。',
                resultImg: ''
            },
            {
                name: '動態內容擴充輪播組件',
                img: 'ljh-card-ori',
                situation: '反詐騙宣導的輪播區塊須承載長度不一的圖文資訊，並提供良好的跨裝置閱讀與操作體驗。',
                task: '加入「查看更多/收回」功能，根據字數自動判定是否顯示控制按鈕，且修復卡片高度不一及圖片溢出的缺陷，並支援雙指手勢滑動，提升桌面端使用者的操作直覺。',
                action: [
                    '狀態管理與邏輯判斷：設定條件來計算字數，當內容超過 100 字時自動產生「查看更多」按鈕與漸層遮罩。',
                    '統一高度、溢出控制：結合 Swiper-slide 的高度自適應，強制同列卡片垂直高度對齊，並修復與 Swiper 容器間的渲染衝突，解決了圖片在展開過程中意外超出卡片邊界的問題。',
                    '細節視覺處理：加入動畫效果與 object-fit: cover 屬性，確保在內容收合切換時，使用者體驗是流暢且圖片不變形的。'
                ],
                result: '解決所有解析度下的高度對齊問題，且讓使用者能自由控制閱讀量，並透過支援觸控板手勢，讓不同使用者有同樣流暢的互動體驗，降低操作阻力。',
                resultImg: 'ljh-card-now',
            },
            {
                name: '影音載入黑屏與效能瓶頸',
                img: 'ljh-youtube-ori',
                situation: '初次載入時須同時呈現多個 YouTube 影片資源，導致頁面緩慢且出現大片黑塊，視覺體驗不佳。',
                task: '加入延遲加載機制，並在點擊前顯示自定義縮圖。',
                action: [
                    '在 Vue 3 中建立 isLoaded 響應式狀態，預設為 false。',
                    '利用 YouTube Image API 抓取縮圖，並用 CSS 偽元素製作播放按鈕引導點擊。',
                    '使用組件化開發解析 URL，僅在點擊時才渲染 <iframe>。',
                ],
                result: '初始請求資源大幅減少，解決了載入期間的視覺缺陷。',
                resultImg: 'ljh-youtube-now'
            },
            {
                name: '跨部門資料同步完整度',
                img: '',
                situation: '整合多個局處 API 時，發現資料格式不一且常有缺失，導致前端渲染報錯 。',
                task: '建立嚴謹的資料驗證層，確保異常資料不會影響頁面運作。',
                action: [
                    '使用 TS 定義型別介，對原始 JSON 進行約束。',
                    '封裝資料 Mapper，對缺失欄位提供預設值，並加入 try...catch 捕捉 API 異常 。'
                ],
                result: '統穩定度大幅提升，即使部分資料源故障，主頁面仍能正常顯示其餘功能。',
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
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/source-code/FCU-11404-LJH' },
            { name: 'DEMO', link: '' },
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
                img: 'rest-problem-1',
                situation: '當網頁開啟或組件掛載時，因 API 資訊回傳存在時間差，Vue 在數據尚未完整載入前即嘗試存取屬性。由於讀取不到對應資料，引發渲染中斷，進而導致畫面出現短暫或持續性的白屏現象',
                task: '確保網頁在數據完整獲取後再啟動畫面渲染，解決載入過程中的空白與報錯問題，並提升載入的視覺穩定性',
                action: [
                    '在畫面內容的最外層容器加入 v-if 指令，增加「數據存在才顯示」的邏輯判斷',
                    '利用 Vue 響應式機制，確保數據完整寫入並通過驗證後，再啟動 DOM 渲染流程',
                    '優化資料存取流程，確保加載狀態能正確過渡到畫面上'
                ],
                result: '解決資料載入與畫面顯示的時間落差，確保頁面在任何環境下都能穩定、完整地呈現資訊',
                resultImg: ''
            },
            {
                name: '欄位結構解析錯誤',
                img: 'rest-problem-2',
                situation: '在國家詳情頁呈現「Native Name」資訊時，抓取了整個原始 JSON 物件結構而非具體名稱，造成頁面閱讀困擾',
                task: '修正資料抓取路徑，將複雜的物件資訊，轉換為清晰、可閱讀的正確文字內容',
                action: [
                    '檢查程式碼發現取值的位置寫錯，導致程式抓到整個物件而非內部的文字',
                    '校準屬性存取語法，改為指向數據結構中的文字欄位，而非整個物件層級',
                    '驗證解析後的數據類型，過濾掉多餘的程式結構碼，確保畫面上獲得正確的字串資訊'
                ],
                result: '詳情頁資訊顯示恢復正常，能正確呈現該國家資訊，不再顯示原始資料',
                resultImg: ''
            },
            {
                name: '路由參數變動但視圖未更新',
                img: 'rest-problem-3',
                situation: '在詳情頁點擊「鄰國」跳轉時，網址已變但組件未觸發更新，導致讀取不到資料，產生報錯與白屏現象',
                task: '建立網址變動與資料抓取的連動機制，確保點擊跳轉後頁面能即時呈現對應的國家資訊',
                action: [
                    '設定 watch 監聽器，即時偵測路由 ID 變動。',
                    '當偵測到變動時，主動重新觸發資料抓取函式並替換畫面，載入新國家資料以維持資訊同步',
                ],
                result: '跳轉功能恢復流暢，確保資訊在多頁面切換時始終同步。',
                resultImg: ''
            },
            {
                name: '圖片失效與資源備援',
                img: 'rest-problem-4',
                situation: '受第三方 API 的 SVG 資源不穩定影響，首頁列表中部分國旗無法正常顯示，但點入詳情頁卻有圖片，造成視圖不一致',
                task: '整合圖片抓取規格，並建立穩定的資源載入邏輯，確保所有國家的圖片均能穩定呈現',
                action: [
                    '檢查資料源後，統一加入 svg:string 邏輯判斷，優先調用具備穩定來源的檔案連結',
                    '建立資源備援機制，優化加載路徑，確保首頁列表與詳情頁的圖片資源來源一致且可用',
                ],
                result: '解決首頁與詳情頁圖片不一致的問題，即便外部資源波動，系統也能正確顯示國旗圖片',
                resultImg: ''
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: ['rest-pc-w', 'rest-pc-b'] },
            { name: '平板 (768px)', img: ['rest-tablet-w', 'rest-tablet-b'] },
            { name: '手機 (375px)', img: ['rest-phone-w', 'rest-phone-b'] },
        ],
        links: [
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/source-code/REST%20Countries%20API' },
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
                situation: '隨分頁切換不同的高畫質背景大圖，在不同螢幕尺寸下易出現顯示比例失真或載入過慢的問題。',
                task: '優化背景圖載入策略，並確保在各種螢幕尺寸下皆能完整呈現',
                action: [
                    '利用 CSS 變數定義不同斷點下的 background-image 路徑，針對不同斷點提供對應尺寸的背景切換。',
                    '加入圖片預載 Preload，在切換分頁前預先快取下一張大圖，減少轉場時的閃爍感。',
                    '後採用了 Grid minmax() 與 grid-template-columns 靈活分配側邊間距',
                    '並使用了 object-fit: cover，在寬螢幕下固定其最大呈現尺寸，避免其隨螢幕無限擴張 。'
                ],
                result: '頁面載入速度提升，且從 375px 到 3000px+ 的各種解析度下，均展現出一致的視覺體驗，解決了大型螢幕佈局崩潰。',
                resultImg: ''
            },
            {
                name: '頁面轉場動畫衝突',
                img: '',
                situation: '在切換頁面，畫面文字更新過於突兀，缺乏沉浸感。',
                task: '實作平滑的淡入淡出動畫，且確保動畫執行期間不會引發佈局跳動。',
                action: [
                    '引入 Vue Transition 組件封裝資料區域，並設定 mode="out-in" 確保舊資料消失後再顯示新資料。',
                    '搭配 CSS Keyframes 定義位移效果，模擬平移感。'
                ],
                result: '使用者體驗提升，轉場過程流暢自然',
                resultImg: ''
            },
            {
                name: 'JSON 資料型別定義挑戰',
                img: '',
                situation: '依賴 data.json 提供所有資料。若僅使用 any 型別容易在渲染過程中因屬性缺失而崩潰 。',
                task: '建立TypeScript Interface，精確定義資料結構，並處理潛在的選擇性欄位。',
                action: [
                    '分析 data.json 的內容，為專案建立了層級化的型別宣告文件',
                    '針對不同資料模組來定義，並利用 Union Types 鎖定特定的字串常數',
                    '驗證從 JSON 獲取的資料是否符合預期結構，並逐步修復 IDE 的紅字警告並提升開發效率。'
                ],
                result: '攔截超過 10 次因屬性拼寫錯誤導致的 Bug，縮短偵錯時間，提升了程式碼的可重構性與系統穩定度。',
                resultImg: ''
            },
            {
                name: 'GitHub Pages SPA 路由失效',
                img: '',
                situation: 'GitHub Pages 預設在伺服器端尋找與 URL 路徑對應的實體檔案，當使用者在子頁面直接刷新瀏覽器時，會導致伺服器返回 404 錯誤，因為實體路徑並不存在 。',
                task: '修改路由定向，確保使用者可以直接存取子 URL 或重新整理頁面。',
                action: [
                    '當 404 發生時，自定義的錯誤頁面會攔截當前 URL 並將其轉換為查詢參數，隨後重定向至根目錄的 index.html。',
                    'Svelte Router 在初始化時解析查詢參數，將應用程序恢復至正確的狀態 。',
                    ''
                ],
                result: '可正常切換頁面，重新刷新頁面時順暢，解決平台技術限制',
                resultImg: ''
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: [''] },
            { name: '平板 (768px)', img: [''] },
            { name: '手機 (375px)', img: [''] },
        ],
        links: [
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/source-code/space-tourism%20completed' },
            { name: 'DEMO', link: '' },
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
        intr: ['傳統醫學出版社官網現代化視覺重構。','簡化配色系統建立專業感，優化書籍檢索流程。'],
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
                situation: '舊版官網配色缺乏一致性，導致品牌形象不夠鮮明且視覺干擾過多。',
                task: '精簡色彩計畫，建立一套符合出版社專業形象的視覺系統。',
                action: [
                    '建立配色系統，提取品牌核心色彩，並制定輔助色與中性色規範，確保介面視覺平衡。',
                    '規範所有導覽按鈕與標題層級，將非核心的亮色元素替換為一致的品牌色調。',
                ],
                result: '網站整體呈現出更為現代、清爽的風格，提升閱讀舒適度。',
                resultImg: ''
            },
            {
                name: '導覽列目錄過長',
                img: 'hoji-dropdown-ori',
                situation: '現有的樹狀下拉選單在行動端展開後會長達數屏，使用者在滑動過程中極易失去方向，且難以返回上一層級。',
                task: '調整整體架構，將主要入口限制約 10 個選項。',
                action: [
                    '將原有架構 27 項類別，整合修訂為 12 項。',
                    '將過於詳細的次級目錄隱藏至 Filters 中，僅保留最熱門的「醫學考用」、「專科參考書」等主要類別 。',
                    '加入麵包屑方便點選跳轉到上一頁面'
                ],
                result: '分類跳轉率降低，且平均查找書籍時間減少，提升了讀者的留存意願。',
                resultImg: 'hoji-color-now'
            },
            {
                name: '搜尋書籍流程過於繁瑣',
                img: '',
                situation: '類別繁多且層級太多又深，讓使用者拿找到需求的書籍。',
                task: '優化導覽列與搜尋過濾器，提升資訊辨識效率。',
                action: [
                    '首頁顯示熱門書籍',
                    '在類別中加入篩選器，讓頁面直接顯示符合該類別內容',
                    '導入搜尋欄並加入 Autocomplete 功能，根據醫學關鍵字即時回饋搜尋結果。',
                ],
                result: '搜尋流程變得直覺流暢，尋找特定書籍的時間縮短。',
                resultImg: ''
            },
        ],
        RWD: [
            { name: '首頁', img: ['hoji-index'] },
            { name: '書籍列表', img: ['hoji-search'] },
            { name: '商品頁', img: ['hoji-book'] },
        ],
        links: [
            { name: 'PPT', link:'https://canva.link/8fhi8vupcfgkt26'},
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
                situation: '首頁輪播圖須達成自動播放與自定義控制介面，以符合微軟官方提供的功能。',
                task: '不使用 JS，只透過 HTML 屬性完成複雜的 Swiper 配置。',
                action: [
                    '採用 <swiper-container> 標籤，並將 autoplay 的 JSON 物件作為屬性傳入 。',
                    '使用 <picture> 標籤配合多組 <source srcset> 高解析度圖片的自動切換。',
                    '透過 CSS 定位 .banner-block 並設定 transform 確保文字在不同解析度始終居中。'
                ],
                result: '製作出同微軟官網的輪播互動，且降低了瀏覽器的 JS 執行負擔。',
                resultImg: 'microsoft-swiper-now'
            },
            {
                name: '矩陣佈局的動態重組',
                img: 'microsoft-card-ori',
                situation: '微軟首頁的產品區域在不同解析度下須保持相同間距，且部分視覺權重需隨解析度改變。',
                task: '避免在 HTML 中加入過多的輔助標籤，僅靠 CSS 達成結構重排。',
                action: [
                    '採用 flex-wrap: wrap 佈局，並利用 width: calc() 動態計算間距與圖片寬度。',
                    '在不同斷點重新指定區塊的排列位置，確保視窗縮放時比例不跑位。',
                ],
                result: '代碼精簡並在各裝置下皆能達還原對齊，維護性比傳統的 float 更佳。',
                resultImg: 'microsoft-card-now'
            },
            {
                name: '不使用 JS 的 Go-top 按鈕',
                img: 'microsoft-gotop-ori',
                situation: '回到頁首按鈕須隨捲動高度淡入，且不遮擋導覽列及頁尾，製作時發現無法固定在頁尾上方。',
                task: '純粹使用 CSS 達成動態定位與淡入動畫，並精確控制活動範圍。',
                action: [
                    '使用 position: sticky 取代傳統 fixed，並設定 bottom: 20px 觸發停留邊界。',
                    '引入 animation-timeline: scroll(root) 將動畫進度與頁面滾動綁定。',
                    '設定 animation-range 定義按鈕從透明到完全顯示的滾動區間。'
                ],
                result: '大幅減少腳本依賴，提升頁面捲動的流暢度，以及對 CSS 的理解與實踐能力。',
                resultImg: 'microsoft-gotop-now'
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: ['microsoft-pc'] },
            { name: '平板 (768px)', img: ['microsoft-tablet'] },
            { name: '手機 (375px)', img: ['microsoft-phone'] },
        ],
        links: [
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/source-code/Microsoft-index%20RWD' },
            { name: 'DEMO', link: '' },
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
                name: '大圖加載頁面跳動與延遲',
                img: '',
                situation: '作品集包含多張長截圖，直接載入會導致頁面佈局在圖片下載時頻繁跳動，影響閱讀。',
                task: '實作流暢的加載體驗，消除視覺上的不穩定感 。',
                action: [
                    '作品卡片設定固定比例，即使在圖片載入前也能預留固定空間。',
                    '引入「模糊預覽 (Blur-up)」技術，在圖片下載時先顯示低解析縮圖，消除白屏感 。',
                ],
                result: '網頁穩定度大幅提升，首屏渲染時間與視覺體驗均達到專業水準 。',
                resultImg: ''
            },
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
                img: '',
                situation: '作品集具備聯絡功能，但不使用後端伺服器與資料庫。',
                task: '串接 EmailJS 第三方服務，實作純前端的發信功能。',
                action: [
                    '串接 EmailJS API，並在 Vue 組件中監聽 submit 事件以處理發信請求。',
                    '使用原生 HTML5 驗證機制，對 Email 格式與內容長度進行雙重檢查。',
                    '加入 Loading State 與 Debounce，避免使用者重覆點擊造成重複發信。'
                ],
                result: '成功建立輕量化的溝通管道，降低維護成本。',
                resultImg: ''
            },
            {
                name: '開發環境效能瓶頸與資源調度優化',
                img: 'porfolio-eperm-ori',
                situation: '製作專案存取圖片時，檔案資料夾頻繁出現卡死，在 VS Code 內部修改檔案卻完全正常，影響開發效率。',
                task: '解除檔案系統被開發進程鎖定的狀態，恢復資料夾的操作權限。',
                action: [
                    '暫停 VS Code 終端機內執行的 npm run dev 伺服器，釋放其對目錄的監控控制碼。',
                    '使用 Ctrl + Shift + P 執行 Reload Window ，強制中斷編輯器對路徑的佔用。',
                    '檢查是否有雲端同步服務鎖定該目錄，必要時重啟檔案資源管理器進行操作 。'
                ],
                result: '解決頻繁發生的環境鎖定問題，確保開發工作流不再因檔案操作受阻。',
                resultImg: 'porfolio-eperm-now'
            },
        ],
        RWD: [
            { name: '電腦 (1440px)', img: [''] },
            { name: '平板 (768px)', img: [''] },
            { name: '手機 (375px)', img: [''] },
        ],
        links: [
            { name: 'Figma', link: 'https://www.figma.com/design/NUSFnOzYqcr6h4z3hhVRQw/Portfolio-website?node-id=807-9074&t=pPUb9uPevY8yr3PN-1' },
            { name: 'GITHUB', link: 'https://github.com/Trista25411/porfolio/tree/main/porfolio-vue' },
        ],
    },
];



import { Meta, StoryObj } from '@storybook/vue3';
import ProjectProblemCard from "./ProjectProblemCard.vue";

const meta: Meta<typeof ProjectProblemCard> = {
    title: 'components/ProjectProblemCard',
    component: ProjectProblemCard
}
export default meta;
type Story = StoryObj<typeof ProjectProblemCard>;

export const Default: Story = {
    args: {
        items:[ {
                name: '數據延遲與渲染衝突',
                img: 'rest-problem-1',
                situation: '當網頁開啟或組件掛載時，因 API 資訊回傳存在時間差，Vue 在數據尚未完整載入前即嘗試存取屬性。由於讀取不到對應資料，引發渲染中斷，進而導致畫面出現短暫或持續性的白屏現象',
                task: '確保網頁在數據完整獲取後再啟動畫面渲染，解決載入過程中的空白與報錯問題，並提升載入的視覺穩定性',
                action: [
                    '在畫面內容的最外層容器加入 v-if 指令，增加「數據存在才顯示」的邏輯判斷',
                    '利用 Vue 響應式機制，確保數據完整寫入並通過驗證後，再啟動 DOM 渲染流程',
                    '優化資料存取流程，確保加載狀態能正確過渡到畫面上'
                ],
                result: '解決資料載入與畫面顯示的時間落差，確保頁面在任何環境下都能穩定、完整地呈現資訊'
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
                result: '詳情頁資訊顯示恢復正常，能正確呈現該國家資訊，不再顯示原始資料'
            },
            {
                name: '路由參數同步失效',
                img: 'rest-problem-3',
                situation: '在國家詳細頁點選「Border Countries」選項進行跳轉時，雖然瀏覽器網址已發生變動，但畫面組件未被觸發更新，導致讀取不到新資料而產生 undefined 報錯與白屏現象',
                task: '建立網址變動與資料抓取的連動機制，確保點擊跳轉後頁面能即時呈現對應的國家資訊',
                action: [
                    '設定監聽器，即時偵測網址後方的國家 ID 有變動，並主動觸發數據重新抓取函數，載入新國家資料',
                    '修正跳轉參數傳遞，確保在抓取到新資料後立即替換畫面，維持資訊同步',
                ],
                result: '跳轉功能恢復，點擊切換按鈕能流暢地加載並顯示目標國家的詳細資訊'
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
                result: '解決首頁與詳情頁圖片不一致的問題，即便外部資源波動，系統也能正確顯示國旗圖片'
            },]
    }
}

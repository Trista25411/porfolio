<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
// <country | null> => 變數一開始是 null, 但之後存入符合country的物件
const country = ref<Country | null>(null);
// 存取鄰國名稱變數
const borderCountries = ref<borderCountries[]>([]);

// ts 先定義結構
interface borderCountries {
    name: string;
    id: string;
};

// 定義 API 回傳格式結構
interface Country {
    name: { common: string; nativeName?: Record<string, { common: string }>; };
    flags: { svg: string; png: string };
    population: number;
    region: string;
    subregion: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, { name: string }>;
    languages?: Record<string, string>;
    borders?: string[];
}

// 匯入 api 詳細資料
const fetchCountries = async () => {
    // 判斷是否有值
    // if(!route.params.id) return;
    // 判斷是不是在這裡出問題
    // console.log('ID 是:', route.params.id);

    try {
        // 1. 抓取目前國家資訊
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${route.params.id}`);
        const data = await res.json();
        country.value = data[0] as Country;

        // 2. 擷取鄰國資訊
        // 為了不讓系統報錯卡死，設定兩個條件
        //     √ 有沒有這個欄位          √ 鄰國數量是不是大於零, 若是空的就不用去執行 fetch
        if (country.value.borders && country.value.borders.length > 0) {
            const codes = country.value.borders.join(',');
            const borderRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`);
            const borderData = await borderRes.json();
            borderCountries.value = borderData.map((border:any) => ({
                name: border.name.common,
                id: border.cca3,
            }));
        } else {
            borderCountries.value = [];
        }
    } catch (error) {
        console.error('抓取資料失敗, error');
    };
};

// 左側清單生成
// computed 內部使用 country.value => 變數依賴於 country 
// 剛進入country是null, computed回傳空值；
// 當 fetchCountries完成, country.value被填入資料時，發現變數變了
// computed會立即重新計算並更新到模板
const leftInfo = computed(() => [
    // value 值不同
    // population 跟 region 的 key 是固定的
    // 不會因不同國家名稱而不同 => 直接使用country.value.xxxx來使用
    // 但 currencies 或是 languages...每個國家不太一樣
    // => 利用 Object.values(xxxx), 這樣就會變成陣列, 不用管每個國家的不同
    // EX: 取得nativeName物件, 用Object.values變成陣列, 取出第0項，拿出.common屬性, 並把內容轉成字串顯示正確文字
    // ?.[0] => 去陣列化，不要顯示 [....]
    { label: 'Native Name:', value: Object.values(country.value?.name?.nativeName || {})[0]?.common || 'N/A' },
    { label: 'Population:', value: country.value?.population.toLocaleString() },
    { label: 'Region:', value: country.value?.region },
    { label: 'Sub Region:', value: country.value?.subregion },
    { label: 'Capital:', value: country.value?.capital?.[0] || 'N/A' },
]);

// 右側清單生成
const rightInfo = computed(() => [
    { label: 'Top Level Domain:', value: country.value?.tld?.[0] || 'N/A' },
    { label: 'Currencies:', value: Object.values(country.value?.currencies || {}).map(country => country.name).join(',') },
    { label: 'Languages:', value: Object.values(country.value?.languages || {}).join(',') }
]);

// 點選鄰國名稱跳轉
const goToBorder = (id:string) => {
    router.push(`/detail/${id}`);
};

// 匯入 fetchCountries
// 點選 border-countries => 網址變了但沒有重新執行 
// 因 vue會複用組件, onMounted 不會刷新頁面
// 但設定 watch 後一直報錯, 可能是抓取參數時間差(尚未準備好資料所以顯示了undefined)
// onMounted(fetchCountries);

// 新增一個新的監聽器重新刷新
watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            fetchCountries();
        }
    },
    // 讓組件一建立就先執行一次 fetchCountries
    { immediate: true }
)
</script>

<template>
    <div class="container" v-if="country">
        <button type="button" @click="router.back()" class="back">
            <span><ion-icon name="arrow-back-outline"></ion-icon></span>
            <span>Back</span>
        </button>
        <div class="info-content">
            <img :src="country.flags.svg" :alt="country.name.common">
            <div>
                <h1 class="country">{{ country.name.common }}</h1>
                <div class="info">
                    <div class="info-column">
                        <div v-for="item in leftInfo" :key="item.label">
                            <span class="detail-label">{{ item.label }}</span>
                            <span>{{ item.value }}</span>
                        </div>
                    </div>
                    <div class="info-column">
                        <div v-for="item in rightInfo" :key="item.label">
                            <span class="detail-label">{{ item.label }}</span>
                            <span>{{ item.value }}</span>
                        </div>
                    </div>
                </div>
                <div class="btm">
                    <span class="name">Border Countries:</span>
                    <!-- 
                    borders欄位儲存的是鄰國的 ISO 3166-1 alpha-3 代碼, 要先進行處理再將資料轉成看得懂的國家名稱
                    1. 判斷目前國家是否有borders欄位
                    2. 使用 api aplha查詢，一次傳入代碼
                    3. 將回傳的國家清單存成一個新 ref
                    4. 使用v-for跑清單, 點擊按鈕透過router.path跳轉頁面
                    -->
                    <span class="border-all">
                        <button type="button" v-for="item in borderCountries" :key="item.id"
                            @click="goToBorder(item.id)" class="border-countries">{{ item.name }}</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    cursor: pointer;
    border: none;
}

img {
    width: 500px;
    border: 1px solid gray;
}

.container {
    padding: 60px 80px;
    overflow-x: hidden;
}

.back {
    background-color: var(--color-ele);
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.3);
    padding: 10px 30px;
    margin-bottom: 60px;
    color: var(--color-text);
}

.info-content {
    display: flex;
    align-items: center;
    gap: 50px;
}

.info {
    display: flex;
    gap: 80px;
    margin-bottom: 50px;
}

.info-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
}

.btm {
    display: flex;
    gap: 10px;
    align-items: center;
}

.detail-label {
    font-weight: 600;
    margin-right: 8px;
}

.border-countries {
    background-color: var(--color-ele);
    box-shadow: 0 0 3px rgba(128, 128, 128, 0.9);
    padding: 5px 10px;
    margin-right: 10px;
    color: var(--color-text);
}

@media (max-width:1399px) {
    .info-content {
        display: block;
        width: 100%;
    }

    .info {
        display: block;
    }
}

@media (max-width:711px) {
    .container {
        padding: 40px;
    }

    .btm {
        display: block;
    }
}

@media (max-width:593px) {
    img {
        width: 80%;
    }

    .border-all {
        display: block;
    }

    .border-countries {
        margin-top: 10px;
    }
}

@media (max-width:425px) {
    .container {
        width: 90%;
    }
}
</style>
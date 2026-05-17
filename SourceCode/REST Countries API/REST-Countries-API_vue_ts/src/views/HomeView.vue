<!-- 網站需求
homepage可以看到所有國家
尋找國家用input處理
篩選用國家
點選國家打開分頁可以查看更多
可以點鄰近國家
可以切換深夜模式 
api網頁：https://restcountries.com/  篩選取得要的東西
若網頁API掛掉，可以用本地的data.json
-->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import CountryCard from '../components/CountryCard.vue';
import localData from '../assets/data.json';

// 定義結構 慣例首字母大寫
interface Country {
    id: string;
    name: string; // map後取的是 item.name.common
    population: number;
    region: string;
    capital: string; // map後取的是 item.capital?.[0]
    flag: string; // map後取的是 flags.png
}

const countries = ref<Country[]>([]); // 串接 API
const searchQuery = ref(''); // 搜尋關鍵字
const selectRegion = ref(''); // 綁定選重的地區 (預設為空, 顯示全部)
const isOpenDrop = ref(false); // 控制下拉選單開合
const dropListRef = ref<HTMLElement | null>(null); // 判斷點擊外部的 DOM, 控制隱藏選單, <指定為 HTML 元素或 null>

// 抓 API 資料
//  async 非同步作業 => 讓其他資訊不因串接api的時間延遲到
const fetchCountries = async () => {
    try {
        // 串接 api 網址，需要一點時間
        // await讓程式抓取資料再繼續下去，避免抓到空資料
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,capital');
        const rawData = await response.json();

        // 將 api 資料轉為自訂的標準，
        // 因 data.json 是v2版，目前api已經是v3.1版，抓取的資訊不同，
        // 原先寫法會造成api抓不到改抓data.json時，因名稱不同反而抓取不到造成錯誤
        countries.value = rawData.map((item: any) => ({
            // 要看api名稱 => https://restcountries.com/ 進入後找到 All Countries (/v3.1/all?fields=name,flags)
            // 在瀏覽器搜尋 https://restcountries.com/v3.1/all?fields=name,flags 即有name跟flag資訊，會密密麻麻的，在最上面有美化排版的選項可以分筆看
            // api是需要哪些東西就要在瀏覽器加入，不然不會顯示 => 改為 https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,capital
            // id使用cca3是國家三位字母代碼，為常用寫法，用這個來辨別id最容易
            id: item.cca3,
            name: item.name.common,
            population: item.population,
            region: item.region,
            capital: item.capital?.[0],
            flag: item.flags.svg || item.flags.png
        }));
    } catch (error) {
        console.warn('API出錯, 改用本地資料data.json');
        countries.value = localData.map(item => ({
            // 本地資料也要變成一樣的格式
            id: item.alpha3Code,
            name: item.name,
            population: item.population,
            region: item.region,
            capital: item.capital || 'N/A',
            flag: item.flags.png
        }));
    };
};

// search / filter功能
// 取得所有國家 region, 並用 Set 去除重複, 最後轉回陣列
const regions = computed(() => {
    const allRegions = countries.value.map(c => c.region).filter(Boolean); // 過濾空值
    return [...new Set(allRegions)]; // 去除重複
});
// 頁面顯示清單, 同時處理 search 與 filter
const filtercountries = computed(() => {
    return countries.value.filter(c => {
        // 搜尋比對(不分大小寫)
        const matcheSearch = c.name.toLowerCase().includes(searchQuery.value.toLocaleLowerCase());
        // 比對地區
        const matchesRegion = selectRegion.value ? c.region === selectRegion.value : true;
        return matcheSearch && matchesRegion;
    });
});

const setRegion = (region: string) => {
    selectRegion.value = region;
    isOpenDrop.value = false;
};

// 點擊頁面關閉下拉選單
const handleClick = (event: MouseEvent) => {
    // as Node 定義為 DOM 節點, 才能使用contains()
    if (dropListRef.value && !dropListRef.value.contains(event.target as Node)) {
        isOpenDrop.value = false;
    }
}

// 將 API 資料匯入
onMounted(() => {
    fetchCountries();
    // 控制頁面關閉下拉選單
    window.addEventListener('click', handleClick);
});

onUnmounted(() => {
    // 移除監聽
    window.removeEventListener('click', handleClick);
})
</script>

<template>
    <main class="content">
        <header class="top">
            <div class="search">
                <span><ion-icon name="search-outline"></ion-icon></span>
                <input v-model="searchQuery" placeholder="Search for a country..."></input>
            </div>
            <div class="droplist" ref="dropListRef">
                <div class="filter" @click="isOpenDrop = !isOpenDrop">
                    <span>Filter by Region</span>
                    <span><ion-icon name="chevron-down-outline"></ion-icon></span>
                </div>
                <ul class="dropdown" v-if="isOpenDrop">
                    <li @click="setRegion('')">All</li>
                    <li v-for="region in regions" :key="region" @click="setRegion(region)">{{ region }}</li>
                </ul>
            </div>
        </header>
        <section class="cards">
            <RouterLink v-for="c in filtercountries" :key="c.id" :to="`/detail/${c.id}`">
                <CountryCard :country="c" />
            </RouterLink>
        </section>
    </main>
</template>

<style scoped>
/* routerlink寫text-decoration:none沒有效果，可能因為權重不夠，改a就好了 */
a {
    text-decoration: none;
    color: black;
}

input {
    border: none;
    padding: 10px;
    background-color: transparent;
    /* 去除點擊時的外框 */
    outline: none;
    width: 100%;
}

.content {
    padding: 80px;
}

.top {
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
}

.droplist {
    position: relative;
}

.dropdown {
    background-color: var(--color-back);
    width: 200px;
    position: absolute;
    list-style: none;
    padding: 10px 0;
    z-index: 10;
    box-shadow: var(--shadow);
}

.dropdown li {
    padding: 10px 20px;
}

.dropdown li:hover {
    background-color: var(--color-hover-bg);
    color: var(--color-hover-text);
}

.search,
.filter {
    background-color: var(--color-ele);
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-shadow: var(--shadow);
}

.search {
    min-width: 35%;
}

.search input {
    color: var(--color-text);
}

.filter {
    width: 200px;
    gap: 35px;
}

.droplist {
    cursor: pointer;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 40px;
}

@media (max-width:768px) {
    input::placeholder {
        font-size: 10px;
    }

    .content {
        padding: 40px;
    }

    .top {
        display: block;
    }

    .filter {
        margin: 20px 0 -20px 0;
    }
}

@media (max-width:425px) {
    .content {
        padding: 20px;
    }
}
</style>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import CountryCard from '../components/CountryCard.vue';

interface Country {
    id: string;
    name: string; 
    population: number;
    region: string;
    capital: string; 
    flag: string; 
};

const countries = ref<Country[]>([]); 
const searchQuery = ref(''); 
const selectRegion = ref(''); 
const isOpenDrop = ref(false); 
const dropListRef = ref<HTMLElement | null>(null); 

// 抓 API 資料
const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,capital');
        // if (!response.ok) throw new Error('API 異常');
        const rawData = await response.json();

        countries.value = rawData.map((item: any) => ({
            id: item.cca3,
            name: item.name.common,
            population: item.population,
            region: item.region,
            capital: item.capital?.[0],
            flag: item.flags.svg || item.flags.png
        }));
    } catch (error) {
        try {
            const localData = await fetch('./data.json');
            if (!localData.ok) throw new Error('本地 JSON 讀取失敗');
            const backupData = await localData.json();
            // console.log('備用資料測試 backupData:', backupData);

            countries.value = backupData.map((item: any) => ({
                id: item.cca3 || item.alpha3Code,
                name: item.name || item.name.common,
                population: item.population,
                region: item.region,
                capital: item.capital?.[0] || item.capital || 'N/A',
                flag: item.flags.svg || item.flags.png
            }));
            console.log('備用 countries.value 測試:', countries.value);
        } catch (localError) {
            console.error('本地資料也讀取失敗:', localError);
        }
    };
};

// search / filter功能
const regions = computed(() => {
    const allRegions = countries.value.map(c => c.region).filter(Boolean); 
    return [...new Set(allRegions)]; 
});

const filtercountries = computed(() => {
    return countries.value.filter(c => {
        const matcheSearch = c.name.toLowerCase().includes(searchQuery.value.toLocaleLowerCase());
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
    if (dropListRef.value && !dropListRef.value.contains(event.target as Node)) {
        isOpenDrop.value = false;
    }
};

// 將 API 資料匯入
onMounted(() => {
    fetchCountries();
    window.addEventListener('click', handleClick);
});

onUnmounted(() => {
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
a {
    text-decoration: none;
    color: black;
}

input {
    border: none;
    padding: 10px;
    background-color: transparent;
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
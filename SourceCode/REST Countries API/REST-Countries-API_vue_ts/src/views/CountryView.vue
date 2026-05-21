<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const country = ref<Country | null>(null);
const borderCountries = ref<borderCountries[]>([]);

interface borderCountries {
    name: string;
    id: string;
};

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

//  api 詳細資料
const fetchCountries = async () => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${route.params.id}`);
        const data = await res.json();
        country.value = data[0] as Country;

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
const leftInfo = computed(() => [
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

// 鄰國名稱跳轉
const goToBorder = (id:string) => {
    router.push(`/detail/${id}`);
};

// 匯入 fetchCountries
watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            fetchCountries();
        }
    },
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
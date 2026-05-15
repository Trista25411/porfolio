<script setup lang="ts">
// 定義接收的資料結構 => 預期會在HomeView裡面接受到country的東西
defineProps(['country'])
</script>

<template>
    <!-- 原先沒有寫v-if='country'，卡片會變白屏
     => 因網路延遲或是父組件傳遞延遲，變成 undefined => 對「不存在的東西」要求它的屬性，會直接導致程式崩潰 => 程式就會試圖執行 undefined.flag
     加上v-if => 告訴系統請先確認 country 真的有內容（不是 null 或 undefined），你才准開始畫這個 <article> 以及裡面的圖片和文字 -->
    <article v-if="country" class="card">
        <img :src="country.flag" :alt="country.name" class="pic">
        <div class="info">
            <h2>{{ country.name }}</h2>
            <div>
                <span class="name">Population:</span>
                <!-- toLocaleString 來根據使用者網路設定自動把數字轉成帶有「千分位逗號」的字串，從API純數字的 40218234 變成 40,218,234較好識別 -->
                <span>{{ country.population.toLocaleString() }}</span>
            </div>
            <div>
                <span class="name">Region:</span>
                <span>{{ country.region }}</span>
            </div>
            <div>
                <span class="name">Capital:</span>
                <!-- capital加問號是因為並非每個國家都有首都，若不存在就傳空值不讓程式卡住 -->
                <span>{{ country.capital }}</span>
            </div>
        </div>
    </article>

</template>

<style scoped>
.card {
    width: 100%;
    height: 350px;
    background-color: var(--color-ele);
    color: var(--color-text);
    box-shadow: var(--shadow);
}

.card:hover{
    background-color: var(--color-hover-bg);
    color: var(--color-hover-text);
}

.pic {
    width: 100%;
    height: 150px;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
}

@media (max-width:600px) {
    .card{
        height: auto;
    } 
}
</style>

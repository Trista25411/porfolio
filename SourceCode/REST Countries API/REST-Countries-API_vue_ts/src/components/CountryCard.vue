<script setup lang="ts">
defineProps(['country'])
</script>

<template>
    <article v-if="country" class="card">
        <img :src="country.flag" :alt="country.name" class="pic">
        <div class="info">
            <h2>{{ country.name }}</h2>
            <div>
                <span class="name">Population:</span>
                <span>{{ country.population.toLocaleString() }}</span>
            </div>
            <div>
                <span class="name">Region:</span>
                <span>{{ country.region }}</span>
            </div>
            <div>
                <span class="name">Capital:</span>
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

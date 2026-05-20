<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import GoTop from './components/GoTop.vue';
</script>

<template>
  <div class="app-wrapper">
    <NavBar />
    <main>
      <RouterView />
      <GoTop />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
}

main{
  margin-top: 30px;
}
</style>

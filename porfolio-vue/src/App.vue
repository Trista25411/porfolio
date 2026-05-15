<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import GoTop from './components/GoTop.vue';
</script>

<template>
  <div class="app-wrapper">
      <NavBar />
    <div class="main-container">
      <main>
        <RouterView />
        <GoTop />
      </main>
      <Footer />
    </div>
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
  flex-direction: row;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width:1350px) {
  .app-wrapper {
    flex-direction: column;
  }
}
</style>

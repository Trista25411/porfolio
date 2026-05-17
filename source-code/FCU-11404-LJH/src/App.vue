<template>
  <div id="app-container">
    <NavBar />
    <main class="c-bg-white-base">
      <router-view />
      <GoTop/>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
import GoTop from './components/layout/gotop.vue'
</script>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  /* NavBar 的高度是 100px */
  padding-top: 6.25rem; 
}
</style>

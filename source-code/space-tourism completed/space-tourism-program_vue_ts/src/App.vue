<template>
  <router-view v-slot="{ Component }">
    <transition name="dissolve" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #0B0D17;
}

.dissolve-enter-active,
.dissolve-leave-active {
  transition: opacity 300ms ease;
}

.dissolve-enter-from {
  opacity: 1;
}

.dissolve-leave-to {
  opacity: 0.5;
}
</style>

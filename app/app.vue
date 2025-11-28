<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Import global styles
import '../assets/css/main.css';
// Setting a site-wide description and title dynamically
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'Nuxt E-commerce Shop';
  }

});

import { onMounted } from 'vue';

// Debug: Log when app loads
console.log('App.vue is loading...');
</script>
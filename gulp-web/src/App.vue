<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <div class="container">
    <Header />
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.page-content {
  padding-top: 300px; /* banner + navbar 높이만큼 조절 (대략 140~150px) */
}
</style>

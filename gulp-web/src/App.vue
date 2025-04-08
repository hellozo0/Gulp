<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <main class="page-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 */
}

.page-content {
  flex: 1; /* 남은 공간을 전부 차지 */
  padding-top: 300px; /* header height 만큼 */
}
</style>

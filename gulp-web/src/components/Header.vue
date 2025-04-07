<template>
  <div class="header-fixed header-wrapper">
    <Banner />
    <Navbar />
  </div>
</template>

<style>
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background-color: white; /* 배경 없으면 투명하게 뜰 수 있음 */
}
.header-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>

<script setup>
import Banner from './Banner.vue';
import Navbar from './Navbar.vue';
</script>

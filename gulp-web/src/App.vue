<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="container">
    <Header />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/mypage">Mypage></RouterLink>
    </nav>
    <router-view />
  </div>
</template>

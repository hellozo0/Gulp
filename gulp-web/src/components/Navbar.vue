<template>
  <div class="navbar">
    <div class="inner">
      <!-- 로고 -->
      <img src="../assets/images/logo_header.png" class="logo" alt="꿀깍" />

      <!-- 메뉴 -->
      <div class="menu">
        <RouterLink to="/" :class="linkClass('/')">소비 통계</RouterLink>
        <RouterLink to="/history" :class="linkClass('/history')"
          >전체 내역</RouterLink
        >
        <RouterLink to="/loan" :class="linkClass('/loan')">대출현황</RouterLink>
      </div>

      <!-- 버튼 영역 -->
      <div class="action">
        <button class="join-btn">지금 멤버십 가입</button>

        <!-- 로그인 안 된 상태 -->
        <RouterLink v-if="!isLoggedIn" to="/login" class="start-btn"
          >시작하기</RouterLink
        >

        <!-- 로그인 된 상태 -->
        <RouterLink v-else :to="`/mypage/${userId}`" class="user-login">
          <img
            src="../assets/images/mypage_icon.png"
            class="logo"
            alt="마이페이지"
          />
          <p>{{ nickname }}님</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const route = useRoute();
const userStore = useUserStore();
const { isLoggedIn, nickname, userId } = storeToRefs(userStore);

onMounted(() => {
  userStore.loadUser(); // 새로고침해도 상태 유지
});

const linkClass = (path) => {
  return route.path === path ? 'nav-link active' : 'nav-link';
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  background-color: white;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #ddd;
}

.inner {
  width: 100%;
  max-width: 1800px;
  padding: 2px 40px;
  display: flex;
  justify-content: space-between; /* 자식들 사이에 자동으로 공간이 분배되기 때문에, gap이 무시된다. */
  align-items: center;
  box-sizing: border-box;
}

.logo {
  margin-left: 12px;
}

.menu {
  display: flex;
  gap: 90px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: bold;
  font-size: 30px;
}

.nav-link {
  color: black;
  text-decoration: none;
  padding-bottom: 3px;
  position: relative;
}

.nav-link.active {
  color: #f9dc14;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -25px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #f9dc14;
}

.action {
  display: flex;
  gap: 12px;
}

.join-btn {
  padding: 12px 24px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 9999px;
  font-size: 15px;
  cursor: pointer;
}

.start-btn {
  padding: 12px 24px;
  min-width: max-content;
  background-color: black;
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
}

.user-login {
  display: flex;
  align-items: center;
  gap: 8px; /* 아이콘과 텍스트 간격 */
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 15px;
}

.user-login:hover {
  color: #f9dc14; /* 호버 시 색상 강조 */
}

.user-login p {
  margin: 0;
  padding: 0;
  line-height: 1; /* 필요 시 조정 */
}
</style>

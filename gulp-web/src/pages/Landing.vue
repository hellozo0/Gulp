<template>
  <div class="landing-wrapper">
    <div class="main-logo">
      <img src="@/assets/images/logo_center.png" alt="로고" />
    </div>
    <h2>꿀깍이 알려주는 현실적인 대출 가이드</h2>
    <img src="@/assets/images/intro.png" class="character" />

    <button class="login-btn" @click="goLogin">로그인</button>

    <div class="link-group">
      <span>아이디 찾기</span>
      <span>|</span>
      <span>비밀번호 찾기</span>
      <span>|</span>
      <router-link to="/signup" class="signup">회원가입</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.landing-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

.main-logo img {
  height: 200px;
  margin-bottom: 50px;
}

h2 {
  font-size: 50px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.character {
  width: 500px;
  margin: 30px auto;
}

.login-btn {
  background-color: #fae55f;
  padding: 25px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  width: 70%;
  margin: 20px 0;
  font-size: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #fcd400;
}

.link-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 20px;
  margin-top: 10px;
  color: #707070;
}

.link-group a {
  text-decoration: none;
  color: #707070;
}
</style>

<template>
  <div class="login-wrapper">
    <img src="@/assets/images/logo_center.png" class="logo-center" alt="로고" />

    <div class="login-box">
      <input v-model="userId" placeholder="아이디" class="input" />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        class="input"
      />

      <button class="login-btn" @click="login">로그인</button>

      <div class="sub-links">
        <div class="left-links">
          <router-link to="/signup">회원가입</router-link>
        </div>
        <div class="right-links">
          <router-link to="#">아이디 찾기</router-link>
          <span class="divider">|</span>
          <router-link to="#">비밀번호 찾기</router-link>
        </div>
      </div>
      <img
        src="@/assets/images/mypage_default_img.jpg"
        class="login-character"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js';

const userId = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  if (!userId.value || !password.value) {
    alert('아이디와 비밀번호를 입력하세요.');
    return;
  }
  const res = await fetch(
    `http://localhost:3000/users?userId=${userId.value}&password=${password.value}`
  );
  const data = await res.json();

  if (data.length > 0) {
    // 로그인 성공
    const user = data[0];
    user.nickname = user.nickname;
    localStorage.setItem('user', JSON.stringify(user));
    userStore.login(user);

    router.push('/home'); // 홈으로 이동
  } else {
    alert('아이디 또는 비밀번호가 틀렸습니다.');
  }
};
</script>

<style scoped>
.login-wrapper {
  position: relative;
  max-width: 750px;
  margin: 0 auto 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  padding-bottom: 100px;
}

.login-wrapper .logo-center {
  height: 200px;
  margin-bottom: 50px;
}

.login-box {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 48px;
  text-align: left;
  padding-bottom: 130px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 21px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s;
}

.input:focus {
  border-bottom: 2px solid #fae55f;
}

.login-btn {
  width: 100%;
  padding: 16px;
  font-weight: bold;
  background-color: #fae55f;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 21px;
  margin-top: 30px;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #fcd400;
}

.sub-links {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #999;
}

.left-links,
.right-links {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sub-links .sign .link {
  cursor: pointer;
}

.sub-links a {
  text-decoration: none;
  color: #707070;
}

.divider {
  margin: 0 8px;
  color: #ccc;
}

.login-character {
  display: block;
  width: 100px;
  height: auto;
  object-fit: contain;
  position: absolute;
  right: 40px;
  margin: 10px auto 0 auto;
}
</style>

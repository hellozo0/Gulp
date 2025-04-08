<template>
  <div class="signup-container">
    <img src="@/assets/images/logo_center.png" alt="꿀깍 로고" class="logo" />
    <form class="form-box" @submit.prevent="handleSubmit">
      <div class="input-group">
        <label for="userId">아이디</label>
        <input
          v-model="user.userId"
          id="userId"
          type="text"
          placeholder="아이디 입력"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input
          v-model="user.password"
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          required
        />
      </div>
      <div class="input-group">
        <label for="confirmPassword">비밀번호 확인</label>
        <input
          v-model="user.confirmPassword"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
      </div>
      <div class="input-group">
        <label for="email">이메일</label>
        <input
          v-model="user.email"
          id="email"
          type="email"
          placeholder="이메일 입력"
          required
        />
      </div>
      <div class="input-group">
        <label for="name">이름</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          placeholder="이름 입력"
          required
        />
      </div>
      <div class="input-group">
        <label for="nickname">닉네임</label>
        <input
          v-model="user.nickname"
          id="nickname"
          type="text"
          placeholder="닉네임 입력"
          required
        />
      </div>
      <div class="input-group">
        <button type="submit" class="submit-btn">회원가입</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 사용자 입력값을 담을 객체
const user = ref({
  userId: '',
  password: '',
  confirmPassword: '',
  email: '',
  name: '',
  nickname: '',
});

// 회원가입 제출 처리 함수
const handleSubmit = () => {
  if (user.value.password !== user.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  signUp();
};

const signUp = async () => {
  try {
    // 서버에 신규 사용자 추가 요청
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.value.userId,
        password: user.value.password,
        email: user.value.email,
        name: user.value.name,
        nickname: user.value.nickname,
      }),
    });

    if (res.ok) {
      router.push('/login');
    }
  } catch (error) {
    console.error('네트워크 오류:', error);
  }
};
</script>

<style scoped>
.signup-container {
  position: relative;
  max-width: 750px;
  margin: 0 auto 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  padding-bottom: 100px;
}

.form-box {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 48px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}

.logo {
  height: 200px;
  margin-bottom: 50px;
}

.input-group {
  width: 100%;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 2rem;
  font-weight: normal;
  font-size: 20px;
}

input {
  padding: 15px 0;
  font-size: 21px;
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  outline: none;
  width: 100%;
  transition: border-color 0.3s;
}

input:focus {
  border-bottom: 2px solid #fae55f;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background-color: #f9dc14;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #fcd400;
}

.sub-links {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #999;
}

.sub-links .link {
  text-decoration: none;
  color: #707070;
}

.sub-links .divider {
  color: #ccc;
}
</style>

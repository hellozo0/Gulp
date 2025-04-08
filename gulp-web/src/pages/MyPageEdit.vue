<template>
  <div class="edit-container">
    <h2>마이페이지</h2>
    <form class="form-box" @submit.prevent="updateUser">
      <label>아이디</label>
      <p class="data">{{ user.id }}</p>

      <label>이메일</label>
      <input
        v-model="user.email"
        class="data edit-data"
        placeholder="이메일을 입력하세요"
      />

      <label>이름</label>
      <p class="data">{{ user.name }}</p>

      <label>닉네임</label>
      <input
        v-model="user.nickName"
        class="data edit-data"
        placeholder="닉네임을 입력하세요"
      />

      <div class="btn-group">
        <button type="submit" class="edit">수정하기</button>
        <button type="button" class="cancel" @click="goBack">취소하기</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const userId = route.params.id;
const userStore = useUserStore();

const user = ref({
  id: '',
  email: '',
  name: '',
  nickName: '',
});

const saveNickname = () => {
  userStore.nickname = user.value.nickName; // Pinia 상태 업데이트
  localStorage.setItem(
    'user',
    JSON.stringify({
      id: userStore.id,
      userId: userStore.userId,
      nickname: userStore.nickname, // nickname을 Pinia 상태에서 가져옴
      email: userStore.email,
    })
  ); // localStorage에 업데이트된 값 저장
  router.push('/mypage/' + userStore.userId); // 마이페이지로 돌아가기
};
onMounted(async () => {
  const res = await fetch(`http://localhost:3000/users?userId=${userId}`);
  const data = await res.json();
  user.value = data[0];
});

const updateUser = async () => {
  const res = await fetch(`http://localhost:3000/users/${user.value.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: user.value.email,
      nickName: user.value.nickName,
    }),
  });
  if (res.ok) {
    // router.push('/mypage');
    saveNickname();
  }
};

const goBack = () => {
  router.push('/mypage/' + userId);
};
</script>

<style scoped>
.edit-container {
  max-width: 750px;
  margin: 0 auto 50px auto;
  padding-bottom: 100px;
}

.form-box {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 40px;
  text-align: left;
}

h2 {
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
}

label {
  display: block;
  margin-top: 2rem;
  font-weight: normal;
  font-size: 20px;
}

.data {
  padding: 15px 0;
  font-size: 21px;
}

.edit-data {
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  outline: none;
  width: 100%;
  transition: border-color 0.3s;
}

.edit-data:focus {
  border-bottom: 2px solid #fae55f;
}

.edit-data::placeholder {
  color: #fae55f;
}

.btn-group {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.edit {
  flex: 1;
  background-color: #fae55f;
  border: none;
  padding: 18px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.cancel {
  flex: 1;
  background-color: #444;
  color: white;
  border: none;
  padding: 18px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
}
</style>

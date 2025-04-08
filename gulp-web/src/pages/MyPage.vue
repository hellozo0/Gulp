<template>
  <div class="mypage-wrapper">
    <div class="mypage-container">
      <img src="@/assets/images/mypage_default_img.jpg" alt="캐릭터" />
      <div class="content">
        <h2>
          <span class="nickname">{{ user.nickName }}</span
          >님 반가워요!
        </h2>
        <router-link :to="`/mypage/edit/${user.userId}`"
          ><button class="edit-btn">프로필 수정하기</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import MyPageEdit from '@/pages/MyPageEdit.vue';
import { ref, onMounted } from 'vue';

const route = useRoute();
const user = ref({});

// 일단 users1로 고정해서 조회
onMounted(async () => {
  const res = await fetch('http://localhost:3000/users?userId=1');
  const data = await res.json();
  user.value = data[0];
});
</script>

<style scoped>
.mypage-wrapper {
  display: flex;
  justify-content: center;
  padding: 60px 0;
  padding-bottom: 200px;
}

.mypage-container {
  display: flex;
  align-items: center;
  gap: 40px;
  max-width: 800px;
}

.character {
  width: 160px;
  height: auto;
}

.nickname {
  font-weight: bold;
  font-size: 35px;
  color: #222;
}

.edit-btn {
  background-color: #fae55f;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  padding: 16px 200px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover {
  background-color: #fcd400;
}
</style>

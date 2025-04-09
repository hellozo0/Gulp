<template>
  <div class="quick-button" @click="handleClick">
    <img src="@/assets/images/quick_icn.png" alt="QuickCreate" />
    <!-- 클릭 시 QuickCreate 팝업 보이도록 -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'; // computed 임포트

// 팝업 상태를 관리하는 변수
const showQuickCreate = ref(false);
const emit = defineEmits(['togglePopup']); // 이벤트 생성

const handleClick = () => {
  showQuickCreate.value = !showQuickCreate.value; // 버튼 클릭 시 팝업 상태 토글
  emit('togglePopup'); // 버튼 클릭 시 이벤트를 부모에게 전달
};
</script>

<style scoped>
.quick-btn {
  border-radius: 50%;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.quick-button img {
  width: 60px;
  height: 60px;
}

.quick-button:hover {
  transform: scale(0.9); /* 클릭 시 크기 10% 줄어드는 효과 */
}

.quick-button:active {
  transform: scale(0.8); /* 클릭 시 좀 더 줄어들게 설정 */
}
</style>

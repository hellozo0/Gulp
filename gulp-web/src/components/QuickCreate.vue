<!-- <template>
  <div v-if="showQuickCreate" class="quick-create-popup">
    <div class="overlay" @click="closePopup"></div>
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">X</button>

      <h2>소비 이력 작성</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="amount">금액</label>
          <input
            type="number"
            v-model="form.amount"
            placeholder="금액을 입력하세요"
            required
          />
        </div>
        <div class="input-group">
          <label for="category">카테고리</label>
          <input
            type="text"
            v-model="form.category"
            placeholder="카테고리를 입력하세요"
            required
          />
        </div>
        <div class="input-group">
          <label for="description">메모</label>
          <textarea
            v-model="form.description"
            placeholder="메모를 입력하세요"
            rows="4"
          ></textarea>
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const form = ref({
  amount: '',
  category: '',
  description: '',
});

const submitForm = () => {
  console.log('작성된 내용:', form.value);
  // 여기에 데이터를 저장하거나 API 호출하는 로직을 추가
  closePopup();
};

const { showQuickCreate } = defineProps(); // 부모로부터 팝업 상태를 받음
const emit = defineEmits(); // 부모에게 이벤트를 전달하기 위해

const closePopup = () => {
  emit('togglePopup'); // 부모에게 팝업 상태를 false로 변경 요청
};
</script>

<style scoped>
.quick-create-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style> -->

<template>
  <div v-if="showQuickCreate" class="quick-create-popup">
    <!-- 어두운 배경 overlay -->
    <div class="overlay" @click="closePopup"></div>

    <!-- 팝업 내용 -->
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">X</button>

      <h2>소비 이력 작성</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="amount">금액</label>
          <input
            type="number"
            v-model="form.amount"
            placeholder="금액을 입력하세요"
            required
          />
        </div>
        <div class="input-group">
          <label for="category">카테고리</label>
          <input
            type="text"
            v-model="form.category"
            placeholder="카테고리를 입력하세요"
            required
          />
        </div>
        <div class="input-group">
          <label for="description">메모</label>
          <textarea
            v-model="form.description"
            placeholder="메모를 입력하세요"
            rows="4"
          ></textarea>
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  showQuickCreate: Boolean, // 부모로부터 showQuickCreate를 prop으로 받음
});

const emit = defineEmits(['togglePopup']); // 이벤트 발생

const form = ref({
  amount: '',
  category: '',
  description: '',
});

const submitForm = () => {
  console.log('작성된 내용:', form.value);
  closePopup();
};

const closePopup = () => {
  emit('togglePopup'); // 팝업 상태를 부모로부터 전달받고 토글
};
</script>

<style scoped>
.quick-create-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* 어두운 배경 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* 배경 어둡게 처리 */
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 400px;
  z-index: 1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.input-group {
  margin-bottom: 15px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #f9dc14;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #fcd400;
}
</style>

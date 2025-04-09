<template>
  <div v-if="showQuickCreate" class="quick-create-popup">
    <div class="overlay" @click="closePopup"></div>
    <div class="popup-content">
      <!-- X 버튼 -->
      <button class="close-btn" @click="closePopup">X</button>

      <!-- 폼 -->
      <h2>소비 이력 작성</h2>
      <form @submit.prevent="submitForm">
        <!-- 금액 -->
        <div class="input-group">
          <label for="amount">금액</label>
          <input
            type="number"
            v-model="form.amount"
            placeholder="금액을 입력하세요"
            required
          />
        </div>
        <!-- 분류 선택 -->
        <div class="input-group">
          <label for="type">분류</label>
          <div class="type-options">
            <div
              :class="['type-option', { selected: form.type === 'income' }]"
              @click="form.type = 'income'"
            >
              수입
            </div>
            <div
              :class="['type-option', { selected: form.type === 'expense' }]"
              @click="form.type = 'expense'"
            >
              지출
            </div>
          </div>
        </div>

        <!-- 날짜 -->
        <div class="input-group">
          <label for="date">날짜</label>
          <input type="date" v-model="form.date" required />
        </div>
        <!-- 카테고리 선택 -->
        <div class="input-group">
          <label for="category">카테고리</label>
          <div class="category-options">
            <div
              v-for="category in categories"
              :key="category"
              :class="[
                'category-option',
                { selected: form.category === category },
              ]"
              @click="form.category = category"
            >
              {{ category }}
            </div>
          </div>
        </div>

        <!-- 소비 감정 선택 -->
        <div class="input-group">
          <label for="emotion">소비감정</label>
          <div class="emotion-options">
            <div
              v-for="emotion in emotions"
              :key="emotion"
              :class="[
                'emotion-option',
                { selected: form.emotion === emotion },
              ]"
              @click="form.emotion = emotion"
            >
              {{ emotion }}
            </div>
          </div>
        </div>

        <!-- 메모 -->
        <div class="input-group">
          <label for="description">메모</label>
          <textarea
            v-model="form.memo"
            placeholder="메모를 입력하세요"
            rows="4"
          ></textarea>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-btn">작성하기</button>
          <button type="button" class="cancel-btn" @click="closePopup">
            취소하기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  showQuickCreate: Boolean, // 부모로부터 showQuickCreate를 prop으로 받음
});

const emit = defineEmits(['togglePopup']); // 이벤트 발생

const form = ref({
  amount: '',
  category: '',
  emotion: '',
  date: '',
  memo: '',
});

const categories = ref([]); // 카테고리 목록
const emotions = ref([]); // 감정 목록

// 금액 입력에 쉼표 자동 삽입
const formatNumber = () => {
  let value = form.value.amount.replace(/,/g, ''); // 쉼표를 제거
  if (isNaN(value)) {
    form.value.amount = '';
    return;
  }
  form.value.amount = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 3자리마다 쉼표 추가
};

// db.json에서 카테고리와 감정 데이터를 가져옴
onMounted(async () => {
  try {
    // 수입 카테고리 조회
    const incomeCategoryRes = await axios.get(
      'http://localhost:3000/incomeCategory'
    );
    categories.value = incomeCategoryRes.data; // 받아온 데이터를 categories에 저장

    // 지출 카테고리 조회
    const expenseCategoryRes = await axios.get(
      'http://localhost:3000/expenseCategory'
    );
    categories.value = categories.value.concat(expenseCategoryRes.data); // 지출 카테고리 데이터를 기존 카테고리 배열에 합침

    // 감정 데이터 조회
    const emotionRes = await axios.get('http://localhost:3000/emotion');
    emotions.value = emotionRes.data; // 받아온 데이터를 emotions에 저장
  } catch (error) {
    console.error('데이터 조회 실패:', error);
  }
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
  /* align-items: center;
   */
  align-items: flex-start;

  z-index: 9999;
  overflow-y: hidden; /* 배경이 스크롤되도록 설정 */
}

.popup-content {
  top: 30%;
  position: absolute;
  max-width: 900px;
  min-height: 400px;
  background: #fff;
  padding: 30px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  max-height: 80%; /* 최대 높이 설정, 내용이 많으면 스크롤 됨 */
  overflow-y: auto; /* 팝업 안에서 스크롤 */
  /* padding-right: 10px; */
  /* cursor: move; */
}

.quick-create-popup .close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  background: white;
  color: rgb(31, 31, 31);
  font-size: 20px;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.quick-create-popup .close-btn:hover {
  transform: scale(0.9);
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

.category-options,
.emotion-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.submit_btn {
  width: 100%;
  padding: 12px;
  background-color: #f9dc14;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.submit_btn:hover {
  background-color: #fcd400;
}

/* 애니메이션 효과: 팝업 등장 시 부드럽게 나타나도록 설정 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <teleport to="#modal">
    <div v-if="showQuickCreate" class="quick-create-popup">
      <div class="overlay" @click="closePopup"></div>
      <div class="popup-content">
        <!-- X 버튼 -->
        <button class="close-btn" @click="closePopup">X</button>

        <!-- 폼 -->
        <form @submit.prevent="submitForm">
          <!-- 금액 -->
          <div class="input-group">
            <div class="amount-container">
              <input
                type="text"
                id="amount"
                v-model="formattedAmount"
                @input="formatNumber"
                class="input-amount"
                required
                ref="amountInput"
              />
              <span class="currency" :style="currencyPositionStyle">원</span>
            </div>
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
            <div class="date-container">
              <input type="date" v-model="form.date" required />
            </div>
          </div>

          <!-- 카테고리 선택 -->
          <div class="input-group">
            <label for="category">카테고리</label>
            <div class="category-options">
              <div
                v-for="category in categories"
                :key="category.id"
                :class="[
                  'category-option option-item',
                  { selected: form.category === category.name },
                ]"
                @click="form.category = category.name"
              >
                {{ category.name }}
              </div>
            </div>
          </div>

          <!-- 소비 감정 선택 -->
          <div class="input-group">
            <label for="emotion">소비감정</label>
            <div class="emotion-options">
              <div
                v-for="emotion in emotions"
                :key="emotion.id"
                :class="[
                  'emotion-option option-item',
                  { selected: form.emotion === emotion.name },
                ]"
                @click="form.emotion = emotion.name"
              >
                {{ emotion.name }}
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
  </teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  showQuickCreate: Boolean,
});

const emit = defineEmits(['togglePopup']);
const today = new Date().toISOString().split('T')[0];

const form = ref({
  amount: '',
  category: '',
  emotion: '',
  date: today,
  memo: '',
  type: 'income',
});

const categories = ref([]);
const emotions = ref([]);
const formattedAmount = ref('');
const currencyPositionStyle = ref({ left: '18px' });
const MAX_VALUE = 9999999999999999;

const getTextWidth = (text) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '30px Arial';
  return context.measureText(text).width;
};

const formatNumber = () => {
  let value = formattedAmount.value.replace(/,/g, '');

  if (isNaN(value) || value === '') {
    formattedAmount.value = '';
    return;
  }

  if (parseInt(value) > MAX_VALUE) {
    value = MAX_VALUE.toString();
  }

  formattedAmount.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  formattedAmount.value = `${formattedAmount.value}`;
  updateCurrencyPosition();
};

const updateCurrencyPosition = () => {
  const inputText = formattedAmount.value;
  const inputWidth = getTextWidth(inputText); // 텍스트 길이에 맞게 너비 계산
  const newLeftPosition = `${inputWidth + 15}px`; // 원은 숫자 뒤에 고정, 15px 여백
  currencyPositionStyle.value = { left: newLeftPosition }; // "원"의 위치를 업데이트
};

watch(formattedAmount, updateCurrencyPosition);

onMounted(async () => {
  try {
    // 수입 카테고리 조회
    const incomeCategoryRes = await axios.get(
      'http://localhost:3000/incomeCategory'
    );
    categories.value = incomeCategoryRes.data;
    // 지출 카테고리 조회
    const expenseCategoryRes = await axios.get(
      'http://localhost:3000/expenseCategory'
    );
    categories.value = categories.value.concat(expenseCategoryRes.data);

    // 감정 데이터 조회
    const emotionRes = await axios.get('http://localhost:3000/emotion');
    emotions.value = emotionRes.data;

    // 카테고리와 감정에 첫 번째 항목을 기본값으로 설정
    form.value.type = 'income';
    form.value.category = categories.value[0]?.name || '';
    form.value.emotion = emotions.value[0]?.name || '';
  } catch (error) {
    console.error('데이터 조회 실패:', error);
  }
});

watch(
  () => props.showQuickCreate,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);

const submitForm = async () => {
  const user = JSON.parse(localStorage.getItem('user')); // 로컬 스토리지에서 userId 가져오기
  const user_Id = user?.id; // userId가 존재하는 경우 가져오기

  const payload = {
    userId: user_Id, // 로컬 스토리지에서 가져온 userId
    budgetId: Math.random().toString(36).substring(7), // 랜덤한 budgetId 생성
    date: form.value.date,
    type: form.value.type,
    money: formattedAmount.value.replace(/,/g, ''), // 쉼표 제거한 금액
    category: form.value.category,
    memo: form.value.memo,
    emotion: form.value.emotion,
    id: Math.random().toString(36).substring(7), // 랜덤한 id 생성
  };

  try {
    const res = await fetch('http://localhost:3000/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      console.log('예산이 성공적으로 저장되었습니다.' + `${payload}`);
      closePopup(); // 팝업 닫기
    } else {
      console.error('예산 저장 실패:', await res.text());
    }
  } catch (error) {
    console.error('네트워크 오류:', error);
  }
};

const closePopup = () => {
  // showQuickCreate.value = false;
  form.value = {
    amount: '',
    category: '',
    emotion: '',
    date: today, // 오늘 날짜로 초기화
    memo: '',
  };
  emit('togglePopup');
};
</script>

<style scoped>
.quick-create-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  overflow: hidden;
}

.popup-content {
  top: 30%;
  max-width: 900px;
  background: #fff;
  padding: 120px 130px 80px 130px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  max-height: 80%;
  overflow-y: auto; /* 팝업 안에서 스크롤 */
}

.quick-create-popup .close-btn {
  position: absolute;
  top: 15%;
  right: 28%;
  background: none;
  border: none;
  font-size: 35px;
  cursor: pointer;
}

.input-group {
  position: relative;
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}

.input-group label {
  font-size: 26px;
  color: #979797;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
}

.amount-container {
  /* display: flex; */
  display: inline-block;
  align-items: center;
  width: 100%;
  position: relative;
}

.amount-container .input-amount {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 30px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  padding-right: 35px;
}

.input-amount:focus {
  border-color: #f9dc14;
}

.currency {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  font-weight: bold;
  color: #333;
  right: 10px;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px !important;
  font-size: 18px;
  font-family: Arial, sans-serif;
  color: #333;
  resize: none;
}

textarea:focus {
  outline: none;
  border-radius: 10px;
  border-color: #f9dc14;
  box-shadow: 0 0 5px rgba(249, 220, 20, 0.5);
}

.type-options {
  display: flex;
  gap: 10px;
  font-weight: bold;
  text-align: center;
  color: #979797;
  justify-content: flex-end;
}

.type-option {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 6px 26px;
  transition: transform 0.2s ease, border-color 0.3s ease;
  font-size: 20px;
}

.type-option.selected {
  border: 1px solid #f9dc14;
  color: #f9dc14;
  transform: scale(1.01);
}

.type-option:hover {
  border-color: #f9dc14;
  transform: scale(1.05);
}

.category-options,
.emotion-options {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  padding: 10px 5px;
  cursor: pointer;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;
  color: #979797;
}

.option-item {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 6px 26px;
  transition: transform 0.2s ease, border-color 0.3s ease;
}

.option-item.selected {
  border: 1px solid #f9dc14;
  color: #f9dc14;
  transform: scale(1.01);
}

.option-item:hover {
  border-color: #f9dc14;
  transform: scale(1.05);
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
}

.submit-btn,
.cancel-btn {
  width: 100%;
  padding: 12px;
  background-color: #f9dc14;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 10px;
}

.submit-btn:hover,
.cancel-btn:hover {
  transform: scale(1.02);
}

.cancel-btn {
  background-color: #484848;
  color: white;
}

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

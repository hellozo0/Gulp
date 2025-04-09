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
            <input type="date" v-model="form.date" required />
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
const formattedAmount = ref('');
const currencyPositionStyle = ref({ left: '18px' }); // "원"의 위치를 동적으로 설정할 변수
const MAX_VALUE = 9999999999999999;

// 텍스트 너비를 계산하는 함수 (폰트 스타일에 따라 변경 가능)
const getTextWidth = (text) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '20px Arial'; // 동일한 폰트 크기를 사용해야 정확함
  return context.measureText(text).width;
};

// 금액을 입력할 때마다 쉼표를 추가하고 "원"을 유지
const formatNumber = () => {
  let value = formattedAmount.value.replace(/,/g, ''); // 쉼표를 제거

  // 숫자가 아닌 값은 입력받지 않도록 처리 (문자 입력 방지)
  if (isNaN(value) || value === '') {
    formattedAmount.value = '';
    return;
  }

  // 숫자가 MAX_VALUE를 넘으면 MAX_VALUE로 설정
  if (parseInt(value) > MAX_VALUE) {
    value = MAX_VALUE.toString();
  }

  // 3자리마다 쉼표 추가
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

    // 카테고리와 감정에 첫 번째 항목을 기본값으로 설정
    form.value.category = categories.value[0]?.name || ''; // 첫 번째 카테고리 선택
    form.value.emotion = emotions.value[0]?.name || ''; // 첫 번째 감정 선택
  } catch (error) {
    console.error('데이터 조회 실패:', error);
  }
});

// showQuickCreate의 상태가 변할 때마다 body overflow를 변경
watch(
  () => props.showQuickCreate,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'; // 팝업이 열리면 스크롤 잠금
    } else {
      document.body.style.overflow = ''; // 팝업이 닫히면 원래 상태로 되돌림
    }
  }
);

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
  width: 100vw;
  height: 100vh;
  /* position: absolute; */
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
  overflow: hidden; /*배경이 스크롤되도록 설정 */
}

.popup-content {
  top: 30%;
  /* position: absolute; */
  max-width: 900px;
  /* min-height: 400px; */
  background: #fff;
  padding: 150px 130px;
  /* width: 100%; */
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  max-height: 80%; /* 최대 높이 설정, 내용이 많으면 스크롤 됨 */
  overflow-y: auto; /* 팝업 안에서 스크롤 */
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
  position: relative;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 22px;
  color: #979797;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  /* border-radius: 5px; */
}

/* 여기서부터 금액 입력 */
/* .amount-container {
  display: flex;
  align-items: center;
}

.amount-container input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

.currency {
  font-size: 16px;
  margin-left: 10px;
  font-weight: bold;
} */
.amount-container {
  /* display: flex; */
  display: inline-block;
  align-items: center;
  width: 100%;
  position: relative;
}

.amount-container .input-amount {
  /* width: calc(100% - 40px);
  padding: 5px;
  font-size: 21px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s; */
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 18px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  padding-right: 35px;
}

.input-amount:focus {
  border-color: #f9dc14;
}

.currency {
  /* font-size: 21px;
  margin-left: 10px;
  font-weight: bold; */

  /* position: absolute;
  right: 10px; 
  font-size: 18px;
  font-weight: bold;
  color: #333; */

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  font-weight: bold;
  color: #333;
  right: 10px;
}

/* 여기까지 금액 입력 */

textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px !important;
  font-size: 18px;
  font-family: Arial, sans-serif;
  color: #333;
  resize: none; /* 크기 조절 안 되게 */
}

textarea:focus {
  outline: none;
  border-radius: 10px;
  border-color: #f9dc14; /* 포커스 시 테두리 색상 */
  box-shadow: 0 0 5px rgba(249, 220, 20, 0.5); /* 포커스 시 그림자 */
}

.type-options {
  display: flex;
  gap: 10px;
  font-weight: bold;
  text-align: center;
  color: #979797;
}

.type-option {
  border-radius: 10px; /* 수정: 옵션 버튼의 모서리를 둥글게 */
  border: 1px solid #ccc;
  padding: 6px 26px;
  transition: transform 0.2s ease, border-color 0.3s ease;
}

.type-option.selected {
  border: 1px solid #f9dc14; /* 선택된 항목의 테두리 색상 */
  color: #f9dc14;
  transform: scale(1.01); /* 선택된 항목의 크기 증가 */
}

.type-option:hover {
  border-color: #f9dc14; /* hover 시 테두리 색상 변경 */
  transform: scale(1.05); /* hover 시 크기 살짝 증가 */
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
  border-radius: 10px; /* 수정: 옵션 버튼의 모서리를 둥글게 */
  border: 1px solid #ccc;
  padding: 6px 26px;
  transition: transform 0.2s ease, border-color 0.3s ease;
}

.option-item.selected {
  border: 1px solid #f9dc14; /* 선택된 항목의 테두리 색상 */
  color: #f9dc14;
  transform: scale(1.01); /* 선택된 항목의 크기 증가 */
}

.option-item:hover {
  border-color: #f9dc14; /* hover 시 테두리 색상 변경 */
  transform: scale(1.05); /* hover 시 크기 살짝 증가 */
}

.button-group {
  display: flex;
  justify-content: space-between; /* 버튼을 옆으로 배치 */
  gap: 10px; /* 버튼 간 간격 */
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
  transition: background-color 0.3s ease, transform 0.2s ease; /* 부드러운 색상 변화 */
  margin-top: 10px; /* 버튼 간 간격 */
}

.submit-btn:hover,
.cancel-btn:hover {
  transform: scale(1.02); /* 버튼 크기 증가 */
}

.cancel-btn {
  background-color: #484848; /* 취소 버튼 색상 */
  color: white; /* 텍스트 색상 */
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

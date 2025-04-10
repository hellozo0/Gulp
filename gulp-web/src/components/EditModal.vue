<template>
  <div class="edit-modal-overlay" @click.self="close">
    <div class="edit-modal">
      <div class="modal-scroll">
        <h2>내역 수정</h2>

        <!-- 금액 -->
        <div class="form-field">
          <label>금액</label>
          <div class="amount-container">
            <input
              type="text"
              class="input-amount"
              :value="formattedMoney"
              @input="onInput"
              @keydown="allowOnlyNumber"
            />

            <span class="currency">원</span>
          </div>
        </div>

        <!-- 분류 -->
        <div class="form-field">
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

        <div class="form-field">
          <label>카테고리</label>
          <div class="category-buttons">
            <div
              v-for="item in categoryOptions"
              :key="item"
              :class="['type-option', { selected: form.category === item }]"
              @click="form.category = item"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="form-field">
          <label>날짜</label>
          <input v-model="form.date" type="date" />
        </div>

        <!-- 감정 -->
        <div class="form-field">
          <label>감정</label>
          <div class="emotion-buttons">
            <div
              v-for="emo in emotions"
              :key="emo"
              :class="['type-option', { selected: form.emotion === emo }]"
              @click="form.emotion = emo"
            >
              {{ emo }}
            </div>
          </div>
        </div>

        <!-- 메모 -->
        <div class="form-field">
          <label>메모</label>
          <textarea v-model="form.memo" rows="4" />
        </div>

        <div class="modal-actions">
          <button class="submit" @click="saveEdit">저장</button>
          <button class="cancel" @click="close">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useBudgetStore } from '@/stores/budgetStore';

const props = defineProps({ data: Object });
const emit = defineEmits(['close', 'update']);
const budgetStore = useBudgetStore();

const form = reactive({ ...props.data });

// 숫자만 입력 가능
const allowOnlyNumber = (e) => {
  const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
    e.preventDefault();
  }
};

// 입력 처리 및 숫자만 유지
const onInput = (e) => {
  const onlyNumber = e.target.value.replace(/[^\d]/g, '');
  form.money = onlyNumber;
};

// 표시용 쉼표 적용된 금액
const formattedMoney = computed(() => {
  if (!form.money) return '';
  return Number(form.money).toLocaleString();
});

// 저장 시 쉼표 제거
const saveEdit = async () => {
  try {
    const numeric = Number(form.money);
    await budgetStore.updateBudget(form.id, {
      ...form,
      money: numeric,
    });
    emit('update', { ...form, money: numeric });
    close();
  } catch (err) {
    console.error('❌ 수정 실패:', err);
    alert('수정 중 문제가 발생했습니다.');
  }
};

const close = () => emit('close');

const incomeCategories = ['급여', '용돈', '그외'];
const expenseCategories = [
  '대출',
  '식비',
  '유흥',
  '쇼핑',
  '취미',
  '의료',
  '주거',
  '보험',
  '미용',
  '교통',
  '생활',
  '교육',
  '이체',
  '저축',
];
const categoryOptions = computed(() =>
  form.type === 'income' ? incomeCategories : expenseCategories
);
const emotions = ['행복', '설렘', '스트레스', '의무감', '후회', '모름(기타)'];
</script>

<style scoped>
.amount-container {
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
  border-color: #ffd662;
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

.edit-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.edit-modal {
  background: #fff;
  border-radius: 12px;
  width: 100vw;
  height: 100vh;
  max-width: 550px;
  max-height: 90vh;
  overflow: hidden; /* 스크롤을 감추고 */
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

.modal-scroll {
  padding: 30px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  scrollbar-gutter: stable; /* 스크롤 여백 안정적 유지 */
  border-radius: inherit; /* 둥근 테두리 그대로 */
}

h2 {
  font-size: 20px;
  margin-bottom: 24px;
  font-weight: bold;
}

/* 각 입력 필드 레이아웃 통일 */
.form-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-field label {
  width: 100px;
  min-width: 80px;
  font-weight: bold;
  margin-right: 12px;
  color: #444;
}

.form-field input,
.form-field textarea {
  flex: 1;
  min-width: 200px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-field textarea {
  min-height: 100px;
  resize: vertical;
}

/* 금액 입력 전용 스타일 */
.amount-container {
  width: 100%;
  position: relative;
}

.input-amount {
  width: 100%;
  padding: 10px;
  font-size: 24px;
  border: none;
  border-bottom: 2px solid #ccc;
  padding-right: 35px;
}

.input-amount:focus {
  border-color: #ffd662;
}

.currency {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  font-weight: bold;
  color: #333;
  right: 10px;
}

/* 버튼형 입력들 (분류, 카테고리, 감정) */
.type-options,
.category-buttons,
.emotion-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  flex: 1;
}

.type-option {
  padding: 6px 20px;
  border-radius: 20px;
  border: 2px solid #ccc;
  background-color: #fff;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-option.selected {
  background-color: white;
  color: #ffd662;
  border-color: #ffd662;
  transform: scale(1.01);
}

.type-option:hover {
  background-color: white;
  color: #ffd662;
  border-color: #ffd662;
  transform: scale(1.05);
}

/* 하단 저장/취소 버튼 */
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  padding: 10px 0;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  font-size: 15px;
  cursor: pointer;
}

button.submit {
  background: #ffd662;
  color: #333;
}

button.cancel {
  background: #333;
  color: white;
}
</style>

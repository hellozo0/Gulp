<template>
  <div class="edit-modal-overlay" @click.self="close">
    <div class="edit-modal">
      <h2>내역 수정</h2>

      <!-- 금액 -->
      <div class="form-field">
        <label>금액</label>
        <input v-model="form.money" type="number" />
      </div>

      <!-- 분류 -->
      <div class="form-field">
        <label>분류</label>
        <div class="button-group">
          <button
            :class="{ active: form.type === 'income' }"
            @click="form.type = 'income'"
          >
            수입
          </button>
          <button
            :class="{ active: form.type === 'expense' }"
            @click="form.type = 'expense'"
          >
            지출
          </button>
        </div>
      </div>

      <!-- 카테고리 -->
      <div class="form-field">
        <label>카테고리</label>
        <div class="button-group category-buttons">
          <button
            v-for="item in categoryOptions"
            :key="item"
            :class="{ active: form.category === item }"
            @click="form.category = item"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <!-- 날짜 -->
      <div class="form-field">
        <label>날짜</label>
        <input v-model="form.date" type="date" />
      </div>

      <!-- 감정 -->
      <div class="form-field">
        <label>감정</label>
        <div class="button-group">
          <button
            v-for="emo in emotions"
            :key="emo"
            :class="{ active: form.emotion === emo }"
            @click="form.emotion = emo"
          >
            {{ emo }}
          </button>
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
</template>

<script setup>
import { reactive, computed } from 'vue';
import axios from 'axios';

const props = defineProps({ data: Object });
const emit = defineEmits(['close', 'update']);

const form = reactive({ ...props.data });

const close = () => emit('close');

const saveEdit = async () => {
  try {
    await axios.put(`http://localhost:3000/budget/${form.id}`, form);
    emit('update', { ...form }); // 부모에 수정된 내용 전달
    close();
  } catch (err) {
    console.error('❌ 수정 실패:', err);
    alert('수정 중 문제가 발생했습니다.');
  }
};

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
  padding: 30px;
  border-radius: 12px;
  width: 480px;
  max-width: 90%;
  max-height: 90vh; /* ✅ 높이 제한 */
  overflow-y: auto; /* ✅ 세로 스크롤 허용 */
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
}
.form-field {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 6px;
  color: #444;
}
input,
textarea {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
}
textarea {
  resize: vertical;
}
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.category-buttons {
  max-height: 120px;
  overflow-y: auto;
}

.button-group button {
  padding: 6px 14px;
  border: 1.5px solid #ccc;
  border-radius: 20px;
  background-color: #f8f8f8;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}
.button-group button.active {
  background-color: #ffd662;
  color: white;
  border-color: #ffd662;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button.submit {
  background: #ffd662;
  color: #333;
}
button.cancel {
  background: #333;
  color: white;
}
.modal-actions button {
  flex: 1;
  padding: 8px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}
.modal-actions button:last-child {
  margin-right: 0;
}
</style>

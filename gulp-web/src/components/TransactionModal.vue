<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-top" @click="close">×</button>

      <h2>{{ Number(props.data.money).toLocaleString() }}원</h2>
      <hr />

      <div class="field">
        <label>분류</label>
        <div class="type-buttons">
          <button
            class="readonly-button income"
            :class="{ active: props.data.type === 'income' }"
            disabled
          >
            수입
          </button>
          <button
            class="readonly-button expense"
            :class="{ active: props.data.type === 'expense' }"
            disabled
          >
            지출
          </button>
        </div>
      </div>

      <div class="field">
        <label>날짜</label> <span>{{ props.data.date }}</span>
      </div>
      <div class="field">
        <label>카테고리</label> <span>{{ props.data.category }}</span>
      </div>
      <div class="field">
        <label>소비감정</label> <span>{{ props.data.emotion }}</span>
      </div>
      <div class="field memo-field">
        <label>메모</label>
        <div class="memo-box">{{ props.data.memo }}</div>
      </div>

      <div class="buttons">
        <button @click="openEdit">수정하기</button>
        <button @click="showConfirm = true">삭제하기</button>
      </div>
      <EditModal
        v-if="isEditMode"
        :data="props.data"
        @close="closeEditModal"
        @saved="closeEditModal"
      />
    </div>

    <!-- 삭제 확인 팝업 -->
    <div class="confirm-overlay" v-if="showConfirm">
      <div class="confirm-box">
        <div class="icon-circle">
          <span class="icon-exclamation">!</span>
        </div>
        <p>정말 삭제하시겠습니까?</p>
        <div class="confirm-buttons">
          <button class="confirm-delete" @click="confirmDelete">예</button>
          <button @click="showConfirm = false">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useBudgetStore } from '@/stores/budgetStore.js';
import EditModal from './EditModal.vue';

const props = defineProps({
  data: Object,
});
const emit = defineEmits(['close', 'edit', 'delete']);
const showConfirm = ref(false);
const isEditMode = ref(false);

const budgetStore = useBudgetStore();

const close = () => emit('close');

const confirmDelete = async () => {
  try {
    await budgetStore.deleteBudget(props.data.id);
    emit('delete', props.data.id);
    showConfirm.value = false;
    close();
  } catch (err) {
    console.error('❌ 삭제 실패:', err);
    alert('삭제 중 오류가 발생했습니다.');
  }
};

const openEdit = () => {
  isEditMode.value = true;
};

const closeEditModal = () => {
  isEditMode.value = false;
  close();
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
});
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
.modal-overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 24px;
  width: 500px;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  line-height: 1.6;
  position: relative;
}

h2 {
  margin-top: 16px;
  font-size: 20px;
  font-weight: bold;
}

.field {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field label {
  font-weight: 600;
  white-space: nowrap;
  color: grey;
}

.type-buttons {
  display: flex;
  gap: 8px;
}

.readonly-button {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  border: 2px solid #ccc;
  background-color: #fff;
  color: #666;
  cursor: default;
  font-size: 14px;
}

.readonly-button.income.active {
  background-color: white;
  color: #ffd662;
  border-color: #ffd662;
}

.readonly-button.expense.active {
  background-color: white;
  color: #ffd662;
  border-color: #ffd662;
}

.memo-field {
  flex-direction: column;
  align-items: flex-start;
}

.memo-box {
  margin-top: 6px;
  border: none;
  border-radius: 6px;
  background-color: #f9f9f9;
  padding: 12px;
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  width: 100%;
  min-height: 100px;
  max-height: 200px;
  overflow-y: auto;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  background: white;
  padding-top: 12px;
  gap: 12px;
}

.buttons button {
  flex: 1;
  padding: 8px 0;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #ffd662;
  color: white;
  transition: background-color 0.2s;
}

.buttons button:nth-child(2) {
  background-color: #333;
}

.close-top {
  position: absolute;
  top: 10px;
  right: 14px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
}
.close-top:hover {
  color: #444;
}

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.confirm-box {
  background: #fff;
  padding: 36px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 420px;
  max-width: 90%;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ffecec;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

.icon-exclamation {
  color: #e53935;
  font-size: 48px;
  font-weight: bold;
}

.confirm-box p {
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: bold;
}

.confirm-buttons {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.confirm-buttons button {
  padding: 6px 0;
  min-width: 120px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  background-color: #ccc;
  color: #333;
}

.confirm-buttons .confirm-delete {
  background-color: #333;
  color: white;
}
</style>

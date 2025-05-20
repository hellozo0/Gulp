<template>
  <div class="history-view-wrapper">
    <!-- 📅 캘린더 컴포넌트 -->
    <CalendarView />

    <!-- 📋 필터 및 예산 내역 리스트 -->
    <FilterView @open-item="handleOpenItem" />

    <!-- 💬 상세 모달 -->
    <TransactionModal
      v-if="selectedItem"
      :data="selectedItem"
      @close="selectedItem = null"
      @edit="editItem"
      @delete="handleDelete"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue';
import CalendarView from '@/components/Calendar.vue';
import FilterView from '@/components/Filter.vue';
import TransactionModal from '@/components/TransactionModal.vue';

// 공통 상태: 날짜 선택 등
const selectedDate = ref('');
const currentMonth = ref(new Date());
const calendarKey = ref(0);
const today = ref(formatDate(new Date()));
const isDateSelected = ref(false);

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 날짜 페이지 이동
function onPageUpdate(pages) {
  if (pages && pages.length > 0) {
    currentMonth.value = new Date(pages[0].start);
  }
}

// 날짜 셀 클릭 처리
function onCellClick(date) {
  const formatted = formatDate(date);
  if (selectedDate.value === formatted) {
    selectedDate.value = '';
    isDateSelected.value = false;
  } else {
    selectedDate.value = formatted;
    isDateSelected.value = true;
  }
}

// 오늘로 이동 처리
function goToToday() {
  const todayDate = new Date();
  selectedDate.value = formatDate(todayDate);
  isDateSelected.value = true;
  currentMonth.value = todayDate;
  calendarKey.value++;
}

// 상세 항목 보기
const selectedItem = ref(null);
function handleOpenItem(item) {
  selectedItem.value = item;
}

function editItem(item) {
  console.log('✏️ 수정', item);
}
function handleDelete(id) {
  console.log('🗑️ 삭제', id);
}
function handleUpdate(updated) {
  console.log('✅ 갱신', updated);
}

// provide로 CalendarView와 FilterView에 공유
provide('selectedDate', selectedDate);
provide('currentMonth', currentMonth);
provide('calendarKey', calendarKey);
provide('today', today);
provide('formatDate', formatDate);
provide('onPageUpdate', onPageUpdate);
provide('onCellClick', onCellClick);
provide('isDateSelected', isDateSelected);
provide('goToToday', goToToday);
</script>

<style scoped>
.history-view-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 120px; /* QuickCreate 여백 확보 */
  overflow-x: hidden;
  align-items: center;
}
</style>

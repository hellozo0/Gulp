<template>
  <div class="calendar-wrapper">
    <!-- ✅ 오늘로 이동 버튼 (왼쪽 상단) -->
    <div class="calendar-header">
      <button
        class="today-button"
        @click="goToToday"
        style="margin-left: 250px"
      >
        오늘로 이동
      </button>
    </div>

    <!-- 📅 달력 -->
    <v-calendar
      :key="calendarKey"
      is-expanded
      :locale="'ko-KR'"
      :from-page="currentMonth"
      show-day-popover="false"
      @update:pages="onPageUpdate"
      style="width: 1000px; margin: 0 auto"
    >
      <template #day-content="{ day }">
        <div
          class="calendar-cell"
          :class="{
            selected: formatDate(day.date) === selectedDate,
            today: formatDate(day.date) === today,
          }"
          @click="onCellClick(day.date)"
        >
          <div class="day-number">{{ day.day }}</div>
          <div class="finance-list">
            <div
              v-for="item in getItemsForDate(day.date)"
              :key="item.date + item.amount + item.type"
              :class="[
                item.type === '수입' ? 'income' : 'expense',
                'finance-item',
              ]"
            >
              {{ item.type === '수입' ? '+' : '-' }}₩{{
                item.amount.toLocaleString()
              }}
            </div>
          </div>
        </div>
      </template>
    </v-calendar>

    <!-- ✅ 선택한 날짜 표시 -->
    <div v-if="selectedDate" class="selected-info">
      ✅ 선택한 날짜: {{ selectedDate }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 🔁 상태값
const selectedDate = ref('');
const currentMonth = ref(new Date());
const calendarKey = ref(0);

// 🗓 오늘 날짜 (정확하게 포맷팅)
const today = formatDate(new Date());

// 📌 날짜 포맷 함수 (UTC 문제 방지)
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 📌 오늘로 이동
const goToToday = () => {
  selectedDate.value = today;
  currentMonth.value = new Date();
  calendarKey.value += 1; // 강제 리렌더링
};

// 📌 달력 페이지 이동
const onPageUpdate = (pages) => {
  if (pages && pages.length > 0) {
    currentMonth.value = new Date(pages[0].start);
  }
};

// 📌 셀 클릭 시 선택 날짜 설정
const onCellClick = (date) => {
  selectedDate.value = formatDate(date);
};

// 💰 예시 수입/지출 데이터
const financeData = [
  { date: '2025-04-08', type: '지출', amount: 15000 },
  { date: '2025-04-08', type: '수입', amount: 50000 },
  { date: '2025-04-09', type: '지출', amount: 32000 },
  { date: '2025-04-11', type: '수입', amount: 30000 },
  { date: '2025-04-11', type: '지출', amount: 7800 },
];

// 📌 해당 날짜의 데이터 가져오기
const getItemsForDate = (date) => {
  const key = formatDate(date);
  return financeData.filter((item) => item.date === key);
};
</script>

<style scoped>
.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 12px;
}

.calendar-header {
  width: 100%;
}

.today-button {
  padding: 6px 12px;
  background-color: #4caf50;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.today-button:hover {
  background-color: #43a047;
}

.selected-info {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
}

.calendar-cell {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.calendar-cell:hover {
  background-color: #f0f0f0;
}

.calendar-cell.selected {
  background-color: #ffeaa7;
}

.calendar-cell.today {
  border: 2px solid #4caf50;
}

.day-number {
  position: absolute;
  top: 6px;
  left: 6px;
  font-weight: bold;
}

.finance-list {
  margin-top: 24px;
  width: 100%;
}

.finance-item {
  font-size: 12px;
  margin-bottom: 2px;
  padding-left: 4px;
  white-space: nowrap;
}

.income {
  color: #1e88e5;
}

.expense {
  color: #e53935;
}
</style>

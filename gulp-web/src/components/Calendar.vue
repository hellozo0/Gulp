<template>
  <div class="calendar-wrapper">
    <!-- 📅 달력 -->
    <div class="calendar-inner">
      <img
        src="@/assets/images/2025honey.png"
        alt="2025bear"
        width="300px"
        class="honey-on-calendar"
      />
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
              selected: formatDate(day.date) === selectedDate.value,
              today: formatDate(day.date) === today.value,
            }"
            @click="onCellClick(day.date)"
          >
            <div class="day-number">{{ day.day }}</div>

            <!-- 총 수입/지출 표시 -->
            <div
              class="day-total tooltip-wrapper"
              @mouseover="hoveredDate = formatDate(day.date)"
              @mouseleave="hoveredDate = ''"
            >
              <div v-if="getSumForDate(day.date).income" class="income">
                +₩{{ getSumForDate(day.date).income.toLocaleString() }}
              </div>
              <div v-if="getSumForDate(day.date).expense" class="expense">
                -₩{{ getSumForDate(day.date).expense.toLocaleString() }}
              </div>
            </div>

            <!-- 툴팁바 -->
            <div
              v-if="hoveredDate === formatDate(day.date)"
              class="tooltip-box"
            >
              <div
                v-for="(item, idx) in getItemsForDate(day.date).slice(0, 3)"
                :key="idx"
                class="tooltip-line"
              >
                {{ item.category }} |
                {{ item.type === 'income' ? '+' : '-' }}₩{{
                  Number(item.money).toLocaleString()
                }}
              </div>
              <div
                v-if="getItemsForDate(day.date).length > 3"
                class="tooltip-line"
                style="text-align: center; font-weight: bold"
              >
                ...
              </div>
              <img
                src="@/assets/images/HappyHoney.png"
                alt="HappyHoney"
                class="tooltip-honey"
              />
            </div>
          </div>
        </template>
      </v-calendar>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useBudgetStore } from '@/stores/budgetStore';

// provide로 공유된 상태 불러오기
const selectedDate = inject('selectedDate');
const currentMonth = inject('currentMonth');
const calendarKey = inject('calendarKey');
const today = inject('today');
const formatDate = inject('formatDate');
const onPageUpdate = inject('onPageUpdate');
const onCellClick = inject('onCellClick');

const hoveredDate = ref('');
const budgetStore = useBudgetStore();

// 날짜에 해당하는 항목 가져오기
function getItemsForDate(date) {
  const target = formatDate(date);
  return budgetStore.groupedBudget[target] || [];
}

// 날짜에 해당하는 수입/지출 합계 계산
function getSumForDate(date) {
  const target = formatDate(date);
  const result = { income: 0, expense: 0 };
  const items = budgetStore.groupedBudget[target] || [];
  for (const item of items) {
    if (item.type === 'income') result.income += Number(item.money);
    else if (item.type === 'expense') result.expense += Number(item.money);
  }
  return result;
}
</script>

<style scoped>
.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 12px;
  justify-content: center;
  width: 100%;
}

.calendar-inner {
  position: relative;
  width: 1000px;
  margin: 0 auto;
}

.honey-on-calendar {
  position: absolute;
  top: -88px;
  right: -70px;
  width: 160px;
  max-width: 18%;
  height: auto;
  z-index: 10;
  pointer-events: none;
}

.calendar-header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
}

.calendar-cell {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  /* border: 1px solid #ddd;
  border-radius: 6px; */
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;
  z-index: 1;
  background-color: #fffbe6;
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

.day-total {
  margin-top: 28px;
  font-size: 12px;
  width: 100%;
  line-height: 1.3;
}

.day-total .income {
  color: #1e88e5;
  font-weight: bold;
}

.day-total .expense {
  color: #e53935;
  font-weight: bold;
}

.tooltip-wrapper {
  position: relative;
  overflow: visible;
}

.tooltip-box {
  position: absolute;
  top: -6px; /* 위로 살짝 */
  left: 100%; /* 오른쪽 끝 기준 */
  transform: translate(-100%, -50%); /* 왼쪽 위로 겹치게 */
  background: #fffcc0;
  border: 1px solid #e5d200;
  border-radius: 6px;
  padding: 6px 10px 30px 10px;
  font-size: 12px;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  z-index: 99999;
}
.tooltip-line {
  margin-bottom: 4px;
}

.tooltip-honey {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  opacity: 0.8;
  z-index: 99999999999 !important;
}

::v-deep(.vc-pane-container),
::v-deep(.vc-day-content) {
  overflow: visible !important;
  position: relative !important;
  z-index: 10;
}

::v-deep(.vc-pane) {
  background-color: #fffbe6;
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08); /* 그림자 좀 더 진하게 */
  border: none !important; /* 혹시 남아있을 border 확실히 제거 */
}

.fixed_bear {
  margin-left: 75%;
  margin-top: 50px;
}
::v-deep(.vc-header .vc-title) {
  color: var(--vc-header-title-color);
  font-weight: var(--vc-font-semibold);
  white-space: nowrap;
  padding: 0 8px;
  margin: 0;
  line-height: 30px;
  background-color: #fffbe6;
}
.vc-pane-container {
  background-color: blue !important;
}
::v-deep(.vc-base-icon) {
  display: inline-block;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  background-color: #fffbe6;
  border-color: #ffc800;
}
</style>

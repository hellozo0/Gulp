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
              selected: formatDate(day.date) === selectedDate,
              today: formatDate(day.date) === today,
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
              <!-- 3개 초과 시 생략 표시 -->
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

  <!-- 여기서부터 필터 파트 -->

  <main id="filterPart">
    <div class="dropdown-container">
      <div
        v-if="selectedDate"
        class="selected-info"
        style="margin-bottom: 10px"
      >
        <label style="cursor: pointer">
          <input
            type="checkbox"
            v-model="isDateSelected"
            @change="toggleSelectedDate"
          />
          <span style="margin-left: 8px">선택한 날짜: {{ selectedDate }}</span>
        </label>
      </div>
      <div class="filter-top-row">
        <div class="dropdown-trigger" @click="toggleDropdown">
          전체
          <span class="arrow" :class="{ open: isOpen }">▼</span>
        </div>

        <button class="sort-toggle" @click="toggleSortOrder">
          {{ isAsc ? '↑ 오름차순' : '↓ 내림차순' }}
        </button>

        <!-- ✅ 초기화 버튼 추가 -->
        <button class="reset-button" @click="resetFilters">초기화</button>

        <button class="today-button" @click="goToToday">
          오늘로 이동
          <i class="fa-solid fa-rotate-left icon-rotate"></i>
        </button>
      </div>
      <!-- 말풍선 메뉴 -->
      <div v-if="isOpen" class="my-dropdown-menu">
        <ul class="select-list">
          <li>
            날짜를 선택해
            <span class="chevron">
              <select class="pretty-select" v-model="selectedPeriod">
                <option>일별</option>
                <option>주간별</option>
                <option>월별</option>
                <option>년도별</option>
              </select>
            </span>
          </li>
          <li>
            카테고리를 골라줘
            <span class="chevron">
              <select class="pretty-select" v-model="selectedCategory">
                <option>전체</option>
                <optgroup label="수입">
                  <option>급여</option>
                  <option>용돈</option>
                  <option>그외</option>
                </optgroup>
                <optgroup label="지출">
                  <option>대출</option>
                  <option>식비</option>
                  <option>유흥</option>
                  <option>쇼핑</option>
                  <option>취미</option>
                  <option>의료</option>
                  <option>주거</option>
                  <option>보험</option>
                  <option>미용</option>
                  <option>교통</option>
                  <option>생활</option>
                  <option>교육</option>
                  <option>이체</option>
                  <option>저축</option>
                </optgroup>
              </select>
            </span>
          </li>
          <li>
            유형을 선택해
            <span class="chevron">
              <select class="pretty-select" v-model="selectedType">
                <option>모두</option>
                <option>수입만</option>
                <option>지출만</option>
              </select>
            </span>
          </li>
          <li>
            감정을 선택해
            <span class="chevron">
              <select class="pretty-select" v-model="selectedEmotion">
                <option>전체</option>
                <option>행복</option>
                <option>설렘</option>
                <option>스트레스</option>
                <option>의무감</option>
                <option>후회</option>
                <option>모름(기타)</option>
              </select>
            </span>
          </li>
        </ul>
      </div>
      <div
        id="Entire"
        v-for="(group, date) in groupedBudgetByPeriod"
        :key="date"
      >
        <h3>{{ date }}</h3>
        <ul style="list-style: none; padding: 0">
          <li
            v-for="item in group"
            :key="item.budgetId"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 12px;
            "
            @click="openDetail(item)"
          >
            <!-- 왼쪽: 이미지 + 텍스트 묶음 -->
            <div style="display: flex; align-items: center">
              <img
                :src="getEmotionImage(item.emotion)"
                alt="emotion"
                class="emotion-img"
                width="80px"
                style="margin-right: 12px"
              />
              <div class="item-details">
                <div class="item-amount">
                  <span v-if="item.type === 'income'">+</span>
                  <span v-else>-</span
                  >{{ Number(item.money).toLocaleString() }} 원
                </div>
                <div class="item-meta">
                  <span class="item-category">{{ item.category }}</span>
                  <span class="divider">|</span>
                  <span class="item-emotion">{{ item.emotion }}</span>
                </div>
              </div>
            </div>

            <!-- 오른쪽: 화살표 -->
            <span style="font-size: 34px; color: #888">›</span>
          </li>
        </ul>
      </div>
      <div class="create-container">
        <QuickButton @togglePopup="toggleQuickCreate" />
        <QuickCreate
          :showQuickCreate="showQuickCreate"
          @togglePopup="toggleQuickCreate"
        />
      </div>
    </div>
  </main>
  <TransactionModal
    v-if="selectedItem"
    :data="selectedItem"
    @close="selectedItem = null"
    @edit="editItem"
    @delete="handleDelete"
    @update="handleUpdate"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import happy from '@/assets/images/happy.png';
import excited from '@/assets/images/excited.png';
import stress from '@/assets/images/stress.png';
import duty from '@/assets/images/duty.png';
import regret from '@/assets/images/regret.png';
import what from '@/assets/images/question.png';
import QuickButton from '@/components/QuickButton.vue';
import QuickCreate from '@/components/QuickCreate.vue';
import { useBudgetStore } from '@/stores/budgetStore.js';
import { computed } from 'vue';
import TransactionModal from '@/components/TransactionModal.vue';

const selectedItem = ref(null);

//퀵 팝업
const showQuickCreate = ref(false);
const toggleQuickCreate = () => {
  showQuickCreate.value = !showQuickCreate.value;
};
const route = useRoute();
const budgetStore = useBudgetStore();
const isOpen = ref(false);
const selectedPeriod = ref('일별');
const selectedCategory = ref('전체');
const selectedEmotion = ref('전체');
const selectedType = ref('모두');
const isAsc = ref(false);
const toggleSortOrder = () => {
  isAsc.value = !isAsc.value;
};
const categoryOrder = [
  '급여',
  '용돈',
  '그외', // 수입
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
  '저축', // 지출
];
const resetFilters = () => {
  selectedPeriod.value = '일별';
  selectedCategory.value = '전체';
  selectedType.value = '모두';
  selectedEmotion.value = '전체';
  isAsc.value = false; // 기본 정렬 내림차순
  selectedDate.value = '';
  isDateSelected.value = true;
};
const isDateSelected = ref(true);

const toggleSelectedDate = () => {
  if (!isDateSelected.value) {
    selectedDate.value = '';
  }
};
onMounted(() => {
  budgetStore.fetchBudgetByDate(); // 데이터 로드
});

watch(
  () => route.fullPath,
  () => {
    budgetStore.fetchBudgetByDate();
  }
);
const hoveredDate = ref('');

function getItemsForDate(date) {
  const target = formatDate(date);
  return budgetStore.groupedBudget[target] || [];
}
const groupedBudgetByPeriod = computed(() => {
  const raw = budgetStore.getGroupedBudgetByPeriod(selectedPeriod.value);

  const parseKey = (label) => {
    if (selectedPeriod.value === '주간별') {
      const match = label.match(/(\d+)월 (\d+)일/);
      if (match) {
        const [, month, day] = match;
        return new Date(
          `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        );
      }
    }
    return new Date(label);
  };
  const sorted = Object.entries(raw)
    .sort((a, b) => {
      const aDate = parseKey(a[0]);
      const bDate = parseKey(b[0]);
      return isAsc.value ? aDate - bDate : bDate - aDate;
    })
    .reduce((acc, [key, val]) => {
      let filtered = val;

      if (selectedCategory.value !== '전체') {
        filtered = filtered.filter(
          (item) => item.category === selectedCategory.value
        );
      }

      if (selectedEmotion.value && selectedEmotion.value !== '전체') {
        filtered = filtered.filter(
          (item) => item.emotion === selectedEmotion.value
        );
      }

      if (selectedType.value === '수입만') {
        filtered = filtered.filter((item) => item.type === 'income');
      } else if (selectedType.value === '지출만') {
        filtered = filtered.filter((item) => item.type === 'expense');
      }

      filtered = filtered.sort((a, b) => {
        return (
          categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
        );
      });

      // ✅ 날짜 선택 시 해당 날짜만 남기기
      if (selectedDate.value) {
        const formattedKey = formatDate(key);
        if (formattedKey === selectedDate.value && filtered.length > 0) {
          acc[key] = filtered;
        }
      } else if (filtered.length > 0) {
        acc[key] = filtered;
      }

      return acc;
    }, {});

  return sorted;
});

// '행복', '설렘', '스트레스', '의무감', '후회', '모름(기타)'
function getEmotionImage(emotion) {
  if (emotion === '행복') return happy;
  else if (emotion === '설렘') return excited;
  else if (emotion === '스트레스') return stress;
  else if (emotion === '의무감') return duty;
  else if (emotion === '후회') return regret;
  else return what;
}
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
function toggleDropdown() {
  console.log('열림');
  isOpen.value = !isOpen.value;
}

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
  const formatted = formatDate(date);
  if (selectedDate.value === formatted) {
    selectedDate.value = ''; // 다시 누르면 취소
  } else {
    selectedDate.value = formatted;
  }
};

const openDetail = (item) => {
  selectedItem.value = item;
};

const editItem = (item) => {
  console.log('✏ 수정 요청:', item);
};

// const deleteItem = (id) => {
//   console.log('🗑 삭제 요청:', id);
// };
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

.today-button {
  font-size: 15px;
  padding: 6px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s, transform 0.1s;
}

.today-button:hover {
  background-color: #e7fbe7;
}

.today-button:active {
  transform: scale(0.96);
}

.selected-info {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
}

.icon-rotate {
  font-size: 16px;
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

#filterPart {
  width: 1000px;
  margin: 0 auto;
}

#Entire h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

#Entire li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

#Entire ul {
  list-style: none;
  padding: 0;
}

.item-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 오른쪽 정렬 */
  margin-left: 30px;
}

.item-amount {
  font-size: 22px;
  font-weight: bold;
}

.item-meta {
  font-size: 14px;
  color: #777;
  margin-top: 4px;
}

.divider {
  margin: 0 6px;
}

.dropdown-container {
  position: relative;
  display: block;
  width: 100%;
  font-family: 'Pretendard', sans-serif;
}

.dropdown-trigger {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.arrow {
  margin-left: 6px;
  transition: transform 0.2s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.my-dropdown-menu {
  position: absolute;
  top: 35px;
  left: 0;
  background: #fffce8;
  border: 2px solid #e2e2e2;
  border-radius: 20px;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  z-index: 9999;
  width: 360px;
  clip-path: polygon(
    20px 0%,
    30px -15px,
    40px 0%,
    100% 0%,
    100% 100%,
    0% 100%,
    0% 0%
  );
}

.my-dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.my-dropdown-menu li {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chevron {
  font-size: 20px;
  color: #555;
}

.select-list {
  padding: 0;
  list-style: none;
  font-size: 18px;
}

.select-list li {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pretty-select {
  font-size: 16px;
  padding: 6px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 130px;
}

.pretty-select:hover {
  border-color: #aaa;
}

.pretty-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.pretty-select optgroup {
  font-weight: bold;
  color: #444;
  background-color: #f5f5f5;
  padding: 4px 0;
}

.sort-toggle {
  font-size: 16px;
  margin-left: 12px;
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sort-toggle:hover {
  background-color: #f0f0f0;
}

.filter-top-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.sort-toggle {
  font-size: 15px;
  padding: 6px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fefefe;
  cursor: pointer;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.08);
  transition: background-color 0.2s, transform 0.1s;
}

.sort-toggle:hover {
  background-color: #fff7cc;
}

.sort-toggle:active {
  transform: scale(0.96);
}

.calendar-wrapper {
  position: relative;
  z-index: 10;
  overflow: visible;
}

::v-deep(.my-dropdown-menu) {
  z-index: 9999;
  display: block;
}

.reset-button {
  font-size: 15px;
  padding: 6px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.08);
  transition: background-color 0.2s, transform 0.1s;
}

.reset-button:hover {
  background-color: #ffecec;
}

.reset-button:active {
  transform: scale(0.96);
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

.create-container {
  position: fixed;
  bottom: 50px;
  right: 100px;
  z-index: 1000;
}
</style>

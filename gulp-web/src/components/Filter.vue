<template>
  <main id="filterPart">
    <div class="dropdown-container">
      <!-- ✅ 선택한 날짜 표시 (selectedDate.value로 직접 접근) -->
      <div v-if="selectedDate" class="selected-info">
        <label>
          <input
            type="checkbox"
            v-model="isDateSelected"
            @change="toggleSelectedDate"
          />
          <span style="margin-left: 8px">
            선택한 날짜: {{ selectedDate }}
          </span>
        </label>
      </div>

      <!-- 🔽 상단 필터 버튼들 -->
      <div class="filter-top-row">
        <div class="dropdown-trigger" @click="toggleDropdown">
          전체 <span class="arrow" :class="{ open: isOpen }">▼</span>
        </div>
        <button class="sort-toggle" @click="toggleSortOrder">
          {{ isAsc ? '↑ 오름차순' : '↓ 내림차순' }}
        </button>
        <button class="reset-button" @click="resetFilters">초기화</button>
        <button class="today-button" @click="goToToday">
          오늘로 이동 <i class="fa-solid fa-rotate-left icon-rotate"></i>
        </button>
      </div>

      <!-- 🔽 필터 선택 영역 -->
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

      <!-- ✅ 예산 리스트 출력 -->
      <div
        id="Entire"
        v-for="(group, date) in groupedBudgetByPeriod"
        :key="date"
      >
        <h3>{{ date }}</h3>
        <ul>
          <li
            v-for="item in group"
            :key="item.budgetId"
            @click="$emit('open-item', item)"
          >
            <div style="display: flex; align-items: center">
              <img
                :src="getEmotionImage(item.emotion)"
                class="emotion-img"
                width="80px"
              />
              <div class="item-details">
                <div class="item-amount">
                  <span v-if="item.type === 'income'">+</span>
                  <span v-else>-</span>
                  {{ Number(item.money).toLocaleString() }} 원
                </div>
                <div class="item-meta">
                  <span class="item-category">{{ item.category }}</span>
                  <span class="divider">|</span>
                  <span class="item-emotion">{{ item.emotion }}</span>
                </div>
              </div>
            </div>
            <span style="font-size: 34px; color: #888">›</span>
          </li>
        </ul>
      </div>

      <!-- ➕ 빠른 생성 -->
      <div class="create-container">
        <QuickButton @togglePopup="toggleQuickCreate" />
        <QuickCreate
          :showQuickCreate="showQuickCreate"
          @togglePopup="toggleQuickCreate"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, inject, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBudgetStore } from '@/stores/budgetStore';
import QuickButton from '@/components/QuickButton.vue';
import QuickCreate from '@/components/QuickCreate.vue';
import happy from '@/assets/images/happy.png';
import excited from '@/assets/images/excited.png';
import stress from '@/assets/images/stress.png';
import duty from '@/assets/images/duty.png';
import regret from '@/assets/images/regret.png';
import what from '@/assets/images/question.png';

const injectedSelectedDate = inject('selectedDate');

const selectedDate = computed({
  get: () => injectedSelectedDate.value,
  set: (val) => {
    injectedSelectedDate.value = val;
  },
});
const currentMonth = inject('currentMonth');
const calendarKey = inject('calendarKey');
const today = inject('today');
const formatDate = inject('formatDate');

const showQuickCreate = ref(false);
const toggleQuickCreate = () =>
  (showQuickCreate.value = !showQuickCreate.value);

const route = useRoute();
const budgetStore = useBudgetStore();
const isOpen = ref(false);
const selectedPeriod = ref('일별');
const selectedCategory = ref('전체');
const selectedEmotion = ref('전체');
const selectedType = ref('모두');
const isAsc = ref(false);
const isDateSelected = inject('isDateSelected');

onMounted(() => budgetStore.fetchBudgetByDate());
watch(
  () => route.fullPath,
  () => budgetStore.fetchBudgetByDate()
);

const toggleDropdown = () => (isOpen.value = !isOpen.value);
const toggleSortOrder = () => (isAsc.value = !isAsc.value);
const resetFilters = () => {
  selectedPeriod.value = '일별';
  selectedCategory.value = '전체';
  selectedEmotion.value = '전체';
  selectedType.value = '모두';
  isAsc.value = false;
  selectedDate.value = '';
  isDateSelected.value = true;
};
const toggleSelectedDate = () => {
  if (!isDateSelected.value) selectedDate.value = '';
};
const goToToday = () => {
  selectedDate.value = today;
  currentMonth.value = new Date();
  calendarKey.value++;
};

const categoryOrder = [
  '급여',
  '용돈',
  '그외',
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

  return Object.entries(raw)
    .sort((a, b) =>
      isAsc.value
        ? parseKey(a[0]) - parseKey(b[0])
        : parseKey(b[0]) - parseKey(a[0])
    )
    .reduce((acc, [key, val]) => {
      let filtered = val;
      if (selectedCategory.value !== '전체')
        filtered = filtered.filter(
          (item) => item.category === selectedCategory.value
        );
      if (selectedEmotion.value !== '전체')
        filtered = filtered.filter(
          (item) => item.emotion === selectedEmotion.value
        );
      if (selectedType.value === '수입만')
        filtered = filtered.filter((item) => item.type === 'income');
      else if (selectedType.value === '지출만')
        filtered = filtered.filter((item) => item.type === 'expense');
      filtered = filtered.sort(
        (a, b) =>
          categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      );
      if (selectedDate.value) {
        const formattedKey = formatDate(key);
        if (formattedKey === selectedDate.value && filtered.length > 0)
          acc[key] = filtered;
      } else if (filtered.length > 0) {
        acc[key] = filtered;
      }
      return acc;
    }, {});
});

function getEmotionImage(emotion) {
  if (emotion === '행복') return happy;
  else if (emotion === '설렘') return excited;
  else if (emotion === '스트레스') return stress;
  else if (emotion === '의무감') return duty;
  else if (emotion === '후회') return regret;
  else return what;
}
</script>

<style scoped>
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

.icon-rotate {
  font-size: 16px;
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

.selected-info {
  margin-top: 8px;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
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

.create-container {
  position: fixed;
  bottom: 50px;
  right: 100px;
  z-index: 1000;
}
</style>

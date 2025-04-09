// stores/budgetStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek'; // 주 시작일 지정용 (월요일 시작이면 필요)

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
export const useBudgetStore = defineStore('budget', () => {
  // 내부 상태 변수 (직접 접근은 피함)
  const _groupedBudget = ref({});

  const _allBudget = ref([]);

  // 읽기 전용 computed 속성으로 외부에 노출
  const groupedBudget = computed(() => _groupedBudget.value);

  // 날짜별로 그룹화
  async function fetchBudgetByDate() {
    const res = await axios.get('http://localhost:3000/budget');
    _allBudget.value = res.data; // 원본 저장

    _groupedBudget.value = res.data.reduce((acc, cur) => {
      const date = cur.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(cur);
      return acc;
    }, {});
  }

  // 카테고리별 필터링
  function getBudgetByCategory(categoryName) {
    return _allBudget.value.filter((item) => item.category === categoryName);
  }

  // 감정별 필터링
  function getBudgetByEmotion(emotionName) {
    return _allBudget.value.filter((item) => item.emotion === emotionName);
  }

  function getGroupedBudgetByPeriod(period) {
    const result = {};

    _allBudget.value.forEach((item) => {
      const date = dayjs(item.date);
      let key = '';

      switch (period) {
        case '일별':
          key = date.format('YYYY-MM-DD');
          break;
        case '주간별': {
          const startOfWeek = date.startOf('week'); // 일요일 기준 시작
          const endOfWeek = date.endOf('week'); // 토요일 기준 끝

          const startStr = startOfWeek.format('M월 D일'); // 예: 2월 18일
          const endStr = endOfWeek.format('M월 D일'); // 예: 2월 24일

          key = `${startStr} ~ ${endStr}`;
          break;
        }
        case '월별':
          key = date.format('YYYY년 MM월');
          break;
        case '년도별':
          key = date.format('YYYY년');
          break;
      }

      if (!result[key]) result[key] = [];
      result[key].push(item);
    });

    return result;
  }

  return {
    groupedBudget,
    fetchBudgetByDate,
    getBudgetByCategory,
    getBudgetByEmotion,
    getGroupedBudgetByPeriod,
  };
});

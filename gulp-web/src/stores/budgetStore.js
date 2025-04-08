// stores/budgetStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

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

  return {
    groupedBudget,
    fetchBudgetByDate,
    getBudgetByCategory,
    getBudgetByEmotion,
  };
});

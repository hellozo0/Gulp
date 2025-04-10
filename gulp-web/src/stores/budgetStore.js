import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export const useBudgetStore = defineStore('budget', () => {
  const _groupedBudget = ref({});
  const _allBudget = ref([]);

  const groupedBudget = computed(() => _groupedBudget.value);

  async function fetchBudgetByDate() {
    const res = await axios.get('http://localhost:3000/budget');
    _allBudget.value = res.data;

    _groupedBudget.value = res.data.reduce((acc, cur) => {
      const date = cur.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(cur);
      return acc;
    }, {});
  }

  function getBudgetByCategory(categoryName) {
    return _allBudget.value.filter((item) => item.category === categoryName);
  }

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
          const startOfWeek = date.startOf('week');
          const endOfWeek = date.endOf('week');
          const startStr = startOfWeek.format('M월 D일');
          const endStr = endOfWeek.format('M월 D일');
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

  // ✅ 삭제 기능 추가
  async function deleteBudget(id) {
    try {
      await axios.delete(`http://localhost:3000/budget/${id}`);
      await fetchBudgetByDate(); // 상태 갱신
    } catch (err) {
      console.error('❌ Pinia 삭제 실패:', err);
      throw err;
    }
  }

  // ✅ 수정 기능 추가
  async function updateBudget(id, updatedItem) {
    try {
      await axios.put(`http://localhost:3000/budget/${id}`, updatedItem);
      await fetchBudgetByDate(); // 상태 갱신
    } catch (err) {
      console.error('❌ Pinia 수정 실패:', err);
      throw err;
    }
  }

  return {
    groupedBudget,
    fetchBudgetByDate,
    getBudgetByCategory,
    getBudgetByEmotion,
    getGroupedBudgetByPeriod,
    deleteBudget, // ✅ 추가됨
    updateBudget, // ✅ 추가됨
  };
});

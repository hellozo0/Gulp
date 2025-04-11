// stores/budget.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useBudgetStore = defineStore('budget', () => {
  const topCategories = ref([]);
  const otherTotal = ref(0);

  const fetchTopExpenses = async (selectedMonth) => {
    const res = await axios.get('http://localhost:3000/budget');
    const expenses = res.data.filter(
      (item) => item.type === 'expense' && item.date.startsWith(selectedMonth)
    );

    const categoryMap = {};
    expenses.forEach((item) => {
      const category = item.category;
      const money = Number(item.money);
      categoryMap[category] = (categoryMap[category] || 0) + money;
    });

    const sorted = Object.entries(categoryMap)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);

    const top4 = sorted.slice(0, 4);
    const other = sorted.slice(4).reduce((sum, item) => sum + item.total, 0);

    topCategories.value = [...top4];
    otherTotal.value = other;

    if (other > 0) {
      topCategories.value.push({ category: '그외', total: other });
    }
  };

  return {
    topCategories,
    otherTotal,
    fetchTopExpenses,
  };
});

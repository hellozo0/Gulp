// stores/netprofit.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useNetProfitStore = defineStore('netprofit', {
  state: () => ({
    budgetData: [],
  }),
  actions: {
    async fetchBudgetData() {
      const res = await axios.get('http://localhost:3000/budget');
      this.budgetData = res.data;
    },
  },
  getters: {
    filteredBudget: (state) => (selectedMonth) =>
      state.budgetData.filter((item) => item.date.startsWith(selectedMonth)),
    totalIncome: (state) => (selectedMonth) =>
      state.budgetData
        .filter(
          (item) =>
            item.date.startsWith(selectedMonth) && item.type === 'income'
        )
        .reduce((sum, item) => sum + Number(item.money), 0),
    totalExpense: (state) => (selectedMonth) =>
      state.budgetData
        .filter(
          (item) =>
            item.date.startsWith(selectedMonth) && item.type === 'expense'
        )
        .reduce((sum, item) => sum + Number(item.money), 0),
    netIncome() {
      return (selectedMonth) =>
        this.totalIncome(selectedMonth) - this.totalExpense(selectedMonth);
    },
  },
});

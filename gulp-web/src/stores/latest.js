// stores/latest.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLatestStore = defineStore('latest', {
  state: () => ({
    latestThree: [],
  }),
  actions: {
    async fetchLatestThree(selectedMonth) {
      const res = await axios.get('http://localhost:3000/budget');
      this.latestThree = res.data
        .filter((item) => item.date.startsWith(selectedMonth))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    },
  },
});

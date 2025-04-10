import { defineStore } from 'pinia';
import axios from 'axios';

export const useEmotionStore = defineStore('emotion', {
  state: () => ({
    topCategories: [],
    emotionTitle: '',
  }),
  actions: {
    async fetchEmotionData(selectedMonth) {
      const res = await axios.get('http://localhost:3000/budget');
      const expenses = res.data.filter(
        (item) => item.emotion && item.date.startsWith(selectedMonth)
      );

      const emotionMap = {};
      expenses.forEach((item) => {
        const emotion = item.emotion;
        const money = Number(item.money);
        emotionMap[emotion] = (emotionMap[emotion] || 0) + money;
      });

      const sorted = Object.entries(emotionMap)
        .map(([emotion, total]) => ({ emotion, total }))
        .sort((a, b) => b.total - a.total);

      const totalAmount = sorted.reduce((sum, item) => sum + item.total, 0);

      const withPercent = sorted.map((item) => ({
        ...item,
        percent: ((item.total / totalAmount) * 100).toFixed(1),
      }));

      this.topCategories = withPercent;
      this.emotionTitle = sorted.length > 0 ? sorted[0].emotion : '감정';
    },
  },
});

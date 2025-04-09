<template>
  <div>
    <h3 v-if="topCategories.length">
      이번달은 {{ emotionTitle }} 소비가 많아요 !
    </h3>
    <h3 v-else>이번달은 등록된 감정 소비가 없어요</h3>
    <div class="chart-section">
      <div class="chart-container">
        <canvas ref="doughnut"></canvas>
      </div>
      <br />
      <ul>
        <li v-for="item in topCategories" :key="item.emotion">
          <div class="expense">
            <img :src="getImageUrl(item.emotion)" alt="icon" class="icon" />
            &nbsp;&nbsp;
            <span style="float: right"> {{ item.percent }}% </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
const categoryImages = {
  행복: 'happy.png',
  설렘: 'excited.png',
  스트레스: 'stress.png',
  의무감: 'duty.png',
  후회: 'regret.png',
  '모름(기타)': 'question.png',
};

// 이미지 경로 반환
const getImageUrl = (category) => {
  const filename = categoryImages[category] || 'default.png';
  return new URL(`/src/assets/images/${filename}`, import.meta.url).href;
};

const props = defineProps({
  selectedMonth: String,
});

const doughnut = ref(null);
const topCategories = ref([]);
const emotionTitle = ref('');
let chartInstance = null;

const renderChart = (labels, data) => {
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(doughnut.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          label: '감정',
          data,
          backgroundColor: [
            '#ffd4d4',
            '#face98',
            '#98f0fa',
            '#91ff9a',
            '#fafa89',
            '#636363',
          ],
          borderColor: '#fffce6', // 원하는 테두리 색
          borderWidth: 3, // 테두리 두께
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const value = context.raw;
              const percent = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${percent}%`;
            },
          },
        },
      },
    },
  });
};

const fetchData = async () => {
  const res = await axios.get('http://localhost:3000/budget');
  const expenses = res.data.filter(
    (item) => item.emotion && item.date.startsWith(props.selectedMonth)
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

  // 퍼센트 계산
  const withPercent = sorted.map((item) => ({
    ...item,
    percent: ((item.total / totalAmount) * 100).toFixed(1),
  }));

  topCategories.value = withPercent;
  emotionTitle.value = sorted.length > 0 ? sorted[0].emotion : '감정';

  const labels = withPercent.map((item) => item.emotion);
  const data = withPercent.map((item) => item.total);

  renderChart(labels, data);
};

onMounted(fetchData);
watch(() => props.selectedMonth, fetchData);
</script>

<style scoped>
h3 {
  font-weight: bold;
  margin: 1rem;
}

.chart-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem; /* 차트와 텍스트 사이 간격 */
  padding: 2rem 1rem;
}

.chart-container {
  width: 450px;
  position: relative;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.chart-text {
  max-width: 250px;
  font-size: 1rem;
  line-height: 1.6;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  float: right;
}
li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.expense {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem;
}

.icon {
  width: 3.5rem;
  margin-right: 0.5rem;
  vertical-align: middle;
}
</style>

<template>
  <div>
    <h2>지출 상위 4개 항목</h2>
    <br />
    <canvas ref="barChart"></canvas>
  </div>
  <br />
  <ul>
    <li v-for="item in topCategories" :key="item.category">
      <div class="expense">
        <img :src="getImageUrl(item.category)" alt="icon" class="icon" />
        <span>{{ item.category }}</span>
        <span style="float: right">{{ item.total.toLocaleString() }}원</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

const categoryImages = {
  대출: 'loan.png',
  식비: 'food.png',
  유흥: 'entertainment.png',
  쇼핑: 'shopping.png',
  취미: 'hobby.png',
  의료: 'medical.png',
  주거: 'housing.png',
  보험: 'insurance.png',
  미용: 'beauty.png',
  교통: 'transport.png',
  생활: 'life.png',
  교육: 'education.png',
  이체: 'transfer.png',
  저축: 'saving.png',
  그외: 'etc.png',
};

// 이미지 경로 반환
const getImageUrl = (category) => {
  const filename = categoryImages[category] || 'default.png';
  return new URL(`/src/assets/icons/${filename}`, import.meta.url).href;
};

const props = defineProps({
  selectedMonth: String,
});

const barChart = ref(null);
const topCategories = ref([]);
const otherTotal = ref(0);
let chartInstance = null;

const renderChart = (labels, data) => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  // chart.js
  chartInstance = new Chart(barChart.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '지출 금액 (원)',
          data,
          backgroundColor: [
            '#F5EEDC',
            '#FFB22C',
            '#854836',
            '#000000',
            '#706D54',
          ],
          borderRadius: 18,
          barThickness: 50,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
      borderColor: '#fffce6', // 원하는 테두리 색
      borderWidth: 4,
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.label}: ${context.raw.toLocaleString()}원`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            stepSize: 50000,
            callback: (value) => `${value.toLocaleString()}`,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
};

const fetchData = async () => {
  const res = await axios.get('http://localhost:3000/budget');
  const expenses = res.data.filter(
    (item) =>
      item.type === 'expense' && item.date.startsWith(props.selectedMonth)
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

  const labels = topCategories.value.map((item) => item.category);
  const data = topCategories.value.map((item) => item.total);

  renderChart(labels, data);
};

onMounted(fetchData);
watch(() => props.selectedMonth, fetchData);
</script>

<style scoped>
h2 {
  font-weight: bold;
  margin: 1rem;
}

canvas {
  max-width: 90%;
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
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

<template>
  <div>
    <h2>지출 상위 4개 항목</h2>
    <br />
    <canvas ref="barChart"></canvas>
  </div>
  <br />
  <ul>
    <li v-for="item in budgetStore.topCategories" :key="item.category">
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
import { useBudgetStore } from '@/stores/budget';
import Chart from 'chart.js/auto';

const props = defineProps({
  selectedMonth: String,
});

const barChart = ref(null);
let chartInstance = null;

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

const getImageUrl = (category) => {
  const filename = categoryImages[category] || 'default.png';
  return new URL(`/src/assets/icons/${filename}`, import.meta.url).href;
};

const budgetStore = useBudgetStore();

const renderChart = (labels, data) => {
  if (chartInstance) {
    chartInstance.destroy();
  }

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
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.label}: ${context.raw.toLocaleString()}원`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            stepSize: 50000,
            callback: (value) => `${value.toLocaleString()}`,
          },
        },
        y: {
          grid: { display: false },
          ticks: {
            stepSize: 50000,
            callback: function (value) {
              return value % 50000 === 0 ? value.toLocaleString() + '원' : '';
            },
          },
        },
      },
    },
  });
};

const updateChart = async () => {
  await budgetStore.fetchTopExpenses(props.selectedMonth);
  const labels = budgetStore.topCategories.map((item) => item.category);
  const data = budgetStore.topCategories.map((item) => item.total);
  renderChart(labels, data);
};

onMounted(updateChart);
watch(() => props.selectedMonth, updateChart);
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

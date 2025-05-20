<template>
  <div>
    <div class="topEmotion" v-if="emotionStore.topCategories.length">
      이번달은 {{ emotionStore.emotionTitle }} 소비가 많아요 !
    </div>
    <div class="topEmotion" v-else>이번달은 등록된 감정 소비가 없어요</div>

    <!-- 가로 퍼센트 리스트 -->
    <div class="emotion-list">
      <div
        class="emotion-item"
        v-for="item in emotionStore.topCategories"
        :key="item.emotion"
      >
        <img :src="getImageUrl(item.emotion)" alt="icon" class="icon" />
        <span>{{ item.percent }}%</span>
      </div>
    </div>

    <!-- 도넛 차트 -->
    <div class="chart-container">
      <canvas ref="doughnut"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useEmotionStore } from '@/stores/emotion'; // 경로는 프로젝트 구조에 맞게
import Chart from 'chart.js/auto';

const props = defineProps({
  selectedMonth: String,
});

const emotionStore = useEmotionStore();
const doughnut = ref(null);
let chartInstance = null;

const categoryImages = {
  행복: 'happy.png',
  설렘: 'excited.png',
  스트레스: 'stress.png',
  의무감: 'duty.png',
  후회: 'regret.png',
  '모름(기타)': 'question.png',
};

const getImageUrl = (category) => {
  const filename = categoryImages[category] || 'default.png';
  return new URL(`/src/assets/images/${filename}`, import.meta.url).href;
};

const renderChart = () => {
  if (chartInstance) chartInstance.destroy();

  const labels = emotionStore.topCategories.map((item) => item.emotion);
  const data = emotionStore.topCategories.map((item) => item.total);

  chartInstance = new Chart(doughnut.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          label: '감정',
          data,
          backgroundColor: [
            '#F5EEDC',
            '#FFB22C',
            '#854836',
            '#000000',
            '#706D54',
            '#C9B194',
          ],
          circumference: 180,
          rotation: 270,
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

const updateChart = async () => {
  await emotionStore.fetchEmotionData(props.selectedMonth);
  renderChart();
};

onMounted(updateChart);
watch(() => props.selectedMonth, updateChart);
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

/* .chart-container {
  width: 100%;
  position: relative;
} */

.emotion-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 0;
}

.emotion-item {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 0.95rem;
}

.icon {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
}

.chart-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 1.5rem;
}

canvas {
  width: 100%;
  height: auto;
  display: block;
}

.chart-text {
  max-width: 100%;
  font-size: 1rem;
  line-height: 100%;
}

/* ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  float: right;
}
li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
} */

.topEmotion {
  font-weight: bold;
  font-size: 1rem;
}

.expense {
  font-size: 1rem;
  font-weight: bold;
  margin: 2rem;
}

/* .icon {
  width: 2rem;
  margin-right: 0.5rem;
  vertical-align: middle;
} */
</style>

<template>
  <div class="result">
    <!-- <h3>{{ props.selectedMonth }}</h3> -->
    <h2>이번달은 얼마 남았을까요</h2>
    <br />
    <div class="between">
      <p>총 수입:</p>
      <p>+{{ totalIncome.toLocaleString() }}원</p>
    </div>
    <div class="between">
      <p>총 지출:</p>
      <p>-{{ totalExpense.toLocaleString() }}원</p>
    </div>
    <div class="between">
      <p>순이익:</p>
      <p>{{ netIncome.toLocaleString() }}원</p>
    </div>
  </div>
</template>
<script setup>
import { computed, toRefs, onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  selectedMonth: String,
});

const budgetData = ref([]);

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/budget');
  budgetData.value = res.data;
});

const filteredBudget = computed(() => {
  return budgetData.value.filter((item) =>
    item.date.startsWith(props.selectedMonth)
  );
});

const totalIncome = computed(() =>
  filteredBudget.value
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.money), 0)
);

const totalExpense = computed(() =>
  filteredBudget.value
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + Number(item.money), 0)
);

const netIncome = computed(() => totalIncome.value - totalExpense.value);
</script>
<style scoped>
h2 {
  font-weight: bold;
  margin: 1rem;
}
p {
  font-size: 1.8rem;
  text-align: right;
  font-weight: bold;
  margin: 1rem;
}
.between {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
</style>

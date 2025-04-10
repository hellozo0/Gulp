<template>
  <div class="result">
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
import { onMounted, computed } from 'vue';
import { useNetProfitStore } from '@/stores/netprofit';

const props = defineProps({
  selectedMonth: String,
});

const netProfitStore = useNetProfitStore();

onMounted(() => {
  netProfitStore.fetchBudgetData();
});

const totalIncome = computed(() =>
  netProfitStore.totalIncome(props.selectedMonth)
);
const totalExpense = computed(() =>
  netProfitStore.totalExpense(props.selectedMonth)
);
const netIncome = computed(() => netProfitStore.netIncome(props.selectedMonth));
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

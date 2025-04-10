<script setup>
import { onMounted, watch } from 'vue';
import { useLatestStore } from '@/stores/latest';

const props = defineProps({
  selectedMonth: String,
});

const latestStore = useLatestStore();

onMounted(() => {
  latestStore.fetchLatestThree(props.selectedMonth);
});

watch(
  () => props.selectedMonth,
  (newMonth) => {
    latestStore.fetchLatestThree(newMonth);
  }
);
</script>

<template>
  <div>
    <h2>내역 <br />최신순 조회</h2>

    <ul>
      <li v-for="item in latestStore.latestThree" :key="item.budgetId">
        <h2>
          {{ item.type === 'income' ? '+' : '-' }}
          {{ Number(item.money).toLocaleString() }}원
        </h2>
        <p>{{ item.date }} <br />{{ item.emotion }} | {{ item.category }}</p>
      </li>
    </ul>
    <br />
    <h4><a href="http://localhost:5173/history">전체 내역 보기</a></h4>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  text-align: right;
}
h4 {
  text-align: center;
  color: black;
  font-size: 1.7rem;
}
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: rgb(186, 163, 46);
  background-color: transparent;
}
h3 {
  font-weight: bold;
  margin: 1rem;
}
p {
  font-size: 1.4rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.479);
}
h2 {
  font-weight: bold;
  margin: 1rem;
}
</style>

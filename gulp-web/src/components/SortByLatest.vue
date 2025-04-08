<template>
  <div>
    <h3>내역 <br />최신순 조회</h3>

    <ul>
      <li v-for="item in latestThree" :key="item.budgetId">
        <h3>
          {{ item.type === 'income' ? '+' : '-' }}
          {{ Number(item.money).toLocaleString() }}원
        </h3>
        <p>{{ item.date }} <br />{{ item.emotion }} | {{ item.category }}</p>
      </li>
    </ul>
    <br />
    <h4><a href="#">전체 내역 보기</a></h4>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  selectedMonth: String,
});

const latestThree = ref([]);

const fetchBudget = async () => {
  const res = await axios.get('http://localhost:3000/budget');

  // 월별 필터링 후 최신순 정렬 → 상위 3개만
  latestThree.value = res.data
    .filter((item) => item.date.startsWith(props.selectedMonth))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
};

onMounted(fetchBudget);
watch(() => props.selectedMonth, fetchBudget);
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: right;
}
h4 {
  text-align: center;
  color: black;
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
}
p {
  font-size: 1.2rem;
}
</style>

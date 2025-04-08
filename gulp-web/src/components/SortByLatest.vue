<template>
  <div>
    <h3>4월 내역 <br />최신순 조회</h3>
    <div v-for="(group, date) in limitedGroupedBudget" :key="date">
      <ul>
        <li v-for="item in group" :key="item.budgetId">
          <h3>+ {{ Number(item.money).toLocaleString() }}원</h3>
          <p>{{ item.category }} | {{ item.emotion }}</p>
        </li>
      </ul>
    </div>

    <h4><a href="#">전체 내역 보기</a></h4>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const groupedBudget = ref({});

// 최신순으로 3개 데이터 출력
const limitedGroupedBudget = computed(() => {
  const entries = Object.entries(groupedBudget.value);
  const sorted = entries.sort((a, b) => new Date(b[0]) - new Date(a[0]));
  return Object.fromEntries(sorted.slice(0, 3)); // 상위 3개만 보여줌
});

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/budget');

  // 최신순으로 정렬된 데이터
  const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 날짜별 그룹핑
  groupedBudget.value = sorted.reduce((acc, cur) => {
    const date = cur.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(cur);
    return acc;
  }, {});
});
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

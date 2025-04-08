<template>
  <div class="container-fluid">
    <div class="flexbox-container">
      <!-- 지출별 -->
      <div class="bySpending">
        <BySpending />
      </div>
      <div class="right-column">
        <!-- 순이익 -->
        <div class="netProfit">
          <NetProfit />
        </div>
        <!-- 최신순 -->
        <div class="sortByLatest">
          <SortByLatest />
        </div>
      </div>
    </div>
    <!-- 감정별 -->
    <div class="byEmotion">
      <ByEmotion />
    </div>
  </div>
</template>

<script>
import SortByLatest from '@/components/SortByLatest.vue';
import ByEmotion from '@/components/ByEmotion.vue';
import NetProfit from '@/components/NetProfit.vue';
import BySpending from '@/components/BySpending.vue';

export default {
  name: 'Home',
  components: { SortByLatest, ByEmotion, NetProfit, BySpending },
};
</script>
<style scoped>
* {
  font-family: sans-serif;
}
.container-fluid {
  width: 1000px;
  max-width: none;
  min-height: 100vh;
  margin: 0 auto;
}

.flexbox-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: stretch;
}

/* 왼쪽 박스 */
.bySpending {
  background-color: white;
  /* padding: 2rem; */
  min-height: 420px;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  flex: 1;
  padding: 1rem;
  min-width: 200px;
}

/* 오른쪽 컬럼 */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.byEmotion {
  background-color: #fff;
  /* padding: 2rem; */
  width: 100%;
  padding: 1.5rem;

  height: 300px;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
/* 박스 스타일 공통 */
.netProfit,
.sortByLatest {
  background-color: #fae55f;
  /* opacity: 60%; */
  padding: 1.5rem;

  /* padding: 12rem 8rem; */
  min-height: 200px;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

/* 감정 영역 */
.byEmotion {
  width: 100%;
}
</style>

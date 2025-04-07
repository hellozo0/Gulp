<template>
  <div class="container-fluid">
    <div class="flexbox-container">
      <div class="bySpending"><h4>지출 상위 4개 항목</h4></div>
      <div class="right-column">
        <div class="netProfit">
          <h4>이번달은 얼마 남았을까요</h4>
          <br />
          <div class="d-flex justify-content-between">
            <p>수입</p>
            <p>원</p>
          </div>
          <div class="d-flex justify-content-between">
            <p>소비</p>
            <p>원</p>
          </div>
          <div class="d-flex justify-content-between">
            <p>순이익</p>
            <p>원</p>
          </div>
        </div>
        <div class="sortByLatest"><h4>4월 내역 최신순 조회</h4></div>
      </div>
    </div>
    <div class="byEmotion">byEmotion</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
  min-width: 200px;
}

/* 오른쪽 컬럼 */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.byEmotion {
  background-color: #fff;
  /* padding: 2rem; */
  width: 100%;
  height: 300px;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
/* 박스 스타일 공통 */
.netProfit,
.sortByLatest {
  background-color: #f9dc14;
  opacity: 60%;
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

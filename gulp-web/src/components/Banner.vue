<template>
  <div class="banner">
    <span class="text">
      당신의 소비 스타일을 고려한 대출 설계 도우미, 꿀깍이 도와드릴게요!
    </span>
    <button class="consult-button">상담 받으러 가기</button>
  </div>
</template>

<style scoped>
.banner {
  background-color: #f9dc14;
  color: black;
  padding: 12px 24px;
  display: flex;
  justify-content: center; /* 내부를 가운데로 */
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 0;
  box-sizing: border-box;
}

.text {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 23px;
  font-weight: 500;
}

.consult-button {
  margin-left: 16px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 9999px;
  padding: 4px 12px;
  background-color: transparent;
  cursor: pointer;
}

.consult-button:hover {
  background-color: #fcd400;
}
</style>

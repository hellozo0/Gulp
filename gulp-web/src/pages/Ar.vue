<template>
  <div class="container">
    <img src="../assets/images/Honey.png" alt="꿀깍 허니 캐릭터" />
    <h1>Honey와 함께하는 AR 서비스 체험</h1>
    <p>
      귀여운 꿀깍이 ‘허니’와 함께 대출, 이자와 같은 <br />
      어려운 금융 용어를<br />
      쉽고 재미있게 배워보세요!<br />
      '허니'와 사진도 찍을 수 있어요!!<br />
      <strong
        >Honey와 즐거운 경험을 가지고, 어려운 용어를 쉽게 알아가요!</strong
      >
    </p>
    <button class="btn" @click="goToWebcam">📷 AR 실행하기 (카메라)</button>
    <button class="btn" @click="goToSimulation">🌐 웹페이지에서 보기</button>

    <section class="info-section">
      <h2>📚 배울 수 있는 금융 용어</h2>
      <ul>
        <li>대출: 돈을 빌리는 것</li>
        <li>이자: 돈을 빌린 대가</li>
        <li>원금: 처음 빌린 돈</li>
        <li>금리: 돈을 빌릴 때 이자의 비율</li>
        <li>상환 방식: 돈을 갚는 방법 (만기일시, 원금균등, 원리금균등)</li>
      </ul>
    </section>

    <section class="info-section">
      <h2>👶 누구를 위한 서비스인가요?</h2>
      <p>
        초등학생도 쉽게 이해할 수 있도록 구성했어요!<br />
        그림과 캐릭터, 음성 안내까지 함께 제공되니까 걱정마세요!
      </p>
    </section>

    <section class="info-section">
      <h2>🎯 어떤 상황에서 활용해요?</h2>
      <p>
        금융 교육 수업, 가정에서 부모님과 함께, 혹은 친구들과 재미삼아도 OK!<br />
        허니와 함께 사진을 찍으며 배우는 즐거운 학습 시간을 가져보세요.
      </p>
    </section>
  </div>
</template>

<script setup>
const goToWebcam = () => {
  window.location.href = '/ar/photo';
};

const goToSimulation = () => {
  window.location.href = '/ar/classroom';
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: 390px;
  min-height: 100vh;
  margin: 0 auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

img {
  width: 200px;
  height: auto;
  margin-bottom: 24px;
}

h1 {
  font-size: 22px;
  margin-bottom: 16px;
  color: #333;
}

p {
  font-size: 16px;
  color: #555;
  margin: 0 20px 40px;
  line-height: 1.6;
}

.btn {
  display: block;
  width: 220px;
  margin: 10px auto;
  padding: 14px 20px;
  background-color: #ffe25c;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #ffd500;
}

.info-section {
  margin-top: 40px;
  max-width: 600px;
  background-color: #fff7d6;
  border-radius: 16px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section h2 {
  font-size: 18px;
  color: #444;
  margin-bottom: 10px;
}

.info-section ul {
  padding-left: 20px;
  color: #444;
  line-height: 1.6;
}

.info-section p {
  color: #444;
  line-height: 1.6;
}
</style>

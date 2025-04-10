<template>
  <div class="onboarding-wrapper">
    <!-- 기존 콘텐츠 -->

    <div class="onboarding-content" id="fullpage">
      <!-- 첫번째 요소  -->
      <div class="section contents fist-section">
        <h1 class="first-section-text">
          당신의 소비 스타일을 고려한 <br />
          대출 설계 도우미, 꿀깍
        </h1>
        <div class="sns-icons">
          <img src="@/assets/images/facebook_ic.png" alt="페이스북" />
          <img src="@/assets/images/instagram_ic.png" alt="인스타그램" />
          <img src="@/assets/images/twitter_ic.png" alt="트위터" />
          <img src="@/assets/images/youtube_ic.png" alt="유튜브" />
          <img src="@/assets/images/naver_ic.png" alt="네이버" />
        </div>
        <div class="money-icons">
          <img src="@/assets/images/onboarding_intro.png" alt="돈" />
        </div>
      </div>

      <!-- 두번째 요소  -->
      <div class="section contents fist-section">
        <div class="logo">
          <img src="@/assets/images/logo_center.png" alt="logo" />

          <div class="second-section-text">
            <p>나의 소비 습관을 확인하고,</p>
            <p>효율적인 대출금 상환을 도와주는</p>
            <p><strong>개인 맞춤형 서비스</strong></p>
            <p>언제 어디서나 간편하게</p>
            <p>기록하고 확인해보세요.</p>
          </div>
        </div>
      </div>
      <!-- 세번째 요소  -->
      <div class="section contents third-section"></div>
      <!-- 네번째 요소  -->
      <div class="section contents fourth-section"></div>
    </div>

    <!-- 플로팅 위로 올라가는버튼 -->
    <div class="create-container" @click="scrollToTop">
      <img src="@/assets/images/up_btn.png" alt="맨 위로" />
    </div>
  </div>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.contents {
  padding: 50px;
}

/* 첫번째 요소 */
.first-section-text {
  font-size: 60px;
  text-align: center;
  margin: 0 auto;
}

.sns-icons {
  padding: 40px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.money-icons {
  padding: 40px;
  display: flex;
  gap: 10px;
  justify-content: center;
  transform: translateX(-30px);
}

/* 두번째 요소 */
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
}

.logo img {
  width: 400px;
  height: auto;
}

.second-section-text {
  padding: 70px;
  align-items: center;
  text-align: center;
}

.second-section-text p {
  font-size: 50px;
  line-height: 1.4;
  margin: 6px 0;
  font-weight: 400;
}

/* 세번째 요소 */

.create-container {
  position: fixed;
  bottom: 50px;
  right: 100px;
  z-index: 1000;
  cursor: pointer;
}

.create-container img {
  width: 50px;
  height: 50px;
}
</style>

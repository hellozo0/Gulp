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
      <div class="section contents third-section backcolor">
        <div class="third-section-content-block">
          <h1 class="third-section-text">
            꿀깍의 공식 마스코트<br />
            허니와 머니를 소개합니다.
          </h1>

          <!-- 허니 소개 -->
          <div class="mascot-box honey">
            <img
              src="@/assets/images/Honey.png"
              alt="허니"
              class="mascot-img"
            />
            <div class="mascot-info">
              <p class="name"><strong>이름:</strong> 허니</p>
              <p><strong>MBTI:</strong> ENFJ</p>
              <p>
                <strong>특징:</strong> 착하고 온순한 성격의 대출 상환 길잡이!<br />
                당신의 소비 습관을 따뜻하게 이해하고,<br />
                부담 없이 상환할 수 있도록 도와줘요 💛
              </p>
            </div>
          </div>

          <!-- 머니 소개 -->
          <div class="mascot-box money">
            <img
              src="@/assets/images/AngryMoney.png"
              alt="머니"
              class="mascot-img"
            />
            <div class="mascot-info">
              <p class="name"><strong>이름:</strong> 머니</p>
              <p><strong>MBTI:</strong> ISTJ</p>
              <p>
                <strong>특징:</strong> 조금 빡세지만 믿음직한 절약 설계자!<br />
                계획적이고 철두철미하게 예산을 관리하고<br />
                당신의 금전 감시관 역할을 해줘요 💰
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 네번째 요소  -->
      <div class="section contents fourth-section">
        <div class="home-wrapper">
          <div class="home-left">
            <h2>소비 통계</h2>
            <p>
              한달 동안의 나의 소비 통계를 확인할 수 있어요.<br />
              카테고리별 소비 유형을 확인하고<br />
              후회하는 소비들을 줄여봐요.<br />
              대출이 있다면 소비패턴에 따른 상환여력을<br />
              자동으로 계산해 드려요.
            </p>
            <div class="service-link">서비스 바로가기 →</div>
          </div>

          <div class="home-right">
            <img src="@/assets/images/home_page.png" alt="홈페이지 미리보기" />
          </div>
        </div>
      </div>

      <!-- 다섯번째 요소  -->
      <div class="section contents fifth-section backcolor">
        <div class="home-wrapper fifth-content">
          <div class="home-left">
            <h2>전체 내역</h2>
            <p>
              기록했던 모든 소비내역을 확인할 수 있어요.<br />
              원하는 기간 사이의 내역들만 따로 보고 싶다면<br />
              필터를 통해 확인해 보세요.<br />
              카테고리별 소비내역들도 확인할 수 있어요.
            </p>
            <div class="service-link-gray">서비스 바로가기 →</div>
          </div>

          <div class="home-right">
            <img src="@/assets/images/home_page.png" alt="홈페이지 미리보기" />
          </div>
        </div>
      </div>

      <!-- 여섯번째 요소  -->
      <div class="section contents sixth-section">
        <div class="home-wrapper">
          <div class="home-left">
            <h2>대출 현황</h2>
            <p>
              기록했던 모든 소비내역을 확인할 수 있어요.<br />
              원하는 기간 사이의 내역들만 따로 보고 싶다면<br />
              필터를 통해 확인해 보세요.<br />
              카테고리별 소비내역도 확인할 수 있어요.<br />
            </p>
            <div class="service-link">서비스 바로가기 →</div>
          </div>

          <div class="home-right">
            <img src="@/assets/images/home_page.png" alt="홈페이지 미리보기" />
          </div>
        </div>
      </div>

      <!-- 일곱번째 요소  -->
      <div class="section contents seventh-section">
        <div class="sns-icons">
          <img
            class="sns-icons-big"
            src="@/assets/images/facebook_ic.png"
            alt="페이스북"
          />
          <img
            class="sns-icons-big"
            src="@/assets/images/instagram_ic.png"
            alt="인스타그램"
          />
          <img
            class="sns-icons-big"
            src="@/assets/images/twitter_ic.png"
            alt="트위터"
          />
          <img
            class="sns-icons-big"
            src="@/assets/images/youtube_ic.png"
            alt="유튜브"
          />
          <img
            class="sns-icons-big"
            src="@/assets/images/naver_ic.png"
            alt="네이버"
          />
        </div>
        <div class="footer-tags">
          <span># 소비기록</span>
          <span># 대출현황</span>
          <span># 꿀깍</span>
          <span># 절약습관</span>
        </div>
      </div>

      <!-- 마지막 추천 컨텐츠 -->
      <div class="section contents last-section">
        <div class="recommend-wrapper">
          <h2 class="recommend-title">추천 콘텐츠</h2>

          <div class="recommend-cards">
            <!-- 카드 1 -->
            <div class="recommend-card">
              <p class="card-sub">오직 멤버십으로 누리는 혜택</p>
              <h3 class="card-title">
                빠른 대출금 상환<br />방법이 궁금하다면?
              </h3>
              <img src="@/assets/images/loan_repayment.png" alt="대출상환" />
              <div class="plus-icon">＋</div>
            </div>

            <!-- 카드 2 -->
            <div class="recommend-card">
              <p class="card-sub">오직 멤버십으로 누리는 혜택</p>
              <h3 class="card-title">
                후회하는 소비습관<br />컨설팅 받는 방법!
              </h3>
              <img src="@/assets/images/talking.png" alt="소비컨설팅" />
              <div class="plus-icon">＋</div>
            </div>
          </div>
        </div>
      </div>
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
  padding: 150px 50px 150px 50px;
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
  padding-top: 100px;
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

.backcolor {
  background-color: #f5f5f5 !important;
  width: 100vw; /* 브라우저 전체 너비 */
  margin: 0;
  padding: 0;
}

.third-section-text {
  font-size: 60px;
  padding: 50px;
  align-items: center;
  text-align: center;
}

.third-section-content-block {
  padding-top: 200px;
  padding-bottom: 200px;
  background-color: #f5f5f5;
}

.mascot-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  margin-bottom: 60px;
  flex-wrap: wrap;
  padding-bottom: 50px;
}

.mascot.honey {
  flex-direction: row;
}

.mascot-box.money {
  flex-direction: row-reverse; /* 이미지 오른쪽 */
}

.mascot-img {
  width: 400px;
  height: auto;
}

.mascot-info {
  text-align: left;
  max-width: 1000px;
  font-size: 30px;
  line-height: 1.6;
}

/* 4번쨰*/
.home-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 40px;
  gap: 140px;
  /* background-color: #fff; */
  flex-wrap: wrap;
}

.fourth-section {
  padding-top: 200px;
  padding-bottom: 200px;
}

.home-left {
  max-width: 1000px;
}

.home-left h2 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 24px;
}

.home-left p {
  font-size: 22px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 30px;
  max-width: 800px;
}

.service-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #f5f5f5;
  border-radius: 30px;
  font-weight: 600;
  font-size: 25px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.service-link:hover {
  background-color: #eaeaea;
}

.home-right img {
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
/* 5번쨰*/

.fifth-content {
  padding-top: 300px;
  padding-bottom: 300px;
}

.service-link-gray {
  display: inline-block;
  padding: 12px 24px;
  background-color: white;
  border-radius: 30px;
  font-weight: 600;
  font-size: 25px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.service-link-gray:hover {
  background-color: #eaeaea;
}

/* 6번쨰*/
.sixth-section {
  padding-top: 300px;
  padding-bottom: 30px;
}

/* 7번쨰*/
.sns-icons img {
  width: 40px;
  height: 40px;
}

.footer-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-tags span {
  background-color: #d9d9d9;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 25px;
  font-weight: 500;
  color: #333;
}
/* 마지막 요소 */
.last-section {
  background-color: #fff;
  padding: 150px 40px;
  text-align: center;
}

.recommend-title {
  font-size: 40px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 60px;
  margin-left: 430px;
}

.recommend-cards {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.recommend-card {
  position: relative;
  background-color: #fff6d6;
  padding: 30px 30px 40px;
  border-radius: 36px;
  width: 500px;
  height: 500px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  text-align: left;
  transition: transform 0.2s;
}

.recommend-card:hover {
  transform: translateY(-6px);
}

.card-sub {
  color: #f26a3e;
  font-size: 23px;
  font-weight: 500;
  margin-bottom: 10px;
}

.card-title {
  font-size: 40px;
  /* font-weight: 700; */
  line-height: 1.4;
  margin-bottom: 20px;
}

.recommend-card img {
  width: 100%;
  max-height: 240px;
  object-fit: contain;
  margin-top: 20px;
}

.plus-icon {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 40px;
  font-weight: bold;
  color: #000;
}
/* 기타 */

.create-container {
  position: fixed;
  bottom: 50px;
  right: 100px;
  z-index: 1000;
  cursor: pointer;
}

.create-container img {
  width: 100px;
  height: 100px;
}
</style>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <section class="newsletter">
        <p class="heading">꿀깍의 앞으로의 행보가 궁금하다면?</p>
        <div class="input-wrap">
          <div class="input-row">
            <input
              type="text"
              placeholder="Your email address"
              class="email-custom"
            />
            <button class="subscribe-btn">뉴스 레터 구독</button>
          </div>
          <label class="checkbox">
            <img src="@/assets/images/check_ic.png" alt="check" />
            <span class="consent-text"
              >개인정보 수집 및 이용과 광고성 정보 수신 동의</span
            >
          </label>
        </div>
      </section>
      <section class="info-grid">
        <div>
          <h3>Notice</h3>
          <p>[당첨자 발표] 꿀깍 런칭 감사 2벤트</p>
          <h3>FAQ</h3>
          <p>궁금한 사항을 모아 한번에 보여드립니다.</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>
            원하는 주제를 건의하거나 궁금한 점을 문의하고 싶을 때 <br />광고,
            마케팅, 컨설팅 문의도 환영합니다.
          </p>
        </div>
        <div>
          <h3>About 꿀깍</h3>
          <p>
            당신의 소비 스타일을 고려한 대출 설계 도우미, 꿀깍이 도와드릴게요!
          </p>
        </div>
      </section>
      <section class="bottom-bar">
        <div class="rules">
          <div class="links">
            사업자 정보 | 개인정보처리방침 | 이용약관 | 저작권 정책 |
            청소년보호정책
          </div>
          <div class="copyright">© GULP. ALL RIGHTS RESERVED.</div>
        </div>

        <div class="sns-icons">
          <img src="@/assets/images/facebook_ic.png" alt="페이스북" />
          <img src="@/assets/images/instagram_ic.png" alt="인스타그램" />
          <img src="@/assets/images/twitter_ic.png" alt="트위터" />
          <img src="@/assets/images/youtube_ic.png" alt="유튜브" />
          <img src="@/assets/images/naver_ic.png" alt="네이버" />
        </div>
      </section>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f8f8;
  padding: 130px 40px;
  width: 100vw;
  font-family: 'Inter', sans-serif;
  color: #333;
  border-top: 1px #ddd;
  margin-top: 20rem;
  overflow-x: hidden;
}

.footer-inner {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
}

.newsletter {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24px;
}

.heading {
  font-size: 30px;
  font-weight: bold;
}

.input-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  flex: 2;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
}

.email-custom {
  border: none;
  border-bottom: 1px solid #555;
  background: transparent;
  font-style: italic;
  padding: 8px 4px;
  font-size: 14px;
  flex: 1;
  outline: none;
}

.subscribe-btn {
  border: 1px solid #333;
  background: none;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox {
  margin-top: 8px;
  font-size: 13px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.info-grid {
  padding-top: 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 40px;
}

.info-grid h3 {
  font-size: 20px;
  font-weight: 510;
  color: #e26b00;
  margin-bottom: 8px;
}

.info-grid p {
  padding-top: 10px;
  font-size: 16px;
}

.bottom-bar {
  padding-top: 30px;
  font-size: 14px;
  color: #777;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.links,
.copyright,
.sns-icons {
  display: inline-flex;
  align-items: center;
}

.copyright {
  padding-left: 20px;
  font-size: 10px;
}

.sns-icons > * {
  padding: 0 5px;
}
</style>

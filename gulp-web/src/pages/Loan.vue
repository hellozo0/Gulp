<template>
  <div class="container">
    <div class="info">
      <img src="../assets/images/SmileMoeny.png" id="SmileMoney" /><br />
      <div class="speech help-info2">
        꿀깍의 '머니'가 대출 상환 날짜를 알려드려요!
      </div>
    </div>
    <div class="total">
      <div class="totaltext">
        <div class="help-info">총 상환 예정 금액</div>
      </div>
      <img src="../assets/images/percentage.png" alt="" id="percentage" />
    </div>
    <div class="history">
      <div class="loan-card-row">
        <div class="loan-card">
          <br />
          <table>
            <tbody>
              <tr>
                <td style="display: flex; align-items: center; gap: 10px">
                  <img src="../assets/loan/kb.png" alt="" id="card-image" />
                  <div>
                    <h3><strong>KB국민은행</strong></h3>
                    <p id="bottom">신용대출</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td><p id="bottom2">잔여 대출액</p></td>
                <td>
                  <p id="bottom2" style="margin-left: 1rem">금리</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h2><strong>10,000,000원</strong></h2>
                </td>
                <td>
                  <h3
                    style="color: green; font-weight: bold; margin-left: 1rem"
                  >
                    5.27%
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="loan-card">
          <br />
          <table>
            <tbody>
              <tr>
                <td style="display: flex; align-items: center; gap: 10px">
                  <img src="../assets/loan/kb.png" alt="" id="card-image" />
                  <div>
                    <h3><strong>KB국민카드</strong></h3>
                    <p id="bottom">신용대출</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td><p id="bottom2">이번달</p></td>
                <td>
                  <p id="bottom2" style="margin-left: 1rem">결제일</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h2><strong>373,000원</strong></h2>
                </td>
                <td>
                  <h3 style="color: red; font-weight: bold; margin-left: 1rem">
                    D-3
                  </h3>
                  <h3 style="margin-left: 1rem">2025.04.20</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="loan-card-row">
        <div class="loan-card" style="background-color: rgb(161, 235, 152)">
          <br />
          <table>
            <tbody>
              <tr>
                <td style="display: flex; align-items: center; gap: 10px">
                  <img src="../assets/loan/hn.png" alt="" id="card-image" />
                  <div>
                    <h3><strong>하나카드</strong></h3>
                    <p id="bottom">신용대출</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td><p id="bottom2">이번달</p></td>
                <td>
                  <p id="bottom2" style="margin-left: 1rem">결제일</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h2><strong>373,000원</strong></h2>
                </td>
                <td>
                  <h3 style="color: red; font-weight: bold; margin-left: 1rem">
                    D-3
                  </h3>
                  <h3 style="margin-left: 1rem">2025.04.20</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="loan-card" style="background-color: rgb(189, 223, 255)">
          <br />
          <table>
            <tbody>
              <tr>
                <td style="display: flex; align-items: center; gap: 10px">
                  <img src="../assets/loan/sh.png" alt="" id="card-image" />
                  <div>
                    <h3><strong>신한카드</strong></h3>
                    <p id="bottom">신용대출</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td><p id="bottom2">이번달</p></td>
                <td>
                  <p id="bottom2" style="margin-left: 1rem">결제일</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h2><strong>373,000원</strong></h2>
                </td>
                <td>
                  <h3
                    style="color: orange; font-weight: bold; margin-left: 1rem"
                  >
                    D-10
                  </h3>
                  <h3 style="margin-left: 1rem">2025.04.20</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="plan">
      <SavingPlan />
    </div>
    <div class="membership">
      <div class="help-info">
        <strong
          >당신의 소비 스타일을 고려한 대출상환 도우미, 꿀깍이
          도와드릴게요!</strong
        >
      </div>
      <br /><br /><br /><br />
      <div class="help-info2">
        꿀깍이 님에게 최적화된 소비 분석을 통해 빠른 대출 상환을 위한 맞춤형
        플랜을 알고 싶다면?
      </div>
      <br /><br />
      <button type="button" class="btn btn-warning">Click ME !</button>
    </div>
  </div>
</template>

<script>
import SavingPlan from "@/components/SavingPlan.vue";

export default {
  name: "LoanHistory",
  components: { SavingPlan },
};
</script>

<style scoped>
/* 메인 컨테이너 */
.container {
  width: 95%;
  max-width: 390px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* 상단 정보 섹션 */
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  margin: 2rem;
}

.speech {
  position: relative;
  background: #fad96b;
  border-radius: 2rem;
  padding: 1.5rem 1.5rem;
  font-weight: bold;
  white-space: normal;
  word-break: keep-all;
  max-width: 100%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
}

/* 총 상환 예정 금액 섹션 */
.total {
  background-color: rgb(240, 239, 239);
  padding: 2rem;
  padding-top: 15rem;
  padding-bottom: 15rem;
  margin-bottom: 10rem;
  margin-top: 10rem;
  text-align: center;
}

.totaltext {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

/* 대출 내역 섹션(카드) */
.history {
  padding: 2rem;
}

.loan-card-row {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.loan-card {
  background-color: #fad96b;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  min-height: 80px;
}

.loan-card h3 {
  font-size: 14px;
  margin: 0.2rem 0;
  clear: left;
}

.loan-card p strong {
  font-size: 14px;
}

.loan-card h2 {
  font-size: 18px;
  margin: 0.2rem 0;
}

.loan-card table {
  width: 100%;
}

.loan-card td {
  padding: 0.1rem 0;
}

/* 저축 플랜 섹션 */
.plan {
  background-color: rgb(240, 239, 239);
}

/* 멤버십 섹션 */
.membership {
  text-align: center;
  padding: 2rem;
}

button {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  margin: 1rem;
  border-radius: 2rem;
  font-weight: bold;
}

button:hover {
  transform: scale(1.3);
  transition: transform 0.3s ease;
  cursor: pointer;
  background-color: #fad96b;
  color: #9e5f00;
}

/* 이미지 스타일 */
#SmileMoney {
  width: 10rem;
  height: auto;
  margin-bottom: 1rem;
}

#card-image {
  width: 2rem;
}

#percentage {
  width: 100%;
  max-width: 350px;
}

/* 텍스트 스타일 */
.help-info {
  font-size: 20px;
}

.help-info2 {
  font-size: 12px;
  text-align: center;
}

#bottom {
  font-size: 12px;
  color: rgb(85, 84, 84);
}

#bottom2 {
  font-size: 14px;
  font-weight: bold;
}
</style>

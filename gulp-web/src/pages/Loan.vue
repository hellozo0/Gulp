<template>
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
        <img src="../assets/loan/kb.png" alt="" id="kb" />
        <h3><strong>KB국민은행</strong></h3>
        <p id="bottom">신용대출</p>
        <br />
        <table>
          <tbody>
            <tr>
              <td><p id="bottom2">잔여 대출액</p></td>
              <td>
                <p id="bottom2" style="margin-left: 8rem">금리</p>
              </td>
            </tr>
            <tr>
              <td>
                <h2><strong>10,000,000원</strong></h2>
              </td>
              <td>
                <h3 style="color: green; font-weight: bold; margin-left: 7rem">
                  5.27%
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="loan-card">
        <img src="../assets/loan/kb.png" alt="" id="kb" />
        <h3><strong>KB국민카드</strong></h3>
        <p id="bottom">신용대출</p>
        <br />
        <table>
          <tbody>
            <tr>
              <td><p id="bottom2">이번달</p></td>
              <td>
                <p id="bottom2" style="margin-left: 10rem">결제일</p>
              </td>
            </tr>
            <tr>
              <td>
                <h2><strong>373,000원</strong></h2>
              </td>
              <td>
                <h3 style="color: red; font-weight: bold; margin-left: 10.8rem">
                  D-3
                </h3>
                <h4 style="margin-left: 8.5rem">2025.04.20</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="loan-card-row">
      <div class="loan-card" style="background-color: rgb(161, 235, 152)">
        <img src="../assets/loan/hn.png" alt="" id="kb" />
        <h3><strong>하나카드</strong></h3>
        <p id="bottom">신용대출</p>
        <br />
        <table>
          <tbody>
            <tr>
              <td><p id="bottom2">이번달</p></td>
              <td>
                <p id="bottom2" style="margin-left: 10rem">결제일</p>
              </td>
            </tr>
            <tr>
              <td>
                <h2><strong>373,000원</strong></h2>
              </td>
              <td>
                <h3 style="color: red; font-weight: bold; margin-left: 10.8rem">
                  D-3
                </h3>
                <h4 style="margin-left: 8.5rem">2025.04.20</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="loan-card" style="background-color: rgb(189, 223, 255)">
        <img src="../assets/loan/sh.png" alt="" id="kb" />
        <h3><strong>신한카드</strong></h3>
        <p id="bottom">신용대출</p>
        <br />
        <table>
          <tbody>
            <tr>
              <td><p id="bottom2">이번달</p></td>
              <td>
                <p id="bottom2" style="margin-left: 10rem">결제일</p>
              </td>
            </tr>
            <tr>
              <td>
                <h2><strong>373,000원</strong></h2>
              </td>
              <td>
                <h3
                  style="color: orange; font-weight: bold; margin-left: 10.3rem"
                >
                  D-10
                </h3>
                <h4 style="margin-left: 8.5rem">2025.04.20</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br /><br />
    <h2 style="margin-left: 48%" id="more">더보기<br />&nbsp;&nbsp;&nbsp;▼</h2>
  </div>
  <div class="plan">
    <SavingPlan />
  </div>
  <div class="membership">
    <div class="help-info">
      <strong
        >당신의 소비 스타일을 고려한 대출상환 도우미,<br />
        꿀깍이 도와드릴게요!</strong
      >
    </div>
    <br /><br /><br /><br />
    <div class="help-info2">
      꿀깍이 님에게 최적화된 소비 분석을 통해 <br />빠른 대출 상환을 위한<br />
      맞춤형 플랜을 알고 싶다면?
    </div>
    <br /><br />
    <button type="button" class="btn btn-warning">Click ME !</button>
  </div>
</template>
<script>
import SavingPlan from '@/components/SavingPlan.vue';

export default {
  name: 'LoanHistory',
  components: { SavingPlan },
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  margin: 20rem;
}

/* 이미지 */
#SmileMoney {
  width: 30rem;
  height: auto;
  margin-bottom: 1rem;
}

#kb {
  width: 10rem;
  margin-bottom: 1rem;
  margin-right: 2rem;
  float: left;
}

#bottom {
  font-size: 1.5rem;
  color: rgb(85, 84, 84);
}
#bottom2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.speech {
  position: relative;
  background: #fad96b;
  border-radius: 4rem;
  padding: 4rem 5rem;
  font-size: 1.5rem;
  font-weight: bold;
  white-space: normal;
  word-break: keep-all;
  max-width: 80%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  margin-bottom: 5rem;
}

.total,
.plan {
  background-color: rgb(240, 239, 239);
  /* background-color: rgb(161, 235, 152); */
  padding: 20rem;
  margin-bottom: 1rem;
}

.history {
  padding: 20rem;
}

.loan-card-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
}

.loan-card {
  background-color: #fad96b;
  border-radius: 10px;
  padding: 2rem;
  width: 45rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 1rem;
}
.loan-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  cursor: pointer;
}

#more:hover {
  color: #ad6565;
  cursor: pointer;
}
table {
  margin-left: 3rem;
}

/* membership */
.membership {
  text-align: center;
  padding: 20rem;
}
.help-info {
  font-size: 4rem;
}
.help-info2 {
  font-size: 3rem;
  text-align: center;
}

button {
  padding: 2rem 8rem;
  font-size: 2rem;
  margin: 3rem;
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

/* total */
.total {
  text-align: center;
}
.totaltext {
  display: flex;
  justify-content: space-between;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20rem;
  padding-left: 30rem;
  padding-right: 30rem;
}
#percentage {
  /* display: flex;
  justify-content: center; */
  width: 90rem;
  /* margin-left: 22%; */
}
</style>

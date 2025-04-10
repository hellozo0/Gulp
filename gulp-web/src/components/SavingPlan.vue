<template>
  <div class="container">
    <div class="help-info">
      <strong>꿀깍이 님에게 추천드리는 절약 소비 플랜</strong>
    </div>
    <br />
    <h3>지난달보다 "후회"소비에 {{}}원 더 사용했어요 !</h3>
    <!-- <h4>지난달보다 "{{}}"소비에 {{}}원 덜 사용했어요 !</h4> -->
    <br /><br /><br /><br />
    <div class="diff">
      <img src="../assets/images/saving-graph.png" alt="" id="saving" />
    </div>
    <img src="../assets/images/AngryMoney.png" alt="" />
    <!-- <img src="../assets/images/HappyMoney.png" alt="" /> -->
  </div>
</template>
<script>
export default {
  name: 'SavingPlan',
};
</script>
<style>
.diff {
  padding: 10rem;
}
.help-info {
  font-size: 3.5rem;
}
#saving {
  float: right;
}
h3 {
  font-weight: bold;
}
</style>

<template>
  <div class="container">
    <div class="help-info">
      <strong
        >꿀깍이 님에게 추천드리는<br />
        절약 소비 플랜</strong
      >
    </div>
    <br />
    <h3>지난달보다 "후회"소비에 <br />{{}}원 더 사용했어요 !</h3>
    <!-- <h4>지난달보다 "{{}}"소비에 {{}}원 덜 사용했어요 !</h4> -->
    <br /><br /><br /><br />
    <div class="diff">
      <img src="../assets/images/saving-graph.png" alt="" id="saving" />
      <img src="../assets/images/AngryMoney.png" alt="" class="money-image" />
    </div>
  </div>
  <!-- <img src="../assets/images/HappyMoney.png" alt="" /> -->
</template>

<script>
export default {
  name: "SavingPlan",
};
</script>

<style>
.container {
  margin-top: 10rem;
  margin-bottom: 10rem;
  padding-top: 10rem;
  padding-bottom: 10rem;
}

.help-info {
  font-size: 1.3rem;
}

.diff {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

#saving {
  width: 120px;
  height: auto;
}

.money-image {
  width: 100px;
  height: auto;
}

h3 {
  font-weight: bold;
  font-size: 12px;
}
</style>

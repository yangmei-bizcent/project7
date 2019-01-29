<template>
  <div class="cancelSuccess">
    <div class="resultImg">
      <img src="../../assets/img/zjkjQRCode.png" />
    </div>
    <p class="resultTip">注销成功，若继续使用，请注册账号</p>
    <el-button type="primary" @click="authenStepTwo(3-2)">立即注册</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false
      };
    },
    methods: {
      authenStepTwo() {
        this.$router.push("/authentication/authenStepTwo/add");
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "personalCenter.scss";

</style>

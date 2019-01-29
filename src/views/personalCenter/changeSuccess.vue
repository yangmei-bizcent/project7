<template>
  <div class="changeSuccess personalCenter result main_layout">
    <div class="page-title"></div>
    <div class="content-wrap bg-white">
      <div class="wrapper">
        <div class="resultImg"><i class="el-icon-circle-check"></i></div>
        <p class="resultTip">修改成功</p>
        <p class="resultTip-vice">此登录状态失效，请重新登录</p>
        <el-button class="next-button" type="primary" @click="goToLogin">立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.resultTip {
  color: #04730E;
}
.wrapper {
  margin: 80px auto 209px;
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "personalCenter.scss";
</style>

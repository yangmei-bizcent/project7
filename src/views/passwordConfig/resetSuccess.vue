<template>
  <div class="bind-result main_layout">
    <div class="page-title">
    </div>
    <div class="bind-result-content">
      <div v-if="bindSuccess">
        <div class="success-img">
          <img src="../../assets/img/Group.png">
        </div>
        <p class="result-title">重置密码成功</p>
        <p class="result-text">请谨记新密码，防止再次丢失</p>
        <el-button type="success" @click="$router.push('/')">返回首页，登录平台</el-button></br>
      </div>

      <div v-else>
        <div class="success-img">
          <i class="el-icon-error"></i>
        </div>
        <p class="result-title">{{failReason}}</p>
        <p class="result-text">机构认证后，可享受更多功能</p>
        <el-button type="success" @click="$router.go(-1)">重新绑定</el-button></br>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bindSuccess: true,
    };
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
.bind-result {
  .bind-result-content {
    padding-top: 124px;
    height: 664px;
    min-width: 900px;
    background-color: #ffffff;
    text-align: center;
    .success-img {
      width: 60px;
      height: 60px;
      margin: 0 auto 50px auto;
      font-size: 60px;
      line-height: 60px;
      color: #999999;
    }

    p {
      text-align: center;
    }

    .result-title {
      font-size: 24px;
      color: #04730E;
      letter-spacing: 0.3px;
    }

    .result-text {
      width: 480px;
      font-size: 16px;
      color: #666666;
      letter-spacing: 0.2px;
      margin: 30px auto 60px auto;
    }

    .el-button.el-button--success {
      width: 400px;
      height: 46px;
      background-color: #09b52d;
      // margin: 40px auto auto auto;
    }
  }
}
</style>

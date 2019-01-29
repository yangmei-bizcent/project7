<template>
  <div class="bind-result main_layout">
    <div class="page-title">
    </div>
    <div class="bind-result-content">
      <div>
        <div class="success-img">
          <img src="../../assets/img/Group.png">
        </div>
        <p class="result-title">发布成功</p>
        <p class="result-text">配置微官网完成，发布更新至服务号</p>
        <el-button type="success" @click="$router.push({path: '/dynamicMicroWeb/dynamicMicroWeb'})">确认返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dynamicfunctype: '',
      };
    },
    created() {
      this.dynamicfunctype = this.$route.query.dynamicfunctype;
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
        /* margin: 40px auto auto auto; */
      }
    }
  }

</style>

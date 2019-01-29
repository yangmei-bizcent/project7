<template>
  <div class="operate-result">
    <div class="page-title">
      <span>发布结果</span>
    </div>
    <div class="bind-result-content">
      <div>
        <div class="success-img">
          <img v-if="operateSuccess" src="../assets/img/Group.png">
          <i v-else class="el-icon-error"></i>
        </div>
        <p class="result-title">{{ operateSuccess?successMainText:failMainText }}</p>
        <p class="result-text">{{ operateSuccess?successSubText:failSubText }}</p>
        <el-button 
            v-if="operateSuccess" 
            type="success" 
            @click="successBack">确认返回</el-button>
        <el-button 
            v-else 
            type="success" 
            @click="publishAgain">重新发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //   operateSuccess: true,
      successMainText: '配置自定义菜单完成，发布更新至服务号成功',
      failMainText: '发布自定义菜单出了一些小问题，请稍后再试...',
      successSubText: '',
      failSubText: '请检查网络或者刷新页面',
    };
  },
  props: ['operateSuccess'],
  methods: {
      successBack() {
          this.$emit('successBack');
      },
      publishAgain() {
          this.$emit('publishAgain');
      },
  },
  components: {}
};
</script>

<style lang='scss' scoped>
.operate-result {
  .bind-result-content {
    padding-top: 124px;
    width: 83.3%;
    height: 664px;
    margin: 30px auto;
    width: 83.3%;
    // min-width: 1200px;
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
      color: #333333;
      letter-spacing: 0.3px;
    }

    .result-text {
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

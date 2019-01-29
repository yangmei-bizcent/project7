<template>
  <div class="bind-result main_layout">
    <div class="page-title">
      <span>解除绑定</span>
    </div>
    <div class="bind-result-content">
      <div v-if="bindSuccess">
        <div class="success-img">
          <img src="../assets/img/Group.png">
        </div>
        <p class="result-title">{{userGatewayInfo.phone}}解除绑定成功</p>
        <p class="result-text">解除微信绑定成功</p>
        <el-button type="success" @click="$router.push('/personalCenter/accountManage')">返回账号管理</el-button></br>
      </div>

      <div v-else>
        <div class="success-img">
          <i class="el-icon-error"></i>
        </div>
        <p class="result-title">{{failReason}}</p>
        <p class="result-text">机构认证后，可享受更多功能</p>
        <el-button type="success" @click="$router.go(-1)">重新解除绑定</el-button></br>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  computed: {
      ...mapState({
        userGatewayInfo: state => state.user.userGatewayInfo,
        unBindRes: state=>state.user.unBindRes
      }),
      ...mapGetters({}),
    },
  async created(){
    await this.$store.dispatch({type: 'wechatUnBind'}).then(()=>{
      this.bindSuccess = this.unBindRes.status;
      this.failReason = this.unBindRes.message;
    });
    await this.$store.dispatch({type: 'getUserGateway'});
  },
  data() {
    return {
      bindSuccess: true,
      failReason: '解除绑定出现故障，请重新绑定',
      prevPage: this.$route.params
    };
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
.bind-result {
  .bind-result-content {
    min-width: 900px;
    padding-top: 124px;
    height: 664px;
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

<template>
  <div class="register-success main_layout">
    <div class="success-content">
      <div class="success-img">
        <img src="../assets/img/Group.png">
      </div>
      <p class="success-title">{{$route.query.phone}}注册成功</p>
      <p class="success-text">绑定微信，可以使用微信扫码登录互联网医院开放平台，若稍后绑定，请先去认证机构</p>
      <el-button type="success" @click="toBind">绑定微信</el-button><br>
      <el-button @click="$router.push('/authentication/authenStepOne')">去认证</el-button><br>
      <!-- <el-button type="success" @click="$router.push('/')">返回首页</el-button> -->
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        accountNumber: ''
      }
    },
    computed: {
      ...mapGetters({
        userName: 'userName',
        orgname: 'orgname',
        orgstate: 'orgstate',

      })
    },
    created(){

    },
    methods: {
      toBind() {
        let query = this.$route.query;
        this.$router.push({
          path: '/bindWechat',
          query: {phone: query.phone}
        })
        },

    },
    components: {

    }
 }
</script>

<style lang='scss' scoped>
  .register-success {
    .success-content {
      min-width: 900px;
      padding-top: 124px;
      height: 664px;
      background-color: #ffffff;
      text-align: center;
      .success-img {
        width: 60px;
        height: 60px;
        margin: 0 auto 50px auto;
      }

      p {
        text-align: center;
      }

      .success-title {
        font-size: 24px;
        color: #04730E;
        letter-spacing: 0.3px;
        
      }

      .success-text {
        width: 480px;
        font-size: 16px;
        color: #666666;
        letter-spacing: 0.2px;
        margin: 30px auto 60px auto;
      }
      
      .el-button.el-button--success {
        width: 400px;
        height: 46px;
        background-color: #09B52D;
        // margin: 40px auto auto auto;
      }

      .el-button--default {
        width: 400px;
        height: 46px;
        margin-top: 20px;
      }
    }
  }
</style>

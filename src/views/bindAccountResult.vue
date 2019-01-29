<template>
  <div class="bind-result main_layout">
    <div class="page-title">
      <span>绑定结果</span>
    </div>
    <div class="bind-result-content">
      <div v-show="bindSuccess==true && bindState != 0">
        <div class="success-img">
          <img src="../assets/img/Group.png">
        </div>
        <!-- 绑定成功 -->
        <p class="result-title">{{phones}}绑定{{wechatName}}成功</p>
        <div>
          <p class="result-text">将可以使用微信登陆互联网医院开放平台</p>
          <el-button type="success" @click="$router.push('/')">去登录</el-button></br>
        </div>
      </div>
        
      <!-- 绑定失败 -->
      <div v-show="bindSuccess==false && bindState != 0">
        <div class="success-img">
          <i class="el-icon-error"></i>
        </div>
        <p class="result-title">{{failReason}}</p>
        <div>
          <p class="result-text">绑定账号后体验平台更多功能，之后便可以通过微信扫码或者账号密码登录</p>
          <el-button type="success" @click="$router.push('/')">去登录</el-button></br>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  computed: {
      ...mapState({
        wechatBindRes: state=>state.user.wechatBindRes,
        wechatAccountBindRes: state=>state.user.wechatAccountBindRes,
      }),
      ...mapGetters({  //mapGetters返回的是个对象
        orgstate: 'orgstate',
      })
    },
  created(){
    //console.log(this.orgstate, this.orgstate !== 0)
    let query = this.$route.query;
    //console.log(query)

      this.$store.dispatch({type: 'wechatAccountBind', 
      thirdInfo: {
        code: query.code, 
        phone: query.phone
      }}).then(()=>{
      this.bindState = 1
      this.bindSuccess = this.$store.state.user.wechatAccountBindRes.status;
      this.phones = query.phone;
      if(this.bindSuccess){
        this.wechatName = this.$store.state.user.wechatAccountBindRes.wxUser.nickname;
      }else{
        this.failReason = this.$store.state.user.wechatAccountBindRes.message;
      }
      // this.loading = false
    }).catch(() => {
      // this.loading = false
      //console.log("error", this.wechatBindRes)
    });
    
  },
  data() {
    return {
      wechatName: "",
      bindSuccess: false,
      bindState:0,
      failReason: '微信绑定中，请稍候......',
      phones: this.$route.query.state,
      // noOrganzation: !this.orgname,
      // loading: true
    };
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
.bind-result {
  .bind-result-content {
    padding-top: 91px;
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
      color: #333333;
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

    .el-button--default {
      width: 400px;
      height: 46px;
    }
  }
}
</style>

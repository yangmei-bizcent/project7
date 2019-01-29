<template>
  <div class="accountManage main_layout">
      <h4 class="title">账户管理</h4>
    <div class="accountManage_btn_list">
        <div class="top">
          <div class="loginPhone">登录手机号:{{userGatewayInfo.phone}}</div>
          <ul class="btn">
            <li>
                <span @click="phoneNumChange()">修改登录手机号</span>
            </li>
             <li>
                <span  @click="passwordChange()" >修改登录密码</span>
            </li>
          </ul>
         
        </div>
        <div class="bottom">
           <ul class="btn">
            <li>
              <template v-if="!isBindWechat">
                <span @click="wechatBind()">绑定微信</span>
              </template>
              <template v-else>
                <span @click="removeBinding()">解除微信绑定({{UserIdInfo.proj_code}})</span>
              </template>
            </li>
            
          </ul>
        </div>
        <!-- <el-button type="primary" plain @click="accountCancel()">注销账户</el-button> -->
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

  export default {
    async created() {
      await this.$store.dispatch({type: 'WechatBindStatus'});
      await this.$store.dispatch({type: 'getUserGateway'}).then(()=>{
        this.$store.dispatch({type: 'getUserByUserId', userId: this.userGatewayInfo.loginId});
      });
    },
    data() {
      return {};
    },
    methods: {
      phoneNumChange() {
        // window.open('#/personalCenter/phoneNumChange');
        this.$router.push("/personalCenter/phoneNumChange");
      },
      passwordChange() {
        // window.open('#/personalCenter/passwordChange');
        this.$router.push("/personalCenter/passwordChange");
      },
      wechatBind() {
        let query = this.$route.query;
        this.$router.push({
          path: '/bindWechat',
          query: {phone: this.userGatewayInfo.phone}
        })
      },
      removeBinding() {
        // window.open('#/removeBinding');
        this.$router.push("/removeBinding");
      }
    },
    computed: {
    ...mapState({
        userGatewayInfo: state => state.user.userGatewayInfo,
        isBindWechat: state => state.user.WechatBindStatus,
        UserIdInfo: state => state.user.UserIdInfo,
      }),
    ...mapGetters({}),
  }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "personalCenter.scss";
.accountManage{
  .top,.bottom{
    text-align: center;
  }
  .bottom{
    margin-top:60px;
    .btn{
      li{
        span{
          background:#fff;
          border: 1px solid #09B52D;
          color: #04730E;
        }
      }
    }
  }
  .loginPhone{
    font-size: 16px;
    color: #333333;
    margin-bottom: 24px;

  }
  .title{
    font-size: 24px;
    color: #333333;
    letter-spacing: 0.3px;
    line-height: 36px;
    font-weight: 400;
    margin-bottom: 30px; 
     }
  .accountManage_btn_list{
    background: #fff;
    padding:80px 0 50px;
  }
  .btn{
    li{
      margin-bottom: 30px;
      span{
        width:400px;
        height: 46px;
        line-height: 46px;
        background: #09B52D;
        border-radius: 4px;
        display: inline-block;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>

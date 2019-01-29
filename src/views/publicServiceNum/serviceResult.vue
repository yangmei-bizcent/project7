<template>
  <div class="serviceResult main_layout">
    <div class="page-title"></div>
    <div class="bg-white">
      <div class="wrapper">
        <template v-if="!bindInfo.isBind && flag">
          <i class="icon el-icon-warning"></i>
          <p class="result-text">授权不通过</p>
          <p class="result-text-vice">错误原因：{{bindInfo.errmsg}}</p>
          <p class="result-text-vice">若有疑问，请点击 <el-button class="help-center" type="text">帮助中心</el-button></p>
          <el-button class="to-authorization" type="primary" @click="toAuthorization">再次授权</el-button>
        </template>
        <template v-else-if="flag">
          <i class="icon el-icon-circle-check"></i>
          <p class="result-text">授权成功</p>
          <p class="result-text-vice">点击确定，配置您的服务号</p>
          <el-button class="to-index" type="primary" @click="toIndex">确定</el-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
 import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        flag: false
      }
    },
    computed: {
      ...mapState({
        bindInfo: state => state.application.bindInfo
      })
    },
    async mounted() {
      if (this.$route.query.auth_code){
        await this.bindWechatInfo({authCode: decodeURIComponent(this.$route.query.auth_code)})
        this.flag = true
        this.chooseOrg({req:{org_id:JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId}})
      } else {
        this.$router.push('/');
      }      
    },
    methods:{
      ...mapActions(["bindWechatInfo","chooseOrg"]),
      toIndex(){
        this.$router.push({path:'/publicServiceNum/serviceNumIndex'});
      },
      toAuthorization(){
        this.$router.push({path:'/publicServiceNum/serviceAuthorization'});
      }
    }
  }
</script>

<style lang="scss" scoped>
.bg-white {
  background: #FFF;
  overflow: hidden;
}
.wrapper {
  width: 400px;
  margin: 160px auto 222px;
  min-height: 298px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    letter-spacing: 0.2px;
  }
  button {
    font-size: 16px;
  }
}
.icon {
  font-size: 60px;
  margin-bottom: 50px;
}
.el-icon-warning {
  color: #999;
}
.el-icon-circle-check {
  color: #09B52D;
}
.result-text {
  font-size: 24px;
  color: #333;
}
.result-text-vice {
  font-size: 16px;
  color: #666;
  margin: 30px auto 60px;
}
.help-center {
  padding: 0;
  min-width: 0;
  text-decoration: underline;
}
.to-authorization {
  padding: 14px 167px;
}
.to-index {
  padding: 14px 175px;
}
</style>

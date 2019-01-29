<template>
  <div class="accountCancel">
    <div class="pageTitle">注销账户</div>
    <div class="loginPhone">登录手机号:135*****8423
      <br />账号名称:卓健科技</div>
    <p class="pncLabel">设置新登录手机号</p>
    <div class="accCanAgreement">
      1.账号信息（手机号、密码）、身份信息（姓名、邮箱）将清空且无法恢复。 2.掌医开放平台所有产品的授权信息将清空且无法恢复。 3.掌医开放平台所有产品的设置使用记录将清空且无法恢复。 4.掌医开放平台的权益将清空且无法恢复。 5.创建者注销账号，可以将创建者身份移交他人后注销账号，否则创建者创建的机构将一起被注销。
      6.认证机构被注销后，与本平台有关的产品及提供的服务将无法使用，请重视。
    </div>
    <el-checkbox v-model="checked">我已阅读</el-checkbox>
    <br />
    <el-button :disabled="checked?false:true" type="primary" v-show="isAdmin" @click="ownerCancel()">确认继续</el-button>
    <el-button :disabled="checked?false:true" type="primary" v-show="!isAdmin" @click="adminCancel()">确认继续</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
        isAdmin:false
      };
    },
    methods: {
        ownerCancel() {
        this.$router.push("/personalCenter/ownerCancel");
      },
      adminCancel() {
        this.$router.push("/personalCenter/adminCancel");
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "personalCenter.scss";

</style>

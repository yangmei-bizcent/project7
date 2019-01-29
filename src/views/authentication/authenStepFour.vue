<template>
    <div class="authentication step4-wrap">
        <el-steps :active="4" simple>
            <el-step title="认证协议" icon="el-icon-document" class="greenArrow"></el-step>
            <el-step title="材料上传" icon="el-icon-uploaded" class="greenArrow"></el-step>
            <el-step title="提交成功" icon="el-icon-upload-successed" class="greenArrow"></el-step>
            <el-step title="审核结果" icon="el-icon-circle-check-outline"></el-step>
        </el-steps>
        <hr />
        <div class="asfImg"><img src="~@/assets/img/authentication/resultBgimg.png" /></div>
        <p v-if="platformHospital.auditStatus === '30'" class="asfTip">认证未通过</p>
         <p v-else class="asfTip">认证审核中</p>
        <p class="asfTip-small">原因：{{ platformHospital.auditPostil}}</p>
        <div class="back-button">
            <el-button type="success" @click="backToIndex()">修改资料</el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      result: ' 机构简称填写错误。'
    };
  },
   computed: {
    ...mapState({
      platformHospital: state => state.application.platformHospital,
    }),
    ...mapGetters({})
  },
    async created() {
    await this.$store.dispatch({ type: "getPlatformHospitalByGatewayInfo" });

  },
  methods: {
    backToIndex() {
      this.$router.push(`/authentication/authenStepTwo/edit`);
    }
  }
};
</script>

<style lang="scss" scoped>
.asfImg {
  width: 180px;
  margin: 80px auto 40px;
}
.asfTip-small {
  margin: 30px auto 40px;
}
.back-button {
  display: flex;
  justify-content: center;
  margin-bottom: 270px;
  button {
    font-size: 16px;
    padding: 14px 167px;
  }
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "authentication.scss";
.step4-wrap {
  .asfTip-small {
    color: #EC3A43;
  }
}
</style>

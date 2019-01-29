<template>
  <div class="serviceAuthorization main_layout">
    <div class="page-title">服务号授权</div>
    <div class="bg-white">
      <el-steps class="steps" :active="1" simple>
        <el-step title="创建管理员账号" icon=" ">
            <i class="step1" slot="icon"></i>
        </el-step>
        <el-step title="医院服务号授权" icon=" ">
            <i class="step2" slot="icon"></i>
        </el-step>
        <el-step title="完成设置" icon=" ">
            <i class="step3" slot="icon"></i>
        </el-step>
      </el-steps>
      <!-- 接口异常提示 -->
      <p class="interface-error" v-show="!authUrlGetResult">获取授权出现了一些问题，请刷新此界面</p>
      <div class="content-wrap" :style="{ 'margin-top': !authUrlGetResult ? '0' : '60px' }">
        <div class="content-title">医院服务号授权</div>
        <div class="content-detail">
          <span>授权用途</span>：<br/>
          授权医院微信服务号之后可以通过卓健互联网医院平台方便的给患者推送消息，提供服务<br/>
          <br/><span>注意事项</span>：
          <br/>1.微信公众号类型必须为已经认证服务号。
          <el-tooltip placement="bottom-start">
            <div slot="content" class="tooltip-content">
              微信认证注册和认证公众号同时进行，申请后公众号即为认证加“V”的公众账号（若您后续账号需要微信认证，也可选择微信认证方式来注册公众号），微信认证服务审核费300元/次/年。<br/>
              <br/><strong>注意事项</strong>
              <br/>（1）个体工商户无对公账户，可提供营业执照上法人的银行卡信息申请认证；<br/>
              （2）企业必须要有对公账户，请先办理对公账户再申请公众号或认证；<br/>
              （3）事业单位如无对公账户，可以使用结算中心或财政账户支付验证（如国库集中收付结算中心等），也可以使用证书上法人的对私银行卡号及姓名；<br/>
              （4）政府类型若没有对公账户，可以在“机构开户银行”、“机构银行账号”栏填写“无”；
            </div>
            <el-button type="text" @click="preventFocus">点击了解什么是“已认证服务号”。</el-button>
          </el-tooltip><br/>
          2.授权操作时需要微信服务号的管理员进行扫码授权协助。
          <el-tooltip placement="bottom-start">
            <div slot="content" class="tooltip-content tooltip-small">
              管理员微信号即是指公众号、服务号安全助手绑定的微信，1个管理员微信号、5个长期（长久有效）运营者微信号、20个短期（1个月内有效）运营者微信号。
            </div>
            <el-button type="text" @click="preventFocus">什么是微信公众号管理员？</el-button>
          </el-tooltip><br/>
          3.点击“立即授权”，跳转微信服务号授权界面，使用微信服务号管理员的微信扫描授权码，并且管理员微信确认授权，则完成整个授权流程。
        </div>
      </div>
      <div class="submit">
        <el-button type="success" @click="immediateAuthentication" :disabled="!authUrlGetResult" style="width:30%;">新窗口打开立即授权</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {exportLocalUrl} from "../../service/baseuri";
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed:{
    ...mapState({
      wechatAuthAddr: state => state.wechat.wechatAuthAddr,
      authUrlGetResult(state){
        return state.wechat.wechatAuthAddr ? true:false
      }
    })
    
  },
  async mounted(){
    await this.wechatAuthAdrress({authCallbackUrl: encodeURIComponent(exportLocalUrl+"/publicServiceNum/serviceResult")})
  },
  methods: {
    ...mapActions(["wechatAuthAdrress"]),
    immediateAuthentication() {
      if (this.authUrlGetResult) {
        window.open(this.wechatAuthAddr);
        return;
      }
    },
    preventFocus(e) {
      e.currentTarget.blur();
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
}
.bg-white {
  background: #FFF;
  overflow: hidden;
}
.steps {
  width: 880px;
  margin: 60px auto 0;
}
.interface-error {
  width: 880px;
  margin: 30px auto 20px;
  background: #FFE9E9;
  text-align: center;
  color: #EC3A43;
  letter-spacing: 0.2px;
  font-size: 14px;
  padding: 10px 0;
}
.title {
  height: 96px;
  background: #FAFAFA;
  font-size: 24px;
  color: #333;
  letter-spacing: 0.3px;
  line-height: 96px;
}
.step1, .step2, .step3 {
  width: 16px;
  height: 16px;
}
.step1 {
  background: url('~@/assets/img/publicServiceNum/create.png') center no-repeat;
}
.step2 {
  background: url('~@/assets/img/publicServiceNum/serviceAuthorization.png') center no-repeat;
}
.step3 {
  background: url('~@/assets/img/publicServiceNum/complete.png') center no-repeat;
}
.content-wrap {
  width: 880px;
  height: 330px;
  color: #333;
  border: 1px #E6E6E6 solid;
  margin: 0 auto;
}
.content-title {
  font-size: 24px;
  letter-spacing: 1.5px;
  border-bottom: 1px #E6E6E6 dashed;
  text-align: center;
  line-height: 89.5px; 
}
.content-detail {
  font-size: 16px;
  letter-spacing: 1px;
  text-align: justify;
  line-height: 23px;
  padding: 19.5px 20px 0;
  span {
    font-weight: bold;
  }
}
.tooltip-content {
  font-size: 14px;
  color: #FFF;
  letter-spacing: 0.9px;
  text-align: justify;
  line-height: 20px;
  width: 560px;
  padding: 10px 15px 15px;
}
.tooltip-small {
  width: 370px;
}
.submit {
  display: flex;
  justify-content: center;
  margin: 60px 0 78px;
  button {
    font-size: 16px;
    padding: 14px 0px;
  }
}
</style>

<style lang="scss">
@import '@/assets/css/var.scss';
.serviceAuthorization {
  .is-process {
    color: #04730E;
    font-weight: normal;
  }
  .is-finish {
    color: #04730E;
  }
  .el-step__title.is-finish + .el-step__arrow {
    &:after {
      background: #04730E;
    }
    &:before {
      background: #04730E;
    }
  }
  .el-step.is-simple:not(:last-of-type) .el-step__title {
    max-width: 60%;
  }
  .el-button--text {
    padding: 0;
    font-size: 16px;
    letter-spacing: 1px;
    color: #3C9EF8;
  }
  .el-button--success {
    background: $color-09b52d;
    border-color: $color-09b52d;
  }
}
</style>
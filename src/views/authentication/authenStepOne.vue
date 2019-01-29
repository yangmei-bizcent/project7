<template>
  <div class="authentication step1-wrap">
    <el-steps :active="1" simple>
      <el-step title="认证协议" icon="el-icon-document"></el-step>
      <el-step title="材料上传" icon="el-icon-upload"></el-step>
      <el-step title="提交成功" icon="el-icon-upload-success"></el-step>
      <el-step title="审核结果" icon="el-icon-circle-check-outline"></el-step>
    </el-steps>
    <hr />
    <div class="tip"><span>认证须知：</span>认证机构，即是在账号下增加机构，为了机构可以更好的体验平台功能，首先需要同意认证协议，并且上传机构相关证明信息，确认是该机构从业者操作平台。认证成功后就可以体验完整功能。
      <!-- ，现在您也可以使用
      <el-tooltip placement="bottom-start">
        <div slot="content" class="tooltip-content">
          账号：12345678<br />
          密码：12345678a
        </div>
        <el-button type="text" class="tooltip-btn" @click="preventFocus">演示账号</el-button>
      </el-tooltip>
      体验平台功能。 -->
    </div>
    <div class="authenAgreement">
      <el-scrollbar class="scrollbar">
        <p class="inner-content">
          欢迎您使用互联网医院开放平台认证服务！<br />
          互联网医院开放平台认证服务（以下简称“本服务”）是提供给用户的一项用户资质审核服务。为使用本服务，用户应当阅读并遵守《互联网医院开放平台认证服务协议》（以下简称“本协议”），请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。<br />
          除非您已阅读并接受本协议所有条款，否则您无权使用互联网医院开放平台认证服务。您对本服务的接受、购买、提交资料和信息、付款等行为即视为您已阅读并同意本协议的约束。<br />
          <br /><span>一、【协议的范围】</span><br />
          1.1【协议适用主体范围】<br />
          本协议是您与卓健之间关于您使用互联网医院开放平台认证服务所订立的协议。“卓健”是指杭州卓健信息技术有限公司及为本服务提供服务的关联方。“用户”是指申请互联网医院开放平台认证服务及/或已经认证成功的互联网医院开放平台帐号用户，在本协议中有时称为“您”。<br />
          <br /><span>二、【术语定义】</span><br />
          2.1
          互联网医院开放平台认证服务：是指符合一定条件的用户可以向互联网医院开放平台申请账号并获得互联网医院开放平台认证。卓健根据用户的申请及其提交的资料和信息，自行或者委托第三方审核机构进行审核，并根据审核情况确定认证结果和认证信息的服务。<br />
          2.2 资质审核：指用户向卓健提出申请，卓健根据法律规定及双方约定对用户主体资质证明或其所拥有的权利证明资料进行甄别及核实的过程。<br />
          2.3 第三方审核机构：指卓健委托对用户进行资质审核的第三方机构。<br />
          2.4 认证申请：指用户向卓健发起的本服务申请。<br />
          2.7 认证结果：是指卓健及其委托的第三方审核机构按照用户的申请进行资质审核后，卓健向用户输出的认证结果，认证结果只包括认证成功和认证失败两种情形。<br />
          2.8 认证成功：指卓健自行或委托第三方审核机构对用户的资料进行甄别及核实，在完成所有审核流程后，卓健作出符合认证条件的判断。针对认证成功的用户，卓健将根据本协议确定用户的认证帐号名称，并提供基本服务。<br />
          2.9 通知用户调整申请内容：指用户在申请认证过程中，因不满足认证成功条件，而被卓健以系统通知的方式要求作调整或补充的情形。<br />
          2.10 认证失败：指卓健直接或委托第三方审核机构对用户的资料进行甄别及核实，在完成所有审核流程后，卓健作出不符合认证条件的判断，包括但不限于以下任一情形：<br />
          2.10.1 由于用户原因，经卓健三次系统通知用户调整，用户仍未能满足资质审核及帐号命名要求的;<br />
          2.10.2 由于用户原因，卓健首次系统通知用户调整申请内容之日起满三十天，用户仍未能满足资质审核及帐号命名要求的;<br />
          2.10.3 因其他原因而不能认证成功的情形。
        </p>
      </el-scrollbar>
    </div>
    <div class="agreement">
      <el-checkbox v-model="checked">我同意并遵守上述的
        <a @click="serviceAgreement()">《互联网医院开放平台认证服务协议》</a>
      </el-checkbox><br />
    </div>
    <div class="submit">
      <el-button :disabled="checked?false:true" type="success" @click="authenStepTwo()">下一步</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false
      };
    },
    methods: {
      serviceAgreement() {
        this.$router.push("/authentication/authenProtocol");
      },
      authenStepTwo() {
        this.$router.push("/authentication/authenStepTwo/add");
      },
      preventFocus(e) {
        e.currentTarget.blur();
      }
    }
  };

</script>

<style lang="scss" scoped>
  .agreement,
  .submit {
    display: flex;
    justify-content: center;
  }

  .submit {
    margin: 20px 0 61px;

    button {
      padding: 9px 38px;
    }
  }

  .tip {
    width: 1100px;
    margin: 20px auto;
    background: #FFFBEA;
    font-size: 14px;
    color: #C25C26;
    letter-spacing: 0.2px;
    line-height: 22px;
    padding: 11px 24px;
    border: 1px #F0D1A1 solid;

    span {
      font-family: 'PingFang SC', 'MicrosoftYaHei';
      font-weight: bold;
    }
  }

  .tooltip-content {
    padding: 15px 20px 8px;
    font-size: 14px;
    color: #FFF;
    letter-spacing: 0.9px;
    line-height: 20px;
  }

  .tooltip-btn {
    min-width: 10px;
    padding: 0;
    color: #3C9EF8;
  }

  .scrollbar {
    height: 100%;
    width: 100%;
  }

  .inner-content {
    padding: 24px;
    line-height: 28px;
    font-size: 14px;
    letter-spacing: 0.2px;
    color: #333;

    span {
      font-weight: bold;
      color: #151515;
    }
  }

</style>

<style lang="scss" rel="stylesheet/stylus">
  @import '@/assets/css/var.scss';
  @import "authentication.scss";
  $color-7fcc7f: #7FCC7F; //按钮禁用颜色

  .step1-wrap {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #666;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      background: $color-09b52d;
      border-color: $color-09b52d;
    }

    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: $color-09b52d;
    }

    .el-button--success.is-disabled {
      background: $color-7fcc7f;
      border-color: $color-7fcc7f;
    }
  }

</style>

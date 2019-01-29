<template>
    <div class="authentication">
        <el-steps :active="3" simple>
            <el-step title="认证协议" icon="el-icon-document" class="greenArrow"></el-step>
            <el-step title="材料上传" icon="el-icon-uploaded" class="greenArrow"></el-step>
            <el-step title="提交成功" icon="el-icon-upload-successed"></el-step>
            <el-step title="审核结果" icon="el-icon-circle-check-outline"></el-step>
        </el-steps>
        <hr />
        <el-row type="flex" justify="center">
            <el-col :span="11">
                <div class="asfImg"><img src="~@/assets/img/authentication/verifying.png" /></div>
                <p class="asfTip">提交成功，审核中</p>
                <p class="asfTip-small">审核将于1个工作日内通过短信通知到您。</p>
                <el-button type="primary" class="appstore-btn" @click="goToAppStore">前往应用中心，了解更多功能</el-button>
            </el-col>
            <el-col :span="1" class="break-up">
                <div></div>
            </el-col>
            <el-col :span="11">
                <div class="qrCode-wrap">
                    <img src="~@/assets/img/authentication/ewmlogo.png" />
                    <div>
                        <p class="qrCode-tip">扫码关注卓健科技二维码</p>
                        <p class="qrCode-tip-small">强烈建议您关注公众号，实时关注审核进度</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goToAppStore () {
      this.$router.push('/serviceCenter/serCenIndex');
    }
  }
};
</script>

<style lang="scss" scoped>
.asfImg {
    width: 130px;
    margin: 150px auto 30px;
}
.asfTip-small {
    line-height: 28px;
    margin: 20px auto 0;
}
.appstore-btn {
    display: block;
    margin: 40px auto 0;
    padding: 14px 95px;
    font-size: 16px;
}
.break-up {
    display: flex;
    justify-content: center;
    div {
        height: 530px;
        border-left: 1px #D8D8D8 solid;
        margin: 100px 0 145px;
    }
}
.qrCode-wrap {
    img {
        display: block;
        width: 142.9px;
        height: 142.9px;
        border-radius: 3.57px;
        box-shadow: 1px 1px 10px #CCC;
        margin: 160.4px auto 40.4px;
    }
    div {
        p {
            text-align: center;
            margin-bottom: 23px;
        }
    }
}
.qrCode-tip {
    font-family: MicrosoftYaHei-Bold;
    font-size: 24px;
    color: #04730E;
    font-weight: bold;
}
.qrCode-tip-small {
    font-size: 14px;
    color: #666;
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "authentication.scss";
</style>

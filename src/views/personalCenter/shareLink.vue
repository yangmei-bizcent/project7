<template xmlns:v-clipboard="">
  <div class="shareLink personalCenter main_layout">
    <div class="page-title">
      <el-button type="text" class="back-btn color-333" @click="backToPersonalSettings">
        <i class="el-icon-arrow-left"></i> 返回</el-button>
    </div>
    <div class="content-wrap bg-white">
      <div class="wrapper">
        <p class="pncLabel color-333">管理员验证信息链接</p>
        <p class="pncLabel-vice">请复制链接或者二维码给被邀请管理员，其验证成功后，拉取管理员成功</p>
        <div>
          <el-input class="inline-input" v-model="addr.value"></el-input>
          <el-button
            class="copy-btn"
            type="primary"
            v-clipboard:copy="addr.value"
            v-clipboard:success="copyUrl"
            v-clipboard:error="onError">复制</el-button>
        </div>
        <vue-qr id="qrcode" whiteMargin=true :logoSrc="addr.logo" :text="addr.value" :size="120" :margin="0"></vue-qr>
        <el-button type="text" @click="downloadImg">邀请管理员二维码下载</el-button>
        <el-button type="primary" style="display:none;">链接显示页面</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import VueQr from 'vue-qr'
  import {exportLocalUrl} from "../../service/baseuri";

  export default {
    components: {VueQr},
    data() {
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else if (!/\d([-]\d)?$/.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        }
        return callback();
      };
      return {
        addr: {
          value: '',//显示的值、跳转的地址
          // logo: '../../static/img/autodeployment.png'//中间logo的地址
        }
      };
    },
    async created() {
      let query = this.$route.query;
      await this.$store.dispatch({type: 'invitationCode', phone: query.phoneNum, realName: query.name});
      let invitationInfo = this.$store.state.user.invitationInfo;
      this.addr.value = `${exportLocalUrl}/personalCenter/confirmInviteMsg/${invitationInfo.invitationCode}?orgname=${JSON.parse(sessionStorage.getItem('orgnameS'))}`;
    },
    methods: {
      copyUrl(e) {
        this.$message.success('复制成功');
      },
      onError(e) {
        this.$message.error('复制失败');
      },
      downloadImg() {
        let downQr = document.querySelector('#qrcode img');
        if (!downQr) {
          this.$message.error('图片下载失败');
          return;
        }
        let createA = document.createElement('a')
        createA.download = new Date().getTime();
        createA.href = downQr.src;
        //合成函数，执行下载
        createA.dispatchEvent(new MouseEvent('click'));
        this.$message.success('图片下载成功');
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log('注册!');
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      backToPersonalSettings () {
        this.$router.push('/personalCenter/personalSettings');
      }
    }
  };

</script>

<style lang="scss" scoped>
.back-btn {
  font-size: 18px;
  padding: 30.5px 0 30.5px;
}
.wrapper {
  width: 475px;
  margin: 80px auto 242px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.pncLabel {
  font-size: 20px;
  letter-spacing: 0.2px;
}
.pncLabel-vice {
  font-size: 14px;
  color: #666;
  letter-spacing: 0.14px;
  margin: 20px auto 40px;
}
.inline-input {
  display: inline-block;
  width: 392px;
}
#qrcode {
  margin: 40px auto 14px;
  padding: 10px;
  border: 1px #E7E7E7 solid;
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "personalCenter.scss";
.shareLink {
  .el-input__inner {
    border-color: #42A84B;
    position: relative;
    right: -10px;
    &:focus {
      border-color: #42A84B;
    }
  }
  .copy-btn {
    padding: 9px 0;
    position: relative;
    left: -10px;
    min-width: 73px;
    span {
      display: inline-block;
      width: 73px;
    }
  }
}
</style>

<template>
  <div class="page-container page-forgetpass main_layout">
    <div class="page-title">
      身份验证
    </div>
    <div class="remove-binding-content">
      <div class="remove-info">您可以通过手机短信进行安全验证</div>
      <div>
        <el-form :model="removeForm" :rules="removeRules" ref="removeForm" label-width="100px">
          <el-form-item label="登录手机号" prop="phone">
            <p class="login-phone"><img src="../assets/img/personalCenter/security.png">{{loginPhone}}</p>
          </el-form-item>

          <el-dialog :visible.sync="dialogFormVisible" width="550px">
            <el-form-item label="图片验证码" prop="imgCode" class="has-hint auth-code">
              <el-input ref="imgCode" placeholder="图片验证码" v-model="removeForm.imgCode"></el-input>
              <div class="imgCode">
                <img :src="codeUrl">
              </div>
            </el-form-item>
            <p class="hint">请填写图片中的字符，不区分大小写
              <a @click="freshCode(removeForm)">看不清楚？换一张</a>
            </p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" :disabled="!removeForm.imgCode" @click="confirmImgCode">确 定</el-button>
            </span>
          </el-dialog>
          
          <el-form-item label="短信验证码" prop="dxCode" class="auth-code has-hint">
            <el-input placeholder="请输入短信验证码" v-model="removeForm.dxCode">
            </el-input>
            <el-button type="primary" class="getDxCode" :class="{'grayBtn': getDxCodeDisabled}" :disabled="getDxCodeDisabled" @click="getImgCode('removeForm')">{{ dxCodeBtnText }}</el-button>
          </el-form-item>
          <p class="hint">点击免费获取验证码，短信将发送至{{loginPhone}}</p>

          <el-form-item>
            <el-button type="primary" class="next-step" :disabled="validateSuccess" @click="toNext('removeForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  async created() {
    if(this.$store.state.user.userGatewayInfo.phone) {
      sessionStorage.setItem('sessionPhone', this.$store.state.user.userGatewayInfo.phone)
    }
    
      await this.$store.dispatch({type: 'getUserGateway'});
    },

    // mouted() {
    //   sessionStorage.setItem('sessionPhone', this.$store.state.user.userGatewayInfo.phone)
    // },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        this.phoneSuccess = false;
        return callback(new Error("请输入手机号码"));
      } else if (!/^((1[3-9][0-9])+\d{8})$/.test(value)) {
        this.phoneSuccess = false;
        return callback(new Error("手机号码格式输入有误"));
      }
      this.phoneSuccess = true;
      return callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.resetPassForm.confirmPass !== "") {
          this.$refs.resetPassForm.validateField("confirmPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetPassForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      hideFourPhone: '',
      dialogFormVisible: false,
      phoneSuccess: false,
      getDxCodeDisabled: false, // 获取短信验证码按钮是否可用
      countNum: 60,
      dxCodeBtnText: "获取验证码", // 短信验证码按钮文字
      removeForm: {
        phone: "",
        imgCode: "",
        dxCode: ""
      },
      removeRules: {
        imgCode: [
          { required: true, message: "请输入图片验证码", trigger: "blur" }
        ],
        dxCode: [
          { required: true, message: "短信验证码不能为空", trigger: "blur" }
        ]
      },
    };
  },

  methods: {

    async getImgCode(formName) {
      if(this.phoneSuccess)
      this.$refs[formName].clearValidate('imgCode');
      this.dialogFormVisible = true;
      await this.freshCode(this.removeForm);
    },

    /**
     * 刷新图形验证码
     */
    async freshCode(removeForm) {
      await this.$store.dispatch({
        type: "pictureCode",
        phone: this.$store.state.user.userGatewayInfo.phone,
        purpose: "88"
      });
    },

    // 获取短信验证码
    getDxCode() {
      var self = this;
      if (self.countNum < 1) {
        self.countNum = 60;
        self.getDxCodeDisabled = false;
        self.dxCodeBtnText = "重新获取";
      } else {
        self.countNum--;
        self.getDxCodeDisabled = true;
        self.dxCodeBtnText = "重新发送(" + self.countNum + ")";
        setTimeout(function() {
          self.getDxCode();
        }, 1000);
      }
    },

    //打开图形验证码弹窗
    openImgCode() {
        this.dialogFormVisible = true;
        this.freshCode(this.removeForm);
    },

    confirmImgCode() {
      this.dialogFormVisible = false;
      this.sendMsgCode("removeForm", this.removeForm);
    },
    async sendMsgCode(formName, removeForm) {
      await this.$store.dispatch({
        type: "sendMsgCode",
        msgInfo: {
          phone: this.$store.state.user.userGatewayInfo.phone,
          picture_code: removeForm.imgCode,
          purpose: "88"
        }
      });
      if (typeof this.$store.getters.smsState === 'string') {
            this.$message.success(this.$store.getters.smsState);
            this.dialogVisible = false;
            this.getDxCode();
          } else {
            this.$message.error(this.$store.getters.smsState.msg);
          }
    },
    toNext(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          //console.log("error submit!!");
          return false;
        }
        let userGatewayInfo = this.$store.state.user.userGatewayInfo;
        this.$store.dispatch({
          type: 'checkMsgCode',
          msgCodeInfo: {phone: userGatewayInfo.phone, msg_code: this.removeForm.dxCode, purpose: '88'}
        }).then(()=>{
          this.$router.push('/removeBindingResult');
        });
        
      });
    },

    // 提交两步的表单
    async submitForm(formName, resetPassForm) {
      let removeForm = this.removeForm;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          //console.log("error submit!!");
          return false;
        }
        let userInfo = {
          phone: removeForm.phone,
          msg_code: removeForm.dxCode,
          new_password: resetPassForm.newPass
        };
        this.$store.dispatch({ type: "forgetPass", userInfo: userInfo });
        this.$router.push("resetSuccess");
      });
    },
  },

  computed: {
    ...mapState({
      codeUrl: state => state.user.codeUrl,
      userGatewayInfo: state => state.user.userGatewayInfo,
    }),
    ...mapGetters({}),
    validateSuccess() {
      return !(
        this.removeForm.imgCode &&
        this.removeForm.dxCode
      )
    },
    checkPass() {
      return !(this.resetPassForm.newPass && this.resetPassForm.confirmPass);
    },


    //隐藏手机号码中间四位
    loginPhone() {
      let sessionPhone = sessionStorage.getItem('sessionPhone')
      let firstThree = sessionPhone.substring(0, 3)
      let lastFour = sessionPhone.substring(7)
      return `${firstThree}****${lastFour}`
    }
  },

  watch: {
    dialogFormVisible(curVal, oldVal) {
      if(curVal) {
        this.removeForm.imgCode = ''
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-forgetpass {
  .remove-binding-content {
    // padding-top: 80px;
    background-color: #ffffff;
    min-width: 900px;
    min-height: 610px;
    .remove-info {
      background: #FFFBEA;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      color: #666666;
    }

    .el-form {
      margin-top: 80px;
    }

    .el-button.el-button--success {
      width: 400px;
      height: 46px;
      background-color: #09b52d;
      margin: 0 auto;
    }

    p.login-phone {
      font-size: 16px;
      color: #333333;
      letter-spacing: 1.03px;
      text-align: justify;
      img {
        vertical-align: middle;
        margin-right: 8px;
      }
    }
  }
  
}
</style>

<style lang="scss">
.page-forgetpass {
  .el-form {
    width: 500px;
    margin: 0 auto;
    .el-form-item.has-hint {
      margin-bottom: 8px;
      transition: margin-bottom 0.5s;
    }
    .el-form-item,
    .el-form-item.is-error {
      margin-bottom: 30px;
    }
    .hint {
      text-align: left;
      padding-left: 100px;
      margin-bottom: 30px;
      font-family: 'PingFang SC','MicrosoftYaHei';
      font-size: 12px;
      color: #999999;
      letter-spacing: 0.2px;
      a {
        margin-left: 30px;
        text-decoration: underline;
        color: #3c9ef8;
        cursor: pointer;
      }
    }

    .next-step {
      background-color: #09b52d;
      border-color: #09b52d;
      width: 120px;
      height: 34px;
      padding: 0;
      margin-top: 30px;
      &.is-disabled {
        background-color: #98e0a7;
        border-color: #98e0a7;
      }
    }

    .checkPass {
      z-index: 100;
      display: block;
      width: 44px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
  }

  .el-form-item:not(.auth-code) {
    .el-input {
      text-align: left;
      width: 340px;
      .el-input__inner {
        width: 340px;
        height: 34px;
      }
    }
  }

  .el-form-item.auth-code {
    .el-form-item__content {
      display: flex;
    }
    .el-input {
      width: 215px;
      .el-input__inner {
        height: 34px;
      }
    }
    .imgCode {
      padding-left: 10px;
      width: 125px;
      height: 34px;
      margin: 3px 0;
      font-size: 0;
      border-radius: 2px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .getDxCode {
      width: 115px;
      height: 34px;
      position: relative;
      top: 2px;
      margin-left: 10px;
      padding: 0;
      text-align: center;
      border: none;
      background: #fe9707;
    }

    .grayBtn {
      color: #666666;
      background: #d5d5d5;
    }
  }
}
</style>




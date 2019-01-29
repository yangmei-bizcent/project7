<template>
  <div class="phoneNumChange personalCenter main_layout">
    <div class="page-title">修改登录手机号</div>
    <div class="bg-white">
      <p class="tip">您可以通过手机短信进行安全验证</p>
      <div class="form-wrap">
        <el-form :model="personalForm" :rules="rules" ref="personalForm" label-width="100px">
          <div class="loginPhone color-333">
            <span>登录手机号</span>
            <div><i></i>{{userGatewayInfo.phone}}</div>
          </div>
          <el-dialog class="imgCode-dialog" width="560px" title="图片验证码" :visible.sync="dialogVisible">
            <el-form-item label="图片验证码" prop="imgCode" class="has-hint">
              <div class="imgIdCode input-append">
                <div class="imgCode">
                  <img :src="codeUrl" />
                </div>
                <el-button slot="reference" type="text" @click="freshCode(personalForm)">看不清楚？换一张</el-button>
              </div>
              <el-input placeholder="请输入图片验证码" v-model="personalForm.imgCode" class="width215"></el-input>
            </el-form-item>
            <p class="extra-entryTip entryTip">请输入图形验证码，不区分大小写</p>
            <div class="btn-wrap">
              <el-button type="primary" @click="sendMsgCode('personalForm',personalForm)">确认</el-button>
            </div>
          </el-dialog>
          <el-form-item label="短信验证码" prop="dxCode" class="has-hint">
            <el-button type="primary" size="small" class="getCode input-append" :class="{'grayBtn':boolA}" @click="getImgCode('personalForm',personalForm)" :disabled="boolA">{{ getCode }}</el-button>
            <el-input placeholder="请输入短信验证码" v-model="personalForm.dxCode" class="width215"></el-input>
          </el-form-item>
          <p class="extra-entryTip entryTip">点击免费获取验证码，短信将发送至{{userGatewayInfo.phone}}</p>
          <el-form-item class="button-item">
            <el-button type="primary" @click="submitForm('personalForm',personalForm)" :disabled="dontInput">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  async created() {
      await this.$store.dispatch({type: 'getUserGateway'});
    },
  data() {
    // var validatePhone = (rule, value, callback) => {
    //   if (!value) {
    //     this.phoneSuccess=false;
    //     return callback(new Error('请输入手机号码'));
    //   } else if (!/\d([-]\d)?$/.test(value)) {
    //     this.phoneSuccess=false;
    //     return callback(new Error('请输入正确的手机号码'));
    //   }else{
    //     this.phoneSuccess=true;
    //     return callback();
    //   }
      
    // };
    return {
      dialogVisible: false,
      // phoneSuccess: false,
      personalForm: {
        imgCode: "",
        dxCode: "",
      },
      getCode: '获取验证码',
      boolA: false,
      countNum: 60,
      rules: {
        imgCode: [{
          required: true,
          message: "图片验证码不能为空",
          trigger: "blur"
        }],
        dxCode: [{
          required: true,
          message: "短信验证码不能为空",
          trigger: "blur"
        }]
      }
    };
  },
  methods: {
    async submitForm(formName,personalForm) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          //console.log("error submit!!");
          return false;
        }
        let userGatewayInfo = this.$store.state.user.userGatewayInfo;
        this.$store.dispatch({
          type: 'checkMsgCode',
          msgCodeInfo: {phone: userGatewayInfo.phone, msg_code: personalForm.dxCode, purpose: '99'}
        }).then(res => {
          this.$router.push('/personalCenter/setNewPhoneNum');
        });
      });
    },
    getCodeBtn () {
      if (this.countNum < 1) {
        this.countNum = 60;
        this.boolA = false;
        this.getCode = "重新获取";
      } else {
        this.countNum --;
        this.boolA = true;
        this.getCode = "重新发送(" + this.countNum + ")";
        setTimeout(this.getCodeBtn, 1000);
      }
    },
    /**
     * 刷新图形验证码
     */
    async freshCode(personalForm) {
      let userGatewayInfo = this.$store.state.user.userGatewayInfo;
      await this.$store.dispatch({type: 'pictureCode', phone: userGatewayInfo.phone,  purpose: '99'});
    },
    async getImgCode(formName, personalForm) {
      // if(this.phoneSuccess) 
      this.$refs[formName].clearValidate('imgCode');
      this.dialogVisible = true;
      await this.freshCode(personalForm);
    },
    sendMsgCode(formName, personalForm) {
      let userGatewayInfo = this.$store.state.user.userGatewayInfo;
      this.$refs[formName].validateField('imgCode', async errorMessage => {
        if (!errorMessage) {
          await this.$store.dispatch({
            type: 'sendMsgCode',
            msgInfo: {phone: userGatewayInfo.phone, picture_code: personalForm.imgCode, purpose: '99'}
          });
          if (typeof this.$store.getters.smsState === 'string') {
            this.$message.success(this.$store.getters.smsState);
            this.dialogVisible = false;
            this.getCodeBtn();
          } else {
            this.$message.error(this.$store.getters.smsState.msg);
          }
        }
      });
    },
  },
  computed: {
    //控制提交按钮是否禁用
    dontInput () {
      if (this.personalForm.dxCode.length > 0 && this.personalForm.imgCode.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    ...mapState({
        codeUrl: state => state.user.codeUrl,
        userGatewayInfo: state => state.user.userGatewayInfo,
      }),
      ...mapGetters({}),
  },
  watch: {
    dialogVisible () {
      if (this.dialogVisible === true) {
        this.personalForm.imgCode = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loginPhone {
  margin-bottom: 30px;
  font-size: 16px;
  span {
    float: left;
    width: 100px;
    padding-right: 12px;
    letter-spacing: 0.2px;
    text-align: right;
  }
  div {
    display: flex;
    align-items: center;
    letter-spacing: 1.03px;
  }
  i {
    margin-right: 8px;
    height: 16px;
    width: 14px;
    background-image: url('~@/assets/img/personalCenter/security.png');
  }
}
.button-item {
  button {
    padding: 9px 38px;
  }
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "personalCenter.scss";
</style>

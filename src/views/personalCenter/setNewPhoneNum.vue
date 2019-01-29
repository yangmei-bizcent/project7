<template>
  <div class="setNewPhoneNum personalCenter main_layout">
    <div class="page-title">设置新登录手机号</div>
    <div class="content-wrap bg-white">
      <div class="form-wrap">
        <el-form :model="personalForm" :rules="rules" ref="personalForm" label-width="100px">
          <el-form-item label="手机号码" prop="phone" class="has-hint">
            <el-input v-model="personalForm.phone" placeholder="请输入手机号码" auto-complete="off" class="width340"></el-input>
            <p v-if="isUseful" class="useful"><i class="useful-icon"></i>该号码可使用</p>
          </el-form-item>
          <p class="extra-entryTip entryTip">手机号为帐号登录凭证，请使用长期有效手机号</p>
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
          <p class="extra-entryTip entryTip">请查收手机短信，并填写短信中的验证码</p>
          <el-form-item class="button-item">
            <el-button type="primary" @click="submitForm('personalForm')" :disabled="dontInput">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog class="center-dialog" :visible.sync="centerDialogVisible" width="30%">
      <p class="confirm-phone color-333">您是否确认修改新账号为<span>{{ personalForm.phone }}</span>？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmChange(personalForm)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  data () {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        this.isUseful = false;
        return callback(new Error('请填写手机号码'));
      } else if (!/\d([-]\d)?$/.test(value) || value.length != 11) {
        this.isUseful =false;
        return callback(new Error('请填写有效的11位手机号码'));
      } else {
        this.$store.dispatch({type: 'isRigist', phone: value}).then(res => {
          if (res.data) {
            return callback(new Error('该号码已被使用'));
          } else {
            return callback();
          }
        });
      }
    };
    return {
      personalForm: {
        phone: "",
        imgCode: "",
        dxCode: "",
      },
      isUseful: false,
      boolA: false,
      getCode: '获取验证码',
      countNum: 60,
      dialogVisible: false,
      centerDialogVisible: false,
      rules: {
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: 'blur'
          }
        ],
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
    }
  },
  methods: {
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
      await this.$store.dispatch({type: 'pictureCode', phone: personalForm.phone,  purpose: '7'});
    },
    getImgCode(formName, personalForm) {
        this.$refs[formName].validateField('phone', async errorMessage => {
          if (!errorMessage) {
            this.$refs[formName].clearValidate('imgCode');
            this.dialogVisible = true;
            await this.freshCode(personalForm);
          }
        });
      },
    sendMsgCode(formName, personalForm) {
      this.$refs[formName].validateField('imgCode', async errorMessage => {
        if (!errorMessage) {
          await this.$store.dispatch({
            type: 'sendMsgCode',
            msgInfo: {phone: personalForm.phone, picture_code: personalForm.imgCode, purpose: '7'}
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log("提交!");
          this.centerDialogVisible = true;
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    async confirmChange (personalForm) {
      await this.$store.dispatch({
        type: 'modifyPhone',
        userInfo: {new_phone: personalForm.phone, msg_code: personalForm.dxCode}
      }).then(res => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('userName');
        localStorage.clear();
        sessionStorage.clear()
        this.$emit("outLogin",false);
        this.$router.push("/personalCenter/changeSuccess");
      }).catch(e => {
        this.centerDialogVisible = false;
      });
    }
  },
  computed: {
    //控制提交按钮是否禁用
    dontInput () {
      if (this.personalForm.dxCode.length > 0 && this.personalForm.phone.length && this.personalForm.imgCode.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    ...mapState({
      codeUrl: state => state.user.codeUrl,
    }),
    ...mapGetters({})
  },
  watch: {
    dialogVisible () {
      if (this.dialogVisible === true) {
        this.personalForm.imgCode = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.useful {
  line-height: 18px;
  font-size: 12px;
  color: #04730E;
  margin-top: 4px;
  display: flex;
  align-items: center;
}
.useful-icon {
  background-image: url('~@/assets/img/personalCenter/useful.png');
  height: 14px;
  width: 14px;
  margin-right: 6px;
}
.button-item {
  button {
    padding: 9px 45px;
  }
}
.confirm-phone {
  font-size: 14px;
  letter-spacing: 0.2px;
  span {
    color: #09B52D;
  }
}
</style>

<style lang="scss">
@import "personalCenter.scss";
.setNewPhoneNum {
  .center-dialog{
    .el-dialog__footer {
      padding: 0 20px 12px 20px;
      button {
        padding: 8px 13px;
        background: #09B52D;
        min-width: 56px;
      }
    }
    .el-dialog {
      width: 420px !important;
    }
  }
}
</style>

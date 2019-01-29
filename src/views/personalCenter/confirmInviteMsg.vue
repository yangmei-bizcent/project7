<template>
  <div class="confirmInviteMsg personalCenter main_layout" v-if="hasData">
    <div class="page-title">验证邀请信息</div>
    <div class="bg-white">
      <p class="tip">{{ invitationInfo.invitationUser.realName }}邀请您为{{orgView}}管理员，请完成以下验证</p>
      <div class="form-wrap">
        <el-form :model="conMsgForm" :rules="rules" ref="conMsgForm" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入自己的姓名" v-model="conMsgForm.name" class="width340"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNum" class="has-hint">
            <el-input placeholder="请输入自己的手机号码" v-model="conMsgForm.phoneNum" class="width340"></el-input>
          </el-form-item>
          <p class="extra-entryTip entryTip">手机号为帐号登录凭证，请使用长期有效手机号</p>
          <el-dialog class="imgCode-dialog" width="560px" title="图片验证码" :visible.sync="dialogVisible">
            <el-form-item label="图片验证码" prop="imgCode" class="has-hint">
              <div class="imgIdCode input-append">
                <div class="imgCode">
                  <img :src="codeUrl"/>
                </div>
                <el-button slot="reference" type="text" @click="freshCode(conMsgForm, invitationInfo.registStatus)">看不清楚？换一张</el-button>
              </div>
              <el-input placeholder="请输入图片验证码" v-model="conMsgForm.imgCode" class="width215"></el-input>
            </el-form-item>
            <p class="extra-entryTip entryTip">请输入图形验证码，不区分大小写</p>
            <div class="btn-wrap">
              <el-button type="primary" @click="sendMsgCode('conMsgForm', conMsgForm,invitationInfo.registStatus)">确认</el-button>
            </div>
          </el-dialog>
          <el-form-item label="短信验证码" prop="msgCode">
            <el-button type="primary" size="small" class="getCode input-append" :class="{'grayBtn':boolA}"
                       @click="getImgCode('conMsgForm', conMsgForm,invitationInfo.registStatus)" :disabled="boolA">{{ getCode }}
            </el-button>
            <el-input placeholder="请输入短信验证码" v-model="conMsgForm.msgCode" class="width215"></el-input>
          </el-form-item>
          <!-- <el-form-item label="联系邮箱" prop="email" class="has-hint">
            <el-input v-model="conMsgForm.email" placeholder="请输入联系邮箱" class="width340"></el-input>
          </el-form-item>
          <p class="extra-entryTip entryTip">输入联系邮箱，用于系统通知，消息通知等</p> -->
          <el-form-item v-if="'false' == invitationInfo.registStatus" label="密码" prop="password" class="has-hint">
            <el-input type="password" v-model="conMsgForm.password" placeholder="请输入密码" class="width340"></el-input>
          </el-form-item>
          <p v-if="'false' == invitationInfo.registStatus" class="extra-entryTip entryTip">您没有在平台注册，请设置账号密码，验证成功后自动注册</p>
          <el-form-item v-if="'false' == invitationInfo.registStatus" label="确认密码" prop="confirmPassword" class="has-hint">
            <el-input type="password" v-model="conMsgForm.confirmPassword" placeholder="请再次输入密码" class="width340"></el-input>
          </el-form-item>
          <p v-if="'false' == invitationInfo.registStatus" class="extra-entryTip entryTip">请再次填写密码</p>
          <el-form-item class="button-item">
            <el-button type="primary" @click="submitForm('conMsgForm',conMsgForm,invitationInfo.registStatus)">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapState({
        codeUrl: state => state.user.codeUrl,
      }),
      // ...mapGetters({
      //   invitationInfo: 'invitationInfo',
      // orgname: 'orgname',
      // })
    },
    data() {
      var validateName = (rule, value, callback) => {
        if (value != this.invitationInfo.realName) {
          return callback(new Error('填写信息与邀请信息不符，请检查'));
        }
        return callback();
      };
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else if (!/\d([-]\d)?$/.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        } else if (value != this.invitationInfo.phone) {
          return callback(new Error('填写信息与邀请信息不符，请检查'));
        }
        return callback();
      };
      var validatePassword = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/
        if (value.trim() === "") {
          callback(new Error("请输入密码"));
        } 
        else if(!reg.test(value.trim())) {
          callback(new Error("密码必须包含数字和字母"))
        } 
        else {
          if (this.conMsgForm.confirmPassword !== "") {
            this.$refs.conMsgForm.validateField("confirmPassword");
          }
          callback();
        }
      };
      var validateConfirmPassword = (rule, value, callback) => {
        if (value != this.conMsgForm.password) {
          return callback(new Error('两次密码不一致'));
        }
        return callback();
      };
      return {
        orgname: '',
        orgView: this.$store.getters.orgname,
        hasData: false,
        invitationInfo: {
          invitationUser: {},
          tplatformHospital: {}
        },
        dialogVisible: false,
        conMsgForm: {
          name: "",
          phoneNum: "",
          msgCode: "",
          imgCode: "",
          // email: "",
          password: "",
          confirmPassword: "",
          purpose: '9',
        },
        boolA: false,
        countNum: 60,
        getCode: '获取验证码',
        rules: {
          name: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }, {
            validator: validateName,
            trigger: 'blur'
          }],
          phoneNum: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
            {
              min: 11,
              max: 11,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            },
            {
              validator: validatePhone,
              trigger: 'blur'
            }
          ],
          imgCode: [{
            required: true,
            message: "请输入图形验证码",
            trigger: "blur"
          }],
          msgCode: [{
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }],
          email: [{
            required: true,
            message: "请输入联系邮箱",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }, {
            min: 6,
            max: 16,
            message: "密码长度为6-16位",
            trigger: "blur"
          }, {
            validator: validatePassword,
            trigger: "blur"
          }],
          confirmPassword: [{
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },{
            validator: validateConfirmPassword,
            trigger: 'blur'
          }]
        }
      };
    },
    async created() {
      let params = this.$route.params.invitationCode;
      this.orgname = this.$route.query.orgname;
      await this.$store.dispatch({
        type: 'getInvitationInfoByCode',
        code: params
      }).then(res => {
        if (res.data) {
          this.invitationInfo = res.data;
          this.hasData = true;
        } else {
          this.$router.push('/');
        }
      });
      // let query = this.$route.query;
      // await this.$store.dispatch({type: 'isRigist', phone: query.phone});
      // await this.$store.dispatch({type: 'pictureCode', phone: query.phone, purpose: '9'});
    },
    mounted () {
      let container = document.querySelector('.layout_minWidth');
      let content = document.querySelector('.el-container .layout-page-content');
      container.style.minWidth = 'auto';
      content.style.padding = '0';
    },
    methods: {
      //倒计时
      getCodeBtn() {
        if (this.countNum < 1) {
          this.countNum = 60;
          this.boolA = false;
          this.getCode = "重新获取";
          return;
        }
        this.countNum--;
        this.boolA = true;
        this.getCode = "重新发送(" + this.countNum + ")";
        setTimeout(this.getCodeBtn, 1000);

      },
      /**
       * 刷新图形验证码
       */
      async freshCode(conMsgForm, isRigist) {
        await this.$store.dispatch({type: 'pictureCode', phone: conMsgForm.phoneNum,  purpose: isRigist=='true' ? '99' : '9'});
      },
      getImgCode(formName, conMsgForm, registStatus) {
        this.$refs[formName].validateField('name', async errorMessage => {
          if (!errorMessage) {
            this.$refs[formName].validateField('phoneNum', async errorMessage => {
              if (!errorMessage) {
                this.$refs[formName].clearValidate('imgCode');
                this.dialogVisible = true;
                await this.freshCode(conMsgForm, registStatus);
              }
            });
            // await this.$store.dispatch({
            //   type:'validateUser',
            //   userInfo:{
            //     phone: this.conMsgForm.phoneNum,
            //     real_name: this.conMsgForm.name,
            //     invitation_code: this.$route.params.invitationCode
            //   }
            // });
          }
        });
      },
      sendMsgCode(formName, conMsgForm, isRigist) {
        this.$refs[formName].validateField('imgCode', async errorMessage => {
          if (!errorMessage) {
            await this.$store.dispatch({
              type: 'sendMsgCode',
              msgInfo: {phone: conMsgForm.phoneNum, picture_code: conMsgForm.imgCode, purpose: isRigist=="true" ? '99' : '9'}
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
      submitForm(formName, conMsgForm, registStatus) {
        let query = this.$route.query;
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return false;
          }
          let userInfo = {
            invitation_code: this.$route.params.invitationCode,
            phone: conMsgForm.phoneNum,
            msg_code: conMsgForm.msgCode,
            password: conMsgForm.password,
            real_name: conMsgForm.name,
            email: conMsgForm.email,
            registStatus: registStatus
          };
          await this.$store.dispatch({type: 'invitationOrganizationBind', userInfo: userInfo});
          let inviteBindInfo = this.$store.state.user.inviteBindInfo;
          if (inviteBindInfo !=undefined && inviteBindInfo.phone != null) {
            if (inviteBindInfo.isBindWechat==true){
              this.$router.push({
                path: `/personalCenter/wechatResult`,
                query: {
                  phone: inviteBindInfo.phone,
                  prev: 'wechatIsBinding',
                  orgname: this.orgname
                }
              });
            }else if (inviteBindInfo.isBindWechat==false){
              this.$router.push({
                path: `/personalCenter/wechatAuthor`,
                query: {
                  phone: inviteBindInfo.phone,
                  orgname: this.orgname
                }
              });
            }
            
          }
        });
      }
    },
    watch: {
      dialogVisible () {
        if (this.dialogVisible === true) {
          this.conMsgForm.imgCode = '';
        }
      }
    },
    destroyed(){
      localStorage.removeItem('invitationInfo');
    }
  };

</script>

<style lang="scss" scoped>
  .button-item {
    button {
      padding: 9px 38px;
    }
  }
</style>

<style lang="scss" rel="stylesheet/stylus">
  @import "personalCenter.scss";
  @media screen and (max-width: 600px) {
    .confirmInviteMsg {
      width: 100%;
      .form-wrap {
        width: 100%;
      }
      .width340 {
        width: 90%;
      }
      .width215 {
        width: 90%;
      }
      .el-button--primary.getCode {
        width: 90%;
        clear: both;
        margin: 3px 10% 3px 0;
      }
      .extra-entryTip {
        width: 100%;
      }
      .imgCode-dialog {
        .el-dialog {
          width: 90% !important;
        }
        .el-dialog__body {
          padding: 40px 5px;
        }
        .width215 {
          width: 45%;
        }
        .extra-entryTip {
          width: 65%;
        }
        .btn-wrap {
          width: 100%;
          button {
            padding: 14px 0;
            width: 100%;
          }
        }
      }
    }
  }
</style>

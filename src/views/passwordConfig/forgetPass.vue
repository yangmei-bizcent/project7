<template>
    <div class="page-container page-forgetpass main_layout">
        <div class="page-title">
            {{titleName}}
        </div>
        <div class="forget-pass-content">
                <el-form
                    :model="forgetPassForm" 
                    :rules="forgetPassRules" 
                    ref="forgetPassForm" 
                    label-width="100px">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input ref="phone" v-model="forgetPassForm.phone" placeholder="请输入要重置的手机账号"></el-input>
                    </el-form-item>

                    <el-dialog :visible.sync="dialogFormVisible" width="550px">
                        <el-form-item label="图片验证码" prop="imgCode" class="has-hint auth-code">
                          <el-input ref="imgCode" placeholder="图片验证码" v-model="forgetPassForm.imgCode"></el-input>
                          <div class="imgCode">
                            <img :src="codeUrl">
                          </div>
                        </el-form-item>
                        <p class="hint">请填写图片中的字符，不区分大小写<a @click="freshCode(forgetPassForm)">看不清楚？换一张</a></p>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" :disabled="!forgetPassForm.imgCode" @click="confirmImgCode">确 定</el-button>
                        </span>
                      </el-dialog>
                    <el-form-item label="短信验证码" prop="dxCode" class="auth-code has-hint">
                      <el-input placeholder="请输入短信验证码" v-model="forgetPassForm.dxCode">
                      </el-input>
                      <el-button type="primary" class="getDxCode" :class="{'grayBtn': getDxCodeDisabled}" :disabled="getDxCodeDisabled" @click="openImgCode">{{ dxCodeBtnText }}</el-button>
                    </el-form-item>
                    <p class="hint">请查收手机短信，并填写短信中的验证码</p>
                </el-form>
                <el-form class="second-form" :model="resetPassForm" :rules="resetPassRules" ref="resetPassForm" label-width="100px">
                    <el-form-item>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPass" class="has-hint">
                        <el-input type="password" placeholder="请输入新密码" 
                        v-if="newPass.pwdType"
                        v-model.trim="resetPassForm.newPass">
                        <u slot="suffix" class="checkPass" @click="changeType(newPass)">
                            <img :src="newPass.seen ? seenImg : unseenImg" />
                        </u>
                        </el-input>
                        <el-input v-model="resetPassForm.newPass" placeholder="请输入新密码"v-else>
                            <u slot="suffix" class="checkPass" @click="changeType(newPass)">
                                <img :src="newPass.seen ? seenImg : unseenImg" />
                            </u>
                        </el-input>
                    </el-form-item>
                    <p class="hint">密码至少由6个字符组成，必须包含数字、字母</p>
                    <el-form-item label="确认密码" prop="confirmPass" class="has-hint">
                        <el-input type="password" placeholder="请再次输入密码" 
                        v-if="confirmPass.pwdType"
                        v-model="resetPassForm.confirmPass">
                            <u slot="suffix" class="checkPass" @click="changeType(confirmPass)">
                                <img :src="confirmPass.seen ? seenImg : unseenImg" />
                            </u>
                        </el-input>
                        <el-input 
                        placeholder="请再次输入密码" 
                        v-else
                        v-model="resetPassForm.confirmPass">
                            <u slot="suffix" class="checkPass" @click="changeType(confirmPass)">
                                <img :src="confirmPass.seen ? seenImg : unseenImg" />
                            </u>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" 
                        class="next-step"
                        :disabled="checkPass || validateSuccess"
                        @click="submitForm('resetPassForm',resetPassForm)" :loading="forgetPassword">确定</el-button>
                    </el-form-item>
                </el-form>
            <div v-if="resetSuccess" class="reset-success">
                <div class="success-img">
                    <img src="../../assets/img/Group.png">
                </div>
                <p class="success-text">重置密码成功，请谨记新密码，防止再次丢失</p>
                <el-button type="success" @click="toLogin">返回首页</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import passLookIcon from '../../../static/img/passLookIcon.png'
import passHiddenIcon from '../../../static/img/passHiddenIcon.png'
export default {
    data() {
        var validatePhone = (rule, value, callback) => {
            if (!value) {
                this.phoneSuccess = false
                return callback(new Error('请输入手机号码'));
            }
            else if(!/^((1[3-9][0-9])+\d{8})$/.test(value))
            {
                this.phoneSuccess = false
                return callback(new Error('手机号码格式输入有误'));
            }else{
                this.phoneSuccess = true;
                return callback();
            }
            this.phoneSuccess = true
            return callback();
        };
        var validatePass = (rule, value, callback) => {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/
            if (value.trim() === "") {
               callback(new Error("请输入新密码"));
            } else if(!reg.test(value.trim())) {
                callback(new Error("密码必须包含数字和字母"))
            }
            else {
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
           forgetPassword:false,
            dialogFormVisible: false,
            titleName: '忘记密码',
            phoneSuccess: false,
            newPass: {
                pwdType: true,
                seen: '',
            },
            confirmPass: {
                pwdType: true,
                seen: '',
            },
            seenImg: passLookIcon, //看得见密码
            unseenImg: passHiddenIcon, //看不见
            resetSuccess: false,    // 重置是否成功
            // passType: 'password',   // 密码框type类型
            // showPass: true, // 密码是否可见
            firstStepShow: true,    // 第一步表单是否显示
            secondStepShow: false,  // 第二步表单是否显示
            getDxCodeDisabled: false, // 获取短信验证码按钮是否可用
            countNum: 60,
            phoneSuccess: false,
            dxCodeBtnText: '获取验证码',    // 短信验证码按钮文字
            forgetPassForm: {
                phone: '',
                imgCode: '',
                dxCode: '',
            },
            resetPassForm: {
                newPass: '',
                confirmPass: ''
            },
            forgetPassRules: {
                phone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    {min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur'},
                    { validator: validatePhone, trigger: 'blur' }
                ],
                imgCode: [
                    {required: true, message: '请输入图片验证码', trigger: 'blur'},
                ],
                dxCode: [
                    {required: true, message: '短信验证码不能为空', trigger: 'blur'},
                ],
            },
            resetPassRules: {
                newPass: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                    {min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur'},
                    {validator: validatePass, trigger: 'blur' }
                ],
                confirmPass: [
                    {required: true, message: '请确认新密码', trigger: 'blur'},
                    {validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 密码是否可见
        showHidePass() {
            switch(this.showPass) {
                case true:
                    this.passType = '';
                    this.showPass = false;
                    break;
                case false:
                    this.passType = 'password';
                    this.showPass = true;
                    break;
            }
        },

        //密码的显示隐藏
        changeType(obj) {
            obj.seen = !obj.seen; //小眼睛的变化
            obj.pwdType = !obj.pwdType; //跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
        },

      /**
       * 刷新图形验证码
       */
      async freshCode(forgetPassForm) {
        this.forgetPassForm.imgCode="";
        await this.$store.dispatch({type: 'pictureCode', phone: forgetPassForm.phone, purpose: '5'});
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
          setTimeout(function () {
            self.getDxCode()
          }, 1000)
        }
      },

      //打开图形验证码弹窗
    openImgCode() {
        if(this.phoneSuccess) {
            this.dialogFormVisible = true;
            this.freshCode(this.forgetPassForm)
        }
    },

      confirmImgCode() {
        this.dialogFormVisible = false
        this.sendMsgCode('forgetPassForm', this.forgetPassForm)
    },
      async sendMsgCode(formName, forgetPassForm) {
        await this.$store.dispatch({
          type: 'sendMsgCode',
          msgInfo: {phone: forgetPassForm.phone, picture_code: forgetPassForm.imgCode, purpose: '5'}
        });
        if(typeof this.$store.getters.smsState === 'object') {
          this.$message.error(this.$store.getters.smsState.msg)
        } else if(typeof this.$store.getters.smsState === 'string') {
          this.getDxCode();
          this.$message.success(this.$store.getters.smsState);
        } 
      },
      toNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
        });

        this.$store.dispatch({
            type: 'checkMsgCode',
            msgCodeInfo: {phone: this.forgetPassForm.phone, msg_code: this.forgetPassForm.dxCode, purpose: '5'}
        }).then(() => {
            this.firstStepShow = false;
            this.secondStepShow = true;
            if (this.secondStepShow) {
                this.titleName = '设置新密码'
            }
        }).catch((res) => {
            //console.log(res);
            
        })
      },

      // 提交两步的表单
      async submitForm(formName, resetPassForm) {
        let forgetPassForm = this.forgetPassForm;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
        let userInfo = {
          phone: forgetPassForm.phone,
          msg_code: forgetPassForm.dxCode,
          new_password: resetPassForm.newPass
        };
        this.$store.dispatch({type: 'forgetPass', userInfo: userInfo}).then(()=>{
            // this.forgetPassword = true;
            this.$router.push('resetSuccess');
        });
        });
        
      },
      toLogin() {
        this.$router.push({path: '/login'});
      },
    },

    computed: {
      ...mapState({
        codeUrl: state => state.user.codeUrl,
      }),
      ...mapGetters({}),
      validateSuccess() {
        return !(this.forgetPassForm.phone && this.forgetPassForm.imgCode && this.forgetPassForm.dxCode)
      },
      checkPass() {
        return !(this.resetPassForm.newPass && this.resetPassForm.confirmPass)
      }
    }
}
</script>

<style lang="scss" scoped>
    .page-forgetpass {
        .forget-pass-content {
            min-width: 900px;
            padding-top: 80px;
            background-color: #ffffff;
            min-height: 610px;

            .reset-success {
                margin-top: 44px;
                text-align: center;
            }

            .success-img {
                width: 60px;
                height: 60px;
                margin: 0 auto 50px auto;
            }

            .success-text {
                font-size: 16px;
                color: #666666;
                letter-spacing: 0.2px;
                margin: 30px auto 80px auto;
            }

            .el-button.el-button--success {
                width: 400px;
                height: 46px;
                background-color: #09B52D;
                margin: 0 auto;
            }
            
        }

        .reset-pass {
            width: 83.3%;
            height: 96px;
            line-height: 96px;
            min-width: 1200px;
            margin: 0 auto;
            font-size: 24px;
            color: #333333;
            letter-spacing: 0.3px;
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
        .el-form-item, .el-form-item.is-error {
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
                color: #3C9EF8;
                cursor: pointer;
            }
        }

        .next-step {
            background-color: #09B52D;
            border-color: #09B52D;
            width: 120px;
            height: 34px;
            padding: 0;
            margin-top: 30px;
            &.is-disabled {
                background-color: #98E0A7;
                border-color: #98E0A7;
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

    .el-form.second-form {
        margin-top: -30px;
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
        background: #FE9707;
      }

      .grayBtn {
        color: #666666;
        background: #D5D5D5;
      }
    } 
}

</style>




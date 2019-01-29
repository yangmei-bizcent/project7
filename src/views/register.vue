<template>
    <div class="register">
        <div class="register-wrapper main_layout">
            <p class="page-title">注册</p>
            <div class="page-container page-register">
                <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px">
                    <el-form-item label="昵称" prop="name" class="has-hint">
                        <el-input v-model="registerForm.name" placeholder="请填写昵称"></el-input>
                    </el-form-item>
                    <p class="hint">建议填写真实姓名，10位字符以内，不包含空格及特殊字符</p>
                    <el-form-item label="手机号码" prop="phone" class="has-hint">
                        <el-input
                          ref="phone"
                          v-model="registerForm.phone"
                          placeholder="请输入手机号码"
                          auto-complete="off">
                          <!-- @input="validRegist()"> -->
                        </el-input>
                        <!-- <p class="phoneSuccess" v-if="phoneSuccess && !isRegist && phoneExit"><img src="../assets/img/Group.png" width="14" height="14">该号码可注册</p> -->
                        <!-- <p class="phoneFailed" v-if="phoneSuccess && isRegist && phoneExit">该号码已注册</p> -->
                    </el-form-item>
                    <p class="hint">手机号为帐号登录凭证，请使用长期有效手机号</p>
                    
                      <el-dialog title="图片验证码" :visible.sync="dialogFormVisible" width="550px">
                        <el-form-item label="图片验证码" prop="imgCode" class="has-hint auth-code">
                          <el-input ref="imgCode" placeholder="图片验证码" v-model="registerForm.imgCode"></el-input>
                          <div class="imgCode">
                            <img :src="codeUrl">
                          </div>
                        </el-form-item>
                        <p class="hint">请填写图片中的字符，不区分大小写<a @click="freshCode(registerForm)">看不清楚？换一张</a></p>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" :disabled="!registerForm.imgCode" @click="confirmImgCode">确 定</el-button>
                        </span>
                      </el-dialog>
                    
                    <!-- <el-form-item label="图片验证码" prop="imgCode" class="has-hint auth-code">
                        <el-input ref="imgCode" placeholder="图片验证码" v-model="registerForm.imgCode">
                        </el-input>
                        <div class="imgCode">
                          <img :src="codeUrl">
                        </div>
                    </el-form-item>
                    <p class="hint">请输入图形验证码，不区分大小写<a  @click="freshCode(registerForm)">看不清楚？换一张</a></p> -->
                    <el-form-item label="短信验证码" prop="dxCode" class="auth-code has-hint">
                      <el-input placeholder="请输入短信验证码" v-model="registerForm.dxCode">
                      </el-input>
                      <el-button type="primary" class="getDxCode" :class="{'grayBtn': getDxCodeDisabled || !registerForm.phone}" :disabled="getDxCodeDisabled || !registerForm.phone" @click="openImgCode">{{ dxCodeBtnText }}</el-button>
                    </el-form-item>
                    <p class="hint">请查收手机短信，并填写短信中的验证码</p>
                    <el-form-item label="密码" prop="pass" class="has-hint">
                        <el-input type="password" v-model.trim="registerForm.pass" placeholder="请输入密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <p class="hint">密码至少由6个字符组成，必须包含数字、字母</p>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerForm.checkPass" placeholder="请再次输入密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="联系邮箱" prop="email" class="has-hint">
                        <el-input placeholder="请输入联系邮箱" v-model="registerForm.email"></el-input>
                    </el-form-item>
                    <p class="hint">输入联系邮箱，用于系统通知，消息通知等</p> -->
                    <el-form-item class="agree">
                        <el-checkbox v-model="agreeCheck">同意
                            <a @click="toUserNotice">《法律声明》</a>和
                            <a @click="toPrivacyPolicy">《隐私权相关政策》</a>
                        </el-checkbox>
                    </el-form-item>
                    <el-form-item class="agree">
                        <el-button class="register-btn" type="primary" :disabled="!(agreeCheck && registerBtnAble)" @click="submitForm('registerForm')" :loading="register">立即注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters,mapActions} from 'vuex'
import {
  Message
} from 'element-ui'

export default {
 computed: {
      ...mapState({
        codeUrl: state => state.user.codeUrl,
        isRigist: state => state.user.isRigist
      }),
      ...mapGetters({}),
    },
  data() {
    var validateName = (rule, value, callback) => {
      //昵称不含特殊字符 
      let reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
      if(!value) {
        callback(new Error('请输入昵称'))
      } else if(!reg.test(value)) {
        callback(new Error('昵称不包含空格及特殊字符'))
      } else {
        callback()
      }
      
    }
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        this.phoneSuccess = false
        return callback(new Error("请填写手机号码"));
      } else if (!/^((1[3-9][0-9])+\d{8})$/.test(value)) {
        this.phoneSuccess = false
        return callback(new Error("请填写有效的11位手机号码"));
      } else {
        this.$store.dispatch({type: 'isRigist', phone: value}).then(res => {
          if (res.data) {
            return callback(new Error('该号码已被使用'));
          } else {
            this.phoneSuccess = true;
            return callback();
          }
        });
      }
    };
    var validatePass = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/
      if (value.trim() === "") {
        callback(new Error("请输入密码"));
      } else if(!reg.test(value.trim())) {
        callback(new Error("密码必须包含数字和字母"))
      }
      else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      register:false,
      dialogFormVisible: false,
      countNum: 60,
      // phoneSuccess: false,
      getDxCodeDisabled: false, // 获取短信验证码按钮是否可用
      resetSuccess: false,    // 注册是否成功
      countdown: 60,
      dxCodeBtnText: "获取验证码", // 短信验证码按钮文字
      registerBtnAble: false,
      agreeCheck: "",
      // isRegist: false,
      // phoneExit: false,
      registerForm: {
        name: "",
        phone: "",
        imgCode: "",
        dxCode: "",
        pass: "",
        checkPass: "",
        purpose: '9'
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { max: 10, message: "10字符以内"},
          { validator: validateName, trigger: "blur"}
        ],
        phone:[
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        imgCode: [
          { required: true, message: "请输入图片验证码", trigger: "blur" }
        ],
        dxCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6-16位", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        email: [{ required: true, message: "请填写邮箱", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(['set_orgname','set_orgstate','user_name']),
    /**
       * 刷新图形验证码
       */
      async freshCode(registerForm) {
        await this.$store.dispatch({type: 'pictureCode', phone: registerForm.phone,  purpose: '9'});
      },
    // 获取短信验证码倒计时
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
      // if(!/^((1[3-9][0-9])+\d{8})$/.test(this.registerForm.phone)){
      //   Message.error('请输入正确的手机号码');
      //   return false;
      // }
      this.$refs['registerForm'].validateField('phone', errorMessage => {
        if (!errorMessage) {
          this.dialogFormVisible = true;
          this.freshCode(this.registerForm);
        }
      });
    },
    //验证是否注册
    // validRegist(){
    //   if(/^((1[3-9][0-9])+\d{8})$/.test(this.registerForm.phone)){
    //     this.phoneExit=true
    //     //console.log('验证是否注册')
    //     this.$store.dispatch({type: 'isRigist', phone: this.registerForm.phone}).then(() =>{
    //       //console.log("isRigist:"+this.isRigist);
    //       if(this.isRigist){
    //         //console.log("已注册")
    //         this.isRegist=true;
    //       }else{
    //         //console.log("未注册")
    //         this.isRegist=false;
    //       }
    //     });
        
    //   }else{
    //     this.phoneExit = false
    //   }
    // },

    //验证图形验证码是否填写
    confirmImgCode() {
      this.dialogFormVisible = false
      this.sendMsgCode('registerForm', this.registerForm)
    },

    async sendMsgCode(formName, registerForm) {
        
        await this.$store.dispatch({
          type: 'sendMsgCode',
          msgInfo: {phone: registerForm.phone, picture_code: registerForm.imgCode, purpose: '9'}
        });
        if(typeof this.$store.getters.smsState === 'object') {
          this.$message.error(this.$store.getters.smsState.msg)
        } else if(typeof this.$store.getters.smsState === 'string') {
          this.getDxCode();
          this.$message.success(this.$store.getters.smsState);
        } 
      },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          //console.log("error submit!!");
          return;
        }
         let userInfo = {
          phone: this.registerForm.phone,
          msg_code: this.registerForm.dxCode,
          password: this.registerForm.pass,
          real_name: this.registerForm.name
        };
        this.register = true;
      this.$store.dispatch({type: 'authSignUp', userInfo: userInfo}).then(()=>{
        this.register = false;
        this.$store.dispatch({type: 'login', 
        req: {
          password: this.registerForm.pass, 
          phone: this.registerForm.phone
        },
        vm:this
        }).then((res)=>{
          this.set_orgname('');
          this.set_orgstate('0');
          this.user_name(res.data.realName);
          this.$emit("outLogin",true);
          this.$router.push({path:'/registerSuccess', query:{phone:this.registerForm.phone}});
        });
        
      });
      });
     
    },
    toUserNotice() {
      const {href} = this.$router.resolve({
        name: 'userNotice'
      })
      window.open(href, '_blank')  //_blank:新窗口打开
    },
    toPrivacyPolicy() {
      const {href} = this.$router.resolve({
        name: 'privacyPolicy'
      })
      window.open(href, '_blank')  //_blank:新窗口打开
    },

    isFull() {
      let l = 0
      for (let i in this.registerForm) {
        if(this.registerForm[i]) {
          l ++
        }
      }
      if(l >= 7) {
        this.registerBtnAble = true
      } else {
        this.registerBtnAble = false
      }
    }
  },

  updated() {
    this.isFull()
  },

  watch: {
    dialogFormVisible(curVal, oldVal) {
      if(curVal) {
        this.registerForm.imgCode = ''
      }
    }
  }
};
</script>

<style lang="scss">
$green-color: #35B53F;
.register {
  .register-wrapper { 
    .page-register {
        min-width: 900px;
        background-color: #FFFFFF;
        padding: 80px 0;
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

            .el-checkbox{
                border-color: $green-color;
                .el-checkbox__label {
                    color: #666666;
                    a {
                        color: #3C9EF8;
                    }
                }
            }
            .el-checkbox.is-checked {
               .el-checkbox__inner {
                    background-color: $green-color;
                }

                .el-checkbox__label {
                    color: #666666;
                    a {
                        color: #3C9EF8;
                    }
                }
            }
            .register-btn {
                background-color: $green-color;
                border-color: $green-color;
                &.is-disabled {
                    background-color: #7fcc7f;
                    border-color: #7fcc7f;
                }
            }

            .phoneSuccess {
                font-size: 12px;
                color: #04730E;
                letter-spacing: 0.17px;
                text-align: left;
                img {
                  vertical-align: middle;
                  margin-right: 6px;
                }
                
            }

            .phoneFailed {
                font-size: 12px;
                color: #f56c6c;
                letter-spacing: 0.17px;
                text-align: left;
                img {
                  vertical-align: middle;
                  margin-right: 6px;
                }
                
            }
        }

        .el-dialog {
          .el-dialog__body {
            border-top: 1px solid #E7E7E7;
            border-bottom: 1px solid #E7E7E7;
          }
        }
    }

    .el-form-item:not(.auth-code) {
      .el-input {
        text-align: left;
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

    .agree.el-form-item {
      text-align: left;
    }
  }
}
</style>

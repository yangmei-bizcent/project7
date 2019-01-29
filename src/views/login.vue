<template>
  <div class="page-container page-login">
    <div class="loginContain">
      <div class="loginBg">
        <img src="../assets/img/loginBg.png" />
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <div class="rubikLogo">
          <img src="../assets/img/rubikLogo.png" />
        </div>
        <el-form-item label="" prop="phone">
          <el-input v-model="loginForm.phone" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item class="mb10" label="" prop="password">
          <u class="checkPass" @click="changeType()">
            <img :src="seen ? seenImg : unseenImg" />
          </u>
          <el-input class="loginPass" type="password" v-model="loginForm.password" placeholder="请输入您的密码" auto-complete="off"
            v-if="pwdType"></el-input>
          <el-input class="loginPass" v-model="loginForm.password" placeholder="请输入您的密码" auto-complete="off" v-else></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('loginForm')" :loading="loadingLogin1">登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="textAlignRight">
            <span @click="$router.push('/passwordConfig/forgetPass')" class="cursorPointer">忘记密码</span>
            &nbsp;|&nbsp;
            <span @click="$router.push('/authentication/authenStepOne')" class="cursorPointer colorGlass">申请注册</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="选择登录机构" :visible.sync="selectOrgzVisible" width="30%">
      <span>该账户下存在多条机构，请您选择登录机构：</span>
      <el-select v-model="loginForm.orgz" placeholder="请选择">
        <el-option v-for="item in orglist" :key="item.id" :label="item.name" :value="item.platformHospitalId">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmOrgz">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import {apiurl} from '@/service/api.js';
import {axiosConfig} from '@/service/config.js';
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'
  import seenImg from '@/assets/img/index/passLookIcon.png';
  import unseenImg from '@/assets/img/index/passHiddenIcon.png';
  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else if (!/^((1[3-9][0-9])+\d{8})$/.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        }
        return callback();
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else {
          var reg = /[\u4e00-\u9fa5]/;
          if (reg.test(value)) {
            callback(new Error('密码可输入字母/数字/大写字母/特殊符号'));
          }
        }
        return callback();
      };
      return {
        pwdType: true,
        seen: '',
        seenImg: seenImg, //看得见密码
        unseenImg: unseenImg, //看不见
        selectOrgzVisible: false,
        loginForm: {},
        rules: {
          phone: [{
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
          password: [{
              min: 6,
              max: 16,
              message: '密码长度为6-16位',
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ]
        },
        loadingLogin1:false
      };
    },
    computed: {
      ...mapState({
        orglist: state => state.user.organizationList
      }),
      ...mapGetters({
        orgname: 'orgname',
        orgstate: 'orgstate'
      }),
    },
    mounted() {
      // 获取token，获取方式this.token
      //console.log(this.token);
    },
    methods: {
      //密码的显示隐藏
      changeType: function () {
        this.seen = !this.seen; //小眼睛的变化
        this.pwdType = !this.pwdType; //跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
      },
      // 引入修改vuex的方法，如修改token，this.set_token('11111111');
      ...mapActions(['set_token', 'set_orgname', 'set_orgstate', 'user_name','set_moduleper']),
      toRegister() {
        this.$router.push({
          path: '/register'
        })
      },
      banIECache (url, connector = '&') {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          return url + connector + `t=${ new Date().getTime() }`;
        } else {
          return url;
        }
      },
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadingLogin1 = true;
            this.$store.dispatch({
              type: 'login',
              req: this.loginForm,
              vm:this
            }).then((res) => {
              this.loadingLogin1 = false;
              this.user_name(res.data.realName);
              this.$store.dispatch({
                type: 'listOrganization'
              }).then((res) => {
                this.set_orgname("");
                if (res.data.length == 1) {
                  this.set_orgname(res.data[0].name);
                  this.set_orgstate(1)
                }
                if(res.data.length>=2){
                  this.set_orgstate(2)
                }
                //console.log(res);
                if (res.data.length == 0) {
                  this.set_orgname('');
                  this.set_orgstate('0');
                  this.goConfigRoute();
                } else if (res.data.length == 1) {
                  this.selectedOrganiz = res.data[0].platformHospitalId
                  this.$store.dispatch({
                    type: 'chooseOrg',
                    req: {
                      org_id: this.selectedOrganiz
                    }
                  }).then(() => {
                    this.getFeatures();//权限控制
                    this.goConfigRoute();
                  })
                } else {
                  this.$router.push('/chooseOrganiz/false')
                }
              })
            });
          } else {
            return false;
          }
        });
        // if (this.$store.getters.organizationList.length > 0) {
        //   this.selectOrgzVisible = true;
        //   return;
        // }
        // this.$message.error('您的账号还未分配机构');
      },
      goConfigRoute(){
        this.loadingLogin=true;
        setTimeout(()=>{
          this.loadingLogin=false;
          this.$router.replace({
            path: `/visConfig/visualizationConfiguration`
          })
         },1000)
      },
      confirmOrgz() {
        this.selectOrgzVisible = false;
        if (!this.loginForm.orgz) {
          this.$message.error("请选择机构");
          return false;
        }
        this.$store.dispatch({
          type: 'chooseOrg',
          req: {
            org_id: this.loginForm.orgz
          }
        })
      },
      getFeatures(){//获取各模块权限
          let url = this.banIECache(apiurl.getuserFeatures, '?');
          axios.get(url,axiosConfig).then((res)=>{
            if(res.data){
              this.set_moduleper(res.data);
            }
              //console.log('各模块权限',res)
          })
      },
    }
  }

</script>

<style lang="scss">
  .page-login {
    position: relative;
    min-width: 1200px;
    height: 100%;
    min-height: 650px;

    .loginContain {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      min-width: 1000px;
      max-width: 1200px;

      .loginBg {
        font-size: 0;
        border-radius: 3.71px;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .el-form {
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        right: 6%;
        transform: translate(0, -50%);
        width: 380px;
        height: 442px;
        padding: 0 30px;
        background: rgba(255, 255, 255, 0.90);
        border-radius: 10px;
        overflow: hidden;

        .rubikLogo {
          width: 200px;
          margin: 50px auto;
          font-size: 0;

          img {
            width: 100%;
          }
        }

        .el-form-item {
          position: relative;
          margin-bottom: 20px;

          .el-input__inner {
            height: 46px;
            margin: 0;
            padding-left: 42px;
            line-height: 44px;
            font-size: 16px;
            background: url(../assets/img/loginAccountIcon.png) no-repeat 20px;
            background-size: 13px;
          }

          .loginPass .el-input__inner {
            padding-right: 46px;
            background: url(../assets/img/loginPassIcon.png) no-repeat 20px;
            background-size: 12px;
          }

          .checkPass {
            box-sizing: border-box;
            z-index: 100;
            position: absolute;
            top: 0;
            right: 4px;
            display: block;
            width: 44px;
            height: 44px;
            text-align: center;
            line-height: 44px;
            cursor: pointer;
          }
        }

        .mb10 {
          margin-bottom: 10px;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #09B52D;
          border-color: #09B52D;
        }

        .el-checkbox__inner:hover {
          border-color: #09B52D;
        }

        .el-checkbox__input.is-checked+.el-checkbox__label {
          color: #666;
        }

        .el-button--success {
          width: 100%;
          color: #fff;
          background-color: #09B52D;
          border-color: #09B52D;
        }

        .el-button--success.is-disabled,
        .el-button--success.is-disabled:active,
        .el-button--success.is-disabled:focus,
        .el-button--success.is-disabled:hover {
          color: #fff;
          background-color: #98E0A7;
          border-color: #98E0A7;
        }

        .textAlignRight {
          line-height: 20px;
          font-size: 12px;
          color: #666666;
          letter-spacing: 0;
        }

        .colorGlass {
          color: #04730E;
        }
      }
    }
  }

</style>

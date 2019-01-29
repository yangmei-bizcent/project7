<template>
  <div class="productExperence">
    <div class="product">
      <div class="media">
        <video v-bind:class="{ videoTop: videoTop ,videoBottom:videoBottom}" controls="controls" controlslist="nodownload"
          ref="productVideo" :poster="poster" oncontextmenu="return false;">
          <source src="http://rubikx-10001356.cossh.myqcloud.com/rubikt/promotionalvideo.mp4" type="video/mp4">
        </video>
        <div v-bind:class="{ close:close,showClose:showClose}"><span @click="closeVideo">X</span></div>
      </div>
    </div>
    <div class="custom">
      <img src="../../assets/img/authentication/middleCircle.png" class="middleCircle">
      <div class="customcontent">
        <img src="../../assets/img/authentication/custommenus.gif" class="custommenus">
        <div class="custommenu">
          <h1 class="servemenu">服务号自定义菜单</h1>
          <div class="line"></div>
          <p>微信服务号菜单配置<br>
            轻松选择应用增加/删除自定义菜单<br>
            修改自定义菜单信息<br>
            选择/配置应用链接<br>
            一键发布用户立即使用
          </p>
        </div>
      </div>
    </div>
    <div class="website">
      <div class="smallwebsiteContent">
        <div class="smallwebsite">
          <h1 class="webmenu">微官网</h1>
          <div class="webline"></div>
          <p>定制h5移动端官网<br>
            多样化功能模板<br>
            功能菜单信息修改<br>
            功能图标自定义<br>
            选择配置应用功能链接
          </p>
        </div>
        <img src="../../assets/img/authentication/webmenu.gif" class="webmenuImg">
      </div>
    </div>
    <div class="service">
      <div class="content">
        <img src="../../assets/img/authentication/market.gif" class="marketImg">
        <div class="content-left">
          <h1>应用市场</h1>
          <div class="line"></div>
          <p>
            应用精品打造<br>
            多年支持医院使用打磨<br>
            囊括院内外应用<br>
            每个应用都有专属配置后台
          </p>
        </div>
      </div>
    </div>
    <div class="login">
      <div class="login-register">
        <h2>开启极速体验之旅途
          <span class="h2Line"></span>
        </h2>
        <div class="welcomeTravel">
          <div class="loginbefore" v-show="loginbefore">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs" :stretch="true">

              <el-tab-pane label="账号" name="first">
                <el-form ref="loginForm" :model="loginForm">
                  <el-form-item>
                    <el-input class="accountInput" v-model="loginForm.phone" placeholder="请输入账号"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input class="passwordInput" type="password" v-model="loginForm.password" placeholder="请输入您的密码">
                    </el-input>
                  </el-form-item>
                </el-form>
                <el-button @click="submitForm('loginForm')" class="login" :loading="productLogin">登录</el-button>
                <span class="forgetPassword" @click="toForgetPass">忘记密码</span>
                <span class="applyRegister" @click="toRegister">申请注册</span>
              </el-tab-pane>
              <el-tab-pane label="微信" name="second">
                <div class="textAlignCenter">
                  <div>
                    <i v-show="!helpLoginShow" class="qrcode-wxlogin" id="qr-code"></i>
                    <i v-show="helpLoginShow" class="help-wxlogin"></i>
                  </div>
                  <p class="sacn">请使用微信扫码</p>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="loginSuccess" v-show="loginSuccess">
            <p class="welcome">欢迎您</p>
            <div>
              <i class="photo-userlogined"></i>
            </div>
            <p class="username">{{userName}}</p>
            <el-button type="success" @click="enterPlatform">进入开放平台</el-button>
            <p class="configuration">点击进入配置专属互联网医院</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    axiosget,
    axiospost,
    aixospatch,
    axiosConfig
  } from "../../service/config.js"
  import axios from 'axios';
  import {
    apiurl
  } from '@/service/api.js';
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'
  import indexFooter from '../../components/indexFooter'
  import {
    exportLocalUrl
  } from "../../service/baseuri"

  export default {
    data() {
      return {
        videoTop: true,
        videoBottom: false,
        close: true,
        showClose: false,
        productLogin: false,
        helpLoginShow: false,
        poster: require('@/assets/img/authentication/product.png'),
        activeName: 'first',
        loginActiveTab: 'logintypeAccount',
        loginForm: {
          phone: '',
          password: '',
          remember: false,
        },
        loginbefore: true,
        loginSuccess: false,
        accountNumberShow: true,
        weixinShow: false,
        isActive: true,
        noActive: false,
        isLogined: false,
        indexHeaderChangeTheme: false, //页面滚动时，header更换主题
        //activeTopMenu: 'product', // 
        corporateComsList: [],
        play: true,
        style: ''
      };
    },
    created() {
      if (sessionStorage.getItem('token')) {
        this.loginbefore = false;
        this.loginSuccess = true;
      }
      axiosget(`/application/cooperation/web/getSimpleCooperationCaseListByPage?date=${new Date().getTime()}`).then(
        res => {
          this.corporateComsList = res.data;
        })
    },
    components: {
      indexFooter,
    },
    computed: {
      // 从vuex状态管理中 直接获取token
      ...mapGetters({
        token: 'token',
        userName: 'userName',
        orgname: 'orgname',
        orgstate: 'orgstate'
      })
    },
    async mounted() {
      window.addEventListener('scroll', this.handlePageScroll);
      if (sessionStorage.getItem('token') != null) {
        this.isLogined = true;
      } else {
        this.isLogined = false;
      }
      let obj = new WxLogin({
        id: "qr-code",
        appid: "wx312a55fd0dc9cebd",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent(exportLocalUrl + "/setCountLoading"),
        state: "1111",
        style: "black",
        href: "data:text/css;base64,Ym9keSB7bWFyZ2luOiAwfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE0MHB4OyBoZWlnaHQ6IDE0MHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAucGFuZWxDb250ZW50IHtwb3NpdGlvbjogcmVsYXRpdmU7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19icm93c2VyIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyB7cG9zaXRpb246IGFic29sdXRlO3RvcDogMDtsZWZ0OiAwO3BhZGRpbmc6IDUycHg7YmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyBpIHttYXJnaW4tcmlnaHQ6IDA7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19zdWNjIC5zdGF0dXNfdHh0IHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5xcmNvZGUge21hcmdpbi10b3A6IDB9DQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmV9DQouaW1wb3dlckJveCAuc3RhdHVzIHt0ZXh0LWFsaWduOiBjZW50ZXI7fQ=="
      })
    },
    methods: {
      ...mapActions(['set_orgname', 'set_orgstate', 'user_name', 'set_moduleper']),
      banIECache (url, connector = '&') {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          return url + connector + `t=${ new Date().getTime() }`;
        } else {
          return url;
        }
      },
      handleClick(tab, event) {
        ////console.log(tab, event);
      },
      helpLoginHover() {
        this.helpLoginShow = true;
      },
      helpLoginBlur() {
        this.helpLoginShow = false;
      },
      closeVideo() {
        this.videoTop = true;
        this.videoBottom = false;
        this.showClose = false;
        this.close = true;
        window.removeEventListener('scroll', this.handlePageScroll);
      },
      enterPlatform() {
        this.$router.push({
          path: '/visConfig/visualizationConfiguration'
        });
      },
      openIndex() { //打开首页
        window.open('#/');
      },
      goConfingFun() { //配置台路由
        this.$router.push({
          name: 'visualizationConfiguration'
        });
      },
      goRester() { //打开注册页面
        window.open('#/register');
      },
      goSelectOrg() { //选择机构
        this.$router.push('/chooseOrganiz/false');
      },
      goOrg() { //没有机构的选择机构
        this.$router.push('/authentication/authenStepOne');
      },
      handRouter(command) { //配置后台切换
        let arrCommand = ['seting'];
        let arrRouter = ['visualizationConfiguration'];
        arrCommand.forEach((val, index) => {
          if (command == val) {
            this.$router.push({
              name: arrRouter[index]
            });
          }
        })
      },
      handleAccount(command) {
        switch (command) {
          case "accountManage":
            this.accountManage();
            break;
          case "orgAuthInfo":
            this.orgAuthInfo();
            break;
          case "adminConfig":
            this.adminConfig();
            break;
          case "HospitalInformationManagement":
            this.HospitalInformationManagement();
            break;
          case "changeOrg":
            this.changeOrg();
            break;
          case "identityAccount":
            this.identityAccount();
            break;
          case "signOut":
            this.signOut();
            break;
          default:
            break;
        }
      },
      accountManage() {
        ////console.log("账户管理")
        this.$router.push(`/personalCenter/accountManage`)
      },
      orgAuthInfo() {
        this.$router.push(`/personalCenter/accountInfo`)
      },
      adminConfig() {
        this.$router.push(`/personalCenter/personalSettings`)
      },
      HospitalInformationManagement() {
        this.$router.push(`/hospInfoDeploy/hospInfoDeploy`)
      },
      changeOrg() {
        ////console.log("切换机构")
        this.$router.push('/chooseOrganiz/true')
      },
      identityAccount() {
        ////console.log("认证机构")
      },
      async signOut() {
        ////console.log("退出登录!");
        await this.$store.dispatch({
          type: 'signOut',
          req: {}
        });
        // localStorage.removeItem('token');
        // localStorage.removeItem('userName');
        localStorage.clear();
        sessionStorage.clear()
        this.set_orgname('');
        this.set_orgstate('0');
        this.$router.go(0);
      },
      async handleOrg(command) {
        ////console.log("机构")
        await this.$store.dispatch({
          type: 'chooseOrg',
          req: {
            org_id: command
          }
        })
      },
      // 页面滚动，页面header主题更改
      handlePageScroll() {
        if (this.play) {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop > 540) {
            this.videoTop = false;
            this.videoBottom = true;
            this.close = false;
            this.showClose = true;
          } else {
            this.videoTop = true;
            this.videoBottom = false;
            this.close = true;
            this.showClose = false;
          }
        }
      },
      handleAccount(command) {
        switch (command) {
          case "accountManage":
            this.accountManage();
            break;
          case "orgAuthInfo":
            this.orgAuthInfo();
            break;
          case "adminConfig":
            this.adminConfig();
            break;
          case "HospitalInformationManagement":
            this.HospitalInformationManagement();
            break;
          case "changeOrg":
            this.changeOrg();
            break;
          case "identityAccount":
            this.identityAccount();
            break;
          case "signOut":
            this.signOut();
            break;
          default:
            break;
        }
      },
      // 页面顶部导航点击事件
      indexHeaderTabClick(tab, event) {
        let self = this;
        ////console.log(this.activeTopMenu);
        switch (self.activeTopMenu) {
          case 'index':
            this.$router.push({
              'name': 'index'
            })
            break;
          case 'service':
            this.$router.push({
              'name': 'serCenIndex'
            })
            break;
          case 'product':
            this.$router.push({
              'name': 'productExperence'
            })
            break;
          case 'help':
            this.$router.push({
              'name': 'help'
            })
            break;
          case 'example':
            this.$router.push({
              'name': 'corporateCom'
            })
            break;
          case 'contact':
            this.$router.push({
              'name': 'aboutUs'
            })
            break;
          case 'about':
            window.open("http://www.zhuojianchina.com/gyzjqyjs.jhtml");
            break;
          default:
            this.$notify.info({
              title: '消息',
              message: '此页面正在飞速搭建中，如有疑问请联系在线客服'
            });
            // self.$message('此页面正在飞速搭建中，如有疑问请联系在线客服');
            break;
        }
      },
      openComDetail(cooperationCaseId) {
        this.$router.push({
          path: '/corporateCom/corporateComDetail',
          query: {
            cooperationCaseId: cooperationCaseId
          }
        })
      },
      //产品体验方法
      account() {
        this.accountNumberShow = true;
        this.weixinShow = false;
        this.isActive = true;
        this.noActive = false;
      },
      weixin() {
        this.accountNumberShow = false;
        this.weixinShow = true;
        this.isActive = false;
        this.noActive = true;
      },
      toForgetPass() {
        window.open('#/passwordConfig/forgetPass');
      },
      toRegister() {
        window.open('#/register');
      },
      async submitForm(formName) {
        ////console.log('form', formName)
        this.$refs[formName].validate((valid) => {
          ////console.log('va', valid)
          if (valid) {
            ////console.log('submit!');
            this.confirmOrgz = true;
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
        if (this.confirmOrgz) {
          this.productLogin = true;
          this.$store.dispatch({
            type: 'login',
            req: this.loginForm,
            vm: this
          }).then((res) => {
            this.productLogin = false;
            this.user_name(res.data.realName);
            //this.isLogined = true;
            this.loginbefore = false;
            this.loginSuccess = true;
            this.$store.dispatch({
              type: 'listOrganization'
            }).then((res) => {

              this.set_orgname("");
              if (res.data.length == 1) {
                this.set_orgname(res.data[0].name);
                this.set_orgstate(1)
              }
              if (res.data.length >= 2) {
                this.set_orgstate(2)
              }
              ////console.log(res);
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
                }).then(async (res1) => {
                  await this.getFeatures(); //获取各模块权限
                  await this.goConfigRoute();
                })

              } else {
                this.productLogin = false;
                this.$router.push('/chooseOrganiz/false')
              }
            })
          });
        }
      },
      goConfigRoute() {
        setTimeout(() => {
          this.$router.replace({
            path: `/visConfig/visualizationConfiguration`
          })
        }, 1000)
      },
      async getFeatures() { //获取各模块权限
        let url = this.banIECache(apiurl.getuserFeatures, '?');
        await axios.get(url, axiosConfig).then((res) => {
          if (res.data) {
            this.set_moduleper(res.data);
          }
          // //console.log('各模块权限',res)
        })
      },
    },
  };

</script>

<style lang="scss">
  @import '@/assets/css/product.scss';

</style>

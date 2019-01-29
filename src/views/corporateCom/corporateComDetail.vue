<template>
  <div class="corporateCom">
    <section class="comBanner" v-for="n in comDetailList">
      <div class="bannerImg" :style="{background: 'url('+n.url+') no-repeat center',borz:'red'}"></div>
    </section>
    <section class="comDetail">
      <img v-for="n in caseFunctionsList" :src="n.url" />
    </section>
    <!-- FOOTER -->
  </div>
</template>
<script>
  import {
    axiosget,
    axiospost,
    aixospatch
  } from "../../service/config.js"
  import {
    mapState,
    mapGetters
  } from "vuex";
  import indexFooter from '../../components/indexFooter'
  export default {
    data() {
      return {
        isLogined: false, //是否已登录
        indexHeaderChangeTheme: true, //页面滚动时，header更换主题//true变色
        activeTopMenu: 'example', // 
        comDetailList: [],
        caseFunctionsList: [],
      };
    },
    created() {
      this.cooperationCaseId = this.$route.query.cooperationCaseId;
      axiosget(`/application/cooperation/web/getCooperationCaseDetail?cooperationCaseId=${this.cooperationCaseId}&date=${new Date().getTime()}`).then(
        res => {
          this.comDetailList = res.data.caseDetails;
          this.caseFunctionsList = res.data.caseFunctions;
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
    mounted() {
      window.addEventListener('scroll', this.handlePageScroll);
      if (sessionStorage.getItem('token') != null) {
        this.isLogined = true;
      } else {
        this.isLogined = false;
      }
    },
    methods: {
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
        //console.log("账户管理")
        this.$router.push(`/personalCenter/accountManage`)
      },
      orgAuthInfo() {
        this.$router.push(`/personalCenter/accountInfo`)
      },
      adminConfig() {
        this.$router.push(`/personalCenter/personalSettings`)
      },
      changeOrg() {
        //console.log("切换机构")
        this.$router.push('/chooseOrganiz/true')
      },
      identityAccount() {
        //console.log("认证机构")
      },
      async signOut() {
        //console.log("退出登录!");
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
        //console.log("机构")
        await this.$store.dispatch({
          type: 'chooseOrg',
          req: {
            org_id: command
          }
        })
      },
      // 页面滚动，页面header主题更改
      // handlePageScroll() {
      // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // // //console.log(scrollTop);
      // if (scrollTop > 330) {
      // this.indexHeaderChangeTheme = true;
      // } else {
      // this.indexHeaderChangeTheme = false;
      // }
      // },
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
        //console.log(this.activeTopMenu);
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
            // case 'product':
            //     this.$router.push({
            //         path: '/'
            //     })
            //     break;
          case 'help':
            this.$router.push({
              'name': 'help'
            })
            break;
          case 'example':
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
      //当前页: ${val}
      handleCurrentChange(val) {
        axiosget(
          `/application/cooperation/web/getSimpleCooperationCaseListByPage?pageNo=${val}&pageSize=12`
        ).then(
          res => {
            this.corporateComsList = res.data;
          })
      },
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "/corporateCom.scss";

</style>

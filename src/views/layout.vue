<template>
  <el-container class="page-container page-layout layout_minWidth">
    <el-header height="70px" class="layout-header width100 fixed flex-align-justifybetween" :class="{ productClass: productClass,indexClass:!productClass,productHeadClass:productHeadClass,productColor:productHeadClass }">
      <div class="flex-align-justifystart">
        <img src="../assets/img/index/rubikt-logo-white.png" alt="logo" class="marginleft40 layout-logo" style="cursor: pointer;"
          @click="openIndex()" v-show="productHead"/>
          <img src="../assets/img/index/rubikt-logo-dark.png" alt="logo" class="marginleft40 layout-logo" style="cursor: pointer;"
          @click="openIndex()" v-show="!productHead" />
        <el-tabs v-model="activeTopMenu" @tab-click="layoutHeaderTabClick" class="layout-header-tabs" v-show="tabShow">
          <el-tab-pane label="首页" name="index"></el-tab-pane>
          <el-tab-pane label="应用中心" name="service"></el-tab-pane>
          <!-- <el-tab-pane label="开发者中心" name="developer"></el-tab-pane> -->
          <el-tab-pane label="产品体验" name="product"></el-tab-pane>
          <el-tab-pane label="帮助指引" name="help"></el-tab-pane>
          <el-tab-pane label="合作案例" name="example"></el-tab-pane>
          <el-tab-pane label="联系我们" name="contact"></el-tab-pane>
          <el-tab-pane label="关于卓健" name="about"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-show="tabShow">
        <div class="layout-header-tool" v-show="loginState">
          <div class="no_org" style="margin:0;" @click="goConfingFun()" :class="{ configurationTableClass : productHeadClass}">
            <div class="headLogo">
              <img src="../assets/img/index/config_icon.png" />
            </div>
            <div class="no_org_text">
              配置台
            </div>
          </div>
          <div class="no_org" v-show="jgState==0 &&(jgName==''||jgName==null)" @click="goOrg()">
            <div class="headLogo">
              <img src="../assets/img/index/person_icon.png" />
            </div>
            <div class="no_org_text">
              认证机构
            </div>
          </div>
          <div class="no_org" v-show="jgState!=0&&(jgName==''||jgName==null)" @click="goSelectOrg()">
            <div class="headLogo">
              <img src="../assets/img/index/person_icon.png" />
            </div>
            <div class="no_org_text">
              选择机构
            </div>
          </div>
          <el-dropdown @command="handleAccount" style="margin:0px 12px;" v-show="jgName==''?false:jgName==null?false:true" :class="{ configurationTableClass : productHeadClass}">
            <div class="el-dropdown-link">
              <div class="headLogo">
                <img src="../assets/img/index/person_icon.png" />
              </div>
              {{jgName}}
            </div>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="accountManage">账户管理</el-dropdown-item> -->
              <el-dropdown-item command="orgAuthInfo" v-show="AuthenticationShow">认证信息</el-dropdown-item>
              <el-dropdown-item command="adminConfig" v-show="JurisdictionShow">权限管理</el-dropdown-item>
              <el-dropdown-item command="HospitalInformationManagement" v-show="hosInfoShow">医院信息管理</el-dropdown-item>
              <el-dropdown-item command="messageService" v-show="msgSeverShow">短信服务</el-dropdown-item>
              <el-dropdown-item command="doctorSeting" v-show="DepartmentShow">科室医生信息配置</el-dropdown-item>
              <el-dropdown-item command="changeOrg">切换机构</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleAccount" style=" border-radius: 50%;">
            <div class="el-dropdown-link" style="padding: 16px;">
              <div class="headLogo" style="top:0px;left:0px;width:16px;height:16px;padding:16px;">
                <img src="../assets/img/index/rubik_person_icon.png" style="width: 16px;  height: 16px;" v-show="productHead" />
                <img src="../assets/img/index/rubik_person_icon_green.png" style="width: 16px;  height: 16px;" v-show="!productHead" />
              </div>
              <!-- 切换企业 -->
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="color: #04730E;" disabled>您好,{{userName}}</el-dropdown-item>
              <el-dropdown-item divided command="accountManage">账号管理</el-dropdown-item>
              <el-dropdown-item command="signOut">退出账户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="index-header-tool fontsize0" v-show="!loginState" style="margin-right: 113px;">
          <span @click="$router.push('/')" style="cursor: pointer;">登录</span>
          <span class="marginX20">|</span>
          <span type="text" @click="$router.push('/register')" style="cursor: pointer;">注册</span>
        </div>
      </div>
    </el-header>
    <el-container class="margintop70" :class={productMarginTop:productMarginTop,margintop70:!margintop70}>
      <el-aside width="310px" v-if="leftTabShow">
        <div style="width:250px;margin:0 auto;">
          <div class="left_tab_title">
            <i></i>
            <span>患者版微信服务号</span>
          </div>
          <el-menu active-text-color="#04730E" :router="true" :default-active="$route.fullPath" :default-openeds="activeArr"
            class="el-menu-vertical-demo" style="background:#F6F8F9;">
            <el-menu-item index="/publicServiceNum/serviceNumIndex" v-if="viewShow">
              <i class="icon_tab home_title"></i>
              <span>数据视图</span>
            </el-menu-item>
            <el-menu-item index="/publicServiceNum/customizedMenu" v-if="zdycdShow">
              <i class="icon_tab zdy_tab_icon"></i>
              <span>自定义菜单</span>
            </el-menu-item>
            <el-menu-item index="/dynamicMicroWeb/dynamicMicroWeb" v-if="wgwpzShow">
              <i class="icon_tab wgw_icon"></i>
              <span>微官网</span>
            </el-menu-item>
            <el-menu-item index="/publicServiceNum/materialsManage" v-if="SourceMaterialShow">
              <i class="icon_tab material_admin_icon"></i>
              <span>素材管理</span>
            </el-menu-item>
            <el-submenu index="2" v-show="boxBaseShow">
              <template slot="title">
                <i class="icon_tab seting_icon"></i>
                <span slot="title">设置</span>
              </template>
              <el-menu-item-group style="background:#F6F8F9;" ref="baseConfig">
                <el-menu-item index="/publicServiceNum/paySetting/PaymentSettings" v-if="payshinfoShow">支付商户配置</el-menu-item>
                <el-menu-item index="/publicServiceNum/uerAllocation" v-if="JzrpzShow">用户就诊人配置</el-menu-item>
                <!-- <el-menu-item index="/publicServiceNum/messageService/messageSignature" v-if="msgSeverShow">短信服务</el-menu-item> -->
                <!-- <el-menu-item index="/dynamicMicroWeb/dynamicMicroWeb" v-if="wgwpzShow">微官网配置</el-menu-item> -->
                
                <!-- <el-menu-item index="/hospInfoDeploy/hospInfoDeploy">医院信息配置</el-menu-item> -->
                <!-- <el-menu-item index="/publicServiceNum/paySetting">支付配置</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="3" v-show="boxConfigShow">
              <template slot="title">
                <i class="icon_tab seting_icon"></i>
                <span slot="title">信息配置</span>
              </template>
              <el-menu-item-group style="background:#F6F8F9;" ref="configInfo">
                <el-menu-item index="/publicServiceNum/uerAllocation" v-if="JzrpzShow">用户就诊人配置</el-menu-item>
                <el-menu-item index="/hospInfoDeploy/hospInfoDeploy">医院信息配置</el-menu-item>
                <el-menu-item index="" @click="openDepartDoctorConfig" v-if="DepartmentShow">科室医生信息配置</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="4" v-show="boxSeverShow">
              <template slot="title">
                <i class="icon_tab msg_icon"></i>
                <span slot="title">服务号消息管理</span>
              </template>
              <el-menu-item-group style="background:#F6F8F9;" ref="severInfo">
                <el-menu-item index="/devTips/1" v-if="SourceMaterialShow">素材管理（敬请期待）</el-menu-item>
                <el-menu-item index="/devTips/4" v-if="msgShow">消息管理（敬请期待）</el-menu-item>
                <el-menu-item index="/messageManage">消息管理</el-menu-item>
                <el-menu-item index="/devTips/5" v-if="keyWordShow">自动回复（敬请期待）</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <el-submenu index="5" v-show="myappShow">
              <template slot="title">
                <i class="icon_tab application_icon"></i>
                <span slot="title">我的应用</span>
              </template>
              <el-menu-item-group style="background:#F6F8F9;">
                <el-menu-item v-if="appList.length>0" v-for="item in appList" :key="item.applicationId" :index="`/serviceCenter/appDetail/2?applicationId=${item.applicationId}`" v-show="item.applicationId!='109b638d-f5e0-4313-aa6b-d0ac6d1cb64e'?true: DepartmentShow">{{item.applicationName}}</el-menu-item>
                <el-menu-item index="" @click="openLink('#/serviceCenter/serCenIndex')">添加更多应用</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="6">
              <template slot="title">
                <i class="icon_tab application_icon"></i>
                <span slot="title">应用管理后台临时入口</span>
              </template>
              <el-menu-item-group style="background:#F6F8F9;">
                <el-menu-item index="" @click="openDepartDoctorConfig" v-if="DepartmentShow">科室医生介绍</el-menu-item>
                <el-menu-item index="" @click="openReportConfig">报告单查询配置</el-menu-item>
                <el-menu-item index="" @click="openAppointConfig">预约挂号业务配置/流程配置</el-menu-item>
                <el-menu-item index="" @click="openVisitRecordConfig">就诊记录后台配置</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
          </el-menu>
        </div>
      </el-aside>
      <!-- <el-aside width="310px" v-if="leftDocTabShow">
        <div style="width:250px;margin:0 auto;">
          <div class="left_tab_title">
            <i></i>
            <span>医护版微信企业号</span>
          </div>
          <el-menu active-text-color="#04730E" :router="true" :default-active="$route.path" :default-openeds="activeArr"
            class="el-menu-vertical-demo" style="background:#F6F8F9;">
            <el-submenu index="1">
              <template slot="title">
                <i class="icon_tab seting_icon"></i>
                <span slot="title">基础设置</span>
              </template>
              <el-menu-item-group style="background:#F6F8F9;">
                <el-menu-item index="/docAccountManage/deptMumbers">医生账号管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="icon_tab application_icon"></i>
                <span slot="title">应用设置</span>
              </template>
              <el-menu-item-group style="background:#F6F8F9;">
                <el-menu-item index="/docAccountManage/docAccountManage">医生账号管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside> -->
      <el-main class="index-main width100" :class="{'special-main':$route.name==='appDetail'||'authenStepTwo'?true:false}">
        <!-- <header class="layout-page-title fontsize10 color-333">
          页面标题
        </header> -->
        <section class="layout-page-content" style="height:100%;">
            <router-view @outLogin="outLogin" :key="freshFilter.includes($route.name) ? '' : key"></router-view>
        </section>
      </el-main>
    </el-container>
    <!-- FOOTER -->
    <indexFooter style="padding:60px 0 20px;" :productFooter="productFooter"></indexFooter>
  </el-container>
</template>
<script>
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'
  import indexFooter from '../components/indexFooter'
  // import func from './vue-temp/vue-editor-bridge';
  import {
    exportLocalUrl,
    exportAppUrl,
  } from "@/service/baseuri";
  export default {
    data() {
      return {
        activeTopMenu: 'index',
        tabShow: true, //顶部导航是否显示
        activeArr: ['2', '3', '4', '5'],
        leftTabShow: false,
        leftDocTabShow: false,
        loginState: true, //登入state
        appList: [],
        jgState: 0,
        jgName: "",
        productHead:true,
        productClass:false,
        productHeadClass:false,
        productMarginTop:false,
        productFooter:false,
        margintop70:true,
        //权限控制
        viewShow:true,
        zdycdShow:false,
        wgwpzShow:false,
        payshinfoShow:false,
        JzrpzShow:false,
        DepartmentShow:false,
        SourceMaterialShow:false,
        msgShow:false,
        keyWordShow:false,
        myappShow:false,
        AuthenticationShow:false,
        JurisdictionShow:false,
        hosInfoShow:false,
        hosInfoDate:[],
        boxConfigShow:false,
        boxBaseShow:false,
        boxSeverShow:false,
        msgSeverShow:false,
        freshFilter: ['addDeptMumbers', 'deptMumbers', 'docAccountManage', 'mumbersInfo']
      }
    },
    computed: {
      ...mapState({
        identityInfo: status => true,
        currentDateInfo: state => state.user.currentDateInfo,
      }),
      ...mapGetters({
        userName: 'userName',
        phone: 'phone',
        orgname: 'orgname',
        orgstate: 'orgstate',
        token: 'token',
        chooseOrgInfo: 'chooseOrgInfo',
        moduleper:'moduleper'
      }),
      //解决路由query变化数据不刷新的问题
      key() {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
      }
    },
    components: {
      indexFooter,
    },
    created() {
      this.Jurisdiction();

      if(this.$route.name == "productExperence"){
          this.productClass = true ;
          this.productMarginTop=true;
          this.productFooter = true;
        }
      else if(this.$route.name == "corporateCom" || this.$route.name == "corporateComDetail" || this.$route.name == "aboutUs"){
          this.productClass = true ;
          this.productMarginTop=true;
          this.productFooter = false;
        }
        else{
          this.productClass = false ;
          this.productMarginTop=false;
          this.productFooter = false;
        }
      this.jgName = this.orgname;
      this.jgState = this.orgstate;
      this.activeTopMenu = this.setTab(this.$router.history.current.name); //控制顶部导航样式状态
      let self = this;
      if (sessionStorage.getItem('token') != null) {
        this.loginState = true;
        this.getLeftMYApplist();
        
      } else {
        this.loginState = false;
      }
      this.PathRouter(this.$route);
      this.leftPathRouter(this.$route);
      this.leftDocPathRouter(this.$route);
      this.controlShow(this.$route);
    },
    mounted(){
       window.addEventListener('scroll', this.handlePageScroll);
    },
    methods: {
      ...mapActions(['set_orgname', 'set_orgstate','set_moduleper']),
      handlePageScroll(){
       if(this.$route.name == "productExperence") {
         let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
         if(scrollTop < 100){
           this.productHead = true; 
           this.productHeadClass = false;
         }
         else{
            this.productHead = false; 
            this.productHeadClass = true;
         }
       }
       else{
          this.productHead = true; 
          this.productHeadClass = false;
       }
      },
      Jurisdiction(){
        //权限控制
        this.InitializationFun();
        // //console.log('jinlai',this.moduleper)
        if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
          this.moduleper.map(item=>{
            // //console.log(item.meta.title)
            item.children.map(item2=>{
              if(item2.feature_id==351004){//"数据视图页面"
                // this.viewShow=true;
              }else if(item2.feature_id==351011){//"自定义菜单配置"
                this.zdycdShow=true;
              }else if(item2.feature_id==351021){//"微官网配置"
                this.wgwpzShow=true;
              }else if(item2.feature_id==351031){//"支付商户信息配置"
                this.payshinfoShow=true;
              }else if(item2.feature_id==351041){//"用户就诊人配置"
                this.JzrpzShow=true;
              }else if(item2.feature_id==351051){//"医院信息配置"
                this.hosInfoShow=true;
              }else if(item2.feature_id==351061){//"科室医生信息配置"
                this.DepartmentShow=true;
              }else if(item2.feature_id==351081){//"素材管理"
                this.SourceMaterialShow=true;
              }else if(item2.feature_id==351121){//"消息管理"
                this.msgShow=true;
              }else if(item2.feature_id==351161){//"关键词回复"
                this.keyWordShow=true;
              }else if(item2.feature_id==351221){//"  我的应用/应用中心"
                this.myappShow=true;
              }else if(item2.feature_id==351251){//"认证信息"
                this.AuthenticationShow=true;
              }else if(item2.feature_id==351281){//"权限管理"
                this.JurisdictionShow=true;
              }else if(item2.feature_id==351321){//"短信服务页面"
                this.msgSeverShow=true;
              }

            })
          })
        }
      },
      InitializationFun(){//初始化控制数据
          // this.viewShow=false;
          this.zdycdShow=false;
          this.wgwpzShow=false;
          this.payshinfoShow=false;
          this.JzrpzShow=false;
          this.DepartmentShow=false;
          this.SourceMaterialShow=false;
          this.msgShow=false;
          this.keyWordShow=false;
          this.myappShow=false;
          this.AuthenticationShow=false;
          this.JurisdictionShow=false;
          this.hosInfoShow=false;
          this.msgSeverShow=false;
          
      },
      getLeftMYApplist(){//获取我的应用
        if (sessionStorage.getItem("chooseOrgInfo") != null) {
            this.$store.dispatch('getOpenedApplication', {
                platformHospitalId: JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId
              })
              .then((res) => {
                // //console.log('88888',res.data);
                this.appList = res.data;
              });
          }
        
      },
      // 科室医生跳转
      openDepartDoctorConfig() {
        window.open(`${exportAppUrl}/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
        // window.open(`http://localhost:8080/#/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
// 报告单查询配置入口
      },
      openReportConfig() {
        window.open(`${exportAppUrl}/reportSearchConfig?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
        // window.open(`http://localhost:8080/#/reportSearchConfig?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
      },
      // 预约挂号配置入口
      openAppointConfig() {
        window.open(`${exportAppUrl}/serviceSetting?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
        // window.open(`http://localhost:8080/#/serviceSetting?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
      },
      // 就诊记录后台配置
      openVisitRecordConfig() {
        window.open(`${exportAppUrl}/visitRecord?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
        // window.open(`http://localhost:8080/#/visitRecord?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
      },
      openIndex() { //打开首页
        window.open('#/');
      },
      openLink(path) {
        window.open(path);
      },
      outLogin(val) {
        this.loginState = val;
        ////console.log(val);
      },
      goSelectOrg() { //选择机构
        this.$router.push('/chooseOrganiz/false');
      },
      goOrg() { //没有机构的选择机构
        this.$router.push('/authentication/authenStepOne');
      },
      goConfingFun() {
        this.$router.push({
          name: 'visualizationConfiguration'
        });
      },
      leftPathRouter(to) { //是否显示左边菜单
        //需要显示arrPath
        let arrPath = ['serviceNumIndex', 'messageManage', 'autoReply',
          'customizedMenu', 'uerAllocation', 'dynamicMicroWeb', 'paySetting',
          'accountConfiguration', 'paymentTransactions', 'devTips', 'appDetail',
          'PaymentSettings','addUser','checkAudit','viewInformation','checkState',
          'messageRecord','paymentAccountList','materialsManage'
        ];
        this.leftTabShow = false;
        arrPath.filter((item) => {
          if (item == to.name) {
            if (to.params.type != 1) { //某些页面需要有菜单有些不需要，根据路由来判断，1代表不需要菜单。
              return this.leftTabShow = true;
            }
          }
        })
      },
      leftDocPathRouter(to) { //医生版是否显示左边菜单
        //需要显示arrPath
        let arrDocPath = ['deptMumbers','addDeptMumbers','mumbersInfo'];
        this.leftDocTabShow = false;
        arrDocPath.filter((item) => {
          if (item == to.name) {
            if (to.params.type != 1) { //某些页面需要有菜单有些不需要，根据路由来判断，1代表不需要菜单。
              return this.leftDocTabShow = true;
            }
          }
        })
      },
      PathRouter(to) { //是否显示顶部菜单
        //不需要显示arrPath
        let arrPath = ['chooseOrganiz', 'register', 'userNotice', 'privacyPolicy', 'confirmInviteMsg', 'wechatAuthor',
          'wechatResult'
        ];
        let variety = ['chooseOrganiz'];
        this.tabShow = true;
        arrPath.filter((item) => {
          if (item == to.name) {
            return this.tabShow = false;
          }
        });
        variety.filter((item) => {
          if (to.name == item) {
            if (to.params.islogined == 'true') {
              return this.tabShow = true;
            }
          }
        });
        window.scrollTo(0, 0);
      },
      layoutHeaderTabClick(tab, event) {
        let tabArr = ['index', 'service', 'help', 'contact', 'example', 'developer', 'product', 'about'];
        let tabLink = ['index', 'serCenIndex', 'help', 'aboutUs', 'corporateCom','','productExperence'];
        if (tab.name == 'index' || tab.name == 'service' || tab.name == 'help' || tab.name == 'contact' || tab.name ==
          'example' || tab.name == 'product') {
          tabArr.forEach((value, index) => {
            if (value == tab.name) {
              this.$router.push({
                name: tabLink[index]
              });
            }
          })
        } else if (tab.name == 'about') {
          window.open("http://www.zhuojianchina.com/gyzjqyjs.jhtml");
        } else {
          this.$notify.info({
            title: '消息',
            message: '此页面正在飞速搭建中，如有疑问请联系在线客服'
          });
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
            case "messageService":
            this.messageService();
            break;
            case "doctorSeting":
            this.doctorSeting();
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
      HospitalInformationManagement(){
        this.$router.push(`/hospInfoDeploy/hospInfoDeploy`)
      },
      messageService(){
        this.$router.push('/publicServiceNum/messageService/messageSignature')
      },
      doctorSeting(){
        this.openDepartDoctorConfig();
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
        this.set_orgname('');
        this.set_orgstate('0');
        this.set_moduleper([])
        localStorage.clear()
        sessionStorage.clear()
        // this.set_orgname('');
        this.$router.push('/');
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
      controlShow(to){
              this.getLeftMYApplist();
              setTimeout(()=>{
                if(Object.keys(this.$refs).length>0 && this.leftTabShow){
                  // this.boxConfigShow=this.$refs.configInfo.$children.length==0 ? false :true;
                  this.boxBaseShow=this.$refs.baseConfig.$children.length==0 ? false :true;
                  // this.boxSeverShow=this.$refs.severInfo.$children.length==0 ? false :true;
                }
                
              },20)
      }
    },
    watch: {
      $route(to, from) {
        this.jgName = this.orgname;
        this.jgState = this.orgstate;
        this.Jurisdiction();
        this.controlShow(to);
      //  //console.log('888',to.name)
        this.PathRouter(to);
        this.leftPathRouter(to);
        this.leftDocPathRouter(to);
        if(to.name == "productExperence"){
          this.productClass = true ;
          this.productMarginTop=true;
          this.productFooter = true;
        }
        else if(to.name == "corporateCom" || to.name == "corporateComDetail" || to.name == "aboutUs"){
          this.productClass = true ;
          this.productMarginTop=true;
          this.productFooter = false;
        }
        else{
          this.productClass = false ;
          this.productMarginTop=false;
          this.productFooter = false;
        }
      }
    },
  }

</script>
<style lang="scss">
  @import '@/assets/css/var.scss';

  // 页面内容区上方的标题
  .page-title {
    font-size: 24px;
    color: #333;
    height: 96px;
    line-height: 96px;
    padding: 0 20px;
    background-color: $color-f6f8f9;
    margin-top: -20px;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    background: #EEF0F1;
  }

  .el-submenu__title:hover {
    background: #EEF0F1;
  }

  .el-menu {
    border: none;
  }

  li.el-dropdown-menu__item:hover {
    color: rgb(4, 115, 14) !important;
    background: rgb(230, 241, 231) !important;
  }

  .icon_tab {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }

  .home_title {
    background: url('../assets/img/index/data_view_icon.png') no-repeat;
    background-size: 100% 100%;
  }
  .zdy_tab_icon{
    background: url('../assets/img/index/zdy_tab_icon.png') no-repeat;
    background-size: 100% 100%;
  }
  .wgw_icon{
    background: url('../assets/img/index/wgw_icon.png') no-repeat;
    background-size: 100% 100%;
  }
  .material_admin_icon{
    background: url('../assets/img/index/material_admin_icon.png') no-repeat;
    background-size: 100% 100%;
  }
  .seting_icon {
    background: url('../assets/img/index/left_config_icon.png') no-repeat;
    background-size: 100% 100%;
  }

  .msg_icon {
    background: url('../assets/img/index/left_msg_icon.png') no-repeat;
    background-size: 100% 100%;
  }

  .application_icon {
    background: url('../assets/img/index/my_app_icon.png') no-repeat;
    background-size: 100% 100%;
  }

  .left_tab_title {
    width: 190px;
    height: 33px;
    line-height: 33px;
    border: 1px solid #09B52D;
    margin: 35px 0 35px 0;

    i {
      display: inline-block;
      width: 21px;
      height: 21px;
      background: url("../assets/img/index/left_wx_tab_icon.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin: 0 11px 0 18px;
    }

    span {
      display: inline-block;
      font-size: 14px;
      color: #40A94A;
      font-weight: bold;
    }
  }

  .special-main {
    overflow: visible;
  }
  .productClass{
    background: rgba(0,0,0,0.28);
  }
  .productHeadClass{
    background:#FFFFFF;
  }
  .productColor {
    .el-tabs__active-bar {
      height: 4px;
      background: #40A94A !important;
    }
    * {
      color:#333 !important;
    }
  }
  .configurationTableClass{
    background:rgba(53, 181, 63, 0.12);
    border-radius: 100px;
  }
  .indexClass{
    background-color: $color-09b52d;
  }
  .productMarginTop{
    margin-top:0;
  }
</style>
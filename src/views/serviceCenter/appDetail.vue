<template>
  <div class="app-detail" :style="{ 'margin': showType == '1' ?  '0' : '-20px 40px 0' }">
    <div class="top-wrapper" :style="{ 'padding': showType == '1' ?  '0' : '0 40px' }">
      <div class="top">
        <div class="catalog" v-if="showType == '1' ? true : false">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/serviceCenter/serCenIndex'}">应用中心</el-breadcrumb-item>
            <el-breadcrumb-item class="current-item">{{ app.applicationName }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-input
            class="search"
            placeholder="请输入应用名称关键字"
            suffix-icon="el-icon-search"
            @click.native="search($event)"
            v-model="serviceKeyword">
          </el-input>
        </div>
        <div class="filling" v-else></div>

        <div class="app-intro">
          <img class="header-img" :src=app.headerImg>
          <div class="intro-right">
            <div class="title-wrapper">
              <div>
                <span class="title">{{ app.applicationName }}</span>
                <span class="hospital-name">
                  <img src="../../assets/img/serviceCenter/auditSuccess.png" v-if="app.teamName" width="20" height="20"/>
                  {{ app.teamName }}
                </span>
                <div class="introduce">{{ app.applicationDesc }}</div>
              </div>
              <el-button type="success" v-if="app.openStatus && app.applicationManageUrl" @click="configure">应用配置</el-button>
              <span v-show="openBtnShow"><el-button type="success" v-if="!app.openStatus" @click="dredgeApp">开通</el-button></span>
              <span class="btn-wrap" v-if="app.openStatus && !app.applicationManageUrl">
                <span v-if="app.applicationManageBaseUrl">
                  <span v-show="confingGoBackstage">
                    <el-button type="success"  @click="goToManage">前往服务商后台</el-button>
                  </span>
                </span>
                <span v-else>
                    <el-button type="success" @click="goToMenu" v-show="appDazongShow">前往菜单配置</el-button>
                </span> 
               
                <span v-show="closeBtnShow"><el-button class="cancel-btn" @click="closeApp">取消开通</el-button></span>
              </span>
            </div>
            
            <div class="data">
              <div class="data-detail">
                <p class="number">{{ app.openCount }}</p>
                <p>机构开通量</p>
              </div>
              <!-- <div class="data-detail">
                <p class="number">61</p>
                <p>用户使用量</p>
              </div> -->
              <div class="data-detail">
                <p v-text="app.applicationType == 1 ? '基础服务' : '专业服务'"></p>
                <p>类型</p>
              </div>
              <div class="data-detail" v-show="false">
                <p>{{ app.applicationYearLimit / 12 }}年</p>
                <p>服务期限</p>
              </div>
              <div class="data-detail" v-show="false">
                <p class="price">￥200</p>
                <p>定价</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="service-wrapper" :style="{ 'padding': showType == '1' ?  '0' : '0 40px' }">
      <div class="service-content">
        <el-tabs v-model="activeName" v-if="app.introType">
          <!-- 应用详情 -->
          <el-tab-pane label="应用详情" name="serviceDetail">
            <template v-if="app.introType === '1' ? false : true">
              <div class="functions-part">
                <div class="left-pane">
                  <ul>
                    <li v-for="(item,index) in functions" :key="index">
                        <p class="item-title">
                          <i class="dot"></i>
                          <span>{{ item.functionName }}</span>
                        </p>
                        <p class="item-text">{{ item.functionDesc }}</p>
                    </li>
                  </ul>
                </div>
                <div class="right-pane">
                  <el-carousel indicator-position="outside" trigger="click" height="386px" arrow="never">
                    <el-carousel-item v-show="app.introImgs.length>0" v-for="(item, index) in app.introImgs" :key="index">
                      <img :src="item.introImg" class="carousel-img-item">
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>

              <div class="blue">
                <div v-for="(item, index) in sloganList" class="slogan" :key="index">
                  <p>
                    <span
                      :class="item.keywordPosition == 0 ? 'big-title' : 'small-title'"
                      v-text="item.keywordPosition == 0 ? item.advantageKeyWord.slice(1, item.advantageKeyWord.length - 1) : item.advantageName.split(item.advantageKeyWord)[0]"></span>
                    <span
                      v-if="item.keywordPosition == 1"
                      :class="item.keywordPosition == 1 ? 'big-title' : 'small-title'">{{ item.advantageKeyWord.slice(1, item.advantageKeyWord.length - 1) }}</span>
                    <span
                      :class="item.keywordPosition == -1 ? 'big-title' : 'small-title'"
                      v-text="item.keywordPosition == -1 ? item.advantageKeyWord.slice(1, item.advantageKeyWord.length - 1) : item.advantageName.split(item.advantageKeyWord)[1]">{{item.keywordPosition}}</span>
                  </p>
                  <p>{{item.advantageDesc}}</p>
                </div>
              </div>

              <div class="scene" v-if="sceneList.length !== 0">
                <p>服务应用场景</p>
                <div class="scenes-part">
                  <el-tabs
                    class="scenes-tab"
                    v-model="activeScene"
                    @tab-click="changeScene">
                    <el-tab-pane v-for="(item, index) in sceneList" :key="index" :label="item.applicationSceneTitle" :name="index.toString()">
                      {{ item.applicationSceneDesc }}
                    </el-tab-pane>
                  </el-tabs>
                  <img v-show="sceneImg" :src="sceneImg"/>
                </div>
              </div>
            </template>

            <template v-else>
              <img class="pic-model" v-if="app.introImgs.length>0" :src="app.introImgs[0].introImg"/>
            </template>
          </el-tab-pane>

          <!-- 操作指引 -->
          <el-tab-pane label="操作指引" name="operateGuide">
            <div class="operate-guide">
              <div class="descBox" v-html='app.operationalGuidelines'></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="modules-recommend">
        <p>模块组合推荐</p>
        <div class="modules-wrapper">
          <div
            class="module-item"
            v-for="(item, index) in recommendModules"
            :key="index"
            @click="toAppDetail(item.applicationId)">
            <img :src="item.headerImg" width="94" height="94">
            <div class="module-describe">
              <p>{{ item.applicationName }}</p>
              <p>{{ item.applicationDesc }}</p>
            </div>
            <div class="go">
              <span class="opened" v-if="item.openStatus">已开通</span>
              <span>&gt;</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 点击开通后第一个弹框 -->
      <el-dialog title="开通应用须知" :visible.sync="liberal" width="700px">
        <div class="line"></div>
        <header>
          <img :src='app.headerImg'>
          <span>您正在开通应用【{{app.applicationName}}】</span>
        </header>
        <div class="select" v-show="selectvisibleRange">
          <span>设置可见范围</span>
          <el-select v-model="value5" multiple placeholder="选择角色" style="width:300px">
            <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="explain" v-if="count > 0 ">
          <span>应用权限须知：</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="允许该应用获取机构支付商户信息" disabled v-if="componentValue[0] != 0"></el-checkbox>
            <el-checkbox label="允许该应用使用机构短信包发送短信推送" disabled v-if="componentValue[1] != 0"></el-checkbox>
            <el-checkbox label="允许该应用获取机构分院信息" disabled v-if="componentValue[2] != 0"></el-checkbox>
            <el-checkbox label="允许该应用获取科室医生信息" disabled v-if="componentValue[3] != 0"></el-checkbox>
            <!-- <el-checkbox label="允许该应用获取医生信息" disabled v-if="componentValue[4] != 0"></el-checkbox> -->
            <el-checkbox label="允许该应用获取机构管理员信息" disabled v-if="componentValue[4] != 0"></el-checkbox>
            <el-checkbox label="允许该应用获取医护版医生账号信息" disabled v-if="componentValue[5] != 0"></el-checkbox>
            <el-checkbox label="允许该应用获取患者版用户信息" disabled v-if="componentValue[6] != 0"></el-checkbox>
            <el-checkbox label="允许该应用获取就诊人信息" disabled v-if="componentValue[7] != 0"></el-checkbox>
          </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm" :loading="dredge">确 认</el-button>
        </span>
      </el-dialog>
      <!-- 第一个弹框点击确定后判断选择出现哪个 -->
         <el-dialog title="提示" :visible.sync="liberalSuccess" width="700px">
        <div class="line"></div>
        <header>
          <img :src='app.headerImg'>
          <span>您已开通【{{app.applicationName}}】成功</span>
        </header>
        <ul class="openSuccess">
          <li v-show="confingGoBackstage">可到 <span @click="goBackstage">前往后台配置</span> 对应用进行配置，满足机构定制化需求；</li>
           <li v-if="componentValue[0] != 0">应用涉及支付，可到 <span @click="commercialTenant">支付商户配置</span> 中，申请支付平台商户号；</li>
           <li v-if="componentValue[1] != 0">应用涉及短信推送，可到 <span @click="messageService">短信服务</span> 中，申请机构短信签名；</li>
           <li v-if="componentValue[2] != 0"> 应用涉及医院信息，可到 <span @click="hospitalService">医院信息管理</span> 中，配置医院信息；</li>
           <li v-if="componentValue[3] != 0" > 应用涉及科室医生信息，可到 <span @click="doctorService">科室医生管理</span> 中，配置科室医生信息；</li>
           <li v-if="componentValue[5] != 0"> 应用涉及医生账号信息，可到<span @click="accountManagemant">医生账号管理</span> 中，配置医生账号信息；</li>
           <li v-if="componentValue[6] != 0 || componentValue[7] != 0">应用涉及用户、就诊人信息，可到<span @click="patientService">就诊人配置</span> 中，设置定制化需求；</li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmSuccess">确 认</el-button>
        </span>
      </el-dialog>

      <!-- 取消开通应用提示 -->
      <el-dialog title="取消开通应用须知" :visible.sync="dialogCloseApp" width="700px">
        <div class="line"></div>
        <header>
          <img :src='app.headerImg'>
          <span>{{ `您正在取消开通【${ app.applicationName }】` }}</span>
        </header>
        <ul class="openSuccess">
          <li>1、取消后应用上的数据将无法查看，请先做好数据导出备份；</li>
          <li>2、保证其未配置在自定义菜单和微官网菜单中；</li>
          <li>3、确认无用户正在使用该应用，以防数据异常和页面跳转异常；</li>
          <li>4、再次开通时本次数据将不再保留，请谨慎操作；</li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmCloseApp">确 认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAppDetail } from "../../service/application.js";
import { axiosget, axiospost,axiosConfig } from "../../service/config.js";
import {mapGetters, mapState, mapActions} from 'vuex';
import { exportLocalUrl , exportAppUrl} from '@/service/baseuri';
import axios from 'axios';
import { apiurl } from '@/service/api.js';
import qs from 'qs';
export default {
  data() {
    return {
      dredge:false,
      count:0,
      troleReqs:[],
      componentValue:[],
      checkList: ['允许该应用获取机构支付商户信息','允许该应用使用机构短信包发送短信推送','允许该应用获取机构分院信息','允许该应用获取科室医生信息','允许该应用获取机构管理员信息','允许该应用获取医护版医生账号信息','允许该应用获取患者版用户信息','允许该应用获取就诊人信息'],
       value5: [],
       troleReqs:[],
       options: [],
       liberal:false,
       liberalSuccess:false,
      applicationId: '',
      activeName: 'serviceDetail',
      activeScene: '0',
      serviceKeyword: "",
      app: {},  //应用介绍
      functions: [],  //服务详情
      recommendModules: [],  //推荐模块
      sloganList: [],  //蓝色区域
      sceneList: [],  //应用场景
      showType: '',
      sceneImg: '',//应用场景图片
      hosInfoDate:[],
      dialogCloseApp: false,//取消开通应用弹框
      //权限控制
      openBtnShow:false,
      closeBtnShow: false,
      appDazongShow:false,
      confingGoBackstage:false,
      selectvisibleRange:false
    };
  },

  created() {
    this.applicationId = this.$route.query.applicationId;
    // this.getApplication();
    this.Jurisdiction();
    this.showType = this.$route.params.type;
    //console.log(this.applicationId);
    let platformHospitalId =sessionStorage.getItem("chooseOrgInfo")? JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId:'';
    this.getAppBaseInfo();

    axiosget(this.banIECache(`application/release/functions?applicationId=${this.applicationId}`)).then(res => {
      //console.log('服务详情',res.data)
      this.functions = res.data;
    });

    axiosget(this.banIECache(`application/release/appRelation?applicationId=${this.applicationId}`)).then(res => {
      //console.log('模块组合推荐',res.data)
      this.recommendModules = res.data;
    });
    axiosget(this.banIECache(`application/release/advantages?applicationId=${this.applicationId}`)).then(res => {
      this.sloganList = res.data;
      //大的字在字符串里的位置：0代表开头，1代表中间，-1代表结尾
      this.sloganList.forEach(item => {
        if(item.advantageName.indexOf(item.advantageKeyWord) == -1) {
          return false;
        } else if(item.advantageName.indexOf(item.advantageKeyWord) == 0) {  
          item.keywordPosition = 0;  //开头
        } else if(item.advantageName.indexOf(item.advantageKeyWord) == item.advantageName.length - item.advantageKeyWord.length) {
          item.keywordPosition = -1;  //结尾
        } else {
          item.keywordPosition = 1;  //中间
        }
      })
    })
    axiosget(this.banIECache(`application/release/scenes?applicationId=${this.applicationId}`)).then(res => {
      //console.log('应用场景',res.data)
      this.sceneList = res.data;
      if (res.data.length > 0) {
        this.sceneImg = res.data[0].applicationSceneImg;
      }
    });
  },

  computed: {
    ...mapState({
      currentDateInfo: state => state.user.currentDateInfo
    }),
    ...mapGetters({
      orglist: 'organizationList',
      phone: 'phone',
      userName: 'userName',
      orgname: 'orgname',
      orgstate: 'orgstate',
      token: 'token',
      chooseOrgInfo: 'chooseOrgInfo',
      moduleper:'moduleper'
    })
  },

  methods: {
    ...mapActions(['set_appdata']),
    Jurisdiction(){
        //权限控制
        //console.log(this.moduleper);
        if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
          this.moduleper.map(item=>{
            item.children.map(item2=>{
              if(item2.feature_id==351061){//"科室医生信息配置"
                this.hosInfoDate=item;
              }else if(item2.feature_id==351222){//"开通应用"
                this.openBtnShow=true;
              }else if(item2.feature_id==351361){//"大众版微信服务号页面"
                this.appDazongShow=true;
              }else if(item2.feature_id==351223){//"关闭应用"
                this.closeBtnShow=true;
              }
              else if(item2.feature_id==351224){
                this.selectvisibleRange = true;//点击开通判断是否出现配置可见范围下拉选择框
              }

            })
          })
        }
      },
      banIECache (url, connector = '&') {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          return url + connector + `t=${ new Date().getTime() }`;
        } else {
          return url;
        }
      },
      getAppBaseInfo () {
        let url = this.banIECache(`application/release/appBaseInfo?applicationId=${this.applicationId}&vcProjectId=${this.chooseOrgInfo ? this.chooseOrgInfo.platformHospitalId : ''}`);
        axiosget(url).then(res => {
          //console.log("应用",res.data)
          if(res.data){
            this.set_appdata(res.data);
            this.app = res.data;
            this.app.teamName = res.data.teamName;
            if(this.app.openStatus){
              this.getApplication();
            }

          }
          // this.app.auditStatus = res.data.tplatformHospital.auditStatus;
        });
      },
      getApplication(){//根据应用ID判断该用户是否有该应用后台权限
          let url = this.banIECache(`${apiurl.application}/${this.applicationId}/permission/valid`, '?');
          axios.get(url,axiosConfig).then((res)=>{
            // console.log('后台权限',res);
            if(res.data){
              this.confingGoBackstage=res.data;
            }
          }).catch((err)=>{
            //console.log(err)
          })
      },
    //开通按钮操作
    async dredgeApp() {
      try{
        //未登录
        if(!sessionStorage.getItem("token")) {
          //console.log("asdfasdf")
          await this.$confirm('您还未登录，是否前去登录？', '提示', {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.$router.push('/')
        } else if(this.orgstate === 0) {  //没有机构
          await this.$confirm('您还未认证机构，是 否前去认证？', '提示', {
            confirmButtonText: '去认证',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.$router.push('/authentication/authenStepOne')
        }
        else if(this.orgname === "" || this.orgname === null) {  //未选择机构
          await this.$confirm('您还未选择机构，是否前去选择？', '提示', {
            confirmButtonText: '去选择机构',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.$router.push('/chooseOrganiz/true')
        } 
        else {
          // //await this.$alert(`您是否确认开通${this.app.applicationName}？`)
          // await this.$confirm(`您是否确认开通应用: ${this.app.applicationName}？`, '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'info'
          // })
          // console.log(this.app.applicationId)
          //  let org = sessionStorage.getItem("chooseOrgInfo");
          // console.log(org)
          //  let res = await this.$store.dispatch({type:'appOpenUp',req:{
          //    applicationId:this.app.applicationId,
          //    appOpenHospitalId:JSON.parse(org).platformHospitalId,
          //    serviceTime:this.app.applicationYearLimit
          //   }
          //  })
          //  let data = res.data;
          //  if(data.status){
          //   this.$message.success(data.message)
          //    setTimeout(() => {
          //     window.history.go(0)
          //    }, 1000); 
          //  }else{
          //    this.$message.warning(data.message)
          //  }
           this.liberal = true;
           this.componentValue = [];
           this.options = [];
           this.applicationExplain();
           this.visibleRange();
        }
      }catch(e){
        //console.log(e)
      }
    },
    // 应用权限需知展示项
    applicationExplain(){
        let url = this.banIECache(`application/manage/getConfig?applicationId=${this.applicationId}`);
        axiosget(url).then(res => {
          //console.log(res.data,'aaaaa')
          let componentKey = ['payConfig','smsService','branchInfo','deptInfo','managerInfo','zsyyDoctorInfo','personInfo','patientInfo'];
          if(res.data){
           // console.log(res.data,'wxwbl')
             componentKey.filter((item1) =>{
                        res.data.forEach((item,index) =>{
                            if(item.componentKey==item1){
                                this.componentValue.push(item.componentValue);
                                if(item.componentValue != 0){
                                    this.count++;
                                  }
                            }
                        })
                    }) 
                    // console.log(this.componentValue,'componentValue')判断应用权限须知显示哪几项
                    // console.log(this.count,'count')判断应用权限是否展示
          }
    });
    },
    //设置可见范围
    visibleRange(){
      let url = this.banIECache(`user/roles/list`, '?');
      axiosget(url).then(res => {
        //console.log(res.data,'wxbl')
        res.data.forEach((item,index) => {
          if(item.canEdit != 0){
            this.options.push({value:index,label:item.roleName,roleId:item.roleId,roleName:item.roleName,roleDesc:item.roleProperty});
          }
        })
        //console.log(this.options,'设置可见范围')
      })
    },
      confirm(){
        let org = sessionStorage.getItem("chooseOrgInfo");
        this.value5.forEach((item,index) => {
            if(item.label != ''){
              this.troleReqs.push({role_id:item.roleId,role_name:item.roleName,role_desc:item.roleDesc})
            }
            //console.log(this.troleReqs)
        })
        let postObj = {
          applicationId:this.app.applicationId,
          appOpenHospitalId:JSON.parse(org).platformHospitalId,
          serviceTime:this.app.applicationYearLimit,
          troleReqs:this.troleReqs
        }
        this.dredge = true;
          axios.post('application/foreign/appOpenUp',postObj,axiosConfig).then(res =>{
             this.dredge = false;
            let data = res.data;
           if(data.status){
            this.liberal = false;
            this.getAppBaseInfo();
            this.$message.success('开通成功');
            setTimeout(() => {
                  this.liberalSuccess = true;
              }, 300);
           }else{
             this.$message.warning(data.message)
           }
          }).catch(err => {
             this.dredge = false;
        //console.log(err);
      });
    },
    closeApp () {
      this.dialogCloseApp = true;
    },
    confirmCloseApp () {
      let postObj = {
        applicationId: this.applicationId,
        appOpenHospitalId: this.chooseOrgInfo.platformHospitalId
      };
      this.dialogCloseApp = false;
      axiospost(`application/foreign/appCloseOn`, postObj).then(res => {
        if (res.data) {
          if (res.data.status) {
            this.getAppBaseInfo();
            this.$message.success('取消成功');
          } else {
            this.$message.warning(res.data.message);
          }
        }
      }).catch(err => {
        console.error(err);
      });
    },
    confirmSuccess(){
      this.liberalSuccess = false;
    },
    //前往后台
    goToManage () {
      this.$router.push({name:'authorizedLogin'});
    },

    configure() {
      window.open(this.app.applicationManageUrl);
    },

    search(e) {
      // //console.log(e.target.className);
      if(e.target.className == 'el-input__icon el-icon-search') {
        this.$router.push({
          name: 'searchResult',
          params: {
            serviceKeyword: this.serviceKeyword
          }
        });
      }
    },

    //前往菜单配置
    goToMenu () {
      let isAuthorize = this.chooseOrgInfo;
      if (isAuthorize.whetherAuthorize) {
        this.$router.push('/publicServiceNum/customizedMenu');
      } else {
        this.$message.warning('请先授权服务号');
      }
    },

    //切换应用场景tab页
    changeScene (e) {
      this.sceneImg = this.sceneList[Number(e.name)].applicationSceneImg;
    },

    toAppDetail(applicationId) {
      this.$router.push({
        path: '/serviceCenter/appDetail/1',
        query: {applicationId}
      });
    },
    //前往后台配置
    goBackstage(){
      this.goToManage();
    }, 
    //支付商户配置 
    commercialTenant(){
      this.$router.push({name:'PaymentSettings'})
    },  
    //短信服务
    messageService(){
      this.$router.push({name:'messageSignature'})
    },
    //医院信息管理
    hospitalService(){
      this.$router.push({name:'hospInfoDeploy'})
    },
    //科室医生管理
    doctorService(){
       window.open(`${exportAppUrl}/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
    },
    //就诊人配置
    patientService(){
      this.$router.push({name:'uerAllocation'})
    },
    //医生账号管理 deptMumbers
    accountManagemant(){
      this.$router.push({name:'deptMumbers'})
    }
  },

  components: {}
};
</script>

<style lang='scss' scoped>
.pic-model {
  width: 100%;
}
.scenes-part {
  display: flex;
  align-items: flex-start;
  img {
    width: 400px;
    margin-left: 50px;
  }
}
.scenes-tab {
  flex-grow: 1;
}
.filling {
  height: 40px;
}
.carousel-img-item {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
.app-detail {
  margin: -20px;
  background-color: #ffffff;
  min-width: 880px;
  // padding: 20px;
  .top-wrapper {
    padding-top:20px;
    width: 100%;
    background-color: #f6f8f9;
  }
  .top {
    height: 313px;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 20px;

    .catalog {
      display: flex;
      justify-content: space-between;
      .search {
        width: 244px;
      }
    }

    .app-intro {
      width: 100%;
      margin-top: 35px;
      height: 162px;
      display: flex;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
      img.header-img {
        width: 166px;
        height: 162px;
      }
      .intro-right {
        // width: 1034px;
        flex-grow: 1;
        background-color: #ffffff;
        .title-wrapper {
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 50px 0 22px;
          .title {
            font-size: 24px;
            color: #333333;
          }
          .hospital-name {
            font-size: 13px;
            color: #999999;
            margin-left: 30px;
            img {
              vertical-align: middle;
            }
          }

          .introduce {
            max-width: 680px;
            margin-top: 12px;
            font-size: 15px;
            color: #666666;
          }
        }
        .btn-wrap {
          min-width: 261px;
          display: flex;
          justify-content: space-between;
        }
        .data {
          background-color: #f7f8fc;
          height: 62px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .data-detail {
            width: 120px;
            text-align: center;
            border-right: 1px solid #EDEDED;
            height: 47px;
            p:first-child {
              height: 26px;
              font-size: 16px;
              color: #666666;
              &.number {
                font-size: 20px
              }
            }
            p:last-child {
              font-size: 12px;
              color: #9D9D9D;
            }

            p.price {
              color: #FFB100;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  .service-wrapper {
    // padding: 0 40px;
    // background-color: #ffffff;
    margin: -40px auto 0;
    .line{
      width:100%;
      height:2px;
      border-bottom:1px solid #E7E7E7;
      margin-top:-22px;
    }
    header{
      text-align: center;
      img{
        width:60px;
        height:60px;
         margin:20px auto;
      }
      span{
        font-size: 18px;
        display: block;
         color: #333333;
      }
    }
    .openSuccess{
      width:600px;
      height:auto;
      background:#F2F2F2;
      margin:30px auto 0;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0.2px;
      line-height: 16px;
      li{
        margin:10px 0 0 58px;
        padding:10px;
        span{
          color:rgb(77,155,255);
          cursor: pointer;
        }
      }
    }
    .select{
      margin-top:30px;
      span{
        font-size: 14px;
        color: #333333;
        display:inline-block;
        margin-right:20px;
      }
    }
    .explain{
      span{
        display: block;
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        margin:16px 0 20px 0;
      }
    }
  }
  
  .service-content {
    max-width: 1200px;
    margin: 0 auto;
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #D3D4D6;
      margin-right: 12px;
    }

    ul {
      padding: 45px 0 64px 0;
    }

    li {
      margin-bottom: 30px;
    }

    .item-title {
      font-size: 18px;
      color: #333333;
      margin-bottom: 10px;
    }

    .item-text {
      font-size: 15px;
      color: #A3A3A3;
      margin-left: 23px;
    }

    .right-pane {
      width: 478px;
      margin: 55px 24px 0 0;
    }
  }

  .blue {
    width: 100%;
    height: 227px;
    background-image: url('../../assets/img/serviceCenter/blueBg.png');
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
    color: #ffffff;
    .slogan {
      p:first-child {
        .big-title {
          font-size: 30px;
        }
        .small-title {
          font-size: 18px;
          margin-left: -4px;
        }
      }
      p:last-child {
        font-size: 14px;
        opacity: 0.55;
        margin-top: 8px;
      }
      
    }
  }
  .scene {
    margin: 50px 0;
    padding-bottom: 26px;
    p {
      margin-bottom: 44px;
    }
  }
  .modules-recommend {
    max-width: 1200px;
    margin: 50px auto 0;
    padding-bottom: 76px;
    .modules-wrapper {
      margin-top: 44px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .module-item {
      width: 588px;
      height: 96px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      border: 1px solid #E7E7EB;
      cursor: pointer;
      .module-describe {
        margin-left: -40px;
        width: 290px;
        font-size: 12px;
        color: #B2B2B2;
        line-height: 24px;
        p:first-child {
          font-size: 16px;
          color: #333333;
        }
      }
      .go {
        width: 100px;
        text-align: right;
        margin-right: 12px;
        color: #D8D8D8;
        font-weight: bold;
        span.opened {
          font-size: 14px;
          color: #333333;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.app-detail {
  .el-tabs__header,.el-tabs__nav-wrap::after {
    background: #f6f8f9;
  }
  .el-breadcrumb {
    line-height: 40px;
    .el-breadcrumb__inner {
      color: #8E939A;
    }
    
    .el-breadcrumb__item.current-item {
      .el-breadcrumb__inner {
        color: #09b52d;
      }
    }
  }

  .service-content {
    .functions-part {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      min-height: 500px;
    }
  }

  .scene {
    .el-tabs__content {
      padding: 10px 0;
    }
  }
  .el-tabs__nav-wrap {
    // background-color: #f6f8f9;
  }
  .el-tabs__nav-scroll {
    
      .el-tabs__item.is-top {
        font-size: 16px;
        color: #999999;
        &.is-active {
          color: #333333;
        }
      }

      .el-tabs__active-bar.is-top {
        background-color: #42A84B;
      }
  }

  .scenes-part {
    .el-tabs__nav-scroll {
      background: #FFF;
    }
    .el-tabs__nav-wrap:after {
      background-color: #E4E7ED;
    }
  }

  .el-carousel__item {
    background: url('../../assets/img/serviceCenter/bannerBg.png') no-repeat bottom;
    text-align: center;
    img {
      width: 258px;
      height: 386px;
    }
  }

  .el-button.el-button--success {
    // width: 119px;
    height: 36px;
    background-color: #09B52D;
  }
  .el-input__suffix {
    cursor: pointer;
  }

  .el-button.cancel-btn {
    height: 36px;
    &:hover, &:focus {
      background-color: #e6f7ea;
      color: #09b52d;
      border-color: #09b52d;
    }
  }
}
 .service-wrapper {
      .el-select .el-input .el-select__caret{
        color:#333333;
      }
      .explain{
        .el-checkbox+.el-checkbox{
          display: block;
          margin:16px 0 0 0;
        }
      }
      .el-dialog__footer{
        text-align:center;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background: #35B53F;
        border-radius: 4px;
        border-color:#35B53F;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #333333;
      }
      .el-checkbox__inner:hover{
         border-color:#dcdfe6;
      }
      .el-checkbox__inner:focus{
         border-color:#dcdfe6;
      }
      // .el-input .el-input--suffix{
      //   height:auto;
      // }
      // .el-input__inner{
      //   height:40px !important;
      // }
  }
</style>


<template>
  <div class="visConfig">
    <div class="goToAuthen" @click="authenStepFour()" v-if="toIdentity &&platformHospitalByGateway.auditStatus!=='40'">认证审核中，点击查看详情&nbsp;&nbsp;&nbsp;&nbsp;
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="chooseType">
      <div class="width1200">
        <h4 class="moduleTitle">选择分类<span>平台将会提供以下产品形态，选择需要的产品后，对其支持的功能进行配置，即可发布成为线上使用产品，支持多产品同步发布。</span></h4>
        <el-row>
          <el-col :span="12">
            <div class="productType" style="cursor:default;">
              <div class="goToPatientType" @click="goToPatientType" v-if="this.authStatus"></div>
              <div class="publicType">患者版</div>
              <div class="vcProgramLogo">
                <img src="../../assets/img/proTypeWechatSeverLogo.png" />
              </div>
              <h4>微信服务号</h4>
              <p>给企业和组织提供更强大的业务服务与用户管理能力，帮助企业快速实现全新的公众号服务平台。</p>
              <el-button type="text">点击进入&nbsp;&nbsp;
                <i class="el-icon-back"></i>
              </el-button>
              <div class="weChatServer" v-if="!this.authStatus">
                <div class="wcsChoice">
                  <p>有微信服务号</p>
                  <el-button @click="toPublicService">立即进入</el-button>
                </div>
                <div class="wcsChoice noWsc">
                  <p>没有微信服务号</p>
                  <a href="http://kf.qq.com/faq/120911VrYVrA151013MfYvYV.html" target="_Blank">
                    <el-button>前往公众平台申请</el-button>
                  </a>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="productType" @click="goToDocType">
              <div class="publicType doctorType">医生版</div>
              <div class="vcProgramLogo">
                <img src="../../assets/img/proTypeWechatComLogo.png" />
              </div>
              <h4>企业微信版</h4>
              <p>企业微信继承企业号所有能力，同时为企业提供专业的通讯的工具、丰富的办公应用于API，助力企业高效沟通与办公。</p>
              <el-button type="text">点击进入&nbsp;&nbsp;
                <i class="el-icon-back"></i>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="chooseType waitingType">
      <div class="width1200">
        <h4 class="moduleTitle">敬请期待</h4>
        <el-row>
          <el-col :span="8">
            <div class="productType" @click="waitOpen">
              <div class="vcProgramLogo">
                <img src="../../assets/img/proTypeAppLogo.png" />
              </div>
              <h4>APP</h4>
              <p class="supportType">支持&nbsp;
                <span class="publicName">患者版</span>、
                <span class="doctorName">医生版</span>
              </p>
              <p>一种手机完善其功能，为用户提供更丰富的使用体验的主要手段。</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="productType" @click="waitOpen">
              <div class="vcProgramLogo">
                <img src="../../assets/img/proTypeMiniproLogo.png" />
              </div>
              <h4>微信小程序</h4>
              <p class="supportType">支持&nbsp;
                <span class="publicName">患者版</span>
              </p>
              <p>一种新的开发能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="productType" @click="waitOpen">
              <div class="vcProgramLogo">
                <img src="../../assets/img/proTypeAlipayLogo.png" />
              </div>
              <h4>支付宝生活号</h4>
              <p class="supportType">支持&nbsp;
                <span class="publicName">患者版</span>
              </p>
              <p>生活号是支付宝为企业、组织和个人提供的直接触达用户的服务平台，是用户连接世界的平台。</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <hr class="bottomLine" />
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters
  } from "vuex";
  import {
    exportLocalUrl,
    exportAppUrl,
  } from "@/service/baseuri";
  export default {
    data() {
      return {
        // authStatus:this.$route.query.authStatus
        authStatus: false, //判断是否是授权页面
        toIdentity: true,
        //权限控制
        wxBtnShow: false,
        wxDocBtnShow: false,

      };
    },
    created() {
      this.toIdentity = sessionStorage.getItem("chooseOrgInfo");
      this.Jurisdiction();
      if (this.toIdentity) {
        this.authStatus = JSON.parse(
          sessionStorage.getItem("chooseOrgInfo")
        ).whetherAuthorize;
      }
    },
    computed: {
      ...mapState({
        platformHospitalByGateway: state => state.application.platformHospital
      }),
      ...mapGetters({
        moduleper: 'moduleper'
      })
    },
    mounted() {
      if (this.toIdentity) {
        this.$store.dispatch({
          type: "getPlatformHospitalByGatewayInfo"
        });
      } else {
        this.toIdentity = false;
      }
    },
    methods: {
      Jurisdiction() {
        if ((this.moduleper != undefined || this.moduleper != null) && this.moduleper.length > 0) {
          this.moduleper.map(item => {
            item.children.filter((item2) => {
              if (item2.feature_id == 351003) { //"微信服务号授权"
                this.wxBtnShow = true;
              } else if (item2.feature_id == 351366) { //"医生版企业微信版页面"
                this.wxDocBtnShow = true;
              }
            })

          })
        }
      },
      authenStepThree() {
        this.$router.push("/authentication/authenStepThree");
      },
      authenStepFour() {
        this.$router.push("/authentication/authenStepFour/add");
      },
      goToPatientType() {
        if ((this.moduleper != undefined || this.moduleper != null) && this.moduleper.length > 0) {
          if (this.wxBtnShow) {
            this.$router.push({
              path: "/publicServiceNum/serviceNumIndex"
            });
          } else {
            this.$message.warning(
              "您还没有权限使用，无法进入，如有问题请联系机构管理员"
            );
          }

        }
      },
      goToDocType() {
        if (!this.toIdentity) {
          this.$router.push({
            path: "/authentication/authenStepOne"
          });
          //   this.$message.warning(
          //     "您未绑定机构，不能执行公众号配置操作，请先认证机构"
          //   );
          return false;
        }
        if (this.wxDocBtnShow) {
          this.$router.push("/docAccountManage/deptMumbers");
        } else {
          this.$message.warning(
            "您还没有权限使用，无法进入，如有问题请联系机构管理员"
          );
        }
      },
      waitOpen() {
        this.$notify.info({
          title: '消息',
          message: '此页面正在飞速搭建中，如有疑问请联系在线客服'
        });
      },
      goToAuthorize() {
        if (!this.authStatus || this.authStatus == "false") {
          this.$message.error("您的账号还未分配机构，请认证机构");
          return false;
        }
      },
      goToQrCode() {
        this.$router.push("/authentication/authenStepThree");
      },
      toPublicService() {
        //console.log(this.toIdentity);
        if (!this.toIdentity) {
          this.$router.push({
            path: "/authentication/authenStepOne"
          });
          //   this.$message.warning(
          //     "您未绑定机构，不能执行公众号配置操作，请先认证机构"
          //   );
          return false;
        }
        if (!this.authStatus) {
          this.$router.push({
            path: "/publicServiceNum/serviceAuthorization"
          });
          return false;
        }
        if ((this.moduleper != undefined || this.moduleper != null) && this.moduleper.length > 0) {
          if (this.wxBtnShow) {
            this.$router.push({
              path: "/publicServiceNum/serviceNumIndex"
            });
          } else {
            this.$message.warning(
              "您还没有权限使用，无法进入，如有问题请联系机构管理员"
            );
          }

        } 
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "/visConfig.scss";

</style>

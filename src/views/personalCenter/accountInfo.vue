<template>
  <div class="accountInfo personalCenter main_layout">
    <div class="page-title">认证信息</div>
    <div class="content-wrap bg-white">
      <div class="accInfoBtn">
        <el-button v-if="platformHospital.auditStatus!=='40'" type="primary" @click="authenStepThree()">查看审核状态</el-button>
        <el-button v-if="platformHospital.auditStatus!=='40'" type="primary" @click="authenStepTwo()" v-show="edifileShow">修改认证资料</el-button>
      </div>
      <div class="info-wrap">
        <el-form label-width="140px">
          <el-form-item label="机构简称">{{platformHospital.abbrName}}</el-form-item>
          <el-form-item label="机构名称">{{platformHospital.name}}</el-form-item>
          <el-form-item label="机构类别">{{platformHospital.projectCategory}}</el-form-item>
          <el-form-item label="机构地址">{{platformHospital.province}} {{platformHospital.city}} {{platformHospital.area}}
            {{platformHospital.address}}</el-form-item>
          <el-form-item label="组织机构代码">{{platformHospital.authCode}}</el-form-item>
          <el-form-item label="组织机构代码证明证件">
            <div class="resultImg">
              <div v-for="(item,index) in codeUrlList" :key="index" class="relative paddingX5 padding5X" @mouseover="showLargeImgTool('largeProveImgTool', index)"
                @mouseleave="hideLargeImgTool('largeProveImgTool', index)">
                <div class="absolute textAlignCenter cursorPointer displayNone largeImgTool largeProveImgTool" @click="showLargeImg(item.url)">
                  <i class="el-icon-zoom-in color-white"></i>
                </div>
                <img :src="item.url" alt="组织机构代码证明证件" class="height100">
              </div>
            </div>
          </el-form-item>
          <el-form-item label="医疗机构执业许可证登记号">{{platformHospital.licenceNumber}}</el-form-item>
          <el-form-item label="医疗机构执业许可证证件">
            <div class="resultImg">
              <div v-for="(item,index) in licenceUrlList" :key="index" class="relative paddingX5 padding5X" @mouseover="showLargeImgTool('largeLicenseImgTool', index)"
                @mouseleave="hideLargeImgTool('largeLicenseImgTool', index)">
                <div class="absolute textAlignCenter cursorPointer displayNone largeImgTool largeLicenseImgTool" @click="showLargeImg(item.url)">
                  <i class="el-icon-zoom-in color-white"></i>
                </div>
                <img :src="item.url" alt="医疗机构执业许可证证件" class="height100">
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-dialog title="查看大图" :visible.sync="imgDlgVisible">
          <div class="textAlignCenter">
            <img class="big-pic" :src="LargeImgSrc">
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        checked: false,
        personalForm: {},
        licenceUrlList: "",
        codeUrlList: "",
        imgDlgVisible: false,
        LargeImgSrc: '',
        edifileShow:false
      };
    },
    computed: {
      ...mapState({
        platformHospital: state => state.application.platformHospital
      }),
      ...mapGetters({moduleper:'moduleper'})
    },
    deactivated: function () {
      this.leaveDialogVisible = true;
    },
    async created() {
      this.Jurisdiction();
      await this.$store
        .dispatch({
          type: "getPlatformHospitalByGatewayInfo"
        })
        .then(res => {
          this.licenceUrlList = JSON.parse(res.data.licenceUrl);
          this.codeUrlList = JSON.parse(res.data.codeUrl);
        });
    },
    methods: {
      Jurisdiction(){
        //权限控制
        if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
          this.moduleper.map(item=>{
            item.children.map(item2=>{
              if(item2.feature_id==351252){//"  申请修改机构认证信息"
                this.edifileShow=true;
              }

            })
          })
        }
      },
      authenStepTwo() {
        this.$router.push("/authentication/authenStepTwo/edit");
      },
      authenStepThree() {
        this.$router.push("/authentication/authenStepFour/add");
      },
      showLargeImgTool(overlayClassname, index) {
        document.getElementsByClassName(overlayClassname)[index].style.display =
          "block";
      },
      hideLargeImgTool(overlayClassname, index) {
        document.getElementsByClassName(overlayClassname)[index].style.display =
          "none";
      },
      showLargeImg(src) {
        this.imgDlgVisible = true;
        this.LargeImgSrc = src;
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import "@/assets/css/var.scss";

  .accInfoBtn {
    border-bottom: 1px #e6e6e6 solid;
    padding: 10px 20px 15px 0;
    overflow: hidden;
    margin: 0 50px;
    margin-top: 20px;

    button {
      float: right;
      padding: 9px 17px;
      background: $color-09b52d;
      border-color: $color-09b52d;

      &:first-child {
        margin-left: 20px;
      }
    }
  }

  .info-wrap {
    width: 400px;
    margin: 60px auto 14px;
    overflow: hidden;
  }

  .resultImg {
    min-height: 70px;
    display: flex;

    div.relative {
      height: 70px;

      img {
        border: 1px solid #E6E6E6;
        border-radius: 2px;
        height: 100%;
      }
    }
  }

  .largeImgTool {
    background: rgba($color: #000, $alpha: .4);
    width: 100%;
    height: 100%;
    line-height: 70px;
    top: 0;
    left: 0;
  }

  .big-pic {
    max-width: 100%;
  }

</style>

<style lang="scss" rel="stylesheet/stylus">
  @import "personalCenter.scss";

  .accountInfo {
    .el-form-item__label {
      font-size: 16px;
      color: #666;
      line-height: 18px;
      padding: 0 40px 0 0;
    }

    .el-form-item__content {
      font-size: 16px;
      color: #333;
      line-height: 18px;
    }

    .el-form-item {
      margin-bottom: 30px;
    }

    .el-button--primary.is-disabled {
      background-color: #7FCC7F;
      border-color: #7FCC7F;
    }
  }

</style>

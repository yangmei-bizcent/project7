<template>
  <div class="addUser">
    <div class="page-title">支付商户信息</div>
    <div class="addNew">
      <h3>修改商户信息</h3>
      <div class="line"></div>
      <div class="write-information">
        <el-form label-width="180px" :model="paymentForm" ref="paymentForm">
          <el-form-item label="开户银行账号" prop="openingBankAccount" :rules="[
      { required: true, message: '开户银行账号不能为空', trigger: 'blur'}]">
            <el-input
              placeholder="请填写医院对公的开户银行账号"
              v-model="paymentForm.openingBankAccount"
              @blur="getBankName" 
            ></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="openingBank" :rules="[
      { required: true, message: '开户银行不能为空', trigger: 'blur'},
    ]">
            <el-input
              placeholder="请填写医院对公的开户银行"
              v-model="paymentForm.openingBank"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信AppID" prop="appId" :rules="[
      { required: true, message: '微信AppID不能为空', trigger: 'blur'},
    ]">
            <el-input placeholder="请输入渠道账号" v-model="paymentForm.appId"></el-input>
          </el-form-item>
          <el-form-item label="微信支付商户号" prop="merchantNumber" :rules="[
      { required: true, message: '微信支付商户号不能为空', trigger: 'blur'}]">
            <el-input v-model="paymentForm.merchantNumber"></el-input>
            <!-- <span style="display:inline-block;margin-left:10px">如何获取微信支付商户号？</span> -->
            <el-button
              type="text"
              class="getCode"
              @click="getNumber = true"
              style="padding-left:28px"
            >如何获取微信支付商户号？</el-button>
            <el-dialog :visible.sync="getNumber" width="720px" height="400px">
              <img src="../../../assets/img/authentication/getNumber.png" style="width:656px;height:371px">
            </el-dialog>
          </el-form-item>
          <el-form-item label="微信商户平台登录账号" prop="loginAccount" :rules="[
      { required: true, message: '微信商户平台登录账号不能为空', trigger: 'blur'}]">
            <el-input v-model="paymentForm.loginAccount"></el-input>
            <el-button
              type="text"
              class="getCode"
              @click="dialogVisible = true"
              style="padding-left:28px"
            >如何获取微信商户平台登录账号？</el-button>
            <el-dialog  :visible.sync="dialogVisible" width="720px" height="400px">
              <img src="../../../assets/img/authentication/getAccount.png" style="width:656px;height:371px">
            </el-dialog>
          </el-form-item>
          <el-form-item label="微信商户平台API秘钥" prop="key" :rules="[
      { required: true, message: '微信商户平台API秘钥不能为空', trigger: 'blur'}]">
            <el-input v-model="paymentForm.key"></el-input>
            <!-- <span style="display:inline-block;margin-left:10px">如何获取微信商户平台API秘钥？</span> -->
            <el-button
              type="text"
              class="getCode"
              @click="getKey = true"
              style="padding-left:28px"
            >如何获取微信商户平台API秘钥？</el-button>
            <el-dialog title="如何获取微信商户平台API秘钥？" :visible.sync="getKey" width="1050px" height="800px">
              <img src="../../../assets/img/authentication/getkey.png" style="width:1000px;height:700px">
            </el-dialog>
          </el-form-item>
          <el-form-item label="证书文件">
            <el-upload
              action
              :file-list="files"
              :limit="1"
              :on-exceed="limitFile"
              :on-remove="handleRemove"
              :http-request="imgurlRequest"
              class="upload-demo"
              drag
              multiple
              prop="files"
              :before-upload="beforeAvatarUpload"
              accept=".rar,.zip,.0,.000,.001,.7z,.ace,.ain,.alz,.apz,.ar,.arc,.ari,.arj,.axx,.bh, .bhx, .boo, .bz, .bza, .bz2,
               .c00, .c01, .c02, .cab, .car, .cbr, .cbz, .cp9, .cpgz,.dar ,.dd ,.dgc,.efw ,.f ,.gca,.gz ,.ha ,.hbc2 ,.hbe ,.hki ,.hki1,.hki2 ,.hpk,.hyp,
.imp ,.ipk,.ish ,.jar ,.jgz,.par ,.par2 ,.pcv,.pea ,.pim ,.pit ,.piz ,.puz ,.pwa ,.r00 ,.r01 ,.r02 ,.r03 ,.rar ,.rk,.rnc ,.rpm ,.rte ,.rz ,.rzs,.s00 
,.s01,.s02 ,.s7z ,.sar,.sdn ,.sea ,.sfs,.sh ,.shar ,.shk ,.shr,.sit,.sitx ,.spt ,.sqx ,.sqz ,.tar ,.taz,.tbz ,.tbz2 ,.tgz ,.tlz ,.tlz4 ,.txz,.uc2 ,.uha ,
.uue ,.wot ,.xef ,.xx ,.xxe .xz,.y ,.yz ,.yz1,.z ,.zap,.zip ,.zipx,.zix ,.zoo,.zz,.exe"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
            <!-- <span class="how-to" style="display:inline-block;margin-left:15px">如何获取证书文件？</span> -->
            <el-button
              type="text"
              class="getCode"
              @click="getFile = true"
              style="padding-left:33px"
            >如何获取证书文件？</el-button>
            <el-dialog title="如何获取证书文件？" :visible.sync="getFile"  width="1050px" height="800px">
              <img src="../../../assets/img/authentication/getFile.png" style="width:1000px;height:700px">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button class="confirm" @click="confirm('paymentForm')" style="margin-bottom:60px;">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="wx-scan">
        <img src="../../../assets/img/authentication/ewmlogo.png" style="width:120px;height:120px;">
        <div class="wx-right">
          <!-- <img src="../../../assets/img/authentication/wxicon.png"> -->
          <dl class="scan">请使用微信扫码</dl>
          <dl class="ask">如有疑问，扫描二维码添加客服微信咨询，期待解决您的问题</dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  bankInfoApi,
  getInfoByIdApi,
  addAccountInfoApi,
  editAccountInfoApi
} from "../../../service/payment";
import { uploadFileApi } from "../../../service/application";
export default {
  data() {
    return {
      dialogVisible: false,
      getNumber:false,
      getKey:false,
      getFile:false,
      paymentForm: {
        openingBank: "",
        appId: "",
      },
      files: [],
      type: this.$route.query.type ? this.$route.query.type : "add",
      accountId: this.$route.query.accountId
    };
  },
  async mounted() {
    if (this.type == "edit") {
      // 获取账户信息
      let res = await getInfoByIdApi(this.accountId);
      //console.log("getAccountInfoApi", res);
      this.paymentForm = res.data;
      this.files = this.paymentForm.certificateFiles;
    }
  },
  methods: {
     beforeAvatarUpload(files) {
        //const isType = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg');
        const isLt1M = files.size / 1024 / 1024 < 1;
        // if (!isType) {
        //   this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
        // }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1M!');
        }
        return isLt1M;
      }, 
    async confirm(formName) {
      // 添加验证结果
        this.$refs[formName].validate((valid) => {
            var pattern = /^([1-9]{1})(\d{14,18})$/;
            if (!valid || !pattern.test(this.paymentForm.openingBankAccount)) {
                return false;
            }
            else if(this.files == ""){
               this.$message.error("证书文件不能为空");
                return false;
            }
            else{
                // 添加商户信息
                let platformHospitalId = JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId;
                this.paymentForm.certificateFiles = this.files;
                this.paymentForm.platformHospitalId = platformHospitalId;
                let accountId;
                if (this.type == "edit") {
                    editAccountInfoApi(this.paymentForm).then(res =>{
                        accountId = res.data;
                        this.$router.push({ name: "checkAudit",query:{accountId:accountId} });
                    });                    
                } else {
                    this.paymentForm.type = "wxpay";
                    addAccountInfoApi(this.paymentForm).then(res => {
                        accountId = res.data
                        this.$router.push({ name: "checkAudit",query:{accountId:accountId} });
                    });                    
                }
                
            }
        });
        
    },
    async getBankName() {
      var pattern = /^([1-9]{1})(\d{14,18})$/;
      if(this.paymentForm.openingBankAccount != ''){
        if (!pattern.test(this.paymentForm.openingBankAccount)) {
        this.$message.error("银行卡号不正确，请确认");
        return false;
      }
      let res = await bankInfoApi(this.paymentForm.openingBankAccount);
      if (res.data != "未知") {
        this.paymentForm.openingBank = res.data;
      }
      }
    },
    //上传图片 机构代码文件
    async imgurlRequest(res) {
      let form = new FormData();
      form.append("file", res.file);
      let obj = await uploadFileApi(form);
      //console.log("uploadFileApi", obj.data);
      if (obj.data.url) {
        this.files.push({
          name: res.file.name,
          url: obj.data.url
        });
        this.$message.success("上传文件成功");
        return;
      }
      this.$message.error("图片上传失败");
    },
    //图片超出数量提醒
    limitFile(file, fileList) {
      this.$message.error("最多上传一份文件，请删除之后再重新上传");
    },
    //删除图片
    handleRemove(file, fileList) {
      this.files = fileList;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/css/addUser.scss";
</style>

<style lang='scss'>
.addUser {
  clear: both;
  .el-input {
    width: 300px;
    height: 34px;
  }
  .el-upload-dragger {
    width: 300px;
    height: 180px;
  }
  .el-form-item__label {
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
  }
  .upload-demo {
    display: block;
    float: left;
  }
  .el-button--text {
    color: #3c9ef8;
    margin-left: -20px;
  }
  .el-dialog__title {
    font-size: 16px;
    color: #333333;
    letter-spacing: 0.2px;
    font-weight: bold;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
  .el-row {
    margin-top: 40px;
    height: auto;
    .guideline-left {
      text-align: center;
      border-right: 1px solid #e7e7e7;
      h5 {
        font-size: 14px;
        color: #04730e;
        letter-spacing: 0.17px;
      }
      img {
        margin: 27px 0 27px 0;
      }
      h6 {
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.17px;
        margin-bottom: 52px;
      }
    }
    .guideline-right {
      margin-left: 80px;
      h5 {
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.17px;
        margin-bottom: 20px;
      }
      p {
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.17px;
        width: 240px;
        line-height: 20px;
        margin-bottom: 14px;
      }
      span {
        color: #3c9ef8;
      }
    }
  }
}
</style>

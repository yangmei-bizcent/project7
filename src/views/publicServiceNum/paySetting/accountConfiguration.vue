<template>
  <div class="account-configuration">
    <div class="page-title">
      <span @click="backToConfiguration"><img src="../../../assets/img/publicServiceNum/返回.png" width="10" height="18">返回</span>
    </div>
    <div class="content">
      <div class="configuration-title">
        <p>账户配置</p>
      </div>
      <div class="account-from">
        <el-form class="account-form" ref="form" :rules="rules" :model="account" label-width="150px">
          <el-form-item label="商户账号" prop="number">
            <el-input v-model="account.number" placeholder="请输入商户账号"></el-input><span class="back-hint">例如：hnfy301@zj.pay <a>点击获取</a></span>
          </el-form-item>
          <el-form-item label="商户名称" prop="name">
            <el-input v-model="account.name" placeholder="请输入商户名称"></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="autograph">
            <el-input v-model="account.autograph" placeholder="请输入签名"></el-input><span class="back-hint">例如：1002201808014905 <a>点击获取</a></span>
          </el-form-item>
          <el-form-item label="支付平台地址" prop="paymentPlatformAdd">
            <el-input v-model="account.paymentPlatformAdd" placeholder="请输入支付平台地址"></el-input>
          </el-form-item>
          <el-form-item label="支付方式名称" prop="paymentModeName">
            <el-input v-model="account.paymentModeName" placeholder="请输入支付方式名称"></el-input>
          </el-form-item>
          <el-form-item label="支付方式类型" prop="paymentModeType">
            <el-select v-model="account.paymentModeType" placeholder="请选择">
              <el-option label="普通 微信" value="wechat"></el-option>
              <el-option label="支付宝" value="alipay"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="利润分成" prop="profit">
            <el-select v-model="account.profit" placeholder="请选择">
              <el-option label="直接到商户账号" value="1"></el-option>
              <el-option label="支付宝" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="跨号支付" prop="isCrossNumber">
            <el-select v-model="account.isCrossNumber" placeholder="请选择">
              <el-option label="跨号" value="1"></el-option>
              <el-option label="不跨号" value="2"></el-option>
            </el-select>
          </el-form-item>
          <div class="crossNumberPay" v-if="account.isCrossNumber == 1">
            <el-form-item label="收钱商户号" prop="name">
              <el-input v-model="account.name" placeholder="请输入收钱商户号"></el-input>
            </el-form-item>
            <el-form-item label="收钱商户号秘钥" prop="name">
              <el-input v-model="account.name" placeholder="请输入收钱商户号秘钥"></el-input>
            </el-form-item>
            <el-form-item label="收钱商户号地址" prop="name">
              <el-input v-model="account.name" placeholder="请输入收钱商户号地址"></el-input>
            </el-form-item>
            <el-form-item label="回调地址" prop="name">
              <el-input v-model="account.name" placeholder="请输入回调地址"></el-input>
            </el-form-item>
            <el-form-item label="跨号状态">
              <el-switch v-model="account.name" active-color="#35B53F"></el-switch>
            </el-form-item>
          </div>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="account.sort" placeholder="内容"></el-input>
          </el-form-item>
          <el-form-item label="支付配置状态" prop="payConfigStatus">
            <el-switch active-color="#35B53F" v-model="account.payConfigStatus"></el-switch>
          </el-form-item>
          <el-form-item label="图标上传">
            <el-upload
              class="logo-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :before-upload="beforeLogoUpload">
              <img v-if="account.logo" :src="account.logo" class="logo">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
            <!-- <span>图标要求：尺寸为：128*128px，大小：30kb以内，格式为：png，jpg</span> -->
          </el-form-item>

          <el-form-item class="affirm-item">
            <el-button class="affirm" type="primary">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: {
        number: '',
        name: '',
        autograph: '',
        paymentPlatformAdd: '',
        paymentModeName: '',
        paymentModeType: '普通 微信',
        profit: '',
        isCrossNumber: '',
        sort: '',
        payConfigStatus: false,
        logo: ''
      },
      rules: {
        number: [
          {required: true, message: '请输入商户账号', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入商户名称', trigger: 'blur'}
        ],
        autograph: [
          {required: true, message: '请输入商户签名', trigger: 'blur'}
        ],
        paymentPlatformAdd: [
          {required: true, message: '请输入支付平台地址', trigger: 'blur'}
        ],
        paymentModeName: [
          {required: true, message: '请输入支付方式名称', trigger: 'blur'}
        ],
        paymentModeType: [
          {required: true, message: '请选择支付方式类型', trigger: 'change'}
        ],
        profit: [
          {required: true, message: '请选择利润分成', trigger: 'change'}
        ],
        isCrossNumber: [
          {required: true, message: '请选择是否跨号', trigger: 'change'}
        ],
        sort: [
          {required: true, message: '请输入排序', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    backToConfiguration() {
      this.$router.push('/publicServiceNum/paySetting')
    },

    handleLogoSuccess(res, file) {
      this.account.logo = URL.createObjectURL(file.raw);
      // this.account.logo = res
    },
    beforeLogoUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt30K = file.size / 1024 < 30;

      if (!isJPG && !isPNG) {
        this.$message.error('只支持JPG和PNG格式上传!');
      }
      if (!isLt30K) {
        this.$message.error('上传图片大小不能超过 30KB!');
      }
      return (isJPG || isPNG) && isLt30K;
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
$green-color: #2ba245;

.account-configuration {
  .page-title {
    padding-left: 40px;
    span {
      cursor: pointer;
      font-size: 18px;
      color: #333333;
    }
    img {
      margin-right: 16px;
      vertical-align: middle;
    }
  }

  .content {
    padding-bottom: 40px;
    background-color: #FFFFFF;
    width: 95%;
    min-width: 900px;
    .configuration-title {
      p {
        padding: 24px 24px;
        font-size: 16px;
        color: #4A4A4A;
        font-weight: bold;
      }
    }
  }

  .logo-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .logo-uploader .el-upload:hover {
    border-color: #2ba245;
  }

  

  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .logo {
    width: 50px;
    height: 50px;
    display: block;
  }
}
</style>

<style lang="scss">
$green-color: #2ba245;

.account-configuration {
  .logo-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .logo-uploader .el-upload:hover {
    border-color: $green-color;
  }

  .logo-uploader::after {
    content: '图标要求：尺寸为：128*128px，大小：30kb以内，格式为：png，jpg';
    font-size: 12px;
    color: #999999;
    letter-spacing: 0.2px;
    margin-left: 10px;
    position: relative;
    bottom: 5px;
  }

  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .logo {
    width: 128px;
    height: 128px;
    display: block;
  }


  .affirm-item {
    // text-align: center;
    .affirm {
      width: 90px;
      height: 34px;
      border: none;
      background-color: $green-color;
    }
  }

  .account-form {

    .el-input {
      width: 300px;
    }

    .el-input__inner {
      width: 300px;
      height: 34px;
    }

    .el-form-item__label {
      color: #151515;
      letter-spacing: 0;
      padding-right: 26px;
    }

    .el-form-item__content {
      display: flex;
      .back-hint {
        margin-left: 13px;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0.2px;
        a {
          color: #3c9ef8;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  
}

</style>

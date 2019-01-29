<template>
  <div class="adminCancel">
    <div class="pageTitle">注销账户</div>
    <el-form :model="personalForm" :rules="rules" ref="personalForm" label-width="200px">
      <p class="pncTitle">您可以通过以下方式进行安全验证</p>
      <div>安全手机</div>
      <p class="pncTitle">点击免费获取验证码，短信将发送至********423</p>
      <el-form-item label="图片验证码" prop="imgCode">
        <el-input placeholder="图片验证码" v-model="personalForm.imgCode">
          <template slot="append">验证码图片</template>
        </el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="dxCode">
        <el-input placeholder="短信验证码" v-model="personalForm.dxCode">
          <el-button slot="append">{{ dxCodeBtnText }}</el-button>
        </el-input>
      </el-form-item>
      <p class="pncLabel">验证个人信息 根据注册时填写信息填写</p>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="personalForm.name" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="personalForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('personalForm')">确认提交</el-button>
      <el-button type="primary" plain @click="accountCancel()">上一步</el-button>
    </el-form>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>您是否确认注销账号？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      var validPCard = (rule, value, callback) => {
        var idCardNoUtil = {
          /*省,直辖市代码表*/
          provinceAndCitys: {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
          }
        };
      };
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else if (!/\d([-]\d)?$/.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        }
        return callback();
      };
      return {
        personalForm: {
          imgCode: "",
          dxCode: "",
          name: "",
          email: "",
        },
        dxCodeBtnText: "免费获取验证码",
        centerDialogVisible: false,
        rules: {
          phone: [{
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
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
          imgCode: [{
            required: true,
            message: "请输入图片验证码",
            trigger: "blur"
          }],
          dxCode: [{
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }],
          name: [{
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }],
          email: [{
            required: true,
            message: "请选择邮箱",
            trigger: "blur"
          }],
        }
      };
    },
    methods: {
      accountCancel() {
        this.$router.push("/personalCenter/accountCancel");
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log('注册!');
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "personalCenter.scss";

</style>

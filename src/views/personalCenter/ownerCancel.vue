<template>
  <div class="ownerCancel">
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
      <p class="pncLabel">验证机构信息 根据认证时填写的组织机构证及医疗机构执业许可证填写</p>
      <el-form-item label="机构名称" prop="setupName">
        <el-input v-model="personalForm.setupName" placeholder="机构名称" class="width217"></el-input>
      </el-form-item>
      <el-form-item label="机构类别" prop="hospType">
        <el-select v-model="personalForm.hospType" placeholder="请选择">
          <el-option v-for="item in htOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构地址" prop="hospAdd">
        <el-row>
          <el-col :span='8'>
            <el-form-item prop="Province">
              <el-select v-model="personalForm.Province" clearable placeholder="省" @change='getCity'>
                <el-option v-for="item in personalForm.provinces" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item prop="City">
              <el-select v-model="personalForm.City" clearable placeholder="市" @change='getArea'>
                <el-option v-for="item in personalForm.cities" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item prop="Area">
              <el-select v-model="personalForm.Area" clearable placeholder="区">
                <el-option v-for="item in personalForm.areas" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="法人/责任人" prop="corporation">
        <el-input v-model="personalForm.corporation" placeholder="法人/责任人"></el-input>
      </el-form-item>
      <el-form-item label="组织机构代码" prop="organizationCode">
        <el-input v-model="personalForm.organizationCode" placeholder="组织机构代码" class="width217"></el-input>
      </el-form-item>
      <el-form-item label="医疗机构执业许可证登记号" prop="plfmiCode">
        <el-input v-model="personalForm.name" placeholder="医疗机构执业许可证登记号" class="width217"></el-input>
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
          hospType: "",
          provinces: [], //绑定省份代码
          cities: [], //绑定城市代码
          areas: [], //绑定区域代码
          Province: null,
          ChinaProvince: "",
          City: null,
          ChinaCity: "",
          Area: null,
          ChinaArea: "",
        },
        dxCodeBtnText: "免费获取验证码",
        centerDialogVisible: false,
        htOptions: [{
            value: "选项1",
            label: "其他"
          },
          {
            value: "选项2",
            label: "综合医院"
          },
          {
            value: "选项3",
            label: "中医医院"
          }
        ],
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
          setupName: [{
            required: true,
            message: "请输入机构名称",
            trigger: "blur"
          }],
          hospType: [{
            required: true,
            message: "请选择医院类别",
            trigger: "blur"
          }],
          hospAdd: [{
            required: true,
            message: "",
            trigger: "blur"
          }],
          Province: [{
            required: true,
            message: "请选择省份",
            trigger: "blur"
          }],
          City: [{
            required: true,
            message: "请选择城市",
            trigger: "blur"
          }],
          Area: [{
            required: true,
            message: "请选择区",
            trigger: "blur"
          }],
          corporation: [{
            required: true,
            message: "请输入法人/责任人",
            trigger: "blur"
          }],
          organizationCode: [{
            required: true,
            message: "请输入组织机构代码",
            trigger: "blur"
          }],
          plfmiCode: [{
            required: true,
            message: "请输入医疗机构执业许可证登记号",
            trigger: "blur"
          }],
        }
      };
    },
    methods: {
      accountCancel() {
        this.$router.push("/personalCenter/accountCancel");
      },
      getProvince() {
        //获取省
        var self = this;
        axios
          .get(apiurl.GetRegions, {
            code: ""
          })
          .then(function (res) {
            if (res.data.suc == true) {
              self.authenForm.provinces = res.data.rows;
            } else {
              self.$alert(res.data.mes, "提示");
            }
          })
          .catch(function (error) {
            //console.log(error);
          });
      },
      getCity(val) {
        //获取市
        var self = this;
        axios
          .get(apiurl.GetRegions, {
            params: {
              code: parseInt(val)
            }
          })
          .then(function (res) {
            if (res.data.suc == true) {
              self.authenForm.cities = res.data.rows;
              //console.log(self.authenForm.City);
              if (
                self.authenForm.City.substring(0, 2) !=
                self.authenForm.Province.substring(0, 2)
              ) {
                self.authenForm.City = "";
              }
              // self.authenForm.City = '';
            } else {
              self.$alert(res.data.mes, "提示");
            }
          })
          .catch(function (error) {
            //console.log(error);
          });
      },
      getArea(val) {
        //获取区
        var self = this;
        axios
          .get(apiurl.GetRegions, {
            params: {
              code: parseInt(val)
            }
          })
          .then(function (res) {
            if (res.data.suc == true) {
              self.authenForm.areas = res.data.rows;
              if (
                self.authenForm.City.substring(0, 4) !=
                self.authenForm.Area.substring(0, 4)
              ) {
                self.authenForm.Area = "";
              }
              // self.authenForm.Area = '';
            } else {
              self.$alert(res.data.mes, "提示");
            }
          })
          .catch(function (error) {
            //console.log(error);
          });
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

<template>
  <div class="newAdmin">
    <el-button type="text">
      <i class="el-icon-back"></i>返回
    </el-button>
    <p class="pncLabel">填写邀请管理员验证信息 确认邀请后，将发送验证邮件至被邀请者联系邮箱，被邀请者验证成功后即邀请完成。</p>
    <el-form :model="personalForm" :rules="rules" ref="personalForm" label-width="200px">
      <el-form-item label="姓名" prop="name">
        <el-input placeholder="请输入姓名" v-model="personalForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input placeholder="请输入手机号" v-model="personalForm.phoneNum"></el-input>
      </el-form-item>
      <!-- <el-form-item label="联系邮箱" prop="email">
        <el-input placeholder="请输入联系邮箱" v-model="personalForm.email"></el-input>
      </el-form-item> -->
      <el-button type="primary" @click="submitForm('personalForm', personalForm)">确认邀请</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
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
          name: "",
          phoneNum: "",
          // email: ""
        },
        rules: {
          name: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }],
          phoneNum: [{
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
          // email: [{
          //   required: true,
          //   message: "请输入联系邮箱",
          //   trigger: "blur"
          // }]
        },
      };
    },
    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return;
          } else {
            let personalForm = this.personalForm;
            this.$router.push({
              path: `/personalCenter/shareLink`,
              query: {
                name: personalForm.name,
                phoneNum: personalForm.phoneNum,
                email: personalForm.email
              }
            })
          }
        });
        let personalForm = this.personalForm;
        this.$router.push({
          path: `/personalCenter/shareLink`,
          query: {name: personalForm.name, phoneNum: personalForm.phoneNum}
        })
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "personalCenter.scss";

</style>
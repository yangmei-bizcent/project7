<template>
  <div class="adminEditor">
    <el-button type="text">
      <i class="el-icon-back"></i>返回</el-button>
    <p class="pncLabel">管理员信息 邀请成功后无法修改</p>
    <div class="adminInfo">
      <div class="aiLi">姓名:李慧茹</div>
      <div class="aiLi">手机号:13598745623</div>
      <div class="aiLi">联系邮箱:lihuiru@zhuojianchina.com</div>
    </div>
    <p class="pncLabel">管理员角色权限 可多选</p>
    <el-form :model="adminRightForm" :rules="rules" ref="adminRightForm">
      <el-form-item>
        <el-checkbox-group v-model="rightVal">
          <el-checkbox v-for="right in adminRightForm.adminRight" :label="right" :key="right" :value="right">{{right}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-button type="primary">确认修改</el-button>
  </div>
</template>

<script>
  const adminRights = ['运营管理员', '运营', '运营管理'];
  export default {
    data() {
      return {
        rightVal: [],
        adminRightForm: {
          adminRight: adminRights,
        },
        rules: {
        }
      };
    },
    methods: {
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

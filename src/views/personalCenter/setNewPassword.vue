<template>
  <div class="phoneNumChange personalCenter main_layout">
    <div class="page-title">修改登录密码</div>
    <div class="content-wrap bg-white">
      <div class="form-wrap">
        <el-form :model="personalForm" :rules="rules" ref="personalForm" label-width="100px">
          <el-form-item label="旧密码" prop="oldPassword">
            <u class="checkPass" @click="changeOldType">
              <img :src="seenOld ? seenImg : unseenImg" />
            </u>
            <el-input type="password" v-model="personalForm.oldPassword" placeholder="请输入旧密码" class="width340" auto-complete="off" v-if="pwdOldType"></el-input>
            <el-input v-model="personalForm.oldPassword" placeholder="请输入旧密码" class="width340" auto-complete="off" v-else></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <u class="checkPass" @click="changeType">
              <img :src="seen ? seenImg : unseenImg" />
            </u>
            <el-input type="password" v-model.trim="personalForm.newPassword" placeholder="请输入新密码" class="width340" auto-complete="off" v-if="pwdType"></el-input>
            <el-input v-model="personalForm.newPassword" placeholder="请输入新密码" class="width340" auto-complete="off" v-else></el-input>
            <p class="entryTip">密码至少由6个字符组成，必须包含数字、字母</p>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmNewPassword">
            <u class="checkPass" @click="changeConfirmType">
              <img :src="seenConfirm ? seenImg : unseenImg" />
            </u>
            <el-input type="password" placeholder="请再次输入密码" v-model.trim="personalForm.confirmNewPassword" class="width340" auto-complete="off" v-if="pwdConfirmType"></el-input>
            <el-input placeholder="请再次输入密码" v-model="personalForm.confirmNewPassword" class="width340" auto-complete="off" v-else></el-input>
          </el-form-item>
          <el-form-item class="button-item">
            <el-button type="primary" @click="submitForm('personalForm')" :disabled="dontInput">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import seenImg from '@/assets/img/passLookIcon.png';
import unseenImg from '@/assets/img/passHiddenIcon.png';
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"));
      }
      callback();
    };
    var validatePass1 = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/
      if (value.trim() === "") {
        callback(new Error("请输入新密码"));
      } 
      else if(!reg.test(value.trim())) {
        callback(new Error("密码必须包含数字和字母"));
      } 
      else {
        if (this.personalForm.confirmNewPassword !== "") {
          this.$refs.personalForm.validateField("confirmNewPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.personalForm.newPassword) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      personalForm: {
        oldPassword:'',
        newPassword: '',
        confirmNewPassword: ''
      },
      pwdType: true,
      pwdOldType: true,
      pwdConfirmType: true,
      seen: false,
      seenOld: false,
      seenConfirm: false,
      seenImg: seenImg, //看得见密码
      unseenImg: unseenImg, //看不见
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6-16位", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6-16位", trigger: "blur" },
          { validator: validatePass1, trigger: "blur" }
        ],
        confirmNewPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    //密码的显示隐藏
    changeOldType () {
      this.seenOld = !this.seenOld; //小眼睛的变化
      this.pwdOldType = !this.pwdOldType; //跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
    },
    //密码的显示隐藏
    changeType () {
      this.seen = !this.seen; //小眼睛的变化
      this.pwdType = !this.pwdType; //跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
    },
    //确认密码的显示隐藏
    changeConfirmType () {
      this.seenConfirm = !this.seenConfirm; //小眼睛的变化
      this.pwdConfirmType = !this.pwdConfirmType; //跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          //console.log("error submit!!");
          return false;
        }
        
        this.$store.dispatch({
          type: 'modifyPass',
          userInfo: {old_password: this.personalForm.oldPassword, new_password: this.personalForm.newPassword}
        }).then(()=>{
          // localStorage.removeItem('token');
          // localStorage.removeItem('userName');
          localStorage.clear();
          sessionStorage.clear()
          this.$emit("outLogin",false);
          this.$router.push("/personalCenter/changeSuccess");
        });
        
      });
        
    }
  },
  computed: {
    //控制提交按钮是否禁用
    dontInput () {
      if (this.personalForm.newPassword.length > 0 && this.personalForm.confirmNewPassword.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkPass {
  box-sizing: border-box;
  z-index: 100;
  position: absolute;
  top: 0;
  right: 70px;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.button-item {
  button {
    padding: 9px 45px;
  }
}
</style>

<style lang="scss">
@import "personalCenter.scss";
</style>

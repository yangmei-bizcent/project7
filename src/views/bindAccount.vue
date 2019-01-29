<template>
  <div class="bind-account main_layout">
    <div class="page-title">
      <span>账户绑定</span>
    </div>
    <div class="bind-account-content">
      <p class="bind-text">尊敬的{{nickName}}，您好！请绑定账号，绑定账号后体验平台更多功能，之后便可以通过微信扫码或者账号密码登录。</p>

      <el-form :model="bindForm" :rules="rules" ref="bindForm" class="bind-form" label-width="100px">
        <el-form-item label="账号" prop="phone">
          <el-input v-model="bindForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="has-hint">
          <el-input v-model="bindForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <p class="hint">至少由6个字符组成，必须包含数字、字母</p>
          <el-button type="success" @click="submitForm('bindForm')">立即绑定</el-button>
          <el-button @click="$router.push('./register')">没有账号？立即创建</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import {
  Message
} from 'element-ui'

  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          this.phoneSuccess = false
          return callback(new Error("请填写手机号码"));
        } else if (!/^((1[3-9][0-9])+\d{8})$/.test(value)) {
          this.phoneSuccess = false
          return callback(new Error("请填写有效的11位手机号码"));
        } else {
            this.phoneSuccess = true
            return callback();
        }  
      }
      return {
        nickName: this.$route.query.nickName,
        bindForm: {
          phone: '',
          password: ''
        },

        rules: {
          phone: [
            { required: true, message: "请输入手机号码", trigger: "blur" },
            { validator: validatePhone, trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            // { min: 6, max: 16, message: "密码长度为6-16位", trigger: "blur" },
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/, message: "密码格式错误" }
          ]
        }
      }
    },
    methods: {
      // 引入修改vuex的方法，如修改token，this.set_token('11111111');
      ...mapActions(['set_token','set_orgname','set_orgstate','user_name']),
       submitForm(formName) {
        // let self = this
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            //console.log('error submit!!');
            return false;
          } 
          this.$store.dispatch({type: 'isRigist', phone: this.bindForm.phone}).then((res)=>{
            //console.log(res)
            if(res.data==false){
              Message.error('抱歉，账户不存在，请创建后绑定！');
              return false;
            }
            this.$router.push({
            path: '/bindAccountResult',
            query: {
              phone: this.bindForm.phone,
              code: this.$route.query.code,
            }
          })
          //console.log('submit!')
        });
          });
          
      },
    },
    components: {

    }
 }
</script>

<style lang='scss' scoped>
.bind-account {
  .bind-form {
    width: 440px;
    margin: 80px auto auto;
    .el-form-item.has-hint {
      margin-bottom: 8px;
      transition: margin-bottom 0.5s;
    }
    .el-form-item, .el-form-item.is-error {
      margin-bottom: 30px;
    }

    .el-button {
      width: 400px;
      height: 46px;
      margin: 0 0 30px 40px;
      &.el-button--success {
        background-color: #09B52D;
      }
      &.el-button--success + .el-button {
        border-color: #09B52D;
        color: #09B52D;
      }
    }

    .hint {
      text-align: left;
      padding-left: 100px;
      margin-bottom: 30px;
      font-family: 'PingFang SC','MicrosoftYaHei';;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0.2px;
    }
  }

  .bind-account-content {
    padding-top: 54px;
    height: 664px;
    min-width: 900px;
    background-color: #ffffff;
    text-align: center;
  }
}
</style>

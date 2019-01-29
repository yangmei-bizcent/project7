<template>
    <div class="changeSuccess personalCenter result main_layout wechatResult">
    <div class="page-title"></div>
    <div class="content-wrap bg-white">
      <div class="wrapper">
        <template v-if="isSuccessful || flag">
          <div class="resultImg"><i class="el-icon-circle-check"></i></div>
          <p class="resultTip" :style="{ 'color': '#04730E' }">授权成功</p>
          <p class="result-tip-vice line1">您通过信息验证，成为{{orgname}}的管理员</p>
          <el-button class="next-button" type="primary" @click="goToLogin">前往登录</el-button>
        </template>
        <template v-else-if="tag">
          <div class="resultImg"><i class="el-icon-circle-close"></i></div>
          <p class="resultTip" :style="{ 'color': '#333' }">授权失败</p>
          <p class="result-tip-vice line1">验证出了一些小问题，请稍后再试</p>
          <p class="result-tip-vice">请检查网络或者刷新页面</p>
          <el-button class="next-button" type="primary" @click="reConfirm">重新绑定</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  data() {
    return {
      flag: false,
      tag: false, 
      orgname: ''
    };
  },
  computed: {
    ...mapState({
      isSuccessful: state => state.user.wechatBindRes.status,
    }),
    // ...mapGetters({
    //   orgname:'orgname'
    // }),
  },
  async created(){
    let query = this.$route.query;
    this.orgname = unescape(this.$route.query.orgname || JSON.parse(localStorage.getItem('orgnameW')));
    if(("prev" in query)){
      this.flag = true;
    } else {
      await this.$store.dispatch({type: 'wechatBind', authCode: query.code, phone: query.state});
      this.tag = true;
    }
  },
  mounted () {
    let container = document.querySelector('.layout_minWidth');
    let content = document.querySelector('.el-container .layout-page-content');
    container.style.minWidth = 'auto';
    content.style.padding = '0';
  },
  methods: {
    goToLogin () {
      this.$router.push("/");
    },
    reConfirm () {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 100px auto 313px;
}
.result-tip-vice {
  font-size: 16px;
  color: #666;
  letter-spacing: 0.2px;
  text-align: center;
}
.line1 {
  margin: 30px auto 12px;
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "personalCenter.scss";
@media screen and (max-width: 580px) {
  .wechatResult {
    width: 100%;
    .wrapper {
      width: 100%;
      button {
        width: 100%;
        padding: 14px 0;
      }
    }
  }
}
</style>

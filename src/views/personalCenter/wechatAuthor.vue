<template>
    <div class="wechatAuthor personalCenter main_layout">
        <div class="page-title">
            <el-button type="text" class="back-btn color-333" @click="backToPersonalSettings">
                <i class="el-icon-arrow-left"></i> 返回</el-button>
        </div>
        <div class="bg-white">
            <div class="bind-content">
                <header class="bind-header">绑定微信</header>
                <p class="content">
                    <span class="title">注意事项：</span><br/>
                    1.绑定微信后，可以使用微信扫码登录至互联网医院开放平台。<br/>
                    2.点击绑定微信，立即授权，跳转至微信授权登录界面。<br/>
                    3.授权后将获取微信名、微信账号的信息。<br/>
                    4.新用户在授权成功后，可以去机构认证，体验平台更多精彩功能。<br/>
                </p>
            </div>
            <div class="asfImg" id="login_container"></div>
            <div class="qrcode-text color-333"><img src="~@/assets/img/publicServiceNum/wechat.png" />请使用微信扫码</div>
        </div>
    </div>
</template>

<script>
import {exportLocalUrl} from "../../service/baseuri";
export default {
  data() {
    return {
    };
  },
  async mounted(){
    let container = document.querySelector('.layout_minWidth');
    let content = document.querySelector('.el-container .layout-page-content');
    container.style.minWidth = 'auto';
    content.style.padding = '0';
    let phone = this.$route.query.phone;
    let orgname = this.$route.query.orgname;
    localStorage.setItem('orgnameW', JSON.stringify(orgname));
    //console.log('exportLocalUrl',exportLocalUrl)
    let obj = new WxLogin({
        id: "login_container", 
        appid: "wx312a55fd0dc9cebd", 
        scope: "snsapi_login", 
        redirect_uri: encodeURIComponent(exportLocalUrl+"/personalCenter/wechatResult"),
        state: phone,
        style: "black", 
        href: "data:text/css;base64,Ym9keSB7bWFyZ2luOiAwfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE0MHB4OyBoZWlnaHQ6IDE0MHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAucGFuZWxDb250ZW50IHtwb3NpdGlvbjogcmVsYXRpdmU7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19icm93c2VyIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyB7cG9zaXRpb246IGFic29sdXRlO3RvcDogMDtsZWZ0OiAwO3BhZGRpbmc6IDUycHg7YmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyBpIHttYXJnaW4tcmlnaHQ6IDA7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19zdWNjIC5zdGF0dXNfdHh0IHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5xcmNvZGUge21hcmdpbi10b3A6IDB9DQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmV9DQouaW1wb3dlckJveCAuc3RhdHVzIHt0ZXh0LWFsaWduOiBjZW50ZXI7fQ=="
    })
  },
  methods: {
    backToPersonalSettings () {
      this.$router.push(`/personalCenter/confirmInviteMsg/${this.$route.query.phone}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-white {
  background: #FFF;
  overflow: hidden;
}
.back-btn {
  font-size: 18px;
  padding: 30.5px 0 30.5px;
}
.bind-content {
  width: 800px;
  height: 260px;
  margin: 80px auto 50px;
  text-align: center;
  border: 1px solid #E6E6E6;
  header {
    font-size: 24px;
    color: #333333;
    letter-spacing: 1.5px;
    background-color: #F5F7FA;
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid #E6E6E6;
  }
  p.content {
    width: 571px;
    text-align: left;
    padding: 20px 0;
    margin: 0 auto;
    font-size: 16px;
    color: #333333;
    letter-spacing: 1px;
    line-height: 23px;
    .title {
      font-weight: bold;  
    }
  }
}
.qrcode-text {
  width: 142px;
  margin: 15px auto 110px;
  text-align: center;
  font-size: 14px;
  letter-spacing: -0.66px;
  img {
    height: 22px;
    width: 22px;
    vertical-align: middle;
    margin-right: 6px;
  }
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "personalCenter.scss";
.wechatAuthor {
  .asfImg {
    width: 142px;
    height: 142px;
    margin: 0 auto;
    iframe {
      width: 142px;
      height: 142px;
    }
  }
}
@media screen and (max-width: 1040px) {
  .wechatAuthor {
    width: 100%;
  }
}
@media screen and (max-width: 900px) {
  .wechatAuthor {
    .bind-content {
      width: 95%;
      height: auto;
      p.content {
        width: 100%;
      }
    }
  }
}
</style>

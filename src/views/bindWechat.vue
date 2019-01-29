<template>
  <div class="bind-wechat main_layout">
    <div class="page-title">
      <span @click="$router.go(-1)"><img src="../assets/img/publicServiceNum/返回.png" width="10" height="18">返回</span>
    </div>
    <div class="bind-wrapper">
      <div class="bind-content">
        <header class="bind-header">绑定微信</header>
        <p class="content">
          <span class="title">注意事项：</span><br/>
          1.绑定微信后，可以使用微信扫码登录至互联网医院开放平台。<br/>
          2.微信扫码，微信上显示确认授权界面，点击确认。<br/>
          3.授权后将获取微信名、微信账号的信息。<br/>
          4.新用户在授权成功后，可以去机构认证，体验平台更多精彩功能。<br/>
        </p>
      </div>
      <div class="qr-wrapper">
        <div class="qr-code" id="qr-code">
          <!-- 二维码 -->
        </div>
        <p class="hint"><img src="../assets/img/publicServiceNum/wechat-bind.png" alt="请使用微信扫码">请使用微信扫码</p>
      </div>
    </div>
  </div>
</template>

<script>
import {exportLocalUrl} from "../service/baseuri";
  export default {
    data() {
      return {

      }
    },

    async mounted(){
    let phone = this.$route.query.phone;
    //console.log('exportLocalUrl',exportLocalUrl)
    //微信二维码绑定
    let obj = new WxLogin({
        id: "qr-code", 
        appid: "wx312a55fd0dc9cebd",
        scope: "snsapi_login", 
        redirect_uri: encodeURIComponent(exportLocalUrl+"/bindResult"),
        state: phone,
        style: "black", 
        href: "data:text/css;base64,Ym9keSB7bWFyZ2luOiAwfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE0MHB4OyBoZWlnaHQ6IDE0MHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAucGFuZWxDb250ZW50IHtwb3NpdGlvbjogcmVsYXRpdmU7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19icm93c2VyIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyB7cG9zaXRpb246IGFic29sdXRlO3RvcDogMDtsZWZ0OiAwO3BhZGRpbmc6IDUycHg7YmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyBpIHttYXJnaW4tcmlnaHQ6IDA7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19zdWNjIC5zdGF0dXNfdHh0IHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5xcmNvZGUge21hcmdpbi10b3A6IDB9DQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmV9DQouaW1wb3dlckJveCAuc3RhdHVzIHt0ZXh0LWFsaWduOiBjZW50ZXI7fQ=="
    })
  },
    methods: {

    },
    components: {

    }
 }
</script>

<style lang='scss' scoped>
.bind-wechat {
  min-height: 680px;
  .page-title {
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

  .bind-wrapper {
    padding: 80px 0;
    min-width: 900px;
    background-color: #ffffff;
  }

  .bind-content {
    width: 800px;
    height: 260px;
    margin: 0 auto 50px;
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

  .qr-wrapper {
    width: 142px;
    margin: 0 auto;
    position: relative;
    .qr-code {
      width: 142px;
      height: 142px;
    }
    
    .scan-success {
      width: 142px;
      height: 142px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      // top: 142px;
      background-color: rgba($color: #ffffff, $alpha: 0.8);
    }

    .hint {
      font-size: 14px;
      color: #333333;
      letter-spacing: -0.66px;
      margin-top: 16px;
      text-align: center;
      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
  
}
</style>

<style lang="scss">
.bind-wechat {
  .qr-code {
    width: 142px;
    height: 142px;
    margin: 0 auto;
    iframe {
      width: 142px;
      height: 142px;
    }
  }
}
</style>

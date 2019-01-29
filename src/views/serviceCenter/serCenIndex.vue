<template>
  <div class="serCenIndex">
    <!-- 多元化服务类型 -->
    <section class="service-type">
      <p class="title-main title title-color-b">多元化服务类型</p>
      <p class="title-vice title">您的需求是我们的动力，不断革新，锐意进取</p>
      <el-carousel
        height="544px"
        :interval="10000"
        indicator-position="none">
        <el-carousel-item v-for="item in Math.ceil(businessTypeList.length / 4)" :key="item">
          <div class="item-wrap">
            <el-card
              class="service-item"
              :body-style="cardBodyStyle"
              v-for="(type, index) of businessTypeList.slice((item - 1) * 4, (item - 1) * 4 + 4)"
              :key="index"
              @mouseenter.native="showContentItem(index)">
              <p class="item-title title title-color-b">{{ type.businessTypeName }}</p>
              <hr>
              <img :src="type.businessTypeUrl">
              <div
                class="content-items-wrap"
                :style="{ display: contentItemIndex === index ? 'block' : 'none' }"
                @mouseleave="hideContentItem"
                @click="prevent">
                <p class="content-items-title title title-color-w">{{ type.businessTypeName }}</p>
                <ul v-if="type.items ? type.items.length <= 4 : true">
                  <li
                    class="block-items"
                    v-for="(item, viceIndex) of type.items"
                    :key="viceIndex" @click="toDetail(item.applicationId)">
                    <p class="content-items-title-main title-color-w">{{ item.applicationName }}</p>
                    <p class="content-items-title-vice">{{ item.applicationDesc }}</p>
                  </li>
                </ul>
                <el-row v-else :gutter="10" class="lots-app-wrap">
                  <el-col
                    :span="8"
                    v-for="(item, viceIndex) of type.items"
                    :key="viceIndex">
                    <div class="inline-items" @click="toDetail(item.applicationId)">
                      <p class="title-color-w">{{ item.applicationName }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
    <!-- 个性化解决方案 -->
    <section class="personal-solution">
      <div class="wrapper">
        <div class="sidebar">
          <ul class="title-color-w">
            <li
              v-for="(item, index) of sidebarItems"
              :key="index"
              :class="{ 'sidebar-hover': sidebarSelected === index ? true : false }"
              @mouseenter="sidebarHover(index)"><i :class="item.className"></i>{{ item.title }}</li>
          </ul>
        </div>
        <div class="personal-solution-content">
          <div class="title-wrap">
            <p class="personal-solution-title-main title-color-w title-main">个性化解决方案</p>
            <p class="personal-solution-title-vice title-vice">针对医疗特征及细分业务场景，深度定制</p>
          </div>
          <div class="personal-solution-item-wrap">
            <template v-if="sidebarSelected === 1">
              <section class="description">
                <p class="title-color-w">运营基础解决方案</p>
                <p>帮助您管理对医院消息的运营，提升医院亲和度</p>
              </section>
              <section class="service-configure-wrap title-color-w">
                <p class="service-configure">服务配置</p>
                <ul>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/hospitalNavigation.png" />医院导航</li>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/healthEncyclopedia.png" />健康百科</li>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/newsBulletin.png" />新闻公告</li>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/messagePush.png" />消息推送</li>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/healthEducation.png" />健康宣教</li>
                </ul>
                <el-button class="title-color-w">查看更多</el-button>
              </section>
            </template>
            <template v-else-if="sidebarSelected === 0">
              <section class="description">
                <p class="title-color-w">预约挂号基础解决方案</p>
                <p>实现预约挂号分流，减少排队长，挂号难等问题</p>
              </section>
              <section class="service-configure-wrap title-color-w">
                <p class="service-configure">应用推荐</p>
                <ul>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/hospitalNavigation.png" />预约挂号</li>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/healthEncyclopedia.png" />就诊人管理</li>
                  <li><img class="service-configure-icon" src="~@/assets/img/serviceCenter/newsBulletin.png" />就诊人记录</li>
                </ul>
                <!-- <el-button class="title-color-w">查看更多</el-button> -->
              </section>
            </template>
            <template v-else>
              <p class="title-color-w">便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民便民</p>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import hospitalOperation from "@/assets/img/serviceCenter/hospitalOperation.png";
import informationManagement from "@/assets/img/serviceCenter/informationManagement.png";
import convenienceServices from "@/assets/img/serviceCenter/convenienceServices.png";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      contentItemIndex: -1,
      sidebarSelected: 0,
      isClick: false,
      timeOut: null,
      cardBodyStyle: {
        padding: "20px 36px"
      },
      serviceTypes: [],
      sidebarItems: [
        // {
        //   title: "运营",
        //   className: "operative"
        // },
        {
          title: "预约挂号",
          className: "registration"
        },
        // {
        //   title: "便民",
        //   className: "convenience"
        // }
      ]
    };
  },
  computed: {
    ...mapState({
      businessTypeList: state => state.application.businessTypes,
      // applicationService: status => status.application.applicationService
    }),
    ...mapGetters({})
  },

  async created() {
    await this.$store.dispatch({
      type: "getBusinessTypes"
    }).then(res => {
      //console.log('this.businessTypeList',this.businessTypeList);
      this.businessTypeList.forEach((element,index) => {

         this.$store.dispatch({
          type: "getApplicationServiceByBusinessTypeId",
          businessTypeId: element.businessTypeId
        }).then(res => {
          element.items = res.data;
          this.$store.commit('addAppItems',{req:{index:index,element:element}});
        });
      });
    }); 
  },
  methods: {
    showContentItem(index) {
      this.contentItemIndex = index;
    },
    hideContentItem() {
      if (!this.isClick) {
        this.contentItemIndex = -1;
      }
    },
    sidebarHover(index) {
      this.sidebarSelected = index;
    },
    //防止连续click触发mouseleave
    prevent() {
      this.isClick = true;
      if (!this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(() => {
        this.isClick = false;
      }, 10);
    },
    toDetail(applicationId) {
      //console.log(applicationId)
      this.$router.push({
        path: '/serviceCenter/appDetail/1',
        query: {applicationId:applicationId}
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.title-color-b {
  color: #1c2126;
}
.title-color-w {
  color: #fff;
}
.service-type {
  height: 725px;
  background: url("~@/assets/img/serviceCenter/serviceTypeBgimg.png") bottom
    no-repeat #fff;
  //margin: -20px -20px 0 -20px;
}
.personal-solution {
  height: 769px;
  background: url("~@/assets/img/serviceCenter/personalSolutionBgimg.png") no-repeat;
  background-size: 100% 100%;
  //margin: 0 -20px -20px -20px;
}
.title {
  text-align: center;
}
.title-main {
  font-size: 38px;
  letter-spacing: 0.57px;
  padding: 40px 0 14px;
}
.title-vice {
  font-size: 20px;
  color: #999;
  letter-spacing: 0.55px;
}
.item-wrap {
  width: 1200px;
  margin: 60px auto 0;
  display: flex;
}
.service-item {
  height: 384px;
  width: 282px;
  margin: 0 12px;
  box-shadow: 0 2px 8px 0 rgba(9, 181, 45, 0.2);
  position: relative;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  hr {
    border: 1px #f0f0f0 solid;
    margin: 0 0 21px;
  }
  img {
    width: 100%;
  }
}
.item-title {
  font-size: 26px;
  letter-spacing: 0.56px;
  padding: 14px 0 26px;
}
.content-items-wrap {
  position: absolute;
  top: -40px;
  left: -25px;
  width: 330px;
  min-height: 464px;
  background: #01c05f;
}
.block-items {
  min-height: 84px;
  padding: 16px 26px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(
      -270deg,
      rgba(4, 98, 50, 0.16) 0%,
      rgba(4, 98, 50, 0) 100%
    );
  }
}
.lots-app-wrap {
  padding: 17px 10px 0;
}
.inline-items {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  cursor: pointer;
  border: 1px transparent solid;
  p {
    font-size: 14px;
    text-align: center;
  }
  &:hover {
    border: 1px #FFF solid;
    border-radius: 5px;
  }
}
.content-items-title {
  font-size: 26px;
  letter-spacing: 2.6px;
  margin: 0 26px 14px;
  padding: 26px 0;
  border-bottom: 1px rgba($color: #fff, $alpha: 0.4) solid;
}
.content-items-title-main {
  font-family:'PingFang SC','MicrosoftYaHei-Bold';
  font-size: 16px;
  letter-spacing: 1.6px;
  // font-weight: bold;
}
.content-items-title-vice {
  font-size: 14px;
  color: rgba($color: #fff, $alpha: 0.7);
  letter-spacing: 1.4px;
  margin-top: 12px;
}
.wrapper {
  width: 1200px;
  height: inherit;
  margin: 0 auto;
  display: flex;
}
.sidebar {
  height: inherit;
  width: 280px;
  background: #00120c;
  ul {
    padding-top: 301px;
  }
  li {
    height: 100px;
    font-size: 18px;
    letter-spacing: 1.8px;
    display: flex;
    align-items: center;
    border-left: 2px #00120c solid;
    cursor: pointer;
    i {
      height: 34px;
      width: 34px;
      margin: 0 23px 0 55px;
    }
  }
}
.sidebar-hover {
  background: linear-gradient(
    -270deg,
    rgba(49, 69, 63, 1) 0%,
    rgba(49, 69, 63, 0.34) 85%,
    rgba(50, 70, 64, 0.27) 92%,
    rgba(50, 70, 64, 0.1) 100%
  );
  border-left: 2px #00bb81 solid !important;
}
.operative {
  background: url(~@/assets/img/serviceCenter/operative.png) center no-repeat;
}
.registration {
  background: url(~@/assets/img/serviceCenter/registration.png) center no-repeat;
}
.convenience {
  background: url(~@/assets/img/serviceCenter/convenience.png) center no-repeat;
}
.personal-solution-content {
  padding: 46px 0 0 70px;
  flex-grow: 1;
}
.personal-solution-title-main {
  padding-left: 116px;
}
.personal-solution-title-vice {
  padding: 16px 0 109px 66px;
}
.description {
  height: 100px;
  width: 100%;
  border-bottom: 1px rgba($color: #fff, $alpha: 0.3) solid;
  margin-bottom: 32px;
  p:first-child {
    font-size: 20px;
    letter-spacing: 2px;
    margin-bottom: 13px;
  }
  p:last-child {
    font-size: 15px;
    color: rgba($color: #fff, $alpha: 0.7);
    letter-spacing: 1.5px;
  }
}
.service-configure-wrap {
  ul {
    margin-bottom: 46px;
    height: 30px;
  }
  li {
    display: inline-flex;
    font-size: 18px;
    letter-spacing: 1.8px;
    align-items: center;
    padding: 0 5px 0 8px;
    margin-right: 37px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.service-configure {
  letter-spacing: 1.6px;
  margin-bottom: 35px;
}
.service-configure-icon {
  width: 33px;
  height: 30px;
  margin-right: 10px;
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "serviceCenter.scss";
.serCenIndex {
  min-width:1345px;
  .el-card {
    overflow: visible;
  }
  .service-configure-wrap {
    .el-button {
      background: transparent;
      border-radius: 0;
      font-size: 16px;
      padding: 9px 22px;
      border-color: #fff;
    }
  }
}
</style>

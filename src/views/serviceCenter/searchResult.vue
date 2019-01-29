<template>
  <div class="search-result">
    <div class="top">
      <div class="catalog">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/serviceCenter/serCenIndex' }">服务中心</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item class="current-item">医院介绍</el-breadcrumb-item>
        </el-breadcrumb>

        <el-input class="search" placeholder="服务关键字" suffix-icon="el-icon-search" @click.native="searchApp()" v-model="serviceKeyword">
        </el-input>
      </div>
    </div>
    <div class="search-content">
      <div class="no-result" v-if="noSuchApp">
        <img src="../../assets/img/serviceCenter/noResult.png">
        <p>搜索无结果</p>
        <p>请更换搜索的关键字，重新查找</p>
      </div>

      <div class="has-result" v-else>
        <div class="modules-wrapper">
          <div class="module-item" v-for="item in moduleList" @click="toAppDetail(item.applicationId)">
            <img :src="item.headerImg"  width="94" height="94">
            <div class="module-describe">
              <p>{{item.applicationName}}</p>
              <p>{{item.applicationDesc}}</p>
            </div>
            <div class="go">
              <!-- <span class="opened" v-if="item.opened && (!item.configured)">已开通</span>
              <span class="opened" v-if="item.opened && item.configured">已配置</span> -->
              <span>&gt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import module1 from '../../assets/img/serviceCenter/新闻公告.png'
import module2 from '../../assets/img/serviceCenter/健康百科.png'
import { axiosget } from "../../service/config.js"
export default {
  data() {
    return {
      serviceKeyword: this.$route.params.serviceKeyword,
      noSuchApp: false,
      moduleList: [
        {
          imgUrl: module1,
          title: '新闻公告',
          introduce: '及时知晓医院就诊相关变化和医院最新资讯',
          opened: true,
          configured: true
        },
      ]
    };
  },
  mounted() {
    //console.log(this.$route.params.serviceKeyword);
    this.searchApp();
  },
  methods: {
    searchApp(){
      if(this.serviceKeyword == undefined){
        this.serviceKeyword = ""
      }
      axiosget(`application/release/appSearch?searchText=${this.serviceKeyword}&date=${new Date().getTime()}`).then(res => {
        this.moduleList = res.data
        this.moduleList.length == 0 ? this.noSuchApp = true :this.noSuchApp = false
      })
    },

    toAppDetail(applicationId) {
      this.$router.push({
        path: '/serviceCenter/appDetail/1',
        query: {applicationId}
      })
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
.search-result {
  margin: 0 -20px;
  .top {
    height: 65px;
    width: 1200px;
    margin: 0 auto;

    .catalog {
      display: flex;
      justify-content: space-between;
      .search {
        width: 244px;
      }
    }
  }

  .search-content {
    width: 100%;
    background-color: #ffffff;
    padding: 44px 0;
    min-height: 640px;
    .no-result {
      padding-top: 10px;
      width: 300px;
      margin: 0 auto;
      text-align: center;
      p:nth-child(2){
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        margin: 40px 0 30px 0;
      }
      p:last-child {
        font-size: 16px;
        color: #666666;
        letter-spacing: 0;
        text-align: center;
      }
    }

    .has-result {
      width: 1200px;
      margin: 0 auto;
      .modules-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }

    .module-item {
      cursor: pointer;
      width: 588px;
      height: 96px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto 24px auto;
      border: 1px solid #E7E7EB;
      .module-describe {
        margin-left: -40px;
        width: 290px;
        font-size: 12px;
        color: #B2B2B2;
        line-height: 24px;
        p:first-child {
          font-size: 16px;
          color: #333333;
        }

      }
      .go {
        width: 100px;
        text-align: right;
        margin-right: 12px;
        color: #D8D8D8;
        font-weight: bold;
        span.opened {
          font-size: 14px;
          color: #333333;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.search-result {
  .el-breadcrumb {
    line-height: 40px;
    .el-breadcrumb__inner {
      color: #8e939a;
    }

    .el-breadcrumb__item.current-item {
      .el-breadcrumb__inner {
        color: #09b52d;
      }
    }
  }

  .el-input__suffix {
    cursor: pointer;
  }
}
</style>


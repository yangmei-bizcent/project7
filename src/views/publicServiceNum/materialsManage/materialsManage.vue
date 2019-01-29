<template>
  <div class="materials-manage bgcolor-white">
    <div class="page-title flex-alignstart-justifystart">
      <span>素材管理</span>
      <span class="marginleft30 fontsize0 color-999">同步微信公众平台服务号上的所有素材资料</span>
    </div>

    <div class="paddingX20 padding20X content-wrap">
      <hr class="tabs-hr">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <!-- 图文消息 -->
        <el-tab-pane label="图文消息" name="news">
          <div class="flex-justify">
            <div>
              <span class="tab-title">图文消息<span>(共{{ totalNews }}条)</span></span>
              <span>
                <img
                  @click="switchType('newsType', 'group')"
                  class="type-icon"
                  :src="newsType === 'group' ? typeIcon.groupFocus : typeIcon.groupBlur"/>
                <img
                  @click="switchType('newsType', 'list')"
                  class="type-icon"
                  :src="newsType === 'list' ? typeIcon.listFocus : typeIcon.listBlur"/>
              </span>
            </div>

            <div>
              <el-input
                class="search-input"
                v-model="newsSearchKey"
                placeholder="标题">
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search search-btn"
                  @click="searchNews">
                </i>
              </el-input>
              <el-button class="sync-btn" type="primary" @click="syncMaterials">同步图文素材</el-button>
            </div>
          </div>

          <template v-if="newsType === 'group'">
            <div class="waterfall-wrap">
              <waterfall
                :line-gap="290">
                <waterfall-slot
                  v-for="(item, index) in newsData"
                  :width="290"
                  :height="getHeight(item.list.length - 1)"
                  :order="index"
                  :key="index">
                  <div class="waterfall-content">
                    <div
                      class="news-item flex-align-justify"
                      @click="viewNews(item.list[0].url)">
                      <img :src="item.list[0].thumbUrl">
                      <div class="first-img-title">{{ item.list[0].title }}</div>
                    </div>
                    <div
                      class="small-img-item flex-spacebetween flex-align"
                      v-for="(jItem, jIndex) of item.list.slice(1, item.list.length)"
                      :key="jIndex"
                      @mouseenter="showCover(index, jIndex)">
                      <span :title="jItem.title">{{ jItem.title }}</span>
                      <img :src="jItem.thumbUrl"/>
                      <div
                        @click="viewNews(jItem.url)"
                        class="mask flex-align-justify"
                        v-show="newsIndex === `${ index }-${ jIndex }` && jItem.url"
                        @mouseleave="hideCover">
                        <span>点击预览</span>
                      </div>
                    </div>
                    <div class="updateTime">更新于{{ new Date(item.updateTime * 1000).toLocaleString() }}</div>
                  </div>
                </waterfall-slot>
              </waterfall>
            </div>
          </template>

          <template v-if="newsType === 'list'">
            <el-table
              class="list-view"
              :data="newsData"
              style="width: 100%">
              <el-table-column label="图文内容">
                <template slot-scope="scope">
                  <div class="flex-align">
                    <img
                      class="list-img"
                      :src="scope.row.list[0].thumbUrl">
                    <ul class="list-items">
                      <li
                        v-for="(item, index) of scope.row.list"
                        :key="index">
                         <a :href="item.url" target="view_frame">{{ item.title }}</a>
                      </li>
                    </ul>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="modifiedon" label="更新时间"></el-table-column>
            </el-table>
          </template>

          <el-pagination
            class="page"
            @current-change="handleNewsPageChange"
            layout="->, prev, pager, next, jumper"
            :page-size="newsPageSize"
            :current-page="newsPageNo"
            :total="totalNews">
          </el-pagination>
        </el-tab-pane>

        <!-- 图片 -->
        <el-tab-pane label="图片" name="image">
          <div class="flex-justify">
            <div>
              <span class="tab-title">图片<span>(共{{ totalImage }}条)</span></span>
              <span>
                <img
                  @click="switchType('imageType', 'group')"
                  class="type-icon"
                  :src="imageType === 'group' ? typeIcon.groupFocus : typeIcon.groupBlur"/>
                <img
                  @click="switchType('imageType', 'list')"
                  class="type-icon"
                  :src="imageType === 'list' ? typeIcon.listFocus : typeIcon.listBlur"/>
              </span>
            </div>

            <div>
              <el-button class="sync-btn" type="primary" @click="syncMaterials">同步图文素材</el-button>
            </div>
          </div>

          <div>
            <span class="tab-title">分组</span>
            <span class="classify">全部图片({{ totalImage }})</span>
          </div>

          <template v-if="imageType === 'group'">
            <div class="image-group-wrap">
              <div
                class="image-item"
                v-for="(item, index) of imageData"
                :key="index">
                <div class="flex-align-justify image-wrap">
                  <img :src="item.url"/>
                </div>
                <p :title="item.title" class="image-title">{{ item.title }}</p>
              </div>
            </div>
          </template>

          <template v-if="imageType === 'list'">
            <el-table
              class="list-view"
              :data="imageData"
              style="width: 100%">
              <el-table-column label="图片名称">
                <template slot-scope="scope">
                  <div class="flex-align">
                    <img
                      class="list-img"
                      :src="scope.row.url">
                    <span>{{ scope.row.title }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="createdon" label="创建时间"></el-table-column>
            </el-table>
          </template>

          <el-pagination
            class="page"
            @current-change="handleImagePageChange"
            layout="->, prev, pager, next, jumper"
            :page-size="imagePageSize"
            :current-page="imagePageNo"
            :total="totalImage">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import groupFocus from '@/assets/img/publicServiceNum/groupFocus.png';
import groupBlur from '@/assets/img/publicServiceNum/groupBlur.png';
import listFocus from '@/assets/img/publicServiceNum/listFocus.png';
import listBlur from '@/assets/img/publicServiceNum/listBlur.png';
import {
  getMaterials,
  syncMaterials,
  searchMaterials
} from '@/service/wechat';
import waterfall from '@/components/waterfall';
import waterfallSlot from '@/components/waterfall-slot';

export default {
  components: {
    waterfall,
    waterfallSlot
  },
  data () {
    return {
      activeTab: 'news',
      newsSearchKey: '',
      newsSearchCurrentKey: '',
      newsType: 'group',
      imageType: 'group',
      newsData: [],
      imageData: [],
      typeIcon: {
        groupFocus,
        groupBlur,
        listFocus,
        listBlur
      },
      newsPageNo: 1,
      newsPageSize: 10,
      imagePageNo: 1,
      imagePageSize: 10,
      totalNews: 0,
      totalImage: 0,
      newsIndex: ''
    }
  },
  created () {
    let i = document.querySelector('meta[name="referrer"]');
    i.content = 'never';
    this.searchMaterials();
  },
  methods: {
    //获取素材
    getMaterials (type, pageNo, pageSize) {
      getMaterials({
        type,
        pageNo,
        pageSize
      }).then(res => {
        if (res.data) {
          this.initMaterialsData(type, res.data);
        }
      }).catch(err => {
        console.error(err);
      });
    },
    //同步
    syncMaterials () {
      syncMaterials({
        type: this.activeTab
      }).then(res => {
        if (typeof res.data === 'string') {
          if (res.data === '同步数据成功') {
            this.$message.success(res.data);
            switch (this.activeTab) {
              case 'news':
                this.searchMaterials();
                break;
              case 'image':
                this.getMaterials(this.activeTab, this.imagePageNo, this.imagePageSize);
                break;
            }
          } else {
            this.$message.error(res.data);
          }
        }
      }).catch(err => {
        console.error(err);
      });
    },
    //搜索
    searchMaterials () {
      searchMaterials({
        searchText: this.newsSearchCurrentKey,
        pageNo: this.newsPageNo,
        pageSize: this.newsPageSize
      }).then(res => {
        if (res.data) {
          this.initMaterialsData('news', res.data);
        }
      }).catch(err => {
        console.error(err);
      });
    },

    initMaterialsData (type, data) {
      switch (type) {
        case 'news':
          this.totalNews = data.total;
          this.newsData = data.list;
          break;
        case 'image':
          this.totalImage = data.total;
          this.imageData = data.list;
          break;
      }
    },
    searchNews () {
      this.newsSearchCurrentKey = this.newsSearchKey;
      this.searchMaterials();
    },
    switchType (tabType, viewType) {
      this[tabType] = viewType;
    },
    //tab点击事件
    handleClick (tab) {
      switch (tab.name) {
        case 'news':
          this.searchMaterials();
          break;
        case 'image':
          this.getMaterials(tab.name, this.imagePageNo, this.imagePageSize);
          break;
      }
    },
    //分页
    handleNewsPageChange (val) {
      this.newsPageNo = val;
      this.searchMaterials();
    },
    handleImagePageChange (val) {
      this.imagePageNo = val;
      this.getMaterials(this.activeTab, this.imagePageNo, this.imagePageSize);
    },

    getHeight (num) {
      return (55 * num + 170 + 40).toString();
    },
    viewNews (url) {
      if (url) {
        window.open(url);
      }
    },
    showCover (index, jIndex) {
      this.newsIndex = `${ index }-${ jIndex }`;
    },
    hideCover () {
      this.newsIndex = '';
    }
  },
  destroyed () {
    let i = document.querySelector('meta[name="referrer"]');
    i.content = 'always';
  }
}
</script>

<style lang="scss">
.materials-manage {
  .content-wrap {
    position: relative;
  }
  .el-tabs__item {
    font-size: 16px;
    color: #999;
    &.is-active {
      color: #333;
      font-family: 'MicrosoftYaHei-Bold';
      font-weight: bold;
    }
    &:hover {
      color: #42A84B;
    }
  }
  .el-tabs__active-bar {
    background-color: #42A84B;
  }
  .el-tabs__header {
    margin-bottom: 24px;
  }
  .tabs-hr {
    position: absolute;
    top: 50px;
    left: 0px;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    border: none;
  }
  .tab-title {
    display: inline-block;
    width: 120px;
    font-size: 16px;
    color: #333;
    letter-spacing: 0.23px;
    margin-right: 10px;
    span {
      font-size: 16px;
      color: #999;
      letter-spacing: 0.26px;
      line-height: 21px;
    }
  }
  .classify {
    border: 1px solid #35B53F;
    border-radius: 100px;
    padding: 7px 14px;
    font-size: 14px;
    color: #04730E;
    display: inline-block;
    cursor: pointer;
  }
  .type-icon {
    margin: 0 5px;
    cursor: pointer;
  }
  .search-input {
    width: 240px;
  }
  .search-btn {
    cursor: pointer;
  }
  .sync-btn {
    margin-left: 15px;
  }
  .list-view {
    margin-top: 20px;
  }
  .list-img {
    width: 130px;
    margin-right: 20px;
  }
  .list-items {
    font-size: 14px;
    color: #333;
    letter-spacing: 0;
    li {
      padding: 5px 0;
    }
    li:first-child {
      padding-top: 0;
    }
    li:last-child {
      padding-bottom: 0;
    }
    a {
      color: #333;
      cursor: default;
    }
  }
  .el-table thead {
    font-size: 16px;
    color: #333;
    th {
      background: #E6E6E6;
      font-weight: normal;
    }
  }
  .page {
    margin-top: 20px;
  }
  .image-group-wrap {
    margin: 10px -20px 0 -20px;
  }
  .image-item {
    height: 165px;
    width: 140px;
    border: 1px solid #E7E7E7;
    display: inline-block;
    margin: 10px 20px;
  }
  .image-wrap {
    width: inherit;
    height: 125px;
    img {
      max-width: 140px;
      max-height: 125px;
    }
  }
  .image-title {
    padding: 10px 12px;
    font-size: 14px;
    color: #333;
    letter-spacing: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .waterfall-wrap {
    margin: 20px 0 0 -40px;
  }
  .waterfall-content {
    border: 1px solid #CCC;
    margin: 0 0 40px 40px;
  }
  .small-img-item {
    height: 55px;
    margin: 0 13px;
    border-bottom: 1px solid #E7E7E7;
    position: relative;
    img {
      height: 37px;
    }
    span {
      font-size: 14px;
      color: #333;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      padding-left: 13px;
    }
    .mask {
      position: absolute;
      top: 0;
      left: -13px;
      height: 55px;
      width: 248px;
      background: rgba(0,0,0,0.40);
      span {
        color: #FFF;
        padding: 0;
      }
    }
  }
  .updateTime {
    height: 47px;
    line-height: 47px;
    margin: 0 13px;
    font-size: 14px;
    color: #999;
  }
  .news-item {
    position: relative;
    height: 123px;
    img {
      max-height: 110px;
      max-width: 222px;
    }
  }
  .first-img-title {
    position: absolute;
    bottom: 6.5px;
    left: 13px;
    width: 222px;
    height: 28px;
    background: rgba(0,0,0,0.40);
    color: #FFF;
    font-size: 14px;
    line-height: 28px;
    padding: 0 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-pager .number {
    &:hover {
      color: #35b53f;
    }
    &.active {
      color: #35b53f;
    }
  }
  .el-pagination .el-input__inner {
    margin: 0;
  }
}
</style>

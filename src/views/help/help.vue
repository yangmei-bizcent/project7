<template>
  <div class="help">
    <!-- <div class="cover" v-show="isLoading">
      <img src="../../assets/img/loading.gif" />
    </div> -->
    <el-container>
      <el-aside width="230px">
        <el-row class="helpMenu">
          <el-col>
            <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" background-color="#fff" text-color="#333333"
              active-text-color="#16953C" unique-opened>
              <div v-for="(n,index) in helpParentMenuList" :key="index">
                <!-- 一级目录无二级菜单 -->
                <el-menu-item v-if="n.sonHelpMenuList.length == 0" :index="index.toString()" @click="openFirstMenuList(index)">
                  <span>{{n.name}}</span>
                </el-menu-item>
                <!-- 一级目录有二级菜单 -->
                <el-submenu v-if="n.sonHelpMenuList.length != 0" :index="index.toString()">
                  <template slot="title">
                    <span>{{n.name}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item :index="index.toString()+'-'+a.toString()" v-for="(item,a) in n.sonHelpMenuList" :key="index.toString()+'-'+a.toString()"
                      @click="openFirstMenuList(index,a)">
                      <span>{{item.name}}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <div class="helpContain">
          <div class="helpSearch">
            <el-input placeholder="请输入内容" v-model="helpSearch" class="input-with-select" @blur="helpSearchBlur">
              <i class="el-icon-search el-input__icon" slot="prefix">
              </i>
              <el-button class="helpSearchBtn" slot="append" @click="putSearch(helpSearch)">搜索</el-button>
            </el-input>
            <ul class="searchMind" v-show="searchListShow && helpInfoListBySearch.length != 0">
              <li v-for="(n,index) in helpInfoListBySearch" :key="index" @mousedown="putSearch(n.title)">{{n.title}}</li>
            </ul>
          </div>
          <div class="helpList" v-show="helpQuestions">
            <div class="helpListNone" v-show="menuListInfo.length == 0"><img src="../../assets/img/helpListNone.png" />
              <p>暂无内容</p>
            </div>
            <p v-for="(help,index) in menuListInfo" :key="index" @click="helpDetail(help.helpCenterInfoId)">{{help.title}}</p>
          </div>
          <div class="helpInfo" v-show="!helpQuestions">
            <div class="helpOne">
              <p class="helpOneTitle">{{helpInfoDetail.title}}</p>
              <div class="helpContantShow" v-html="helpInfoDetail.richContent">{{helpInfoDetail.richContent}}</div>
            </div>
            <pre></pre>
            <!-- <div class="helpTip">
              <p class="helpTipTitle">温馨提示</p>
              <p>1、完成注册后，您的手机号码将与您新申请的微信号进行绑定，之前的注册绑定关系将会被自动解除，请您放心，不会对您现在微信号的注册和使用带来任何影响；</p>
              <p>2、为了方便您记忆及使用，注册成功后建议您修改微信号。</p>
            </div> -->
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {
    axiosget,
    axiospost,
    aixospatch
  } from "../../service/config.js"
  import {
    mapState,
    mapGetters
  } from "vuex";
  import {
    Loading
  } from 'element-ui';
  export default {
    data() {
      return {
        // isLoading: true,
        defaultActive: '',
        helpSearch: '',
        helpCenterInfoId: '',
        menuListInfo: {},
        helpQuestions: true,
        searchListShow: false,
        height: ""
      };
    },
    watch: {
      helpSearch(val) {
        if (!val) {
          this.searchListShow = false;
          return;
        }
        this.$store.dispatch({
          type: "searchHelpCenterInfoByTitleOrContent",
          searchInfo: encodeURI(val)
        }).then(res => {
          this.searchListShow = true;
        });
      },
    },
    async created() {
      let loadingInstance = Loading.service({
        fullscreen: true
      });
      this.helpCenterInfoId = this.$route.query.helpInfoId;
      if (this.helpCenterInfoId) {
        this.$store.dispatch({
          type: "getHelpCenterInfoById",
          helpCenterInfoId: this.helpCenterInfoId
        });
        axiospost(`/application/helpCenter/web/incrHelpCenterInfoClicks?helpCenterInfoId=${this.helpCenterInfoId}`).then(
          res => {
            this.helpQuestions = false;
          })
      }
      await this.$store.dispatch({
        type: "getHelpCenterParentMenu"
      });
      //根据返回的helpCenterMenuId定位目录
      let pIndex = -1;
      let sIndex = -1;
      this.helpParentMenuList.filter((parentMenu, parentIndex) => {
        if (parentMenu.helpCenterMenuId == this.helpInfoDetail.helpCenterMenuId) {
          pIndex = parentIndex;
        } else {
          parentMenu.sonHelpMenuList.filter((sonMenu, sonIndex) => {
            if (sonMenu.helpCenterMenuId == this.helpInfoDetail.helpCenterMenuId) {
              pIndex = parentIndex;
              sIndex = sonIndex
            }
          })
        }
      })
      if (pIndex >= 0) {
        this.defaultActive = pIndex + '-' + sIndex;
      } else {
        if (this.helpParentMenuList[0].sonHelpMenuList.length == 0) {
          this.defaultActive = '0';
          this.menuListInfo = this.helpParentMenuList[0].parentHelpInfoList;
        } else {
          this.defaultActive = '0-0';
          this.menuListInfo = this.helpParentMenuList[0].sonHelpMenuList[0].sonHelpInfoList;
        }
      }
      loadingInstance.close();
    },
    computed: {
      ...mapState({
        helpParentMenuList: state => state.application.helpParentMenuList,
        helpSonMenuList: state => state.application.helpSonMenuList,
        helpInfoList: state => state.application.helpInfoList,
        helpInfoListBySearch: state => state.application.helpInfoListBySearch,
        helpInfoDetail: state => state.application.helpInfoDetail
      })
    },
    mounted() {
      this.$nextTick(() => {
        let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
        //console.log(h)
        this.height = h - 235;
        //console.log(this.height)
      })
    },
    methods: {
      openFirstMenuList(index, a) {
        this.helpQuestions = true;
        if (a || a == 0) {
          this.menuListInfo = this.helpParentMenuList[index].sonHelpMenuList[a].sonHelpInfoList;
        } else {
          this.menuListInfo = this.helpParentMenuList[index].parentHelpInfoList;
        }
      },
      putSearch(title) {
        this.$router.push({
          path: '/help/searchHelpList',
          query: {
            title: title
          }
        })
      },
      //失去焦点，隐藏搜索联想
      helpSearchBlur() {
        this.searchListShow = false;
      },
      //根据帮助信息id查帮助信息
      helpDetail(helpCenterInfoId) {
        this.$store.dispatch({
          type: "getHelpCenterInfoById",
          helpCenterInfoId: helpCenterInfoId
        });
        axiospost(`/application/helpCenter/web/incrHelpCenterInfoClicks?helpCenterInfoId=${helpCenterInfoId}`).then(res => {
          this.helpQuestions = false;
        })
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "/help.scss";

</style>

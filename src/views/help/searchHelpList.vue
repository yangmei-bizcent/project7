<template>
  <div class="help searchHelpList">
    <el-container>
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
            <div class="helpListNone" v-show="menuListInfo.length == 0">很抱歉，找不到您搜索的“{{searchKey}}”相符的内容或信息。
            </div>
            <div class="helpInfo" v-for="(help,index) in menuListInfo" :key="index" @click="helpDetail(help.helpCenterInfoId)">
              <p class="helpTitle">{{help.title}}</p>
              <p class="helpIns">{{help.textContent}}</p>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        helpSearch: this.keyword,
        keyword: '',
        menuListInfo: [],
        helpQuestions: true,
        searchListShow: false,
        searchKey: ''
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
          searchInfo: val
        });
        this.searchListShow = true;
      },
    },
    async created() {
      this.keyword = this.$route.query.title;
      this.helpSearch = this.keyword;
      this.searchKey = this.keyword;
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
    async mounted() {
      await this.$store.dispatch({
        type: "searchHelpCenterInfoByTitleOrContent",
        searchInfo: this.helpSearch
      });
      this.menuListInfo = this.helpInfoListBySearch;
      this.searchListShow = false;
    },
    methods: {
      putSearch(title) {
        this.$store.dispatch({
          type: "searchHelpCenterInfoByTitleOrContent",
          searchInfo: encodeURI(title)
        });
        this.searchListShow = false;
        this.menuListInfo = this.helpInfoListBySearch;
        this.searchKey = this.helpSearch;
      },
      //失去焦点，隐藏搜索联想
      helpSearchBlur() {
        this.searchListShow = false;
      },
      //根据帮助信息id查帮助信息
      helpDetail(helpCenterInfoId) {
        this.$router.push({
          path: '/help/help',
          query: {
            helpInfoId: helpCenterInfoId
          }
        })
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "/help.scss";

</style>

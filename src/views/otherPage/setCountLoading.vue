<template>
  <section class="setCountLoading">
    <img src="">
  </section>
</template>

<script>
  import {mapGetters,mapState,mapActions} from 'vuex'
import axios from 'axios';
import {apiurl} from '@/service/api.js';
import {axiosConfig} from '@/service/config.js';
  export default {
    data() {
      return {
        imgLink: '../../assets/img/loading.gif'
      }
    },
    created() {
        
      let loadinginstace = this.$loading({
        lock: true,
        text: ' 努力加载中',
        background: 'rgba(255, 255, 255, 0.5)',
        target: 'setCountLoading',
        spinner: 'icon-loading'
      });
      let query = this.$route.query;
      //console.log('par', query)
      this.$store.dispatch({
        type: 'wechatLogin',
        req: {
          code: query.code
        }
      }).then((res) => {
        let wechatLoginInfo = this.$store.state.user.wechatLoginInfo;
        //console.log('wechat login result=' + wechatLoginInfo);
        if (wechatLoginInfo.status == true) {
          //console.log('wechat login success')
          this.user_name(res.data.openPlatformUser.realName);
          this.isLogined = true;
          this.$store.dispatch({
            type: 'listOrganization'
          }).then((res) => {
            loadinginstace.close();
           
            this.set_orgname('');
            if (res.data.length == 1) {
              
              this.set_orgname(res.data[0].name);
              this.set_orgstate(1);
              this.selectedOrganiz = res.data[0].platformHospitalId
              this.$store.dispatch({
                type: 'chooseOrg',
                req: {
                  org_id: this.selectedOrganiz
                }
              }).then(async (res1)=>{
               await this.getFeatures();//获取各模块权限
               await this.goConfigRoute();
                return false;
              })
            }
            if(res.data.length>=2){
              this.set_orgstate(2)
              this.$router.replace('/chooseOrganiz/false')
            }
            if (res.data.length == 0) {
              this.set_orgname('');
              this.set_orgstate('0');
              this.goConfigRoute();
              return false;
            }
          })
        } else {
          //console.log('wechat login failed')
          loadinginstace.close();
          this.$router.replace({
            path: `/bindAccount`,
            query: {
              code: wechatLoginInfo.openPlatformUser.pushId
            }
          });

        }

      });
      //   this.$router.push('/')
    },
    data() {
      return {
        isLogined: false, //是否已登录
        loading: '',
      }
    },
    mounted() {

    },
    methods: {
      ...mapActions(['set_orgname', 'set_orgstate', 'user_name','set_moduleper']),
      banIECache (url, connector = '&') {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          return url + connector + `t=${ new Date().getTime() }`;
        } else {
          return url;
        }
      },
      goConfigRoute(){
        setTimeout(()=>{
          this.$router.replace({
            path: `/visConfig/visualizationConfiguration`
          })
         },1000)
      },
     async getFeatures(){//获取各模块权限
         let url = this.banIECache(apiurl.getuserFeatures, '?');
         await axios.get(url,axiosConfig).then((res)=>{
            if(res.data){
              this.set_moduleper(res.data);
            }
              //console.log('各模块权限',res)
          })
      },
    },
    computed: {
      ...mapState({
        wechatLoginInfo: state => state.user.wechatLoginInfo,
      }),
      ...mapGetters({}),
    }
  }

</script>

<style lang="scss">
  @import '@/assets/css/var.scss';

  .icon-loading {
    background: url('../../assets/img/loading.gif');
    background-size: 100% 100%;
    width: 100px;
    height: 10px;

  }

</style>

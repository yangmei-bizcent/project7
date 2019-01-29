<template>
    <section class="authorizedLogin">
       <div class="authorizedLogin_content">
           <div class="title">
               <div class="conter">
                   <img :src="appdata.headerImg" :title="appdata.applicationName">
                    <span>{{appdata.applicationName}}</span>
               </div>
           </div>
           <div class="info">
               <div class="info_font">
                    <h5>即将登录服务商后台，服务商将获得以下权限：</h5>
                    <span>您的账号基本信息；</span>
                    <span>您的机构的基本信息；</span>
               </div>
           </div>
       </div>
       <div  class="submintBtn">
           <el-button type="success" @click="goRouterApp()">确认授权</el-button>
       </div>
    </section>
</template>

<script>
import {mapGetters, mapActions,mapState} from 'vuex';
export default {
    data(){
        return{

        }
    },
    
    created(){

    },
    computed: {
        ...mapState({
            currentDateInfo: state => state.user.currentDateInfo
        }),
        ...mapGetters({appdata:'appdata',orglist: 'organizationList',orgstate: 'orgstate',token: 'token',chooseOrgInfo: 'chooseOrgInfo', phone: 'phone',userName: 'userName',})
    },
    methods:{
        goRouterApp(){
            window.open(`${ this.appdata.applicationManageBaseUrl }&platformHospitalId=${ this.chooseOrgInfo.platformHospitalId }&token=${ this.token }&platformHospitalName=${ this.chooseOrgInfo.name }&phone=${ this.phone }&userName=${ this.userName }&currentDate=${ this.currentDateInfo.year }`);
        }
    }
}
</script>

 <style lang="scss" scoped>
 .authorizedLogin{
     width:80%;
     padding:70px 0;
     background: #fff;
     margin:90px auto 0;
     .authorizedLogin_content{
         width:50%;
         border:1px solid #E6E6E6;
         margin:0 auto;
         .title{
             .conter{
                 width:50%;
                 margin:0 auto;
                 text-align: center;
                 line-height: 50px
             }
             background: #F5F7FA;
             border-bottom: 1px solid #E6E6E6;
             padding:20px 0;
             img,span{
                 display:inline-block;
                vertical-align:middle;
             }
             img{
                 width:50px;
                 height: 50px;
                 margin:0 auto;
                 
             }
             span{
                 font-size: 24px;
                color: #333333;
                margin-left: 30px;
                vertical-align:middle;
             }
         }
         .info{
             padding: 40px 0;
             .info_font{
                 width: 56%;
                 margin:0 auto;
             }
             h5{
                font-size: 16px;
                color: #333333;
             }
             span{
                 display: block;
                 margin-top:16px;
                 font-size: 16px;
                color: #333333
             }
         }
     }
     .submintBtn{
        width:400px;
        margin:40px auto 0;
        .el-button{
            width:100%;
            min-height: 46px;
        }
     }
 }


</style>

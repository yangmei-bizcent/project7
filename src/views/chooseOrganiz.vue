<template>
    <div class="page-container page-chooseorganiz main_layout">
        <div class="page-title">{{ isLogined?'选择切换机构':'选择登录机构' }}</div>
        <div class="flex-align-justify-column paddingtop60 paddingbottom60 bg-white">
            <div class="organiz-container color-333">
                <header 
                    v-if="!isLogined"
                    class="fontsize10 textAlignCenter">该账户下面存在多条机构，请您选择登录</header>
                <header 
                    v-if="isLogined"
                    class="fontsize10 textAlignCenter">请您选择需要切换的机构，也可新增机构</header>
                <div class="padding20X paddingX115">
                    <div>
                        <p class="fontsize2 bold marginbottom15">已认证：</p>
                        <div class="flexwrap">
                            <el-radio 
                                v-for="(item, index) in organizationList"
                                :key="index" 
                                v-model="selectedOrganiz" 
                                class="color-333 marginright30"
                                :label="item.platformHospitalId" 
                                border v-if="item.auditStatus == '40'">{{ item.name }}</el-radio>
                            <!-- <div class="marginbottom15" v-else>暂无已认证机构</div> -->
                        </div>
                    </div>
                    <div class="margintop5" v-if="organizationListShow">
                        <p class="fontsize2 bold marginbottom15">未认证：<span class="chooseNote">未认证状态下，平台使用功能受限，请尽快修改认证信息，完成认证</span></p>
                        <div class="flexwrap">
                            <el-radio 
                                v-for="(item, index) in organizationList"
                                :key="index" 
                                v-model="selectedOrganiz" 
                                class="color-333 marginright30"
                                :label="item.platformHospitalId" 
                                border v-if="item.auditStatus != '40'">{{ item.name }}</el-radio>
                            <!-- <div v-else>暂无未认证机构</div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="textAlignCenter">
                <el-button 
                     type="primary" 
                    class="fontsize2 margintop50 width400 height46" 
                    @click="confirmOrganiz">确认</el-button>
                <br>
                <el-button 
                    v-if="isLogined"
                    type="primary" 
                    plain 
                    class="fontsize2 width400 height46 margintop20 btn-addorganiz" 
                    @click="addOrganiz"><i class="el-icon-plus bold"></i>新增机构</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import axios from 'axios';
import {apiurl} from '@/service/api.js';
import {axiosConfig} from '@/service/config.js';
import { Loading } from 'element-ui';
export default {
    computed: {
      ...mapState({
      }),
      ...mapGetters({
        //   organizationList: 'organizationList'
      }),
    },
    data() {
        return {
            isLogined: true,    //是否已登录，利用是否已登录，来确定是‘选择机构’还是‘切换机构’
            selectedOrganiz: '',    // 选中机构
            organizationList:'',
            organizationListShow:false,
        }
    },
    mounted() {
        this.isLogined = this.$route.params.islogined=='true'?true:false;
        this.$store.dispatch({
            type: 'listOrganization'
        }).then((res)=>{
            this.organizationList=res.data
            //console.log(this.organizationList,'wx')
            let auditStatus = ['40'];
            let count = 0;
             auditStatus.filter((item1) =>{
                        res.data.forEach((item,index) =>{
                            if(item.auditStatus==item1){
                               count ++;
                            }
                        })
                        // console.log(count,'dc')
                        // console.log(res.data.length,'ddd')
                        if(count < res.data.length){
                            this.organizationListShow = true;
                        }
                        else{
                            this.organizationListShow = false;
                        }
             })

        })
        // this.organizationList = JSON.parse(sessionStorage.getItem('organizationList'));

    },
    methods: {
        ...mapActions(['set_orgname','set_moduleper']),
        addOrganiz() {
            //console.log('新增机构');
            this.$router.push('/authentication/authenStepOne')
        },
        banIECache (url, connector = '&') {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                return url + connector + `t=${ new Date().getTime() }`;
            } else {
                return url;
            }
        },
        async confirmOrganiz() {
            // let loading= Loading.service({ fullscreen: true });
            if(this.selectedOrganiz != '') {
                await this.$store.dispatch({
                    type: 'chooseOrg', req: {org_id: this.selectedOrganiz}
                }).then(async (res)=>{
                   await this.getFeatures();
                   this.set_orgname(res.data.name);
                })
                // setTimeout(()=>{
                //     loading.close();
                  await  this.$router.push({path:"/visConfig/visualizationConfiguration"})
                // },500)
            }
            else {
                this.$message({
                    message: '请选择机构',
                    type: 'warning'
                });
            }
            
        },
      async  getFeatures(){//获取各模块权限
        let url = this.banIECache(apiurl.getuserFeatures, '?');
        await axios.get(url,axiosConfig).then((res)=>{
            if(res.data){
                this.set_moduleper(res.data);
            }
            //console.log('各模块权限',res)
        })
      },
    },
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
.page-chooseorganiz {
    .bg-white {
        background: #FFF;
    }
    .organiz-container {
        width: 50%;
        border: 1px solid $color-e6e6e6;
    }
    .flexwrap {
        display: flex;
        flex-wrap: wrap;
    }
    .width400 {
        width: 400px;
    }
    .height46 {
        height: 46px;
    }
    .paddingX115 {
        padding-left: 115px;
        padding-right: 115px;
    }
    header {
        height: 88px;
        line-height: 88px;
        letter-spacing: 1.5px;
        background-color: #f5f7fa;
        border-bottom: 1px dotted $color-e6e6e6;
    }
    .btn-addorganiz {
        color: $color-04730e;
        border-color: $color-09b52d;
        &:hover {
            color: $color-04730e;
        }
        i {
            color: $color-04730e;
            margin-right: 4px;
        }
    }
    .chooseNote {
        font-weight: 400;
        color: #c25c26;
        letter-spacing: 0.18px;
    }
    .el-radio.is-bordered {
        margin-bottom: 24px;
        border-color: $color-cccccc;
        &+.el-radio.is-bordered {
            margin-left: 0;
        }
    }
    .el-radio__inner {
        display: none;
    }
    .el-radio.is-bordered.is-checked {
        border-color: $color-09b52d;
        background-color: #e6f7ea;
    }
}
</style>



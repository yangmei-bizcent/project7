<template>
    <div class="viewInformation" v-loading="loadingMenu" v-if="!loadingMenu">
        <div class="page-title">支付商户信息</div>
        <div class="businessInformation">
            <el-row>
                <el-col :span="16"><h5>商户信息</h5></el-col>
                <el-col :span="8">
                    <div class="alter-scan">
                        <button @click="modifer" style="cursor:pointer" v-show="ApplyInfoShow">申请修改商户信息</button>
                        <button v-if="checkStatus || accountInfo.deletionState == '1'" @click="checkState" style="cursor:pointer">查看审核状态</button>
                    </div>
                </el-col>
            </el-row>
            <div class="message">
               <ul>
                   <li>开户银行<span>{{accountInfo.openingBank}}</span></li>
                   <li>开户银行账号<span>{{accountInfo.openingBankAccount}}</span></li>
                   <li>微信AppID<span>{{accountInfo.appId}}</span></li>
                   <li>微信支付商户号<span>{{accountInfo.merchantNumber}}</span></li>
                   <li>微信商户平台登录账号<span>{{accountInfo.loginAccount}}</span></li>
                   <li>微信商户平台API秘钥<span>{{accountInfo.key}}</span></li>
                   <li>证书文件<span><button @click="download" style="cursor:pointer">证书下载</button></span></li>
               </ul>
               <div class="Hint">
               <div class="hint">
                   <h6>温馨提示</h6>
                   <p>修改商户信息需要重新提交审核，审核时间在1-5个工作日之内。在最新提交审核的商户信息未审核成功之前，原有商户信息依然是有效状态，请注意最新提交的商户信息的生效时间为审核成功后，若有其他问题请联系客服。</p>
               </div>
               </div>
            </div>
        </div>   
    </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
import {getPayinfoApi,getInfoByIdApi,downloadApi} from '../../../service/payment'
import axios from 'axios';
import { axiosConfig } from '@/service/config';
export default {
    data(){
        return {
            accountInfo:{},
            accountId:this.$route.query.accountId,
            loadingMenu:true,
            checkStatus:false,
            //权限配置
            ApplyInfoShow:false,
        }
    },
    computed:{
        ...mapGetters({moduleper:'moduleper'})
    },
    async mounted() {
        this.Jurisdiction();
        if(this.accountId){
            this.checkStatus = true;
            let res = await getInfoByIdApi(this.accountId)
            this.loadingMenu = false
            this.accountInfo = res.data;
        }else{
            let platformHospitalId = JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId;
            let res = await getPayinfoApi(platformHospitalId)
            //console.log("getPayinfoApi:",res.data);
            let info = res.data
            this.accountId = info.accountId;
            this.loadingMenu = false
            if(info.status == "1" || info.status == "2"){
                // 到审核中页面
                this.$router.push({name:'checkAudit',query:{accountId:this.accountId}})
            }else if(info.status == "3"){
                this.accountInfo = info.showInfo
            } else if(info.status == "4"){
                this.$router.push({name:'checkState',query:{accountId:this.accountId}})
            }
        }
        // this.accountInfo = res.data;
    },
    methods:{
        Jurisdiction(){//权限配置
            if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
                this.moduleper.map(item=>{
                    item.children.map(item2=>{
                       if(item2.feature_id==351033){//"申请修改支付商户信息"
                            this.ApplyInfoShow=true;
                        }
                    })
                })
            }
        },
        checkState(){
            if(this.accountInfo.auditStatus == "1" || this.accountInfo.auditStatus == "2"){
                this.$router.push({name:'checkAudit',query:{accountId:this.accountId}})
            }else if(this.accountInfo.auditStatus == "4"){
                this.$router.push({name:'checkState',query:{accountId:this.accountId}})
            } else if(this.accountInfo.deletionState == "1"){
                this.$router.push({name:'checkState',query:{accountId:this.accountId}})
            }
        },
        modifer(){
            this.$router.push({name:'addUser',query:{type:"edit",accountId:this.accountId}})
        },
        download(){
            axios.post('payment/release/download',this.accountInfo.certificateFiles[0],Object.assign({responseType:'arraybuffer'},axiosConfig)).then(res => {
                let blob = new Blob([res.data]);
                let a = document.createElement('a');
                let url = URL.createObjectURL(blob);
                // window.location.href = url;
                a.href = url;
                a.download = this.accountInfo.certificateFiles[0].name;
                a.click();
                //  //console.log(res.data);
            }).catch(err => {
                //console.log(err);
            });
            //console.log(this.accountInfo.certificateFiles[0])
            //window.open(this.accountInfo.certificateFiles[0].url)
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/css/viewInformation.scss'
</style>


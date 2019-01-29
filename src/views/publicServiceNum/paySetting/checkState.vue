<template>
    <div class="payment-settings" v-loading="loadingMenu" v-if="!loadingMenu">
       <div class="page-title">支付商户配置/审核结果页面</div>
       <div class="reminder">
           <img src="../../../assets/img/authentication/Group 8.png">
           <p>审核未通过</p>
           <span>原因： {{auditPostil}}</span>
           <el-button class="confirm" @click='modifier'>修改资料</el-button>
       </div>
    </div>
</template>
<script>
import {getInfoByIdApi,getAuditInfoApi,getPayinfoApi} from '../../../service/payment'
import {mapGetters} from 'vuex'

export default {
    data(){
        return{
            accountId:this.$route.query.accountId,
            loadingMenu:true,
            auditPostil:''
        }
    },
    computed: {
        ...mapGetters({
            chooseOrgInfo: 'chooseOrgInfo'
        })
    },
    async created(){
        // if(this.accountId){
            if (!this.accountId) {
                let accountId = await getPayinfoApi(this.chooseOrgInfo.platformHospitalId)
                this.accountId = accountId.data.accountId
            }
            let res = await getInfoByIdApi(this.accountId)
            // this.loadingMenu = false
            let info = res.data;
            if(info.auditStatus == "1" || info.auditStatus == "2"){
                // 到审核中页面
                this.loadingMenu = false
                this.$router.push({name:'checkAudit',query:{accountId:this.accountId}})
            }else{
                // 获取审核异常
                let obj =  await getAuditInfoApi(this.accountId)
                this.loadingMenu = false
                this.auditPostil = obj.data.auditPostil
            }
        // }
    },
    methods:{
        modifier(){
            this.$router.push({name:'addUser',query:{type:"edit",accountId:this.accountId}})
        }
    }
}
</script>
<style lang='scss' scoped>
  @import '@/assets/css/checkState.scss'
</style>



<template>
    <div class="payment-settings" v-loading="loadingMenu" v-if="!loadingMenu">
       <div class="page-title">支付商户配置</div>
       <div class="reminder">
           <i class="el-icon-warning"></i>
           <p>您还未配置商户信息</p>
           <span>商户配置将需要将微信支付填写至开放平台，点击确定开始填写，申请结果将会三天内告知</span>
           <el-button class="confirm" @click="makesure">确定</el-button>
       </div>
    </div>
</template>
<script>
    import {checkPayInfoApi} from '../../../service/payment'
    export default {
        data(){
            return {
                loadingMenu:true
            }
        },
        async created() {
            let platformHospitalId = JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId;
            let res = await checkPayInfoApi(platformHospitalId)
            let code = JSON.parse(res.data.returnCode);
            //console.log("checkPayInfoApi:",res)
            this.loadingMenu = false
            if(code.includes(3)){
                // 已存在配置信息
                this.$router.push({name:'paymentAccountList'})
            }
            if(code == [4]){
                // this.$router.push({name:'viewInformation'})
                this.$router.push({name:'checkState'})
            }
            if(code == [1]){
                this.$router.push({name:'checkAudit'})
            }
        },
        methods:{
            makesure(){
                this.$router.push({name:'addUser'})
            }
        }
    }
</script>
<style lang='scss' scoped>
  @import '@/assets/css/paymentSettings.scss';
</style>


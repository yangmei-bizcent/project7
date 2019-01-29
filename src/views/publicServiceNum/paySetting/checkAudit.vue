<template>
    <div class="checkAudit">
        <div class="page-title"></div>
        <el-row>
            <el-col :span="14">
                <div class="sub">
                    <img src="../../../assets/img/authentication/Group 9.png">
                    <span>提交成功审核中</span>
                    <p>修改商户信息需要重新提交审核,审核时间在1-5个工作日之内。在最新提交审核的商户信息未审核成功之前，原有商户信息依然是有效状态，请注意最新提交的商户信息的生效时间为审核成功后，若有其他问题请联系客服。</p>
                    <button @click="viewInformation">查看审核中商户信息</button>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="service">
                    <img src="../../../assets/img/authentication/ewmlogo.png" style="width:159px;height:159px;margin-top:20px;">
                    <span>扫码添加客服</span>
                    <p>扫描该二维码，添加客服，快速帮您通过审核</p>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
    data(){
        return {
           accountId:this.$route.query.accountId 
        }
    },
    methods:{
        viewInformation(){
            this.$router.push({name:'viewInformation',query:{accountId:this.accountId}})
        }
    }
}
</script>

<style lang='scss'>
.checkAudit{
    .el-row{
        width:100%;
        // height:auto;
        background: #FFFFFF;
        // margin-top:73px;
        text-align:center;
    }
    .sub{
        margin-top:100px;
        padding-top:70px;
        padding-bottom:100px;
        margin-bottom:113px;
        border-right:1px solid #D8D8D8;
        span{
            display: block;
            font-size: 24px;
            color: #333333;
            letter-spacing: 0;
            line-height: 36px;
            margin:30px 0 20px 0;
        }
        p{
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
            line-height: 21px;
            width:90%;
            margin:0 auto;
        }
        button{
            background: #09B52D;
            border-radius: 4px;
            width:400px;
            height:46px;
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: 0.2px;
            border: none;
            margin-top:40px;
            cursor: pointer;
        }
        
    }
    .service{
         margin-top:170px;
        span{
            display: block;
            font-size: 24px;
            color: #04730E;
            letter-spacing: 0;
            text-align: center;
            line-height: 36px;
            margin:30px 0 20px 0;
        }
        p{
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
            line-height: 21px;
            width:90%;
            margin:0 auto;
        }
    }
    }
</style>

<template>
    <section class="dialogInfo">
        <el-dialog title="提示" :visible="dialogTableVisible" @close="closeX">
            <div class="dialogInfo_content">
                <div class="tips_title">
                    <i class="el-icon-warning"></i>  
                    <span>该项需要有开发能力才能进行</span>
                </div>
                <div class="dialogInfo_text">
                    <p class="title">开发者需要完成以下两步，来进行自动回复的开发</p>
                    <p>1. 阅读接入指南微信公众平台<a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1445241432">接口文档</a>，并在微信公众平台<a href="#">开发者中心</a>设置回调URL和Token</p>
                    <p>2. 设置成功后，在接收到用户信息时，自行根据需求通过代码进行回复</p>
                </div>
                <footer>
                    <el-button type="success" @click="IKnow">我知道了</el-button>
                </footer>

            </div>
           
        </el-dialog>
    </section>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['dialogTableVisible'],
    mounted() {
        
    },
    methods: {
       IKnow(){
           this.$emit("click",false);
       },
       closeX(){
           this.IKnow();
       }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
.dialogInfo{
    .dialogInfo_content{
        border-top: 1px solid #E7E7E7;
        padding: 30px 0;
    }
    .dialogInfo_text{
        .title{
            color: #333333;
        }
        p{
            margin-bottom: 16px;
            color: #666666;
            a{
                color: #3C9EF8;text-decoration:underline;
            }
        }
    }
    .tips_title{
        text-align:center;
        margin-bottom: 30px;
        i{
            font-size: 50px;
            color:  #43A2F9;
        }
        span{
            display: block;
            font-size: 18px;
            color: #333333;
            margin-top:20px;
        }

    }
    .el-dialog__body{
        padding: 0 20px;
    }
    footer{
        margin-top:50px;
        text-align: center;
    }
}
</style>



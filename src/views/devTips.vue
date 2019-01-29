<template>
    <section class="DevelopmentTips">
       <img src="../assets/img/devTips_img.png">
       <span>该功能正在火速开发中</span>
    </section>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
       
    },
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
.DevelopmentTips{
    height:100%;
    background: #fff;
    padding: 90px 0;
    img{
        display: block;
        width:169px;
        height: 160px;
        margin:0 auto 40px;
    }
    span{
         display: block;
         width:100%;
         text-align: center;
         font-size: 24px;
        color: #333333;
    }
}
</style>



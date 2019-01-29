<template>
    <div class="fixed fontsize-2 color-white index-fixedright-tool">
        <div class="flex-alignstart-justify">
            <transition name="slide">
                <div v-show="largeQrcodeShow" class="flex-align-justify-column fontsize2 lineheight24 wrap-largeqrcode">
                    <i class="icon-index-largeqrcode"></i>
                    <p>互联网医院公众号</p> 
                    <p>扫码体验</p>
                </div>
            </transition>
            <div>
                <div class="flex-align-justify-column cursorPointer item-tool" @click="goLink()">
                    <i class="icon-index-consult"></i>
                        <p>在线咨询</p>
                </div>
                <div 
                    @mouseover="qrcodeHover"
                    @mouseout="qrcodeBlur"
                    class="flex-align-justify-column cursorPointer item-tool">
                    <i class="icon-index-qrcode"></i>
                    <p>扫码体验</p>
                </div>
                <div 
                    @click="toPageTop"
                    class="flex-align-justify margintop10 cursorPointer item-tool">
                    <i class="el-icon-arrow-up icon-index-arrowtop"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            largeQrcodeShow: false,
        }
    },
    methods: {
        goLink(){//在线聊天
            window.open('http://wpa.qq.com/msgrd?v=3&uin=3425578887&site=qq&menu=yes');
        },
        qrcodeHover() {
            this.largeQrcodeShow = true;
        },
        qrcodeBlur() {
            this.largeQrcodeShow = false;
        },
        // 回到顶部
        toPageTop() {
            let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
            let step = distance/50; //每步的距离
            (function jump(){
                if(distance > 0){
                    distance-=step;
                    window.scrollTo(0,distance);
                    setTimeout(jump,10)
                }
            })();
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
.index-fixedright-tool {
    right: 0;
    bottom: 130px;
    z-index: 1000;
    p {
        margin-top: 7px;
    }
    .item-tool {
        width: 70px;
        height: 70px;
        background-color: $color-475265;
        &:hover {
            background-color: $color-35b14f;
        }
    }
    .icon-index-consult {
        width: 25px;
        height: 24px;
        background: url('../assets/img/index/index-consult.png') center no-repeat;
        background-size: contain;
    }
    .icon-index-qrcode {
        width: 26px;
        height: 26px;
        background: url('../assets/img/index/index-qrcode.png') center no-repeat;
        background-size: contain;
    }
    .icon-index-arrowtop {
        font-size: 32px;
    }
    .icon-index-largeqrcode {
        width: 112px;
        height: 112px;
        background: url('../assets/img/index/index-app-large-qrcode.png') center no-repeat;
        background-size: contain;
    }
    .wrap-largeqrcode {
        width: 140px;
        height: 194px;
        background-color: $color-35b14f;
    }
    .slide-enter,
    .slide-leave-to {
        opacity: 0;
    }
    .slide-enter-to,
    .slide-leave {
        opacity: 1;
    }
    .slide-enter-active {
        transition: opacity 0.2s ease;
    }
    .slide-leave-active {
        transition: none;
    }
}
</style>



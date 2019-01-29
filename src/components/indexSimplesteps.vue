<template>
    <div class="index-simplesteps flex-align-justifystart">
        <div
            v-for="(item, index) in simplestepsData"
            :key="index"
            class="flex-alignstart-justify">
            <div class="wrap-step flex-align-justifystart-column paddingX5 relative"
                :class="disableSteps==true?'':'activeSteps cursorPointer'"
                @mouseover="disableSteps==true?()=>{}:fiveStepHover('popshow_'+item.name)"
                @mouseleave="disableSteps==true?()=>{}:fiveStepBlur('popshow_'+item.name)">
                <div 
                    :style="'background-image: url('+ item.popBackground +')'"
                    class="pop-fivesteps-detail displayNone color-white absolute" 
                    :class="index==simplestepsData.length-1?'positionLeftPop popshow_'+item.name:'popshow_'+item.name"
                    @mouseenter="disableSteps==true?()=>{}:fiveStepBlur('popshow_'+item.name)">
                    <div>
                        <p class="fontsize2">{{item.title}}</p>
                        <p class="fontsize0 paddingtop14 lineheight27">{{ item.desc }}</p>
                    </div>
                </div>
                <div class="wrap-step-icon flex-align-justify">
                    <i 
                        class="step-icon" 
                        :class="disableSteps==true?'disabled-step-icon':''"
                        :style="'background-position:'+item.iconBgPosition"></i>
                </div>
                <p 
                    :class="disableSteps==true?'color-999':''"
                    class="margintop33 step-tit">{{ item.title }}</p>
            </div>
            <div 
                v-if="index<(simplestepsData.length-1)" 
                class="wrap-steps-arrow flex-align-justify-column">
                <i class="icon-steps-arrow"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['simplestepsData', 'disableSteps'],
    methods: {
        fiveStepHover(stepName) {
            document.getElementsByClassName(stepName)[0].style.display = 'block';
        },
        fiveStepBlur(stepName) {
            document.getElementsByClassName(stepName)[0].style.display = 'none';
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
    .index-simplesteps {
        .margintop33 {
            margin-top: 33px;
        }
        .wrap-step {
            width: 187px;
        }
        .activeSteps {
            &:hover {
                .wrap-step-icon {
                    border-color: $color-00b240;
                }
                .step-tit {
                    color: $color-00b52d;
                }
                .pop-fivesteps-detail {
                    opacity: 1;
                }
            }
        }
        .wrap-step-icon {
            width: 110px;
            height: 110px;
            border-radius: 100%;
            border: 1px solid #dcdcdc;
        }
        .step-icon {
            width: 48px;
            height: 48px;
            background: url('../assets/img/index/index-fivesteps.png');
            &.disabled-step-icon {
                width: 50px;
                height: 50px;
                background: url('../assets/img/index/index-fivesteps-disabled.png');
            }
        }
        .wrap-steps-arrow {
            height: 110px;
        }
        .icon-steps-arrow {
            width: 28px;
            height: 19px;
            background: url('../assets/img/index/fivestep-arrow.png') center no-repeat;
            background-size: contain;
        }
        .pop-fivesteps-detail {
            width: 303px;
            height: 200px;
            padding: 30px 23px 23px 23px;
            border-radius: 3px;
            z-index: 130;
            left: 160px;
            opacity: 0;
            animation: opacity 0.7s ease;
        }
        .positionLeftPop {
            left: initial;
            right: 160px;
        }
        @-webkit-keyframes opacity{
            0%{
                opacity:0;
            }
            100%{
                opacity:1;
            }
        }
        @keyframes opacity{
            0%{
                opacity:0;
            }
            100%{
                opacity:1;
            }
        }
        .lineheight27 {
            line-height: 27px;
        }
        .paddingtop14 {
            padding-top: 14px;
        }
        .title-steps-list {
            .el-tag {
                height: 36px;
                line-height: 36px;
                background-color: $color-00b240;
            }
        }
    }
</style>



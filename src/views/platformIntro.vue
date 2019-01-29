<template>
    <div class="page-platformintro main_layout">
        <div class="flex-align-justify-column top-header">
            <div class="textAlignCenter color-white top-header-content">
                <p class="fontsize38 bold lineheight36 marginbottom30 textShadow-main">互联网医院开放平台介绍</p>
                <p class="fontsize4 lineheight34 textShadow-sub textAlignCenter">互联网医院开放平台主要目的是为了协助医疗机构（如公立医院、民营医院、诊所等）配置出满足医疗机构业务需求的产品，让用户在不具有开发能力的情况下也可以轻松配置产品</p>
            </div>
        </div>
        <section class="bgcolor-white paddingbottom50">
            <platintroModuleHeader :headerText="'平台优势'"></platintroModuleHeader>
            <el-row type="flex" justify="center" class="fontsize0 color-333">
                <el-col :sm="23" :md="23" :lg="18">
                    <el-row type="flex" justify="center">
                        <el-col :gutter="20" :span="7" class="height-per100">
                            <div class="flex-align-justifybetween-column-index height-per100">
                                <div class="flex-alignstart-justifystart-index height-per50">
                                    <i class="icon-plat platuse"></i>
                                    <p>平台使用云计算、大数据、人工智能等技术连接患者、医生、医院、社区和医疗服务提供方，形成“互联网+医院”一站式解决方案，打造智慧医院健康生态；</p>
                                </div>
                                <div class="flex-align-justifystart-index margintop52 height-per50">
                                    <div class="flex-alignstart-justify">
                                        <i class="icon-plat platlink"></i>
                                        <p>平台是基于医疗基础业务，为医疗机构提供丰富的“互联网+医院”一站式解决方案；</p>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="9" class="height-per100">
                            <div class="width100 flex-align-justify-column">
                                <div class="intro-advan-bg"></div>
                            </div>
                        </el-col>
                        <el-col :span="7" class="height-per100">
                            <div class="flex-align-justifybetween-column-index height-per100">
                                <div class="flex-alignstart-justifystart-index height-per50">
                                    <i class="icon-plat platisv"></i>
                                    <p>平台也支持第三方合作伙伴（ISV）帮助医疗机构快速、低成本的配置出属于自己的互联网医院；</p>
                                </div>
                                <div class="flex-alignstart-justifystart-index margintop52 height-per50">
                                    <i class="icon-plat plat"></i>
                                    <p>互联网医院开放平台依托卓健科技多年的医疗行业业务积累沉淀，建立医疗界一流的开放体系，帮助每一位用户，提升开发效率，降低开发成本与难度；</p>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </section>
        <section class="bgcolor-fafafa paddingbottom50">
            <platintroModuleHeader :headerText="'业务特征'"></platintroModuleHeader>
            <el-row type="flex" justify="center" class="fontsize2 color-333">
                <el-col :sm="23" :md="23" :lg="16">
                    <div class="flex-align-justifybetween height-per100">
                        <div class="textAlignCenter width200 height-per100">
                            <i class="icon-busi busimethod"></i>
                            <p>模式</p>
                            <p class="fontsize-2 color-666 textAlignLeft margintop10">提供医疗行业通用解决方案（通用版预约挂号、全流程支付、信息查询等）；</p>
                        </div>
                        <div class="textAlignCenter width200 height-per100">
                            <i class="icon-busi busitele"></i>
                            <p>技术</p>
                            <p class="fontsize-2 color-666 textAlignLeft margintop10">有着安全的公众号授权机制；</p>
                        </div>
                        <div class="textAlignCenter width200 height-per100">
                            <i class="icon-busi busibusi"></i>
                            <p>业务</p>
                            <p class="fontsize-2 color-666 textAlignLeft margintop10">利用医疗行业的沉淀，完善医院的个性需求；</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </section>
        <section class="bgcolor-white paddingbottom50">
            <platintroModuleHeader :headerText="'面向对象'"></platintroModuleHeader>
            <el-row type="flex" justify="center" class="fontsize0 color-333">
                <el-col :sm="23" :md="23" :lg="16">
                    <el-tabs 
                        :tab-position="'left'"
                        v-model="activeObjectTab" 
                        type="card">
                        <el-tab-pane label="医院信息科" name="infoSection">
                            <p class="fontsize2 color-666 marginbottom23">
                                <span class="color-999 marginright20">医院信息科</span>平台协助发布互联网医院，实现“互联网+医院”
                            </p>
                            <img class="width100" src="../assets/img/bannerPlatformIntro/obj-infosection.png" />
                        </el-tab-pane>
                        <el-tab-pane label="医院宣传科" name="campSection">
                            <p class="fontsize2 color-666 marginbottom23">
                                <span class="color-999 marginright20">医院宣传科</span>平台提供便捷的信息发布宣传途径
                            </p>
                            <img class="width100" src="../assets/img/bannerPlatformIntro/obj-campsection.png" />
                        </el-tab-pane>
                        <el-tab-pane label="区域卫生机构" name="helthInstitu">
                            <p class="fontsize2 color-666 marginbottom23">
                                <span class="color-999 marginright20">区域卫生机构</span>掌控多家医疗机构产品配置结构
                            </p>
                            <img class="width100" src="../assets/img/bannerPlatformIntro/obj-helthInstitu.png" />
                        </el-tab-pane>
                        <el-tab-pane label="ISV服务商" name="ISVService">
                            <p class="fontsize2 color-666 marginbottom23">
                                <span class="color-999 marginright20">ISV服务商</span>通过开放接口开发独立应用，给医疗机构多样化应用体验
                            </p>
                            <img class="width100" src="../assets/img/bannerPlatformIntro/obj-ISVService.png" />
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </section>
        <section class="bgcolor-fafafa paddingbottom50">
            <platintroModuleHeader :headerText="'平台能为用户带来什么'"></platintroModuleHeader>
            <el-row type="flex" justify="center" class="fontsize2 color-333">
                <el-col :sm="23" :md="23" :lg="16">
                    <header class="fontsize0 color-666 lineheight24 textAlignCenter marginbottom50">
                        <p>平台根据医疗机构提供的就医服务与健康管理资源，整合医疗机构对“智慧医院”的需求，如挂号预约、体检预约、一体化医技预约、健康档案、家庭医生等一系列服务，为不同产品制定不同的解决方案，让“智慧医院”更加移动化、智能化、轻便化：</p>
                    </header>
                    <el-row type="flex" :gutter="40" justify="center">
                        <el-col :span="12">
                            <div class="flex-alignstart-justifystart">
                                <i class="icon-func servicenum"></i>
                                <div>
                                    <p>微信服务号</p>
                                    <p>基于微信服务号，提供方便、快捷、全面的掌上医疗服务；</p>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="flex-alignstart-justifystart">
                                <i class="icon-func zhifubao"></i>
                                <div>
                                    <p>支付宝生活号</p>
                                    <p>基于支付宝生活号，提供方便、快捷、全面的掌上医疗服务；</p>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" :gutter="40" justify="center" class="margintop30">
                        <el-col :span="12">
                            <div class="flex-alignstart-justifystart">
                                <i class="icon-func smallfunc"></i>
                                <div>
                                    <p>微信小程序</p>
                                    <p>基于微信小程序，提供专属、高效的一站式医疗服务，将医院装进口袋；</p>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="flex-alignstart-justifystart">
                                <i class="icon-func applyapp"></i>
                                <div>
                                    <p>应用APP</p>
                                    <p>基于APP，实现互联网+医疗的多渠道传播；</p>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </section>
        <section class="bgcolor-white paddingbottom50">
            <platintroModuleHeader :headerText="'解决了用户什么问题'"></platintroModuleHeader>
            <el-row type="flex" justify="center" class="fontsize0 color-333">
                <el-col :sm="23" :md="23" :lg="16">
                    <div class="flex-justify">
                        <el-card 
                            shadow="never"
                            class="wrap-cases width258" 
                            :body-style="{ padding: '0px' }">
                            <img src="../assets/img/bannerPlatformIntro/solve-img1.png" class="image">
                            <div class="content-cases">
                                <div class="fontsize0 color-333 bottom margintop28">用户自主配置产品发布产品，可以无需第三方ISV服务商参与，以最高性价比发布产品；</div>
                            </div>
                        </el-card>
                        <el-card 
                            shadow="never"
                            class="wrap-cases width258" 
                            :body-style="{ padding: '0px' }">
                            <img src="../assets/img/bannerPlatformIntro/solve-img2.png" class="image">
                            <div class="content-cases">
                                <div class="fontsize0 color-333 bottom margintop28">最大限度的解决用户开发能力不足导致的产品无法上线发布使用问题；</div>
                            </div>
                        </el-card>
                        <el-card 
                            shadow="never"
                            class="wrap-cases width258" 
                            :body-style="{ padding: '0px' }">
                            <img src="../assets/img/bannerPlatformIntro/solve-img3.png" class="image">
                            <div class="content-cases">
                                <div class="fontsize0 color-333 bottom margintop28">配置应用到产品的操作，全部采用功能可视化界面，轻松上手减少用户学习成本；</div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
import platintroModuleHeader from '../components/platintroModuleHeader'
export default {
    data() {
        return {
            activeObjectTab: 'infoSection', // 面向对象 当前tab
        }
    },
    components: {
        platintroModuleHeader,
    },
    methods: {
        objectTabClick() {

        },
    },
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
.page-platformintro {
    .width200 {
        width: 200px;
    }
    .width258 {
        width: 258px;
    }
    .marginbottom23 {
        margin-bottom: 23px;
    }
    .margintop52 {
        margin-top: 52px;
    }
    .height-per100 {
        height: 100%;
    }
    .height-per50 {
        height: 50%;
    }
    .top-header{
        height: 250px;
        background: url('../assets/img/bannerPlatformIntro/top-header.png') center no-repeat;
        background-size: cover;
    }
    .top-header-content {
        width: 50%;
    }
    .intro-advan-bg {
        width: 317px;
        height: 209px;
        background: url('../assets/img/bannerPlatformIntro/plat-advan-bg.png') center no-repeat;
        background-size: contain;
    }
    .textShadow-main {
        text-shadow: 0 2px 4px rgba(9,26,67,0.30);
    }
    .textShadow-sub {
        text-shadow: 0 2px 4px rgba(18,44,104,0.30);
    }
    .icon-plat {
        width: 36px;
        min-width: 36px;
        height: 36px;
        margin-right: 16px;
    }
    .platuse {
        background: url('../assets/img/bannerPlatformIntro/plat-advan-use.png') center no-repeat;
        background-size: contain;
    }
    .platlink {
        background: url('../assets/img/bannerPlatformIntro/plat-advan-link.png') center no-repeat;
        background-size: contain;
    }
    .platisv {
        background: url('../assets/img/bannerPlatformIntro/plat-advan-ISV.png') center no-repeat;
        background-size: contain;
    }
    .plat {
        background: url('../assets/img/bannerPlatformIntro/plat-advan-plat.png') center no-repeat;
        background-size: contain;
    }
    .icon-busi {
        width: 78px;
        height: 78px;
        margin-bottom: 14px;
    }
    .busimethod {
        background: url('../assets/img/bannerPlatformIntro/busi-method.png') center no-repeat;
        background-size: contain;
    }
    .busitele {
        background: url('../assets/img/bannerPlatformIntro/busi-tele.png') center no-repeat;
        background-size: contain;
    }
    .busibusi {
        background: url('../assets/img/bannerPlatformIntro/busi-busi.png') center no-repeat;
        background-size: contain;
    }
    .el-tabs--left .el-tabs__header.is-left {
        width: 230px;
        margin-right: 0;
    }
    .el-tabs--left .el-tabs__item.is-left {
        text-align: center;
    }
    .el-tabs--left.el-tabs--card .el-tabs__nav {
        border-color: $color-d8d8d8;
        border-radius: 0;
        border-bottom: none;
        border-left: 1px solid $color-d8d8d8;
    }
    .el-tabs__content {
        height: 282px;
        border: 1px solid $color-d8d8d8;
        padding: 23px 40px 40px 40px;
    }
    .el-tabs__item {
        font-size: 16px;
        color: $color-333;
        height: 70px;
        line-height: 70px;
    }
    .el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active {
        border-left: 2px solid $color-09b52d;
    }
    .icon-func {
        width: 60px;
        min-width: 60px;
        height: 60px;
        margin-right: 18px;
    }
    .servicenum {
        background: url('../assets/img/bannerPlatformIntro/function-servicenum.png') center no-repeat;
        background-size: contain;
    }
    .zhifubao {
        background: url('../assets/img/bannerPlatformIntro/function-zhifubao.png') center no-repeat;
        background-size: contain;
    }
    .smallfunc {
        background: url('../assets/img/bannerPlatformIntro/function-small.png') center no-repeat;
        background-size: contain;
    }
    .applyapp {
        background: url('../assets/img/bannerPlatformIntro/function-app.png') center no-repeat;
        background-size: contain;
    }
    .el-card {
        border-radius: 0;
        border: 1px solid $color-d8d8d8;
    }
    .content-cases {
        padding: 12px 10px 10px 10px;
    }
}
</style>



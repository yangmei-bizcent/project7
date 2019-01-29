<template>
  <div class="page-container page-index">
    <header class="index-header width100 fixed flex-align-justifybetween" :class="indexHeaderChangeTheme==true?'white-theme-header':'transparent-theme-header'">
      <div class="flex-align-justifystart">
        <img style="cursor: pointer;" v-show="!indexHeaderChangeTheme" src="../assets/img/index/rubikt-logo-white.png"
          alt="logo" class="marginleft40 index-logo" @click="openIndex()" />
        <img v-show="indexHeaderChangeTheme" src="../assets/img/index/rubikt-logo-dark.png" alt="logo" class="marginleft40 index-logo" />
        <el-tabs v-model="activeTopMenu" @tab-click="indexHeaderTabClick" class="index-header-tabs">
          <el-tab-pane label="首页" name="index"></el-tab-pane>
          <el-tab-pane label="应用中心" name="service"></el-tab-pane>
          <!-- <el-tab-pane label="开发者中心" name="developer"></el-tab-pane> -->
          <el-tab-pane label="产品体验" name="product"></el-tab-pane>
          <el-tab-pane label="帮助指引" name="help"></el-tab-pane>
          <el-tab-pane label="合作案例" name="example"></el-tab-pane>
          <el-tab-pane label="联系我们" name="contact"></el-tab-pane>
          <el-tab-pane label="关于卓健" name="about"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="layout-header-tool flex-alignstart-justifystart" v-show="isLogined">
        <div class="no_org" style="margin:0;" @click="goConfingFun()" :class="indexHeaderChangeTheme?'theme-green-dropdown':''">
          <div class="headLogo">
            <img src="../assets/img/index/config_icon.png" />
          </div>
          <div class="no_org_text">
            配置台
          </div>
        </div>
        <div class="no_org" :class="indexHeaderChangeTheme?'theme-green-dropdown':''" v-show="orgstate==0 &&(orgname==null||orgname=='')"
          @click="goOrg()">
          <div class="headLogo">
            <img v-if="indexHeaderChangeTheme" src="../assets/img/index/person_icon_green.png" />
            <img v-else src="../assets/img/index/person_icon.png" />
          </div>
          <div class="no_org_text">
            认证机构
          </div>
        </div>
        <div class="no_org" :class="indexHeaderChangeTheme?'theme-green-dropdown':''" v-show="orgstate!=0&&(orgname==null||orgname=='')"
          @click="goSelectOrg()">
          <div class="headLogo">
            <img v-if="indexHeaderChangeTheme" src="../assets/img/index/person_icon_green.png" />
            <img v-else src="../assets/img/index/person_icon.png" />
          </div>
          <div class="no_org_text">
            选择机构
          </div>
        </div>
        <el-dropdown v-show="orgname" @command="handleAccount" style="margin:0px 12px;">
          <div :class="indexHeaderChangeTheme?'theme-green-dropdown':''" class="el-dropdown-link">
            <div class="headLogo">
              <img v-if="indexHeaderChangeTheme" src="../assets/img/index/person_icon_green.png" />
              <img v-else src="../assets/img/index/person_icon.png" />
            </div>
            {{orgname}}
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="accountManage">账户管理</el-dropdown-item> -->
            <el-dropdown-item command="orgAuthInfo" v-show="AuthenticationShow">认证信息</el-dropdown-item>
            <el-dropdown-item command="adminConfig" v-show="JurisdictionShow">权限管理</el-dropdown-item>
            <el-dropdown-item command="HospitalInformationManagement" v-show="hosInfoShow">医院信息管理</el-dropdown-item>
            <el-dropdown-item command="messageService" v-show="msgSeverShow">短信服务</el-dropdown-item>
              <el-dropdown-item command="doctorSeting"  v-show="DepartmentShow">科室医生信息配置</el-dropdown-item>
            <el-dropdown-item command="changeOrg">切换机构</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleAccount" class="person-dropdown">
          <div class="el-dropdown-link" style=" border-radius: 50%;" :class="indexHeaderChangeTheme?'theme-green-dropdown':''">
            <div class="headLogo" style="top:0px;left:0px;width:16px;height:16px; padding:16px;">
              <img v-if="indexHeaderChangeTheme" src="../assets/img/index/rubik_person_icon_green.png" style="width: 16px;  height: 16px;" />
              <img v-else src="../assets/img/index/rubik_person_icon.png" style="width: 16px;  height: 16px;" />
            </div>
            <!-- 切换企业 -->
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="color: #04730E;" disabled>您好,{{userName}}</el-dropdown-item>
            <el-dropdown-item divided command="accountManage">账号管理</el-dropdown-item>
            <el-dropdown-item command="signOut">退出账户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="index-header-tool fontsize0" v-show="!isLogined">
        <!-- <span @click="$router.push('/login')" style="cursor: pointer;">登录</span> -->
        <span @click="goTop" style="cursor: pointer;">登录</span>
        <span class="marginX20">|</span>
        <span type="text" @click="goRester()" style="cursor: pointer;">注册</span>
      </div>
    </header>
    <div class="wrap-carousel relative">
      <div class="wrap-login absolute">
        <!-- 未登录，登录框内容 -->
        <section v-show="!isLogined">
          <el-tabs v-model="loginActiveTab" @tab-click="loginTabClick">
            <el-tab-pane label="账号" name="logintypeAccount">
              <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item label="" prop="phone">
                  <u class="accountLogo"></u>
                  <el-input v-model="loginForm.phone" placeholder="请输入账号" @keyup.enter.native="submitForm('loginForm')"></el-input>
                </el-form-item>
                <el-form-item class="marginbottom34" label="" prop="password">
                  <u class="passwordLogo"></u>
                  <u class="checkPass" @click="changeType()">
                    <img :src="seen ? seenImg : unseenImg" />
                  </u>
                  <el-input v-if="pwdType" class="loginPass" type="password" v-model="loginForm.password" placeholder="请输入您的密码"
                    auto-complete="off" @keyup.enter.native="submitForm('loginForm')"></el-input>
                  <el-input v-else class="loginPass" v-model="loginForm.password" placeholder="请输入您的密码" auto-complete="off"
                    @keyup.enter.native="submitForm('loginForm')"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" class="fontsize2 width100" @click="submitForm('loginForm')" :loading="loadingLogin">登录</el-button>
                </el-form-item>
                <el-form-item>
                  <div class="textAlignRight">
                    <span @click="toForgetPass" class="cursorPointer">忘记密码</span>
                    <span @click="toRegister" class="cursorPointer marginleft20 colorGlass">申请注册</span>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="微信" name="logintypeWeixin">
              <div class="textAlignCenter">
                <div>
                  <i v-show="!helpLoginShow" class="qrcode-wxlogin" id="qr-code"></i>
                  <i v-show="helpLoginShow" class="help-wxlogin"></i>
                </div>
                <p class="fontsize0 color-333 margintop12 marginbottom14">请使用微信扫码</p>
                <p class="fontsize-2 color-666 cursorPointer" :class="helpLoginShow?'color-04730e':''" @mouseover="helpLoginHover"
                  @mouseout="helpLoginBlur">使用帮助</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>
        <!-- 登录后，登录框内容 -->
        <section class="flex-align-justify-column height-per100 textAlignCenter" v-show="isLogined">
          <p class="fontsize4 color-333 marginbottom30">欢迎您</p>
          <div>
            <i class="photo-userlogined"></i>
          </div>
          <p class="fontsize2 color-333 margintop20 marginbottom40">{{userName}}</p>
          <el-button type="success" class="width100 fontsize2" @click="enterPlatform">进入开放平台</el-button>
          <p class="fontsize-2 color-999 margintop10">点击进入配置专属互联网医院</p>
        </section>
      </div>
      <el-carousel height="500px" class="index-banner">
        <el-carousel-item v-for="(item, index) in banners" :key="index" class="cursorPointer textAlignCenter">
          <div class="flex-align-justify-column">
            <img :src="item.src" :alt="item.name" @click="$router.push(item.introPath)" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row type="flex" justify="center" class="fontsize0 color-333 height267">
      <el-col :sm="24" :md="24" :lg="19">
        <div class="flex-alignstart-justify">
          <div class="flex-alignstart-justify-column-index width300 height266 cursorPointer relative" @mouseover="platformHover('wxservice')"
            @mouseout="platformBlur('wxservice')">
            <div :class="popshow_wxservice?'platTitFocus':''" class="flex-align fontsize2 paddingX27 smooth-icon flex-shrink1">
              <i class="index-platform-type wxservice"></i>微信服务号
            </div>
            <transition name="slide">
              <div v-show="popshow_wxservice">
                <div class="pop-platform-detail color-white absolute">
                  <p class="lineheight24 moreLineEllipsis5">在机构的微信服务号上，对服务号的自定义菜单栏进行可视化配置，将功能更直接地搭载在菜单栏上，使机构服务号的关注者有更多就医上的体验。</p>
                </div>
                <i class="icon-pop-arrow absolute"></i>
              </div>
            </transition>
            <p :class="popshow_wxservice?'immediately-hide':''" class="margintop20 lineheight24 paddingX27 moreLineEllipsis4 smooth-content">在机构的微信服务号上，对服务号的自定义菜单栏进行可视化配置，将功能更直接地搭载在菜单栏上，使机构服务号的关注者有更多就医上的体验。</p>
            <!-- <p class="paddingX27 lineheight26 margintop20">&nbsp;</p> -->
          </div>
          <div class="flex-alignstart-justify height267 paddingtop90">
            <div class="line-column-divide"></div>
          </div>
          <div class="flex-alignstart-justify-column-index width300 height266 opacity4 relative">
            <div :class="popshow_wxsmall?'platTitFocus':''" class="flex-align fontsize2 paddingX27 smooth-icon">
              <i class="index-platform-type wxsmall"></i>微信小程序
            </div>
            <p :class="popshow_wxsmall?'immediately-hide':''" class="margintop20 lineheight24 paddingX27 moreLineEllipsis4 smooth-content">在机构的微信小程序上，对小程序微官网进行可视化配置，将功能更直接地搭载在微官网菜单栏上，使机构小程序的关注者有更多就医上的体验。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p class="absolute bottom15 paddingX27 lineheight26 margintop20">敬请期待</p>
          </div>
          <!-- <div class="flex-alignstart-justify-column-index width300 height266 cursorPointer relative" @mouseover="platformHover('wxsmall')"
            @mouseout="platformBlur('wxsmall')">
            <div :class="popshow_wxsmall?'platTitFocus':''" class="flex-align fontsize2 paddingX27 smooth-icon">
              <i class="index-platform-type wxsmall"></i>微信小程序
            </div>
            <transition name="slide">
              <div v-show="popshow_wxsmall">
                <div class="flex-alignstart-justifybetween-column pop-platform-detail color-white absolute">
                  <p class="lineheight24 moreLineEllipsis4">在机构的微信小程序上，对小程序微官网进行可视化配置，将功能更直接地搭载在微官网菜单栏上，使机构小程序的关注者有更多就医上的体验。
                  </p>
                  <p class="lineheight26 opacity6">敬请期待</p>
                </div>
                <i class="icon-pop-arrow absolute"></i>
              </div>
            </transition>
            <p :class="popshow_wxsmall?'immediately-hide':''" class="margintop20 lineheight24 paddingX27 smooth-content">在机构的微信小程序上，对小程序微官网进行可视化配置，将功能更直接地搭载在微官网菜单栏上，使机构小程序的关注者有更多就医上的体验。
            </p>
          </div> -->
          <div class="flex-alignstart-justify height267 paddingtop90">
            <div class="line-column-divide"></div>
          </div>
          <div class="flex-alignstart-justify-column-index width300 height266 opacity4 relative">
            <div :class="popshow_commonapp?'platTitFocus':''" class="flex-align fontsize2 paddingX27 smooth-icon">
              <i class="index-platform-type commonapp"></i>APP
            </div>
            <p :class="popshow_commonapp?'immediately-hide':''" class="margintop20 lineheight24 paddingX27 moreLineEllipsis4 smooth-content">为机构量身定做APP，对APP页面进行可视化配置，将机构开通的应用以可视化方式让用户轻松配置到APP上，并且协助指引机构发布上线APP。</p>
            <p class="absolute bottom15 paddingX27 lineheight26 margintop20">敬请期待</p>
          </div>
          <!-- <div class="flex-alignstart-justify-column-index width300 height266 cursorPointer relative" @mouseover="platformHover('commonapp')"
            @mouseout="platformBlur('commonapp')">
            <div :class="popshow_commonapp?'platTitFocus':''" class="flex-align fontsize2 paddingX27 smooth-icon">
              <i class="index-platform-type commonapp"></i>APP
            </div>
            <transition name="slide">
              <div v-show="popshow_commonapp">
                <div class="flex-alignstart-justifybetween-column pop-platform-detail color-white absolute">
                  <p class="lineheight24 moreLineEllipsis4">为机构量身定做APP，对APP页面进行可视化配置，将机构开通的应用以可视化方式让用户轻松配置到APP上，并且协助指引机构发布上线APP。</p>
                  <p class="lineheight26 opacity6">敬请期待</p>
                </div>
                <i class="icon-pop-arrow absolute"></i>
              </div>
            </transition>
            <p :class="popshow_commonapp?'immediately-hide':''" class="margintop20 lineheight24 paddingX27 smooth-content">为机构量身定做APP，对APP页面进行可视化配置，将机构开通的应用以可视化方式让用户轻松配置到APP上，并且协助指引机构发布上线APP。</p>
          </div> -->
          <div class="flex-alignstart-justify height267 paddingtop90">
            <div class="line-column-divide"></div>
          </div>
          <div class="flex-alignstart-justify-column-index width300 height266 opacity4 relative">
            <div :class="popshow_zhifubao?'platTitFocus':''" class="flex-align fontsize2 paddingX27 smooth-icon">
              <i class="index-platform-type zhifubao"></i>支付宝生活号
            </div>
            <p :class="popshow_zhifubao?'immediately-hide':''" class="margintop20 lineheight24 paddingX27 moreLineEllipsis4 smooth-content">在机构的支付宝生活号上，对生活号的自定义菜单栏进行可视化配置，将功能更直接地搭载在菜单栏上，使机构生活号的关注者有更多就医上的体验。</p>
            <p class="absolute bottom15 paddingX27 lineheight26 margintop20">敬请期待</p>
          </div>
          <!-- <div class="flex-alignstart-justify-column-index width300 height266 cursorPointer relative" @mouseover="platformHover('zhifubao')"
            @mouseout="platformBlur('zhifubao')">
            <div :class="popshow_zhifubao?'platTitFocus':''" class="flex-align fontsize2 paddingX27 smooth-icon">
              <i class="index-platform-type zhifubao"></i>支付宝生活号
            </div>
            <transition name="slide">
              <div v-show="popshow_zhifubao">
                <div class="flex-alignstart-justifybetween-column pop-platform-detail color-white absolute">
                  <p class="lineheight24 moreLineEllipsis4">在机构的支付宝生活号上，对生活号的自定义菜单栏进行可视化配置，将功能更直接地搭载在菜单栏上，使机构生活号的关注者有更多就医上的体验。</p>
                  <p class="lineheight26 opacity6">敬请期待</p>
                </div>
                <i class="icon-pop-arrow absolute"></i>
              </div>
            </transition>
            <p :class="popshow_zhifubao?'immediately-hide':''" class="margintop20 lineheight24 paddingX27 smooth-content">在机构的支付宝生活号上，对生活号的自定义菜单栏进行可视化配置，将功能更直接地搭载在菜单栏上，使机构生活号的关注者有更多就医上的体验。</p>
          </div> -->
        </div>
      </el-col>
    </el-row>
    <!-- 平台优势 -->
    <section class="bgcolor-white">
      <section class="relative clear">
        <div class="absolute index-circle-bg widthheight315"></div>
        <indexModuleHeader :headerText="'平台优势'"></indexModuleHeader>
        <el-row type="flex" justify="center" class="fontsize2 color-333 margintop30">
          <el-col :sm="24" :md="24" :lg="18">
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange safeprotect"></div>
                  <p class="margintop25">
                    <span class="fontsize6 color-04730e bold">200+</span>医院使用
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange manyproduct"></div>
                  <p class="margintop25">
                    <span class="fontsize6 color-04730e bold">7年</span>行业打磨
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange visualconfig"></div>
                  <p class="margintop25">
                    <span class="fontsize6 color-04730e bold">7*12h</span>在线客服
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange appliInteg"></div>
                  <p class="margintop25">
                    <span class="fontsize6 color-04730e bold">5分钟</span>生成产品
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" class="margintop66">
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange autodeployment"></div>
                  <p class="margintop25">
                    每周功能<span class="fontsize6 color-04730e bold">持续</span>上架
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange profmedical"></div>
                  <p class="margintop25">
                    医疗+互联网<span class="fontsize6 color-04730e bold">必备</span>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange platformarchit"></div>
                  <p class="margintop25">
                    医院<span class="fontsize6 color-04730e bold">专属</span>的应用
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="flex-align-justify-column wrap-advange">
                  <div class="wrap-img-advange goodcustomerserv"></div>
                  <p class="margintop25">
                    <span class="fontsize6 color-04730e bold">可视化</span>操作界面
                  </p>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </section>
      <!-- 体验专区 -->
      <section class="relative clear">
        <div class="absolute index-circle-bg widthheight148"></div>
        <indexModuleHeader :headerText="'体验专区'"></indexModuleHeader>
        <div class="absolute light-green-bg"></div>
        <el-row type="flex" justify="center" class="margintop50 paddingbottom60">
          <el-col :span="12">
            <section class="relative marginright60">
              <div class="experience-left-bg width100 borderRadius10 absolute"></div>
              <div class="phone-bg absolute">
                <div class="wrap-phone-innerimg">
                  <img :src="activeExpericeImgurl" class="width100" alt="体验专区" />
                </div>
              </div>
            </section>
          </el-col>
          <el-col :span="12">
            <div>
              <el-tabs v-model="experienceType" class="index-exper-tabs" @tab-click="experienceTabClick">
                <el-tab-pane v-for="(item, index) in experienceData" :key="index" :label="item.type" :name="item.name">
                  <indexExperienceList v-if="item.content.length>0" :experienceList="item.content" :tabIndex="index"
                    @expericeHover="expericeHover"></indexExperienceList>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </section>
      <!-- 使用流程 -->
      <section class="relative clear">
        <div class="absolute index-circle-bg widthheight259"></div>
        <div class="absolute index-circle-bg widthheight166"></div>
        <indexModuleHeader :headerText="'使用流程'"></indexModuleHeader>
        <el-row type="flex" justify="center" class="fontsize2 color-333 margintop50 marginbottom108">
          <el-col :sm="24" :md="24" :lg="18">
            <div class="flex-alignstart-justify">
              <div class="flex-align-justify-column title-steps-list marginright20">
                <el-tag class="fontsize4 color-white borderRadius100 paddingX30">医院</el-tag>
              </div>
              <indexSimplesteps v-if="simplestepsHosData.length>0" :simplestepsData="simplestepsHosData"></indexSimplesteps>
            </div>
            <div class="flex-alignstart-justify margintop95">
              <div class="flex-align-justify-column title-steps-list marginright20">
                <el-tag class="fontsize4 color-white borderRadius100 paddingX30 disabledTag">
                  开发者
                </el-tag>
                <span class="fontsize-2 color-999 margintop6">敬请期待</span>
              </div>
              <indexSimplesteps :disableSteps="disableSteps" v-if="simplestepsDevlopData.length>0" :simplestepsData="simplestepsDevlopData"></indexSimplesteps>
            </div>
          </el-col>
        </el-row>
      </section>
      <!-- 经典案例 -->
      <section class="relative">
        <indexModuleHeader :headerText="'经典案例'" :theme="'theme-white'" class="relative zIndex110" :hasMore="true"
          @toMore="toMore">
        </indexModuleHeader>
        <div class="absolute width100 dark-blue-bg zIndex100"></div>
        <el-row type="flex" justify="center" class="fontsize0 lineheight20 margintop50 zIndex110">
          <el-col :sm="24" :md="24" :lg="18">
            <div class="flex-justify">
              <div v-for="(item, index) in classicCaseData" :key="index" @mouseenter="indexCaseHover('case'+index)"
                @mouseleave="indexCaseBlur('case'+index)" class="relative">
                <div class="absolute color-white width100 fontsize0 borderRadius4 displayNone wrap-casedesc" :class="'case'+index">
                  <div class="relative width100">
                    <div class="case-desc">{{ item.desc }}</div>
                    <div class="case-tool absolute">
                      <div @click="toMore(index)" class="fontsize0 color-white textAlignCenter inlineBlock cursorPointer likebtn-transparent">了解更多</div>
                    </div>
                  </div>
                </div>
                <el-card class="wrap-index-cases bordernone cursorPointer" :body-style="{ padding: '0px' }">
                  <img :src="item.imgSrc" class="image">
                  <div class="flex-align-justify-column-index content-index-cases">
                    <div class="inlineBlock textAlignCenter">
                      <div class="fontsize6 color-black flex-align-justify">
                        <span>{{ item.caseName }}</span>
                        <el-tag class="tag-case fontsize-2 bgcolor-transparent borderRadius2 textAlignCenter">{{
                          item.platformType }}</el-tag>
                      </div>
                      <p class="color-999 margintop7">{{ item.hospital }}</p>
                    </div>
                    <div class="color-666 bottom margintop28">{{ item.sipmleDesc }}</div>
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>
      <!-- 合作伙伴 -->
      <section class="paddingbottom90">
        <indexModuleHeader :headerText="'合作伙伴'"></indexModuleHeader>
        <el-row type="flex" justify="center" class="fontsize0 lineheight20 margintop50 zIndex110">
          <el-col :sm="24" :md="24" :lg="18">
            <div class="flex-align-justifybetween">
              <i v-for="(item, index) in patnerData" :key="index" @mouseover="iconPatnerHover(index)" @mouseout="iconPatnerBlur(index)"
                class="cursorPointer icon-index-patner" :style="'background:url('+item.iconurl+') no-repeat;background-position: 0 0;'"></i>
            </div>
          </el-col>
        </el-row>
      </section>
    </section>
    <indexFixedRightTool></indexFixedRightTool>
    <!-- FOOTER -->
    <indexFooter></indexFooter>
  </div>
</template>
<script>
  //密码眼睛
  import seenImg from '@/assets/img/index/passLookIcon.png';
  import unseenImg from '@/assets/img/index/passHiddenIcon.png';
  // banner
  import banner1 from '@/assets/img/index/banner1.png';
  import banner2 from '@/assets/img/index/banner2.png';
  import banner3 from '@/assets/img/index/banner3.png';
  //体验专区图片
  import expercImg1_1 from '@/assets/img/index/exper-microweb-hosintro.png';
  import expercImg1_2 from '@/assets/img/index/exper-microweb-secintro.png';
  import expercImg1_3 from '@/assets/img/index/exper-microweb-doctorintro.png';
  import expercImg1_4 from '@/assets/img/index/exper-microweb-gps.png';
  import expercImg2_1 from '@/assets/img/index/exper-topatient-appoint.png';
  import expercImg2_2 from '@/assets/img/index/exper-topatient-queue.png';
  import expercImg2_3 from '@/assets/img/index/exper-topatient-pay.png';
  import expercImg2_4 from '@/assets/img/index/exper-topatient-checkresult.png';
  import expercImg3_1 from '@/assets/img/index/exper-remind-vaccine.png';
  import expercImg3_2 from '@/assets/img/index/exper-remind-topatient.png';
  import expercImg3_3 from '@/assets/img/index/exper-remind-pay.png';
  import expercImg3_4 from '@/assets/img/index/exper-remind-stoppatient.png';
  import expercImg4_1 from '@/assets/img/index/exper-feture-qrcode.png';
  import expercImg4_2 from '@/assets/img/index/exper-feture-card.png';
  import expercImg4_3 from '@/assets/img/index/exper-feture-checkself.png';
  import expercImg4_4 from '@/assets/img/index/exper-feture-imgtext.png';
  //简单五步
  //医院
  import hosPopBg1 from '@/assets/img/index/index-fivestep-hos1.png';
  import hosPopBg2 from '@/assets/img/index/index-fivestep-hos2.png';
  import hosPopBg3 from '@/assets/img/index/index-fivestep-hos3.png';
  import hosPopBg4 from '@/assets/img/index/index-fivestep-hos4.png';
  import hosPopBg5 from '@/assets/img/index/index-fivestep-hos5.png';
  //开发者
  import devPopBg1 from '@/assets/img/index/index-fivestep-devlop1.png';
  import devPopBg2 from '@/assets/img/index/index-fivestep-devlop2.png';
  import devPopBg3 from '@/assets/img/index/index-fivestep-devlop3.png';
  import devPopBg4 from '@/assets/img/index/index-fivestep-devlop4.png';
  import devPopBg5 from '@/assets/img/index/index-fivestep-devlop5.png';
  //经典案例
  import caseImg1 from '@/assets/img/index/index-case1.png';
  import caseImg2 from '@/assets/img/index/index-case2.png';
  import caseImg3 from '@/assets/img/index/index-case3.png';
  //合作伙伴
  import patnerTencentImg from '@/assets/img/index/index-patner-tencent.png';
  import patnerWxopenImg from '@/assets/img/index/index-patner-wxopen.png';
  import patnerWxpayImg from '@/assets/img/index/index-patner-wxpay.png';
  import patnerZhifubaoImg from '@/assets/img/index/index-patner-zhifubao.png';
  import patnerYinlianImg from '@/assets/img/index/index-patner-yinlian.png';
  
  import {
    exportLocalUrl,
    exportAppUrl,
  } from "@/service/baseuri";
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'
  import {
    axiospost,
    axiosConfig
  } from '@/service/config.js'
  // import { apiurl } from '@/service/api.js';
  import axios from 'axios';
  import {
    apiurl
  } from '@/service/api.js';
  import {
    Loading
  } from 'element-ui';
  import indexModuleHeader from '../components/indexModuleHeader'
  import indexExperienceList from '../components/indexExperienceList'
  import indexSimplesteps from '../components/indexSimplesteps'
  import indexFooter from '../components/indexFooter'
  import indexFixedRightTool from '../components/indexFixedRightTool'
  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else if (!/^((1[3-9][0-9])+\d{8})$/.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        }
        return callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          var reg = /[\u4e00-\u9fa5]/;
          if (reg.test(value)) {
            callback(new Error('密码可输入字母/数字/大写字母/特殊符号'));
          }
        }
        return callback();
      };
      return {
        // START login
        loginActiveTab: 'logintypeAccount', // 登录类型：账号、微信
        isLogined: false, //是否已登录
        helpLoginShow: false, // 是否显示微信扫码登录 使用帮助
        pwdType: true,
        seen: '',
        seenImg: seenImg, //看得见密码
        unseenImg: unseenImg, //看不见
        disableSteps: true, //简单五步是否禁用
        loginForm: {
          phone: '',
          password: '',
          remember: false,
        },
        rules: {
          phone: [
            // {required: true, message: '请输入手机号码', trigger: 'blur'},
            {
              min: 11,
              max: 11,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            },
            {
              validator: validatePhone,
              trigger: 'blur'
            }
          ],
          password: [{
              min: 6,
              max: 16,
              message: '密码长度为6-16位',
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ]
        },
        // END login
        indexHeaderChangeTheme: false, //页面滚动时，header更换主题
        activeTopMenu: 'index', // 
        popshow_commonapp: false,
        popshow_wxservice: false,
        popshow_wxsmall: false,
        popshow_zhifubao: false,
        activeExpericeImgurl: expercImg1_1, // 体验专区 左侧当前图片地址
        experienceType: '', // 体验专区tab值
        banners: [{
            name: 'banner1',
            src: banner1,
            introPath: '/platformIntro'
          },
          {
            name: 'banner2',
            src: banner2,
            introPath: ''
          },
          {
            name: 'banner3',
            src: banner3,
            introPath: ''
          },
        ],
        experienceData: [{
            type: '介绍指引',
            content: [{
                name: 'hosIntro',
                title: '医院介绍',
                desc: '展示医院的详细信息，让患者更加了解医院。',
                url: 'http://res.zwjk.com/h5-test/open-web/pre/#/corporateCom/corporateComDetail?cooperationCaseId=58d49472-64ed-43a6-aeb2-a1b4d33515a0',
                imgUrl: expercImg1_1
              },
              {
                name: 'sectionIntro',
                title: '科室介绍',
                desc: '便捷查看科室列表及科室信息，增加对科室的熟悉度。',
                url: 'http://res.zwjk.com/h5-test/open-web/pre/#/corporateCom/corporateComDetail?cooperationCaseId=c6478909-4eca-4344-adc6-f0d736248c6e',
                imgUrl: expercImg1_2
              },
              {
                name: 'doctorIntro',
                title: '医生介绍',
                desc: '随时随地可以查看医生信息，提升对医生的亲切感。',
                url: 'http://res.zwjk.com/h5-test/open-web/pre/#/corporateCom/corporateComDetail?cooperationCaseId=9e7c8f59-c9b1-4297-a001-27d185edadae',
                imgUrl: expercImg1_3
              },
              {
                name: 'hosNavig',
                title: '来院导航',
                desc: '协助指引来往医院的路线，查看医院周围设施。',
                imgUrl: expercImg1_4
              }
            ],
          },
          {
            type: '就诊相关',
            content: [{
                name: 'hosIntro',
                title: '预约挂号',
                desc: '掌上预约挂号，患者免排队，医院少压力。',
                imgUrl: expercImg2_1
              },
              {
                name: 'hosIntro',
                title: '排队就诊',
                desc: '随时掌控门诊排队、检查排队，释放候诊时间',
                imgUrl: expercImg2_2
              },
              {
                name: 'hosIntro',
                title: '门诊缴费',
                desc: '门诊费用缴纳，移动支付、医保支付，多样化掌上缴费。',
                imgUrl: expercImg2_3
              },
              {
                name: 'hosIntro',
                title: '查检验单',
                desc: '掌上查询检验报告单，第一时间得知报告内容。',
                imgUrl: expercImg2_4
              },
            ],
          },
          {
            type: '业务提醒',
            content: [{
                name: 'hosIntro',
                title: '儿童疫苗提醒',
                desc: '按时为用户推送注册儿童疫苗提醒。',
                imgUrl: expercImg3_1
              },
              {
                name: 'hosIntro',
                title: '就诊提醒',
                desc: '预约挂号后，智能提醒用户及时来院就诊。',
                imgUrl: expercImg3_2
              },
              {
                name: 'hosIntro',
                title: '缴费提醒',
                desc: '自动查询缴费事项，提醒用户缴费，积累信用。',
                imgUrl: expercImg3_3
              },
              {
                name: 'hosIntro',
                title: '停诊提醒',
                desc: '医生停诊后，及时提醒用户，便于重新预约。',
                imgUrl: expercImg3_4
              },
            ],
          },
          {
            type: '特色服务',
            content: [{
              name: 'hosIntro',
              title: '扫码支付',
              desc: '支持支付宝、微信扫码支付，便捷惠民。',
              imgUrl: expercImg4_1
            }, {
              name: 'hosIntro',
              title: '就诊卡卡包',
              desc: '微信就诊卡添加卡包，实现实体卡电子化。',
              imgUrl: expercImg4_2
            }, {
              name: 'hosIntro',
              title: '症状自查',
              desc: '通过自身症状部位症状查询，了解症状对应科室。',
              imgUrl: expercImg4_3
            }, {
              name: 'hosIntro',
              title: '图文咨询',
              desc: '提供医生患者全新交流方式，方便咨询与沟通病情。',
              imgUrl: expercImg4_4
            }, ],
          },
        ],
        simplestepsHosData: [{
          name: 'hos1',
          iconBgPosition: '0 0',
          popBackground: hosPopBg1,
          title: '入驻认证',
          desc: '在主体账号下，医疗机构入驻需要认证，认证需要提供机构组织代码证和医疗机构执业许可证。',
        }, {
          name: 'hos2',
          iconBgPosition: '-49px 0',
          popBackground: hosPopBg2,
          title: '选择患者版/医生版',
          desc: '医疗机构选择合适的产品类型（服务号、小程序、APP、生活号），用于搭载就医相关功能。',
        }, {
          name: 'hos3',
          iconBgPosition: '-98px 0',
          popBackground: hosPopBg3,
          title: '开通应用',
          desc: '平台提供众多优质应用，提供图文咨询、微官网、预约挂号、查报告单、智能导诊等一系列应用。',
        }, {
          name: 'hos4',
          iconBgPosition: '-147px 0',
          popBackground: hosPopBg4,
          title: '配置应用',
          desc: '配置应用到产品的操作，全部采用功能可视化界面，轻松操作产品应用。',
        }, {
          name: 'hos5',
          iconBgPosition: '-196px 0',
          popBackground: hosPopBg5,
          title: '发布产品',
          desc: '上线产品，落实“互联网+医院”理念，以线上产品功能优势为医疗机构引流患者用户分担线下压力。',
        }, ],
        simplestepsDevlopData: [{
          name: 'devlop1',
          iconBgPosition: '-20px -20px',
          popBackground: devPopBg1,
          title: '入驻认证',
          desc: '在主体账号下，医疗机构入驻需要认证，认证需要提供机构组织代码证和医疗机构执业许可证。',
        }, {
          name: 'devlop2',
          iconBgPosition: '-71px -20px',
          popBackground: devPopBg2,
          title: '选择患者版/医生版',
          desc: '医疗机构选择合适的产品类型（服务号、小程序、APP、生活号），用于搭载就医相关功能。',
        }, {
          name: 'devlop3',
          iconBgPosition: '-122px -20px',
          popBackground: devPopBg3,
          title: '开发服务',
          desc: '入驻认证需要的文字有这么多的内容要怎么度过人认为问二位二恶二恶埃方的身份和水淀粉苏打人认为问二位二恶二恶埃方的身份和水',
        }, {
          name: 'devlop4',
          iconBgPosition: '-173px -20px',
          popBackground: devPopBg4,
          title: '上传审核',
          desc: '入驻认证需要的文字有这么多的内容要怎么度过人认为问二位二恶二恶埃方的身份和水淀粉苏打人认为问二位二恶二恶埃方的身份和水',
        }, {
          name: 'devlop5',
          iconBgPosition: '-224px -20px',
          popBackground: devPopBg5,
          title: '发布产品',
          desc: '入驻认证需要的文字有这么多的内容要怎么度过人认为问二位二恶二恶埃方的身份和水淀粉苏打人认为问二位二恶二恶埃方的身份和水',
        }, ],
        // 经典案例
        classicCaseData: [{
          caseName: '北大口腔',
          hospital: '北大口腔医院',
          platformType: 'APP',
          imgSrc: caseImg1,
          sipmleDesc: '“北大口腔医院”是北京大学口腔医院总院以移动互联网、云计算，物联网、大数据等特点“智慧化”信息革命。',
          desc: '“北大口腔医院”是北京大学口腔医院总院以移动互联网、云计算，物联网、大数据等特点“智慧化”信息革命。“北大口腔医院”旨在医院现有服务基础上，通过预约挂号、取报告单、科室医生、智能分诊、医院导航、健康资讯、健康百科等多种简化患者就医流程功能，减少就医等候时间，改善患者就医体验，提高医疗服务质量。',
          url: `${exportLocalUrl}/corporateCom/corporateComDetail?cooperationCaseId=58d49472-64ed-43a6-aeb2-a1b4d33515a0`
        }, {
          caseName: '掌上浙一',
          hospital: '浙江大学医学院附属第一医院',
          platformType: 'APP',
          imgSrc: caseImg2,
          sipmleDesc: '“掌上浙一”是浙江大学医学院附属第一医院（浙大一院）为缓解传统就医时间繁杂开发的手机应用。',
          desc: '“掌上浙一”是浙江大学医学院附属第一医院（浙大一院）为缓解传统就医时间繁杂开发的手机应用。依托医院信息化建设，将服务的触角延伸到院内、院外与患者相关的几乎每一个角落。平台服务涵盖手机挂号、排队叫号、报告单查询、智能导诊、专家排班、医院导航、出院随访等功能。我们旨在现有服务基础上简化就医流程，减少等候时间、方便患者就医、改善患者就医体验、提高患者就医满意度。',
          url: `${exportLocalUrl}/corporateCom/corporateComDetail?cooperationCaseId=c6478909-4eca-4344-adc6-f0d736248c6e`
        }, {
          caseName: '健康恩泽',
          hospital: '台州恩泽集团',
          platformType: 'APP',
          imgSrc: caseImg3,
          sipmleDesc: '“健康恩泽”是台州恩泽集团以移动互联网、云计算、物联网、大数据等特点“智慧化”信息革命。',
          desc: '“健康恩泽”是台州恩泽集团以移动互联网、云计算、物联网、大数据等特点“智慧化”信息革命。“健康恩泽”旨在医院现有服务基础上，通过预约挂号、取报告单、科室医生、智能分诊、医院导航、健康资讯、健康百科、费用查询等多种简化患者就医流程功能，减少就医等候时间，改善患者就医体验，提高医疗服务质量。',
          url: `${exportLocalUrl}/corporateCom/corporateComDetail?cooperationCaseId=9e7c8f59-c9b1-4297-a001-27d185edadae`
        }, ],
        // 合作伙伴
        patnerData: [{
            iconurl: patnerTencentImg
          },
          {
            iconurl: patnerWxopenImg
          },
          {
            iconurl: patnerWxpayImg
          },
          // {
          //   iconurl: patnerZhifubaoImg
          // },
          // {
          //   iconurl: patnerYinlianImg
          // },
        ],
        hosInfoShow: false,
        AuthenticationShow: false,
        JurisdictionShow: false,
        loadingLogin: false,
        msgSeverShow:false,
        DepartmentShow:false
      }
    },
    components: {
      indexModuleHeader,
      indexExperienceList,
      indexSimplesteps,
      indexFooter,
      indexFixedRightTool,
    },
    computed: {
      ...mapState({
        identityInfo: status => true,
        currentDateInfo: state => state.user.currentDateInfo,
      }),
      // 从vuex状态管理中 直接获取token
      ...mapGetters({
        token: 'token',
        phone: 'phone',
        userName: 'userName',
        orgname: 'orgname',
        orgstate: 'orgstate',
        chooseOrgInfo: 'chooseOrgInfo',
        moduleper:'moduleper'
      })
    },
    async mounted() {
      this.Jurisdiction();
      window.scrollTo(0,0);
      // //console.log(this.$router.history.current.name)
      if (sessionStorage.getItem('token') != null) {
        this.isLogined = true;
      } else {
        this.isLogined = false;
      }
      //console.log(this.orgname); // 获取token，获取方式this.token
      window.addEventListener('scroll', this.handlePageScroll);
      let phone = this.$route.query.phone;
      //console.log('exportLocalUrl', exportLocalUrl)
      let obj = new WxLogin({
        id: "qr-code",
        appid: "wx312a55fd0dc9cebd",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent(exportLocalUrl + "/setCountLoading"),
        state: phone,
        style: "black",
        href: "data:text/css;base64,Ym9keSB7bWFyZ2luOiAwfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE0MHB4OyBoZWlnaHQ6IDE0MHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAucGFuZWxDb250ZW50IHtwb3NpdGlvbjogcmVsYXRpdmU7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19icm93c2VyIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyB7cG9zaXRpb246IGFic29sdXRlO3RvcDogMDtsZWZ0OiAwO3BhZGRpbmc6IDUycHg7YmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO30NCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyBpIHttYXJnaW4tcmlnaHQ6IDA7fQ0KLmltcG93ZXJCb3ggLnN0YXR1c19zdWNjIC5zdGF0dXNfdHh0IHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5xcmNvZGUge21hcmdpbi10b3A6IDB9DQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmV9DQouaW1wb3dlckJveCAuc3RhdHVzIHt0ZXh0LWFsaWduOiBjZW50ZXI7fQ=="
      })
    },
    methods: {
       openDepartDoctorConfig() {
        window.open(`${exportAppUrl}/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
        // window.open(`http://localhost:8080/#/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&phone=${this.phone}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}`);
// 报告单查询配置入口
      },
      banIECache (url, connector = '&') {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          return url + connector + `t=${ new Date().getTime() }`;
        } else {
          return url;
        }
      },
      goTop(){
        let distance = document.documentElement.scrollTop || document.body.scrollTop; 
                if(distance > 0){
                    window.scrollTo(0,0);
                }
                else{
                 this.$message("已回到顶部，请在登录框内登录")
                }
      },
      ...mapActions(['set_orgname', 'set_orgstate', 'user_name', 'set_phone', 'set_moduleper']),
      // 更多案例
      toMore(index) {
        // this.$router.push('/corporateCom/corporateCom');
        console.log('111', index);
        let caseId = '';
        switch(index) {
          case 0: 
            caseId = '58d49472-64ed-43a6-aeb2-a1b4d33515a0';
            break;
          case 1: 
            caseId = 'c6478909-4eca-4344-adc6-f0d736248c6e';
            break;
          case 2: 
            caseId = '9e7c8f59-c9b1-4297-a001-27d185edadae';
            break;
        }
        this.$router.push({
          path: '/corporateCom/corporateComDetail',
          query: {
            cooperationCaseId: caseId
          }
        });
      },
      Jurisdiction() {
        // //console.log('this.moduleper',this.moduleper)
        //权限控制
        this.InitializationFun();
        if ((this.moduleper != undefined || this.moduleper != null) && this.moduleper.length > 0) {
          this.moduleper.map(item => {
            item.children.map(item2 => {
              if (item2.feature_id == 351051) { //"医院信息配置"
                this.hosInfoShow = true;
              } else if (item2.feature_id == 351251) { //"认证信息"
                this.AuthenticationShow = true;
              } else if (item2.feature_id == 351281) { //"权限管理"
                this.JurisdictionShow = true;
              }else if(item2.feature_id==351321){//"短信服务页面"
                this.msgSeverShow=true;
              }else if(item2.feature_id==351061){//"科室医生信息配置"
                this.DepartmentShow=true;
              }

            })
          })
        }
      },
      InitializationFun() { //初始化控制数据
        this.hosInfoShow = false;
        this.AuthenticationShow = false;
        this.JurisdictionShow = false;
        this.msgSeverShow=false;
      },
      goRester() { //打开注册页面
        window.open('#/register');
      },
      openIndex() { //打开首页
        window.open('#/');
      },
      goConfingFun() { //配置台路由
        this.$router.push({
          name: 'visualizationConfiguration'
        });
      },
      goSelectOrg() { //选择机构
        this.$router.push('/chooseOrganiz/false');
      },
      goOrg() { //没有机构的选择机构
        this.$router.push('/authentication/authenStepOne');
      },
      handRouter(command) { //配置后台切换
        let arrCommand = ['seting'];
        let arrRouter = ['visualizationConfiguration'];
        arrCommand.forEach((val, index) => {
          if (command == val) {
            this.$router.push({
              name: arrRouter[index]
            });
          }
        })
      },
      handleAccount(command) {
        switch (command) {
          case "accountManage":
            this.accountManage();
            break;
          case "orgAuthInfo":
            this.orgAuthInfo();
            break;
          case "adminConfig":
            this.adminConfig();
            break;
          case "HospitalInformationManagement":
            this.HospitalInformationManagement();
            break;
            case "messageService":
            this.messageService();
            break;
            case "doctorSeting":
            this.doctorSeting();
            break;
          case "changeOrg":
            this.changeOrg();
            break;
          case "identityAccount":
            this.identityAccount();
            break;
          case "signOut":
            this.signOut();
            break;
          default:
            break;
        }
      },
      accountManage() {
        //console.log("账户管理")
        this.$router.push(`/personalCenter/accountManage`)
      },
      orgAuthInfo() {
        this.$router.push(`/personalCenter/accountInfo`)
      },
      adminConfig() {
        this.$router.push(`/personalCenter/personalSettings`)
      },
      HospitalInformationManagement() {
        this.$router.push(`/hospInfoDeploy/hospInfoDeploy`)
      },
      messageService(){
        this.$router.push('/publicServiceNum/messageService/messageSignature')
      },
      doctorSeting(){
        this.openDepartDoctorConfig();
      },
      changeOrg() {
        //console.log("切换机构")
        this.$router.push('/chooseOrganiz/true')
      },
      identityAccount() {
        //console.log("认证机构")
      },
      async signOut() {
        //console.log("退出登录!");
        await this.$store.dispatch({
          type: 'signOut',
          req: {}
        });
        // localStorage.removeItem('token');
        // localStorage.removeItem('userName');
        this.set_orgname('');
        this.set_orgstate('0');
        this.set_moduleper([])
        this.$router.go(0);
        localStorage.clear();
        sessionStorage.clear()
      },
      async handleOrg(command) {
        //console.log("机构")
        await this.$store.dispatch({
          type: 'chooseOrg',
          req: {
            org_id: command
          }
        })
      },
      // START--------------- login
      loginTabClick(tab, event) {
        //console.log(tab, event);
      },
      //密码的显示隐藏
      changeType: function () {
        this.seen = !this.seen; //小眼睛的变化
        this.pwdType = !this.pwdType; //跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
      },
      // 引入修改vuex的方法，如修改token，this.set_token('11111111');
      toForgetPass() {
        window.open('#/passwordConfig/forgetPass');
        // this.$router.push({
        //     path: '/passwordConfig/forgetPass'
        // })
      },
      toRegister() {
        window.open('#/register');
        // this.$router.push({
        //     path: '/register'
        // })
      },
      // 进入开放平台
      enterPlatform() {
        this.$router.push({
          path: '/visConfig/visualizationConfiguration'
        });
      },
      // 使用帮助 鼠标放上去时显示
      helpLoginHover() {
        this.helpLoginShow = true;
      },
      // 使用帮助 鼠标移开时隐藏
      helpLoginBlur() {
        this.helpLoginShow = false;
      },
      async submitForm(formName) {
        // //console.log('form', formName)
        this.$refs[formName].validate((valid) => {
          // //console.log('va', valid)
          if (valid) {
            // //console.log('submit!');
            this.confirmOrgz = true;
          } else {
            // //console.log('error submit!!');
            return false;
          }
        });
        if (this.confirmOrgz) {
          this.loadingLogin = true;
          this.$store.dispatch({
            type: 'login',
            req: this.loginForm,
            vm: this
          }).then((res) => {
            this.loadingLogin = false;
            this.user_name(res.data.realName);
            this.set_phone(res.data.phone);
            // //console.log('用户信息：', this.phone, this.userName, res.data.phone);
            this.isLogined = true;
            this.$store.dispatch({
              type: 'listOrganization'
            }).then((res) => {
              this.set_orgname("");
              if (res.data.length == 1) {

                this.set_orgname(res.data[0].name);
                this.set_orgstate(1)
              }
              if (res.data.length >= 2) {
                this.set_orgstate(2)
              }
              // //console.log(res);
              if (res.data.length == 0) {
                this.set_orgname('');
                this.set_orgstate('0');
                this.goConfigRoute();
              } else if (res.data.length == 1) {
                this.selectedOrganiz = res.data[0].platformHospitalId
                this.$store.dispatch({
                  type: 'chooseOrg',
                  req: {
                    org_id: this.selectedOrganiz
                  }
                }).then(async (res1) => {
                  await this.getFeatures(); //获取各模块权限
                  await this.Jurisdiction(); //权限控制显示隐藏
                  await this.goConfigRoute();

                })

              } else {
                this.$router.push('/chooseOrganiz/false')
              }
            })
          });
        }
      },
      goConfigRoute() {
        this.$router.replace({
          path: `/visConfig/visualizationConfiguration`
        })
      },
      // async chooseOrgz() {
      //     this.selectOrgzVisible = false;
      //     if (!this.loginForm.orgz) {
      //         this.$message.error("请选择机构");
      //         return false;
      //     }
      //     await this.$store.dispatch({
      //         type: 'chooseOrg', req: {org_id: this.loginForm.orgz}
      //     })
      //     this.$router.push({path:"/visConfig/visualizationConfiguration"})
      //     // todo-----------------------------------------------------------------------------
      //     // Loading.service({ fullscreen: true });
      //     // var params = {
      //     //   stepId: self.stepId
      //     // }
      //     // axiospost(apiurl.OauthStatus, params)
      //     // .then(function (response) {
      //     //     loadingInstance.close();
      //     //     if(response.status == 200) {
      //     //         // -------------
      //     //     }
      //     // })
      //     // .catch(function (error) {
      //     //     loadingInstance.close();
      //     //     //console.log(error);
      //     // });
      // },
      // END------------------ login
      // 页面滚动，页面header主题更改
      handlePageScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // //console.log(scrollTop);
        if (scrollTop > 430) {
          this.indexHeaderChangeTheme = true;
        } else {
          this.indexHeaderChangeTheme = false;
        }
      },
      // 页面顶部导航点击事件
      indexHeaderTabClick(tab, event) {
        let self = this;
        //console.log(this.activeTopMenu);
        switch (self.activeTopMenu) {
          case 'index':
            break;
          case 'service':
            this.$router.push({
              'name': 'serCenIndex'
            })
            break;
          case 'product':
            this.$router.push({
              'name': 'productExperence'
            })
            break;
          case 'help':
            this.$router.push({
              'name': 'help'
            })
            break;
          case 'example':
            this.$router.push({
              'name': 'corporateCom'
            })
            break;
          case 'contact':
            this.$router.push({
              'name': 'aboutUs'
            })
            break;
          case 'about':
            window.open("http://www.zhuojianchina.com/gyzjqyjs.jhtml");
            break;
          default:
            this.$notify.info({
              title: '消息',
              message: '此页面正在飞速搭建中，如有疑问请联系在线客服'
            });
            // self.$message('此页面正在飞速搭建中，如有疑问请联系在线客服');
            break;
        }
      },
      // banner图下平台鼠标放上去时样式处理
      platformHover(platform) {
        var self = this;
        switch (platform) {
          case 'commonapp':
            self.popshow_commonapp = true;
            break;
          case 'wxservice':
            self.popshow_wxservice = true;
            break;
          case 'wxsmall':
            self.popshow_wxsmall = true;
            break;
          case 'zhifubao':
            self.popshow_zhifubao = true;
            break;
        }
      },
      // banner图下平台鼠标离开时样式处理
      platformBlur(platform) {
        var self = this;
        switch (platform) {
          case 'commonapp':
            self.popshow_commonapp = false;
            break;
          case 'wxservice':
            self.popshow_wxservice = false;
            break;
          case 'wxsmall':
            self.popshow_wxsmall = false;
            break;
          case 'zhifubao':
            self.popshow_zhifubao = false;
            break;
        }
      },
      // 体验专区
      expericeHover(payload) {
        //console.log(payload.imgUrl);
        this.activeExpericeImgurl = payload.imgUrl;
      },
      experienceTabClick(tab, event) {
        //console.log(tab, event);
      },
      // 经典案例
      indexCaseHover(casetag) {
        document.getElementsByClassName(casetag)[0].style.display = 'flex';
        document.getElementsByClassName(casetag)[0].removeEventListener('animationend', this.fadeOut);
        document.getElementsByClassName(casetag)[0].addEventListener('animationend', this.fadeIn);
        document.getElementsByClassName(casetag)[0].style.animation = 'opacity 0.3s ease';
      },
      indexCaseBlur(casetag) {
        document.getElementsByClassName(casetag)[0].removeEventListener('animationend', this.fadeIn);
        document.getElementsByClassName(casetag)[0].addEventListener('animationend', this.fadeOut);
        document.getElementsByClassName(casetag)[0].style.animation = 'opacity-reverse 0.3s ease';
      },
      fadeIn(e) {
        e.currentTarget.style.display = 'flex';
      },
      fadeOut(e) {
        e.currentTarget.style.display = 'none';
      },
      // 合作伙伴
      iconPatnerHover(index) {
        switch (index) {
          case 0:
            document.getElementsByClassName('icon-index-patner')[index].style.backgroundPosition = '0 -41px';
            break;
          case 1:
            document.getElementsByClassName('icon-index-patner')[index].style.backgroundPosition = '0 -42px';
            break;
          case 2:
            document.getElementsByClassName('icon-index-patner')[index].style.backgroundPosition = '0 -42px';
            break;
          case 3:
            document.getElementsByClassName('icon-index-patner')[index].style.backgroundPosition = '1px -40px';
            break;
          case 4:
            document.getElementsByClassName('icon-index-patner')[index].style.backgroundPosition = '0 -40px';
            break;
        }
      },
      iconPatnerBlur(index) {
        document.getElementsByClassName('icon-index-patner')[index].style.backgroundPosition = '0 0';
      },
      async getFeatures() { //获取各模块权限 
        let url = this.banIECache(apiurl.getuserFeatures, '?');
        await axios.get(url, axiosConfig).then((res) => {
          if (res.data) {
            this.set_moduleper(res.data);
          }
          //console.log('各模块权限', res)
        })
      },
    },
  }

</script>

<style lang="scss">
  @import '@/assets/css/index.scss';

</style>

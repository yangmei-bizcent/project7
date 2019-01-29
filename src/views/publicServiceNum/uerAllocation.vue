<template>
    <div class="page-container page-useralloc bgcolor-white">
        <div class="page-title flex-alignstart-justifystart">
            <span class="minwidth180">用户就诊人配置</span>
            <span 
                title="对用户与就诊人相互添加删除之间的规则、用户添加就诊人时页面配置项的设置、就诊人数据与平台数据统一的配置。" 
                class="moreLineEllipsis1 marginleft30 fontsize0 color-999">对用户与就诊人相互添加删除之间的规则、用户添加就诊人时页面配置项的设置、就诊人数据与平台数据统一的配置。</span>
        </div>
        <div class="paddingX20 padding20X">
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                <el-tab-pane label="就诊人规则" name="patientRules" v-if="JZroleTabShow">
                    <!-- <el-button @click="toApplication">前往应用管理后台-科室介绍</el-button> -->
                    <el-form label-position="right" label-width="350px" :model="patientRulesForm">
                        <div class="flex-align-justifystart marginbottom30 margintop15">
                            <el-breadcrumb class="fontsize2" separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item>用户</el-breadcrumb-item>
                                <el-breadcrumb-item>就诊人</el-breadcrumb-item>
                            </el-breadcrumb>
                            <p class="fontsize0 color-999 marginleft30">用户对就诊人进行添加或删除的规则</p>
                        </div>
                        <el-form-item 
                            class="marginbottom30"
                            v-if="item.seq < 1000"
                            v-for="(item, index) in patientRulesData" 
                            :key="index" 
                            :label="item.headDesc">
                            <el-input-number
                                v-if="item.displayType==75"
                                v-model="item.componentDesc"
                                :precision="0" 
                                :min="0" 
                                :max="100">
                            </el-input-number>
                            <div v-if="item.displayType==80">
                                <el-input-number 
                                    v-model="item.value" 
                                    :precision="0" 
                                    :min="0" 
                                    :max="100">
                                </el-input-number>
                                <el-checkbox class="displayNone" v-model="item.isUnbund">解绑最先绑定的用户</el-checkbox>
                            </div>
                            <div v-if="item.displayType==99">
                                <el-input-number
                                    v-model="item.value" 
                                    :precision="0"  
                                    :min="0" 
                                    :max="100">
                                </el-input-number>
                                <el-radio-group 
                                    v-model="item.unit"
                                    class="marginleft20"
                                    size="mini">
                                    <el-radio-button label="小时"></el-radio-button>
                                    <el-radio-button class="marginleft10" label="天"></el-radio-button>
                                    <el-radio-button class="marginleft10" label="月"></el-radio-button>
                                </el-radio-group>
                            </div>
                        </el-form-item>

                        <div class="flex-align-justifystart marginbottom30 paddingtop30 border-top-d8d8d8">
                            <el-breadcrumb class="fontsize2" separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item>就诊人</el-breadcrumb-item>
                                <el-breadcrumb-item>用户</el-breadcrumb-item>
                            </el-breadcrumb>
                            <p class="fontsize0 color-999 marginleft30">就诊人被用户添加规则</p>
                        </div>
                        <el-form-item 
                            v-if="item.seq > 1000"
                            v-for="(item, index) in patientRulesData" 
                            :key="index" 
                            :label="item.headDesc">
                            <el-input-number
                                v-if="item.displayType==75"
                                :precision="0" 
                                @change="handleChange"
                                v-model="item.componentDesc" 
                                :min="0" 
                                :max="100">
                            </el-input-number>
                            <div v-if="item.displayType==80">
                                <el-input-number 
                                    v-model="item.value"
                                    :precision="0"  
                                    :min="0" 
                                    :max="100">
                                </el-input-number>
                                <el-checkbox class="displayNone" v-model="item.isUnbund">解绑最先绑定的用户</el-checkbox>
                            </div>
                            <div v-if="item.displayType==99">
                                <el-input-number
                                    v-model="item.value"
                                    :precision="0"   
                                    :min="0" 
                                    :max="100">
                                </el-input-number>
                                <el-radio-group 
                                    v-model="item.unit"
                                    class="marginleft20"
                                    size="mini">
                                    <el-radio-button label="小时"></el-radio-button>
                                    <el-radio-button class="marginleft10" label="天"></el-radio-button>
                                    <el-radio-button class="marginleft10" label="月"></el-radio-button>
                                </el-radio-group>
                            </div>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button type="primary" plain @click="restoreDefaultConfig">还原</el-button>
                            <el-button type="primary" @click="rulesConfigSubmit" v-show="saveJzrBtnShow">配置保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="就诊人配置项" name="patientConfig" v-if="JZrconfigTabShow">
                    <table class="width100">
                        <tr>
                            <td class="valigntop" width="346px">
                                <div class="wrap-custommenu-left relative">
                                    <header class="color-white paddingtop30 textAlignCenter left-wxtitle">{{ pageTitle }}</header>
                                    <section class="margintop10 wrap-left-appview">
                                        <div 
                                            v-for="(item, index) in patientConfigData"
                                            :key="index"
                                            v-show="promptMessageShow && item.componentKey=='#promptMessage'"
                                            class="topNotice flex-alignstart-justifystart fontsize-2 bgcolor-fff0e6 color-ff7b35">
                                            <i class="width-height-14 marginright5"></i>
                                            <span>{{ item.componentDesc }}</span>
                                        </div>
                                        <el-form 
                                            ref="form" 
                                            class="paddingleft15 bgcolor-white marginleft1 marginright1 marginbottom50"
                                            :model="appPatientForm" 
                                            label-width="90px" 
                                            label-position="left">
                                            <el-form-item label="姓名">
                                                <el-input 
                                                    v-model="appPatientForm.patientName" 
                                                    placeholder="请输入就诊人真实姓名"></el-input>
                                            </el-form-item>
                                            <div
                                                v-for="(item, index) in patientConfigData"
                                                :key="index">
                                                <el-form-item
                                                    label="证件类型"
                                                    v-if="item.componentValue && item.componentKey=='#idCard' && appPatientForm.idCardSelectShow">
                                                    <div
                                                        @click="showIdCardTypeSelect" 
                                                        class="flex-align-justifybetween paddingX15 height-per100">
                                                        <p class="color-333 height34">{{ appIdCardTypeSelected }}</p>
                                                        <i class="el-icon-arrow-right color-ddd"></i>
                                                    </div>
                                                </el-form-item>
                                                <el-form-item
                                                    label="证件所属人"
                                                    v-if="item.componentValue && item.componentKey=='#guardianPapers'">
                                                    <div
                                                        @click="showIsGuardianSelect" 
                                                        class="flex-align-justifybetween paddingX15 height-per100">
                                                        <p class="color-333 height34">{{ appIsGuardianSelected }}</p>
                                                        <i class="el-icon-arrow-right color-ddd"></i>
                                                    </div>
                                                </el-form-item>
                                                <el-form-item
                                                    :label="appPatientForm.idCardText"
                                                    v-if="item.componentValue && item.componentKey=='#idCard'">
                                                    <el-input placeholder="必填"></el-input>
                                                </el-form-item>
                                                <el-form-item
                                                    label="卡类型"
                                                    v-if="item.componentValue && item.componentKey=='#showCard'">
                                                    <div
                                                        @click="showCardTypeSelect" 
                                                        class="flex-align-justifybetween paddingX15 height-per100">
                                                        <p class="color-333 height34">{{ appCardTypeSelected }}</p>
                                                        <i class="el-icon-arrow-right color-ddd"></i>
                                                    </div>
                                                    <!-- <el-select v-model="cardTypeSelected" placeholder="请选择">
                                                        <el-option
                                                            v-for="(cardTypesItem, cardTypesIndex) in newTagsArr"
                                                            :key="cardTypesIndex"
                                                            :label="cardTypesItem.label"
                                                            :value="cardTypesItem.value">
                                                        </el-option>
                                                    </el-select> -->
                                                </el-form-item>
                                                <el-form-item 
                                                    v-if="item.componentValue && item.componentKey=='#showCard'" 
                                                    label="卡号">
                                                    <el-input 
                                                        :class="!appPatientForm.cardNumberRbtbtnShow?'':'width160'" 
                                                        :placeholder="item.componentDesc==''?'请输入卡号':item.componentDesc"></el-input>
                                                    <el-button 
                                                        v-if="appPatientForm.cardNumberRbtbtnShow" 
                                                        type="text">查询卡号</el-button>
                                                </el-form-item>
                                                <el-form-item 
                                                    v-if="item.componentValue && item.componentKey=='#healthCardNumber'" 
                                                    label="医保卡号">
                                                    <el-input 
                                                        :class="!appPatientForm.healthCardNumberRbkbtnShow?'':'width160'" 
                                                        :placeholder="item.componentDesc==''?'请输入医保卡':item.componentDesc"></el-input>
                                                    <el-button 
                                                        v-if="appPatientForm.healthCardNumberRbkbtnShow" 
                                                        type="text">查询卡号</el-button>
                                                </el-form-item>
                                                <el-form-item 
                                                    v-if="item.componentValue && item.componentKey=='#patientIdCardNumber'" 
                                                    label="就诊卡号">
                                                    <el-input 
                                                        :class="!appPatientForm.patientIdCardNumberRbkbtnShow?'':'width160'" 
                                                        :placeholder="item.componentDesc==''?'请输入就诊卡':item.componentDesc"></el-input>
                                                    <el-button 
                                                        v-if="appPatientForm.patientIdCardNumberRbkbtnShow" 
                                                        type="text">查询卡号</el-button>
                                                </el-form-item>
                                                <el-form-item 
                                                    v-if="item.componentValue && item.componentKey=='#address'" 
                                                    label="详细地址">
                                                    <el-input type="textarea" :placeholder="item.componentDesc==''?'请输入详细地址':item.componentDesc"></el-input>
                                                </el-form-item>
                                                <el-form-item
                                                    v-if="item.componentValue && item.componentKey=='#phoneNumber'" 
                                                    label="手机号码">
                                                    <el-input :placeholder="item.componentDesc==''?'请输入手机号':item.componentDesc"></el-input>
                                                </el-form-item>
                                                <el-form-item
                                                    v-if="item.componentValue && item.componentKey=='#validNum'" 
                                                    label="短信验证码">
                                                    <el-input class="width150" placeholder="请输入验证码"></el-input>
                                                    <el-button type="text">获取验证码</el-button>
                                                </el-form-item>
                                                <el-form-item
                                                    v-if="item.componentValue && item.componentKey=='#branchs'" 
                                                    label="院区">
                                                    <div
                                                        class="flex-align-justifybetween paddingX15 height-per100">
                                                        <p class="color-333 height34">请选择院区</p>
                                                        <i class="el-icon-arrow-right color-ddd"></i>
                                                    </div>
                                                    <!-- <el-select v-model="value" placeholder="请选择">
                                                        <el-option
                                                            label="itemlabel"
                                                            value="itemvalue">
                                                        </el-option>
                                                    </el-select> -->
                                                </el-form-item>
                                            </div>
                                            <el-form-item 
                                                label="设为默认就诊人" 
                                                label-width="140px" 
                                                class="switch-form-item paddingright15">
                                                <el-switch 
                                                    v-model="appPatientForm.isDefault" 
                                                    active-color="#35b53f"></el-switch>
                                            </el-form-item>
                                        </el-form>
                                        <!-- <el-checkbox class="marginX15 margintop15 marginbottom50">阅读并同意《网络诊间服务条款》</el-checkbox> -->
                                    </section>
                                    <!-- 下拉框选择列表 仿手机端 -->
                                    <div 
                                        v-show="appIdCardSelectShow || appCardSelectShow || appIsGuardianSelectShow" 
                                        class="v-app-modal" 
                                        @click="closeAppSelectMenu"
                                        style="z-index: 1898;"></div>
                                    <!-- 证件所属人 -->
                                    <div  
                                        class="mint-actionsheet"
                                        :class="appIsGuardianSelectShow?'appSelectMenuShow':''" 
                                        style="z-index: 1899;">
                                        <ul class="mint-actionsheet-list" style="margin-bottom: 5px;">
                                            <li 
                                                @click="chooseAppIsGuardian('本人')"
                                                class="mint-actionsheet-listitem cursorPointer">本人</li>
                                            <li 
                                                @click="chooseAppIsGuardian('监护人')"
                                                class="mint-actionsheet-listitem cursorPointer">监护人</li>
                                        </ul> 
                                        <a 
                                            @click="closeAppSelectMenu" 
                                            class="mint-actionsheet-button cursorPointer">取消</a>
                                    </div>
                                    <!-- 证件类型 -->
                                    <div  
                                        class="mint-actionsheet"
                                        :class="appIdCardSelectShow?'appSelectMenuShow':''" 
                                        style="z-index: 1899;">
                                        <ul class="mint-actionsheet-list" style="margin-bottom: 5px;">
                                            <li 
                                                v-for="(idCardTypeItem, idCardTypeIndex) in idCardTypesArr"
                                                :key="idCardTypeIndex"
                                                @click="chooseAppIdCardType(idCardTypeItem.label)"
                                                class="mint-actionsheet-listitem cursorPointer">{{ idCardTypeItem.label }}</li>
                                        </ul> 
                                        <a 
                                            @click="closeAppSelectMenu" 
                                            class="mint-actionsheet-button cursorPointer">取消</a>
                                    </div>
                                    <!-- 卡类型 -->
                                    <div  
                                        class="mint-actionsheet" 
                                        :class="appCardSelectShow?'appSelectMenuShow':''"
                                        style="z-index: 1899;">
                                        <ul class="mint-actionsheet-list" style="margin-bottom: 5px;">
                                            <li 
                                                v-for="(appCardTypesItem, appCardTypesIndex) in newTagsArr"
                                                :key="appCardTypesIndex"
                                                @click="chooseAppCardType(appCardTypesItem.value)"
                                                class="mint-actionsheet-listitem cursorPointer">{{ appCardTypesItem.value }}</li>
                                        </ul> 
                                        <a 
                                            @click="closeAppSelectMenu" 
                                            class="mint-actionsheet-button cursorPointer">取消</a>
                                    </div>
                                </div>
                            </td>
                            <td class="valigntop">
                                <div class="relative">
                                    <div class="wrap-custommenu-right">
                                        <header class=" fontsize6 color-4a4a4a header-menu-edit marginbottom15">页面元素配置</header>
                                        <div class="paddingX20">
                                            <el-form ref="form" class="patientConfigForm">
                                                <el-form-item 
                                                    class="marginbottom0">
                                                    <div class="flex-align-justifystart">
                                                        <template v-if="item.componentKey!='#onlineCreatCard'" v-for="(item, index) in selectTypeData">
                                                            <div 
                                                                class="marginright50"
                                                                :key="index">
                                                                <el-checkbox 
                                                                    class="color-333 same-radio" 
                                                                    v-model="item.componentValue"
                                                                    @change="typeSameRadioChange(item.componentKey)">{{ item.headDesc }}</el-checkbox>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </el-form-item>
                                                <template v-if="item.componentKey!='#onlineCreatCard'" v-for="(item, index) in patientConfigData">
                                                    <el-form-item 
                                                        class="marginbottom10" 
                                                        v-if="item.displayType=='2'" 
                                                        :key="index">
                                                        <div>
                                                            <el-checkbox 
                                                                v-model="item.componentValue" 
                                                                class="color-333 minwidth180"
                                                                @change="changeCheckbox(item.componentKey, item.componentValue, item.componentDesc)">{{ item.headDesc }}</el-checkbox>
                                                            <br v-if="item.seq==10">
                                                            <el-input
                                                                v-if="item.seq==10" 
                                                                v-model="item.componentDesc"
                                                                class="marginleft25 width480" 
                                                                type="textarea"
                                                                :maxlength="60"
                                                                placeholder="请输入提示语">
                                                            </el-input>
                                                            <el-input 
                                                                v-else
                                                                v-model="item.componentDesc"
                                                                class="width300 marginleft18" 
                                                                :maxlength="15"
                                                                placeholder="输入框内提示文字，15字以内">
                                                            </el-input>
                                                        </div>
                                                    </el-form-item>
                                                    <el-form-item 
                                                        v-if="item.displayType=='6' && appPatientForm.showCardShow" 
                                                        :key="index"
                                                        class="marginbottom10">
                                                        <!-- 卡类型 -->
                                                        <div>
                                                            <div class="marginleft25 wrap-tags">
                                                                <el-tag 
                                                                    v-for="(cardTypeItem, cardTypeIndex) in newTagsArr" 
                                                                    :key="cardTypeIndex"
                                                                    class="relative marginright30 marginbottom20"
                                                                    closable
                                                                    @close="deleteCardTypeTag(index, cardTypeItem)">{{ cardTypeItem.value }}</el-tag>
                                                                <el-input
                                                                    class="width180 marginbottom20"
                                                                    v-if="addTagInputVisible"
                                                                    v-model.trim="addTagInputValue"
                                                                    placeholder="输入卡名称，6字以内"
                                                                    ref="saveTagInput"
                                                                    size="small"
                                                                    :maxlength="6"
                                                                    @keyup.enter.native="handleNewCardTypeInputConfirm(index)"
                                                                    @blur="handleNewCardTypeInputConfirm(index)"
                                                                    >
                                                                </el-input>
                                                            </div>
                                                            <el-button 
                                                                type="text" 
                                                                class="color-3c9ef8 margintop10"
                                                                v-if="!addTagInputVisible"
                                                                @click="showNewCardTypeInput">
                                                                <i class="el-icon-plus"></i>新增
                                                            </el-button>
                                                        </div>
                                                    </el-form-item>
                                                    <el-form-item 
                                                        v-if="item.displayType=='0'" 
                                                        :key="index"
                                                        class="marginbottom10">
                                                        <div>
                                                            <el-checkbox 
                                                                v-model="item.componentValue" 
                                                                class="color-333"
                                                                @change="changeCheckbox(item.componentKey, item.componentValue, item.componentDesc)">{{ item.headDesc }}</el-checkbox>
                                                        </div>
                                                    </el-form-item>
                                                    <el-form-item 
                                                        v-if="item.displayType=='60'" 
                                                        :key="index"
                                                        class="marginbottom10">
                                                        <div>
                                                            <!-- <el-checkbox 
                                                                v-model="item.componentValue" 
                                                                class="color-333"
                                                                @change="changeCheckbox(item.componentKey, item.componentValue, item.componentDesc)">{{ item.headDesc }}</el-checkbox> -->
                                                            {{ item.headDesc }}
                                                            <br>
                                                            <el-checkbox-group 
                                                                v-model="item.componentDesc"
                                                                :disabled="appPatientForm.idCardShow?false:true"
                                                                @change="idCardCheckboxChange(index, item.componentDesc)"
                                                                class="marginleft25">
                                                                <el-checkbox 
                                                                    class="color-333" 
                                                                    :label="1"
                                                                    disabled>身份证</el-checkbox>
                                                                <el-checkbox class="color-333" :label="2">军官证</el-checkbox>
                                                                <el-checkbox class="color-333" :label="3">护照</el-checkbox>
                                                                <el-checkbox class="color-333" :label="4">华侨卡</el-checkbox>
                                                            </el-checkbox-group>
                                                        </div>
                                                    </el-form-item>
                                                    <el-form-item 
                                                        v-if="item.displayType=='160'" 
                                                        :key="index"
                                                        class="marginbottom10">
                                                        <div>
                                                            <el-checkbox 
                                                                v-model="item.componentValue" 
                                                                class="color-333">{{ item.headDesc }}</el-checkbox>
                                                            <br>
                                                            <el-radio-group 
                                                                v-model="item.componentDesc"
                                                                class="marginleft25">
                                                                <el-radio label="idcard">身份证</el-radio>
                                                                <el-radio label="phone">手机号</el-radio>
                                                                <el-radio label="cardNumber">卡号</el-radio>
                                                                <el-radio label="healthCardNumber">医保卡号</el-radio>
                                                                <el-radio label="patientIdCardNumber">就诊卡号</el-radio>
                                                                <el-radio label="renderhisnumber">自定义返回</el-radio>
                                                            </el-radio-group>
                                                        </div>
                                                    </el-form-item>
                                                </template>
                                                <el-form-item>
                                                    <el-button 
                                                        type="primary" 
                                                        class="margintop30" 
                                                        @click="patientConfigSubmit" v-show="saveJzrConfigBtnShow">配置保存</el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>
                <!-- <el-tab-pane label="就诊人验证数据" name="patientCheck">
                    <el-form label-position="right" label-width="140px" :model="interfaceDockForm">
                        <el-form-item label="就诊人验证数据来源">
                            <el-radio-group v-model="interfaceDockForm.checkType">
                                <el-radio :label="0">接口对接</el-radio>
                                <el-radio disabled :label="1">数据导入</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="服务器地址">
                            <el-input class="width300"></el-input>
                        </el-form-item>
                        <el-form-item label="规范接口文档">
                            <el-button type="text"><i class="el-icon-download"></i>规范接口文档下载</el-button>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button type="primary">配置保存</el-button>
                        </el-form-item>
                    </el-form> -->
                    <!-- <div class="flex-align-justifybetween marginbottom15">
                        <div class="search">
                            <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                v-model="searchKey">
                            </el-input>
                        </div>
                        <div class="operate-tool">
                            <el-button type="primary">批量导入</el-button>
                            <el-button type="primary">批量导出</el-button>
                        </div>
                    </div>
                    <el-table :data="patientCheckData" border>
                        <el-table-column prop="patientName" label="姓名"></el-table-column>
                        <el-table-column prop="idCardType" label="证件类型"></el-table-column>
                        <el-table-column prop="isGuardian" label="证件所属"></el-table-column>
                        <el-table-column prop="nationValue" label="民族"></el-table-column>
                        <el-table-column prop="idCard" label="证件号码"></el-table-column>
                        <el-table-column prop="genderValue" label="性别"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="cardType" label="卡类型"></el-table-column>
                        <el-table-column prop="cardNumber" label="卡号"></el-table-column>
                        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
                        <el-table-column prop="createdon" label="创建时间"></el-table-column>
                        <el-table-column prop="platformHospitalName" label="院区"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="operate" size="mini" type="text">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table> -->
                <!-- </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
import {mapState, mapGetters} from 'vuex'
import fecha from 'fecha'
export default {
    data() {
        return {
            flowId: '',
            hospitalId: '52cd0571-0d88-4606-abe1-7bcf3969438d',
            pageTitle: '添加就诊人',
            activeTab: 'patientRules',
            // START---------就诊人规则
            patientRulesData: [],
            savePatientRulesData: [],   // 保存时传给接口的数据
            patientRulesForm: {
                
            },
            // END---------就诊人规则
            // START---------就诊人配置
            addTagInputVisible: false,  // 添加证件类型的输入框
            addTagInputValue: '',   // 添加证件类型的输入框的值
            newTagsArr: [], // 卡类型数组
            
            idCardTypesArr: [], // 左侧手机界面证件类型下拉列表值

            patientConfigData: [],
            savePatientConfigData: [],  // 保存时传给接口的数据
            // 左侧手机界面表单数据
            promptMessageShow: false,   // 顶部提醒
            promptMessage: '',  // app头部提醒内容
            appCardTypeSelected: '',    // 左侧卡类型选中值
            appIdCardTypeSelected: '',  // 左侧证件类型选中值
            appIdCardSelectShow: false, // app界面证件类型下拉选择显示
            appCardSelectShow: false,   // app界面卡类型下拉选择显示
            appIsGuardianSelected: '', // app界面证件所属人选中值
            appIsGuardianSelectShow: false, // app界面证件所属人下拉选择显示

            selectTypeData: [], //  数据类型
            appPatientForm: {
                patientName: '',
                idCard: '',
                cardType: 0,
                cardNumber: '',
                healthPatientCard: '',
                patientCard: '',
                address: '',
                patientPhone: '',
                isDefault: 0,

                // 表单项是否显示标识
                idCardShow: false,  // 身份证号
                showCardShow: false,    //  卡类型
                cardNumberRbtbtnShow: false,   // 查询卡号按钮
                healthCardNumberShow: false,    // 医保卡号
                healthCardNumberRbkbtnShow: false,  // 查询医保卡号按钮
                patientIdCardNumberShow: false, //  就诊卡号
                patientIdCardNumberRbkbtnShow: false,   // 查询就诊卡号按钮
                addressShow: false,     // 地址
                phoneNumberShow: false,     // 手机号码
                validNumShow: false,    // 短信验证码
                branchsShow: false,     // 院区

                idCardText: '身份证号',    // 左侧app显示的证件类型，默认身份证
                idCardSelectShow: false,    // 证件类型下拉选择区域显示：右侧证件类型选择多个的话则显示，否则隐藏
                // app表单数据
                
            },
            idCardTypeSelected: '', // 证件类型选中值
            isGuardianSelected: '', // 证件所属人选中值
            cardTypeSelected: '',   // 卡类型选中值
            // END---------就诊人配置
            // START---------就诊人验证
            interfaceDockForm: {
                checkType: 0,
            },
            searchKey: '',  // 搜索关键字
            patientCheckData: [
                {
                    patientName: '张三',
                    idCardType: '1',    // 1身份证，2军官证，3护照
                    isGuardian: '0', // 本人
                    nationValue: '汉族',
                    idCard: '320332198903195024',
                    genderValue: '女',
                    age: 27,
                    cardType: '1',  // 医院定义的
                    cardNumber: '12235',
                    phoneNumber: '13851478966',
                    createdon: '',
                    platformHospitalName: '',
                    address: '',
                },
            ],
            // END---------就诊人验证
            //权限
            JZroleTabShow:false,
            JZrconfigTabShow:false,
            saveJzrBtnShow:false,
            saveJzrConfigBtnShow:false
        }
    },
    computed: {
        ...mapGetters({
            userName: 'userName',
            phone: 'phone',
            token: 'token',
            chooseOrgInfo: 'chooseOrgInfo',
            moduleper:'moduleper'
        }),
        ...mapState({
            currentDateInfo: state => state.user.currentDateInfo,
        }),
    },
    components: {
        
    },
    async mounted() {
        this.Jurisdiction();
        await this.$store.dispatch({
            type: 'getUcUiFlowByPhIdAndUseType',
            defaultPlatformHospitalId: this.chooseOrgInfo.platformHospitalId,
            // defaultPlatformHospitalId: this.hospitalId,
            useType: 'patientVisit'
        }).then((d) => {
            if(d && d.hasOwnProperty('data')) {
                // //console.log('获取flowId：', d);
                this.flowId = d.data.ucUiFlowId;
                this.$store.dispatch({
                    type: 'getPatientVisitRules',
                    ucUiFlowId: this.flowId,
                    stepId: 'bindPatientVisit'
                }).then((d) => {
                    if(d && d.hasOwnProperty('data')) {
                        // START---------就诊人规则
                        this.initRulesDatas(d);
                        // END---------就诊人规则
                        // START---------就诊人配置
                        this.initConfigDatas(d);
                        // END---------就诊人配置
                    }
                });
            }
        });
        // //console.log('所选机构是：', this.chooseOrgInfo.platformHospitalId);
        
    },
    methods: {
        Jurisdiction(){//权限控制
            if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
                this.moduleper.map(item=>{
                    item.children.map(item2=>{
                        
                        if(item2.feature_id==351042){//"  查看就诊人规则tab"
                            this.JZroleTabShow=true;
                        }else if(item2.feature_id==351044){//"查看就诊人配置tab"
                            this.JZrconfigTabShow=true;
                        }else if(item2.feature_id==351043){//"修改就诊人规则"
                            this.saveJzrBtnShow=true;
                        }else if(item2.feature_id==351045){//"修改就诊人配置"
                             this.saveJzrConfigBtnShow=true;
                        }
                       
                    })
                })
                 if(!this.JZroleTabShow){
                    this.activeTab="patientConfig";
                }
            }
        },
        // 前往应用管理后台
        toApplication() {
            window.open('https://res.zwjk.com/h5-test/open-application/dev/#/doctorDepart?token='+sessionStorage.getItem('token')+'&platformHospitalId='+this.chooseOrgInfo.platformHospitalId+'&currentDate='+this.currentDateInfo.year);
            // window.open('http://localhost:8080/#/?token='+sessionStorage.getItem('token')+'&platformHospitalId=b51752c6-578c-412b-ae9e-90ad748c5748'+'&currentDate='+this.currentDateInfo.year);
        },
        // 数据类型切换
        typeSameRadioChange(comptKey) {
            let self = this;
            switch(comptKey) {
                case 'interface':
                    self.selectTypeData.forEach((item) => {
                        if(item.componentKey == 'enableTestFlow') {
                            item.componentValue = false;
                        }
                    });
                    break;
                case 'enableTestFlow':
                    self.selectTypeData.forEach((item) => {
                        if(item.componentKey == 'interface') {
                            item.componentValue = false;
                        }
                    });
                    break;
            }
        },
        // 就诊人规则
        initRulesDatas(d) {
            let rulesDatas = d.data.filter((item) => {
                return item.displayType=='75' || item.displayType=='80' || item.displayType=='99'
            });
            rulesDatas.sort(this.compare('seq'));    // 按照数据库的seq字段排序
            //console.log('未处理前就诊人规则数据：', rulesDatas);
            if(rulesDatas.length >0) {
                rulesDatas.forEach((item, index) => { 
                    switch(item.displayType) {
                        case '80':
                            item.value = JSON.parse(item.componentDesc).value;
                            item.isUnbund = JSON.parse(item.componentDesc).isUnbund==0?false:true;
                            break;
                        case '99':
                            item.value = JSON.parse(item.componentDesc).value;
                            switch(JSON.parse(item.componentDesc).unit) {
                                case 'hh':
                                    item.unit = '小时';
                                    break;
                                case 'dd':
                                    item.unit = '天';
                                    break;
                                case 'MM':
                                    item.unit = '月';
                                    break;
                                default: 
                                    item.unit = '小时';
                                    break;
                            }
                            break;
                    }
                });
                this.patientRulesData = rulesDatas;
            }
            // //console.log('就诊人规则数据：', this.patientRulesData);
        },
        // 就诊人配置
        initConfigDatas(d) {
            this.newTagsArr = [];
            let configDatas = d.data.filter((item) => {
                return item.displayType=='0' || item.displayType=='110' || item.displayType=='2' || item.displayType=='6' || item.displayType=='60' || item.displayType=='160'
            });
            configDatas.sort(this.compare('seq'));    // 按照数据库的seq字段排序
            //console.log('未处理前就诊人配置数据：', configDatas);
            if(configDatas.length > 0) {
                configDatas.forEach((item, index) => {
                    item.componentValue = item.componentValue==0?false:true;
                    switch(item.displayType) {
                        case '6':
                            // 卡类型
                            item.componentDesc = JSON.parse(item.componentDesc);
                            this.newTagsArr = item.componentDesc;
                            break;
                        case '60':
                            // 证件类型
                            // if(item.componentValue==1) {
                            item.componentDesc = JSON.parse(item.componentDesc);
                            // //console.log('证件类型值：', item.componentDesc);
                            this.resetLeftIdCardType(item.componentDesc);   // 重置左侧证件类型下拉列表项
                            this.appPatientForm.idCardSelectShow = item.componentDesc.length>1?true:false;
                            // }
                            break;
                    }
                });
                this.selectTypeData = configDatas.filter((item) => {
                    return item.componentKey == 'interface' || item.componentKey == 'enableTestFlow'
                });
                //console.log('111', this.selectTypeData);
                this.patientConfigData = configDatas;
                this.initLeftAppForm();
            }
            // //console.log('就诊人配置数据：', this.patientConfigData);
        },
        handleTabClick(tab, event) {
            //console.log(tab, event);
        },
        // 数组排序比较
        compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        // START----------就诊人规则
        // 就诊人规则加减输入框值改变
        handleChange(value) {
            //console.log(value);
        },
        // handleCheckboxComptChange(index, value, isUnbund) {
        //     let comptDesc = {
        //         'value': value,
        //         'isUnbund': isUnbund
        //     };
        //     //console.log(JSON.stringify(comptDesc));
        //     this.patientRulesData[index].componentDesc = JSON.stringify(comptDesc);
        // },
        // 重置表单/还原默认配置
        restoreDefaultConfig() {
            this.$confirm('是否还原默认设置?', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                //console.log('还原默认设置');
                this.patientRulesData.forEach((item, index) => {
                    item.componentDesc = 0;
                    item.value = 0;
                    item.unit = '小时';
                });
            });
        },
        async rulesConfigSubmit() {
            
            //console.log('111', this.phone);
            // //console.log('保存时的规则数据：', this.patientRulesData);
            this.$confirm('是否确认应用当前配置?', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.savePatientRulesData = JSON.parse(JSON.stringify(this.patientRulesData));  // 数组这样赋值，修改本数组时，可防止原数组被改变
                this.savePatientRulesData.forEach((item, index) => { 
                    switch(item.displayType) {
                        case '80':
                            item.isUnbund = item.isUnbund?1:0;
                            let comptDesc80 = {
                                'value': item.value,
                                'isUnbund': item.isUnbund
                            };
                            item.componentDesc = JSON.stringify(comptDesc80);
                            delete item.value;
                            delete item.isUnbund;
                            break;
                        case '99':
                            switch(item.unit) {
                                case '小时':
                                    item.unit = 'hh';
                                    break;
                                case '天':
                                    item.unit = 'dd';
                                    break;
                                case '月':
                                    item.unit = 'MM';
                                    break;
                            }
                            let comptDesc99 = {
                                'value': item.value,
                                'unit': item.unit
                            };
                            item.componentDesc = JSON.stringify(comptDesc99);
                            delete item.value;
                            delete item.unit;
                            break;
                    }
                });
                // //console.log('保存前数据：', this.patientRulesData);
                this.$store.dispatch({
                    type: 'updateUiconfigDetails',
                    stepId: 'bindPatientVisit',
                    flowId: this.flowId,
                    platformHospitalId: this.chooseOrgInfo.platformHospitalId,
                    // platformHospitalId: this.hospitalId,
                    tUiConfigDetails: this.savePatientRulesData,
                    scyUserId: this.phone
                }).then((d) => {
                    if(d && d.status == 200) {
                        //console.log('提交规则有响应啦', d);
                        this.$message({
                            type: 'success',
                            message: '就诊人规则配置保存成功'
                        });
                    }
                });
            })
            
        },
        // END----------就诊人规则
        // START----------就诊人配置项
        // 左侧app界面下拉选择取消
        // 证件类型区域点击，显示下拉列表
        showIdCardTypeSelect() {
            this.appCardSelectShow = false;
            this.appIdCardSelectShow = true;
        },
        // 卡类型区域点击，显示下拉列表
        showCardTypeSelect() {
            this.appIdCardSelectShow = false;
            this.appIsGuardianSelectShow = false;
            this.appCardSelectShow = true;
        },
        closeAppSelectMenu() {
            this.appIdCardSelectShow = false;
            this.appIsGuardianSelectShow = false;
            this.appCardSelectShow = false;
        },
        // 证件类型下拉项选择
        chooseAppIdCardType(label) {
            this.appIdCardTypeSelected = label;
            this.closeAppSelectMenu();
        },
        // 卡类型下拉项选择
        chooseAppCardType(value) {
            this.appCardTypeSelected = value;
            this.closeAppSelectMenu();
        },
        // 显示证件所属人下拉
        showIsGuardianSelect() {
            this.appIdCardSelectShow = false;
            this.appCardSelectShow = false;
            this.appIsGuardianSelectShow = true;
        },
        chooseAppIsGuardian(value) {
            this.appIsGuardianSelected = value;
            this.closeAppSelectMenu();
        },
        // 初始化左侧手机界面显示项
        initLeftAppForm() {
            this.patientConfigData.forEach((item, index) => {
                this.resetLeftApp(item.componentKey, item.componentValue, item.componentDesc);
            });
        },
        // 删除卡类型tag
        deleteCardTypeTag(index, tagItem) {
            switch(this.newTagsArr.length<=2) {
                case true:
                    this.$message({
                        message: '卡类型选择个数至少为2个，无法删除',
                        type: 'warning'
                    });
                    break;
                case false:
                    this.newTagsArr.splice(this.newTagsArr.indexOf(tagItem), 1);
                    this.patientConfigData[index].componentDesc = this.newTagsArr;
                    break;
            }
        },
        // 显示新增卡类型的输入框
        showNewCardTypeInput() {
            this.addTagInputVisible = true;
            // this.$nextTick(_ => {
            //     this.$refs.saveTagInput.$refs.input.focus();
            // });
        },
        // 保存新增的卡类型tag
        handleNewCardTypeInputConfirm(index) {
            let addTagInputValue = this.addTagInputValue;
            if (addTagInputValue) {
                let filterItem = this.newTagsArr.filter((item) => {
                    return item.value == addTagInputValue
                });
                // //console.log('过滤的tag：', filterItem);
                if(filterItem.length == 0) {
                    let newtag = {
                        key: (this.newTagsArr.length+1).toString(),
                        value: addTagInputValue
                    };
                    this.newTagsArr.push(newtag);
                    this.patientConfigData[index].componentDesc = this.newTagsArr;
                }
                else {
                    this.$message({
                        message: '新增的卡类型与已有卡类型重复',
                        type: 'warning'
                    });
                }
            }
            this.addTagInputVisible = false;
            this.addTagInputValue = '';
        },
        // 右边证件类型改变的时候，重置左边手机界面中，证件类型下拉列表的数据
        resetLeftIdCardType(componentDesc) {
            this.idCardTypesArr = [];
            let newItem = {};
            for(let i=0; i<componentDesc.length; i++) {
                switch(componentDesc[i]) {
                    case 1:
                        newItem = {
                            value: 1,
                            label: '身份证'
                        };
                        this.idCardTypesArr.push(newItem);
                        break;
                    case 2:
                        newItem = {
                            value: 2,
                            label: '军官证'
                        };
                        this.idCardTypesArr.push(newItem);
                        break;
                    case 3:
                        newItem = {
                            value: 3,
                            label: '护照'
                        };
                        this.idCardTypesArr.push(newItem);
                        break;
                    case 4:
                        newItem = {
                            value: 4,
                            label: '华侨卡'
                        };
                        this.idCardTypesArr.push(newItem);
                        break;
                }
            }
            this.idCardTypesArr.sort(this.compare('value'));
        },
        // 随着右侧证件类型的radio改变，重置左边证件类型标题
        resetLeftIdCard(componentDesc) {
            switch(componentDesc.length>1) {
                case true:
                    this.appPatientForm.idCardSelectShow = true;
                    this.appPatientForm.idCardText = '证件号';
                    this.resetLeftIdCardType(componentDesc);   // 重置左侧证件类型下拉列表项
                    break;
                case false:
                    this.appPatientForm.idCardSelectShow = false;
                    this.appPatientForm.idCardText = '身份证号';
                    break;
            };
            
        },
        // 右侧证件类型checkbox点击
        idCardCheckboxChange(index, componentDesc) {
            this.resetLeftIdCard(componentDesc);    // 重置左侧手机中证件号输入区域
        },
        // 初始化左侧app界面的显示
        resetLeftApp(componentKey, componentValue, componentDesc) {
            // //console.log(componentKey.replace(" ", "")=='#cardNumber.rbk-btn');
            switch(componentKey.replace(" ", "")) {
                case '#promptMessage':
                    this.promptMessageShow = componentValue;
                    this.promptMessage = componentDesc;
                    break;
                case '#idCard':
                    this.appPatientForm.idCardShow = componentValue;
                    this.resetLeftIdCard(componentDesc);    // 重置左侧手机中证件号输入区域
                    break;
                case '#showCard':
                    this.appPatientForm.showCardShow = componentValue;
                    break;
                case '#cardNumber.rbk-btn':
                    this.appPatientForm.cardNumberRbtbtnShow = componentValue;  // 控制卡号查询按钮
                    break;
                case '#healthCardNumber':
                    this.appPatientForm.healthCardNumberShow = componentValue;
                    break;
                case '#patientIdCardNumber':
                    this.appPatientForm.patientIdCardNumberShow = componentValue;
                    break;
                case '#address':
                    this.appPatientForm.addressShow = componentValue;
                    break;
                case '#phoneNumber':
                    this.appPatientForm.phoneNumberShow = componentValue;
                    break;
                case '#validNum':
                    this.appPatientForm.validNumShow = componentValue;
                    break;
                case '#branchs':
                    this.appPatientForm.branchsShow = componentValue;
                    break;
                case '#healthCardNumber.rbk-btn':
                    this.appPatientForm.healthCardNumberRbkbtnShow = componentValue;    // 控制医保卡查询按钮
                    break;
                case '#patientIdCardNumber.rbk-btn':
                    this.appPatientForm.patientIdCardNumberRbkbtnShow = componentValue;     // 控制就诊卡查询按钮
                    break;
            }
        },
        // 右侧checkbox点击，切换左侧手机界面对应项的显示/隐藏
        changeCheckbox(componentKey, componentValue, componentDesc) {
            this.resetLeftApp(componentKey, componentValue, componentDesc);
        },
        // 保存就诊人配置
        patientConfigSubmit() {
            this.savePatientConfigData = JSON.parse(JSON.stringify(this.patientConfigData));
            // item.componentKey == 'interface' || item.componentKey == 'enableTestFlow'
            let dataTypeArr = this.savePatientConfigData.filter((item) => {
                return item.componentKey=='interface' || item.componentKey == 'enableTestFlow'
            });
            if(dataTypeArr.length > 1) {
                if(!dataTypeArr[0].componentValue && !dataTypeArr[1].componentValue) {
                    this.$alert(`您还未进行数据来源配置`, '提示');
                    return false;
                }
            }

            let qrCodeArr = this.savePatientConfigData.filter((item) => {
                return item.componentKey=='#showQRCode'
            });
            // console.log(qrCodeArr[0].componentValue, qrCodeArr[0].componentDesc, qrCodeArr);
            if(qrCodeArr[0].componentValue && (!qrCodeArr[0].componentDesc || qrCodeArr[0].componentDesc == '')) {
                this.$alert(`您还未进行${qrCodeArr[0].headDesc}配置`, '提示');
                return false;
            }
            let cardTypeArr = this.savePatientConfigData.filter((item) => {
                return item.componentKey=='#showCard'
            });
            //console.log('aaaa', cardTypeArr[0].componentValue, this.newTagsArr.length == 0);
            if(cardTypeArr[0].componentValue && this.newTagsArr.length == 0) {
                this.$alert(`您未配置卡类型`, '提示');
            }
            else if(cardTypeArr[0].componentValue && this.newTagsArr.length < 2) {
                this.$alert(`卡类型最少配置两项`, '提示');
            }
            else{
                this.savePatientConfigData = JSON.parse(JSON.stringify(this.patientConfigData));    // 数组这样赋值，修改本数组时，可防止原数组被改变
                this.$confirm('是否确认应用当前配置?', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    this.savePatientConfigData.forEach((item, index) => { 
                        item.componentValue = item.componentValue?1:0;
                        switch(item.displayType) {
                            case '60':
                                // 证件类型
                                if(item.componentValue==1) {
                                    item.componentDesc = '['+item.componentDesc+']';
                                }
                                break;
                            case '6':
                                // 卡类型
                                item.componentDesc = JSON.stringify(this.newTagsArr);
                                break;
                        }
                    });
                    //console.log('保存前数据：', this.savePatientConfigData);
                    this.$store.dispatch({
                        type: 'updateUiconfigDetails',
                        stepId: 'bindPatientVisit',
                        flowId: this.flowId,
                        platformHospitalId: this.chooseOrgInfo.platformHospitalId,
                        // platformHospitalId: this.hospitalId,
                        tUiConfigDetails: this.savePatientConfigData,
                        scyUserId: this.phone
                    }).then((d) => {
                        if(d && d.status == 200) {
                            //console.log('提交配置有响应啦', d);
                            this.$message({
                                type: 'success',
                                message: '就诊人配置保存成功'
                            });
                        }
                    });
                })
            }
        },
        // END----------就诊人配置项
    },
}
</script>

<style lang="scss">
    @import '@/assets/css/uerAllocation.scss';
</style>

<template>
  <div class="page-container page-custommenu bgcolor-white">
    <div v-show="!operateResult" class="page-title flex-alignstart-justifystart">
      <span>自定义菜单</span>
      <span class="marginleft30 fontsize0 color-999">对微信服务号的底部菜单以及子菜单的名称、链接地址配置，将应用链接通过可视化操作配置到菜单中</span>
    </div>
    <!-- operateResult为true，显示发布结果，隐藏菜单编辑页面；false不显示发布结果，显示菜单编辑页面 -->
    <div class="paddingX20 padding20X">
      <table v-show="!operateResult" class="width100">
        <tr>
          <td class="valigntop" width="346px">
            <div v-loading="loadingMenu" class="wrap-custommenu-left textAlignCenter relative">
              <div class="color-white paddingtop30 textAlignCenter left-wxtitle">{{ wxTitle }}</div>
              <div class="bgcolor-white borderRadius8 fontsize0 textAlignLeft relative margintop27 wrap-wxmsg">
                <i class="absolute"></i>
                <p>欢迎使用自定义菜单配置来构建您的服务号，您通过以下步骤可以进行快速部署应用：</p>
              </div>
              <div class="bgcolor-white borderRadius8 fontsize0 textAlignLeft relative wrap-wxmsg">
                <i class="absolute"></i>
                <ul>
                  <li>
                    <div class="tablecell">
                      <span class="inlineBlock fontsize-4 color-white textAlignCenter tag-wxmsg">1</span>
                    </div>
                    <p class="tablecell vertical-align-top">点击菜单“+”可新增主/子菜单；</p>
                  </li>
                  <li>
                    <div class="tablecell">
                      <span class="inlineBlock fontsize-4 color-white textAlignCenter tag-wxmsg">2</span>
                    </div>
                    <p class="tablecell vertical-align-top">选中主/子菜单后，可以对菜单跳转内容配置；</p>
                  </li>
                  <li>
                    <div class="tablecell">
                      <span class="inlineBlock fontsize-4 color-white textAlignCenter tag-wxmsg">3</span>
                    </div>
                    <p class="tablecell vertical-align-top">选择应用后，应用名称将同步到菜单名称；</p>
                  </li>
                  <li>
                    <div class="tablecell">
                      <span class="inlineBlock fontsize-4 color-white textAlignCenter tag-wxmsg">4</span>
                    </div>
                    <p class="tablecell vertical-align-top">主/子菜单可以进行拖拽排序；</p>
                  </li>
                  <li>
                    <div class="tablecell">
                      <span class="inlineBlock fontsize-4 color-white textAlignCenter tag-wxmsg">5</span>
                    </div>
                    <p class="tablecell vertical-align-top">发布后，关注者可直接体验到所配的应用；</p>
                  </li>
                </ul>
              </div>
              <!-- 拖拽排序提示 -->
              <div v-show="sortnoticeShow" class="wrap-sortnotice absolute" :style="'bottom:'+ sortNoticeBottom+'px'">
                <div class="con-sortnotice borderRadius2 textAlignLeft relative">
                  <p class="fontsize0 color-white">可以对菜单进行拖拽排序。</p>
                  <i class="el-icon-close color-white fontsize0 absolute cursorPointer" @click="closeSortNotice">
                  </i>
                  <i class="el-icon-caret-bottom fontsize8 absolute"></i>
                </div>
              </div>
              <div class="width100 height50 absolute bgcolor-white fontsize1 color-333 view-custm-menu">
                <el-row type="flex" justify="space-between">
                  <el-col :span="8" class="flex-align-justify width53">
                    <i class="icon-keyboard"></i>
                  </el-col>
                  <el-col :span="16" class="wrap-menus height50">
                    <div class="flex-align-justify height50">
                      <table class="width100 height-per100" cellspacing="0" cellpadding="0">
                        <tr>
                          <td 
                            :id="'menu'+index" 
                            v-if="menuLength > 0" 
                            v-for="(mainItem, index) in menuList" 
                            v-dragging="{item: mainItem, list: menuList, group: 'menu'}"
                            :key="index" 
                            class="textAlignCenter" 
                            :style="(menuLength<3)?'width:'+100/(menuLength+1)+'%;':'width:'+100/menuLength+'%;' ">
                            <div class="relative flex-align-justify height-per100">
                              <div class="width100 cursorPointer flex-align-justify paddingX5 marginleft-1 wrap-menu-content"
                                @click="menuClick(index, mainItem)">
                                <i class="icon-moremenu"></i>
                                <p class="lineEllipsis">{{ mainItem.name }}</p>
                              </div>
                              <section :id="'submenu'+index" class="width100 absolute bgcolor-white displayNone wrap-submenu-list">
                                <ul>
                                  <li v-if="mainItem.sub_button && mainItem.sub_button.length>0" v-for="(subItem, subIndex) in mainItem.sub_button"
                                    v-dragging="{item: subItem, list: mainItem.sub_button, group: 'submenu'+index}"
                                    :key="subIndex" @click="submenuItemClick(index, subItem, subIndex)" class="submenu-list-item cursorPointer"
                                    :id="'submenu'+index+subIndex" :class="'clickedMenu'+index+subIndex">
                                    <div class="lineEllipsis">{{ subItem.name ? subItem.name:"子菜单名称" }}</div>
                                  </li>
                                  <li v-if="!mainItem.sub_button || mainItem.sub_button.length<5" @click="addSubmenu(index)"
                                    :id="'submenuAdd'+index" class="submenu-list-item cursorPointer submenuAdd">
                                    <div>
                                      <i class="el-icon-plus"></i>
                                    </div>
                                  </li>
                                </ul>
                              </section>
                            </div>
                          </td>
                          <td v-show="menuLength<3" class="textAlignCenter cursorPointer" :style="'width:'+ 100/(menuLength+1) +'%;'"
                            @click="addMainMenu">
                            <div class="flex-align-justify wrap-menu-content">
                              <i class="el-icon-plus"></i>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
          <td class="valigntop">
            <div class="minHeight640 relative">
              <!-- <div v-show="noClickedMenu" class="textAlignCenter height-per100 margintop200 fontsize1 color-333">点击左侧菜单进行编辑操作</div>
              <div v-show="!noClickedMenu" class="wrap-custommenu-right"> -->
              <div v-show="rightMenuFormShow" class="wrap-custommenu-right">
                <div>
                  <header class="header-menu-edit paddingleft20 marginbottom15">
                    <div class="width100 flex-align-spacebetween">
                      <div class="width100 fontsize6 color-4a4a4a">
                        <table class="width100">
                          <tr>
                            <td valign="middle" class="paddingright30">
                              <table style="height: 50px;">
                                <tr>
                                  <td v-show="!isShowEditNameInput">
                                    <span class="lineEllipsis">{{button.name}}</span>
                                    <el-tooltip 
                                      class="item" 
                                      effect="dark" 
                                      content="点击修改菜单名称" 
                                      placement="top-start">
                                      <i 
                                        v-show="!(button.p == 0 && button.sub_button && button.sub_button.length>0)"
                                        class="el-icon-edit cursorPointer" 
                                        @click="toggleEditNameInput"></i>
                                    </el-tooltip>
                                  </td>
                                  <td
                                    v-show="isShowEditNameInput">
                                    <el-form :rules="rules" :model="button">
                                      <el-form-item prop="name">
                                        <el-input 
                                          ref="editNameInput"
                                          v-model="button.name" 
                                          :placeholder="button.p == 0 ? '字数不超过4个汉字或8个字母' : '字数不超过7个汉字或14个字母'" 
                                          class="input-menu"
                                          @blur="blurName(button.name)"></el-input>
                                      </el-form-item>
                                    </el-form>
                                  </td>
                                  <td>
                                    <span class="fontsize0 color-999 marginleft30 nowrap" v-show="menuHasSub">已添加子菜单，仅可设置菜单名称</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td align="right" valign="middle">
                              <el-button 
                                type="text"
                                v-show="button.p==0"
                                class="widthInitial" 
                                @click="deleteMenu">删除菜单</el-button>
                              <el-button 
                                type="text" 
                                v-show="button.p==1" 
                                class="widthInitial" 
                                @click="deleteMenu">删除子菜单</el-button>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </header>
                  <section class="paddingleft20" v-if="button">
                    <el-form  
                      :model="button" 
                      :rules="rules" 
                      ref="button" 
                      label-width="100px" 
                      label-position="left">
                      <el-form-item v-show="button.p==0 && button.sub_button && button.sub_button.length>0"
                        :label="button.p==0?'菜单名称':'子菜单名称'" prop="name">
                        <el-input v-model="button.name" :placeholder="button.p==0?'输入菜单名称':'输入子菜单名称'" class="input-menu">
                        </el-input>
                        <p class="entryTip" v-text="button.p == 0 ? '字数不超过4个汉字或8个字母' : '字数不超过7个汉字或14个字母'"></p>
                      </el-form-item>
                      <el-form-item v-show="button.type !=null && (!button.sub_button || button.sub_button.length==0)" :label="button.p==0?'菜单内容':'子菜单内容'" prop="type">
                        <el-radio-group v-model="button.type" @change="defaultRadio">
                          <el-radio :label="'view1'">跳转应用</el-radio>
                          <el-radio :label="'click'">图文消息</el-radio>
                          <el-radio :label="'view2'">自定义跳转页面</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <!-- START 跳转应用 -->
                      <el-card 
                        v-if="button.type == 'view1'" 
                        class="box-card borderRadius0 no-card-header" 
                        shadow="never">
                        <el-form :rules="rules" ref="">
                          <el-form-item label="选择应用">
                            <el-select 
                              v-model="button.url1" 
                              clearable 
                              placeholder="请选择"
                              @change="applicChange(button.url1)">
                              <el-option 
                                v-for="(item,index) in serviceHrefOptions" 
                                :key="index" 
                                :label="item.applicationName"
                                :value="item.applicationUrl">
                              </el-option>
                            </el-select>
                            <!-- <div class="entryTip marginleft80 whitespace-normal width-per80">{{button.url}}</div> -->
                          </el-form-item>
                          <el-form-item label="应用展示">
                            <div class="textAlignCenter margintop30 marginleft50 paddingbottom30 maxWidth300">
                              <div 
                                v-if="button.url1"
                                class="img-applic">
                                <img v-if="selectedApplicImg != ''" :src="selectedApplicImg" />
                                  <div 
                                    v-else 
                                    class="textAlignCenter marginbottom10">
                                    <div class="inlineBlock icon-applic-notice"></div>
                                    <p>暂无应用展示图</p>
                                  </div>
                              </div>
                              <div 
                                v-else 
                                class="marginbottom10">
                                <div class="inlineBlock icon-applic-notice"></div>
                                <p>请选择应用列表</p>
                                <p>
                                  或者
                                  <el-button 
                                    type="text" 
                                    class="widthInitial text-underline color-4297F6"
                                    @click="toApplicCenter">前往应用中心</el-button>，看看吧~
                                </p>
                              </div>
                            </div>
                          </el-form-item>
                        </el-form>
                      </el-card>
                      <!-- END 跳转应用 -->
                      <!-- START 图文消息 -->
                      <el-card v-show="button.type == 'click'" class="box-card borderRadius0" shadow="never">
                        <div slot="header" class="clearfix">
                          <div class="flex-align-justifystart">
                            <!-- <div class="flex-align-justifystart cursorPointer" @click="showMenuEditPanel('text')">
                              <i class="menutype txt"></i>
                              <span>文字</span>
                            </div> -->
                            <div 
                              class="flex-align-justifystart cursorPointer" 
                              :class="editImgtextModuleShow?'activeTab':''"
                              @click="showMenuEditPanel('textimg')">
                              <i class="menutype textimg"></i>
                              <span>图文消息</span>
                            </div>
                            <div 
                              class="flex-align-justifystart cursorPointer marginleft50" 
                              :class="editTextModuleShow?'activeTab':''"
                              @click="showMenuEditPanel('text')">
                              <i class="menutype txt"></i>
                              <span>文字</span>
                            </div>
                            <div 
                              class="flex-align-justifystart cursorPointer marginleft50" 
                              :class="editImgModuleShow?'activeTab':''"
                              @click="showMenuEditPanel('img')">
                              <i class="menutype img"></i>
                              <span>图片</span>
                            </div>
                            <!-- <div class="flex-align-justifystart cursorPointer marginleft50" @click="showMenuEditPanel('audio')">
                              <i class="menutype audio"></i>
                              <span>语音</span>
                            </div>
                            <div class="flex-align-justifystart cursorPointer marginleft50" @click="showMenuEditPanel('video')">
                              <i class="menutype video"></i>
                              <span>视频</span>
                            </div> -->
                          </div>
                        </div>
                        <div class="wrap-editmenu">
                          <!-- 图文消息编辑区域 -->
                          <div v-show="editImgtextModuleShow">
                            <div class="fontsize0 color-666 paddingX20 padding20X">
                              <div 
                                class="inlineBlock cursorPointer borderRadius4 textAlignCenter wrap-imgtext-tool"
                                @click="openImageTextDlg">
                                <i class="el-icon-plus fontsize30 color-999"></i>
                                <p class="margintop10">从素材库中选择</p>
                              </div>
                              <div v-if="selectedImageText.list && selectedImageText.list.length>0" class="inlineBlock wrap-selected-imagetext">
                                <!-- 图文消息head部分 -->
                                <div v-if="selectedImageText.list[0]" class="imgHead">
                                    <img :src="selectedImageText.list[0].thumbUrl">
                                    <div class="imgTitle">{{selectedImageText.list[0].title}}</div>
                                </div>
                                <div class="content" v-for="(item2,index2) in selectedImageText.list.slice(1, selectedImageText.list.length)" :key="index2">
                                    <span class="contentTitle paddingright10">{{item2.title}}</span>
                                    <span class="imgBody"><img :src="item2.thumbUrl"></span>
                                </div>
                              </div>
                              <!-- <div class="flex-align-justify-column cursorPointer borderRadius4 marginleft15 wrap-imgtext-tool">
                                <i class="el-icon-plus fontsize30 color-999"></i>
                                <p class="margintop10">新建图文消息</p>
                              </div> -->
                            </div>
                          </div>
                          <!-- 文字编辑区域 -->
                          <div v-show="editTextModuleShow">
                            <el-input 
                              v-model="editTextValue"
                              type="textarea" 
                              maxlength="600"
                              class="noborder-textarea" 
                              placeholder="请输入回复文字信息，600字以内">
                            </el-input>
                          </div>
                          <!-- 图片编辑区域 -->
                          <div v-show="editImgModuleShow" class="paddingX20 padding20X">
                            <div class="flex-align-justifystart fontsize0 color-666">
                              <div 
                                class="flex-align-justify-column cursorPointer borderRadius4 wrap-img-tool"
                                @click="openSelectImageDlg">
                                <i class="el-icon-plus fontsize30 color-999"></i>
                                <p class="margintop10">从素材库中选择</p>
                              </div>
                              <div
                                v-if="selectImage.url"
                                class="relative wrap-select-img">
                                  <div
                                    class="absolute textAlignCenter cursorPointer width100 displayNone selectedImgTool">
                                      <i 
                                        class="el-icon-zoom-in color-white"
                                        @click="showLargeImg(selectImage.url)"></i>
                                      <i 
                                        class="el-icon-delete color-white marginleft5"
                                        @click="deleteImg"></i>
                                  </div>
                                  <img :src="selectImage.url" class="width100" alt="组织机构代码证明证件">
                                  <div class="fontsize0 lineEllipsis paddingX10 title-select-img">{{ selectImage.title }}</div>
                              </div>
                              <!-- <div class="flex-align-justify-column cursorPointer borderRadius4 marginleft15 wrap-imgtext-tool">
                                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                                  :limit="1" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                                  :on-progress="onUploadProcess" :on-success="handlesuccess" :before-upload="beforeAvatarUpload"
                                  :on-exceed="handleExceed" class="relative flex-align-justifystart uploadContainer">
                                  <i class="el-icon-plus fontsize30 color-999"></i>
                                  <p class="margintop10">上传图片</p>
                                </el-upload>
                                <el-dialog :visible.sync="largeImgDlgVisible">
                                  <img width="100%" :src="dialogImgViewUrl" alt="">
                                </el-dialog>
                              </div> -->
                            </div>
                          </div>
                          <!-- 音频编辑区域 -->
                          <!-- <div v-show="editAudioModuleShow">
                            <div class="flex-align-justifystart fontsize0 color-666">
                              <div class="flex-align-justify-column cursorPointer borderRadius4 wrap-imgtext-tool">
                                <i class="el-icon-plus fontsize30 color-999"></i>
                                <p class="margintop10">从素材库中选择</p>
                              </div>
                              <div class="flex-align-justify-column cursorPointer borderRadius4 marginleft15 wrap-imgtext-tool">
                                <i class="el-icon-plus fontsize30 color-999"></i>
                                <p class="margintop10">新建语音</p>
                              </div>
                            </div>
                          </div> -->
                          <!-- 视频编辑区域 -->
                          <!-- <div v-show="editVideoModuleShow">
                            <div class="flex-align-justifystart fontsize0 color-666">
                              <div class="flex-align-justify-column cursorPointer borderRadius4 wrap-imgtext-tool">
                                <i class="el-icon-plus fontsize30 color-999"></i>
                                <p class="margintop10">从素材库中选择</p>
                              </div>
                              <div class="flex-align-justify-column cursorPointer borderRadius4 marginleft15 wrap-imgtext-tool">
                                <i class="el-icon-plus fontsize30 color-999"></i>
                                <p class="margintop10">新建视频</p>
                              </div>
                            </div>
                          </div> -->
                        </div>
                      </el-card>
                      <!-- END 图文消息 -->
                      <!-- START 自定义跳转页面 -->
                      <el-card 
                        v-show="button.type == 'view2'" 
                        class="box-card borderRadius0 no-card-header" 
                        shadow="never">
                        <el-form :rules="rules" ref="hrefForm">
                          <el-form-item label="">
                            <!-- <el-radio-group v-model="chooseUrl">
                              <el-radio :label="0">
                                <div class="inlineBlock width120">可选服务页面：</div>
                                <el-select v-model="selectUrl" :disabled="chooseUrl==0?false:true" placeholder="请选择">
                                  <el-option v-for="(item,index) in serviceHrefOptions" :key="index" :label="item.applicationName"
                                    :value="item.applicationUrl">
                                  </el-option> -->
                                  <!-- <el-option label="item.applicationName"
                                    value="item.applicationId">
                                  </el-option> -->
                                <!-- </el-select>
                                <div class="entryTip marginleft152 whitespace-normal">{{selectUrl}}</div>
                              </el-radio>
                              <br>
                              <el-radio :label="1" class="custom-page"> -->
                                <p class="fontsize0 color-666">配置点击菜单跳转页面地址</p>
                                <el-form-item label="自定义页面地址：" class="legal-link">
                                  <el-input v-model="button.url2" placeholder="请输入合法页面链接" class="input-menu">
                                  </el-input>
                                </el-form-item>
                              <!-- </el-radio>
                            </el-radio-group> -->
                          </el-form-item>
                        </el-form>
                        <!-- END 自定义跳转页面 -->
                      </el-card>
                      </el-form>
                  </section>
                </div>
              </div>
              
              <div class="flex-align-justifystart marginleft44 margintop30 absolute bottom0">
                <!-- <el-button type="primary" plain @click="submitForm('menuForm')">保存</el-button> -->
                <el-button type="primary" plain @click="regainHisMenu" v-show="historyBtnShow">恢复为历史版本</el-button>
                <el-button type="primary" plain @click="previewMenu">预览</el-button>
                <!-- <el-button type="primary" plain>放弃当前修改</el-button> -->
                <el-button type="primary" @click="publishMenu" v-show="releaseBtnShow">发布</el-button>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <ImageTxt 
      v-if="isShowImageText"
      :isShowImageText="isShowImageText"
      @closeImageTextDlg="closeImageTextDlg"
      @confirmImageText="confirmImageText"
      ></ImageTxt>

    <SelectImg 
      v-if="isShowSelectImg"
      :isShowSelectImg="isShowSelectImg"
      @closeSelectImageDlg="closeSelectImageDlg"
      @confirmSelectImage="confirmSelectImage"></SelectImg>
    <!-- 查看选中图片大图 -->
    <el-dialog title="查看大图" :visible.sync="imgDlgVisible">
        <div class="textAlignCenter">
            <img class="width100" :src="button.url?button.url:''">
        </div>
    </el-dialog>
    <!-- 预览菜单弹出框 -->
    <el-dialog width="400px" class="dlg-nowrap" :visible.sync="previewMenuShow">
      <div class="dy-phone">
        <div class="dy-phone-box" style="overflow:auto;">
          <div class="dy-phone-content">
            <div class="flex-align-justify-column">
              <div class="wrap-custommenu-left textAlignCenter relative">
                <div class="color-white paddingtop20 textAlignCenter left-wxtitle">{{ wxTitle }}</div>
                <div class="width100 height50 absolute bgcolor-white fontsize1 color-333 view-custm-menu">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="8" class="flex-align-justify width53">
                      <i class="icon-keyboard"></i>
                    </el-col>
                    <el-col :span="16" class="wrap-menus height50">
                      <div class="height50">
                        <table class="height-per100" cellspacing="0" cellpadding="0">
                          <tr>
                            <td 
                              :id="'menu'+index" 
                              class="textAlignCenter"
                              v-if="menuLength > 0" 
                              v-for="(mainItem, index) in menuList"
                              :key="index" 
                              :style="'width:'+100/menuLength+'%;'">
                              <div class="relative">
                                <div class="width100 cursorPointer lineEllipsis marginleft-1 wrap-menu-content"
                                  @click="previewMenuClick(index, mainItem)">
                                  <i class="icon-moremenu"></i>
                                  <span class="lineEllipsis">{{ mainItem.name }}</span>
                                </div>
                                <section :id="'submenu_dlg'+index" class="width100 absolute bgcolor-white displayNone wrap-submenu-list">
                                  <ul>
                                    <li v-if="mainItem.sub_button && mainItem.sub_button.length>0" v-for="(subItem, subIndex) in mainItem.sub_button"
                                      :key="subIndex" class="submenu-list-item cursorPointer"
                                      :id="'submenu'+index+subIndex" :class="'clickedMenu'+index+subIndex">
                                      <div class="lineEllipsis">{{ subItem.name ? subItem.name:"子菜单名称" }}</div>
                                    </li>
                                  </ul>
                                </section>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 恢复历史版本 -->
    <!-- 预览菜单弹出框 -->
    <el-dialog title="恢复为历史版本" width="800px" :visible.sync="regainHisMenuShow">
      <div class="line-e7e7e7"></div>
      <p class="fontsize0 color-333 marginbottom15">
        显示文件范围：最近
        <el-input type="tel" v-model="hisDataCount" class="hisInput">
        </el-input>
        条
        <span class="marginleft38">仅将历史版本菜单数据恢复至编辑状态，需要发布后同步线上版本</span>
      </p>
      <el-table :data="hisMenuData" class="width100" height="350" highlight-current-row @current-change="selectedHisMenuChange">
        <el-table-column prop="createdon" label="自动备份日期/时间"></el-table-column>
        <el-table-column property="releaseComment" label="发布操作者"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="regainHisMenuShow = false">取 消</el-button>
        <el-button type="primary" @click="regainConfirm">恢复</el-button>
      </span>
    </el-dialog>
    <!-- 发布结果 operateResult为true，显示发布结果；false不显示发布结果 -->
    <OperationResult v-show="operateResult" :operateSuccess="operateSuccess" @successBack="successBack" @publishAgain="publishAgain"></OperationResult>
  </div>
</template>

<script>
  import OperationResult from '../../components/operationResult'
  import ImageTxt from '../../components/imageTxt'
  import SelectImg from '../../components/selectImg'
  import draggable from 'vuedraggable'
  import { Loading } from 'element-ui';
  import {mapState, mapGetters} from 'vuex'
  import fecha from 'fecha'
  import { setTimeout } from 'timers';
  import { getMenuKeyApi } from '@/service/wechat'
  export default {
    computed: {
      ...mapState({
        // menuList:state=>JSON.parse(JSON.stringify(state.wechat.menuConfigInfo)).button,
        hisMenuData: state => state.wechat.wechatMenuHistoryList,
        serviceHrefOptions: state => state.application.serviceHrefOptions
      }),
      ...mapGetters({moduleper:'moduleper'}),
    },
    data() {
      var validateSubmenuName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入子菜单名称'));
        }
        return callback();
      };

      let validateName = (rule, value, callback) => {
        //获取输入框字节长度 （采取将255以外的字符替换成"aa"的做法，取长度）
        function getByteLength(str) {
          return str.replace(/[^\x00-\xff]/g,"aa").length;
        } 

        let length = this.button.p == 0 ? 8 : 14
        // let errorMsg = this.button.p == 0 ? 8 : 14
        if(getByteLength(value) > length) {
          this.nameValid = false;
          callback(new Error(`不超过${length / 2}个汉字或${length}个字母`))
        }
        this.nameValid = true;
        callback()
      }
      return {
        loadingMenu: true,
        imgDlgVisible: false,
        nameValid: true,  // 菜单名验证是否通过
        // customUrl: '',
        // selectUrl: '',
        // chooseUrl: 0,
        menuList: [],
        // START-------- 发布结果
        operateResult: false, // 是否显示发布结果页
        operateSuccess: true, // 发布是否成功 成功true，失败false
        // END-------- 发布结果
        rightMenuFormShow: false, // 右侧表单区域是否显示
        // noClickedMenu: true, // 刚进入页面，未点击菜单，右侧不显示表单内容
        menuHasSub: false, // 编辑主菜单时，标题后面的提示‘已添加子菜单，仅可设置菜单名称’是否显示

        hasMenuChange: false, // 标记菜单是否有更改
        wxTitle: '', // 左侧微信顶部标题
        menuLength: 0,
        sortnoticeShow: false, // 菜单拖拽排序提示显示
        sortNoticeBottom: 70, // 排序提示定位的bottom值

        // submenuFormShow: false, // 子菜单编辑表单
        // menuFormShow: true, // 主菜单编辑表单
        
        // 跳转应用
        isShowEditNameInput: false,

        editImgtextModuleShow: true, // 图文消息编辑区域
        editTextModuleShow: false, // 文字编辑区域
        editImgModuleShow: false, // 图片编辑区域
        editAudioModuleShow: false, // 音频编辑区域
        editVideoModuleShow: false, // 视频编辑区域
        editTextValue: '',  // 图文中的文字
        menuSort: false, //是否默认菜单序列
        menuConTypeMsgShow: true, // 菜单内容‘发送消息’编辑区域是否显示
        // 子菜单 图片 编辑
        dialogImgViewUrl: '',
        largeImgDlgVisible: false,
        // 选择图片、图文弹出框
        isShowImageText: false,
        isShowSelectImg: false,

        // 图文消息数据
        selectedImageText: {},
        selectImage: {
          url: '',
          title: ''
        },

        // 预览菜单弹窗显示
        previewMenuShow: false,
        // 恢复历史版本弹窗显示
        regainHisMenuShow: false,
        hisDataCount: 10, //历史版本 显示文件范围
        // 菜单历史版本数据
        selectedHisMenuRow: null, // 弹出框选中的历史版本
        selectedApplicImg: '',  // 跳转应用，选中的应用的图片地址
        button: {
          // name: '子菜单名称',
          // type: 'view',
          // url: '',
          // key: '',
          // p: 0,
          // value: '',
          // valueType: '',
          // editMenuIndex: 0, // 当前编辑的主菜单序号
          // editSubmenuIndex: 0
        },
        rules: {
          editSubmenuName: [{
            validator: validateSubmenuName,
            trigger: 'blur'
          }],
          name: [
             { required: true, message: '请输入子菜单名称', trigger: 'blur' },
             { maxlength: 14, message: '不超过7个汉字或14个字母', trigger: 'blur' },
             { validator: validateName, trigger: 'blur' },
          ],
          url: [
            { required: true, message: '请输入合法页面链接', trigger: 'blur' }
            // { validator: validateCustomUrl, trigger: 'blur'}
          ]
        },
        //权限控制
        historyBtnShow:false,
        releaseBtnShow:false,
      }
    },
    async mounted() {
      // let loadingMenu = Loading.service();
      this.Jurisdiction();
      await this.$store.dispatch({
        type: 'wechatInfo'
      })
      //console.log("this.$store.getters.wechatInfo", this.$store.getters.wechatInfo)
      this.wxTitle = this.$store.getters.wechatInfo.nickName
      await this.$store.dispatch({
        type: 'wxMenuConfig'
      }).then(() => {
        // loadingMenu.close();
        this.loadingMenu = false;
        this.menuList = JSON.parse(JSON.stringify(this.$store.getters.menuConfigInfo)).button;
        this.menuLength = this.menuList ? this.menuList.length : 0;
        switch(this.menuLength) {
          case 0:
            this.rightMenuFormShow = false;
            break;
          default:
            // START---有一级菜单的话，初始化右侧表单内容为第一个主菜单的信息
            this.rightMenuFormShow = true;
            // this.initMenuRightForm(0);
            let menuItem0 = this.menuList[0];
            this.$nextTick(() => {
              document.getElementById('menu0').style.border = '1px solid #35bf35';
            })
            if (menuItem0.sub_button && menuItem0.sub_button.length > 0) {
              // 有子菜单的话，主菜单右侧编辑区域只能修改主菜单名称
              this.menuHasSub = true;
            } else {
              this.menuHasSub = false;
            }
            this.button = menuItem0;
            this.button.p = 0;
            this.button.editMenuIndex = 0
            this.defaultRadio();
            // END---初始化右侧表单内容为第一个主菜单的信息
            break;
        }
      });
      await this.$store.dispatch({
        type: 'serviceHrefOptionsWx',
        req: {
          platformHospitalId: JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId
        }
      })
      // console.log('applicationUrl ', this.serviceHrefOptions)
      // 拖拽排序
      this.$dragging.$on('dragged', ({ value }) => {
        //console.log('开始拖拽');
      })
      this.$dragging.$on('dragend', () => {
        //console.log('拖拽结束');
        // //console.log(JSON.stringify(this.menuList[2].sub_button));  
      })
      //console.log('菜单数据：', this.menuList);
    },
    components: {
      OperationResult,
      draggable,
      ImageTxt,
      SelectImg
    },
    // 组件内导航钩子，处理表单未保存退出的情况
    beforeRouteLeave: function (to, from, next) {
      if (this.hasMenuChange) {
        next(false)
        setTimeout(()=>{
          this.$confirm('系统将不会保存您所做的更改，确定要离开此页吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 选择确定
            next()
          })
        }, 20)
      } else {
        next()
      }
    },
    methods: {
      Jurisdiction(){
        //权限控制
        // //console.log('jinlai',this.moduleper)
        if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
          this.moduleper.map(item=>{
            item.children.map(item2=>{
              if(item2.feature_id==351013){//"发布自定义菜单"
                this.releaseBtnShow=true;
              }else if(item2.feature_id==351012){//"恢复为历史版本"
                this.historyBtnShow=true;
              }

            })
          })
        }
      },
      // 前往应用中心
      toApplicCenter() {
        this.$router.push('/serviceCenter/serCenIndex');
      },
      // 跳转应用
      applicChange(applicUrl) {
        this.button.url = applicUrl;
        let selectedApplic = this.serviceHrefOptions.filter((item) => {
          return item.applicationUrl == applicUrl
        });
        if(selectedApplic[0]) {
          this.button.name = selectedApplic[0].applicationName;
          this.selectedApplicImg = selectedApplic[0].imageUrl;
        }
      },
      // 图文消息
      // 打开图文选择窗口
      openImageTextDlg() {
        //修改meta中的值让微信微信公众平台图片显示
        let i = document.querySelector('meta[name="referrer"]');
        i.content = 'never';
        //console.log(i[1].content,'meta')
        this.isShowImageText = true;
      },
      // 关闭图文选择窗口
      closeImageTextDlg() {
        this.isShowImageText = false;
      },
      // 确认图文选择
      confirmImageText(payload) {
        this.isShowImageText = false;
        this.selectedImageText = payload.imageTextData;
        this.button.value = this.selectedImageText.list[0].mediaId;
        this.button.news_info = this.selectedImageText.list;
        // console.log('主页面得到的选中的图文是：', this.selectedImageText.list);
      },
      // 打开图片选择窗口
      openSelectImageDlg() {
        //修改meta中的值让微信微信公众平台图片显示
        let i = document.getElementsByTagName("meta");
        i[1].content = "never";
        this.isShowSelectImg = true;
      },
      // 关闭图片选择窗口
      closeSelectImageDlg() {
        this.isShowSelectImg = false;
      },
      // 确认图片选择
      confirmSelectImage(payload) {
        this.isShowSelectImg = false;
        console.log('主页面得到的选中的图片是：', payload.selectImageData);
        this.selectImage.title = payload.selectImageData.title;
        this.selectImage.url = payload.selectImageData.url;

        this.button.title = payload.selectImageData.title;
        this.button.url = payload.selectImageData.url;
        this.button.value = payload.selectImageData.mediaId;
      },
      // 放大图片
      showLargeImg() {
        this.imgDlgVisible = true;
      },
      // 删除图片
      deleteImg() {
        this.selectImage.title = '';
        this.selectImage.url = '';
        this.button.value = '';
      },
      // 切换显示修改菜单名的输入框
      toggleEditNameInput() {
        
        this.isShowEditNameInput = !this.isShowEditNameInput;
        this.$nextTick(() => {
          if(this.isShowEditNameInput) {
            this.$refs['editNameInput'].focus();
          }
        })
      },
      // 验证菜单名
      blurName(name) {
        //获取输入框字节长度 （采取将255以外的字符替换成"aa"的做法，取长度）
        function getByteLength(str) {
          return str.replace(/[^\x00-\xff]/g,"aa").length;
        } 
        let length = this.button.p == 0 ? 8 : 14
        // let errorMsg = this.button.p == 0 ? 8 : 14
        if(getByteLength(name) > length) {
          this.$alert(`不超过${length / 2}个汉字或${length}个字母`, '提示');
          return false;
        }
        this.isShowEditNameInput = !this.isShowEditNameInput;
      },
      dateFormater: function(row, column, cellValue){
        return cellValue ? fecha.format(new Date(cellValue), 'YYYY-MM-DD hh:mm') : '';
      },
      // 拖拽排序
      // 关闭排序提示
      closeSortNotice() {
        this.sortnoticeShow = false;
      },
      // 添加一级菜单
      addMainMenu() {
        // this.noClickedMenu = false;
        this.hasMenuChange = true;
        this.button = {
          name: '菜单名称',
          type: 'view1',
          url: '',
          key: '',
          p: 0,
          title: '',
          value: '',
          valueType: '',
          news_info: [],
          sub_button: [],
          editMenuIndex: this.menuLength, // 当前编辑的主菜单序号
          editSubmenuIndex: 0, // 当前编辑的子菜单序号 
        }
        this.defaultRadio();
        this.menuList ? this.menuList.push(this.button) : this.menuList = [this.button];
        this.menuLength = this.menuLength + 1;
        this.menuHasSub = false;
      },
      // 一级菜单点击事件
      menuClick(index, item) {
        // this.noClickedMenu = false;
        this.hasMenuChange = true;
        // console.log("menuClick" + index, this.button);

        for (let i = 0; i < this.menuList.length; i++) {
          document.getElementById('menu' + i).style.border = 'none';
        }
        this.removeSubmenuBorder(index);
        document.getElementById('menu' + index).style.border = '1px solid #35bf35';

        if (this.menuList[index].sub_button && this.menuList[index].sub_button.length > 0) {
          // 有子菜单的话，主菜单右侧编辑区域只能修改主菜单名称
          this.menuHasSub = true;
        } else {
          this.menuHasSub = false;
        }

        this.button = item;
        this.button.p = 0;
        this.button.editMenuIndex = index
        let _thissubmenu = document.getElementById('submenu' + index);
        this.defaultRadio();
        for (var i = 0; i < this.menuLength; i++) {
          if (i != index) {
            document.getElementById('submenu' + i).style.display = "none";
            this.sortNoticeBottom = 70;
          }
        }
        //console.log(_thissubmenu.style.display);
        switch (_thissubmenu.style.display) {
          case 'block':
            _thissubmenu.style.display = "none";
            if (index == 0) {
              this.sortNoticeBottom = 70;
            }
            break;
          case 'none':
            _thissubmenu.style.display = "block";
            if (index == 0) {
              let sublen = this.menuList[0].sub_button.length;
              //console.log(sublen, sublen < 5 ? (sublen + 1) * 40 : sublen * 40);
              this.sortNoticeBottom = 80 + (sublen < 5 ? (sublen + 1) * 40 : sublen * 40)
            }
            break;
          case '':
            _thissubmenu.style.display = "block";
            if (index == 0) {
              let sublen = this.menuList[0].sub_button.length;
              this.sortNoticeBottom = 80 + (sublen < 5 ? (sublen + 1) * 40 : sublen * 40)
            }
            break;
        }
      },
      // 子菜单点击事件，点击后右侧表单内容更新为当前子菜单信息
      submenuItemClick(index, subItem, subIndex) {
        console.log('子菜单数据：', subItem);
        this.menuHasSub = false;
        // this.noClickedMenu = false;
        this.hasMenuChange = true;

        this.menuList[index].type = null;
        this.removeSubmenuBorder(index);
        document.getElementById('submenu' + index + '0').style.borderTop = '1px solid #cecece';
        document.getElementById('submenu' + index + subIndex).style.border = '1px solid #35bf35';
        // console.log('当前二级菜单：', subItem)
        // 
        this.button = subItem
        this.button.p = 1;
        this.button.editMenuIndex = index; // 记录当前编辑的主菜单的序号
        this.button.editSubmenuIndex = subIndex; // 记录当前编辑的子菜单的序号
        this.defaultRadio();

      },
      // 清除序号为index的主菜单下的子菜单的高亮
      removeSubmenuBorder(index) {
        if(this.menuList[index].sub_button) {
          let currentSubMenuLen = this.menuList[index].sub_button.length; // 当前主菜单下子菜单的个数
          //console.log('子菜单长度：', currentSubMenuLen);
          for (let i = 0; i < currentSubMenuLen; i++) {
            document.getElementById('submenu' + index + i).style.borderColor = '#cecece';
            document.getElementById('submenu' + index + i).style.borderTop = '1px solid transparent';
            document.getElementById('submenu' + index + i).style.borderBottom = '1px solid transparent';
          }
        }
      },
      // 添加子菜单
      addSubmenu(index) {
        // this.noClickedMenu = false;
        this.hasMenuChange = true;
        let curMainMenu = this.menuList[index];
        let defaultButton = {
          name: '子菜单名称',
          type: 'view1',
          url: '',
          key: '',
          p: 1,
          title: '',
          value: '',
          valueType: '',
          news_info: [],
          editMenuIndex: index, // 当前编辑的主菜单序号
          editSubmenuIndex: this.menuList[index].sub_button ? this.menuList[index].sub_button.length : 0, // 当前编辑的子菜单序号 
        }
        this.menuList[index].type = null;
        if (curMainMenu.url || curMainMenu.key) {
          this.$confirm('此操作将清除主菜单的配置信息，请确认', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.menuList[index].url = '';
            this.menuList[index].key = '';
            this.button = defaultButton;
            this.defaultRadio();
            this.menuList[index].sub_button ? this.menuList[index].sub_button.push(this.button) : this.menuList[
              index].sub_button = [this.button];
            if (this.menuList[index].sub_button == 5) {
              document.getElementById('submenuAdd' + index).style.display = "none";
            }
          }).catch(() => {
            return false
          });
        } else {
          this.button = defaultButton;
          this.defaultRadio();
          this.menuList[index].sub_button ? this.menuList[index].sub_button.push(this.button) : this.menuList[index].sub_button = [
            this.button
          ];
          if (this.menuList[index].sub_button == 5) {
            document.getElementById('submenuAdd' + index).style.display = "none";
          }
        }


      },
      // 右侧子菜单 图文/文字/图片/音频/视频 点击事件
      showMenuEditPanel(menutype) {
        var self = this;
        this.editImgtextModuleShow = false;
        this.editTextModuleShow = false;
        this.editImgModuleShow = false;
        this.editAudioModuleShow = false;
        this.editVideoModuleShow = false;
        switch (menutype) {
          case 'textimg':
            this.editImgtextModuleShow = true;
            this.button.valueType = 'news';
            break;
          case 'text':
            this.editTextModuleShow = true;
            this.button.valueType = 'text';
            break;
          case 'img':
            this.editImgModuleShow = true;
            this.button.valueType = 'image';
            break;
          // case 'audio':
          //   this.editAudioModuleShow = true;
          //   break;
          // case 'video':
          //   this.editVideoModuleShow = true;
          //   break;
        }
      },
      // START---------右侧子菜单-图片
      // 格式上传
      beforeAvatarUpload(file) {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
          this.$message.error('单个上传图片大小不能超过 20MB!');
          return false;
        }
        if (isImg) {
          return true;
        } else {
          this.$alert('请上传pdf，jpg，jpeg，png，doc，docx，xls，xlsx，txt格式的文件', '提示');
          return false;
        }
      },
      handleRemove(file, fileList) {
        //console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImgViewUrl = file.url;
        this.largeImgDlgVisible = true;
      },
      onUploadProcess() {
        var self = this;
        self.isUploadDisabled = true;
      },
      handlesuccess(file, fileList, res) {
        var self = this;
        self.isUploadDisabled = false;
        //console.log('地址', file);
        self.fileurlarr.push({
          name: fileList.name,
          url: file.extra.url,
          size: fileList.size
        });
        self.fileUrl.push(file.extra.url);
        ////console.log('uploadPC:'+self.fileurlarr);
        //console.log(self.fileUrl);
      },
      handleExceed(files, fileList) {
        // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // END------------右侧子菜单-图片
      // 本地保存当前编辑的子菜单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log('submit!');
            // menuForm: {
            //      editMenuIndex: 0,   // 当前编辑的主菜单序号
            //      editSubmenuIndex: 0,    // 当前编辑的子菜单序号
            //      editSubmenuName: '',    // 当前编辑的子菜单名称
            //      submenuContentType: '', // 当前编辑的子菜单类型
            //      submenuContent: 0,  // 当前编辑的子菜单内容
            // }
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      // 预览菜单
      previewMenu() {
        this.previewMenuShow = true;
      },
      // 预览菜单窗口中主菜单点击显示子菜单
      previewMenuClick(index, item) {
        let _thissubmenu = document.getElementById('submenu_dlg' + index);
        for (var i = 0; i < this.menuLength; i++) {
          if (i != index) {
            document.getElementById('submenu_dlg' + i).style.display = "none";
          }
        }
        //console.log(_thissubmenu.style.display);
        switch (_thissubmenu.style.display) {
          case 'block':
            _thissubmenu.style.display = "none";
            break;
          case 'none':
            _thissubmenu.style.display = "block";
            break;
          case '':
            _thissubmenu.style.display = "block";
            break;
        }
      },
      // 恢复历史版本
      regainHisMenu() {
        if(JSON.parse(sessionStorage.getItem("chooseOrgInfo"))) {
          this.$store.dispatch({
            type: 'wechatMenuHistory',
            req: {
              menutype: "wx",
              platformHospitalId: JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId,
              lastestCount: this.hisDataCount
            }
          }).then(() => {
            this.regainHisMenuShow = true;
            //console.log('hisMenuData', this.hisMenuData)
          });
        }
        else{
          this.$message({
            message: '请先选择机构',
            type: 'warning'
          });
        }
      },
      regainConfirm() {
        this.regainHisMenuShow = false;
        //console.log('确认恢复历史版本');
        //console.log(this.selectedHisMenuRow)
        this.menuList = JSON.parse(this.selectedHisMenuRow.menuJson).button
        // this.noClickedMenu = true; //页面右侧表单隐藏，仅显示提示
        for (let i = 0; i < this.menuLength; i++) {
          document.getElementById('submenu' + i).style.display = 'none';
        }
        this.menuLength = this.menuList.length;
      },
      // 历史版本表格选择行事件
      selectedHisMenuChange(val) {
        //console.log(val);
        this.selectedHisMenuRow = val;
      },
      // 发布
      publishMenu() {
        //console.log("publishMenu", this.menuList)
        if (this.button && this.button.type == null) {
          this.$alert('请选择子菜单内容', '提示', {
            confirmButtonText: '确定',
          })
          return false;
        }
        // switch(this.chooseUrl) {
        //   case 0:
        //     if(this.button.type=='view' && this.selectUrl == '') {
        //       this.$alert('请选择可选服务页面地址', '提示', {
        //         confirmButtonText: '确定',
        //       })
        //       return false;
        //     }
        //     break;
        //   case 1:
        //     if(this.button.type=='view' &&this.customUrl == '') {
        //       this.$alert('请输入自定义页面地址', '提示', {
        //         confirmButtonText: '确定',
        //       })
        //       return false;
        //     }
        //     break;
        // }
        this.$refs['button'].validate((valid) => {
          if(!valid) {
            //console.log('error submit')
            return false
          } else if (this.button.type=='view' && !this.button.url) {
            this.$message.error('请输入自定义页面地址')
            return false
          }
        if(JSON.parse(sessionStorage.getItem("chooseOrgInfo"))) {
          
          console.log('发布前菜单数据：', this.menuList);
          // 将view1和view2替换为view
          if(this.menuList.length > 0) {
            this.menuList.forEach((item) => {
              if(item.type == 'view1' || item.type == 'view2') {
                item.type = 'view';
              }
              if(item.sub_button && item.sub_button.length > 0) {
                item.sub_button.forEach((item2) => {
                  if(item2.type == 'view1' || item2.type == 'view2') {
                    item2.type = 'view';
                  }
                });
              }
            });
          }
          let menu = {
            menuJson: {
              button: this.menuList
            },
            menutype: "wx",
            platformHospitalId: JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId
          }
          this.$store.dispatch({
            type: 'configWxMenu',
            menu: menu
          }).then((d) => {
            this.defaultRadio();
            if (d.hasOwnProperty('data') && d.data.success) {
              // Message.success("配置成功")
              this.operateResult = true;
              this.operateSuccess = true;
            } else {
              this.$message.error(d.data.errmsg)
            }
          }).catch(() => {
            this.defaultRadio();
            this.operateResult = false
          })
        }
        else{
          this.$message({
            message: '请先选择机构',
            type: 'warning'
          });
        }
        })
      },
      // 初始化子菜单右侧表单内容
      initSubmenuRightForm(meunIndex, subMenuIndex) {
        let subItem = this.menuList[meunIndex].sub_button[subMenuIndex];
        this.menuList[meunIndex].type = null;
        this.removeSubmenuBorder(meunIndex);
        document.getElementById('submenu' + meunIndex + '0').style.borderTop = '1px solid #cecece';
        document.getElementById('submenu' + meunIndex + subMenuIndex).style.border = '1px solid #35bf35';
        // 
        this.button = subItem
        this.button.p = 1;
        this.button.editMenuIndex = meunIndex; // 记录当前编辑的主菜单的序号
        this.button.editSubmenuIndex = subMenuIndex; // 记录当前编辑的子菜单的序号
        this.defaultRadio();
      },
      // 初始化主菜单右侧表单内容
      initMenuRightForm(meunIndex) {
        let menuItem = this.menuList[meunIndex];
        this.removeSubmenuBorder(meunIndex);
        for (let i = 0; i < this.menuList.length; i++) {
          document.getElementById('menu' + i).style.border = 'none';
        }
        document.getElementById('menu' + meunIndex).style.border = '1px solid #35bf35';
        if (menuItem.sub_button && menuItem.sub_button.length > 0) {
          // 有子菜单的话，主菜单右侧编辑区域只能修改主菜单名称
          this.menuHasSub = true;
        } else {
          this.menuHasSub = false;
        }
        this.button = menuItem;
        this.button.p = 0;
        this.button.editMenuIndex = meunIndex
        this.defaultRadio();
      },
      // 删除菜单后，设置接着高亮的菜单项，以及右侧表单显示高亮菜单项的内容
      initHighlightMenu(meunIndex, subMenuIndex) {
        // meunIndex, subMenuIndex（代表被删除的主菜单编号，或被删除的某个主菜单下的子菜单编号）
        switch(subMenuIndex) {
          case -1:
            // 删除的主菜单
            if(this.menuLength > 0) {
              // 删除的是否是最后一个主菜单
              if(meunIndex==this.menuLength) {
                // 是 删除的最后一个主菜单，删除后设置第一个主菜单高亮
                this.initMenuRightForm(0);
              }else {
                // 否 删除的不是最后一个主菜单，则初始化右侧表单内容为下一项主菜单的内容
                this.initMenuRightForm(meunIndex);
              }
            }else {
              // 主菜单全部被删除的话，右侧表单隐藏
              this.rightMenuFormShow = false;
            }
            break;
          default:
            let subMenuLength = this.menuList[meunIndex].sub_button.length;
            // 删除的子菜单
            if(subMenuLength > 0) {
              // 此主菜单下的子菜单还有余项
                // 删除的子菜单是否是最后一项
                if(subMenuIndex == subMenuLength) {
                  // 是最后一项，则设置第一个此主菜单下的第一个子菜单高亮
                  this.initSubmenuRightForm(meunIndex, 0);
                }else {
                  // 否，不是最后一项，则初始化右侧表单内容为下一项子菜单的内容
                  this.initSubmenuRightForm(meunIndex, subMenuIndex);
                }
            }else {
              // 此主菜单下的子菜单已全部删除，高亮定位到第一个主菜单
              this.initMenuRightForm(0);
            }
            break;
        }
      },
      deleteMenu() {
        this.hasMenuChange = true;
        //console.log("deleteMenu:", this.button);

        let meunIndex = this.button.editMenuIndex;
        let subMenuIndex = this.button.editSubmenuIndex;
        if (this.button.p == 0) {
          // TODO  弹出提示，是否删除主菜单（包含子菜单）
          this.$confirm('是否确认删除该菜单（包含子菜单）?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.menuList.splice(meunIndex, 1);
            this.menuLength = this.menuLength - 1;
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除的主菜单，初始化高亮
            if(this.menuLength > 0) {
              this.initHighlightMenu(meunIndex, -1);
            }
          })
        } else {
          // TODO  删除子菜单
          this.$confirm('是否确认删除该菜单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.menuList[meunIndex].sub_button.splice(subMenuIndex, 1);
            if(this.menuList[meunIndex].sub_button.length == 0) {
              //console.log('全删完了');
              this.menuList[meunIndex].type='view1';
            }
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除的子菜单，初始化高亮
            this.initHighlightMenu(meunIndex, subMenuIndex);
          })
        }
      },
      // START---------发布结果按钮点击事件
      successBack() {
        //console.log('发布成功返回');
        this.operateResult = false;
        // 发布成功后需要刷新页面，mounted中的初始化代码需要再执行一下
        // await this.$store.dispatch({type:'wechatInfo'})
        // //console.log("this.$store.getters.wechatInfo",this.$store.getters.wechatInfo)
        // this.wxTitle = this.$store.getters.wechatInfo.nickName
        // await this.$store.dispatch({type:'wxMenuConfig'}).then(()=>{
        //     this.menuLength =this.menuList? this.menuList.length:0;
        // }); 
      },
      publishAgain() {
        //console.log('重新发布');
        this.operateResult = false;
        // 重新发布，不需要刷新页面，因为要保留页面填写的信息
      },
      // END---------发布结果按钮点击事件

      defaultRadio() {
        switch(this.button.type) {
          // 图文消息
          case 'click':
            if(!this.button.key || this.button.key == '') {
              // 新增的菜单，需要获取图文消息key
              getMenuKeyApi().then((res) => {
                if(res && res.hasOwnProperty('data')) {
                  this.button.key = res.data;
                }
              });
              this.button.valueType = 'news'; // 初始化类型为‘图文’三中类型分别为 news  image  text
            }
            else {
              this.editTextValue = '';
              this.selectedImageText.list = [];
              this.selectImage = {
                url: '',
                title: ''
              };
              
              switch (this.button.valueType) {
                case 'news':
                  this.editImgtextModuleShow = true;
                  this.editTextModuleShow = false;
                  this.editImgModuleShow = false;
                  this.selectedImageText.list = this.button.news_info;
                  break;
                case 'text':
                  this.editTextModuleShow = true;
                  this.editImgtextModuleShow = false;
                  this.editImgModuleShow = false;
                  if(this.button.value) {
                    this.editTextValue = this.button.value;
                  }
                  break;
                case 'image':
                  this.editImgModuleShow = true;
                  this.editTextModuleShow = false;
                  this.editImgtextModuleShow = false;
                  if(this.button.title && this.button.title != '') {
                    this.selectImage.url = this.button.url;
                    this.selectImage.title = this.button.title;
                  }
                  break;
              }
            }
            break;
          // 跳转应用 、自定义跳转页面
          case 'view':
            if(this.button.valueType == 'view') {
              this.button.valueType = 'news';
            }
            if (this.serviceHrefOptions) {
              let tmp = this.serviceHrefOptions.find((item) => {
                return this.button.url == item.applicationUrl 
              })
              //console.log('tmp', tmp)
              if (tmp) {
                // 跳转应用
                this.button.type = 'view1';
                this.selectedApplicImg = tmp.imageUrl;
                if(this.button.url1) {
                  this.button.url = this.button.url1;
                }
                else {
                  this.button.url1 = this.button.url;
                }
                //设置url1 url2把跳转应用和自定义地址的两个输入框分别设置model，防止两边的值会互相影响互相同步
              } else {
                // 自定义地址
                this.button.type = 'view2';
                this.customUrl = this.button.url;
                if(this.button.url2) {
                  this.button.url = this.button.url2;
                }
                else {
                  this.button.url2 = this.button.url;
                }
              }
            }
            break;
        }
      }
    },
    watch: {
      // customUrl: function (newVal, oldVal) {
      //   this.button.url = newVal
      // },
      // selectUrl: function (newVal, oldVal) {
      //   if (this.chooseUrl == 0) {
      //     this.button.url = newVal
      //   }
      // },
      'editTextValue': function(newVal, oldVal) {
        this.button.value = newVal;
      },
      'button.url1': function(newVal, oldVal) {
        this.button.url = newVal;
      },
      'button.url2': function(newVal, oldVal) {
        this.button.url = newVal;
      },
      hisDataCount: function (newVal) {
        if (parseFloat(newVal).toString() == "NaN") {
          //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
          this.$message.error("请输入一个数字")
          return false;
        } else {
          this.$store.dispatch({
            type: 'wechatMenuHistory',
            req: {
              menutype: "wx",
              platformHospitalId: JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId,
              lastestCount: this.hisDataCount
            }
          })
        }
      }
    },
    destroyed(){
      //修改meta中的值让微信微信公众平台图片显示
        let i = document.querySelector('meta[name="referrer"]');
        i.content = 'always';
        //console.log(i[1])
    }
  }

</script>

<style lang="scss">
  @import '@/assets/css/customizedMenu.scss';

</style>

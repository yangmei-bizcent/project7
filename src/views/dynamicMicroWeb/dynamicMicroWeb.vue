<template>
  <div class="dynamicMicroWeb">
    <div class="pageTitle">动态微官网<span>生成微官网后，可以对微官网中菜单的名称、链接地址、显示图标配置，配置完成后可在自定义菜单中配置微官网链接入口。</span></div>
    <div class="dynamicBody">
      <!-- 拖拽排序提示 -->
      <div v-show="tipPop" class="tipPOpShow">
        <div class="tipPopCon">
          <p>可以对模块进行上下拖拽排序。</p>
          <i class="el-icon-close" @click="tipPop=false;"></i>
          <i class="el-icon-caret-left"></i>
        </div>
      </div>
      <div class="dy-left">
        <!-- 微官网显示 -->
        <div class="dy-phone">
          <div class="dy-phone-box" :style="{'overflow-y':isModelShow?'hidden':'auto'}">
            <div class="dy-phone-content">
              <ul class="dyPhoneUl" v-if="dynamicInfoList.groups" v-for="groups in dynamicInfoList.groups" :key="groups.dynamicFuncGroupId"
                v-dragging="{item:groups,list: dynamicInfoList.groups,
                      dynamicList: dynamicInfoList, funcSort: JSON.parse(dynamicInfoList.funcSort), group: 'groups'}">
                <li v-show="groups.style.styleId=='S1'" class="dy-content dy-content-S1">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" :class="{'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      @click="openEditView(dItem,groups.style.styleId)">
                      <img :src="dItem.funcPic" />
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S2'" class="dy-content dy-content-S2">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" :class=" {'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      @click="openEditView(dItem,groups.style.styleId)" :style="{'float': dIndex == 0?'left':'right'}">
                      <img :src="dItem.funcPic" />
                      <p>{{dItem.funcName}}</p>
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S3'" class="dy-content dy-content-S3">
                  <ul>
                    <li @click="openEditView(dItem,groups.style.styleId)" v-for="(dItem, dIndex) in groups.details"
                      :key="dIndex" :class="{'dy-content-S3-none': dIndex == 0, 'dy-content-S3-float': dIndex !=0,'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      :style="{'float': dIndex == 0 ?  'none' : dIndex ==1 ? 'left' : 'right'}">
                      <img :src="dItem.funcPic" />
                      <p v-if="dIndex!= 0">{{dItem.funcName}}</p>
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S4'" class="dy-content dy-content-S4">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" @click="openEditView(dItem,groups.style.styleId)"
                      :class="{'content-S4-left': dIndex == 0  ,'content-S4-top': dIndex == 1,'content-S4-bottom': dIndex == 2,'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}">
                      <img :src="dItem.funcPic" />
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S5'" class="dy-content dy-content-S5">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" @click="openEditView(dItem,groups.style.styleId)"
                      :class="{'content-S5-left': dIndex == 0  ,'content-S5-right': dIndex != 0,'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}">
                      <img :src="dItem.funcPic" />
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S6'" class="dy-content dy-content-S6">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" :class="{'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      @click="openEditView(dItem,groups.style.styleId)" :style="{ 'float': dIndex == 0 ?  'left' : 'right',
                                                      'width': dIndex == 0 ? '57.99%' : '38.01%'}">
                      <img :src="dItem.funcPic" />
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S7'" class="dy-content dy-content-S7">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" :class="{'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      @click="openEditView(dItem,groups.style.styleId);">
                      <img :src="dItem.funcPic" />
                      <p>{{dItem.funcName}}</p>
                    </li>
                    <span @click="addDetails(dynamicInfoList, groups)">
                      <img src="../../assets/img/dynamic/addition-3x.png" />
                    </span>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S8'" class="dy-content dy-content-S8">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" :class="{'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      @click="openEditView(dItem,groups.style.styleId)">
                      <img :src="dItem.funcPic" />
                      <p>{{dItem.funcName}}</p>
                    </li>
                    <span @click="addDetails(dynamicInfoList, groups)">
                      <img src="../../assets/img/dynamic/addition-3x.png" />
                    </span>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S9'" class="dy-content dy-content-S9">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" @click="openEditView(dItem,groups.style.styleId);isDiscriptShow = dIndex === 0 ? true : false"
                      :style="{'float': dIndex == 0 ?  'none' : dIndex ==1 ? 'left' : 'right'}" :class="{'dy-content-S9-full': dIndex == 0, 'dy-content-S9-half': dIndex !=0,'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}">
                      <p v-if="dIndex==0">{{dItem.funcName}}</p>
                      <span v-if="dIndex!=0">{{dItem.funcName}}</span>
                      <span v-if="dIndex==0">{{dItem.description}}</span>
                      <img :src="dItem.funcPic" />
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S10'" class="dy-content dy-content-S10">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" :class="{'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      @click="openEditView(dItem,groups.style.styleId)" :style="{'float': dIndex == 0 ? 'left' : 'right'}">
                      <img :src="dItem.funcPic" />
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
                <li v-show="groups.style.styleId=='S11'" class="dy-content dy-content-S11">
                  <ul>
                    <li v-for="(dItem, dIndex) in groups.details" :key="dIndex" :class="{'liHighLight':dItem.dynamicFuncDetailsId==editData.dynamicFuncDetailsId}"
                      @click="openEditView(dItem,groups.style.styleId)">
                      <img :src="dItem.funcPic" />
                      <p>{{dItem.funcName}}</p>
                    </li>
                  </ul>
                  <div class="deleteBtn" @click="toDeleteGroup(groups)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="isModelShow" class="dy-add-box">
            <ul>
              <li class="dy-add-box-model" v-for="dmd in dynamicModelData" :key="dmd.id">
                <img v-bind:src="dmd.img" />
                <a class="dy-add-choose" @click="addModel(dmd)">
                  <img src="../../assets/img/dynamic/addition.png" />
                </a>
              </li>
            </ul>
          </div>
          <div class="dy-phone-addition">
            <button type="button" @click="openInsert()">
              <img src="../../assets/img/dynamic/addition-3x.png" />
            </button>
          </div>
        </div>
      </div>
      <!-- 微官网操作 -->
      <div v-show="!dynamicInfoList.groups" class="dy-right onceTip">点击左侧+号进行编辑操作</div>
      <div v-show="dynamicInfoList.groups" class="dy-right">
        <div class="cover" v-show="isCoverShow">
          <img src="../../assets/img/loadingCircle.gif" />
        </div>
        <div class="menuTitle">
          <span class="menuTitleShow" v-if="editData.funcName" v-show="titleChange" @click="editFuncName()">{{editData.funcName}}
            <i class="el-icon-edit-outline"></i></span>
          <span class="menuTitleShow" v-if="!editData.funcName" v-show="titleChange" @click="editFuncName()">菜单名称
            <i class="el-icon-edit-outline"></i></span>
          <el-input class="menuTitleEdit" ref="editNameInput" v-show="!titleChange" maxlength="7" placeholder="输入菜单名称（最多7个字符）"
            v-model="editData.funcName" @blur="titleChange=true;" @change="editDynamicPut()"></el-input>
          <el-button type="text" v-show="isDelMenuShow" @click="deleteDynamicFuncByDetail(editData)">
            删除菜单
          </el-button>
        </div>
        <div class="menuList">
          <div class="menuLi" v-show="isDiscriptShow">
            <label prop="funcName">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述</label>
            <el-input placeholder="输入描述" v-model="editData.description" @change="editDynamicPut()"></el-input>
            <br />
            <p class="entryTip">字数不能超过6个字符</p>
          </div>
          <div class="menuLi">
            <label>图标上传</label>
            <div class="itemLogo"><img :src="editData.funcPic" class="avatar" /></div>
            <el-button class="imgUpload" size="mini" @click="openLogoDialog()">上传</el-button>
            <p class="entryTip uploadTip">上传图标大小200kb以内</p>
            <el-dialog class="changeLogo" title="选择图标" :visible.sync="uploadLogoDialog" width="700px">
              <el-container>
                <el-aside width="165px">
                  <div class="logoBtnList">
                    <div class="logoBtn" :class="logoBtnIndex==index?'logoBtnClick':''" v-for="(n,index) in logoAll"
                      :index="index" @click="openLogoTheme(n.categoryId,index)">{{n.name}}<span>（{{n.countPicture}}）</span></div>
                    <div class="logoBtn" :class="logoBtnIndex==logoAll.length?'logoBtnClick':''" :index="logoAll.length"
                      @click="openHistoryLogo()">历史上传图标<span>（{{historyLogoNum}}）</span></div>
                  </div>
                  <el-upload action="" :file-list="editData.funcPic" :on-exceed="limitFile" list-type="picture"
                    :http-request="imgurlRequest" :before-upload="beforeAvatarUpload">
                    <el-button type="primary">本地上传</el-button>
                  </el-upload>
                </el-aside>
                <el-main>
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                    <el-menu-item v-for="(n,index) in logoTheme" :key="index" :index="index" @click="openLogoList(n.categoryId)">{{n.name}}</el-menu-item>
                  </el-menu>
                  <div class="logoList">
                    <div class="logoOne" v-for="n in logoList" @click="chooseLogo(n)">
                      <div class="logoImg" :style="{'background-image':'url('+n.url+')'}">
                        <div class="logoCover" v-show="clickLogoId==n.pictureId"><i class="el-icon-check"></i></div>
                      </div>
                      <p>{{n.name}}</p>
                    </div>
                  </div>
                </el-main>
              </el-container>
              <span slot="footer" class="dialog-footer">
                <el-button @click="uploadLogoDialog = false">取 消</el-button>
                <el-button type="primary" @click="uploadLogo()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <p class="pncLabel">配置点击菜单跳转页面地址</p>
          <div class="configLink">
            <div class="configSelect" @click="choose('A')" :class="!linkChoose?'clickzed':''">
              <label>选择应用</label>
              <el-select v-model="severPage" placeholder="请选择" :disabled="linkChoose" @change="showImg(),editDynamicPut()">
                <el-option v-for="item in options" :key="item.applicationId" :label="item.applicationName" :value="item.applicationUrl">
                </el-option>
              </el-select>
            </div>
            <div class="imageUrl" v-if="severPage && imageUrl"><img :src="imageUrl" /></div>
            <div class="imageUrl" v-if="severPage && !imageUrl">
              <div class="textAlignCenter">
                <div class="inlineBlock marginbottom10 icon-applic-notice"></div>
                <p>暂无应用展示图</p>
              </div>
            </div>
            <div class="imageUrl" v-if="!severPage">
              <div class="textAlignCenter">
                <div class="inlineBlock marginbottom10 icon-applic-notice"></div>
                <p>请选择应用列表</p>
                <p>
                  或者
                  <el-button type="text" class="widthInitial text-underline color-4297F6" @click="goToAppStore()">前往应用中心</el-button>，看看吧~
                </p>
              </div>
            </div>
            <div class="configSelect" @click="choose('B')" :class="linkChoose?'clickzed':''">
              <label>自定义页面地址</label>
              <el-input placeholder="请输入合法页面链接" id="funcUrlInt" size="20" required name="funcUrlInt" v-model="editData.funcUrlInt"
                :disabled="!linkChoose" @change="editDynamicPut()"></el-input>
            </div>
          </div>
          <div class="dynamicBtn">
            <el-button type="primary" plain @click="openReset(dynamicInfoList)" v-show="wgwhistoryBtnShow">恢复为历史版本</el-button>
            <el-button type="primary" plain @click="viewShow = true;">预览</el-button>
            <el-button type="success" @click="editDynamicPut();openBubnish(dynamicInfoList)" v-show="wgwreleaseBtnShow">
              发布
            </el-button>
          </div>
        </div>
      </div>
      <!-- 更多模板 -->
      <transition>
        <div class="dyStyle" :class="moreIsShow?'moreShow': 'hideShow'">
          <div class="dyPullRight" @click="moreIsShow = ~moreIsShow">
            <div class="dyArrow" :class="{'openArrow': moreIsShow }"></div>
            <div class="dyArrowText">更多模板</div>
          </div>
          <div class="dyStyleList">
            <div class="dyStyleTitle">更多风格</div>
            <div class="dyStyleCon">
              <div class="dyStyleLi dyStyleNow">
                <div class="dyStyleImg dyStyleImgOne"></div>
                <p>风格一</p>
              </div>
              <div class="dyStyleLi">
                <div class="dyStyleImg dyStyleImgTwo"></div>
                <p>敬请期待</p>
              </div>
              <div class="dyStyleLi">
                <div class="dyStyleImg dyStyleImgThree"></div>
                <p>敬请期待</p>
              </div>
              <div class="dyStyleLi">
                <div class="dyStyleImg dyStyleImgFour"></div>
                <p>敬请期待</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- 恢复为历史版本弹窗 -->
      <div class="resetList" v-show="resetShow">
        <div class="resetPop">
          <div class="resetTitle">恢复为历史版本<u @click="resetShow = false;"></u></div>
          <div class="resetContent">
            <div class="resetChoose">显示文件范围：最近<input type="text" v-model="resetNum">条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;仅将历史版本菜单数据恢复至编辑状态，需要发布后同步线上版本
            </div>
            <template>
              <el-table :data="resetDynamicList" height="400" stripe highlight-current-row @row-click="resetClicked"
                style="width: 100%">
                <el-table-column prop="createdon" label="自动备份日期／时间" width="300">
                  <template slot-scope="scope">
                    <section>
                      {{scope.row.createdon.substring(0,10)}} {{scope.row.createdon.substring(11,19)}}
                    </section>
                  </template>
                </el-table-column>
                <el-table-column prop="modifiedby" label="发布操作者">
                </el-table-column>
                <el-table-column prop="releaseComment" label="发布时间">
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="resetBtn">
            <el-button @click="resetShow = false;">取 消</el-button>
            <el-button type="primary" @click="resetNow(resetInfo)">恢 复</el-button>
          </div>
        </div>
      </div>
      <!-- 预览弹窗 -->
      <div class="resetList" v-show="viewShow">
        <div class="cover" @click="viewShow = false;"></div>
        <div class="viewAll">
          <div class="dy-phone">
            <div class="dy-phone-box" style="overflow:auto;">
              <div class="dy-phone-content">
                <ul v-for="groups in dynamicInfoList.groups" :key="groups.dynamicFuncGroupId">
                  <li v-show="groups.style.styleId=='S1'" class="dy-content dy-content-S1">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li>
                        <img :src="dItem.funcPic" />
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S2'" class="dy-content dy-content-S2">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li :style="{'float': dIndex == 0 ? 'left' : 'right'}">
                        <img :src="dItem.funcPic" />
                        <p style="position: absolute; top: 25px; font-size: 12px">{{dItem.funcName}}</p>
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S3'" class="dy-content dy-content-S3">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li :style="{'float': dIndex == 0 ?  'none' : dIndex ==1 ? 'left' : 'right'}" :class="{'dy-content-S3-none': dIndex == 0, 'dy-content-S3-float': dIndex !=0}">
                        <img :src="dItem.funcPic" :style="{'margin-top': dIndex == 0 ? '5px' : '10px',
                                                                 'height':  dIndex == 0 ?  '110px' : '45px',
                                                                 'width' :  dIndex == 0 ?  '100%' : '40%' }" />
                        <p v-if="dIndex!= 0" style="position: absolute; top: 25px; font-size: 12px">{{dItem.funcName}}</p>
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S4'" class="dy-content dy-content-S4">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li :class="{'content-S4-left': dIndex == 0  ,'content-S4-right': dIndex != 0}">
                        <img :style="{'margin-top': dIndex == 0 ? '5px' : '1px',
                                                                 'height':  dIndex == 0 ?  '100px' : '50px',
                                                                 'width' :  '100%'}"
                          :src="dItem.funcPic" />
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S5'" class="dy-content dy-content-S5">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li :class="{'content-S5-left': dIndex == 0  ,'content-S5-right': dIndex != 0}">
                        <img :src="dItem.funcPic" />
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S6'" class="dy-content dy-content-S6">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li :style="{ 'float': dIndex == 0 ?  'left' : 'right',
                                                              'width': dIndex == 0 ? '57.99%' : '38.01%'}">
                        <img :src="dItem.funcPic" />
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S7'" class="dy-content dy-content-S7" :style="{'height':  60 * (Math.floor((groups.details.length -1) >> 2) +1)  + 'px'}">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li>
                        <img :src="dItem.funcPic" />
                        <p>{{dItem.funcName}}</p>
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S8'" class="dy-content dy-content-S8" :style="{'height': 60 * (Math.floor((groups.details.length -1) / 3) +1)  + 'px'}">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li>
                        <img :src="dItem.funcPic" />
                        <p>{{dItem.funcName}}</p>
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S9'" class="dy-content dy-content-S9">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li :style="{'float': dIndex == 0 ?  'none' : dIndex ==1 ? 'left' : 'right'}" :class="{'dy-content-S9-top': dIndex == 0, 'dy-content-S9-bottom': dIndex !=0}">
                        <p v-if="dIndex!= 0">{{dItem.funcName}}</p>
                        <span v-if="dIndex==0">
                          <p>{{dItem.funcName}}</p>
                          <small>{{dItem.description}}</small>
                        </span>
                        <img :src="dItem.funcPic" :style="{
                                                                  'position': 'absolute',
                                                                  'margin-top': dIndex == 0 ? '5px' : '10px',
                                                                 'height':  dIndex == 0 ?  '105px' : '45px',
                                                                 'width' :  dIndex == 0 ?  '45%' : '40%' ,
                                                                 'left':  dIndex == 0 ?  '145px' : '0px',}" />
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S10'" class="dy-content dy-content-S10">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li :style="{'float': dIndex == 0 ? 'left' : 'right'}">
                        <img :src="dItem.funcPic" />
                      </li>
                    </ul>
                  </li>
                  <li v-show="groups.style.styleId=='S11'" class="dy-content dy-content-S11">
                    <ul v-for="(dItem, dIndex) in groups.details" :key="dIndex">
                      <li>
                        <img :src="dItem.funcPic" />
                        <p style="position: absolute; top: 12px; font-size: 12px; right: 50px">{{dItem.funcName}}</p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="" :visible.sync="dialogDynamicInfo.isDialogShow" width="30%">
        <span>{{dialogDynamicInfo.text}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteGroup(dialogDynamicInfo, 'cancel')">取 消</el-button>
          <el-button type="primary" @click="deleteGroup(dialogDynamicInfo, 'confirm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    axiosget,
    axiospost,
    aixospatch
  } from "../../service/config.js"
  import "@/assets/sass/changesystem.scss";
  import draggable from 'vuedraggable'
  import {
    saveDynamicFunc,
  } from "@/assets/js/http.js";
  import {
    dynamicStyles
  } from "@/assets/js/testdata.js";
  import {
    mapState,
    mapGetters
  } from 'vuex';
  import {
    serviceHrefOptionsApi
  } from '@/service/application.js'
  export default {
    computed: {
      ...mapState({
        isModelShow: state => state.dynamic.isModelShow,
        // dynamicInfoList: state => JSON.parse(JSON.stringify(state.dynamic.dynamicInfoList)),
        editData: state => JSON.parse(JSON.stringify(state.dynamic.editData)),
        linkChoose: state => state.dynamic.linkChoose,
        dialogDynamicInfo: state => state.dynamic.dialogDynamicInfo,
        resetDynamicList: state => state.dynamic.resetDynamicList,
        resetInfo: state => state.dynamic.resetInfo,
        sortDynamicList: state => state.dynamic.sortDynamicList,
        // options: state => state.application.serviceHrefOptions,
      }),
      ...mapGetters({
        moduleper: 'moduleper'
      }),
    },
    name: "dy-dynamic",
    // inject: ['reload'],
    data() {
      return {
        dynamicInfoList: [],
        isOpenSaveButtonShow: false,
        isDelMenuShow: false,
        moreIsShow: false,
        resetShow: false,
        viewShow: false,
        hasMenuChange: false,
        tipPop: true,
        isCoverShow: false,
        onceChange: true,
        isDiscriptShow: false,
        resetNum: 5,
        lastestCount: 5,
        resetTableList: [],
        logoAll: [],
        logoTheme: [],
        logoList: [],
        logoBtnIndex: 0,
        historyLogoNum: 0,
        clickLogoId: '',
        logoUrl: '',
        dynamicfunctype: '',
        userInfo: {},
        imageUrl: '',
        menuName: '',
        webLink: '',
        options: [],
        loadingDynamic: true,
        loading: false,
        titleChange: true,
        dialogInfo: {},
        drapSort: [],
        dIndexDetail: '',
        isAddFunc: true,
        editDalialog: false,
        uploadLogoDialog: false,
        overflowValue: 'auto',
        dynamicStyles: dynamicStyles,
        currentPoint: {},
        activeIndex: '0',
        dynamicFuncGroupStyle: [],
        severIndex: -1,
        dynamicModelData: [{
          id: 'S1',
          img: require('../../assets/img/dynamic/S1.png'),
        }, {
          id: 'S2',
          img: require('../../assets/img/dynamic/S2.png'),
        }, {
          id: 'S3',
          img: require('../../assets/img/dynamic/S3.png'),
        }, {
          id: 'S4',
          img: require('../../assets/img/dynamic/S4.png'),
        }, {
          id: 'S5',
          img: require('../../assets/img/dynamic/S5.png'),
        }, {
          id: 'S6',
          img: require('../../assets/img/dynamic/S6.png'),
        }, {
          id: 'S7',
          img: require('../../assets/img/dynamic/S7.png'),
        }, {
          id: 'S8',
          img: require('../../assets/img/dynamic/S8.png'),
        }, {
          id: 'S9',
          img: require('../../assets/img/dynamic/S9.png'),
        }, {
          id: 'S10',
          img: require('../../assets/img/dynamic/S10.png'),
        }],
        severPage: '',
        rules: {
          imgCode: [{
            required: true,
            message: "请输入图片验证码",
            trigger: "blur"
          }],
          dxCode: [{
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }],
        },
        //权限控制
        wgwreleaseBtnShow: false,
        wgwhistoryBtnShow: false
      };
    },
    watch: {
      '$route'(to, from) {
        // let userInfo = JSON.parse(sessionStorage.getItem("userinfo"));
        document.title = '动态微官网';
        // window.location.reload();
        if (this.userInfo != null) {
          //console.log('用户信息：', this.userInfo);
          this.listDynamicFunc(this.userInfo.platformHospitalId);
        }
      },
      resetNum(val) {
        this.$store.dispatch({
          type: 'resetDynamic',
          item: this.dynamicInfoList,
          lastestCount: val,
        });
      },
    },
    created() {
      this.Jurisdiction();
      if (this.$route.query.dynamicfunctype) {
        this.dynamicfunctype = this.$route.query.dynamicfunctype;
      } else {
        this.dynamicfunctype = "08";
      }
    },
    async mounted() {
      window.onbeforeunload = function (e) {
        //console.log(e)
        var dialogText = '确定要离开此页吗？';
        e.returnValue = dialogText;
        return dialogText;
      };
      this.userInfo = this.$store.getters.chooseOrgInfo;
      if (!this.userInfo) {
        alert('您还未分配机构');
      }
      let dynamicType = this.$route.params.type;
      await this.$store.dispatch({
        type: 'dynamicFuncList',
        phId: this.userInfo.platformHospitalId,
        styleType: this.dynamicfunctype
      });
      this.dynamicInfoList = JSON.parse(JSON.stringify(this.$store.getters.dynamicInfoList));
      if (this.dynamicInfoList && this.dynamicInfoList.groups) {
        this.$store.commit({
          type: 'editData',
          editData: this.dynamicInfoList.groups[0].details[0]
        });
      }
      //拖拽
      let sortedGroup = [];
      this.$dragging.$on('dragged', ({
        value
      }) => {
        let set = new Set();
        let funcSort = value.funcSort;
        for (let i = 0; i < funcSort.length; i++) {
          set.add(funcSort[i]);
        }
        let groupList = value.list;
        for (let i in groupList) {
          if (set.has(groupList[i].dynamicFuncGroupId)) {
            sortedGroup[i] = groupList[i].dynamicFuncGroupId;
          }
        }
      });
      await this.$dragging.$on('dragend', () => {
        this.$store.dispatch({
          type: 'sortDynamicFunc',
          dynamicList: this.dynamicInfoList,
          sort: JSON.stringify(sortedGroup),
        });
      });
      //首次进入时右侧url匹配
      serviceHrefOptionsApi(
        JSON.parse(sessionStorage.getItem("chooseOrgInfo"))
      ).then((res) => {
        if (res && res.hasOwnProperty('data')) {
          this.options = res.data;
          console.log(this.options)
          this.options.filter((url, index) => {
            if (this.dynamicInfoList.groups && (url.applicationUrl == this.dynamicInfoList.groups[0].details[
                0].funcUrl)) {
              this.severIndex = index;
            }
          })
          if (this.severIndex >= 0) {
            this.$store.commit({
              type: 'menuChoose',
              style: 'A'
            });
            this.editData.funcUrlInt = '';
            this.severPage = this.options[this.severIndex].applicationUrl;
            this.imageUrl = this.options[this.severIndex].imageUrl;
          } else {
            this.$store.commit({
              type: 'menuChoose',
              style: 'B'
            });
            this.editData.funcUrlInt = this.dynamicInfoList.groups[0].details[0].funcUrl;
          }
        }
      });
    },
    methods: {
      Jurisdiction() {
        //权限控制
        //console.log('jinlai', this.moduleper)
        if ((this.moduleper != undefined || this.moduleper != null) && this.moduleper.length > 0) {
          this.moduleper.map(item => {
            item.children.map(item2 => {
              if (item2.feature_id == 351023) { //"发布自定义菜单"
                this.wgwreleaseBtnShow = true;
              } else if (item2.feature_id == 351022) { //"恢复为历史版本"
                this.wgwhistoryBtnShow = true;
              }

            })
          })
        }
      },
      //选择要恢复的版本
      resetClicked(item) {
        this.$store.commit({
          type: 'choiceReset',
          resetInfo: item,
        });
      },
      //选择配置链接方式
      choose(style) {
        this.$store.commit({
          type: 'menuChoose',
          style: style
        });
      },
      //图片验证
      beforeAvatarUpload(file) {
        const isType = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg');
        const isLt200K = file.size / 1024 < 200;
        if (!isType) {
          this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
        }
        if (!isLt200K) {
          this.$message.error('上传图片大小不能超过 200K!');
        }
        return isType && isLt200K;
      },
      //上传图片
      async imgurlRequest(item) {
        this.hasMenuChange = true;
        let form = new FormData();
        form.append("file", item.file);
        try {
          let res = await axiospost(`/application/plat/auth/images/upload`, form);
          console.log(res.data)
          this.editData.funcPic = res.data.url;
          this.$store.dispatch({
            type: 'editDynamicFunc',
            phId: this.dynamicInfoList.platformHospitalId,
            dynamicFuncType: this.dynamicInfoList.dynamicFuncType,
            editData: this.editData
          });
          this.uploadLogoDialog = false;
          res.data.platformHospitalId = this.userInfo.platformHospitalId;
          axiospost(`/application/plat/auth/images/uploadHistoryImg`, res.data)
          this.$message.success("图片上传成功");
        } catch (err) {
          this.$message.error("图片上传失败");
        };
      },
      //添加模块
      openInsert() {
        this.$store.commit({
          type: 'changeDynamicModel',
          close: false
        });
      },
      /**
       * 添加动态首页模板
       * @param val
       */
      async addModel(val) {
        this.hasMenuChange = true;
        await this.$store.dispatch({
          type: 'groupstylesInfo',
          groupStyleType: 'S',
          styleId: val.id
        });
        let dynamicInfo = this.$store.getters.dynamicInfoList;
        let groupstylesInfo = this.$store.getters.groupstylesInfo;
        let currentData = {
          dynamicFuncId: dynamicInfo.dynamicFuncId,
          platformHospitalId: dynamicInfo.platformHospitalId,
          dynamicFuncType: dynamicInfo.dynamicFuncType,
          funcSort: dynamicInfo.funcSort == null ? '[]' : dynamicInfo.funcSort,
          needPublish: '1',
          groups: (dynamicInfo.groups !== null && dynamicInfo.groups.dynamicFuncGroupStyleId === groupstylesInfo.dynamicFuncGroupStyleId) ?
            dynamicInfo.groups : [{
              dynamicFuncGroupStyleId: groupstylesInfo.dynamicFuncGroupStyleId,
              dynamicFuncId: dynamicInfo.dynamicFuncId,
              sort: '',
              sortNum: 0,
              description: null,
              details: [],
              style: groupstylesInfo
            }],
        };
        let currentStyle = this.dynamicStyles.find(v => v.id == val.id).styles;
        for (let item in currentStyle) {
          currentData.groups[0].details[item] = {
            dynamicFuncDetailsId: dynamicInfo.dynamicFuncDetailsId,
            dynamicFuncId: dynamicInfo.dynamicFuncId,
            funcPic: currentStyle[item].url,
            funcName: currentStyle[item].text,
            sortNum: 0,
            description: null,
            funcType: 'undefined',
            funcUrl: 'undefined',
            isDefault: null,
            releaseStatus: "1",
            sortNum: 0
          }
        }
        await this.$store.dispatch({
          type: 'addDynamic',
          dynamicInfo: currentData,
        });
        await this.$store.dispatch({
          type: 'dynamicFuncList',
          phId: currentData.platformHospitalId,
          styleType: currentData.dynamicFuncType
        });
        this.$store.commit({
          type: 'changeDynamicModel',
          close: true
        });
        let success = this.$store.state.dynamic.editDynamicSuccess;
        if (success) {
          this.$message.success(success);
          this.dynamicInfoList = JSON.parse(JSON.stringify(this.$store.getters.dynamicInfoList));
        }
      },
      //打开应用详情
      openEditView(dItem, style) {
        if (!this.editData.funcName || !this.editData.funcPic || !(this.severPage || this.editData.funcUrlInt)) {
          this.$message.warning('请完整填写右侧信息，再进行下一步操作');
          return false;
        }
        this.onceChange = false;
        this.severPage = '';
        this.severIndex = -1;
        this.isOpenSaveButtonShow = true;
        if (style === 'S7' || style === 'S8') {
          this.isDelMenuShow = true;
        } else {
          this.isDelMenuShow = false;
        }
        dItem.platformHospitalId = this.dynamicInfoList.platformHospitalId;
        dItem.dynamicFuncType = this.dynamicInfoList.dynamicFuncType;
        this.$store.commit({
          type: 'editData',
          editData: dItem
        });
        //右侧配置链接地址
        this.options.filter((url, index) => {
          if (url.applicationUrl == dItem.funcUrl) {
            this.severIndex = index;
          }
        })
        if (this.severIndex >= 0) {
          this.$store.commit({
            type: 'menuChoose',
            style: 'A'
          });
          this.editData.funcUrlInt = '';
          this.severPage = this.options[this.severIndex].applicationUrl;
          this.imageUrl = this.options[this.severIndex].imageUrl;
        } else {
          this.$store.commit({
            type: 'menuChoose',
            style: 'B'
          });
          this.editData.funcUrlInt = dItem.funcUrl;
        }
      },
      //前往应用中心
      goToAppStore() {
        this.$router.push({
          path: '/serviceCenter/serCenIndex'
        })
      },
      //配置服务的图片、同步菜单名
      showImg() {
        this.options.filter((url, index) => {
          if (this.dynamicInfoList.groups && (url.applicationUrl == this.severPage)) {
            this.severIndex = index;
          }
        })
        this.imageUrl = this.options[this.severIndex].imageUrl;
        this.editData.funcName = this.options[this.severIndex].applicationName;
      },
      //修改应用名称
      editFuncName() {
        this.titleChange = false;
        this.$nextTick(() => {
          this.$refs['editNameInput'].focus();
        })
      },
      //保存操作
      async editDynamicPut() {
        this.hasMenuChange = true;
        this.isCoverShow = true;
        if (!this.editData.funcName) {
          this.$message.error('名称不能为空');
          this.isCoverShow = false;
          return false;
        }
        if (this.editData.funcName.toString().length > 7) {
          this.$message.error('名称不能超过7个字符');
          this.isCoverShow = false;
          return false;
        } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(this.editData.funcName)) {
          this.$message.error('请检查名称格式，限中文、字母或数字');
          this.isCoverShow = false;
          return false;
        }
        if (this.linkChoose) {
          if (!this.editData.funcUrlInt) {
            this.$message.error('网址不能为空');
            this.isCoverShow = false;
            return false;
          }
          this.editData.funcUrl = this.editData.funcUrlInt;
        } else {
          if (!this.severPage) {
            this.$message.error('请选择服务页面');
            this.isCoverShow = false;
            return false;
          }
          this.editData.funcUrl = this.severPage;
        }
        await this.$store.dispatch({
          type: 'editDynamicFunc',
          phId: this.dynamicInfoList.platformHospitalId,
          dynamicFuncType: this.dynamicInfoList.dynamicFuncType,
          editData: this.editData
        });
        let success = this.$store.state.dynamic.editDynamicSuccess;
        if (success) {
          await this.$store.dispatch({
            type: 'dynamicFuncList',
            phId: this.dynamicInfoList.platformHospitalId,
            styleType: this.dynamicInfoList.dynamicFuncType
          });
          this.dynamicInfoList = JSON.parse(JSON.stringify(this.$store.getters.dynamicInfoList));
          //   this.$message.success(success);
          this.isCoverShow = false;
        }
      },
      toDeleteGroup(groupItem) {
        this.$store.commit({
          type: 'menuDialog',
          info: {
            style: 'delGroup',
            phId: this.dynamicInfoList.platformHospitalId,
            dynamicFuncType: this.dynamicInfoList.dynamicFuncType,
            dfId: groupItem.dynamicFuncId,
            dfGroupId: groupItem.dynamicFuncGroupId,
            text: '是否确认删除该模块？',
            isDialogShow: true
          }
        });
      },
      deleteDynamicFuncByDetail(detailItem) {
        this.$store.commit({
          type: 'menuDialog',
          info: {
            style: 'delDetail',
            phId: detailItem.platformHospitalId,
            dynamicFuncType: detailItem.dynamicFuncType,
            dfId: detailItem.dynamicFuncId,
            dfGroupId: detailItem.dynamicFuncGroupId,
            dfDetailId: detailItem.dynamicFuncDetailsId,
            text: '是否确认删除该功能？',
            isDialogShow: true
          }
        });
      },
      /**
       * 删除 动态首页分组
       */
      async deleteGroup(item, status) {
        switch (item.style) {
          case 'delGroup':
            await this.$store.dispatch({
              type: 'delDynamicByGroupId',
              item: item,
              status
            });
            if (this.dynamicInfoList.groups.length == 1) {
              this.$router.go(0);
            }
            break;
          case 'delDetail':
            await this.$store.dispatch({
              type: 'delDynamicByDetailId',
              item: item,
              status
            });
            break;
          case 'pushAll':
            await this.$store.dispatch({
              type: 'saveReleaseDynamicFunc',
              item: item,
              status
            });
            let success = this.$store.state.dynamic.editDynamicSuccess;
            if (success && status !== 'cancel') {
              this.hasMenuChange = false;
              this.$message.success(success);
              this.$router.push({
                path: '/dynamicMicroWeb/uploadResult',
                query: {
                  dynamicfunctype: item.dynamicList.dynamicFuncType
                }
              })
            }
            return;
        }
        this.onceChange = true;
        let success = this.$store.state.dynamic.editDynamicSuccess;
        if (success && status !== 'cancel') {
          await this.$store.dispatch({
            type: 'dynamicFuncList',
            phId: this.userInfo.platformHospitalId,
            styleType: this.dynamicfunctype
          });
          this.hasMenuChange = true;
          this.$message.success(success);
          //start 删除之后第一个高亮
          let dynamicList = this.$store.getters.dynamicInfoList;
          if (dynamicList.groups) {
            this.$store.commit({
              type: 'editData',
              editData: dynamicList.groups[0].details[0]
            });
            this.dynamicInfoList = JSON.parse(JSON.stringify(this.$store.getters.dynamicInfoList));
          }
          //end
        }
      },
      //添加小模块
      async addDetails(dynamicList, groupList) {
        if (!this.editData.funcName || !this.editData.funcPic || !(this.severPage || this.editData.funcUrlInt)) {
          this.$message.warning('请完整填写右侧信息，再进行下一步操作');
          return false;
        }
        this.hasMenuChange = true;
        let currentData = {
          dynamicFuncId: dynamicList.dynamicFuncId,
          platformHospitalId: dynamicList.platformHospitalId,
          dynamicFuncType: dynamicList.dynamicFuncType,
          funcSort: dynamicList.funcSort == null ? '[]' : dynamicList.funcSort,
          needPublish: '1',
          groups: [
            groupList
          ],
        };
        let currentStyle = this.dynamicStyles.find(v => v.id == groupList.style.styleId + '-2').styles;
        for (let item in currentStyle) {
          currentData.groups[0].details[Number(currentData.groups[0].details.length)] = {
            dynamicFuncDetailsId: this.dynamicInfoList.dynamicFuncDetailsId,
            dynamicFuncId: this.dynamicInfoList.dynamicFuncId,
            funcPic: currentStyle[item].url,
            funcName: currentStyle[item].text,
            funcUrl: '',
            sortNum: 0,
            description: null
          }
        }
        await this.$store.dispatch({
          type: 'addDynamic',
          dynamicInfo: currentData,
        });
        await this.$store.dispatch({
          type: 'dynamicFuncList',
          phId: currentData.platformHospitalId,
          styleType: currentData.dynamicFuncType
        });
        this.$store.commit({
          type: 'changeDynamicModel',
          close: true
        });
        let success = this.$store.state.dynamic.editDynamicSuccess;
        if (success) {
          this.$message.success(success);
          this.dynamicInfoList = JSON.parse(JSON.stringify(this.$store.getters.dynamicInfoList));
          this.isUpdata = true;
        }
      },
      //打开上传logo弹窗
      openLogoDialog() {
        this.logoBtnIndex = 0;
        this.clickLogoId = 0;
        this.logoUrl = '';
        //logo弹窗
        axiosget(`application/plat/auth/images/getParentCategory`).then(
          res => {
            if (res.data) {
              this.logoAll = res.data;
              axiosget(
                  `application/plat/auth/images/getCategoryByParentId?parentCateoryId=${this.logoAll[0].categoryId}`)
                .then(
                  res => {
                    if (res.data) {
                      this.logoTheme = res.data;
                      axiosget(
                        `application/plat/auth/images/getPictureByCategoryId?cateoryId=${this.logoTheme[0].categoryId}`
                      ).then(
                        res => {
                          if (res.data) {
                            this.logoList = res.data;
                          }
                        })
                    }
                  });

              axiosget(
                  `application/plat/auth/images/getHistoryImg?platId=${this.userInfo.platformHospitalId}`)
                .then(
                  res => {
                    if (res.data) {
                      this.historyLogoNum = res.data.length;
                    }
                  })
            }
          })
        this.uploadLogoDialog = true;
      },
      //选择logoTheme
      openLogoTheme(categoryId, index) {
        this.logoBtnIndex = index;
        axiosget(
            `application/plat/auth/images/getCategoryByParentId?parentCateoryId=${categoryId}`)
          .then(
            res => {
              if (res.data) {
                this.logoTheme = res.data;
                axiosget(
                  `application/plat/auth/images/getPictureByCategoryId?cateoryId=${this.logoTheme[0].categoryId}`
                ).then(
                  res => {
                    if (res.data) {
                      this.logoList = res.data;
                    }
                  })
              }
            })
      },
      //选择历史logo
      openHistoryLogo() {
        this.logoBtnIndex = this.logoAll.length;
        axiosget(
            `application/plat/auth/images/getHistoryImg?platId=${this.userInfo.platformHospitalId}`)
          .then(
            res => {
              if (res.data) {
                this.logoTheme = [{
                  name: '全部',
                }];
                this.logoList = res.data;
              }
            })
      },
      //选择logoList
      openLogoList(categoryId) {
        if (categoryId) {
          axiosget(
            `application/plat/auth/images/getPictureByCategoryId?cateoryId=${categoryId}`
          ).then(
            res => {
              if (res.data) {
                this.logoList = res.data;
              }
            })
        } else {
          return false;
        }
      },
      //选择logo
      chooseLogo(n) {
        this.clickLogoId = n.pictureId;
        this.logoUrl = n.url;
      },
      //上传logo
      async uploadLogo() {
        this.hasMenuChange = true;
        try {
          this.editData.funcPic = this.logoUrl;
          await this.$store.dispatch({
            type: 'editDynamicFunc',
            phId: this.dynamicInfoList.platformHospitalId,
            dynamicFuncType: this.dynamicInfoList.dynamicFuncType,
            editData: this.editData
          });
          this.uploadLogoDialog = false;
          this.$message.success("图片上传成功");
          await this.$store.dispatch({
            type: 'dynamicFuncList',
            phId: this.userInfo.platformHospitalId,
            styleType: this.dynamicfunctype
          });
          this.dynamicInfoList = JSON.parse(JSON.stringify(this.$store.getters.dynamicInfoList));
        } catch (err) {
          this.$message.error("图片上传失败");
        };
      },
      //打开发布弹窗
      openBubnish(item) {
        if (this.linkChoose) {
          if (!this.editData.funcUrlInt) {
            return;
          }
        } else {
          if (!this.severPage) {
            return;
          }
        }
        this.$store.commit({
          type: 'menuDialog',
          info: {
            style: 'pushAll',
            dynamicList: item,
            text: '是否发布？',
            isDialogShow: true
          }
        });
      },
      //打开恢复弹窗
      openReset(item) {
        this.resetShow = true;
        this.$store.dispatch({
          type: 'resetDynamic',
          item: item,
          lastestCount: '5',
        });
      },
      //   resetThis(item) {
      //     this.$store.commit({
      //       type: 'choiceReset',
      //       resetInfo: item,
      //     });
      //   },
      //恢复历史
      async resetNow(item) {
        this.hasMenuChange = false;
        if (!item || Object.keys(item).length == 0) {
          this.$message.error('请选择历史版本');
          return
        }
        await this.$store.dispatch({
          type: 'resetThisDynamic',
          item: item
        });
        this.resetShow = false;
        await this.$store.dispatch({
          type: 'dynamicFuncList',
          phId: item.platformHospitalId,
          styleType: item.dynamicFuncType
        });
        this.dynamicInfoList = JSON.parse(JSON.stringify(this.$store.getters.dynamicInfoList));
      }
    },
    // 组件内导航钩子，处理表单未保存退出的情况
    beforeRouteLeave: function (to, from, next) {
      if (this.hasMenuChange) {
        next(false)
        setTimeout(() => {
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
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "dynamicMicroWeb.scss";

  .dy-phone-box {
    -ms-overflow-style: none;
  }

  .menuTitleShow {
    cursor: pointer;
  }

  .imageUrl {
    width: 188px;
    margin-bottom: 30px;
    margin-left: 160px;
    font-size: 14px;
    color: #666;

    img {
      width: 100%;
    }
  }

  .menuTitleEdit {
    width: 300px;
  }

  .changeLogo {
    .el-dialog__header {
      border-bottom: 1px solid #E7E7E7;
    }

    .el-dialog__body {
      padding: 0;
      padding-top: 10px;

      .el-aside {
        border-right: 1px solid #E7E7E7;

        .logoBtnList {
          height: 300px;
          overflow: auto;

          .logoBtn {
            padding: 0 10px;
            padding-left: 24px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 32px;
            font-size: 14px;
            color: #333333;
            cursor: pointer;

            &:hover {
              color: #35b53f;
            }

            span {
              color: #3F3F3F;
            }
          }

          .logoBtnClick {
            background: #EEF0F1;
          }
        }

        .el-button {
          margin-bottom: 10px;
          padding: 4px 20px;
          font-size: 12px;
        }

        .el-upload {
          display: block;
          margin: 0 auto;
        }

        .el-upload-list {
          display: none;
        }
      }

      .el-main {
        padding: 0 20px;

        .el-menu {
          border: none;

          .el-menu-item {
            height: 36px;
            margin-right: 24px;
            padding: 0;
            line-height: 36px;
          }

          .el-menu-item.is-active {
            border-bottom: 2px solid #42A84B;
            color: #000;
            font-weight: 600;
          }
        }

        .logoList {
          margin: 20px 0;
          height: 260px;
          overflow: auto;

          .logoOne {
            float: left;
            width: 110px;
            margin-right: 20px;
            margin-bottom: 20px;
            border: 1px solid #E7E7E7;
            cursor: pointer;

            .logoImg {
              position: relative;
              height: 100px;
              background-size: 80%;
              background-repeat: no-repeat;
              background-position: center center;
              border-bottom: 1px solid #E7E7E7;

              .logoCover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                line-height: 100px;
                color: #fff;
                font-size: 40px;
                text-align: center;
                background: rgba(0, 0, 0, 0.5);
              }
            }

            p {
              padding: 0 10px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              line-height: 32px;
              font-size: 12px;
              color: #333333;
            }
          }
        }
      }
    }

    .el-dialog__footer {
      border-top: 1px solid #E7E7E7;
    }
  }

  .icon-applic-notice {
    width: 110px;
    height: 106px;
    background: url('../../assets/img/publicServiceNum/customized-noapp.png') center no-repeat;
    background-size: contain;
  }

</style>

<template>
  <div class="newPart personalCenter main_layout">
    <section class="page-title">
      <el-button type="text" class="back-btn color-333" @click="back">
        <i class="el-icon-arrow-left"></i> 返回
      </el-button>
    </section>

    <section class="bg-whipersonalFormte">
      <el-form
        :rules="rules"
        label-position="left"
        class="personal-form"
        :model="personalForm"
        ref="personalForm"
        label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            :disabled="lookDisable"
            maxlength="20"
            placeholder="请输入角色名称，例如：宣传科管理员"
            v-model="personalForm.roleName">
          </el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            :disabled="lookDisable"
            maxlength="50"
            type="textarea"
            resize="none"
            rows="3"
            placeholder="请输入角色描述，例如：管理公众号运营、信息发布等"
            v-model="personalForm.roleDesc">
          </el-input>
        </el-form-item>

        <el-form-item label="角色权限范围">
          <el-checkbox-group v-model="rightRange" @change="rightRangeChange">
            <el-checkbox label="16" :disabled="lookDisable">平台信息管理</el-checkbox>
            <el-checkbox label="3" :disabled="lookDisable">大众版微信服务号</el-checkbox>
            <el-checkbox label="1" :disabled="lookDisable">医生版企业微信版</el-checkbox>
            <el-checkbox label="2" :disabled="lookDisable">应用后台</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-tabs v-model="partAuthority">
          <el-tab-pane
            label="平台信息管理"
            :name="rightsNameIdMapping['platInfoManage']"
            :disabled="!rightRange.includes(rightsNameIdMapping['platInfoManage'])">
            <div
              class="group-wrap"
              v-for="(item, index) of features.platInfoManage"
              :key="index">
              <div class="group-title">
                <el-checkbox
                :disabled="lookDisable"
                  @change="groupChecked($event, item.groupName, 'platInfoManage')"
                  v-model="checkedLists[item.groupName]">
                  {{ item.groupName }}
                </el-checkbox>
              </div>
              <div class="group-items">
                <el-checkbox-group
                  v-model="checkedLists['platInfoManage'][item.groupName]"
                  @change="groupItemChecked($event, item.groupName, 'platInfoManage')">
                  <el-row>
                    <el-col
                      :span="6"
                      v-for="(jItem, jIndex) of item.features"
                      :key="jIndex">
                      <el-checkbox
                        :disabled="lookDisable"
                        :label="jItem.featureId">
                        {{ jItem.featureName }}
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane
            label="大众版微信服务号"
            :name="rightsNameIdMapping['wechatServiceNum']"
            :disabled="!rightRange.includes(rightsNameIdMapping['wechatServiceNum'])">
            <div
              class="group-wrap"
              v-for="(item, index) of features.wechatServiceNum"
              :key="index" v-if="item.groupName!='数据视图页面'">
              <div class="group-title">
                <el-checkbox
                  :disabled="lookDisable"
                  @change="groupChecked($event, item.groupName, 'wechatServiceNum')"
                  v-model="checkedLists[item.groupName]">
                  {{ item.groupName }}
                </el-checkbox>
              </div>
              <div class="group-items">
                <el-checkbox-group
                  v-model="checkedLists['wechatServiceNum'][item.groupName]"
                  @change="groupItemChecked($event, item.groupName, 'wechatServiceNum')">
                  <el-row>
                    <el-col
                      :span="6"
                      v-for="(jItem, jIndex) of item.features"
                      :key="jIndex">
                      <el-checkbox
                        :disabled="lookDisable"
                        :label="jItem.featureId">
                        {{ jItem.featureName }}
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane
            label="医生版企业微信版"
            :name="rightsNameIdMapping['docEnterpriseWechat']"
            :disabled="!rightRange.includes(rightsNameIdMapping['docEnterpriseWechat'])">
            <div
              class="group-wrap"
              v-for="(item, index) of features.docEnterpriseWechat"
              :key="index">
              <div class="group-title">
                <el-checkbox
                  :disabled="lookDisable"
                  @change="groupChecked($event, item.groupName, 'docEnterpriseWechat')"
                  v-model="checkedLists[item.groupName]">
                  {{ item.groupName }}
                </el-checkbox>
              </div>
              <div class="group-items">
                <el-checkbox-group
                  v-model="checkedLists['docEnterpriseWechat'][item.groupName]"
                  @change="groupItemChecked($event, item.groupName, 'docEnterpriseWechat')">
                  <el-row>
                    <el-col
                      :span="6"
                      v-for="(jItem, jIndex) of item.features"
                      :key="jIndex">
                      <el-checkbox
                        :disabled="lookDisable"
                        :label="jItem.featureId">
                        {{ jItem.featureName }}
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </div>
          </el-tab-pane>

           <el-tab-pane
            label="应用后台"
            :name="rightsNameIdMapping['applicationBackstage']"
            :disabled="!rightRange.includes(rightsNameIdMapping['applicationBackstage'])">
            <div
              class="group-wrap"
              v-for="(item, index) of features.applicationBackstage"
              :key="index">
              <div class="group-title">
                <el-checkbox
                  :disabled="lookDisable"
                  @change="groupChecked($event, item.groupName, 'applicationBackstage')"
                  v-model="checkedLists[item.groupName]">
                  {{ item.groupName }}
                </el-checkbox>
              </div>
              <div class="group-items">
                <el-checkbox-group
                  v-model="checkedLists['applicationBackstage'][item.groupName]"
                  @change="groupItemChecked($event, item.groupName, 'applicationBackstage')">
                  <el-row>
                    <el-col
                      :span="6"
                      v-for="(jItem, jIndex) of item.features"
                      :key="jIndex">
                      <el-checkbox
                        :disabled="lookDisable"
                        :label="jItem.featureId">
                        {{ jItem.featureName }}
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </div>
          </el-tab-pane>



        </el-tabs>

        <div class="flex-align-justify" v-show="ediRoleBtnShow">
          <el-button
            type="primary"
            class="save-btn"
            :loading="saveLoading"
            @click="addOrEditRole">
            保存
          </el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState, mapGetters} from 'vuex'
import { apiurl } from '@/service/api.js';
import { axiosConfig } from '@/service/config.js';

export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('请输入角色名称'));
      } else {
        callback();
      }
    };
    const validateDesc = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('请输入角色描述'));
      } else {
        callback();
      }
    };
    return {
      roleId: 0,
      personalForm: {//角色名称及描述
        roleName: '',
        roleDesc: ''
      },
      partAuthority: '16',
      rightRange: ['2','1', '3', '16'],
      features: {
        platInfoManage: [],
        wechatServiceNum: [],
        docEnterpriseWechat: [],
        applicationBackstage:[]
      },
      rightsNameIdMapping: {
        platInfoManage: '16',//平台信息管理
        wechatServiceNum: '3',//大众版微信服务号
        docEnterpriseWechat: '1',//医生版企业微信版
        applicationBackstage:'2',//应用后台
      },
      checkedLists: {},//绑定checkbox
      allItem: {},//暂存所有功能项
      hasSaved: false,
      saveLoading: false,
      rules: {
        roleName: [
          { validator: validateName, trigger: 'blur' }
        ],
        roleDesc: [
          { validator: validateDesc, trigger: 'blur' }
        ]
      },
      lookDisable:false,
      //权限控制
      ediRoleBtnShow:false
    };
  },
  computed: {
      ...mapGetters({moduleper:'moduleper'}),
    },
  created () {
    
    this.roleId = this.$route.query.roleId || 0;
    this.personalForm.roleName = this.$route.query.roleName || '';
    this.personalForm.roleDesc = this.$route.query.roleDesc || '';
    this.getFeatures(this.roleId);
    this.Jurisdiction();
    this.$nextTick(()=>{
      if( this.$route.query.type=='look'){
        this.lookDisable=true;
      }
    })
  },
  methods: {
    Jurisdiction(){
        //权限控制
        if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
          this.moduleper.map(item=>{
            item.children.map(item2=>{
              if(item2.feature_id==351288){//"编辑角色权限"
                if(this.$route.query.type=='edi'){
                  this.ediRoleBtnShow=true;
                }
                
              }

            })
          })
          if(this.roleId==0 || this.$route.query.type=='copy'){//新增用户保存按钮为显示
            this.ediRoleBtnShow=true;
          }
          if(this.$route.query.type=='look'){//查看按钮进来
              this.ediRoleBtnShow=false;
          }
         
        }
      },
    //获取功能点列表
    getFeatures (roleId) {
      axios.get(`${ apiurl.getFeatures }?roleId=${ roleId }`, axiosConfig).then(res => {
        console.log('功能点',res)
        if (res.hasOwnProperty('data')) {
          this.initFeatures(res.data);
        }
      }).catch(err => {
        //console.log(err);
      });
    },
    //新增&编辑角色
    postFeatures (postObj, roleId) {
      axios.post(`${ apiurl.postFeatures }${ roleId }/save`, postObj, axiosConfig).then(res => {
        if (typeof res.data === 'string') {
          this.$message.success('保存成功');
          this.$router.push({ name: 'personalSettings' });
        }
      }).catch(err => {
        //console.log(err);
      });
    },

    //初始化功能点列表数据
    initFeatures (list) {
      let checkedLists = {
        platInfoManage: {},
        wechatServiceNum: {},
        docEnterpriseWechat: {},
        applicationBackstage:{}
      };
      list.forEach(element => {
        if (element.features && element.features[0]) {
          const group = this.filterGroup(element.features[0].featureProp);
          this.allItem[element.groupName] = [];
          checkedLists[group][element.groupName] = [];
          checkedLists[element.groupName] = element.checked;
          element.features.forEach((item, index) => {
            if (index === 0) {
              this.features[group].push(element);
            }
            if (item.checked) {
              checkedLists[group][element.groupName].push(item.featureId);
            }
            this.allItem[element.groupName].push(item.featureId);
          });
        }
      });
      this.checkedLists = checkedLists;
    },
    //点击保存按钮
    addOrEditRole () {
      this.$refs['personalForm'].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          this.hasSaved = true;
          let rightRange = ['docEnterpriseWechat', 'wechatServiceNum', 'platInfoManage','applicationBackstage'],
              funNodes = [],
              postObj = {};
          rightRange.forEach(element => {
            if (this.rightRange.includes(this.rightsNameIdMapping[element])) {
              for(let item in this.checkedLists[element]) {
                funNodes = funNodes.concat(this.checkedLists[element][item]);
              }
            }
          });
          postObj['fun_Nodes'] = funNodes.join(',');
          postObj['role_desc'] = this.personalForm.roleDesc.trim();
          postObj['role_name'] = this.personalForm.roleName.trim();
          postObj['role_id'] = this.roleId;
          if(postObj.fun_Nodes==""){
            this.$message({
              type: 'warning',
              message:'请选择权限！'
            });
            this.saveLoading=false;
            return;
          }
          let roleId=0;
          if(this.$route.query.type=='edi'){
            roleId=this.roleId;
          }
          
          this.postFeatures(postObj,roleId);
        } else {
          return false;
        }
      });
    },
    //筛选功能属性分类
    filterGroup (featureProp) {
      switch (featureProp) {
        case 1:
          return 'docEnterpriseWechat';
        case 3:
          return 'wechatServiceNum';
        case 16:
          return 'platInfoManage';
        case 2:
          return 'applicationBackstage';
      }
    },

    rightRangeChange (val) {
      if (!val.includes(this.partAuthority)) {
        this.partAuthority = val.sort((a, b) => {
          return b - a;
        })[0] || '';
      }
    },
    groupChecked (val, groupName, featureName) {
      if (!val) {
        this.checkedLists[featureName][groupName] = [];
      } else {
        this.checkedLists[featureName][groupName] = this.allItem[groupName];
      }
    },
    groupItemChecked (val, groupName, featureName) {
      if (val.length === this.allItem[groupName].length) {
        this.checkedLists[groupName] = true;
      } else {
        this.checkedLists[groupName] = false;
      }
    },
    back () {
      this.$router.push({ name: 'personalSettings' });
    }
  },
  // 组件内导航钩子，处理表单未保存退出的情况
  beforeRouteLeave (to, from, next) {
    if (!this.hasSaved && (this.$route.query.type=='edi' || this.$route.query.type=='copy')) {
      next(false);
      setTimeout(()=>{
        this.$confirm('您尚未保存，离开将会丢失目前编辑的数据，是否离开？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        // 选择确定
        next();
      });
      },20)
    } else {
      next();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/stylus">
@import "personalCenter.scss";
</style>

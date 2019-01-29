<template>
  <div class="personalSettings personalCenter main_layout">
    <div class="page-title">权限管理</div>
    <div class="bg-white">
      <hr class="tabs-hr"/>
      <el-tabs v-model="perSetTab">
        <el-tab-pane label="管理员设置" name="first">
          <el-button type="primary" @click="toAddAdmin" class="add-btn" v-show="addAdminShow">新增人员</el-button>
          <el-table :data="currentOrgUserList" style="width: 100%" :header-row-style="tableHeaderStyle" v-loading="AdminLoading">
            <el-table-column prop="realName" label="姓名">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="roles[0].roleName" label="所属角色">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <span v-show="lookAdminShow">
                   <el-button type="text" size="medium" @click="toDetail(scope.row)" v-show="scope.row.proj_code=='1'">编辑
                    </el-button>
                </span>
               <span v-show="removeAdminShow">
                  <el-button type="text" size="medium" @click="deleteAdmin(scope.row)" v-show="scope.row.proj_code=='1'">删除
                </el-button>
               </span>
               
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="second">
          <el-button type="primary" class="add-btn" @click="addRole" v-show="addRoleShow">新增角色</el-button>
          <el-table :data="partData" style="width: 100%" :header-row-style="tableHeaderStyle">
            <el-table-column prop="roleName" label="角色名称">
            </el-table-column>
            <el-table-column prop="roleProperty" label="角色描述">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <span v-show="lookRoleShow"> 
                    <el-button type="text" size="medium" v-show="scope.row.canEdit!=1" @click="toRoleDetail(scope.row,'look')">查看
                    </el-button>
                </span>
                <span v-show="lookRoleShow"> 
                    <el-button type="text" size="medium" @click="toRoleDetail(scope.row,'edi')" v-show="scope.row.canEdit==1">编辑
                    </el-button>
                </span>
                <span v-show="addRoleShow"> 
                    <el-button type="text" size="medium" v-show="scope.row.canEdit!=1" @click="toRoleDetail(scope.row,'copy')">复制
                    </el-button>
                </span>
               <span v-show="ediRoleShow">
                 <el-button type="text" size="medium" @click="sendMsg(scope.row)" v-show="scope.row.canEdit==1">删除
                </el-button>
               </span>
                
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增管理员 -->
    <el-dialog title="填写邀请管理员验证信息" :visible.sync="addAdminDialog" width="800px">
      <div class="form-wrap">
        <el-form :model="personalForm" :rules="rules" ref="personalForm" label-width="120px">
          <el-form-item label="姓名" prop="realName">
            <el-input placeholder="请填写邀请者的姓名" v-model="personalForm.realName" class="width340"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请填写邀请者的手机号" v-model="personalForm.phone" class="width340"></el-input>
          </el-form-item>
          <el-form-item class="button-item">
            <el-button type="primary" @click="submitForm('personalForm')">确认邀请</el-button>
          </el-form-item>
          <p class="pncLabel color666">确认邀请后，请将邀请链接或者邀请二维码发送至被邀请人。</p>
        </el-form>
      </div>
    </el-dialog>
    <!-- 编辑管理员 -->
    <el-dialog title="编辑" :visible.sync="editAdminDialog" width="800px" class="edit-dialog">
      <el-scrollbar class="scrollbar">
        <div class="wrapper">
          <section>
            <div class="title-wrap">
              <span class="content-title color-333">管理员信息</span>
              <span class="vice-title color666">邀请成功后无法修改</span>
            </div>
            <div>
              <el-form label-width="105px" v-model="editForm">
                <el-form-item label="姓名">{{editForm.realName}}</el-form-item>
                <el-form-item label="手机号">{{editForm.phone}}</el-form-item>
                <!-- <el-form-item label="联系邮箱">lihuiru@zhuojianchina.com</el-form-item> -->
              </el-form>
            </div>
          </section>
          <hr class="edit-dialog-hr"/>
          <section>
            <div class="title-wrap">
              <span class="content-title color-333">管理员角色权限</span>
              <!-- <span class="vice-title color666">可多选</span> -->
            </div>
            <el-radio-group v-model="checkList">
              <div v-for="item in checkItems.roles" class="radioClass" :key="item.roleID">
                <el-radio  :label="item.roleID">{{item.roleName}}</el-radio>
              </div>
            </el-radio-group>
            <!-- <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item, index) of checkItems" :key="index" :label="item.option" class="checkbox-item">
                <span>{{ item.option }}</span><span>{{ item.description }}</span>
              </el-checkbox>
            </el-checkbox-group> -->
          </section>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit" :disabled="hasSelected" v-show="ediAdminBtnShow">确认修改</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import axios from 'axios';
import {apiurl} from '@/service/api.js';
import {axiosConfig} from '@/service/config.js';
  export default {
    created() {
      this.getAdminListload();
      
    },
    data() {
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else if (!/\d([-]\d)?$/.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        }
        return callback();
      };
      return {
        addAdminDialog: false,
        editAdminDialog: false,
        canAddadmin: false,
        checkList: 0,
        editForm:{},
        checkItems: [],
        personalForm: {
          realName: "",
          phone: ""
        },
        perSetTab: 'first',
        partData: [],
        rules: {
          realName: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }],
          phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
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
          ]
        },
        tableHeaderStyle: {
          'color': '#333',
          'font-size': '16px'
        },
        AdminLoading:true,
        oldCheck:0,
        currentOrgUserList:[],
        //权限控制
        addAdminShow:false,
        lookAdminShow:false,
        addRoleShow:false,
        lookRoleShow:false,
        ediAdminBtnShow:false,
        removeAdminShow:false,
        ediRoleShow:false
      };
    },
    mounted(){
      this.Jurisdiction();
      this.getRole();
    },
    methods: {
      Jurisdiction(){
        //权限控制
        if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
          // //console.log(this.moduleper)
          this.moduleper.map(item=>{
            item.children.map(item2=>{
              if(item2.feature_id==351283){//"新增/邀请管理员"
                this.addAdminShow=true;
              }else if(item2.feature_id==351282){//"查看管理员设置"
                this.lookAdminShow=true;
              }else if(item2.feature_id==351286){//"查看角色管理"
                this.lookRoleShow=true;
              }else if(item2.feature_id==351287){//"新增角色"
                this.addRoleShow=true;
              }else if(item2.feature_id==351284){//"编辑管理员角色信息"
                this.ediAdminBtnShow=true;
              }else if(item2.feature_id==351285){//""删除管理员""
                this.removeAdminShow=true;
              }else if(item2.feature_id==351289){//"删除角色"
                this.ediRoleShow=true;
              }

            })
          })
        }
      },
      getAdminListload(){
         this.AdminLoading=true;
        this.$store.dispatch({type: 'getOrgGateway'}).then(() =>{
          //proj_code:0==>不可以删除跟编辑，1可以删除和编辑
        this.$store.dispatch({type: 'currentOrgUsers', orgId: this.orgGatewayInfo.defaultPlatformHospitalId,  pageNo: '1', pageSize: '10'}).then((res)=>{
          // //console.log(res);
          this.AdminLoading=false;
          this.currentOrgUserList=res.data;
          
        });
        
        this.$store.dispatch({type: 'getPlatformHospitalByGatewayInfo'}).then((res)=>{
          if(res.data.auditStatus==40){
            this.canAddadmin=true
          }
        });
      });
      },
      getAdminqxList(){
        axios.get(`${apiurl.getUserAdminlist}${this.editForm.userId}/role`,axiosConfig).then((res)=>{
          // //console.log(res.data);
          if(res.data){
            this.checkItems=res.data[0];
            if(res.data[0].currentRoleID!=0){
              this.checkList=res.data[0].currentRoleID;
              this.oldCheck=res.data[0].currentRoleID;
            }
          }
        })
      },
      sendMsg(item){//删除角色
          this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.delete(`${apiurl.deleteRoles}${item.roleId}/delete`,axiosConfig).then((res)=>{
              // //console.log('删除角色',res);
              if(res.data){
                this.getRole();
                this.$message({
                type: 'success',
                message: res.data
              });
              }
            })
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      addRole(){//新增角色
        this.$router.push({
          name: 'newPart',
        });
      },
      getRole(){//获取角色列表
        axios.get(apiurl.userRoleslist,axiosConfig).then((res)=>{
          // //console.log('角色列表',res);
          if(res.data){
            this.partData=res.data;
          }
        }).catch((err)=>{
          //console.log(err)
        })
      },
      toDetail (item) {
        this.editAdminDialog = true;
        this.editForm = item;
        this.checkList=0;
        this.oldCheck=0;
        this.getAdminqxList();
      },
      toRoleDetail(item,type){
        this.$router.push({
          name: 'newPart',
          query: {
            roleId: item.roleId,
            roleName: item.roleName,
            roleDesc: item.roleProperty,
            type:type
          }
        });
        // //console.log(item)
      },

      deleteAdmin(item){
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.AdminLoading=true;
          this.$store.dispatch({
          type: 'deleteAdmin',
          orgInfo: {
            user_id: item.userId,
            roles:item.roles
          }
          }).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            if(this.adminDeleteSuccess){
              this.$store.dispatch({type: 'currentOrgUsers', orgId: this.orgGatewayInfo.defaultPlatformHospitalId,  pageNo: '1', pageSize: '10'}).then((res)=>{
                 this.AdminLoading=false;
                this.currentOrgUserList=res.data;
              });
            }
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
        
      },
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // //console.log(this.personalForm.phone)
            this.$store.dispatch({
              type: 'validateUserOrgBinding', 
              info: {phone: this.personalForm.phone}
              }).then(()=>{
                this.$router.push({
                path: `/personalCenter/shareLink`,
                query: {
                  name: this.personalForm.realName,
                  phoneNum: this.personalForm.phone
              }
            });
            });
          } else {
            return false;
          }
        });
        
      },
      confirmEdit () {
        let data;
        this.checkItems.roles.map(item=>{
          if(item.roleID==this.checkList){
            data={
              unions:[
                {
                  roles:[item]
                }
              ]
            }
            return;
          }
        })
        axios.post(`${apiurl.saveUserAdmin}${this.editForm.userId}/save`,data,axiosConfig).then((res)=>{
          // //console.log('保存',res);
          if(res.data && !res.data.hasOwnProperty('code')){
            this.getAdminListload();
             this.$message({
                type: 'success',
                message: '保存成功!'
              });
          }
        }).catch((err)=>{
          //console.log(err);
        })


        this.editAdminDialog = false;




      },
      toAddAdmin(){
        if(this.canAddadmin){
          this.addAdminDialog = true;
        }else{
          this.$message.error('机构未认证，不允许邀请');
          
        }
        
      }
    },
    computed: {
      hasSelected () {
        return this.checkList!=this.oldCheck? false : true;
      },
      ...mapState({
        // currentOrgUserList: state => state.user.currentOrgUserList,
        orgGatewayInfo: state => state.user.orgGatewayInfo,
        adminDeleteSuccess: state => state.user.adminDeleteSuccess,
        platformHospital: state => state.application.platformHospital,
      }),
      ...mapGetters({moduleper:'moduleper'}),
    },
    watch: {
      addAdminDialog () {
        if (this.addAdminDialog === false) {
          this.$refs.personalForm.resetFields();
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
$color-e4e7ed: #E4E7ED;
.bg-white {
  padding: 10px 24px;
  position: relative;
  min-height: 683px;
}
.color666 {
  color: #666;
}
.tabs-hr {
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  border: 1px $color-e4e7ed solid;
}
.edit-dialog-hr {
  margin: 30px 0;
  border-top: 1px $color-e4e7ed solid;
  border-bottom: none;
}
.add-btn {
  margin: 15px 0 30px;
  padding: 9px 0;
}
.pncLabel {
  letter-spacing: 0.17px;
  margin: -20px 0 129px 20px;
  text-align: center;
}
.form-wrap {
  margin-bottom: 0 !important;
}
.title-wrap {
  margin-bottom: 20px;
  font-size: 14px;
}
.content-title {
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  letter-spacing: 0.17px;
  margin-right: 20px;
}
.vice-title {
  letter-spacing: 0.2px;
}
.checkbox-item span{
  letter-spacing: 0.2px;
  &:first-child {
    color: #333;
    margin-right: 29px;
  }
  &:last-child {
    color: #666;
  }
}
.scrollbar {
  height: 100%;
  width: 100%;
}
.wrapper {
  padding: 20px;
}
</style>

<style lang="scss" rel="stylesheet/stylus">
@import "personalCenter.scss";
$color-42a84b: #42A84B;
$color-35b53f: #35B53F;
$color-7fcc7f: #7FCC7F;
$border-f2f2f2: 1px #F2F2F2 solid;
$border-e7e7e7: 1px #E7E7E7 solid;
.radioClass{
  margin-bottom:20px;
}
.personalSettings {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-tabs__item.is-active {
    font-family: MicrosoftYaHei-Bold;
    color: #333;
    font-weight: bold;
  }
  .el-tabs__item {
    font-size: 16px;
    color: #999;
    &:hover {
      color: $color-42a84b;
    }
    &.is-disabled:hover {
      color: #999;
    }
  }
  .el-tabs__active-bar {
    background-color: $color-42a84b;
  }
  .el-table {
    border-left: $border-f2f2f2;
    border-right: $border-f2f2f2;
  }
  .el-table th {
    background: #F2F2F2;
    font-weight: 500;
  }
  .cell .el-button {
    min-width: 0;
    padding: 9px 12px 9px 0;
  }
  .el-dialog__header {
    padding: 29px 20px 22px 24px;
  }
  .el-dialog__title {
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #333;
    letter-spacing: 0.2px;
    line-height: 16px;
    font-weight: bold;
  }
  .el-dialog__body {
    border-top: $border-e7e7e7;
    padding: 20px;
  }
  .edit-dialog {
    .el-dialog__body {
      border-bottom: $border-e7e7e7;
      height: 43vh;
      padding: 0;
    }
    .el-form-item__label, .el-form-item__content {
      line-height: 18px;
      font-size: 16px;
      letter-spacing: 0;
    }
    .el-form-item__label {
      padding-right: 40px;
      color: #666;
    }
    .el-form-item__content {
      color: #333;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-checkbox-group {
      border: $border-e7e7e7;
      padding: 20px 20px 0;
    }
    .el-checkbox {
      display: block;
      margin-bottom: 20px;
      &+.el-checkbox {
        margin-left: 0;
      }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background: $color-35b53f;
      border-color: $color-35b53f;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: $color-35b53f;
    }
  }
  .el-dialog__footer {
    padding: 16px 20px 20px;
    button {
      padding: 9px 0;
    }
  }
  .el-button--primary.is-disabled {
    background: $color-7fcc7f;
    border-color: $color-7fcc7f;
  }
  .el-dialog__headerbtn {
    top: 31px;
  }
  .el-form-item__label {
    padding-right: 20px;
  }
  .button-item {
    button {
      padding: 16px 171px;
      font-size: 16px;
    }
    .el-form-item__content {
      margin-left: 53px !important;
    }
  }
}
</style>

<template>
  <div v-loading="saveLoading" class="deptMumbers">
    <div class="deptName">
      {{ queryFormType=='edit'?'编辑成员':'添加成员' }}
      <div class="admBtns">
        <el-button v-if="queryFormType!='edit'" type="success" @click="saveDoctor('doctorForm', 'continue')">保存并继续添加</el-button>
        <el-button type="primary" plain @click="saveDoctor('doctorForm', '')">保存</el-button>
        <el-button @click="bankToList">取消</el-button>
      </div>
    </div>
    <div class="admInfoWrite">
      <el-row>
        <el-col :span="20">
          <el-form :model="doctorForm" :rules="rules" ref="doctorForm" label-width="150px" class="widthInitial">
            <el-form-item label="工号" prop="workId">
              <el-input v-model="doctorForm.workId" class="maxWidth300"></el-input>
            </el-form-item>
            <el-form-item label="医生姓名" prop="name">
              <el-input v-model="doctorForm.name" class="maxWidth300"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="doctorForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="doctorForm.phone" class="maxWidth300"></el-input>
            </el-form-item>
            <el-form-item label="科室" :rules="[ { required: true, message: '请选择科室'}]">
              <el-button v-show="pageDeptList.length==0" type="text" class="text-underline" @click="selectDept">选择科室</el-button>
              <div v-show="pageDeptList.length>0">
                <el-tag class="dept-tag" v-for="(item, index) of pageDeptList" :key="index" closable @close="pageDeleteTag(item.id)">
                  {{ item.name }}
                </el-tag>
                <el-button type="text" class="text-underline" @click="selectDept">修改</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-dialog class="dept-choose-dialog" title="选择范围" :visible.sync="deptChooseDialog" width="701px">
      <el-container class="dept-choose-dialog-container">
        <el-aside class="dept-choose-dialog-layout" width="260px">
          <el-scrollbar class="scrollbar">
            <div class="menu-wrap">
              <el-input :maxlength="20" placeholder="请输入科室名称" v-model="docInfoSearch" class="input-with-select" @input="filterDept">
                <i class="icon-search el-icon-search el-input__icon" slot="suffix"></i>
              </el-input>
              <el-tree ref="treeMenu" v-loading="menuLoading" :data="leftMenuData" :props="defaultProps"
                :default-expand-all="true" :filter-node-method="filterNode" :expand-on-click-node="false" @node-click="selectNode($event)"
                node-key="id">
                <span slot-scope="{ node, data }">
                  <!-- <span> -->
                  <!-- <i class="icon_tab icon-menu-file"></i> -->
                  <span :title="data.sectionName" class="menu-item-title-text">{{ data.sectionName }}</span>
                  <!-- </span> -->
                  <!-- <span @click="handCommandCel($event)" class="dropdown"></span> -->
                </span>
              </el-tree>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-main class="dept-choose-dialog-layout">
          <el-scrollbar class="scrollbar">
            <div class="dept-wrap">
              <p class="dept-choose-tip">成员将属于以下部门</p>
              <el-tag class="dept-tag" v-for="(item, index) of Object.keys(deptList)" :key="index" :disable-transitions="true"
                closable @close="deleteTag(item, 2)">
                {{ deptList[item] }}
              </el-tag>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfirDept">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    axiosget,
    axiospost,
    aixospatch
  } from "../../service/config.js"
  import {
    uploadImgApi
  } from '../../service/application.js'
  import {
    insertDoctorApi
  } from '../../service/hospital.js'
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'
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
      return {
        saveLoading: false,
        deptChooseDialog: false,
        photoLoading: false,
        queryFormType: '', // 标记是‘新增’还是‘编辑’
        queryHospitalId: '',
        queryUserId: '',
        queryPhone: '',
        queryDoctorId:'',
        querySectionId: '',
        querySectionType: 0,
        querySectionName: '',
        docInfoSearch: '',
        infoSearch: '',
        leftMenuData: [],
        defaultProps: {
          children: 'sessionChilds',
          label: 'sectionName'
        },
        activeTopMenu: 'index',
        tabShow: true, //顶部导航是否显示
        activeArr: ['2', '3', '4'],
        leftTabShow: false,
        leftDocTabShow: false,
        loginState: true, //登入state
        appList: [],
        jgState: 0,
        jgName: "",
        menuLoading: true,
        pageDeptList: [],
        doctorForm: {
          hospitalId: '',
          name: '',
          phone: '',
          photoPath: '',
          sectionIds: [],
          sex: 1,
          workId: '',
          imageUrl: ''
        },
        deptList: {}, //选择科室列表
        selectedDeptList: {}, //确定选择的科室列表
        rules: {
          workId: [{
            required: true,
            message: '请输入工号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入医生姓名',
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }],
          phone: [{
              required: true,
              message: '请输入手机号',
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
          ],
        }
      }
    },
    created() {
      let self = this;
      self.doctorForm.hospitalId = self.$route.query.hospitalId;
      self.userHosId = self.$route.query.hospitalId;
      self.queryFormType = self.$route.query.formType;
      self.queryUserId = self.$route.query.userId;
      self.queryPhone = self.$route.query.phone;
      self.queryDoctorId = self.$route.query.doctorId;
      self.queryHospitalId = self.$route.query.hospitalId;
      self.querySectionId = self.$route.query.sectionId;
      self.querySectionType = self.$route.query.sectionType;
      self.querySectionName = self.$route.query.sectionName;
      if (self.queryFormType == 'edit') {
        self.getMemberInfo();
      }
      if (self.querySectionType != 11) {
        // 初始化页面科室
        self.doctorForm.sectionIds.push(self.querySectionId);
        self.pageDeptList.push({
          id: self.querySectionId,
          name: self.querySectionName
        });
        // 初始化弹窗选中的科室
        self.$set(self.deptList, self.querySectionId, self.querySectionName);
      }
      self.getDeptList();
    },
    methods: {
      // 编辑的话 获取成员信息
      getMemberInfo() {
        let self = this;
        axiosget(
          `/hospital/member/admin/getDoctorInfo?hosId=${self.userHosId}&userId=${self.queryUserId}&doctorId=${self.queryDoctorId}`
        ).then(res => {
          if (res.data) {
            self.doctorForm.name = res.data.name;
            self.doctorForm.phone = res.data.phone;
            self.doctorForm.sectionIds = [];
            self.pageDeptList = [];
            res.data.doctorList.forEach((item, index) => {
              self.doctorForm.sectionIds.push(item.sectionId);
              self.pageDeptList.push({
                id: item.sectionId,
                name: item.sectionName
              });
            });
            self.doctorForm.sex = parseInt(res.data.sex);
            self.doctorForm.workId = res.data.workId;
            //console.log('成员信息', res.data)
          }
        })
      },
      // 取消
      bankToList() {
        this.$router.go(-1);
      },
      // 上传医生头像
      uploadPhoto(res) {
        if (res.file == "") {
          this.$message.error('请选择图片');
          return;
        }
        let file = new FormData();
        file.append("file", res.file);
        this.photoLoading = true;
        uploadImgApi(file).then((d) => {
          if (d && d.status == 200) {
            this.photoLoading = false;
            this.$message.success('上传成功');
            this.doctorForm.photoPath = d.data.url;
          }
        }).catch((err) => {
          this.photoLoading = false;
        });
      },
      imgChange(file) {
        this.doctorForm.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess(res, file) {
        this.doctorForm.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        let isImageArr = file.name.split('.');
        let isImage = isImageArr[isImageArr.length - 1];
        //console.log(isImage);
        const isJPG = (isImage == 'PNG' || isImage == 'png' || isImage == 'jpg' || isImage == 'jpeg');
        const isLt500kb = file.size / 1024 / 1024 / 1024 < 500;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 png，jpg，jpeg 格式!');
        }
        if (!isLt500kb) {
          this.$message.error('上传头像图片大小不能超过 500kb!');
        }
        return isJPG && isLt500kb;
      },
      //获取科室列表
      getDeptList() {
        axiosget(`/hospital/department/admin/getSectionListByUserHosId?userHosId=${ this.userHosId }&date=${new Date().getTime()}`).then(res => {
          if (res.data) {
            this.leftMenuData = res.data;
            this.menuLoading = false;
          }
        }).catch(err => {
          this.menuLoading = false;
          console.error(err);
        });
      },

      //点击选择或修改科室
      selectDept() {
        let self = this;
        self.getDeptList();
        self.deptList = {};
        self.pageDeptList.forEach((item, index) => {
          self.$set(self.deptList, item.id, item.name);
        });
        self.deptChooseDialog = true;
      },
      //搜索科室
      filterDept() {
        this.$refs['treeMenu'].filter(this.docInfoSearch);
      },
      filterNode(val, data, node) {
        if (!val) return true;
        return data.sectionName.indexOf(val) !== -1;
      },
      //点击具体科室选择科室
      selectNode(data) {
        if (data.sectionType !== 11) {
          this.$set(this.deptList, data.sectionId, data.sectionName);
        }
      },
      //删除科室标签  operationCode 1:页面中删除 2:弹框中删除
      deleteTag(sectionId, operationCode) {
        if (operationCode === 1) {
          let selectedDeptList = Object.assign({}, this.selectedDeptList);
          delete selectedDeptList[sectionId];
          this.selectedDeptList = selectedDeptList;
        } else if (operationCode === 2) {
          let deptList = Object.assign({}, this.deptList);
          delete deptList[sectionId];
          this.deptList = deptList;
        }
      },
      // 页面上删除科室
      pageDeleteTag(sectionId) {
        let self = this;
        self.pageDeptList = self.pageDeptList.filter((item, index) => {
          return item.id != sectionId
        });
        self.doctorForm.sectionIds = self.doctorForm.sectionIds.filter((item, index) => {
          return item != sectionId
        });
      },
      comfirDept() {
        let self = this;
        self.doctorForm.sectionIds = [];
        self.pageDeptList = [];
        Object.keys(self.deptList).forEach((item, index) => {
          self.doctorForm.sectionIds.push(item);
          self.pageDeptList.push({
            id: item,
            name: self.deptList[item]
          });
        });
        // //console.log('处理选中科室：', self.doctorForm.sectionIds);
        self.deptChooseDialog = false;
      },
      handCommandCel(e) {
        e.stopPropagation();
      },
      // 保存成员，type来区分是‘保存并继续添加’还是‘保存’
      saveDoctor(formName, type) {
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            // if(self.doctorForm.photoPath == '' ) {
            //     self.$alert('请上传头像', '提示', {
            //         confirmButtonText: '确定',
            //     });
            //     return false;
            // }
            if (!self.doctorForm.sectionIds || self.doctorForm.sectionIds.length == 0) {
              self.$alert('请选择科室', '提示', {
                confirmButtonText: '确定',
              });
              return false;
            }
            let submitForm = self.doctorForm;
            delete submitForm.imageUrl;
            // self.saveLoading = true;
            if (self.queryFormType == 'edit') {
              submitForm.userId = self.queryUserId;
            }
            insertDoctorApi(
              submitForm
            ).then((res) => {
              // self.saveLoading = false;
              self.$message({
                message: res.data,
                type: 'success'
              });
              self.doctorForm = {};
              self.doctorForm = {
                hospitalId: self.$route.query.hospitalId,
                name: '',
                phone: '',
                photoPath: '',
                sectionIds: [],
                sex: 1,
                workId: '',
                imageUrl: ''
              };
              self.pageDeptList = [];
              if (type == '') {
                self.$router.push({
                  path: '/docAccountManage/deptMumbers'
                });
              }
            })
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
    },
  }

</script>
<style lang="scss">
  @import '/docAccountManage.scss';

  .deptMumbers {
    .icon-search {
      cursor: pointer;
    }

    .avatar-uploader .el-upload {
      width: 80px;
      height: 80px;
      border: 1px dashed #ccc;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }

    .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }

    .dept-tag {
      margin: 0 20px 20px 0;
    }

    .a-tag {
      cursor: pointer;
      text-decoration: underline;
      color: #3C9EF8;
    }

    .dept-choose-dialog {
      .el-dialog__body {
        border-top: 1px #E7E7E7 solid;
        border-bottom: 1px #E7E7E7 solid;
        padding: 0 0 0 24px;
      }

      .el-aside,
      .el-main {
        padding: 0;
      }

      .menu-item-title-text {
        display: inline-block;
        max-width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .dept-choose-dialog-layout {
      height: 100%;
    }

    .dept-form-item {
      .el-form-item__content {
        width: 100%;
      }
    }

    .scrollbar {
      height: 100%;

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .dept-choose-dialog-container {
      height: 470px;
    }

    .menu-wrap {
      padding: 20px 20px 0 0;
    }

    .dept-wrap {
      padding: 20px 20px 0 20px;
    }

    .dept-choose-tip {
      margin-bottom: 20px;
    }
  }

</style>

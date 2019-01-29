<template>
  <el-container class="docAccountManage">
    <el-header height="40px">请在下方医生账号管理录入医生信息，然后下载企业微信通过录入的手机号进行登录才能使用医护版功能</el-header>
    <el-container>
      <el-aside width="310px">
        <div class="damLeftSearch">
          <el-input :maxlength="20" placeholder="请输入科室名称" v-model="docInfoSearch" class="input-with-select" @input="filterDept">
            <i class="el-icon-search el-input__icon" slot="suffix">
            </i>
          </el-input>
        </div>
        <el-tree ref="layoutTreeMenu" v-loading="menuLoading" :data="leftMenuData" :props="defaultProps" :class="deptSearch?'damTree':''"
          :filter-node-method="filterNode" node-key="id" current-node-key highlight-current @node-click="openDeptMenberList($event)">
          <span class="menu-item" slot-scope="{ node, data }">
            <span class="menu-item-title">
              <i v-if="data.sectionType !== 13" class="icon_tab icon-menu-file"></i>
              <span :title="data.sectionName" class="menu-item-title-text">{{ data.sectionName }}</span>
            </span>
            <span @click="handCommandCel($event)" class="dropdown">
              <el-dropdown placement="bottom-start" trigger="click" @command="handleCommand($event, data, node)">
                <span class="el-dropdown-link">
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu v-if="data.sectionType === 11" slot="dropdown">
                  <el-dropdown-item command="1">新增一级科室</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-if="data.sectionType === 12" slot="dropdown">
                  <el-dropdown-item command="1">新增二级科室</el-dropdown-item>
                  <el-dropdown-item command="2">删除</el-dropdown-item>
                  <el-dropdown-item divided disabled>部门ID:{{ data.sectionId }}</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-if="data.sectionType === 13" slot="dropdown">
                  <el-dropdown-item command="2">删除</el-dropdown-item>
                  <el-dropdown-item divided disabled>部门ID:{{ data.sectionId }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </el-tree>
      </el-aside>
      <el-main class="index-main">
        <section class="layout-page-content" style="height:100%;">
          <router-view :key="key"></router-view>
        </section>
      </el-main>
    </el-container>
    <el-dialog :title="'aaa'?'新建名称':'修改名称'" :visible.sync="editDialog" width="600px">
      <el-form :model="addMenuForm" :rules="rules" ref="addMenuForm" label-width="120px">
        <el-form-item label="科室名称" prop="menuName">
          <el-input autofocus placeholder="请输入科室名称" :maxlength="20" v-model="addMenuForm.menuName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" @click="submitForm('addMenuForm')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除科室" :visible.sync="deleteDialog" width="600px">
      请删除此科室下的成员或者子科室后，再删除此科室
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
  import {
    axiosget,
    axiospost,
    aixospatch
  } from "../../service/config.js"
  import {
    mapGetters,
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'
  import {
    exportLocalUrl
  } from "@/service/baseuri";
  export default {
    data() {
      return {
        editDialog: false,
        deleteDialog: false,
        menuLoading: true,
        deptSearch: false,
        preActiveToolRef: '', //上一个打开的工具框，新增科室、删除的框
        docInfoSearch: '',
        // leftMenuData: [],
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
        addMenuForm: {
          menuName: '',
        },
        parentNode: {},
        rules: {
          menuName: [{
            required: true,
            message: '请输入科室名称',
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      ...mapState({
        leftMenuData: state => state.hospital.leftMenuData
      }),
      //解决路由query变化数据不刷新的问题
      key() {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
      },
    },
    created() {
      this.userHosId = this.$store.getters.chooseOrgInfo.userHospitalId;
      this.getDeptList();
    },
    methods: {
      ...mapMutations([
        'setLeftMenuData',
        'addMenuNode',
        'deleteMenuNode',
        'setLeftClickData'
      ]),
      //获取科室列表
      getDeptList() {
        axiosget(
          `/hospital/department/admin/getSectionListByUserHosId?userHosId=${ this.userHosId }&date=${new Date().getTime()}`
        ).then(res => {
          if (res.data) {
            this.setLeftMenuData(res.data);
            this.menuLoading = false;
          }
        })
      },
      //新增&编辑科室
      addOrEditDept(postObj, data) {
        axiospost(`hospital/department/admin/insertSection`, postObj).then(res => {
          if (typeof res.data === 'string') {
            this.$message.success('新增成功');
            const newChild = {
              hospitalId: postObj.hospitalId,
              parentId: postObj.parentId,
              sectionId: res.data.slice(1),
              sectionName: postObj.sectionName,
              sectionType: postObj.sectionType,
              sessionChilds: []
            };
            this.addMenuNode({
              data,
              newChild
            });
          }
        }).catch(err => {
          console.error(err);
        });
      },
      //删除科室
      deleteDept(node, data, sectionId) {
        axiospost(`/hospital/department/admin/deleteSection?sectionId=${ sectionId }`).then(res => {
          if (typeof res.data === 'string') {
            this.$message.success(res.data);
            // this.getDeptList();
            this.deleteMenuNode({
              node,
              data
            });
            this.$router.push({
              path: '/docAccountManage/deptMumbers'
            })
          }
        }).catch(err => {
          console.error(err);
        });
      },
      handCommandCel(e) {
        e.stopPropagation();
      },
      handleCommand(val, data, node) {
        this.parentNode = data;
        if (val === '1') {
          if (this.$refs['addMenuForm']) {
            this.$refs['addMenuForm'].resetFields();
          }
          this.editDialog = true;
        }
        if (val === '2') {
          this.$confirm('确定要删除该科室吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteDept(node, data, data.sectionId);
          });
        }
      },
      //搜索科室
      filterDept() {
        if (this.docInfoSearch) {
          this.deptSearch = true;
        } else {
          this.deptSearch = false;
        }
        this.$refs['layoutTreeMenu'].filter(this.docInfoSearch);
      },
      filterNode(val, data) {
        if (!val) return true;
        return data.sectionName.indexOf(val) !== -1;
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.editDialog = false;
            let {
              hospitalId,
              sectionId,
              sectionType
            } = this.parentNode,
              postObj = {
                sectionName: this.addMenuForm.menuName,
                parentId: sectionId,
                sectionType: ++sectionType,
                hospitalId
              }
            this.addOrEditDept(postObj, this.parentNode);
          } else {
            return false;
          }
        });
      },
      openDeptMenberList(data) {
        //console.log(data)
        this.setLeftClickData(data);
        this.$router.push({
          path: '/docAccountManage/deptMumbers',
          query: {
            hosId: data.hospitalId,
            sectionId: data.sectionId,
            sectionType: data.sectionType,
            parentId: data.parentId,
          }
        })
      }
    }
  }

</script>
<style lang="scss">
  @import '/docAccountManage.scss';

  .dropdown {
    display: none;
  }

  .el-tree-node__content:hover {
    .dropdown {
      display: initial;
    }
  }

  .damTree .el-icon-caret-right:before {
    display: inline-block;
    width: 12px;
    content: " ";
  }

  .docAccountManage {
    .el-tree-node__content {
      height: 40px;
    }

    .menu-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .menu-item-title {
      display: flex;
      align-items: center;

      i {
        margin-right: 10px;
      }
    }

    .menu-item-title-text {
      max-width: 160px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown {
      padding-right: 20px;
    }
  }

  // 页面内容区上方的标题
  .page-title {
    font-size: 14px;
    color: #666;
    height: 59px;
    line-height: 59px;
    background-color: #f6f8f9;
    margin-top: -7px;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    background: transparent;

    .menu-title-text {
      color: #368F3E;
    }
  }

  .el-submenu__title:hover {
    background: transparent;

    .menu-title-text {
      color: #368F3E;
    }
  }

  .menu-title-text {
    color: #333;

    &.paddingleft95 {
      padding-left: 95px !important;
    }
  }

  .el-menu {
    border: none;
  }

  li.el-dropdown-menu__item:hover {
    color: rgb(4, 115, 14) !important;
    background: rgb(230, 241, 231) !important;
  }

  .page-layout {
    .el-icon-more {
      font-size: 14px;
    }

    .header-tag {
      max-width: 130px;
      border-radius: 100px;
      padding: 6px 16px;
      background: rgba(255, 255, 255, 0.12);
      margin-right: 12px;
    }

    .bgcolor-f6f8f9 {
      background: #f6f8f9;
    }

    .height31 {
      height: 31px;
      line-height: 31px;
    }

    .marginright87 {
      margin-right: 87px;
    }

    .marginbottom7 {
      margin-bottom: 7px;
    }

    .left-menu-container-title {
      margin: 34px 0 20px 0;

      .left-menu-help {
        width: 12px;
        height: 12px;
        background: url('../../assets/img/left_menu_titile_icon.png') center no-repeat;
        background-size: contain;
        margin-left: 10px;
      }
    }

    .title-bottom-line {
      width: 108px;
      height: 0;
      border-bottom: 1px solid #e4e8eb;
    }

    .icon_tab {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }

    .icon-menu-file {
      background-image: url('../../assets/img/left_mainmenu_close_icon.png');
      background-size: contain;
      -webkit-transition: background-image .1s linear;
      transition: background-image .1s linear;
    }

    .is-opened {
      .icon-menu-file {
        background-image: url('../../assets/img/left_mainmenu_open_icon.png');
        background-size: contain;
        -webkit-transition: background-image .1s linear;
        transition: background-image .1s linear;
      }
    }

    .el-menu-item {
      .wrap-addmenu-icon {
        width: 30px;
        position: relative;
        display: none;

        .wrap-addsec-tools {
          display: none;
        }
      }
    }

    .el-icon-circle-plus-outline {
      font-size: 14px;
      color: #666;
    }

    .el-submenu__icon-arrow {
      display: none;
    }

    .el-menu-item-group {
      .el-icon-caret-right {
        font-size: 13px;
        color: #666;
        margin-right: 0;
        transform: rotate(0);
        -webkit-transform: rotate(0);
        -webkit-transition: -webkit-transform .15s linear;
        transition: transform .15s linear;
      }

      .is-opened {
        .el-icon-caret-right {
          transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          -webkit-transition: -webkit-transform .15s linear;
          transition: transform .15s linear;
        }
      }
    }

    .first-grade-menu {
      &.el-menu-item {
        height: 45px;
        line-height: 45px;

        &>.wrap-addmenu-icon {
          display: none;
        }

        &:hover {
          &>.wrap-addmenu-icon {
            display: inline-block;
          }
        }
      }

      &.el-submenu {
        &>.el-submenu__title {
          height: 45px;
          line-height: 45px;

          .wrap-addmenu-icon {
            display: none;
          }

          &:hover {
            .wrap-addmenu-icon {
              display: inline-block;
            }
          }
        }
      }
    }

    .second-grade-menu {
      &>.el-submenu__title {
        height: 41px;
        line-height: 41px;

        &>.wrap-addmenu-icon {
          display: none;
        }

        &:hover {
          &>.wrap-addmenu-icon {
            display: inline-block;
          }
        }
      }

      &.el-menu-item {
        height: 41px;
        line-height: 41px;

        &>.wrap-addmenu-icon {
          display: none;
        }

        &:hover {
          &>.wrap-addmenu-icon {
            display: inline-block;
          }
        }

        .wrap-addmenu-icon {
          bottom: 3px;
        }
      }
    }

    .three-grade-menu {
      &.el-menu-item {
        height: 31px;
        line-height: 31px;

        &>.wrap-addmenu-icon {
          display: none;
        }

        &:hover {
          &>.wrap-addmenu-icon {
            display: inline-block;
          }
        }

        .wrap-addmenu-icon {
          bottom: 3px;
        }
      }
    }

    .wrap-addsec-tools {
      width: 130px;
      height: 92px;
      top: 35px;
      left: 5px;
      z-index: 2000;
      display: none;

      .el-card__body {
        padding: 0;

        .el-button--text {
          color: #333;

          &:hover {
            color: #04730e;
          }
        }
      }
    }

    .rotate90 {
      transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      /* Safari 和 Chrome */
    }
  }

</style>

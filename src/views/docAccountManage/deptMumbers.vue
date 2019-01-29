<template>
  <div class="deptMumbers">
    <div class="deptName">
      {{sectionName?sectionName:'部门名'}}<span><a @click="addSubDept('new')" v-if="this.sectionType!=13">添加科室</a><a
          @click="addSubDept()" v-if="this.sectionType==12||this.sectionType==13">修改名称</a></span>
    </div>
    <div class="cover" v-show="isCoverShow">
      <img src="../../assets/img/loadingCircle.gif" />
    </div>
    <div class="dmNone" v-show="docList.length==0">
      <img src="../../assets/img/noDm.png">
      <p>当前部门无任何成员</p>
      <div class="noDmBtns">
        <el-button type="success" @click="addMember">添加成员</el-button>
        <!-- <el-button>批量导入</el-button> -->
        <!-- <el-button>从其他部门移入</el-button> -->
      </div>
    </div>
    <div class="dmList" v-show="docList.length>0">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="医生搜索">
          <el-input :maxlength="20" placeholder="请输入医生姓名" v-model="infoSearch" class="input-with-select" @change="selectInfo()">
            <i class="el-icon-search el-input__icon" slot="suffix">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="" style="float:right;">
          <el-button type="success" @click="addMember">添加成员</el-button>
          <!-- <el-button type="success" plain>批量导入/导出</el-button> -->
          <el-button @click="selectDept" :disabled="!isSelect||multipleSelection.length>1">设置所在部门</el-button>
          <el-button @click="deleteMembers" :disabled="!isSelect">删除</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="docList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
        @row-click="openDocInfo">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="doctorList" label="所属科室" show-overflow-tooltip>
          <template slot-scope="scope">
            <section>
              <span v-for="(n,index) in scope.row.doctorList">{{n.sectionName}}{{
                index < scope.row.doctorList.length-1?'、':''}}</span> </section> </template> </el-table-column>
                  <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper"
        :total="totalCount" background>
      </el-pagination>
    </div>
    <el-dialog :title="addNewDept?'新建名称':'修改名称'" :visible.sync="editDialog" width="600px">
      <el-form :model="addMenuForm" :rules="rules" ref="addMenuForm" label-width="120px">
        <el-form-item label="科室名称" prop="deptName">
          <el-input autofocus placeholder="请输入科室名称" :maxlength="20" v-model="addMenuForm.deptName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addMenuForm')">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog custom-class="bulkLoad" :visible.sync="bulkLoadDialog" width="600px">
      <span slot="title" class="dialog-header">
        <span class="bulkLoadTitle"><i class="el-icon-warning"></i></span>批量导入规则
      </span>
      1、导入excel文件，可支持文件后缀名为xls以及xlsx格式的excel；<br />
      2、当导入文件存在与列表中医生（医生工号）相同的数据时，导入文件数据覆盖列表原有数据；<br />
      3、导入和导出要保证excel一致当导入文件中存在不符合示例模板的数据时，不允许导入；<br />
      4、请<a>点击此处</a>下载示例模板，按照示例模板中的格式准备数据。
      <el-upload class="upload-demo" action="" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1"
        :on-exceed="limitFile" :file-list="fileList" :http-request="uploadRequest" :before-upload="beforeAvatarUpload">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls xlsx格式的excel</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="">立即导入</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dept-choose-dialog" title="选择范围" :visible.sync="deptChooseDialog" width="700px">
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
                  <span :title="data.sectionName" class="menu-item-title-text">{{ data.sectionName }}</span>
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
    mapGetters,
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      var deptNamePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("科室名称不能为空"));
        } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
          return callback(new Error("请检查科室名称格式，限中文或字母"));
        }
        return callback();
      };
      return {
        hosId: '',
        sectionId: '',
        sectionName: '',
        sectionType: 0,
        parentId: '',
        totalCount: 0,
        docList: [],
        leftMenuData: [],
        multipleSelection: [],
        defaultProps: {
          children: 'sessionChilds',
          label: 'sectionName'
        },
        sectionIds: [],
        menuLoading: true,
        addNewDept: false,
        editDialog: false,
        isSelect: false,
        isCoverShow: false,
        bulkLoadDialog: false,
        deptChooseDialog: false,
        currentPage: 1,
        fileList: [],
        infoSearch: '',
        docInfoSearch: '',
        addMenuForm: {
          deptName: '',
        },
        deptList: {}, //选择科室列表
        rules: {
          deptName: [{
            validator: deptNamePass,
            trigger: 'blur'
          }],
        }
      }
    },
    async created() {
      this.userHosId = this.$store.getters.chooseOrgInfo.userHospitalId;
      this.hosId = this.$route.query.hosId;
      this.sectionId = this.$route.query.sectionId;
      this.sectionType = this.$route.query.sectionType;
      this.parentId = this.$route.query.parentId;
      this.isCoverShow = true;
      if (this.sectionId) {
        await axiosget(
          `/hospital/department/admin/getDeptDetail?sectionId=${this.sectionId}&date=${new Date().getTime()}`).then(
          res => {
            if (res.data) {
              this.sectionName = res.data.sectionName;
            }
          })
      }
      await axiosget(
        `/hospital/department/admin/getSectionListByUserHosId?userHosId=${this.userHosId}&date=${new Date().getTime()}`
      ).then(res => {
        if (res.data) {
          this.leftMenuData = res.data;
        }
      })
      if (!this.hosId && !this.sectionId) {
        this.hosId = this.userHosId;
        this.sectionId = this.leftMenuData[0].sectionId;
        this.sectionName = this.leftMenuData[0].sectionName;
        this.sectionType = this.leftMenuData[0].sectionType;
      }
      axiosget(
        `/hospital/member/admin/getUserDoctorList?hosId=${this.hosId}&sectionId=${this.sectionId}&date=${new Date().getTime()}`
      ).then(res => {
        if (res.data) {
          this.docList = res.data.userData;
          this.totalCount = parseInt(res.data.totalCount);
          this.isCoverShow = false;
        }
      })
    },
    watch: {
      //输入框医生筛选
      infoSearch(val) {
        this.selectInfo();
      },
    },
    computed: {
      ...mapState({
        leftClickData: state => state.hospital.leftClickData
      })
    },
    methods: {
      ...mapMutations([
        'addMenuNode',
        'setLeftClickData'
      ]),
      //是否是编辑科室
      addSubDept(newDept) {
        if (newDept) {
          this.addNewDept = true;
          this.addMenuForm.deptName = '';
        } else {
          this.addNewDept = false;
          this.addMenuForm.deptName = this.sectionName;
        }
        this.editDialog = true;
      },
      //提交编辑科室信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let deptInfo = {};
            deptInfo.hospitalId = this.userHosId;
            deptInfo.sectionName = this.addMenuForm.deptName;
            deptInfo.sectionType = parseInt(this.sectionType);
            if (this.addNewDept) {
              deptInfo.parentId = this.sectionId;
              deptInfo.sectionType = parseInt(this.sectionType) + 1;
              axiospost(`hospital/department/admin/insertSection`, deptInfo).then(
                res => {
                  if (res.data) {
                    const newChild = {
                      hospitalId: deptInfo.hospitalId,
                      parentId: deptInfo.parentId,
                      sectionId: res.data.slice(1),
                      sectionName: deptInfo.sectionName,
                      sectionType: deptInfo.sectionType,
                      sessionChilds: []
                    };
                    this.addMenuNode({
                      data: this.leftClickData,
                      newChild
                    });
                    this.$message.success("科室添加成功");
                  } else {
                    this.$message.error("科室添加失败");
                  };
                })
            } else {
              deptInfo.parentId = this.parentId;
              deptInfo.sectionId = this.sectionId;
              axiospost(`hospital/department/admin/insertSection`, deptInfo).then(
                res => {
                  if (res.data) {
                    axiosget(
                      `/hospital/member/admin/getUserDoctorList?hosId=${this.hosId}&sectionId=${this.sectionId}`
                    ).then(msg => {
                      if (msg.data) {
                        this.docList = msg.data.userData;
                        this.totalCount = parseInt(msg.data.totalCount);
                      }
                    })
                    this.$message.success("科室修改成功");
                    this.sectionName = this.addMenuForm.deptName;
                    this.leftClickData.sectionName = this.addMenuForm.deptName;
                    this.setLeftClickData(this.leftClickData);
                  } else {
                    this.$message.error("科室修改失败");
                  };
                })
            }
            this.editDialog = false;
          } else {
            return false;
          }
        });
      },
      //医生筛选
      async selectInfo() {
        if (this.infoSearch && !/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.infoSearch)) {
          this.$message.warning("请检查搜索关键字格式，限中文、字母");
          return;
        }
        if (this.hosId && this.sectionId) {
          axiosget(
            `/hospital/member/admin/getUserDoctorList?hosId=${this.hosId}&sectionId=${this.sectionId}&searchStr=${encodeURI(this.infoSearch)}`
          ).then(res => {
            if (res.data) {
              this.docList = res.data.userData;
              this.totalCount = res.data.totalCount;
            }
          })
        }
      },
      //添加成员
      addMember() {
        this.$router.push({
          path: '/docAccountManage/addDeptMumbers',
          query: {
            hospitalId: this.userHosId,
            sectionId: this.sectionId,
            sectionName: this.sectionName,
            sectionType: this.sectionType,
          }
        })
      },
      //表格多选选取值
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if (this.multipleSelection.length == 0) {
          this.isSelect = false;
        } else {
          this.isSelect = true;
        }
      },
      //批量删除医生
      deleteMembers() {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach(member => {
            axiospost(
              `hospital/member/admin/delDoctor?hosId=${this.userHosId}&userId=${member.userId}&phoneNum=${member.phone}`
            ).then(
              res => {
                if (res.data) {
                  this.$message.success("医生删除成功");
                  axiosget(
                    `/hospital/member/admin/getUserDoctorList?hosId=${this.hosId}&sectionId=${this.sectionId}&searchStr=${this.infoSearch}`
                  ).then(res => {
                    if (res.data) {
                      this.docList = res.data.userData;
                      this.totalCount = res.data.totalCount;
                    }
                  })
                }
              }).catch(() => {
              this.$message.error("医生删除失败");
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //打开医生详情
      openDocInfo(row, event, column) {
        this.$router.push({
          path: '/docAccountManage/mumbersInfo',
          query: {
            userId: row.userId,
            doctorId: row.doctorList[0].doctorId,
          }
        })
      },
      //当前页: ${val}
      handleCurrentChange(val) {
        axiosget(
          `/hospital/member/admin/getUserDoctorList?hosId=${this.hosId}&sectionId=${this.sectionId}&searchStr=${this.infoSearch}&pageNo=${val}`
        ).then(res => {
          if (res.data) {
            this.docList = res.data.userData;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //文件验证
      beforeAvatarUpload(file) {
        const isType = (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type ===
          'application/vnd.ms-excel');
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isType) {
          this.$message.error('上传文件只能是 xls/xlsx 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1M!');
        }
        return isType && isLt1M;
      },
      //点击选择或修改科室
      selectDept() {
        let self = this;
        self.deptList = {};
        self.multipleSelection[0].doctorList.forEach((item1, index1) => {
          self.$set(self.deptList, item1.sectionId, item1.sectionName);
        });
        self.getDeptList();
        self.deptChooseDialog = true;
      },
      //获取科室列表
      getDeptList() {
        axiosget(
          `/hospital/department/admin/getSectionListByUserHosId?userHosId=${ this.userHosId }&date=${new Date().getTime()}`
        ).then(res => {
          if (res.data) {
            this.leftMenuData = res.data;
            this.menuLoading = false;
          }
        }).catch(err => {
          this.menuLoading = false;
          console.error(err);
        });
      },
      //搜索科室
      filterDept() {
        this.$refs['treeMenu'].filter(this.docInfoSearch);
      },
      filterNode(val, data) {
        if (!val) return true;
        return data.sectionName.indexOf(val) !== -1;
      },
      //点击具体科室选择科室
      selectNode(data) {
        if (data.sectionType !== 11) {
          this.$set(this.deptList, data.sectionId, data.sectionName);
        }
      },
      //删除科室标签
      deleteTag(sectionId) {
        let deptList = Object.assign({}, this.deptList);
        delete deptList[sectionId];
        this.deptList = deptList;
      },
      comfirDept() {
        let self = this;
        self.sectionIds = [];
        Object.keys(self.deptList).forEach((item, index) => {
          self.sectionIds.push(item);
        });
        self.multipleSelection[0].hospitalId = self.multipleSelection[0].doctorList[0].hospitalId;
        // self.multipleSelection[0].doctorId = self.multipleSelection[0].doctorList[0].doctorId;
        self.multipleSelection[0].sectionIds = self.sectionIds;
        axiospost(`hospital/member/admin/insertDoctor?doctorId=${self.multipleSelection[0].doctorList[0].doctorId}`,
          self.multipleSelection[0]).then(
          res => {
            if (res.data) {
              this.$message.success("修改科室成功！");
              axiosget(
                `/hospital/member/admin/getUserDoctorList?hosId=${this.hosId}&sectionId=${this.sectionId}&searchStr=${this.infoSearch}`
              ).then(res => {
                if (res.data) {
                  this.docList = res.data.userData;
                  this.totalCount = res.data.totalCount;
                }
              })
            }
          })
        self.deptChooseDialog = false;
      },
      //上传文件
      async uploadRequest(item) {
        let form = new FormData();
        form.append("file", item.file);
        // await axiospost(`/application/plat/auth/images/upload`, form).then(
        //   res => {
        //     this.docHeader[0] = {
        //       name: item.file.name,
        //       url: res.data.url
        //     };
        //     this.$message.success("文件上传成功");
        //   }).catch(err => {
        //   this.$message.error("文件上传失败");
        // });
      },
      //文件超出数量提醒
      limitFile(file, fileList) {
        this.$message.error("最多只能上传一个文件，请删除之后再重新上传");
      },
      //删除文件
      handleRemove(file, fileList) {
        this.docHeader = fileList;
      },
    },
  }

</script>
<style lang="scss">
  @import '/docAccountManage.scss';

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

  .el-pagination {
    margin-top: 20px;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #35b53f;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #35b53f;
  }

</style>

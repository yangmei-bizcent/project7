<template>
  <div class="hospInfoDeploy">
    <!-- <div class="cover" v-show="isLoading">
      <img src="../../assets/img/loading.gif" />
    </div> -->
    <div class="pageTitle">医院信息管理<span>对医院及其分院的信息进行配置，为保证应用使用医院信息时可以统一管理</span></div>
    <div class="deployContain">
      <el-button type="success" size="medium" class="addBtn" @click="openHospEdit()" v-show="addBtnShow">新建医院/分院</el-button>
      <el-table 
        v-loading="isLoading"
        ref="multipleTable" 
        :data="hospList" 
        class="custom-table" 
        tooltip-effect="dark" 
        style="width: 100%">
        <el-table-column prop="logoImg" label="院区Logo">
          <template slot-scope="scope">
            <div class="flex-align-justify">
              <div class="hospLogo">
                <img :src="scope.row.logoImg?scope.row.logoImg.url:''" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="医院/院区名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="level" label="医院等级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="seq" label="排序" width="120">
          <template slot-scope="scope">
            <section>
              <el-input type="number" min="0" max="999999999" v-model="scope.row.seq" @change="sortComList(scope.row)"></el-input>
            </section>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" show-overflow-tooltip width="250">
          <template slot-scope="scope">
            <div class="flex-align-justify">
              <el-button class="widthAuto paddingX0" type="text" @click="openHospEdit(scope.row.hospitalBranchId)"
                v-show="LookBtnShow">编辑</el-button>
              <el-button class="widthAuto paddingX0 marginleft20" type="text" @click="deleteThisHosp(scope.row.hospitalBranchId)"
                v-show="removeBtnShow">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {
    axiosget,
    axiospost,
    aixospatch
  } from "../../service/config.js"
  import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        isLoading: true,
        userInfo: {},
        hospList: [],
        //权限控制
        addBtnShow: false,
        LookBtnShow: false,
        removeBtnShow: false
      };
    },
    async created() {
      this.Jurisdiction();
      this.userInfo = this.$store.getters.chooseOrgInfo;
      axiosget(
        `/application/branch/admin/getSimpleHospitalBranchByHospitalId?date=${new Date().getTime()}&platformHospitalId=${this.userInfo.platformHospitalId}`
      ).then(res => {
          this.hospList = res.data;
          this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
      });
    },
    computed: {
      ...mapGetters({
        moduleper: 'moduleper'
      }),
      ...mapState({
        currentDateInfo: state => state.user.currentDateInfo,
      }),
    },
    methods: {
      Jurisdiction() { //权限控制
        if ((this.moduleper != undefined || this.moduleper != null) && this.moduleper.length > 0) {
          //console.log(this.moduleper)
          this.moduleper.map(item => {
            item.children.map(item2 => {
              if (item2.feature_id == 351052) { //"新增医院信息"
                this.addBtnShow = true;
              } else if (item2.feature_id == 351055) { //"查看医院信息"
                this.LookBtnShow = true;
              } else if (item2.feature_id == 351053) { //"删除医院信息"
                this.removeBtnShow = true;
              }

            })
          })

        }
      },
      //新建、修改医院配置信息
      openHospEdit(hospId) {
        this.$router.push({
          path: '/hospInfoDeploy/hospInfoDeployDetail',
          query: {
            hospId: hospId
          }
        })
      },
      //排序输入框修改
      sortComList(item) {
        if (item.seq < 0 || item.seq > 999999999) {
          this.$message.warning("请输入0~999999999之间的正整数");
          return;
        };
        if (!/^[+]{0,1}(\d+)$/.test(item.seq)) {
          this.$message.warning("请输入正整数");
          return;
        }
        axiospost(
          `/application/branch/admin/modifySimpleHospitalBranch`, item).then(
          res => {
            if (res.status == 200 && res.data) {
              this.$message.success(res.data);
            };
          })
      },
      //删除医院配置信息
      deleteThisHosp(hospId) {
        //医院最少留一家机构
        if (this.hospList.length == 1) {
          this.$confirm('最少需要有一个院区，此院区无法删除！')
            .then(_ => {})
          return false;
        };
        this.$confirm('确认删除此医院信息？')
          .then(_ => {
            axiospost(`/application/branch/admin/delHospitalBranch?branchId=${hospId}`).then(res => {
              if (res.status == 200 && res.data) {
                this.$message.success(res.data);
              };
              axiosget(
                `/application/branch/admin/getSimpleHospitalBranchByHospitalId?platformHospitalId=${this.userInfo.platformHospitalId}&date=${new Date().getTime()}`
              ).then(
                res => {
                  this.hospList = res.data;
                  this.isLoading = false;
                })
            })
          })
      },
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "/hospInfoDeploy.scss";

</style>

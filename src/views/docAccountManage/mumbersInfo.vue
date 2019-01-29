<template>
  <div class="deptMumbers">
    <div class="deptName dmHeader">
      <el-button type="text" class="dmHeaderBtn" onclick="history.go(-1)"><i class="el-icon-arrow-left"></i> 返回</el-button>
      成员信息
      <div class="admBtns">
        <el-button type="success" @click="editMember">编辑</el-button>
        <!-- <el-button type="success" plain>置顶</el-button>
        <el-button>禁用</el-button> -->
        <el-button @click="deleteMember">删除</el-button>
      </div>
    </div>
    <div class="admInfoWrite">
      <div class="docLogo"><img src="../../assets/img/docLogo.png"></div>
      <div class="dmPerson">{{docInfo.name}}<img src="../../assets/img/dmPersonA.png" v-if="docInfo.sex==(1||3)"><img src="../../assets/img/dmPersonB.png"
        v-if="docInfo.sex==(2||4)"></div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px">
        <el-form-item label="账号" prop="name">{{docInfo.phone}}
        </el-form-item>
        <el-form-item label="手机号" prop="name">{{docInfo.phone}}
        </el-form-item>
        <el-form-item label="工号" prop="name">{{docInfo.workId}}
        </el-form-item>
        <el-form-item label="科室" prop="name"><span v-for="(n,index) in docInfo.doctorList">{{n.sectionName}}<span v-if="index<docInfo.doctorList.length-1"> / </span></span>
        </el-form-item>
      </el-form>
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
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        userHosId: '',
        userId: '',
        doctorId:'',
        docInfo: {},
        activeTopMenu: 'index',
        tabShow: true, //顶部导航是否显示
        activeArr: ['2', '3', '4'],
        leftTabShow: false,
        leftDocTabShow: false,
        loginState: true, //登入state
        appList: [],
        jgState: 0,
        jgName: "",
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    created() {
      this.userHosId = this.$store.getters.chooseOrgInfo.userHospitalId;
      this.userId = this.$route.query.userId;
      this.doctorId = this.$route.query.doctorId;
      axiosget(
        `/hospital/member/admin/getDoctorInfo?hosId=${this.userHosId}&userId=${this.userId}&doctorId=${this.doctorId}&date=${new Date().getTime()}`
      ).then(res => {
        if (res.data) {
          this.docInfo = res.data;
          //console.log(this.docInfo)
        }
      })
    },
    methods: {
      //编辑成员
      editMember() {
        this.$router.push({
          path: '/docAccountManage/addDeptMumbers',
          query: {
            hospitalId: this.userHosId,
            userId: this.userId,
            phone: this.docInfo.phone,
            doctorId: this.docInfo.doctorList[0].doctorId,
            formType: 'edit',
          }
        })
      },
      //删除医生
      deleteMember() {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiospost(
            `hospital/member/admin/delDoctor?hosId=${this.userHosId}&userId=${this.docInfo.userId}&phoneNum=${this.docInfo.phone}`
          ).then(
            res => {
              if (res.data) {
                this.$message.success("删除医生成功！");
                history.go(-1);
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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

</style>

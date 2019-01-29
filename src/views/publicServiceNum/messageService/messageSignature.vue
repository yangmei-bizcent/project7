<template>
  <div class="message-signature bgcolor-white">
    <div class="page-title flex-align">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ name: 'messageService' }">短信服务</el-breadcrumb-item> -->
        <el-breadcrumb-item>短信服务</el-breadcrumb-item>
        <el-breadcrumb-item>短信签名</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paddingX20 padding20X">
      <div class="title-wrap">
        <span>
          <span class="main-title">短信签名</span><span class="vice-title">以下短信签名可在配置短信模板时选择，作为推送短信的签名</span>
        </span>
        <span v-show="ediOrApplyShow">
          <el-button
          v-show="applyInterceptor !== -1"
          type="primary"
          @click="applyMessageSignature">
          {{ applyInterceptor === 0 ? '申请短信签名' : '修改短信签名' }}
        </el-button>
        </span>
      </div>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="submitNo" label="申请编号"></el-table-column>
        <el-table-column prop="signature" label="短信签名名称"></el-table-column>
        <el-table-column prop="modifiedon" label="申请时间"></el-table-column>
        <el-table-column prop="modifiedby" label="申请人"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ statusMapping(scope.row) }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="table-btn"
              type="text"
              @click="deleteSignature(scope.row.smsGatewayId)"
              v-if="scope.row.signatureStatus === '3' || scope.row.signatureStatus === '4'">
              删除
            </el-button>
            <span v-else>-</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

    <!-- 申请短信签名 -->
    <el-dialog :title="applyInterceptor === 0 ? '申请短信签名' : '修改短信签名'" :visible.sync="dialogVisible" width="612px">
      <el-form
        :model="signatureForm"
        ref="signatureForm"
        label-width="100px"
        :rules="rules">
        <el-form-item label="短信签名名称" prop="messageSignature">
          <el-input
            maxlength="8"
            v-model="signatureForm.messageSignature"
            placeholder="请输入推送短信的前缀签名">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmApply">
          {{ applyInterceptor === 0 ? '确认申请' : '确认修改' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { axiosConfig } from '@/service/config';
import { mapGetters } from 'vuex';
import { apiurl } from '@/service/api';

const SIG_MAX = 1;

export default {
  data () {
    const validator = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('请输入短信签名名称'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      platformHospitalId: '',
      dialogVisible: false,
      signatureForm: {
        messageSignature: ''
      },
      applyInterceptor: -1,
      rules: {
        messageSignature: [
          { validator, trigger: 'blur' }
        ]
      },
      //权限控制
      ediOrApplyShow:false
    }
  },
  computed: {
    ...mapGetters({
      chooseOrgInfo: 'chooseOrgInfo', moduleper:'moduleper'
    })
  },
  created () {
    this.platformHospitalId = this.chooseOrgInfo.platformHospitalId;
    this.getSignatures();
    this.Jurisdiction();
  },
  methods: {
     Jurisdiction(){
        //权限控制
        // //console.log('jinlai',this.moduleper)
        if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
          this.moduleper.map(item=>{
            item.children.map(item2=>{
              if(item2.feature_id==351322){//"申请/修改短信签名"
               this.ediOrApplyShow=true;
              }

            })
          })
        }
     },
    //获取短信签名列表
    getSignatures () {
      axios.get(`${ apiurl.getSignatures }?platformHospitalId=${ this.platformHospitalId }`, axiosConfig).then(res => {
        if (res.data) {
          this.tableData = res.data;
          this.applyInterceptor = res.data.length;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    //申请短信签名
    postSignature (postObj) {
      axios.post(apiurl.applySignature, postObj, axiosConfig).then(res => {
        if (typeof res.data === 'string') {
          this.$message.success('申请成功');
          this.getSignatures();
        }
      }).catch(err => {
        console.error(err);
      });
    },
    //修改短信签名
    editSignature (postObj) {
      axios.post(`message/signature/edit`, postObj, axiosConfig).then(res => {
        if (typeof res.data === 'string') {
          this.$message.success('修改成功');
          this.getSignatures();
        }
      }).catch(err => {
        console.error(err);
      })
    },

    statusMapping (rowData) {
      switch (rowData.signatureStatus) {
        case '1':
          return '申请中';
        case '2':
          return '申请中';
        case '3':
          return `不可用，${ rowData.audit.auditPostil }`;
        case '4':
          return '可使用';
      }
    },
    //点击申请短信签名
    applyMessageSignature () {
      // if (this.applyInterceptor >= SIG_MAX) {
      //   this.$message.error('您已申请短信签名，如若需要修改请删除后重新申请');
      //   return;
      // } else if (this.applyInterceptor !== -1) {
      //   if (this.$refs['signatureForm']) {
      //     this.$refs['signatureForm'].resetFields();
      //   }
      //   this.dialogVisible = true;
      // }
      if (this.$refs['signatureForm']) {
        this.$refs['signatureForm'].resetFields();
      }
      if (this.applyInterceptor > 0) {
        this.signatureForm.messageSignature = this.tableData[0].signature.slice(1, this.tableData[0].signature.length - 1);
      }
      this.dialogVisible = true;
    },
    //点击确认申请
    confirmApply () {
      this.$refs['signatureForm'].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          if (this.applyInterceptor === 0) {
            let postObj = {
              platformHospitalId: this.platformHospitalId,
              signature: this.signatureForm.messageSignature
            };
            this.postSignature(postObj);
          } else if (this.applyInterceptor > 0) {
            let postObj = Object.assign({}, this.tableData[0]);
            postObj.signature = `【${ this.signatureForm.messageSignature }】`;
            this.editSignature(postObj);
          }
        } else {
          return false;
        }
      });
    },
    //点击删除
    deleteSignature (infoId) {
      this.$confirm('确定要删除该条短信签名吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(`${ apiurl.deleteSignature }?infoId=${ infoId }`, axiosConfig).then(res => {
          if (typeof res.data === 'string') {
            this.$message.success('删除成功');
            this.getSignatures();
          }
        }).catch(err => {
          console.error(err);
        });
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss">
@import './messageServiceStyle.scss';
</style>

<template>
  <div class="payment-account-list bgcolor-white">
    <div class="page-title">支付商户信息</div>

    <div class="paddingX20 padding20X">
      <el-table
        :data="accountList.slice(0, 1)"
        style="width: 100%"
        class="account-table"
        border>
        <el-table-column prop="sellerAccount" label="商户号"></el-table-column>

        <el-table-column label="支付配置状态">
          <template slot-scope="scope">
            <el-switch
              @change="accountTrigger($event, scope.row)"
              v-model="scope.row.switch"
              active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="text-btn" @click="checkDetail">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="businessList"
        style="width: 100%"
        border>
        <el-table-column prop="applicationName" label="功能名称"></el-table-column>

        <el-table-column label="订单关闭时间">
          <template slot-scope="scope">
            {{ scope.row.closeTime.substr(0, scope.row.closeTime.length - 1) + timeUnitMapping(scope.row.closeTime.charAt(scope.row.closeTime.length - 1)) }}
          </template>
        </el-table-column>

        <el-table-column label="支付配置状态">
          <template slot-scope="scope">
            <el-switch
              @change="businessTrigger($event, scope.row)"
              v-model="scope.row.switch"
              active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="text-btn" @click="editBusiness(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="支付业务" :visible.sync="dialogVisible" width="612px">
      <el-form
        ref="businessForm"
        :model="businessForm"
        class="demo-form-inline"
        label-width="150px"
        :rules="rules">
        <el-form-item label="业务名称">
          {{ businessForm.applicationName }}
        </el-form-item>

        <el-form-item label="订单关闭时间" prop="closeTime">
          <div class="input-wrap">
            <el-input class="close-time-input" v-model="businessForm.closeTime"></el-input>
            <el-select class="time-unit-select" v-model="timeUnit" placeholder="请选择">
              <el-option label="小时" value="h"></el-option>
              <el-option label="分钟" value="m"></el-option>
              <el-option label="秒" value="s"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="支付配置业务状态">
          <el-switch
            v-model="businessForm.switch"
            active-color="#13ce66">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { axiosConfig } from '@/service/config';
import { mapGetters } from 'vuex';
import { apiurl } from '@/service/api';

// const platformHospitalId = '022f7a41-9409-4868-8290-45da1aab7a64';

export default {
  data () {
    const validator = (rule, value, callback) => {
      const regExp = /^([1-9]|[1-5]\d|60)$/;
      if (!regExp.test(value.trim())) {
        callback(new Error('请输入1-60的整数'));
      } else {
        callback();
      }
    };
    return {
      platformHospitalId: '',
      accountList: [],
      businessList: [],
      businessForm: {
        paymentBusinessType: '',
        closeTime: '',
        switch: false
      },
      dialogVisible: false,
      timeUnit: 'm',
      tempBusiness: {},
      rules: {
        closeTime: [
          { validator, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      chooseOrgInfo: 'chooseOrgInfo'
    })
  },
  async created () {
    this.platformHospitalId = this.chooseOrgInfo.platformHospitalId;
    //console.log(this.chooseOrgInfo);
    await this.getPaymentAccountList();
    this.getPaymentAccountBusinessList(this.accountList[0] ? this.accountList[0].payPaymentAccountId : null);
  },
  methods: {
    //获取支付账号信息
    getPaymentAccountList () {
      return axios.get(`payment/auth/hospital/payment/account/lists/${ this.platformHospitalId }`, axiosConfig).then(res => {
        if (res.data) {
          res.data.list.forEach(element => {
            element.switch = element.enable === '1' ? true : false;
          });
          this.accountList = res.data.list;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    //获取支付账号支持的业务列表
    getPaymentAccountBusinessList (payPaymentAccountId) {
      if (payPaymentAccountId) {
        axios.get(`payment/auth/hospital/payment/business/lists?payPaymentAccountId=${ payPaymentAccountId }`, axiosConfig).then(res => {
          if (res.data) {
            res.data.list.forEach(element => {
              element.switch = element.enable === '1' ? true : false;
            });
            this.businessList = res.data.list;
          }
        }).catch(err => {
          console.error(err);
        });
      }
    },
    //更新账号支持的业务
    postPaymentAccountBusiness (postObj) {
      axios.post(`payment/auth/hospital/payment/business/update`, postObj, axiosConfig).then(res => {
        if (res.status === 200) {
          this.$message.success('修改成功');
          this.getPaymentAccountBusinessList(this.accountList[0].payPaymentAccountId);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    accountTrigger (val, rowData) {
      axios.put(`payment/auth/hospital/payment/account/enable?payPaymentAccountId=${ rowData.payPaymentAccountId }&isEnable=${ val ? '1' : '0' }`, null, axiosConfig).then(res => {
        if (res.status === 200) {
          this.$message.success('设置成功');
        }
      }).catch(err => {
        console.error(err);
      });
    },
    businessTrigger (val, rowData) {
      axios.put(`payment/auth/hospital/payment/business/enable?payPaymentAccountBusinessId=${ rowData.payPaymentAccountBusinessId }&isEnable=${ val ? '1' : '0' }`, null, axiosConfig).then(res => {
        if (res.status === 200) {
          this.$message.success('设置成功');
        }
      }).catch(err => {
        console.error(err);
      });
    },

    //编辑
    editBusiness (rowData) {
      if (this.$refs['businessForm']) {
        this.$refs['businessForm'].resetFields();
      }
      this.tempBusiness = rowData;
      this.businessForm.applicationName = rowData.applicationName;
      this.businessForm.closeTime = rowData.closeTime.substr(0, rowData.closeTime.length - 1);
      this.timeUnit = rowData.closeTime.charAt(rowData.closeTime.length - 1);
      this.businessForm.switch = rowData.switch;
      this.dialogVisible = true;
    },
    //点击修改按钮
    confirmEdit () {
      this.$refs['businessForm'].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          let postObj = Object.assign({}, this.tempBusiness);
          postObj.closeTime = this.businessForm.closeTime + this.timeUnit;
          postObj.enable = this.businessForm.switch ? '1' : '0';
          delete postObj.switch;
          this.postPaymentAccountBusiness(postObj);
        } else {
          return false;
        }
      });
    },
    //查看
    checkDetail () {
      this.$router.push({ name: 'viewInformation' });
    },

    timeUnitMapping (timeUnit) {
      switch (timeUnit) {
        case 'm':
          return '分钟';
        case 'h':
          return '小时';
        case 's':
          return '秒';
      }
    }
  }
}
</script>

<style lang="scss">
.payment-account-list {
  .account-table {
    margin-bottom: 30px;
  }
  .text-btn {
    padding: 0;
    min-width: 0;
  }
  .input-wrap {
    display: flex;
  }
  .close-time-input {
    width: 310px;
    margin-right: 20px;
  }
  .time-unit-select {
    width: 90px;
  }
}
</style>

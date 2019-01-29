<template>
  <div class="payment-transactions">
    <div class="page-title">
      <span @click="backToConfiguration"><img src="../../../assets/img/publicServiceNum/返回.png" width="10" height="18">返回</span>
    </div>

    <div class="table-wrapper">
      <div class="add">
        <p>支付配置业务</p>
        <button @click="dialogVisible = true;">添加</button>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="type" label="业务类型">
        </el-table-column>
        <el-table-column prop="thirdType" label="第三方支付业务类型">
        </el-table-column>
        <el-table-column prop="closeTime" label="订单关闭时间">
        </el-table-column>
        <el-table-column prop="backgroundNotification" label="后台异步通知" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="frontSkipAdd" label="前端跳转地址" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="payConfigStatus" label="支付配置状态" width="150">
          <template slot-scope="scope">
            <p :class="{green: scope.row.payConfigStatus}">{{scope.row.payConfigStatus ? '启用' : '禁用'}}</p>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button class="operate" type="text" @click="editTransaction(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 支付业务弹窗 -->
    <el-dialog title="支付业务" :visible.sync="dialogVisible" width="612px">
      <el-form :model="newTransactions" :rules="newTransactionsRules" label-width="160px">
        <el-form-item label="业务类型" prop="type">
          <el-select v-model="newTransactions.type" placeholder="请选择业务类型">
            <el-option label="处方缴费" value="1"></el-option>
            <el-option label="挂号费" value="2"></el-option>
            <el-option label="预约费" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第三方支付业务类型" prop="thirdType">
          <el-select v-model="newTransactions.thirdType" placeholder="请选择第三方业务类型">
            <el-option label="处方缴费" value="1"></el-option>
            <el-option label="挂号费" value="2"></el-option>
            <el-option label="预约费" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关闭时间">
          <el-select class="choose-time" v-model="newTransactions.closeTime" placeholder="选择时间">
            <el-option label="5分" value=5></el-option>
            <el-option label="10分" value=10></el-option>
            <el-option label="15分" value=15></el-option>
            <el-option label="20分" value=20></el-option>
            <el-option label="25分" value=25></el-option>
          </el-select>
          <!-- <el-row>
            <el-col :span="7">
              <el-input v-model="newTransactions.closeTime" placeholder="关闭时间"></el-input>
            </el-col>
            <el-col :span="6">
              <el-select v-model="newTransactions.timeType" placeholder="时分秒">
                <el-option label="时" value="hour"></el-option>
                <el-option label="分" value="minute"></el-option>
                <el-option label="秒" value="second"></el-option>
              </el-select>
            </el-col>
          </el-row> -->
        </el-form-item>
        <!-- <el-form-item label="后台异步通知" prop="backgroundNotification">
          <el-input v-model="newTransactions.backgroundNotification" placeholder="后台异步通知"></el-input>
        </el-form-item>
        <el-form-item label="前端跳转地址" prop="frontSkipAdd">
          <el-input v-model="newTransactions.frontSkipAdd" placeholder="前端跳转地址"></el-input>
        </el-form-item> -->
        <el-form-item label="支付配置状态">
          <el-switch active-color="#35B53F" v-model="newTransactions.payConfigStatus"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="支付业务" :visible.sync="editDialogVisible" width="612px">
      <el-form :model="editTransactions" :rules="newTransactionsRules" label-width="160px">
        <el-form-item label="业务类型" prop="type">
          <el-select v-model="editTransactions.type" placeholder="请选择业务类型">
            <el-option label="处方缴费" value="1"></el-option>
            <el-option label="挂号费" value="2"></el-option>
            <el-option label="预约费" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第三方业务类型" prop="thirdType">
          <el-select v-model="editTransactions.thirdType" placeholder="请选择第三方业务类型">
            <el-option label="处方缴费" value="1"></el-option>
            <el-option label="挂号费" value="2"></el-option>
            <el-option label="预约费" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关闭时间">
          <el-select class="choose-time" v-model="editTransactions.closeTime" placeholder="选择时间">
            <el-option label="5分" value=5></el-option>
            <el-option label="10分" value=10></el-option>
            <el-option label="15分" value=15></el-option>
            <el-option label="20分" value=20></el-option>
            <el-option label="25分" value=25></el-option>
          </el-select>
          <!-- <el-row>
            <el-col :span="7">
              <el-input v-model="editTransactions.closeTime" placeholder="关闭时间"></el-input>
            </el-col>
            <el-col :span="6">
              <el-select v-model="editTransactions.timeType" placeholder="时分秒">
                <el-option label="时" value="hour"></el-option>
                <el-option label="分" value="minute"></el-option>
                <el-option label="秒" value="second"></el-option>
              </el-select>
            </el-col>
          </el-row> -->
        </el-form-item>
        <!-- <el-form-item label="后台异步通知" prop="backgroundNotification">
          <el-input v-model="editTransactions.backgroundNotification" placeholder="后台异步通知"></el-input>
        </el-form-item>
        <el-form-item label="前端跳转地址" prop="frontSkipAdd">
          <el-input v-model="editTransactions.frontSkipAdd" placeholder="前端跳转地址"></el-input>
        </el-form-item> -->
        <el-form-item label="支付配置状态">
          <el-switch active-color="#35B53F" v-model="editTransactions.payConfigStatus"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTransactionsRules: {
          type: [
            {required: true, message: '请选择业务类型', trigger: 'blur'},
          ],
          thirdType: [
            {required: true, message: '请选择第三方业务类型', trigger: 'blur'},
          ],
          backgroundNotification: [
            {required: true, message: '请输入后台异步通知', trigger: 'blur'},
          ],
          frontSkipAdd: [
            {required: true, message: '请输入前端跳转地址', trigger: 'blur'},
          ],
        },
        dialogVisible: false,
        editDialogVisible: false,
        tableData: [{
          type: '处方缴费',
          thirdType: '处方缴费',
          closeTime: '30分',
          backgroundNotification: 'https://www.baidu.com/',
          frontSkipAdd: 'https://www.baidu.com/',
          payConfigStatus: true,
        },
        {
          type: '挂号费',
          thirdType: '挂号费',
          closeTime: '30分',
          backgroundNotification: 'https://www.baidu.com/',
          frontSkipAdd: 'https://www.baidu.com/',
          payConfigStatus: false,
        },
        {
          type: '预约费',
          thirdType: '预约费',
          closeTime: '30分',
          timeType: 'minute',
          backgroundNotification: 'https://www.baidu.com/',
          frontSkipAdd: 'https://www.baidu.com/',
          payConfigStatus: false,
        }],
        newTransactions: {
          type: '',
          thirdType: '',
          closeTime: '',
          // backgroundNotification: '',
          // frontSkipAdd: '',
          payConfigStatus: false,
        },
        editTransactions: {}
      }
    },

    mounted() {

    },

    methods: {
      // timeJoint() {
      //   this.tableData.forEach((item, index) => {
      //     switch (item.timeType) {
      //       case 'hour':
      //       item.fullCloseTime = `${item.closeTime}时`
      //       break
      //       case 'minute':
      //       item.fullCloseTime = `${item.closeTime}分`
      //       break
      //       case 'second': 
      //       item.fullCloseTime = `${item.closeTime}秒`
      //     } 

      //   })
      // },
      backToConfiguration() {
        this.$router.push('/publicServiceNum/paySetting')
      },
      editTransaction(row) {
        this.editDialogVisible = true
        // //console.log(row);
        this.editTransactions = row
      }
    },
    components: {

    }
 }
</script>

<style lang='scss' scoped>
.payment-transactions {
  .page-title {
    padding-left: 40px;
    span {
      cursor: pointer;
      font-size: 18px;
      color: #333333;
    }
    img {
      margin-right: 16px;
      vertical-align: middle;
    }
  }


.table-wrapper {
    padding-left: 24px; 
    padding-right: 24px; 
    padding-bottom: 74px;
    background-color: #FFFFFF;
    width: 96%;
    min-width: 900px;
    min-height: 531px;
    .add {
      // text-align: right;
      display: flex;
      justify-content: space-between;
      line-height: 82px;
      height: 82px;
      button {
        background-color: #35B53F;
        border-radius: 4px;
        width: 90px;
        height: 34px;
        margin-top: 24px;
        margin-right: 18px;
        border: none;
        color: #FFFFFF;
        cursor: pointer;
      }
      p {
        font-size: 16px;
        color: #4A4A4A;
        font-weight: bold;
      }
    }
  }
}
</style>

<style lang="scss">
$green-color: #35B53F;

.payment-transactions {
  .el-table {
    // margin: 0 auto;
    width: 100%;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    th {
      background-color: #E6E6E6;
      font-family: 'PingFang SC','MicrosoftYaHei';
      font-size: 16px;
      color: #333333;
    }

    .el-tag {
      border-radius: 12px;
    }

    .el-button.operate {
      font-size: 14px;
      min-width: 0;
      padding: 0;
      color: #3C9EF8;
    }

    p {
      color: #999999;
      letter-spacing: 0;
    }
    
    p.green {
      color: #35B53F;
    }
  }

  .el-dialog {
    .el-dialog__header {
      padding: 20px;
    }
    .el-dialog__body {
      border-top: 1px solid  #E7E7E7;
      border-bottom: 1px solid  #E7E7E7;
    }
    .el-dialog__footer {
      padding: 20px;
      .el-button {
        width: 90px;
        height: 34px;
        padding: 0;
      }

      .cancel:hover {
        color: $green-color;
        // border-color: $green-color;
        background-color: #d1ffd5;
      }
      .el-button--primary {
        background-color: $green-color;
        border-color: $green-color;
        &:hover {
          background-color: #6bb170;
        }
      }
    }
    .el-input {
      .el-input__inner {
        width: 300px;
        height: 34px;
      }
    }

    .choose-time {
      .el-input__inner {
        width: 182px;
      }
      .el-input__suffix {
        .el-input__suffix-inner {
          .el-input__icon::before{
            content: "\E642";
          }
          .el-input__icon::after{
            content: "";
            height: 100%;
            width: 0;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>


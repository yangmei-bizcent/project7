<template>
  <div class="pay-setting">
    <div class="page-title">支付设置<span>配置微信服务号的收款账号，当已配置应用的业务流程涉及支付时，需要新增支付商户号并且添加此应用的支付业务类型。</span></div>
    <div class="table-wrapper">
      <div class="add">
        <button @click="$router.push('/publicServiceNum/accountConfiguration')">添加</button>
      </div>
      <!-- <el-tooltip class="operate-tooltip" effect="dark" content="Bottom Center 提示文字" placement="bottom">
        <span>?</span>
      </el-tooltip> -->
      <el-table :data="tableData" width="92%">
        <el-table-column prop="number" label="商户编号">
        </el-table-column>
        <el-table-column prop="name" label="商户名称">
        </el-table-column>
        <el-table-column prop="payName" label="支付名称">
        </el-table-column>
        <el-table-column prop="logo" label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.logoUrl" width="30" height="30">
          </template>
        </el-table-column>
        <el-table-column prop="payConfigStatus" label="支付配置状态">
          <template slot-scope="scope">
            <p :class="{green: scope.row.payConfigStatus}">{{scope.row.payConfigStatus ? '启用' : '未启用'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="lastOperateTime" label="最后操作时间" width="150">
          <template slot-scope="scope">
            <p :class="{green: scope.row.lastOperateTime}">{{scope.row.lastOperateTime ? scope.row.lastOperateTime : '未启用'}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" :render-header="tooltip">
          <template slot-scope="scope">
            <el-button class="operate" size="mini" type="text" @click="$router.push('/publicServiceNum/accountConfiguration')">编辑</el-button>
            <el-button class="operate" size="mini" type="text" @click="$router.push('/publicServiceNum/paymentTransactions')">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import wechat from '../../../assets/img/publicServiceNum/wechat.png'
import alipay from '../../../assets/img/publicServiceNum/alipay.png'
export default {
  data() {
    return {
      tableData: [
        {
          number: "dmw@zj.com",
          name: "大魔王",
          payName: "微信支付",
          logo: "wechat",
          logoUrl: wechat,
          payConfigStatus: true,
          lastOperateTime: "2018-12-2 13:23",
          isCrossNumber: "跨号"
        },
        {
          number: "dsfjiefj@d.pay",
          name: "大魔王",
          payName: "支付宝支付",
          logo: "alipay",
          logoUrl: alipay,
          payConfigStatus: false,
          isCrossNumber: "不跨号"
        },
      ]
    };
  },
  methods: {
    tooltip(h,{column}) {
      return (<el-tooltip
          class="item"
          effect="dark"
          content='编辑：是对收款账号信息的修改查看，进入：是对需要使用该收款账号的应用的管理。'
          placement="bottom"
          >
            <div slot="content">编辑：是对收款账号信息的修改查看，<br/>
            进入：是对需要使用该收款账号的应用的管理。
            </div>
            <span>操作<i class = "el-icon-question" style ="margin-left:5px;"></i></span>
          </el-tooltip>
      )
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.pay-setting {
  .page-title {
    padding-left: 40px;
  }

  .table-wrapper {
    position: relative;
    padding-left: 24px; 
    padding-right: 24px; 
    background-color: #FFFFFF;
    width: 96%;
    min-width: 900px;
    min-height: 531px;
    // margin: 0 auto;
    .add {
      text-align: right;
      line-height: 74px;
      height: 74px;
      button {
        background-color: #35B53F;
        border-radius: 4px;
        width: 90px;
        height: 34px;
        border: none;
        color: #FFFFFF;
        cursor: pointer;
        margin-right: 18px;
      }
    }

    .operate-tooltip {
      position: absolute;
      right: 0;
      top: 100px;
      z-index: 2;
      border-radius: 50%;
      font-size: 12px;
      padding: 0 5px;
      background-color: #b2b2b2;
      color: #ffffff;
      cursor: pointer;
    }

    p {
      color: #999999;
      letter-spacing: 0;
    }
    
    p.green {
      color: #35B53F;
    }
  }
  .page-title {
    span {
      font-size: 14px;
      color: #999999;
      letter-spacing: 0.2px;
      margin-left: 30px;
    }
  }
}
</style>

<style lang="scss">
.pay-setting {
  .el-table {
    width: 100%;
    box-sizing: border-box;
    // margin: 0 auto;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    th {
      background-color: #E6E6E6;
      font-family: 'PingFang SC','MicrosoftYaHei';
      font-size: 16px;
      color: #333333;
      &:nth-last-child(2) {
        // .cell::after {
        //   content: '?';
        //   border-radius: 50%;
        //   margin-left: 5px;
        //   font-size: 12px;
        //   padding: 0 5px;
        //   background-color: #b2b2b2;
        //   color: #ffffff;
        //   cursor: pointer;
        // }
      }
      
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
  }
}

</style>



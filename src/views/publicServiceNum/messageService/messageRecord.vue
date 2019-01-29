<template>
  <div class="message-record bgcolor-white">
    <div class="page-title flex-align">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'messageService' }">短信服务</el-breadcrumb-item>
        <el-breadcrumb-item>短信记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paddingX20 padding20X">
      <el-row>
        <el-button type="text" @click="renew">去续费</el-button>
      </el-row>

      <!-- 筛选表单 -->
      <el-form :model="filterForm">
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <!-- 图标 -->
      <ve-line
        :data="chartData"
        :settings="chartSettings"
        :theme="theme">
      </ve-line>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="发送时间"></el-table-column>
        <el-table-column prop="name" label="发送内容"></el-table-column>
        <el-table-column prop="province" label="收短信方姓名"></el-table-column>
        <el-table-column prop="city" label="收短信方联系方式"></el-table-column>
        <el-table-column prop="address" label="发送状态"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'

export default {
  components: { VeLine },
  data () {
    //v-charts配置
    this.chartSettings = {
      area: true,
      xAxisType: 'time'
    };
    this.theme = {
      "color": 'rgba(85,178,84,0.5)',
      "lineSmooth": false
    };
    return {
      filterForm: {
        dateRange: []
      },
      chartData: {
        columns: [ '日期', '发送成功条数' ],
        rows: [
          { '日期': '2018-12-10', '发送成功条数': 12 },
          { '日期': '2018-12-09', '发送成功条数': 58 },
          { '日期': '2018-12-08', '发送成功条数': 36 }
        ]
      },
      tableData: [],
      currentPage: 1
    }
  },
  methods: {
    //去续费
    renew () {
      this.$router.push({
        name: 'messageRenew'
      });
    },
    handleSizeChange (val) {},
    handleCurrentChange (val) {}
  }
}
</script>

<style lang="scss">

</style>

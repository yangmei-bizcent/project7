<template>
  <div class="renew-record bgcolor-white">
    <div class="page-title flex-align">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'messageService' }">短信服务</el-breadcrumb-item>
        <el-breadcrumb-item>短信续费记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paddingX20 padding20X">
      <el-row>
        <el-button type="text" @click="renew">去续费</el-button>
      </el-row>

      <!-- 搜索表单 -->
      <el-form :model="searchForm">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="订单号"></el-table-column>
        <el-table-column prop="name" label="充值金额（元）"></el-table-column>
        <el-table-column prop="province" label="短信条数（条）"></el-table-column>
        <el-table-column prop="city" label="充值时间"></el-table-column>
        <el-table-column prop="address" label="充值人"></el-table-column>
        <el-table-column prop="zip" label="充值状态"></el-table-column>
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
export default {
  data () {
    return {
      searchForm: {
        dateRange: []
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

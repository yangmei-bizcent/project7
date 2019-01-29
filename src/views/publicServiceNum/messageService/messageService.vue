<template>
  <div class="message-service bgcolor-white">
    <div class="page-title flex-alignstart-justifystart">
      <span>短信服务</span>
      <span class="marginleft30 fontsize0 color-999">以下列表为需要短信服务的已开通应用</span>
    </div>

    <div class="paddingX20 padding20X">
      <el-row>
        <el-button type="text" @click="renew">去续费</el-button>
        <el-button type="text" @click="checkRenewRecord">续费记录</el-button>
      </el-row>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="应用类型">
          <el-select v-model="searchForm.appType" placeholder="">
            <el-option label="就医相关" value=""></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="searchForm.state" placeholder="">
            <el-option label="咸鱼状态" value=""></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="checkMessageSignature">短信签名</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="应用名称"></el-table-column>
        <el-table-column prop="province" label="应用简介"></el-table-column>
        <el-table-column prop="city" label="应用类型"></el-table-column>
        <el-table-column prop="address" label="应用提供方"></el-table-column>
        <el-table-column prop="zip" label="已使用条数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">查看详情</el-button>
          </template>
        </el-table-column>
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
        appType: '',
        state: ''
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
    //续费记录
    checkRenewRecord () {
      this.$router.push({
        name: 'renewRecord'
      });
    },
    //短信签名
    checkMessageSignature () {
      this.$router.push({
        name: 'messageSignature'
      });
    },
    handleSizeChange (val) {},
    handleCurrentChange (val) {}
  }
}
</script>

<style lang="scss">

</style>

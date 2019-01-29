<template>
  <div class="message-renew bgcolor-white">
    <div class="page-title flex-align">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'messageService' }">短信服务</el-breadcrumb-item>
        <el-breadcrumb-item>短信条数续费</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paddingX20 padding20X">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <p>1000条</p>
            <p>50元</p>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card>
            <p>2000条</p>
            <p>100元</p>
          </el-card>
        </el-col>
      </el-row>

      <el-form :model="payForm" label-width="100px">
        <el-form-item label="支付方式">
          <el-radio-group v-model="payForm.payType">
            <el-radio label="微信支付"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">确认开通</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      payForm: {
        payType: '微信支付'
      }
    }
  }
}
</script>

<style lang="scss">

</style>

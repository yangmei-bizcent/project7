<template>
  <div>
    <el-input type="textarea" v-model="menuJson"></el-input>
    <el-button @click="configMenu">配置</el-button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      menuJson:''
    }
  },
  async mounted(){
    await this.$store.dispatch({type:'wxMenuConfig'})
    //console.log("<<<<<<<<<<<<<<<<<<<<",this.$store.getters.menuConfigInfo)
    this.menuJson =JSON.stringify(this.$store.getters.menuConfigInfo,null,4);
  },
  methods:{
    configMenu(){
      this.$store.dispatch({type:'configWxMenu',menuJson:this.menuJson})
    }
  }
}
</script>


<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import '@/assets/css/global.scss'
  import '@/assets/css/theme.scss'
  import '@/assets/css/layout.scss'
  import '@/assets/css/common.scss'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        token: 'token',
      })
    },
    mounted() {
    },
  }

</script>

<style lang="scss">
  html,
  body {
    margin: 0px;
    font-family: 'PingFang SC','MicrosoftYaHei';
    font-size: 16px;
    user-select: none;
    background-color: #f6f8f9;
    * {
      box-sizing: border-box;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0px;
  }

  i {
    display: inline-block;
  }

  a {
    text-decoration: none;
  }

  ul,
  p {
    padding: 0;
    margin: 0;
  }

  ul li {
    list-style: none;
  }

</style>

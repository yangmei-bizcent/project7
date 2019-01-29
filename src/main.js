// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import ElementUI  from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'
import VueClipboard from 'vue-clipboard2'
import VueDND from 'awe-dnd'
Vue.use(VueDND);

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
Vue.prototype.setTab=((name)=>{//控制菜单样式
  let tabList=['index','service','developer','product','help','example','contact','about'];//需要显示的tab名
  let tabPath=['index','serCenIndex','','productExperence','help','corporateCom','aboutUs'];//对应的路由名
  let tabIndex="";
  tabPath.forEach((value,index)=>{
    if(name==value){
      tabIndex= tabList[index];
    }
  })
  return tabIndex;
})
router.beforeEach((to, from, next) => {  
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if(to.meta.requiresAuth && !sessionStorage.getItem('token')) {next({ path: '/' })} 
     //下一跳路由需要登录验证，并且还未登录，则路由定向到 登录路由
  else { next() }
}),

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

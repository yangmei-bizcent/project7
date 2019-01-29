import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import user from './modules/user'
import application from "./modules/application";
import wechat from "./modules/wechat";
import dynamic from "./modules/dynamic";
import patientVisitConfig from "./modules/patientVisitConfig";
import payment from "./modules/payment";
import hospital from "./modules/hospital";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    user,
    wechat,
    application,
    dynamic,
    patientVisitConfig,
    payment,
    hospital
  },
  strict: process.env.NODE_ENV !== 'production' //  进行自动判断严格模式还是非严格模式（开发环境下是严格模式）做这个判断是为了避免不必要的性能损耗
})

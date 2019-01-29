import {
  wxAuthApi,
  wxAuthTokenApi,
  menuConfigApi,
  configWxMenuApi,
  wechatInfoApi,
  wechatMenuHistoryApi,
  getWxUserStaticDataApi
} from "../../service/wechat";
import {
  Message
} from 'element-ui'

const state = {
  wechatAuthAddr: '',
  menuConfigInfo: '',
  wechatInfo: '',
  wechatMenuHistoryList: ''
};
const getters = {
  wechatAuthAddr: state => {
    return state.wechatAuthAddr
  },
  menuConfigInfo: state => {
    return state.menuConfigInfo
  },
  wechatInfo: state => {
    return state.wechatInfo
  },
  wechatMenuHistoryList: state => {
    return state.wechatMenuHistoryList
  }
};
const mutations = {
  wechatAuthAdrress(state, payload) {
    return state.wechatAuthAddr = payload.qrcodeUrl;
  },

  menuConfigInfo(state, payload) {
    state.menuConfigInfo = payload.res.data
  },

  wechatInfo(state, payload) {
    return state.wechatInfo = payload.res.data
  },

  wechatMenuHistory(state, payload) {
    return state.wechatMenuHistoryList = payload.res;
  }
};
const actions = {
  async wechatAuthAdrress({commit}, payload) {
    let d = await wxAuthApi(payload.authCallbackUrl)
    ////console.log("获取微信授权连接结果：" + d.data)
    commit({
      type: 'wechatAuthAdrress',
      qrcodeUrl: d.data
    });
  },

  wxAuthToken({
    commit
  }, payload) {
    wxAuthTokenApi(payload.authCode).then(d => {
      ////console.log("wxAuthTokenApi", d)
    })
  },

  async wxMenuConfig({commit}) {
    let d = await menuConfigApi();
    ////console.log("微信配置菜单信息：",d)
    commit({type: 'menuConfigInfo',res: d})      
  },

  configWxMenu({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      configWxMenuApi(payload.menu).then(d => {
        // //console.log("menuConfigResult",d.data.success)
        // if(d.hasOwnProperty('data') && d.data.success){
        //   Message.success("配置成功")
        // }
        resolve(d);
      });
    })
  },
  async wechatInfo({commit}, payload) {
    let d = await wechatInfoApi();
    ////console.log("微信公众号信息：",d)
    commit({type: 'wechatInfo',res: d})   
  },

  wechatMenuHistory({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      wechatMenuHistoryApi(payload.req).then(d => {
        commit({
          type: 'wechatMenuHistory',
          res: d.data
        })
        resolve(d);
      })
    })
  },

  /**
   * 数据视图
   */
  getWxUserStaticData({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      getWxUserStaticDataApi(payload.params).then(d => {
        resolve(d);
      });
    });
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}

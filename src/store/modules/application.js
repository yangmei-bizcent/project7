import {
  bindWechatInfoApi,
  getHosptialCategoryApi,
  getProvincesApi,
  getCitysApi,
  getAreasApi,
  uploadPictureApi,
  submitPlatformHospitalApi,
  userBindPlatformHospitalApi,
  serviceHrefOptionsApi,
  getPlatformHospitalByGatewayInfoApi,
  userPatchPlatformHospitalApi,
  getBusinessTypesApi,
  getApplicationServiceByBusinessTypeIdApi,
  getOpenedApplicationApi,
  appOpenUpApi,
  serviceHrefOptionsWxApi,
  getHelpCenterParentMenuApi,
  getHelpCenterMenuByParentMenuIdApi,
  getHelpCenterInfoByMenuIdApi,
  searchHelpCenterInfoByTitleOrContentApi,
  getHelpCenterInfoByIdApi
} from "../../service/application";
import Vue from 'vue'

const state = {
  applicationApiErrorMsg: '',
  bindInfo: '',
  hosptialCategory: '',
  provinces: '',
  citys: '',
  areas: '',
  pictureUrl: '',
  submitPlatformHospitalId: '',
  bindStatus: false,
  serviceHrefOptions: '',
  platformHospital: '',
  businessTypes: '',
  applicationService: '',
  openedApplicationList: '',
  helpParentMenuList: '',
  helpSonMenuList: '',
  helpInfoList: '',
  helpInfoListBySearch: '',
  helpInfoDetail: ''
};
const getters = {
  bindInfo: state => {
    return state.bindInfo;
  },
  hosptialCategory: state => {
    return state.hosptialCategory;
  },
  provinces: state => {
    return state.provinces;
  },
  citys: state => {
    return state.citys;
  },
  areas: state => {
    return state.areas;
  },
  pictureUrl: state => {
    return state.pictureUrl;
  },
  submitPlatformHospitalId: state => {
    return state.submitPlatformHospitalId
  },
  bindStatus: state => {
    return state.bindStatus
  },
  serviceHrefOptions: state => {
    return state.serviceHrefOptions
  },
  platformHospital: state => {
    return state.platformHospital
  },
  businessTypes: state => {
    return state.businessTypes
  },
  applicationService: state => {
    return state.applicationService
  },
  getOpenedApplicationList: state => {
    return state.openedApplicationList
  },
  helpParentMenuList: state => {
    return state.helpParentMenuList
  },
  helpSonMenuList: state => {
    return state.helpSonMenuList
  },
  helpInfoList: state => {
    return state.helpInfoList
  },
  helpInfoListBySearch: state => {
    return state.helpInfoListBySearch
  },
  helpInfoDetail: state => {
    return state.helpInfoDetail
  }
}
const mutations = {

  /**
   * 机构绑定公众号
   * @param state
   * @param payload
   * @returns {Promise<any>}
   */
  bindWechatInfo(state, payload) {
    return state.bindInfo = payload.res;
  },

  /**
   * 获取机构/医院的类别
   * @param state
   * @param payload
   * @returns {Promise<any>}
   */
  getHosptialCategory(state, payload) {

    return state.hosptialCategory = payload.res.data
  },

  /**
   * 获取省份
   * @param state
   * @param payload
   * @returns {Promise<any>}
   */
  getProvinces(state, payload) {
    let provinces = payload.res
    if (provinces.hasOwnProperty('data') && provinces.data.hasOwnProperty('code')) {
      return state.applicationApiErrorMsg = provinces.data.msg;
    }
    return state.provinces = provinces.data

  },
  /**
   * 根据省份code获取市
   * @param state
   * @param payload
   * @returns {Promise<any>}
   */
  getCitys(state, payload) {
    return state.citys = payload.res.data;
  },

  /**
   * 根据省份code获取市
   * @param state
   * @param payload
   * @returns {Promise<any>}
   */
  getAreas(state, payload) {
    return state.areas = payload.res.data;
  },

  /**
   * 上传图片
   * @param state
   * @param payload
   * @returns {Promise<any>}
   */
  uploadPicture(state, payload) {
    return state.pictureUrl = payload.res.data.url;
  },
  /**
 * 提交机构
 * @param state
 * @param payload
 * @returns {Promise<any>}
 */
  submitPlatformHospital(state, payload) {
    return state.submitPlatformHospitalId = payload.res.data;
  },
  /**
  * 用户绑定机构
  * @param state
  * @param payload
  * @returns {Promise<any>}
  */
  userBindPlatformHospital(state, payload) {
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      state.bindStatus = false;
    }
    return state.bindStatus = true;
  },

  /**
   * 可选服务列表
   * @param {*} state 
   * @param {*} payload 
   */
  serviceHrefOptions(state, payload) {
    return state.serviceHrefOptions = payload.res.data
  },
  getPlatformHospitalByGatewayInfo(state, payload) {
    let chooseOrgInfo = JSON.parse(sessionStorage.getItem('chooseOrgInfo'));
    chooseOrgInfo.userHospitalId = payload.res.data.userHospitalId;
    sessionStorage.setItem('chooseOrgInfo', JSON.stringify(chooseOrgInfo));
    return state.platformHospital = payload.res.data;
  },
  getBusinessTypes(state, payload) {
    return state.businessTypes = payload.res.data;
  },
  getApplicationServiceByBusinessTypeId(state, payload) {
    return state.applicationService = payload.res.data
  },
  getOpenedApplicationList(state, payload) {
    return state.openedApplicationList = payload.res.data
  },
  addAppItems(state, payload) {
    Vue.set(state.businessTypes, payload.req.index, payload.req.element);
  },
  getHelpCenterParentMenu(state, payload) {
    return state.helpParentMenuList = payload.res.data;
  },
  getHelpCenterMenuByParentMenuId(state, payload) {
    return state.helpSonMenuList = payload.res.data;
  },
  getHelpCenterInfoByMenuId(state, payload) {
    return state.helpInfoList = payload.res.data;
  },
  searchHelpCenterInfoByTitleOrContent(state, payload) {
    return state.helpInfoListBySearch = payload.res.data;
  },
  getHelpCenterInfoById(state, payload) {
    return state.helpInfoDetail = payload.res.data;
  }



};
const actions = {
  /**
   * 机构绑定公众号
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  bindWechatInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      bindWechatInfoApi(payload.authCode).then(d => {
        if (d.hasOwnProperty('data')) {
          commit({ type: 'bindWechatInfo', res: { isBind: true } });
        }
        resolve(d);
      }).catch((error) => {
        if (error.hasOwnProperty('data')) {
          commit({ type: 'bindWechatInfo', res: { isBind: false, errmsg: error.data.msg } });
        }
        else {
          commit({ type: 'bindWechatInfo', res: { isBind: false, errmsg: error.response.data.message } });
        }
        resolve(error);
      })
    })
  },

  /**
   * 获取机构/医院的类别
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  async getHosptialCategory({ commit }, payload) {
    let d = await getHosptialCategoryApi()
    commit({ type: 'getHosptialCategory', res: d });


  },
  /**
   * 获取省份
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  async getProvinces({ commit }, payload) {
    let d = await getProvincesApi()
    commit({ type: 'getProvinces', res: d });
  },

  /**
   * 根据省份code获取市
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  async getCitys({ commit }, payload) {
    let d = await getCitysApi(payload.province_code)
    commit({ type: 'getCitys', res: d });
  },

  /**
   * 根据城市code获取区
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  async getAreas({ commit }, payload) {
    let d = await getAreasApi(payload.city_code)
        commit({ type: 'getAreas', res: d });
  },

  /**
   * 上传图片
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  uploadPicture({ commit }, payload) {
    return new Promise((resolve, reject) => {
      uploadPictureApi(payload.form).then(d => {
        commit({ type: 'uploadPicture', res: d });
        resolve(d);
      })
    })
  },
  /**
 * 提交机构
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
  submitPlatformHospital({ commit }, payload) {
    return new Promise((resolve, reject) => {
      submitPlatformHospitalApi(payload.authenForm).then(d => {
        commit({ type: 'submitPlatformHospital', res: d });
        resolve(d);
      })

    })

  },

  /**
 * 用户与机构绑定
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
  userBindPlatformHospital({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userBindPlatformHospitalApi(payload.BindRequestInfo).then(d => {
        commit({ type: 'userBindPlatformHospital', res: d });
        resolve(d);
      })
    })


  },
  /**
   * 可选服务列表
   */
  serviceHrefOptions({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceHrefOptionsApi(payload.req).then(d => {
        commit({ type: 'serviceHrefOptions', res: d });
        resolve(d);
      })
    })
  },
  /**
 *根据网关phid来获取医院信息
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
  getPlatformHospitalByGatewayInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getPlatformHospitalByGatewayInfoApi().then(d => {
        commit({ type: 'getPlatformHospitalByGatewayInfo', res: d });
        resolve(d);
      })
    })
  },
  /**
* 用户修改机构
* @param commit
* @param payload
* @returns {Promise<any>}
*/
  userPatchPlatformHospital({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userPatchPlatformHospitalApi(payload.pathAuthenForm).then(d => {
        // debugger;
        // commit({ type: 'userPatchPlatformHospital', res: d });
        resolve(d);
      })

    })

  },
  getBusinessTypes({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getBusinessTypesApi().then(d => {
        commit({ type: 'getBusinessTypes', res: d });
        resolve(d);
      })
    })
  },
  getApplicationServiceByBusinessTypeId({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getApplicationServiceByBusinessTypeIdApi(payload.businessTypeId).then(d => {
        commit({ type: 'getApplicationServiceByBusinessTypeId', res: d });
        resolve(d);
      })
    })
  },
  /**
   * 机构开通应用列表
   */
  getOpenedApplication({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getOpenedApplicationApi(payload.platformHospitalId).then(d => {
        commit({ type: 'getOpenedApplicationList', res: d });
        resolve(d);
      })
    })
  },

  /**
   * 开通应用
   * @param {*} param0 
   * @param {*} payload 
   */
  appOpenUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ////console.log('payload.req', payload.req)
      appOpenUpApi(payload.req).then(d => {
        // commit({ type: 'getOpenedApplicationList', res: d });
        resolve(d);
      })
    })
  },
  /**
   * 可选服务列表
   */
  serviceHrefOptionsWx({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceHrefOptionsWxApi(payload.req).then(d => {
        commit({ type: 'serviceHrefOptions', res: d });
        resolve(d);
      })
    })
  },

  /**
 * 获取帮助指引 所有一级目录
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
  getHelpCenterParentMenu({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getHelpCenterParentMenuApi().then(d => {
        commit({ type: 'getHelpCenterParentMenu', res: d });
        resolve(d);
      })
    })
  },

  /**
 *根据一级目录id获取二级目录
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
  getHelpCenterMenuByParentMenuId({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getHelpCenterMenuByParentMenuIdApi(payload.parentMenuId).then(d => {
        commit({ type: 'getHelpCenterMenuByParentMenuId', res: d });
        resolve(d);
      })
    })
  },

  /**
  *根据子目录id查帮助信息
  * @param commit
  * @param payload
  * @returns {Promise<any>}
  */
  getHelpCenterInfoByMenuId({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getHelpCenterInfoByMenuIdApi(payload.menuId).then(d => {
        commit({ type: 'getHelpCenterInfoByMenuId', res: d });
        resolve(d);
      })
    })
  },

  /**
 *根据标题和文章内容来搜索帮助信息
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
  searchHelpCenterInfoByTitleOrContent({ commit }, payload) {
    return new Promise((resolve, reject) => {
      searchHelpCenterInfoByTitleOrContentApi(payload.searchInfo).then(d => {
        commit({ type: 'searchHelpCenterInfoByTitleOrContent', res: d });
        resolve(d);
      })
    })
  },

  /**
 *根据帮助信息id查帮助信息详细
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
  getHelpCenterInfoById({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getHelpCenterInfoByIdApi(payload.helpCenterInfoId).then(d => {
        commit({ type: 'getHelpCenterInfoById', res: d });
        resolve(d);
      })
    })
  },

};
export default {
  state,
  getters,
  actions,
  mutations
}

import {
  groupstylesApi,
  dynamicFuncListApi,
  addDynamicAPi,
  delDynamicAPi,
  editDynamicFuncApi,
  delDynamicDetailAPi,
  saveReleaseDynamicFuncAPi,
  releaseHistoryApi,
  resetReleaseHistoryApi,
  sortDynamicApi
} from "../../service/dynamic";

const state = {
  editDynamicSuccess: '',
  groupstylesInfo: {},
  dynamicInfoList: {},
  isModelShow: false,
  editData: {},
  linkChoose: true,
  dialogDynamicInfo: {},
  resetDynamicList: [],
  resetInfo: {},
  sortDynamicList: [],
};
const getters = {
  groupstylesInfo: state => {
    return state.groupstylesInfo;
  },
  dynamicInfoList: state => {
    return state.dynamicInfoList;
  },
};
const mutations = {

  editDynamicSuccess(state, payload) {
    return state.editDynamicSuccess = payload.info;
  },
  groupstylesInfo(state, payload) {
    return state.groupstylesInfo = payload.res.data;
  },
  dynamicFuncList(state, payload) {
    return state.dynamicInfoList = payload.res.data;
  },
  /**
   * 添加动态首页是切换打开
   */
  changeDynamicModel(state, payload) {
    if (payload.close) {
      return state.isModelShow = false;
    }
    return state.isModelShow = ~state.isModelShow;
  },
  editData(state, payload) {
    payload.editData.funcUrl = payload.editData.funcUrl === "undefined" ? null : payload.editData.funcUrl;
    return state.editData = payload.editData;
  },
  menuChoose(state, payload) {
    let style = payload.style;
    if (style === 'A') {
      return state.linkChoose = false;
    }
    if (style === 'B') {
      return state.linkChoose = true;
    }
  },
  menuDialog(state, payload) {
    return state.dialogDynamicInfo = payload.info;
  },
  resetDynamic(state, payload) {
    return state.resetDynamicList = payload.res.data;
  },
  choiceReset(state, payload) {
    return state.resetInfo = payload.resetInfo;
  },
  sortDynamicFunc(state, payload) {
    return state.sortDynamicList = payload.sortDynamicList;
  },
};
const actions = {
  /**
   * 编辑
   * @param {} param0
   * @param {*} payload
   */
  editDynamicFunc({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      editDynamicFuncApi(payload.editData).then(d => {
        this.dispatch({
          type: 'dynamicFuncList',
          phId: payload.phId,
          styleType: payload.dynamicFuncType
        });
        this.commit({
          type: 'editDynamicSuccess',
          info: d.data
        });
        resolve(d);
      });
    })
  },
  /**
   * 获取组风格列表
   * @param {*} param0
   * @param {*} payload
   */
  groupstylesInfo({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      groupstylesApi(payload.groupStyleType, payload.styleId).then(d => {
        commit({
          type: 'groupstylesInfo',
          res: d
        });
        resolve(d);
      });
    })
  },
  /**
   * 获取动态首页列表
   * @param {*} param0
   * @param {*} payload
   */
  dynamicFuncList({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      dynamicFuncListApi(payload.phId, payload.styleType).then(d => {
        commit({
          type: 'dynamicFuncList',
          res: d
        });
        resolve(d);
      });
    })
  },
  /**
   * 添加模块/保存
   * @param {*} param0
   * @param {*} payload
   */
  addDynamic({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      addDynamicAPi(payload.dynamicInfo).then(d => {
        this.commit({
          type: 'editDynamicSuccess',
          info: d.data
        });
        resolve(d);
      });
    })
  },
  /**
   * 删除整组风格
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  delDynamicByGroupId({
    commit
  }, payload) {
    if (payload.status === 'cancel') {
      this.commit({
        type: 'menuDialog',
        info: {
          isDialogShow: false
        }
      });
      return;
    }

    return new Promise((resolve, reject) => {
      let item = payload.item;
      delDynamicAPi(item.dfId, item.dfGroupId).then(d => {
        this.dispatch({
          type: 'dynamicFuncList',
          phId: item.phId,
          styleType: item.dynamicFuncType
        });
        this.commit({
          type: 'menuDialog',
          info: {
            isDialogShow: false
          }
        });
        this.commit({
          type: 'editDynamicSuccess',
          info: d.data
        });
        resolve(d);
      })
    });
  },

  delDynamicByDetailId({
    commit
  }, payload) {
    if (payload.status === 'cancel') {
      this.commit({
        type: 'menuDialog',
        info: {
          isDialogShow: false
        }
      });
      return;
    }
    return new Promise((resolve, reject) => {
      let item = payload.item;
      delDynamicDetailAPi(item.dfId, item.dfGroupId, item.dfDetailId).then(d => {
        this.dispatch({
          type: 'dynamicFuncList',
          phId: item.phId,
          styleType: item.dynamicFuncType
        });
        this.commit({
          type: 'menuDialog',
          info: {
            isDialogShow: false
          }
        });
        this.commit({
          type: 'editDynamicSuccess',
          info: d.data
        });
        resolve(d);
      })
    });
  },

  /**
   * 发布
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  saveReleaseDynamicFunc({
    commit
  }, payload) {
    if (payload.status === 'cancel') {
      this.commit({
        type: 'menuDialog',
        info: {
          isDialogShow: false
        }
      });
      return;
    }
    return new Promise((resolve, reject) => {
      let dynamicList = payload.item.dynamicList;
      saveReleaseDynamicFuncAPi(dynamicList).then(d => {
        this.dispatch({
          type: 'dynamicFuncList',
          phId: dynamicList.platformHospitalId,
          styleType: dynamicList.dynamicFuncType
        });
        this.commit({
          type: 'menuDialog',
          info: {
            isDialogShow: false
          }
        });
        this.commit({
          type: 'editDynamicSuccess',
          info: d.data
        });
        resolve(d);
      }).catch(e => {})
    });
  },
  /**
   * 重置
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  //   resetDynamic({
  //     commit
  //   }, payload) {
  //     return new Promise((resolve, reject) => {
  //       let item = payload.item;
  //       resetApi(item.dynamicFuncId).then(d => {
  //         this.dispatch({
  //           type: 'dynamicFuncList',
  //           phId: item.platformHospitalId,
  //           styleType: item.dynamicFuncType
  //         });
  //         resolve(d);
  //       }).catch(e => {})
  //     });
  //   },
  /**
   * 获取历史版本
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  resetDynamic({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      let item = payload.item;
      releaseHistoryApi(item.dynamicFuncId, payload.lastestCount).then(d => {
        this.commit({
          type: 'resetDynamic',
          res: d
        })
        resolve(d);
      }).catch(e => {})
    });
  },
  resetThisDynamic({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      let item = payload.item;
      resetReleaseHistoryApi(item.platformHospitalId, item.dynamicFuncReleaseHistoryHeadId, item.dynamicFuncType).then(d => {
        this.dispatch({
          type: 'dynamicFuncList',
          phId: item.platformHospitalId,
          styleType: item.dynamicFuncType
        });
        this.commit({
          type: 'editDynamicSuccess',
          info: d.data
        });
        resolve(d);
      });
    });
  },
  sortDynamicFunc({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      sortDynamicApi(payload.dynamicList.dynamicFuncId, payload.sort).then(d => {
        this.dispatch({
          type: 'dynamicFuncList',
          phId: payload.dynamicList.platformHospitalId,
          styleType: payload.dynamicList.dynamicFuncType
        });
        resolve(d);
      });
    });
  },
};


export default {
  state,
  getters,
  actions,
  mutations
}

import {
    getPatientVisitRulesApi,
    updateUiconfigDetailsApi,
    getUcUiFlowByPhIdAndUseTypeApi
  } from "../../service/patientVisitConfig";
  import Vue from 'vue'
  
  const state = {
    patientVisitRules: ''
  };
  const getters = {
    patientVisitRules: state => {
      return state.patientVisitRules;
    },
  }
  const mutations = {
  
    /**
     * 就诊人规则页面配置
     * @param state
     * @param payload
     * @returns {Promise<any>}
     */
    patientVisitRules(state, payload) {
      return state.patientVisitRules = payload.res.data;
    },
  };
  const actions = {
    /**
     * 就诊人规则页面配置获取
     * @param commit
     * @param payload
     * @returns {Promise<any>}
     */
    getPatientVisitRules({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getPatientVisitRulesApi(payload.ucUiFlowId, payload.stepId).then(d => {
          commit({type:'patientVisitRules',res:d.data})
          resolve(d);
        })
      })
    },
    /**
     * 就诊人规则页面配置保存
     * @param commit
     * @param payload
     * @returns {Promise<any>}
     */
    updateUiconfigDetails({ commit }, payload) {
      return new Promise((resolve, reject) => {
        updateUiconfigDetailsApi(payload.stepId, payload.flowId, payload.platformHospitalId, payload.scyUserId, payload.tUiConfigDetails).then(d => {
          resolve(d);
        })
      })
    },
    /**
     * 用户就诊人配置，获取flowId
     * @param commit
     * @param payload
     * @returns {Promise<any>}
     */
    getUcUiFlowByPhIdAndUseType({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getUcUiFlowByPhIdAndUseTypeApi(payload.defaultPlatformHospitalId, payload.useType).then(d => {
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
  

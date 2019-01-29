import {
    SET_TOKEN,
    SET_PHONE,
    USER_NAME,
    SET_ORGNAME,
    SET_ORGSTATE,
    SET_MODULEPER,
    SET_APPDATA
    
  } from '../mutation-types'
  
  const state = {
    token: '',
    phone: '',
    userName: '',
    orgname:'',
    orgstate:"",
    moduleper:"",
    appdata:''
  };
  const getters = {
    token: function (state) {
      return state.token;
    },
    phone: function (state) {
      if(state.phone==''||state.phone==null||state.phone==undefined){
        return  sessionStorage.getItem('phone');
      }
      return state.phone;
    },
    userName: function(state){
      if(state.userName==''||state.userName==null||state.userName==undefined){
        return  JSON.parse(sessionStorage.getItem('userName'));
      }
      return state.userName;
      
    },
    orgname:function(state){
      if(state.orgname=='' || state.orgname==null){
        return JSON.parse(sessionStorage.getItem('orgnameS'));
      }
      return state.orgname;
    },
    orgstate:function(state){
      if(state.orgstate=='' || state.orgstate==null){
        return JSON.parse(sessionStorage.getItem('orgstateS'));
      }
      return state.orgstate;
    },
    moduleper:function(state){
      if(state.moduleper=='' || state.moduleper==null || state.moduleper==undefined){
        return JSON.parse(sessionStorage.getItem('moduleperS'));
      }
      return state.moduleper;
    },
    appdata:function(state){
      if(state.appdata=='' || state.appdata==null || state.appdata==undefined){
        return JSON.parse(sessionStorage.getItem('appdataS'));
      }
      return state.appdata;
    }
  };
  
  const mutations = {
    [SET_TOKEN](state, token) {
      sessionStorage.setItem('token', token);
      state.token = token;
    },
    [SET_PHONE](state, phone) {
      state.phone = phone;
    },
    [USER_NAME](state, userName) {
      state.userName = userName;
    },
    [SET_ORGNAME](state, orgname) {
      state.orgname = orgname;
    },
    [SET_ORGSTATE](state, orgstate) {
      state.orgstate = orgstate;
    },
    [SET_MODULEPER](state, moduleper) {
      state.moduleper = moduleper;
    },
    [SET_APPDATA](state, appdata) {
      state.appdata = appdata;
    }
  };
  const actions = {
    set_token({commit}, payload) {
      ////console.log("token存储："+payload.token)
      commit(SET_TOKEN, payload.token);
    },
    set_phone({commit}, phone) {
      sessionStorage.setItem('phone', phone);
      commit(SET_PHONE, phone);
    },
    user_name({commit},userName){
      sessionStorage.setItem('userName', JSON.stringify(userName));
      commit(USER_NAME, userName);

    },
    set_orgname({commit},orgname){
      sessionStorage.setItem('orgnameS', JSON.stringify(orgname));
      commit(SET_ORGNAME, orgname);

    },
    set_orgstate({commit},orgstate){
      sessionStorage.setItem('orgstateS', JSON.stringify(orgstate));
      commit(SET_ORGSTATE, orgstate);

    },
    set_moduleper({commit},moduleper){
      sessionStorage.setItem('moduleperS', JSON.stringify(moduleper));
      commit(SET_MODULEPER, moduleper);
    },
    set_appdata({commit},appdata){
      sessionStorage.setItem('appdataS', JSON.stringify(appdata));
      commit(SET_APPDATA, appdata);
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  }
  
import {
  authIsRegistApi,
  authSignInApi,
  authSignUpApi,
  invitationCodeApi,
  invitationRegistBindApi,
  orginzationListApi,
  pictureCodeAPi,
  sendMsgCodeApi,
  chooseOrgApi,
  checkMsgCodeApi,
  wechatBindAPi,
  forgetPassAPi,
  modifyPasswordApi,
  modifyPhoneApi,
  getUserGatewayApi,
  signOutApi,
  currentOrgUsersApi,
  getOrgGatewayApi,
  deleteAdminApi,
  wechatLoginApi,
  currentDateApi,
  wechatUnBindApi,
  validateUserApi,
  WechatBindStatusApi,
  wechatAccountBindApi,
  getUserByUserIdApi,
  validateUserOrgBindingApi,
  getInvitationInfoByCodeApi,
} from "../../service/user";

const state = {
  isRigist: true,
  codeUrl: '',
  smsState: '',
  invitationInfo: {},
  inOrganizationInfo: '',
  organizationList: [],
  isInviteBind: false,
  isMsgRight:false,
  userGatewayInfo:'',
  inviteBindInfo: {},
  registUserInfo:{},
  wechatBindRes: '',
  registSuccess: false,
  resetPassSuccess: false,
  chooseOrgInfo:'',
  modifyPass: false,
  modifyPhone: false,
  signOutSuccess: false,
  currentOrgUserList: [],
  orgGatewayInfo: '',
  adminDeleteSuccess:false,
  currentDateInfo: '',
  unBindRes:'',
  wechatLoginInfo:'',
  validateUserSuccess:false,
  WechatBindStatus:false,
  wechatAccountBindRes: '',
  UserIdInfo:'',
  userOrgBinding:'',
};
const getters = {
  isRigist: state => {
    return state.isRigist;
  },
  smsState: state => {
    return state.smsState;
  },
  invitationInfo: state => {
    return JSON.parse(localStorage.getItem('invitationInfo'));
  },
  organizationList: state => {
    return JSON.parse(sessionStorage.getItem('organizationList'));
  },
  isMsgRight:state => {
    return state.isMsgRight
  },
  userGatewayInfo:state =>{
    return state.userGatewayInfo;
  },
  chooseOrgInfo:state => {
    state.chooseOrgInfo;
    return JSON.parse(sessionStorage.getItem('chooseOrgInfo'));
  },
  orgGatewayInfo:state =>{
    return state.orgGatewayInfo;
  }
};
const mutations = {
  isRigist(state, payload) {
    return state.isRigist = payload.res.data;
  },
  pictureCode(state, payload) {
    let codeUrl = payload.res;
    return state.codeUrl = codeUrl.data;

  },
  sendMsgCode(state, payload) {
    let msgCode = payload.res;
    return state.smsState = msgCode.data;
  },

  invitationCode(state, payload) {
    let invitation = payload.res.data;
    localStorage.setItem('invitationInfo', JSON.stringify(invitation));
    return state.invitationInfo = invitation;
  },
  listOrganization(state, payload) {
    sessionStorage.setItem('organizationList', JSON.stringify(payload.res.data));
    return state.organizationList = payload.res.data;
  },
  invitationOrganizationBind(state, payload) {
    return state.inviteBindInfo = payload.res.data;
  },
  wechatBind(state, payload) {
    return state.wechatBindRes = payload.res.data;
  },
  authSignUp(state, payload) {
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      state.registSuccess = false;
    }
    return state.registSuccess = true;
  },
  checkMsgCode(state,payload){
    let res = payload.res;  
    if (res.hasOwnProperty('data') && res.data.hasOwnProperty('code')) {
      return state.isMsgRight = false;
    }
    return state.isMsgRight=true;
  },
  forgetPass(state, payload) {
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      state.resetPassSuccess = false;
    }
    return state.resetPassSuccess = true;
  },
  getUserGateway(state,payload){
    return state.userGatewayInfo=payload.res.data;
  },
  chooseOrgInfo(state,payload){
    sessionStorage.setItem('chooseOrgInfo', JSON.stringify(payload.res.data));
    ////console.log(payload.res.data);
    return state.chooseOrgInfo=payload.res.data
  },
  modifyPass(state, payload) {
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      return state.modifyPass = false;
    }
    return state.modifyPass = true;
  },
  modifyPhone(state, payload) {
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      return state.modifyPhone = false;
    }
    return state.modifyPhone = true;
  },
  signOut(state, payload) {
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      state.signOutSuccess = false;
    }
    return state.signOutSuccess = true;
  },
  currentOrgUsers(state, payload) {
    localStorage.setItem('currentOrgUserList', JSON.stringify(payload.res.data));
    return state.currentOrgUserList = payload.res.data;
  },
  getOrgGateway(state,payload){
    return state.orgGatewayInfo=payload.res.data;
  },
  deleteAdmin(state,payload){
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      state.adminDeleteSuccess = false;
    }
    return state.adminDeleteSuccess = true;
  },
  currentDate(state,payload){
    return state.currentDateInfo=payload.res.data;
  },
  wechatUnBind(state, payload) {
    return state.unBindRes=payload.res.data;
  },
  wechatLogin(state, payload) {
    return state.wechatLoginInfo = payload.res.data;
  },
  validateUser(state, payload) {
    let res = payload.res;
    if (res.hasOwnProperty('data') && res.hasOwnProperty('code')) {
      state.validateUserSuccess = false;
    }
    return state.validateUserSuccess = true;
  },
  WechatBindStatus(state, payload) {
    return state.WechatBindStatus = payload.res.data;
  },
  wechatAccountBind(state, payload) {
    return state.wechatAccountBindRes = payload.res.data;
  },
  getUserByUserId(state,payload){
    return state.UserIdInfo=payload.res.data;
  },
  validateUserOrgBinding(state, payload){
    return state.userOrgBinding=payload.res.data; 
  }

};
const actions = {

  /**
   * 用户登陆
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  login({commit}, payload) {
    let req = payload.req;
    return new Promise((resolve, reject) => {
      authSignInApi({"password": req.password, "phone": req.phone}).then(d => {
        this.dispatch({
          type: 'set_token',
          token: d.data.token
        });
        this.dispatch({
          type: 'user_name'
        });
        resolve(d);
      }).catch(() => {
        ////console.log(11)
        payload.vm.loadingLogin = false;
        payload.vm.loadingLogin1 = false;
        payload.vm.register = false;
        payload.vm.productLogin = false;
      });
    })
  },

  /**
   * 判断用户是否注册
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  isRigist({commit}, payload) {
    return new Promise((resolve, reject) => {
      authIsRegistApi(payload.phone).then(d => {
        commit({type: 'isRigist', res: d});
        resolve(d);
      });
    })
  },

  /**
   * 用户注册
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  authSignUp({commit}, payload) {
    return new Promise((resolve, reject) => {
      authSignUpApi(payload.userInfo).then(d => {
        commit({type: 'authSignUp', res: d});
        resolve(d);
      });
    })
  },

  /**
   * 获取图形验证码
   * @param {*} commit
   * @param {*} payload 5=重置密码，9=注册，6=验证码登录，7更换绑定手机号，99其他
   */
  pictureCode({commit}, payload) {
    return new Promise((resolve, reject) => {
      pictureCodeAPi(payload.phone, payload.purpose).then(d => {
        ////console.log("图形验证码-》》》》"+d.data)
        commit({type: 'pictureCode', res: d});
        resolve(d);
      });
    })
  },


  /**
   * 获取短信验证码
   * @param {*} commit
   * @param {*} payload 手机号码：phone; 图形验证码：picture_code;
   *                    目的：purpose (5=重置密码，9=注册，6=验证码登录，7更换绑定手机号，99其他)
   */
  sendMsgCode({commit}, payload) {
    return new Promise((resolve, reject) => {
      sendMsgCodeApi(payload.msgInfo).then(d => {
        commit({type: 'sendMsgCode', res: d});
        resolve(d);
      })
    })
  },

  /**
   * 获取邀请码
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  invitationCode({commit}, payload) {
    return new Promise((resolve, reject) => {
      invitationCodeApi({phone: payload.phone, real_name: payload.realName}).then(d => {
        commit({type: 'invitationCode', res: d});
        resolve(d);
      })
    })
  },

   /**
   * 选择机构
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  chooseOrg({commit}, payload) {
    return new Promise((resolve, reject) => {
      chooseOrgApi(payload.req).then(d => {
        commit({type: 'chooseOrgInfo', res: d});
        resolve(d);
      })
    })
  },

  /**
   *  绑定邀请人
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  invitationOrganizationBind({commit}, payload) {
    return new Promise((resolve, reject) => {
      invitationRegistBindApi(payload.userInfo).then(d => {
        commit({type: 'invitationOrganizationBind', res: d});
        resolve(d);
      })
    })
  },

  /**
   * 获取机构列表
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  listOrganization({commit}, payload) {
    return new Promise((resolve, reject) => {
      orginzationListApi().then(d => {
        commit({type: 'listOrganization', res: d});
        resolve(d);
      })
    })
  },

  /**
   * 第三方用户绑定
   * @param {*} param0 
   * @param {*} payload 
   */
  wechatBind({commit}, payload) {
    return new Promise((resolve, reject) => {
      wechatBindAPi({code: payload.authCode, phone: payload.phone}).then(d => {
        commit({type: 'wechatBind', res: d});
        resolve(d);
      })
    })
  },

  /**
   * 忘记密码
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  forgetPass({commit}, payload) {
    return new Promise((resolve, reject) => {
      forgetPassAPi(payload.userInfo).then(d => {
        commit({type: 'forgetPass', res: d});
        resolve(d);
      });
    })
  },

  /**
   * 修改密码
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  modifyPass({commit}, payload) {
    return new Promise((resolve, reject) => {
      modifyPasswordApi(payload.userInfo).then(d => {
        commit({type: 'modifyPass', res: d});
        resolve(d);
      });
    })
  },

   /**
   * 修改手机号
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  modifyPhone({commit}, payload) {
    return new Promise((resolve, reject) => {
      modifyPhoneApi(payload.userInfo).then(d => {
        commit({type: 'modifyPhone', res: d});
        resolve(d);
      }).catch(e => {
        reject(e);
      });
    })
  },

  /**
   * 检验短信验证码
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  checkMsgCode({commit},payload){
    return new Promise((resolve,reject) => {
      checkMsgCodeApi(payload.msgCodeInfo).then(d => {
        commit({type:'checkMsgCode',res:d});     
        resolve(d);
      })

    })

  },

  /**
   * 获取网关用户信息
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  getUserGateway({commit},payload){
    return new Promise((resolve,reject) =>{
      getUserGatewayApi().then(d =>{
        commit({type:'getUserGateway',res:d});
        resolve(d);
      })
    })

  },

  /**
   * 退出登录
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  signOut({commit},payload){
    return new Promise((resolve,reject) => {
      signOutApi().then(d => {
        commit({type:'signOut',res:d});     
        resolve(d);
      })

    })

  },

  /**
   * 获取当前机构下管理员
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  currentOrgUsers({commit},payload){
    return new Promise((resolve,reject) => {
      currentOrgUsersApi(payload.orgId, payload.pageNo, payload.pageSize).then(d => {
        ////console.log("currentOrgUserList="+d.data);
        commit({type:'currentOrgUsers',res:d});     
        resolve(d);
      })

    })

  },

  /**
   * 获取网关机构信息
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  getOrgGateway({commit},payload){
    return new Promise((resolve,reject) =>{
      getOrgGatewayApi().then(d =>{
        commit({type:'getOrgGateway',res:d});
        resolve(d);
      })
    })

  },

  /**
   * 删除当前机构下管理员
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  deleteAdmin({commit},payload){
    return new Promise((resolve,reject) => {
      deleteAdminApi(payload.orgInfo).then(d => {
        commit({type:'deleteAdmin',res:d});     
        resolve(d);
      })

    })

  },

  /**
   * 微信扫码登陆
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  wechatLogin({commit}, payload) {
    let req = payload.req;
    return new Promise((resolve, reject) => {
      wechatLoginApi({"code": req.code}).then(d => {
        commit({type:'wechatLogin',res:d});
        ////console.log(d);
        if(d.data.status==true){
          this.dispatch({
            type: 'set_token',
            token: d.data.openPlatformUser.token
          });
          // this.dispatch({
          //   type: 'user_name',
          //   userName: d.data.openPlatformUser.realName
          // });
        }
        resolve(d);
      });
    })
  },

  /**
   * 获取当前日期信息
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  currentDate({commit},payload){
    return new Promise((resolve,reject) =>{
      currentDateApi().then(d =>{
        commit({type:'currentDate',res:d});
        resolve(d);
      })
    })

  },

  /**
   * 微信解绑
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  wechatUnBind({commit},payload){
    return new Promise((resolve,reject) => {
      wechatUnBindApi().then(d => {
        commit({type:'wechatUnBind',res:d});     
        resolve(d);
      })

    })

  },

  /**
   * 验证被邀请人输入信息与邀请信息是否一致
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  validateUser({commit},payload){
    return new Promise((resolve,reject) => {
      validateUserApi(payload.userInfo).then(d => {
        commit({type:'validateUser',res:d});     
        resolve(d);
      })

    })

  },

  /**
   * 判断是否绑定微信账户
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  WechatBindStatus({commit},payload){
    return new Promise((resolve,reject) => {
      WechatBindStatusApi().then(d => {
        commit({type:'WechatBindStatus',res:d});     
        resolve(d);
      })

    })

  },

  /**
   * 第三方账号绑定
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  wechatAccountBind({commit}, payload) {
    return new Promise((resolve, reject) => {
      wechatAccountBindApi(payload.thirdInfo).then(d => {
        commit({type: 'wechatAccountBind', res: d});
        resolve(d);
      });
    })
  },

  /**
   * 根据userId获取用户详细信息（本地数据库缓存数据）
   * @param {*} commit
   * @param {*} payload
   */
  getUserByUserId({commit}, payload) {
    return new Promise((resolve, reject) => {
      getUserByUserIdApi(payload.userId).then(d => {
        commit({type: 'getUserByUserId', res: d});
        resolve(d);
      });
    })
  },

   /**
   * 邀请管理员时判断该用户是否绑定该机构
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  validateUserOrgBinding({commit}, payload) {
    return new Promise((resolve, reject) => {
      validateUserOrgBindingApi(payload.info).then(d => {
        commit({type: 'validateUserOrgBinding', res: d});
        resolve(d);
      });
    })
  },

  /**
   * 根据邀请码获取邀请信息
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  getInvitationInfoByCode({commit}, payload) {
    return new Promise((resolve, reject) => {
      getInvitationInfoByCodeApi(payload.code).then(d => {
        resolve(d);
      });
    });
  },
  
}


export default {
  state,
  getters,
  actions,
  mutations
}

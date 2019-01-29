import store from '@/store/index'
import {
  lazyload
} from '@/util'

const routes = [{
    path: '/',
    name: 'index',
    meta: {
      title: '互联网医院开放平台'
    },
    component: lazyload('index'),
  }, 
  {
    path: '/',
    name: 'layout',
    meta: {
      title: '互联网医院开放平台'
    },
    component: lazyload('layout'),
    children: [{
        path: '/platformIntro',
        name: 'platformIntro',
        meta: {
          title: '互联网医院开放平台-介绍页'
        },
        component: lazyload('platformIntro')
      }, {
        path: '/register',
        name: 'register',
        meta: {
          title: '注册-互联网医院开放平台'
        },
        component: lazyload('register')
      }, {
        path: '/chooseOrganiz/:islogined',
        name: 'chooseOrganiz',
        meta: {
          title: '选择登录机构-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('chooseOrganiz')
      }, {
        path: '/passwordConfig/forgetPass',
        name: 'forgetPass',
        meta: {
          title: '忘记密码-互联网医院开放平台',
          requiresAuth: false
        },
        component: lazyload('passwordConfig/forgetPass')
      }, {
        path: '/passwordConfig/resetSuccess',
        name: 'resetSuccess',
        meta: {
          title: '重置密码成功-互联网医院开放平台'
        },
        component: lazyload('passwordConfig/resetSuccess')
      }, {
        path: '/dynamicMicroWeb/uploadResult',
        name: 'uploadResult',
        meta: {
          title: '发布结果-互联网医院开放平台'
        },
        component: lazyload('dynamicMicroWeb/uploadResult')
      }, {
        path: '/registerSuccess',
        name: 'registerSuccess',
        meta: {
          auth: true,
          title: '注册成功-互联网医院开放平台'
        },
        component: lazyload('registerSuccess')
      }, {
        path: '/bindAccount',
        name: 'bindAccount',
        meta: {
          title: '绑定账户-互联网医院开放平台'
        },
        component: lazyload('bindAccount')
      },
      {
        path: '/bindAccountResult',
        name: 'bindAccountResult',
        meta: {
          title: '绑定结果-互联网医院开放平台'
        },
        component: lazyload('bindAccountResult')
      }, {
        path: '/bindWechat',
        name: 'bindWechat',
        meta: {
          title: '绑定微信-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('bindWechat')
      }, {
        path: '/bindResult',
        name: 'bindResult',
        meta: {
          title: '绑定结果-互联网医院开放平台'
        },
        component: lazyload('bindResult')
      }, {
        path: '/removeBinding',
        name: 'removeBinding',
        meta: {
          title: '解除绑定-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('removeBinding')
      }, {
        path: '/removeBindingResult',
        name: 'removeBindingResult',
        meta: {
          title: '解除绑定结果-互联网医院开放平台'
        },
        component: lazyload('removeBindingResult')
      }, {
        path: '/userNotice',
        name: 'userNotice',
        meta: {
          title: '法律声明-互联网医院开放平台'
        },
        component: lazyload('userNotice')
      },
      {
        path: '/messageManage',
        name: 'messageManage',
        meta: {
          title: '消息管理-互联网医院开放平台'
        },
        component: lazyload('publicServiceNum/messageManage')
      }, {
        path: '/publicServiceNum/paySetting',
        name: 'paySetting',
        meta: {
          title: '缴费设置-互联网医院开放平台',
        },
        component: lazyload('publicServiceNum/paySetting/paySetting')
      },
      {
        path: '/publicServiceNum/accountConfiguration',
        name: 'accountConfiguration',
        meta: {
          title: '账户配置-互联网医院开放平台'
        },
        component: lazyload('publicServiceNum/paySetting/accountConfiguration')
      },
      {
        path: '/publicServiceNum/paymentTransactions',
        name: 'paymentTransactions',
        meta: {
          title: '支付业务-互联网医院开放平台'
        },
        component: lazyload('publicServiceNum/paySetting/paymentTransactions')
      },
      {
        path: '/publicServiceNum/serviceNumIndex',
        name: 'serviceNumIndex',
        meta: {
          title: '服务号-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('publicServiceNum/serviceNumIndex')
      },
      {
        path: '/publicServiceNum/customizedMenu',
        name: 'customizedMenu',
        meta: {
          title: '自定义菜单-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('publicServiceNum/customizedMenu')
      },
      {
        path: '/publicServiceNum/uerAllocation',
        name: 'uerAllocation',
        meta: {
          title: '用户就诊人配置-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('publicServiceNum/uerAllocation')
      },
      {
        path: '/publicServiceNum/autoReply',
        name: 'autoReply',
        meta: {
          title: '自动回复-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('publicServiceNum/autoReply')
      },
      {
        path: '/dynamicMicroWeb/dynamicMicroWeb',
        name: 'dynamicMicroWeb',
        meta: {
          title: '动态微官网-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('dynamicMicroWeb/dynamicMicroWeb')
      },
      {
        path: '/hospInfoDeploy/hospInfoDeploy',
        name: 'hospInfoDeploy',
        meta: {
          title: '医院信息配置-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('hospInfoDeploy/hospInfoDeploy')
      },
      {
        path: '/hospInfoDeploy/hospInfoDeployDetail',
        name: 'hospInfoDeployDetail',
        meta: {
          title: '医院信息配置详情-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('hospInfoDeploy/hospInfoDeployDetail')
      },
      {
        path: '/privacyPolicy',
        name: 'privacyPolicy',
        meta: {
          title: '隐私相关政策-互联网医院开放平台'
        },
        component: lazyload('privacyPolicy')
      }, {
        path: '/authentication/authenStepOne',
        name: 'authenStepOne',
        meta: {
          title: '认证-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('authentication/authenStepOne')
      }, {
        path: '/authentication/authenProtocol',
        name: 'authenProtocol',
        meta: {
          title: '认证-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('authentication/authenProtocol')
      }, {
        path: '/authentication/authenStepTwo/:type',
        name: 'authenStepTwo',
        meta: {
          title: '认证-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('authentication/authenStepTwo')
      }, {
        path: '/authentication/authenStepThree/:type',
        name: 'authenStepThree',
        meta: {
          title: '认证-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('authentication/authenStepThree')
      }, {
        path: '/authentication/authenStepFour/:type',
        name: 'authenStepFour',
        meta: {
          title: '认证-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('authentication/authenStepFour')
      }, {
        path: '/visConfig/visualizationConfiguration',
        name: 'visualizationConfiguration',
        meta: {
          title: '可视化配置台-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('visConfig/visualizationConfiguration')
      }, {
        path: '/personalCenter/accountManage',
        name: 'accountManage',
        meta: {
          title: '账户管理-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/accountManage')
      }, {
        path: '/personalCenter/phoneNumChange',
        name: 'phoneNumChange',
        meta: {
          title: '修改登录手机号-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/phoneNumChange')
      }, {
        path: '/personalCenter/setNewPhoneNum',
        name: 'setNewPhoneNum',
        meta: {
          title: '设置新登录手机号-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/setNewPhoneNum')
      }, {
        path: '/personalCenter/changeSuccess',
        name: 'changeSuccess',
        meta: {
          title: '修改账号结果-互联网医院开放平台'
        },
        component: lazyload('personalCenter/changeSuccess')
      }, {
        path: '/personalCenter/passwordChange',
        name: 'passwordChange',
        meta: {
          title: '修改登录密码-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/passwordChange')
      }, {
        path: '/personalCenter/setNewPassword',
        name: 'setNewPassword',
        meta: {
          title: '设置新密码-互联网医院开放平台'
        },
        component: lazyload('personalCenter/setNewPassword')
      }, {
        path: '/personalCenter/accountCancel',
        name: 'accountCancel',
        meta: {
          title: '注销账户-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/accountCancel')
      }, {
        path: '/personalCenter/ownerCancel',
        name: 'ownerCancel',
        meta: {
          title: '创建者注销-互联网医院开放平台'
        },
        component: lazyload('personalCenter/ownerCancel')
      }, {
        path: '/personalCenter/adminCancel',
        name: 'adminCancel',
        meta: {
          title: '管理员注销-互联网医院开放平台'
        },
        component: lazyload('personalCenter/adminCancel')
      }, {
        path: '/personalCenter/cancelSuccess',
        name: 'cancelSuccess',
        meta: {
          title: '注销成功-互联网医院开放平台'
        },
        component: lazyload('personalCenter/cancelSuccess')
      }, {
        path: '/personalCenter/accountInfo',
        name: 'accountInfo',
        meta: {
          title: '认证信息-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/accountInfo')
      }, {
        path: '/personalCenter/personalSettings',
        name: 'personalSettings',
        meta: {
          title: '人员设置-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/personalSettings')
      }, {
        path: '/personalCenter/newPart',
        name: 'newPart',
        meta: {
          title: '新增角色-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/newPart')
      }, {
        path: '/personalCenter/newAdmin',
        name: 'newAdmin',
        meta: {
          title: '新增管理员-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/newAdmin')
      }, {
        path: '/personalCenter/shareLink',
        name: 'shareLink',
        meta: {
          title: '分享链接-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('personalCenter/shareLink')
      }, {
        path: '/personalCenter/adminEditor',
        name: 'adminEditor',
        meta: {
          title: '编辑管理员-互联网医院开放平台'
        },
        component: lazyload('personalCenter/adminEditor')
      }, {
        path: '/personalCenter/confirmInviteMsg/:invitationCode',
        name: 'confirmInviteMsg',
        meta: {
          title: '验证邀请信息-互联网医院开放平台'
        },
        component: lazyload('personalCenter/confirmInviteMsg')
      }, {
        path: '/personalCenter/wechatAuthor',
        name: 'wechatAuthor',
        meta: {
          title: '微信用户授权-互联网医院开放平台'
        },
        component: lazyload('personalCenter/wechatAuthor')
      }, {
        path: '/personalCenter/wechatResult',
        name: 'wechatResult',
        meta: {
          title: '微信用户授权结果-互联网医院开放平台'
        },
        component: lazyload('personalCenter/wechatResult')
      }, {
        path: '/serviceCenter/serCenIndex',
        name: 'serCenIndex',
        meta: {
          title: '应用中心-互联网医院开放平台'
        },
        component: lazyload('serviceCenter/serCenIndex')
      }, {
        path: '/serviceCenter/appDetail/:type',
        name: 'appDetail',
        meta: {
          title: '应用详情-互联网医院开放平台'
        },
        component: lazyload('serviceCenter/appDetail')
      }, 
      {
        path: '/serviceCenter/authorizedLogin',
        name: 'authorizedLogin',
        meta: {
          title: '授权登入-互联网医院开放平台'
        },
        component: lazyload('serviceCenter/authorizedLogin')
      },
      {
        path: '/serviceCenter/searchResult',
        name: 'searchResult',
        meta: {
          title: '应用搜索结果-互联网医院开放平台'
        },
        component: lazyload('serviceCenter/searchResult')
      },
      {
        path: '/corporateCom/corporateCom',
        name: 'corporateCom',
        meta: {
          title: '互联网医院开放平台-合作案例'
        },
        component: lazyload('corporateCom/corporateCom'),
      }, {
        path: '/corporateCom/corporateComDetail',
        name: 'corporateComDetail',
        meta: {
          title: '互联网医院开放平台-合作案例详情'
        },
        component: lazyload('corporateCom/corporateComDetail'),
      },
      {
        path: '/productExperence/productExperence',
        name: 'productExperence',
        meta: {
          title: '互联网医院开放平台-产品体验'
        },
        component: lazyload('productExperence/productExperence'),
      }, 
      {
        path: '/aboutUs/aboutUs',
        name: 'aboutUs',
        meta: {
          title: '互联网医院开放平台-联系我们'
        },
        component: lazyload('aboutUs/aboutUs'),
      },  {
        path: '/publicServiceNum/serviceAuthorization',
        name: 'serviceAuthorization',
        meta: {
          title: '服务号授权-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('publicServiceNum/serviceAuthorization')
      }, {
        path: '/publicServiceNum/serviceResult',
        name: 'serviceResult',
        meta: {
          title: '授权结果-互联网医院开放平台',
          requiresAuth: true
        },
        component: lazyload('publicServiceNum/serviceResult')
      }, {
        path: '/publicServiceNum/menu',
        name: 'menu',
        meta: {
          title: '菜单测试-互联网医院开放平台'
        },
        component: lazyload('publicServiceNum/menu')
      },
      {
        path: '/devTips/:num',
        name: 'devTips',
        meta: {
          title: '火速开发中-互联网医院开放平台'
        },
        component: lazyload('devTips')
      },
      {
        path: '/help/help',
        name: 'help',
        meta: {
          title: '帮助指引-互联网医院开放平台'
        },
        component: lazyload('help/help')
      },
      {
        path: '/help/searchHelpList',
        name: 'searchHelpList',
        meta: {
          title: '问题列表-互联网医院开放平台'
        },
        component: lazyload('help/searchHelpList')
      },
      {
        path: '/publicServiceNum/paySetting/PaymentSettings',
        name: 'PaymentSettings',
        meta: {
          title: '支付商户配置'
        },
        component: lazyload('publicServiceNum/paySetting/PaymentSettings')
      },
      {
        path: '/publicServiceNum/paySetting/paymentAccountList',
        name: 'paymentAccountList',
        meta: {
          title: '支付商户信息'
        },
        component: lazyload('publicServiceNum/paySetting/paymentAccountList')
      },
      {
        path: '/publicServiceNum/messageService/messageService',
        name: 'messageService',
        meta: {
          title: '短信服务'
        },
        component: lazyload('publicServiceNum/messageService/messageService')
      },
      {
        path: '/publicServiceNum/messageService/messageRenew',
        name: 'messageRenew',
        meta: {
          title: '短信续费'
        },
        component: lazyload('publicServiceNum/messageService/messageRenew')
      },
      {
        path: '/publicServiceNum/messageService/renewRecord',
        name: 'renewRecord',
        meta: {
          title: '缴费记录'
        },
        component: lazyload('publicServiceNum/messageService/renewRecord')
      },
      {
        path: '/publicServiceNum/messageService/messageSignature',
        name: 'messageSignature',
        meta: {
          title: '短信签名'
        },
        component: lazyload('publicServiceNum/messageService/messageSignature')
      },
      {
        path: '/publicServiceNum/messageService/messageRecord',
        name: 'messageRecord',
        meta: {
          title: '短信记录'
        },
        component: lazyload('publicServiceNum/messageService/messageRecord')
      },
      {
        path: '/publicServiceNum/materialsManage',
        name: 'materialsManage',
        meta: {
          title: '素材管理'
        },
        component: lazyload('publicServiceNum/materialsManage/materialsManage')
      },
      {
        path: '/docAccountManage/docAccountManage',
        name: 'docAccountManage',
        meta: {
          title: '医生账号管理'
        },
        component: lazyload('docAccountManage/docAccountManage'),
        children: [{
            path: '/docAccountManage/deptMumbers',
            name: 'deptMumbers',
            meta: {
              title: '医生账号管理'
            },
            component: lazyload('docAccountManage/deptMumbers')
          },
          {
            path: '/docAccountManage/addDeptMumbers',
            name: 'addDeptMumbers',
            meta: {
              title: '新增/编辑成员'
            },
            component: lazyload('docAccountManage/addDeptMumbers')
          },
          {
            path: '/docAccountManage/mumbersInfo',
            name: 'mumbersInfo',
            meta: {
              title: '成员信息'
            },
            component: lazyload('docAccountManage/mumbersInfo')
          },

        ]
      }, {
        path: '/publicServiceNum/paySetting/addUser',
        name: 'addUser',
        meta: {
          title: '新增商户信息'
        },
        component: lazyload('publicServiceNum/paySetting/addUser')
      },
      {
        path: '/publicServiceNum/paySetting/checkAudit',
        name: 'checkAudit',
        meta: {
          title: '提交审核'
        },
        component: lazyload('publicServiceNum/paySetting/checkAudit')
      },
      {
        path: '/publicServiceNum/paySetting/viewInformation',
        name: 'viewInformation',
        meta: {
          title: '提交审核'
        },
        component: lazyload('publicServiceNum/paySetting/viewInformation')
      },
      {
        path: '/publicServiceNum/paySetting/checkState',
        name: 'checkState',
        meta: {
          title: '查看审核状态'
        },
        component: lazyload('publicServiceNum/paySetting/checkState')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录-互联网医院开放平台'
    },
    component: lazyload('login')
  },
  {
    path: '/setCountLoading',
    name: 'setCountLoading',
    meta: {
      title: 'loading'
    },
    component: lazyload('otherPage/setCountLoading')
  }
]

export {
  routes
}
import {aixospatch, aixosput, axiosget, axiospost} from "./config";

const userpost = (_url, data) => axiospost(`user${_url}`, data);
const userput = (_url, data) => aixosput(`user${_url}`, data);
const userpatch = (_url, data) => aixospatch(`user${_url}`, data);
const userget = _url => axiosget(`user${_url}`);

/**
 * 用户登陆
 * @param data
 */
export const authSignInApi = (data) => userpost('/release/sign_in', data);

/**
 * 判断该用户是否注册
 * @param phone
 */
export const authIsRegistApi = phone => userget(`/release/is_regist?phone=${phone}`);


/**
 * 用户注册
 * @param data
 */
export const authSignUpApi = data => userpost('/release/sign_up', data);


/**
 *  获取图形验证码
 * @param phone
 * @param purpose 开放平台用户获取图形验证码 目的，5=重置密码，9=注册，6=验证码登录，7更换绑定手机号，99其他
 */
export const pictureCodeAPi = (phone, purpose) => userget(`/msg/picture_code?phone=${phone}&purpose=${purpose}`);


/**
 *  获取短信验证码
 * 必要参数：手机号码：phone; 图形验证码：picture_code; 目的：purpose (5=重置密码，9=注册，6=验证码登录，7更换绑定手机号，99其他)
 * @param data
 */
export const sendMsgCodeApi = data => userpost(`/msg/send`, data);

/**
 * 获取邀请码
 * @param data
 */
export const invitationCodeApi = data => userpost(`/ptm/invitation_code`, data);

/**
 * 添加管理员微信授权用户跟机构绑定
 * @param data
 */
export const invitationRegistBindApi = data => userpost(`/release/invitation_regist_bind`, data);
/**
 * 获取当前用户下所有机构
 */
export const orginzationListApi = () => userpost('/plat/orgnization_list');

/**
 * 选择机构
 * @param {*} data 
 */
export const chooseOrgApi= data=> userpost(`/plat/select_org`,data)

/**
 * 微信扫码绑定
 * @param {*} data 
 */
export const wechatBindAPi = data=> userpost(`/release/wechat_bind`,data)

/**
 * 忘记密码
 * @param {*} data 
 */
export const forgetPassAPi = data=> userpost(`/release/password_reset`,data)

/**
 * 检验短信验证码
 */
export const checkMsgCodeApi = data => userpost('/msg/check', data)

/**
 * 获取网关用户信息
 */

export const getUserGatewayApi =() => userget('/ptm/user_gateway');

/**
 * 获取网关机构信息
 */
export const getOrgGatewayApi = () => userget('/plat/org_gateway');

/**
 * 修改密码
 * @param {*} data 
 */
export const modifyPasswordApi = data=> userpost('/ptm/password_update', data)

/**
 * 修改登陆手机号
 * @param {*} data 
 */
export const modifyPhoneApi = data=> userpost('/ptm/phone_update',data)

/**
 * 退出账号
 * @param {*} data 
 */
export const signOutApi = data=> userpost('/ptm/sign_out', data)

/**
 * 获取当前机构下管理员
 * @param {*} data 
 */
export const currentOrgUsersApi = (orgId, pageNo, pageSize) => userget(`/plat/org_users?org_id=${orgId}&page_no=${pageNo}&page_size=${pageSize}`)

/**
 * 删除当前机构下管理员
 * @param {*} data 
 */
export const deleteAdminApi = data=> userpost('/plat/organization_unbind', data)

/**
 * 微信扫码登录:必要参数：微信授权code : code;
 * @param {*} data 
 */
export const wechatLoginApi = (data) => userpost('/release/wechat_login', data)

/**
 * 获取当前年份、日期
 * @param {*} data 
 */
export const currentDateApi = () => userget('/base/current_date')

/**
 * 微信解绑
 * @param {*} data 
 */
export const wechatUnBindApi = data => userpost('/ptm/wechat_unbind', data)

/**
 * 验证被邀请人输入信息与邀请信息是否一致
 * 必要参数：手机号码：phone  姓名：real_name
 * @param {*} data 
 */
export const validateUserApi = data => userpost('/ptm/validate_user', data)

/**
 * 判断是否绑定微信账户
 * @param {*} data 
 */
export const WechatBindStatusApi = data => userpost('/ptm/wechat_isbind', data)

/**
 * 微信账号绑定（扫码登录失败后）
 * @param {*} data 
 */
export const wechatAccountBindApi = data => userpost('/release/wechat_binding', data);

/**
 * 根据userId获取用户详细信息（本地数据库缓存数据）
 * @param {*} userId 
 */
export const getUserByUserIdApi = (userId) => userget(`/ptm/user_by_userid?user_id=${userId}`)

/**
 * 邀请管理员时判断该用户是否绑定该机构
 * @param {*} data 
 */
export const validateUserOrgBindingApi = data => userpost('/plat/org_isbind', data)

/**
 * 根据邀请码获取邀请信息
 * @param {*} data 
 */
export const getInvitationInfoByCodeApi = data => userget(`/release/invitation_info?invitation_code=${data}`)

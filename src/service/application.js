import { aixospatch, aixosput, axiosget, axiospost } from "./config";

const applicationpost = (_url, data) => axiospost(`application${_url}`, data);
const applicationput = (_url, data) => aixosput(`application${_url}`, data);
const applicationpatch = (_url, data) => aixospatch(`application${_url}`, data);
const applicationget = _url => axiosget(`application${_url}`);


export const fet = (data) => applicationpost('', data);

/**
* 上传图片
*/
export const uploadImgApi = (data) => applicationpost(`/plat/auth/images/upload`, data);

/**
 * 机构绑定公众号信息  bindWechatInfo
 */
export const bindWechatInfoApi = auth_code => applicationget(`/plat/wechat/bind?auth_code=${auth_code}`);

/**
 *获取机构/医院的类别
 */
export const getHosptialCategoryApi = () => applicationget(`/plat/common/getProjectCategory`);

/**
 *获取省份
 */
export const getProvincesApi = () => applicationget(`/plat/provinces`);


/**
 *获取市
 */
export const getCitysApi = (province_code) => applicationget(`/plat/${province_code}/citys`);


/**
 *获取区
 */
export const getAreasApi = (city_code) => applicationget(`/plat/${city_code}/areas`);

/**
 *上传图片
 */
export const uploadPictureApi = (data) => applicationpost(`/plat/auth/images/upload`, data);

/**
 *提交机构
 */

export const submitPlatformHospitalApi = (data) => applicationpost(`/plat/addPlatformHospital`, data);

/**
 *用户与机构绑定
 */

export const userBindPlatformHospitalApi = (data) => applicationpost(`/plat/user/organization_bind`, data)

/**
 *根据网关phid来获取医院信息
 */

export const getPlatformHospitalByGatewayInfoApi = () => applicationget(`/plat/getPlatformHospitalByGatewayInfo?t=${ new Date().getTime() }`)

/** 可选服务列表
 * @param {*platformHospitalId} data 
 */
export const serviceHrefOptionsApi = (data) => applicationget(`/foreign/applianceList?platformHospitalId=${data.platformHospitalId}`)


/** 可选服务列表
 * @param {*platformHospitalId} data 
 */
export const serviceHrefOptionsWxApi = (data) => applicationget(`/foreign/wx-applianceList?platformHospitalId=${data.platformHospitalId}`)


/** 用户修改机构认证信息
 * @param 
 */
export const userPatchPlatformHospitalApi = (data) => applicationpatch('/plat/userPatchPlatformHospital', data)

//获取应用详情
export const getAppDetail = (id) => applicationget(`/release/appBaseInfo?applicationId=${id}`)


/** 
 * 2-1应用服务首页-获取应用列表
 */
export const getBusinessTypesApi = () => applicationget(`/release/getBusinessTypes`);

/** 
 * 2-1应用服务首页-获取应用服务列表
 */
export const getApplicationServiceByBusinessTypeIdApi = (businessTypeId) => applicationget(`/release/getApplicationServiceByBusinessTypeId?businessTypeId=${businessTypeId}`);

export const getOpenedApplicationApi = (platformHospitalId) => applicationget(`/foreign/open-applianceList?platformHospitalId=${platformHospitalId}`)

export const appOpenUpApi= (data) => applicationpost(`/foreign/appOpenUp`,data);


/** 
 * 8-3 8-4 帮助指引列表和详情
 * 获取所有一级目录
 */
export const getHelpCenterParentMenuApi = () => applicationget(`/helpCenter/web/getHelpCenterParentMenu?date=${new Date().getTime()}`);

/** 
 *  8-3 8-4 帮助指引列表和详情
 * 根据一级目录id获取子目录
 */
export const getHelpCenterMenuByParentMenuIdApi = (parentMenuId) => applicationget(`/helpCenter/web/getHelpCenterMenuByParentMenuId?parentMenuId=${parentMenuId}?date=${new Date().getTime()}`);

/** 
 *  8-3 8-4 帮助指引列表和详情
 *根据子目录id查帮助信息
 */
export const getHelpCenterInfoByMenuIdApi = (menuId) => applicationget(`/helpCenter/web/getHelpCenterInfoByMenuId?menuId=${menuId}&date=${new Date().getTime()}`);

/** 
 *  8-3 8-4 帮助指引列表和详情
 *根据标题和文章内容来搜索帮助信息
 */
export const searchHelpCenterInfoByTitleOrContentApi = (searchInfo) => applicationget(`/helpCenter/web/searchHelpCenterInfoByTitleOrContent?searchInfo=${searchInfo}&date=${new Date().getTime()}`)

/** 
*  8-3 8-4 帮助指引列表和详情
*根据帮助信息id查帮助信息详细
*/

export const getHelpCenterInfoByIdApi = (helpCenterInfoId) => applicationget(`/helpCenter/web/getHelpCenterInfoById?helpCenterInfoId=${helpCenterInfoId}&date=${new Date().getTime()}`)

/**
 *上传文件
 */
export const uploadFileApi = (data) => applicationpost(`/plat/auth/files/upload`, data);

export const statisticalDataApi = (platformHospitalId) => applicationget(`/foreign/applicationNum?platformHospitalId=${platformHospitalId}?date=${new Date().getTime()}`)

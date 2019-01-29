import {aixospatch, aixosput, axiosget, axiospost, axiospost_params,axiosget_params} from "./config";
import qs from 'qs'
import wechat from "../store/modules/wechat";

const wechatpost = (_url, data) => axiospost(`wechat${_url}`, data);
const wechatpost_params = (_url, data, params) => axiospost_params(`wechat${_url}`, data, params);
const wechatput = (_url, data) => aixosput(`wechat${_url}`, data);
const wechatpatch = (_url, data) => aixospatch(`wechat${_url}`, data);
const wechatget = _url => axiosget(`wechat${_url}`);
const wechatget_params = (_url,data) => axiosget_params(`wechat${_url}`,data);

/**
 * 获取开放平台授权页面地址
 * @param authCallbackUrl
 */
export const wxAuthApi = authCallbackUrl => wechatget( `/weixin/wxAuth?authCallbackUrl=${authCallbackUrl}`);

/**
 * 获取authorizer_access_token
 */
export const wxAuthTokenApi = auth_code => wechatget( `/weixin/wxAuthToken?auth_code=${auth_code}`);

/**
 * 获取微信菜单配置
 */
export const menuConfigApi = () => wechatget( `/menu/config`);

/**
 * 获取图文消息发送的key
 */
export const getMenuKeyApi = () => wechatget( `/menu/getKey`);

/**
 * 配置菜单
 * @param {*menuJson} data 
 */
export const configWxMenuApi = data => wechatpost_params(`/menu/create`,data.menuJson,
  {params:{ 
    menutype: data.menutype,
    platformHospitalId:data.platformHospitalId
  }
})

/**
 * 获取公众号信息
 */
export const wechatInfoApi = () => wechatget(`/wxAuthorizerInfo`)

export const wechatMenuHistoryApi = data => wechatget_params(`/menu/history/list`,data)

/**
 * 数据视图
 */
export const getWxUserStaticDataApi = params => wechatget(`/wxUserStaticData?type=${params.type}&beginTime=${params.beginTime}&endTime=${params.endTime}`);

/**
 * 素材管理
 */
export const getMaterials = params => wechatget(`/material/getmaterials?type=${ params.type }&pageNo=${ params.pageNo }&pageSize=${ params.pageSize }`);
export const syncMaterials = params => wechatget(`/material/sync?type=${ params.type }`);
export const searchMaterials = params => wechatget(`/material/search?searchText=${ params.searchText }&pageNo=${ params.pageNo }&pageSize=${ params.pageSize }`);
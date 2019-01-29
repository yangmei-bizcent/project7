import {
  aixospatch,
  aixosput,
  axiosget,
  axiospost,
  axiosdel
} from "./config";

const menupost = (_url, data) => axiospost(`dynamic${_url}`, data);
const menuput = (_url, data) => aixosput(`dynamic${_url}`, data);
const menupatch = (_url, data) => aixospatch(`dynamic${_url}`, data);
const menuget = _url => axiosget(`dynamic${_url}`);
const menudel = (_url, data) => axiosdel(`dynamic${_url}`, data);

export const editDynamicFuncApi = data => menuput(`/auth/dynamic/func/edit`, data);

export const groupstylesApi = (groupStyleType, styleId) => menuget(`/auth/dynamic/func/groupstyle?groupStyleType=${groupStyleType}&styleId=${styleId}`);

export const dynamicFuncListApi = (phId, styleType) => menuget(`/auth/dynamicfunc?platformHospitalId=${phId}&dynamicfunctype=${styleType}&date=${new Date().getTime()}`);

export const addDynamicAPi = data => menuput(`/auth/dynamicfunc`, data);

export const delDynamicAPi = (dynamicId, groupId) => menudel(`/auth/dynamicfunc/delete/group/${dynamicId}/${groupId}`);

export const delDynamicDetailAPi = (dynamicId, groupId, detailId) => menudel(`/auth/dynamicfunc/delete/detail/${dynamicId}/${groupId}/${detailId}`);

export const saveReleaseDynamicFuncAPi = data => menupost(`/auth/dynamic/func/release`, data);

export const resetApi = dynamicFuncId => menuget(`/auth/dynamic/func/reset?dynamicFuncId=${dynamicFuncId}`);

export const releaseHistoryApi = (dynamicFuncId, lastestCount) => menuget(`/auth/dynamic/func/releasehistory?dynamicFuncId=${dynamicFuncId}&lastestCount=${lastestCount}`);

export const resetReleaseHistoryApi = (platformHospitalId, dynamicFuncReleaseHistoryHeadId, dynamicFuncType) => menuput(`/auth/dynamic/func/reset_release_history?platformHospitalId=${platformHospitalId}&dynamicFuncReleaseHistoryHeadId=${dynamicFuncReleaseHistoryHeadId}&dynamicFuncType=${dynamicFuncType}`);

export const sortDynamicApi = (dynamicFuncId, sort) => menuput(`/auth/dynamicfunc/sort/${dynamicFuncId}`, sort);

// export const applianceListAPi = platformHospitalId => menuget(`/applianceList?platformHospitalId=${platformHospitalId}`);

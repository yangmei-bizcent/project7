import { aixospatch, aixosput, axiosget, axiospost } from "./config";

const applicationpost = (_url, data) => axiospost(`config${_url}`, data);
const applicationput = (_url, data) => aixosput(`config${_url}`, data);
const applicationpatch = (_url, data) => aixospatch(`config${_url}`, data);
const applicationget = _url => axiosget(`config${_url}`);


export const fet = (data) => applicationpost('', data);
/**
 *  7-3-9 用户就诊人配置-就诊人规则获取页面配置
 */
export const getPatientVisitRulesApi = (ucUiFlowId, stepId) => applicationget(`/getViewUiconfigList?ucUiFlowId=${ucUiFlowId}&stepId=${stepId}`);

/**
 *  7-3-9 用户就诊人配置-就诊人规则保存页面配置
 */
export const updateUiconfigDetailsApi = (stepId, flowId, platformHospitalId, scyUserId, tUiConfigDetails) => applicationput(`/updateUiconfigDetails?stepId=${stepId}&flowId=${flowId}&platformHospitalId=${platformHospitalId}&scyUserId=${scyUserId}`, tUiConfigDetails);

/**
 *  7-3-9 用户就诊人配置-查询flowId
 */
export const getUcUiFlowByPhIdAndUseTypeApi = (defaultPlatformHospitalId, useType) => applicationget(`/getUcUiFlowByPhIdAndUseType?defaultPlatformHospitalId=${defaultPlatformHospitalId}&useType=${useType}`);

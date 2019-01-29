import axios from "axios"
import {
  setToken,
  errorFn,
  isSignIn,
  baseConfig,
  formConfig,
  projectConfig,
  projectFormConfig,
  dataConfig
} from "./config.js"
import {prodel} from "./oldindex";

const post = (_url, obj) => axios.post(_url, obj, baseConfig).then(isSignIn).catch(errorFn)
const formPost = (_url, obj) => axios.post(_url, obj, formConfig).then(isSignIn).catch(errorFn)
const put = (_url, obj) => axios.put(_url, obj, baseConfig).then(isSignIn).catch(errorFn)
const formPut = (_url, obj) => axios.put(_url, obj, formConfig).then(isSignIn).catch(errorFn)
const get = (_url, obj) => axios(_url, {...baseConfig, params: obj}).then(isSignIn).catch(errorFn)
const del = (_url, obj) => axios.delete(_url, {...baseConfig, params: obj}).then(isSignIn).catch(errorFn)

const proPost = (_url, obj) => axios.post(_url, obj, projectFormConfig).then(isSignIn).catch(errorFn)
const proPut = (_url, obj) => axios.put(_url, obj, projectFormConfig).then(isSignIn).catch(errorFn)
const proGet = (_url, obj) => axios(_url, {...projectConfig, params: obj}).then(isSignIn).catch(errorFn)

const dataPost = (_url, obj) => axios.post(_url, obj, dataConfig).then(isSignIn).catch(errorFn)
const dataGet = (_url, obj) => axios(_url, {...dataConfig, params: obj}).then(isSignIn).catch(errorFn)

axios.interceptors.request.use(setToken)

//登入登出
export const signIn = data => post("sign_in", data)
export const signOut = _ => post("sign_out")
export const changepassword = data => put('auth/users/password', data)

//导航
export const getMenu = _ => get("auth/menus")

//图片相关
export const imgPost = form => formPost("auth/images/upload", form)

// 导入excel
export const importHospitalDept = (data, importType, hospitalId)=> proPost(`/auth/import?importType=${importType}&hospitalId=${hospitalId}`, data)

//城市/医院
export const getCities = change => get(`auth/cities/json?${change}`)
export const getCityProject = (id, change) => get(`auth/project/${id}?${change}`)
export const getCityHospital = (id, change) => get(`auth/hospitals/city/${id}?${change}`)
export const getCitiesData = _ => get("auth/hospitals/city/project/hospital/data")
export const proGetCities = _ => proGet("auth/vcProject/provinces")

//医院应用
export const getHospitalList = data => get("auth/hospitals", data)
export const postHospitalDetail = data => formPost("auth/hospitals", data)
export const getHospitalDetail = id => get(`auth/hospitals/${id}`)
export const putHospitalDetail = (id, data) => formPut(`auth/hospitals/${id}`, data)
export const delHospital = id => del(`auth/hospitals/${id}`)
export const cmsusers = id => post(`auth/cmsusers/hospital/${id}`)
export const addHospitalImg = data => formPost("auth/hospitals/imageurl", data)
export const changeBranchInfo = (id, data) => formPut(`auth/hospitals/putBranch/${id}`, data)
export const changeHospital = data => put("auth/users/hospitals", data)

//应用维护
export const getProjectList = (searchinput, data) => proGet(`auth/vcProject/${searchinput == "" ? "list" : "search"}`, data)
export const getProjectDetail = data => proGet("auth/vcProject/detail", data)
export const getSelectedCity = cityId => get(`auth/cities/${cityId}/province`)
export const postProjectDetail = data => proPost("auth/vcProject/add", data)
export const putProjectDetail = data => proPut("auth/vcProject/update", data)

//管理员
export const getAdminList = data => get("auth/users", data)
export const getAdminInfo = id => get(`auth/users/${id}`)
export const delAdmin = id => del(`auth/users/${id}`)
export const getRoles = data => get("auth/roles", data)
export const resetPassword = id => formPut(`auth/users/${id}/password`)
export const postAdminInfo = data => post("auth/users", data)
export const putAdminInfo = (id, data) => put(`auth/users/${id}`, data)

//角色管理
export const getRoleList = data => get("auth/roles", data)
export const getRoleInfo = id => get(`auth/roles/${id}`)
export const postRole = data => formPost("auth/roles", data)
export const putRole = (id, data) => formPut(`auth/roles/${id}`, data)
export const getPermissions = _ => get("auth/roles/permissions")
export const delRole = id => del(`auth/roles/${id}`)

//错误码管理
export const getErrorCodeList = data => get("auth/errorcodes", data)
export const getErrorCodeInfo = id => get(`auth/errorcodes/${id}`)
export const postErrorCode = data => formPost("auth/errorcodes", data)
export const putErrorCode = (id, data) => formPut(`auth/errorcodes/${id}`, data)
export const delErrorCode = id => del(`auth/errorcodes/${id}`)

//科室医生展示
export const getDeptdoctorInfo = id => get(`auth/hospitals/${id}/hospitalconfig`)
export const postDeptdoctorInfo = data => formPost("auth/hospitals/hospitalconfig", data)

/**  体检中心  */
// 体检类别
export const peTypeList = vcProjectId => get(`auth/vcProject/${vcProjectId}/peType/types`)
export const peTypeUpdate = (vcProjectId, peTypeId, data) => formPut(`auth/vcProject/${vcProjectId}/peType/types/${peTypeId}`, data)
export const peTypeDelete = (vcProjectId, peTypeId) => del(`auth/vcProject/${vcProjectId}/peType/types/${peTypeId}`)
export const peTypeAdd = (vcProjectId, data) => formPost(`auth/vcProject/${vcProjectId}/peType/types`, data)

// 体检套餐
export const peSetList = vcProjectId => get(`auth/vcProject/${vcProjectId}/peSet/sets`)
export const peSetUpdate = (vcProjectId, peSetId, data) => formPut(`auth/vcProject/${vcProjectId}/peSet/sets/${peSetId}`, data)
export const peSetDelete = (vcProjectId, peSetId) => del(`auth/vcProject/${vcProjectId}/peSet/sets/${peSetId}`)
export const peSetAdd = (vcProjectId, data) => formPost(`auth/vcProject/${vcProjectId}/peSet/sets`, data)
export const peSetInfo = (vcProjectId, peSetId) => get(`auth/vcProject/${vcProjectId}/peSet/sets/${peSetId}`)

// 体检套餐上下架
export const setConfigUpdate = (vcProjectId, peSetId, data) => formPut(`auth/vcProject/${vcProjectId}/setConfig/sets/${peSetId}`, data)
export const setPutAway = (vcProjectId, peSetId) => put(`auth/vcProject/${vcProjectId}/setConfig/sets/${peSetId}/putAwayState`)
export const setUnShelve = (vcProjectId, peSetId) => del(`auth/vcProject/${vcProjectId}/setConfig/sets/${peSetId}/putAwayState`)

// 排班
export const peScheduleList = (vcProjectId, startDate, type) => get(`auth/vcProject/${vcProjectId}/peSchedule/schedules`, {
  'startDate': startDate,
  'type': type
})
export const peScheduleAdd = (vcProjectId, data) => formPost(`auth/vcProject/${vcProjectId}/peSchedule/schedules`, data)
export const peScheduleUpdate = (vcProjectId, peScheduleId, data) => formPut(`auth/vcProject/${vcProjectId}/peSchedule/schedules/${peScheduleId}`, data)
export const peScheduleInfo = (vcProjectId, peScheduleId) => get(`auth/vcProject/${vcProjectId}/peSchedule/schedules/${peScheduleId}`)
export const peScheduleCopy = (vcProjectId, copyDate) => put(`auth/vcProject/${vcProjectId}/peSchedule/schedules/copyWeek/${copyDate}`)

// 排班配置
export const peScheduleConfigInfo = vcProjectId => get(`auth/vcProject/${vcProjectId}/peSchedule/schedules/configs`)
export const peScheduleConfigUpdate = (vcProjectId, data) => formPut(`auth/vcProject/${vcProjectId}/peSchedule/schedules/configs`, data)

/**  体检中心  */

//科室
export const getDeptList = (id, data) => get(`auth/hospitals/${id}/factulties`, data)
export const getHospitalAreas = id => get(`auth/hospitals/${id}/hospitalAreas`)
export const getDeptInfo = id => get(`auth/hospitals/factulties/${id}`)
export const getDeptDoctors = (hosid, depid) => get(`auth/hospitals/${hosid}/faculties/${depid}/doctors`)
export const changeDeptInfo = data => formPut("auth/hospitals/faculties", data)
export const delDept = id => del(`auth/hospitals/faculties/${id}`)
export const addDept = (id, data) => post(`auth/hospitals/${id}/factulties`, data)

//医生
export const getDocInfo = id => get(`auth/hospitals/faculties/doctors/${id}`)
export const getHospitalConfig = id => get(`auth/hospitals/${id}/hospitalconfig`)
export const delDoctor = id => del(`auth/hospitals/faculties/doctors/${id}`)
export const changeDoctorInfo = (id, data) => formPut(`auth/hospitals/faculties/doctors/${id}`, data)
export const createDoctor = (hosid, facid, data) => formPost(`auth/hospitals/${hosid}/faculties/${facid}/doctor`, data)

//楼层
export const getBuildFloors = id => get(`auth/builds/${id}/buildfloors`)
export const getFloorImage = id => get(`auth/hospitals/${id}/imageurl`)
export const getFloorList = id => get(`auth/hospitals/${id}/builds`)
export const getEditFloor = id => get(`auth/buildfloors/${id}`)
export const getEditBuild = id => get(`auth/builds/${id}`)
export const getHasFloorNumber = (id, num) => get(`auth/builds/${id}/${num}`)
export const addFloor = (id, data) => post(`auth/builds/${id}/buildfloors`, data)
export const addBuild = (id, data) => post(`auth/hospitals/${id}/builds`, data)
export const delBuild = id => del(`auth/builds/${id}`)
export const delFloor = id => del(`auth/buildfloors/${id}`)
export const delFloorImg = id => del(`auth/imageurls/${id}`)
export const changeFloor = (id, data) => put(`auth/buildfloors/${id}`, data)
export const changeBuild = (id, data) => put(`auth/builds/${id}`, data)
export const changeFloorsImg = data => formPut("auth/buildfloors/imageurl", data)

//api-protect
export const getApiProtect = id => proGet(`auth/ui/${id}/protect`)
export const postApiProtectInfo = data => proPost(`auth/ui/protect`, data)

//数据统计
export const dataget = (url, data) => dataGet(url, data)
export const datapost = (url, data) => dataPost(url, data)

//支付过程
export const getProcess = id => get(`common/api/${id}/payment/process`)

// 查看评价
export const postEvaluationInfo = data => proPost("/auth/ui/patientAppraise/evaluation", data)
export const changeEvaluationInfo = data => proGet(`/auth/ui/patientAppraise/evaluation/change${data}`)


// 支付配置
export const postpaymentaccountList = data => proPost("/auth/hospital/payment/lists", data)
export const postpaymentaccountUpdate = data => proPost("/auth/hospital/payment/update", data)
export const postpaymentaccountenable = data => proPost("/auth/hospital/payment/enable", data)
export const changepaymentaccount = data => proGet(`/auth/hospital/payment/business/enable/change${data}`)


//支付配置
export const getPayaccountList = id => proGet(`/auth/hospital/payment/account/lists/${id}`)
export const getPayaccountInfo = id => proGet(`/auth/hospital/payment/account/detail/${id}`)
export const postPayaccount = data => proPost("/auth/hospital/payment/account/save", data)
export const putPayaccount = data => proPost(`/auth/hospital/payment/account/update`, data)
export const researchPayaccount = data => proGet(`/auth/hospital/payment/account/research${data}`)

//查询business  支付配置
export const postPayBusiness = data => proPost("/auth/hospital/payment/business/save", data)
export const getPayBusinessList = id => proGet(`/auth/hospital/payment/business/lists${id}`)
export const postpaybusinessUpdate = data => proPost("/auth/hospital/payment/business/update", data)
export const postbusinessenable = data => proPost("/auth/hospital/payment/business/enable", data)
export const getPayBusinessDetail = id => proGet(`/auth/hospital/payment/business/detail/${id}`)

// 新版动态首页 API
export const saveDynamicFunc = data => proPut("/auth/dynamicfunc", data)
export const editDynamicFunc = data => proPut("/auth/dynamic/func/edit", data)
export const saveReleaseDynamicFunc = data => proPost("auth/dynamic/func/release", data)
export const getDynamicFuncStyles = id => proGet("/auth/dynamic/func/groupstyles")
export const getDynamicFunc = id => proGet(`/auth/dynamicfunc${id}`)
export const deleteDynamicFuncGroup = (dynamicId, groupId) => prodel(`/auth/dynamicfunc/delete/group/${dynamicId}/${groupId}`)
export const deleteDynamicFuncDetail = (dynamicId, groupId, detailId) => prodel(`/auth/dynamicfunc/delete/detail/${dynamicId}/${groupId}/${detailId}`)
export const sortDynamicFunc = (dynamicId, sort) => proPut(`/auth/dynamicfunc/sort/${dynamicId}`, sort)
export const resetDynamicFunc = (dynamicId) => proGet(`/auth/dynamic/func/reset?dynamicFuncId=${dynamicId}`)

// 换肤功能
export const savePlatformHospitalSkin = (platformHospitalId, data) => proPost(`/auth/hospital/skin/add/${platformHospitalId}`, data) //unauth
export const getPlatformHospitalSkin = platformHospitalId => proGet(`/auth/hospital/skin/get?platformHospitalId=${platformHospitalId}`)

//意见反馈
export const getProblemType = platformHospitalId => proGet(`/auth/feedback/commits/problemType/${platformHospitalId}`)
export const searchFeedback = data => proGet(`/auth/feedback/commits${data}`)
export const changeHandleType = userFeedbackId => proGet(`/auth/feedback/commits/change/${userFeedbackId}`)

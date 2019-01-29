import { aixospatch, aixosput, axiosget, axiospost } from "./config";

const hospitalpost = (_url, data) => axiospost(`hospital${_url}`, data);
const hospitalput = (_url, data) => aixosput(`hospital${_url}`, data);
const hospitalpatch = (_url, data) => aixospatch(`hospital${_url}`, data);
const hospitalget = _url => axiosget(`hospital${_url}`);


export const fet = (data) => hospitalpost('', data);
/**
 * 添加医生信息（成员） 
*/
export const insertDoctorApi = (tsDoctorParam) => hospitalpost(`/member/admin/insertDoctor`, tsDoctorParam);
import { aixospatch, aixosput, axiosget, axiospost } from "./config";

const paymentpost = (_url, data) => axiospost(`payment${_url}`, data);
const paymentput = (_url, data) => aixosput(`payment${_url}`, data);
const paymentpatch = (_url, data) => aixospatch(`payment${_url}`, data);
const paymentget = _url => axiosget(`payment${_url}`);

export const checkPayInfoApi = platformHospitalId => paymentget(`/info/check?platformHospitalId=${platformHospitalId}`);

export const getPayinfoApi = platformHospitalId => paymentget(`/info/detail?platformHospitalId=${platformHospitalId}`)

export const bankInfoApi = bankNumber => paymentget(`/release/bank?bankAccountNumber=${bankNumber}`)

export const getAccountInfoApi = platformHospitalId => paymentget(`/info/detail?platformHospitalId=${platformHospitalId}`)

export const addAccountInfoApi = paymentForm => paymentpost(`/info/add`,paymentForm)

export const editAccountInfoApi = paymentForm => paymentpost(`/info/edit`,paymentForm)

export const getInfoByIdApi = accountId => paymentget(`/info/detailById?accountId=${accountId}`)

export const getAuditInfoApi = accountId => paymentget(`/info/auditInfo?accountId=${accountId}`)

export const downloadApi = data => paymentpost(`/release/download`,data)
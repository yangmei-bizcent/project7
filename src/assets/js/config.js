import qs from 'qs'
import router from '@/router/'
import { Message } from 'element-ui'
import { url, otherurl, dataurl } from './url'
// import { postProperty } from '@/util'

const [ERROR_MSG, ERROR_MSG_401] = ['服务器内部错误，有人要扣奖金了 ^_^', '登录超时，请重新登录']
//const qsString = obj => qs.stringify(postProperty(obj))
export const setToken = config => {
  if (!!JSON.parse(sessionStorage.getItem('userinfo'))) {
    config.headers.Authorization = JSON.parse(sessionStorage.getItem('userinfo')).token
  }
  return config
}
export const errorFn = err => {
  if (status == 500) {
    Message.error(ERROR_MSG)
    router.push('/')
  }
  if (status == 401) {
    Message.error(ERROR_MSG_401)
    router.push('/')
  }
}

export const isSignIn = d => {
  if (d.data.code == 401) {
    Message.error(d.data.msg)
    router.push('/')
  }
  return d
}

export const baseConfig = {
  baseURL: url,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  transformRequest: [
    data => qsString(data)
  ],
  paramsSerializer: params => qsString(params),
  // timeout: 10000
}

export const formConfig = {
  baseURL: url,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  // timeout: 10000
}

export const dataConfig = {
  baseURL: `${dataurl}api`,
  headers: {
    "Content-Type": "application/json"
  },
  // timeout: 10000
}

export const projectConfig = {
  baseURL: url.split('ptm/')[0],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  transformRequest: [
    data => qsString(data)
  ],
  paramsSerializer: params => qsString(params),
  // timeout: 10000
}

export const projectFormConfig = {
  baseURL: url.split('ptm/')[0],
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  // timeout: 10000
}
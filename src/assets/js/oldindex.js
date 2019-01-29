import axios from 'axios'
import router from '@/router/'
import qs from 'qs'
import { otherurl, dataurl, url } from './url'
// import { postProperty } from '@/assets/js/util'

import { Message } from 'element-ui'
const errorMsg = '服务器内部错误，有人要扣奖金了 ^_^'
const errorMsg401 = '登录超时，请重新登录'

axios.interceptors.request.use(config => {
  if (!!JSON.parse(sessionStorage.getItem('userinfo'))) {
    config.headers = Object.assign(config.headers, {
      "Authorization": JSON.parse(sessionStorage.getItem('userinfo')).token
    })
  }
  return config
})

const errorFn = err => {
  ////console.log(err.response.status)
  let status = err.response.status
  if (status == 500) {
    Message.error(errorMsg)
    router.push('/')
  }
  if (status == 401) {
    Message.error(errorMsg401)
    router.push('/')
  }
}

const codeerror = d => {
  if (d.data.code == 401) {
    Message.error(d.data.msg)
    router.push('/')
  }
  return d
}

const qsString = obj => {
  return qs.stringify(postProperty(obj))
}

const formpost = (url, obj, body) => axios.post(url, qsString(obj)).then(codeerror).catch(errorFn)

const post = (_url, obj, body) => axios.post(url + _url, body ? postProperty(obj) : qsString(obj), {
  headers: {
    'Content-Type': body ? (body == true ? 'application/json' : body.headers) : 'application/x-www-form-urlencoded'
  }
}).then(codeerror).catch(errorFn)

const put = (_url, obj, body) => axios.put(url + _url, body ? postProperty(obj) : qsString(obj), {
  headers: {
    'Content-Type': body ? (body == true ? 'application/json' : body.headers) : 'application/x-www-form-urlencoded'
  }
}).then(codeerror).catch(errorFn)

const get = (_url, obj) => axios.get(url + _url, {
  params: postProperty(obj)
}).then(codeerror).catch(errorFn)

const del = (_url, obj) => axios.delete(url + _url, {
  params: postProperty(obj)
}).then(codeerror).catch(errorFn)

const imgpost = (_url, obj) => axios({
  method: 'post',
  url: url + _url,
  data: obj,
  headers: {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": undefined
  },
  processData: false,
  contentType: false
}).then(codeerror).catch(errorFn)

const datapost = (_url, data) => axios.post(`${dataurl}api` + _url, data).then(codeerror).catch(errorFn)

const dataget = (_url, data) => axios.get(`${dataurl}api` + _url, { params: data }).then(codeerror).catch(errorFn)

const prourl = url.split('ptm/')[0]//'http://192.168.0.12:9999/'

const propost = (_url, obj, body) => axios.post(prourl + _url, body ? postProperty(obj) : qsString(obj), {
  headers: {
    'Content-Type': body ? (body == true ? 'application/json' : body.headers) : 'application/x-www-form-urlencoded'
  }
}).then(codeerror).catch(errorFn)

const proput = (_url, obj, body) => axios.put(prourl + _url, body ? postProperty(obj) : qsString(obj), {
  headers: {
    'Content-Type': body ? (body == true ? 'application/json' : body.headers) : 'application/x-www-form-urlencoded'
  }
}).then(codeerror).catch(errorFn)

const proget = (_url, obj) => axios.get(prourl + _url, {
  params: postProperty(obj)
}).then(codeerror).catch(errorFn)

const prodel = (_url, obj) => axios.delete(prourl + _url, {
  params: postProperty(obj)
}).then(codeerror).catch(errorFn)

const urljump = (_url) => {
  let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
  window.open(`${otherurl}${_url}Authorization=${userinfo.token}&phid=${userinfo.platHospitalId}`)
}

const iframejump = (_url) => {
  let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
  return `${document.location.origin}/static/rubik${_url}Authorization=${userinfo.token}&phid=${userinfo.platHospitalId}`
}

export {
  post,
  put,
  get,
  del,
  imgpost,
  formpost,
  proget,
  propost,
  proput,
  prodel,
  dataget,
  datapost,
  urljump,
  iframejump
}

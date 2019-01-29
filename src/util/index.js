const lazyload = (name) => (resolve) => require([`@/views/${name}`], resolve)

const changeTitle = (title) => {
  document.title = title
  document.body.scrollTop = 0
}
// const generaMenu = (routers, data) => {
//   data.forEach((item) => {
//     let menu = {
//       path: '/'+item['@id'].substring(2),
//       name: item['@id'].substring(2),
//       meta: {
//           title: item['@id'].substring(2)
//       },
//       component: lazyload(item['@view'].substring(8))
//     }
//     routers.push(menu)
//   })
// }

const dateFormat = (date,format) =>{
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
export {
  lazyload,
  changeTitle,
  dateFormat
  // generaMenu
}
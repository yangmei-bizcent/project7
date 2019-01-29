import router from '@/router/'
import { Message } from 'element-ui'

// 处理接口返回信息
export const printResult = (d, successurl) => {
  ////console.log(d);
  if (d.data.code == 200) {
    Message({
      message: d.data.msg,
      type: "success"
    });
    if (successurl != undefined) {
      router.push(successurl);
    }
  } else {
    Message.error(d.data.msg);
  }
}

// 时间选择器快捷选项配置
export const pickerOptions2 = () => {
  return {
    shortcuts: [{
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]
  }
}

// 时间格式
export const timePatten = (timeStr, formatPattern) => {
  if (timeStr != null
    && timeStr != undefined
    && timeStr != '') {
    let f = new Date(timeStr);
    if (formatPattern == undefined) {
      formatPattern = 'yyyyMMdd'
    }
    return f.format(formatPattern)
  } else {
    return '';
  }
}

export const timeToStr = (time, formatPattern) => {
  let f = new Date(time);
  if (formatPattern == undefined) {
    formatPattern = 'yyyyMMdd'
  }
  return f.format(formatPattern)
}

Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
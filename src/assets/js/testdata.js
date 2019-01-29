const levels = [{
  label: '三级甲等',
  value: '三级甲等'
}, {
  label: '三级乙等',
  value: '三级乙等'
}, {
  label: '三级丙等',
  value: '三级丙等'
}, {
  label: '二级甲等',
  value: '二级甲等'
}, {
  label: '二级乙等',
  value: '二级乙等'
}, {
  label: '二级丙等',
  value: '二级丙等'
}, {
  label: '一级甲等',
  value: '一级甲等'
}, {
  label: '一级乙等',
  value: '一级乙等'
}, {
  label: '一级丙等',
  value: '一级丙等'
}]
const apptypes = [{
  value: 1,
  name: 'android大众版'
}, {
  value: 2,
  name: 'android医护版'
}, {
  value: 3,
  name: 'ios大众版'
}, {
  value: 4,
  name: 'ios医护版'
}, {
  value: 5,
  name: 'iPad大众版'
}, {
  value: 6,
  name: 'iPad医护版'
}, {
  value: 7,
  name: 'win8大众版'
}, {
  value: 8,
  name: 'win8医护版'
}, {
  value: 9,
  name: 'wp大众版'
}, {
  value: 10,
  name: 'wp医护版'
}, {
  value: 11,
  name: '微信大众版'
}, {
  value: 12,
  name: '微信医护版'
}, {
  value: 13,
  name: '支付宝大众版'
}, {
  value: 14,
  name: '支付宝医护版'
}, {
  value: 15,
  name: '官网大众版'
}, {
  value: 16,
  name: '官网医护版'
}, {
  value: 17,
  name: '其他'
}, {
  value: 20,
  name: '丰收互联'
}]

const paymentModeTypeOptions = [
  {
    value: 'alipay',
    label: '支付宝'
  }, {
    value: 'wxpay',
    label: '普通微信'
  }, {
    value: 'medicalwxpay',
    label: '医保微信'
  }, {
    value: 'ccbpay',
    label: '建行支付'
  }, {
    value: 'ccbwxpay',
    label: '建行微信支付'
  }, {
    value: 'ruralpay',
    label: '农商行支付'
  }, {
    value: 'medicalruralpay',
    label: '农商行医保支付'
  }]

const profitOptions = [
  {
    value: '1',
    label: '直接到商户账号'
  }, {
    value: '2',
    label: '进行代收'
  }, {
    value: '3',
    label: '分润'
  }]

const paymentBusinessTypeOptions = [
  {
    value: '1',
    label: '预约费'
  }, {
    value: '2',
    label: '挂号费'
  }, {
    value: '3',
    label: '处方缴费'
  }, {
    value: '4',
    label: '住院预交'
  }, {
    value: '5',
    label: '卡充值'
  }, {
    value: '7',
    label: '门诊缴费'
  }]

const thirdPartyBusinessTypeOptions = [
  {
    value: '1',
    label: '预约费'
  }, {
    value: '2',
    label: '挂号费'
  }, {
    value: '3',
    label: '处方缴费'
  }, {
    value: '4',
    label: '住院预交'
  }, {
    value: '5',
    label: '停车缴费'
  }, {
    value: '6',
    label: '病理'
  }, {
    value: '7',
    label: '就诊卡充值'
  }, {
    value: '8',
    label: '短信费用'
  }, {
    value: '9',
    label: '微信卡卷'
  }]

export const dynamicStyles = [{
  id: 'S1',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/c9bc655f-0d23-4664-a19a-32370f05c8a2',
    text: '互联网医院'
  }]
}, {
  id: 'S2',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/b25826da-38b6-4153-89b7-dd4fb58cbab9',
    text: '预约挂号'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/f6f52f4e-fe6a-4009-adbd-6c917ae3cfb7',
    text: '门诊缴费'
  }],
}, {
  id: 'S3',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/e033d9bb-8a1e-48e3-bcbf-222518d7a994',
    text: '患者管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/b25826da-38b6-4153-89b7-dd4fb58cbab9',
    text: '预约挂号'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/f6f52f4e-fe6a-4009-adbd-6c917ae3cfb7',
    text: '门诊缴费'
  }]
}, {
  id: 'S4',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/1c9abe46-7154-4d6c-aeca-e1b9d9d32e97',
    text: '专家在线'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/000ca2ed-c06a-4606-9602-46059f4e51dc',
    text: '用药助手',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/62ad2294-23df-46e2-bbe5-c9fab1337b2c',
    text: '医云笔记'
  }]
}, {
  id: 'S5',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/55ba3f1c-fdc5-460e-8357-aa26cfd8cbc3',
    text: '互联网医院'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/c4bcae69-2e5f-4c5d-9128-ad25a63c30b8',
    text: '预约挂号',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/45b1b555-0112-4307-a244-844cf9aadaf9',
    text: '门诊缴费'
  }]
}, {
  id: 'S6',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/55ba3f1c-fdc5-460e-8357-aa26cfd8cbc3',
    text: '互联网医院'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/c4bcae69-2e5f-4c5d-9128-ad25a63c30b8',
    text: '预约挂号',
  }]
}, {
  id: 'S7',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/ed23ed9c-5865-4e51-b3d9-52cd178a111e',
    text: '随访管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/369d8584-7b16-4e37-a777-3dfbf51721a8',
    text: '患者教育',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/7909534b-b34e-448b-800b-16015b272aec',
    text: '患者备注'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/4aa568b2-0e2f-4778-b216-c2f1fcf016ff',
    text: '排版管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/f5dab3d5-19c4-4e60-a6ac-3bf1143b7ccb',
    text: '临床知识',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/930a86bf-ecc9-46bc-9bd2-92d98379672e',
    text: '患者邀约'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/af23a245-b178-48e5-90b5-ba0e858af333',
    text: '护士档案'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/4fbea223-1e84-4321-b582-71a25522087a',
    text: '更多'
  }]
}, {
  id: 'S8',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/ed23ed9c-5865-4e51-b3d9-52cd178a111e',
    text: '随访管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/369d8584-7b16-4e37-a777-3dfbf51721a8',
    text: '患者教育',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/7909534b-b34e-448b-800b-16015b272aec',
    text: '患者备注'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/4aa568b2-0e2f-4778-b216-c2f1fcf016ff',
    text: '排版管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/f5dab3d5-19c4-4e60-a6ac-3bf1143b7ccb',
    text: '临床知识',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/930a86bf-ecc9-46bc-9bd2-92d98379672e',
    text: '患者邀约'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/af23a245-b178-48e5-90b5-ba0e858af333',
    text: '护士档案'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/1bacc113-780f-47ed-a87a-03d393500c1c',
    text: '交班管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/4fbea223-1e84-4321-b582-71a25522087a',
    text: '更多'
  }]
}, {
  id: 'S9',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/3b0e6cb1-26ac-460b-bfb4-5da1c7557aa3',
    text: '互联网医院'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/b25826da-38b6-4153-89b7-dd4fb58cbab9',
    text: '预约挂号'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/f6f52f4e-fe6a-4009-adbd-6c917ae3cfb7',
    text: '门诊缴费'
  }]
}, {
  id: 'S10',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/99f09edf-95ba-47e8-96c1-4d783860a612',
    text: '预约挂号'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/35e3df66-67aa-4759-9f43-80f30ac06386',
    text: '门诊缴费'
  }],
}, {
  id: 'S7-2',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/ed23ed9c-5865-4e51-b3d9-52cd178a111e',
    text: '随访管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/369d8584-7b16-4e37-a777-3dfbf51721a8',
    text: '患者教育',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/7909534b-b34e-448b-800b-16015b272aec',
    text: '患者备注'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/4aa568b2-0e2f-4778-b216-c2f1fcf016ff',
    text: '排版管理'
  }],
}, {
  id: 'S8-2',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/ed23ed9c-5865-4e51-b3d9-52cd178a111e',
    text: '随访管理'
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/369d8584-7b16-4e37-a777-3dfbf51721a8',
    text: '患者教育',
  }, {
    url: 'https://rubikx-10001356.image.myqcloud.com/7909534b-b34e-448b-800b-16015b272aec',
    text: '患者备注'
  }],
}, {
  id: 'S11',
  styles: [{
    url: 'https://rubikx-10001356.image.myqcloud.com/c9bc655f-0d23-4664-a19a-32370f05c8a2',
    text: '动态个人中心'
  }]
}]
export {
  levels,
  apptypes,
  paymentModeTypeOptions,
  profitOptions,
  paymentBusinessTypeOptions,
  thirdPartyBusinessTypeOptions,
}

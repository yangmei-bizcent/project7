# open-web

> 互联网医院开放平台web端

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


前端开发调试URL
一、手机端项目：
1、rubiku-vue
1.1挂号
Dev环境：
http://res.zwjk.com/h5-test/open-appointment/dev/#/?xBusinessId=e49f5778-12b5-11e7-aceb-507b9d24b9d1&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_XuOHf4qWBgU8r5mzDYyK0YxGQUdhaMO-RqUFEPE7AMPYBfve-8s3KV6fXjY6YUq2euYvVCeA3LkuJXMukw-IkO_-UelWnUZuaETTP2fGicE&expires_in=7200&refresh_token=16_el0BzfiKXwPtN016vIum1y3hnyklbSBqkl3cbrbxdOiTmDzy3ScpMMRPfxAkSf4nYXMmbTYjUd4GWGzuUhMGhVHnF04AzjwrpRD8iHQF39c
Pre环境:
http://res.zwjk.com/h5-test/open-appointment/pre/#/?xBusinessId=e49f5778-12b5-11e7-aceb-507b9d24b9d1&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_XuOHf4qWBgU8r5mzDYyK0YxGQUdhaMO-RqUFEPE7AMPYBfve-8s3KV6fXjY6YUq2euYvVCeA3LkuJXMukw-IkO_-UelWnUZuaETTP2fGicE&expires_in=7200&refresh_token=16_el0BzfiKXwPtN016vIum1y3hnyklbSBqkl3cbrbxdOiTmDzy3ScpMMRPfxAkSf4nYXMmbTYjUd4GWGzuUhMGhVHnF04AzjwrpRD8iHQF39c
prod环境:
http://res.zwjk.com/h5-test/open-appointment/prod/#/?xBusinessId=e49f5778-12b5-11e7-aceb-507b9d24b9d1&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_XuOHf4qWBgU8r5mzDYyK0YxGQUdhaMO-RqUFEPE7AMPYBfve-8s3KV6fXjY6YUq2euYvVCeA3LkuJXMukw-IkO_-UelWnUZuaETTP2fGicE&expires_in=7200&refresh_token=16_el0BzfiKXwPtN016vIum1y3hnyklbSBqkl3cbrbxdOiTmDzy3ScpMMRPfxAkSf4nYXMmbTYjUd4GWGzuUhMGhVHnF04AzjwrpRD8iHQF39c
1.2就诊记录
dev环境：
http://res.zwjk.com/h5-test/open-appointment/dev/#/6-1-1?xBusinessId=e3e32d16-4644-4847-be65-30c75a19b0b5&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&router=6-1-1&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_eR1TMpw_-V7PxX5rHMDVMgLkMQpdu7T1GnOGaYZUSweajhg9lpedh8LJCVlsWMOrGEywFT5_7hxHRooH8dSuNFmISvUqUyRfbp0DtToaE68&expires_in=7200&refresh_token=16_QTCfiRz7eYAfHMsgPAqHEuZCMKF2FCCc1T_Q3y6BVyebWiGD1ZTpbmfKwttVS-5gDCbhwBGosl2TAYmeCurajkuOgmtoSZXlPPZUAYdMP9A&authAppId=wxe130160f55f1d0da
Pre环境:
http://res.zwjk.com/h5-test/open-appointment/pre/#/6-1-1?xBusinessId=e3e32d16-4644-4847-be65-30c75a19b0b5&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&router=6-1-1&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_eR1TMpw_-V7PxX5rHMDVMgLkMQpdu7T1GnOGaYZUSweajhg9lpedh8LJCVlsWMOrGEywFT5_7hxHRooH8dSuNFmISvUqUyRfbp0DtToaE68&expires_in=7200&refresh_token=16_QTCfiRz7eYAfHMsgPAqHEuZCMKF2FCCc1T_Q3y6BVyebWiGD1ZTpbmfKwttVS-5gDCbhwBGosl2TAYmeCurajkuOgmtoSZXlPPZUAYdMP9A&authAppId=wxe130160f55f1d0da
prod环境:
http://res.zwjk.com/h5-test/open-appointment/prod/#/6-1-1?xBusinessId=e3e32d16-4644-4847-be65-30c75a19b0b5&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&router=6-1-1&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_eR1TMpw_-V7PxX5rHMDVMgLkMQpdu7T1GnOGaYZUSweajhg9lpedh8LJCVlsWMOrGEywFT5_7hxHRooH8dSuNFmISvUqUyRfbp0DtToaE68&expires_in=7200&refresh_token=16_QTCfiRz7eYAfHMsgPAqHEuZCMKF2FCCc1T_Q3y6BVyebWiGD1ZTpbmfKwttVS-5gDCbhwBGosl2TAYmeCurajkuOgmtoSZXlPPZUAYdMP9A&authAppId=wxe130160f55f1d0da
1.3就诊管理
dev环境:
http://res.zwjk.com/h5-test/open-appointment/dev/#/4-1-1?xBusinessId=fcd00a9f-451d-4662-8205-b050ddc994ff&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&router=4-1-1&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_-yGbEwY_r_AmK-uvs4HSJN5ba5Yl5poKGnY4fQcYoRtfr_XpzPwHhuK3cKb74H9rymywyjFAUBHoP4ganwv8qZGsdEW1fQ1Ws2C44txxZY8&expires_in=7200&refresh_token=16_ixdJY4t5q4iALdA4YG2QYV42HTcKcv6j86wJy2Xsn-X-MECJUNtq-JvxE4hkgL_A6_q6fTPq7-vqjdguXtuveoxEnbJwQS0p6S1zYnzkFiU&authAppId=wxe130160f55f1d0da
Pre环境:
http://res.zwjk.com/h5-test/open-appointment/pre/#/4-1-1?xBusinessId=fcd00a9f-451d-4662-8205-b050ddc994ff&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&router=4-1-1&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_-yGbEwY_r_AmK-uvs4HSJN5ba5Yl5poKGnY4fQcYoRtfr_XpzPwHhuK3cKb74H9rymywyjFAUBHoP4ganwv8qZGsdEW1fQ1Ws2C44txxZY8&expires_in=7200&refresh_token=16_ixdJY4t5q4iALdA4YG2QYV42HTcKcv6j86wJy2Xsn-X-MECJUNtq-JvxE4hkgL_A6_q6fTPq7-vqjdguXtuveoxEnbJwQS0p6S1zYnzkFiU&authAppId=wxe130160f55f1d0da
prod环境:
http://res.zwjk.com/h5-test/open-appointment/prod/#/4-1-1?xBusinessId=fcd00a9f-451d-4662-8205-b050ddc994ff&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&router=4-1-1&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_-yGbEwY_r_AmK-uvs4HSJN5ba5Yl5poKGnY4fQcYoRtfr_XpzPwHhuK3cKb74H9rymywyjFAUBHoP4ganwv8qZGsdEW1fQ1Ws2C44txxZY8&expires_in=7200&refresh_token=16_ixdJY4t5q4iALdA4YG2QYV42HTcKcv6j86wJy2Xsn-X-MECJUNtq-JvxE4hkgL_A6_q6fTPq7-vqjdguXtuveoxEnbJwQS0p6S1zYnzkFiU&authAppId=wxe130160f55f1d0da
1.4查询报告单
Dev环境
http://res.zwjk.com/h5-test/open-appointment/dev/#/reportIndex?xBusinessId=d1690d2f-8ecb-44a9-8487-f9db3ef2a0a9&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&authAppId=wxe130160f55f1d0da&router=reportIndex&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_GOyZqcyYsQuhNlqCQpM21eX7qmBxRDts9bWyJWXsHjQJ2sSBXL47uOKrOa36S9bJ-XfKT91ZwWQO3B8wGcmRRbsyYOWg6--_JvCbTNmBbsM&expires_in=7200&refresh_token=16_9Z_IGVjAdxtXkiGY8_AebIclK8e-fqXU1nH5U8IK7tcKHckKpLgtr0FhYeycQ9dmpGUfn_82Qq02JCj3swqUwAzul8cC3qNnsf0c0s_C7FY 
Pre环境
http://res.zwjk.com/h5-test/open-appointment/pre/#/reportIndex?xBusinessId=d1690d2f-8ecb-44a9-8487-f9db3ef2a0a9&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&authAppId=wxe130160f55f1d0da&router=reportIndex&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_GOyZqcyYsQuhNlqCQpM21eX7qmBxRDts9bWyJWXsHjQJ2sSBXL47uOKrOa36S9bJ-XfKT91ZwWQO3B8wGcmRRbsyYOWg6--_JvCbTNmBbsM&expires_in=7200&refresh_token=16_9Z_IGVjAdxtXkiGY8_AebIclK8e-fqXU1nH5U8IK7tcKHckKpLgtr0FhYeycQ9dmpGUfn_82Qq02JCj3swqUwAzul8cC3qNnsf0c0s_C7FY 
prod环境:
http://res.zwjk.com/h5-test/open-appointment/pre/#/reportIndex?xBusinessId=d1690d2f-8ecb-44a9-8487-f9db3ef2a0a9&hospitalId=52cd0571-0d88-4606-abe1-7bcf3969438d&projectid=3ff96e0f-c932-4a85-93ab-d36578d0ea83&authAppId=wxe130160f55f1d0da&authAppId=wxe130160f55f1d0da&router=reportIndex&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_GOyZqcyYsQuhNlqCQpM21eX7qmBxRDts9bWyJWXsHjQJ2sSBXL47uOKrOa36S9bJ-XfKT91ZwWQO3B8wGcmRRbsyYOWg6--_JvCbTNmBbsM&expires_in=7200&refresh_token=16_9Z_IGVjAdxtXkiGY8_AebIclK8e-fqXU1nH5U8IK7tcKHckKpLgtr0FhYeycQ9dmpGUfn_82Qq02JCj3swqUwAzul8cC3qNnsf0c0s_C7FY 




2、open-application-front
2.1医院科室介绍
Dev环境：
http://res.zwjk.com/h5-test/open-application-front/dev/#/hosDocDepIndex?router=hosDocDepIndex&type=1&hospitalId=37f7bdb2-6fcf-40dd-baf8-355868ba8702&state=123&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_n3SYe1KzeZn5xLGAYg9mGOs_46UPIwVv-faFbTOoBQJgP5AUkT6X1SCOlkPHArsj4SvoIsHQH1Ir7Ti6KUNF4wLyCOz6XDyegRdBYu9HbAY&expires_in=7200&refresh_token=16_LV7KuxqHLH1mQH7JpJ0yR9EPV39MtoqsmBEOa2_Ls0-nWzlqfW2R0nTD7BE9tDab2NNSgUYMKBcrGmOhXqeDfkJhQSXZUd34wgKB-Sbhvhs&authAppId=wxe130160f55f1d0da 
Pre环境:
http://res.zwjk.com/h5-test/open-application-front/pre/#/hosDocDepIndex?router=hosDocDepIndex&type=1&hospitalId=37f7bdb2-6fcf-40dd-baf8-355868ba8702&state=123&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_n3SYe1KzeZn5xLGAYg9mGOs_46UPIwVv-faFbTOoBQJgP5AUkT6X1SCOlkPHArsj4SvoIsHQH1Ir7Ti6KUNF4wLyCOz6XDyegRdBYu9HbAY&expires_in=7200&refresh_token=16_LV7KuxqHLH1mQH7JpJ0yR9EPV39MtoqsmBEOa2_Ls0-nWzlqfW2R0nTD7BE9tDab2NNSgUYMKBcrGmOhXqeDfkJhQSXZUd34wgKB-Sbhvhs&authAppId=wxe130160f55f1d0da 
prod环境:
http://res.zwjk.com/h5-test/open-application-front/prod/#/hosDocDepIndex?router=hosDocDepIndex&type=1&hospitalId=37f7bdb2-6fcf-40dd-baf8-355868ba8702&state=123&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_n3SYe1KzeZn5xLGAYg9mGOs_46UPIwVv-faFbTOoBQJgP5AUkT6X1SCOlkPHArsj4SvoIsHQH1Ir7Ti6KUNF4wLyCOz6XDyegRdBYu9HbAY&expires_in=7200&refresh_token=16_LV7KuxqHLH1mQH7JpJ0yR9EPV39MtoqsmBEOa2_Ls0-nWzlqfW2R0nTD7BE9tDab2NNSgUYMKBcrGmOhXqeDfkJhQSXZUd34wgKB-Sbhvhs&authAppId=wxe130160f55f1d0da 
2.2医院介绍
Dev环境：
http://res.zwjk.com/h5-test/open-application-front/dev/#/hospitalIntroduction?router=hospitalIntroduction&type=1&hospitalId=37f7bdb2-6fcf-40dd-baf8-355868ba8702&state=123&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_X86ADkJRiov3IbaH-4MU3tx52y2oMEBnAWCdJQTZGVb67wO250e3lswuP5O0eqRAjZtm8oYWctO-8Ec6jcLfglodBmai38PnSUjIGInCsjg&expires_in=7200&refresh_token=16_kWuSqMk44CY7Okk2dlXfT93H-s4CSdn56YiHS5khOs0-ZjrJ0rbU2EnBRFyQyzzyZTGYqFg4l7xoA6UTNLOKHOciC8bcnXwhmwA6n38wct0&authAppId=wxe130160f55f1d0da 
Pre环境：
http://res.zwjk.com/h5-test/open-application-front/pre/#/hospitalIntroduction?router=hospitalIntroduction&type=1&hospitalId=37f7bdb2-6fcf-40dd-baf8-355868ba8702&state=123&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_X86ADkJRiov3IbaH-4MU3tx52y2oMEBnAWCdJQTZGVb67wO250e3lswuP5O0eqRAjZtm8oYWctO-8Ec6jcLfglodBmai38PnSUjIGInCsjg&expires_in=7200&refresh_token=16_kWuSqMk44CY7Okk2dlXfT93H-s4CSdn56YiHS5khOs0-ZjrJ0rbU2EnBRFyQyzzyZTGYqFg4l7xoA6UTNLOKHOciC8bcnXwhmwA6n38wct0&authAppId=wxe130160f55f1d0da
prod环境：
http://res.zwjk.com/h5-test/open-application-front/prod/#/hospitalIntroduction?router=hospitalIntroduction&type=1&hospitalId=37f7bdb2-6fcf-40dd-baf8-355868ba8702&state=123&openid=okc9E0TCiPno5qNNb_54gofEfwlM&access_token=16_X86ADkJRiov3IbaH-4MU3tx52y2oMEBnAWCdJQTZGVb67wO250e3lswuP5O0eqRAjZtm8oYWctO-8Ec6jcLfglodBmai38PnSUjIGInCsjg&expires_in=7200&refresh_token=16_kWuSqMk44CY7Okk2dlXfT93H-s4CSdn56YiHS5khOs0-ZjrJ0rbU2EnBRFyQyzzyZTGYqFg4l7xoA6UTNLOKHOciC8bcnXwhmwA6n38wct0&authAppId=wxe130160f55f1d0da
2.3意见反馈
Dev环境：
http://res.zwjk.com/h5-test/open-application-front/dev/#/feedbackTypes?type=1&router=feedbackTypes&hospitalId=4e31a84b-ce98-4301-9962-49361055lsd8&xBusinessId=66651331-a1c0-4f6d-bdb9-807961740e5e&applicationId=d2b9d7fe-6132-4a47-b742-9ec9dc5c589b&projectid=9e5e58b3-3123-4710-b5fb-c7b12151dd05&state=4e31a84b-ce98-4301-9962-49361055lsd8&openid=okc9E0fnLbQqTAkbE7UjEe_1zsAU&access_token=16_dMi9XtR518aIyqdCeSlM30EhnSoI3cupeWXWv7xBBbENkyalmT64WCXdBLz3_aX_vB3ZekMQficV09oC8ogFf5vcCZmEHVeovYkz0H39YzY&expires_in=7200&refresh_token=16_fpAHP173xegrM13xVNd7pCG3ZS-3JHAr5KznA7MkNoiAsuFATTgKt5tOZsuA1PXaX8-hGkpl9IivozASqOrm5Q6af8MDfp7D-pVHRRVH5lM&authAppId=wxe130160f55f1d0da
Pre环境：
http://res.zwjk.com/h5-test/open-application-front/pre/#/feedbackTypes?type=1&router=feedbackTypes&hospitalId=4e31a84b-ce98-4301-9962-49361055lsd8&xBusinessId=66651331-a1c0-4f6d-bdb9-807961740e5e&applicationId=d2b9d7fe-6132-4a47-b742-9ec9dc5c589b&projectid=9e5e58b3-3123-4710-b5fb-c7b12151dd05&state=4e31a84b-ce98-4301-9962-49361055lsd8&openid=okc9E0fnLbQqTAkbE7UjEe_1zsAU&access_token=16_dMi9XtR518aIyqdCeSlM30EhnSoI3cupeWXWv7xBBbENkyalmT64WCXdBLz3_aX_vB3ZekMQficV09oC8ogFf5vcCZmEHVeovYkz0H39YzY&expires_in=7200&refresh_token=16_fpAHP173xegrM13xVNd7pCG3ZS-3JHAr5KznA7MkNoiAsuFATTgKt5tOZsuA1PXaX8-hGkpl9IivozASqOrm5Q6af8MDfp7D-pVHRRVH5lM&authAppId=wxe130160f55f1d0da
prod环境：
http://res.zwjk.com/h5-test/open-application-front/prod/#/feedbackTypes?type=1&router=feedbackTypes&hospitalId=4e31a84b-ce98-4301-9962-49361055lsd8&xBusinessId=66651331-a1c0-4f6d-bdb9-807961740e5e&applicationId=d2b9d7fe-6132-4a47-b742-9ec9dc5c589b&projectid=9e5e58b3-3123-4710-b5fb-c7b12151dd05&state=4e31a84b-ce98-4301-9962-49361055lsd8&openid=okc9E0fnLbQqTAkbE7UjEe_1zsAU&access_token=16_dMi9XtR518aIyqdCeSlM30EhnSoI3cupeWXWv7xBBbENkyalmT64WCXdBLz3_aX_vB3ZekMQficV09oC8ogFf5vcCZmEHVeovYkz0H39YzY&expires_in=7200&refresh_token=16_fpAHP173xegrM13xVNd7pCG3ZS-3JHAr5KznA7MkNoiAsuFATTgKt5tOZsuA1PXaX8-hGkpl9IivozASqOrm5Q6af8MDfp7D-pVHRRVH5lM&authAppId=wxe130160f55f1d0da
2.4方位介绍
Dev环境：
http://res.zwjk.com/h5-test/open-application-front/dev/#/hospitalList?type=1&router=hospitalList&hospitalId=4e31a84b-ce98-4301-9962-49361055lsd8&xBusinessId=66651331-a1c0-4f6d-bdb9-807961740e5e&applicationId=d2b9d7fe-6132-4a47-b742-9ec9dc5c589b&projectid=9e5e58b3-3123-4710-b5fb-c7b12151dd05&state=4e31a84b-ce98-4301-9962-49361055lsd8&openid=okc9E0fnLbQqTAkbE7UjEe_1zsAU&access_token=16_dMi9XtR518aIyqdCeSlM30EhnSoI3cupeWXWv7xBBbENkyalmT64WCXdBLz3_aX_vB3ZekMQficV09oC8ogFf5vcCZmEHVeovYkz0H39YzY&expires_in=7200&refresh_token=16_fpAHP173xegrM13xVNd7pCG3ZS-3JHAr5KznA7MkNoiAsuFATTgKt5tOZsuA1PXaX8-hGkpl9IivozASqOrm5Q6af8MDfp7D-pVHRRVH5lM&authAppId=wxe130160f55f1d0da
Pre环境：
http://res.zwjk.com/h5-test/open-application-front/pre/#/hospitalList?type=1&router=hospitalList&hospitalId=4e31a84b-ce98-4301-9962-49361055lsd8&xBusinessId=66651331-a1c0-4f6d-bdb9-807961740e5e&applicationId=d2b9d7fe-6132-4a47-b742-9ec9dc5c589b&projectid=9e5e58b3-3123-4710-b5fb-c7b12151dd05&state=4e31a84b-ce98-4301-9962-49361055lsd8&openid=okc9E0fnLbQqTAkbE7UjEe_1zsAU&access_token=16_dMi9XtR518aIyqdCeSlM30EhnSoI3cupeWXWv7xBBbENkyalmT64WCXdBLz3_aX_vB3ZekMQficV09oC8ogFf5vcCZmEHVeovYkz0H39YzY&expires_in=7200&refresh_token=16_fpAHP173xegrM13xVNd7pCG3ZS-3JHAr5KznA7MkNoiAsuFATTgKt5tOZsuA1PXaX8-hGkpl9IivozASqOrm5Q6af8MDfp7D-pVHRRVH5lM&authAppId=wxe130160f55f1d0da
prod环境：
http://res.zwjk.com/h5-test/open-application-front/prod/#/hospitalList?type=1&router=hospitalList&hospitalId=4e31a84b-ce98-4301-9962-49361055lsd8&xBusinessId=66651331-a1c0-4f6d-bdb9-807961740e5e&applicationId=d2b9d7fe-6132-4a47-b742-9ec9dc5c589b&projectid=9e5e58b3-3123-4710-b5fb-c7b12151dd05&state=4e31a84b-ce98-4301-9962-49361055lsd8&openid=okc9E0fnLbQqTAkbE7UjEe_1zsAU&access_token=16_dMi9XtR518aIyqdCeSlM30EhnSoI3cupeWXWv7xBBbENkyalmT64WCXdBLz3_aX_vB3ZekMQficV09oC8ogFf5vcCZmEHVeovYkz0H39YzY&expires_in=7200&refresh_token=16_fpAHP173xegrM13xVNd7pCG3ZS-3JHAr5KznA7MkNoiAsuFATTgKt5tOZsuA1PXaX8-hGkpl9IivozASqOrm5Q6af8MDfp7D-pVHRRVH5lM&authAppId=wxe130160f55f1d0da




二、PC端项目：
1、open-application
1.1科室医生
Dev环境：
http://res.zwjk.com/h5-test/open-application/dev/#/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
Pre环境：
http://res.zwjk.com/h5-test/open-application/pre/#/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
prod环境：
http://opent.zwjk.com/application/#/doctorDepart?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
1.2报告单查询配置
Dev环境：
http://res.zwjk.com/h5-test/open-application/dev/#/reportSearchConfig?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
Pre环境：
http://res.zwjk.com/h5-test/open-application/pre/#/reportSearchConfig?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
prod环境：
http://res.zwjk.com/h5-test/open-application/prod/#/reportSearchConfig?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
1.3预约挂号
Dev环境：
http://res.zwjk.com/h5-test/open-application/dev/#/serviceSetting?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
Pre环境：
http://res.zwjk.com/h5-test/open-application/pre/#/serviceSetting?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
prod环境：
http://res.zwjk.com/h5-test/open-application/prod/#/serviceSetting?token=${sessionStorage.getItem('token')}&platformHospitalId=${this.chooseOrgInfo.platformHospitalId}&platformHospitalName=${encodeURI(this.chooseOrgInfo.name)}&userName=${encodeURI(this.userName)}&currentDate=${this.currentDateInfo.year}
1.4意见反馈
Dev环境：
http://res.zwjk.com/h5-test/open-application/dev/#/feedbackList?platformHospitalId=${ JSON.parse(localStorage.getItem('chooseOrgInfo')).platformHospitalId }&token=${ sessionStorage.getItem('token') }
Pre环境：
http://res.zwjk.com/h5-test/open-application/pre/#/feedbackList?platformHospitalId=${ JSON.parse(localStorage.getItem('chooseOrgInfo')).platformHospitalId }&token=${ sessionStorage.getItem('token') }
prod环境：
http://res.zwjk.com/h5-test/open-application/prod/#/feedbackList?platformHospitalId=${ JSON.parse(localStorage.getItem('chooseOrgInfo')).platformHospitalId }&token=${ sessionStorage.getItem('token') }
1.5方位介绍
Dev环境：
http://res.zwjk.com/h5-test/open-application/dev/#/positionConfig?platformHospitalId=${ JSON.parse(localStorage.getItem('chooseOrgInfo')).platformHospitalId }&token=${ sessionStorage.getItem('token') }
Pre环境：
http://res.zwjk.com/h5-test/open-application/pre/#/positionConfig?platformHospitalId=${ JSON.parse(localStorage.getItem('chooseOrgInfo')).platformHospitalId }&token=${ sessionStorage.getItem('token') }
prod环境：
http://res.zwjk.com/h5-test/open-application/prod/#/positionConfig?platformHospitalId=${ JSON.parse(localStorage.getItem('chooseOrgInfo')).platformHospitalId }&token=${ sessionStorage.getItem('token') }
<template>
  <div class="authentication">
    <div class="authenTwoContent">
      <el-steps :active="2" simple>
        <el-step title="认证协议" icon="el-icon-document" class="greenArrow"></el-step>
        <el-step title="材料上传" icon="el-icon-uploaded"></el-step>
        <el-step title="提交成功" icon="el-icon-upload-success"></el-step>
        <el-step title="审核结果" icon="el-icon-circle-check-outline"></el-step>
      </el-steps>
      <hr />
      <div class="errorTip" v-if="this.$route.params.type==='edit' &&platformHospitalByGateway.auditStatus!=='40'"
        v-show="platformHospitalByGateway">错误原因：{{platformHospitalByGateway.auditPostil}}</div>
      <el-form :model="authenForm" :rules="rules" ref="authenForm" label-width="430px">
        <div @click="hasMenuChange=true;">
          <el-form-item label="机构简称" prop="abbrName" class="tipSpace">
            <el-input v-model="authenForm.abbrName" placeholder="机构简称" class="width340"></el-input>
          </el-form-item>
          <p class="entryTip">请填写常用机构简称，20位字符以内，限中文、数字或字母</p>
          <el-form-item label="机构名称" prop="name" class="tipSpace">
            <el-input v-model="authenForm.name" placeholder="机构名称" class="width340"></el-input>
            <el-popover placement="bottom-start" popper-class="blackPopover" title="" width="370" trigger="hover"
              content="若没有《组织机构代码证》可以使用三证合一或者五证合一后的《事业单位法人证书》证件，根据此证件填写上传即可。">
              <el-button slot="reference" type="text" class="noOf">什么是组织机构代码证？</el-button>
            </el-popover>
          </el-form-item>
          <p class="entryTip">请根据组织机构代码证填写机构名称，限中文、数字或字母</p>
          <el-form-item label="机构类别" prop="projectCategory">
            <el-select v-model="authenForm.projectCategory" placeholder="请选择">
              <el-option v-for="item in hosptialCategoryList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row class="address">
            <region :provinceCode.sync="authenForm.provinceCode" :cityCode.sync="authenForm.cityCode" :areaCode.sync="authenForm.areaCode" />
          </el-row>
          <el-form-item prop="address" class="tipSpace">
            <el-input v-model="authenForm.address" placeholder="机构地址" class="width340"></el-input>
          </el-form-item>
          <p class="entryTip">请根据组织机构代码证填写地址</p>
          <el-form-item label="组织机构代码" prop="authCode" class="tipSpace">
            <el-input v-model="authenForm.authCode" placeholder="组织机构代码" class="width340"></el-input>
            <a @click="dialogImgVisible = true">范例：组织机构代码.jpg</a>
          </el-form-item>
          <p class="entryTip">请输入9位组织机构代码，如12345678-9；或18位的统一社会信用代码</p>
          <el-form-item label="组织机构代码证明证件" prop="codeUrl" class="uploadImg">
            <el-upload action="" :file-list="p1" :on-exceed="limitFile" :on-remove="handleRemove" list-type="picture"
              :http-request="imgurlRequest" :before-upload="beforeAvatarUpload">
              <el-button size="mini" plain>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                请上传组织机构代码或统一社会信用代码的证明文件，组织机构代码证或三证合一证原件扫描件（复印件需加盖公章）支持上传pdf、png、jpeg，多次上传，保留最新的上传内容(文件大小不超过1M)
              </div>
            </el-upload>
            <a @click="dialogImgVisible = true">范例：组织机构代码.jpg</a>
          </el-form-item>
          <el-form-item label="医疗机构执业许可证登记号" prop="licenceNumber" class="tipSpace">
            <el-input v-model="authenForm.licenceNumber" placeholder="医疗机构执业许可证登记号" class="width340"></el-input>
            <a @click="dialogImgBVisible = true">范例：医疗机构执业许可证.jpg</a>
          </el-form-item>
          <p class="entryTip">请输入22位医疗机构执业许可证登记号，限数字或者字母</p>
          <el-form-item label="医疗机构执业许可证" prop="licenceUrl" class="uploadImg">
            <el-upload action="" :file-list="p2" :on-exceed="limitFile" :on-remove="handleRemove2" list-type="picture"
              :http-request="imgurlRequest2" :before-upload="beforeAvatarUpload">
              <el-button size="mini" plain>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                请上传医疗机构执业许可证原件扫描件（复印件需加盖公章）,支持上传pdf、png、jpeg,多次上传，保留最新的上传内容(文件大小不超过1M)
              </div>
            </el-upload>
            <a @click="dialogImgBVisible = true">范例：医疗机构执业许可证.jpg</a>
          </el-form-item>
          <el-dialog title="图片验证码" :visible.sync="imgCodePop" width="700px">
            <el-form-item label="图片验证码" prop="imgCode" class="uploadImg tipSpace" label-width="200px">
              <div class="imgIdCode">
                <div class="imgCode">
                  <img :src="codeUrl" />
                </div>
                <el-button slot="reference" type="text" @click="freshCode()">看不清楚？换一张</el-button>
              </div>
              <el-input autofocus placeholder="图片验证码" v-model="authenForm.imgCode" class="width215">
              </el-input>
            </el-form-item>
            <p class="entryTip" style="margin-left:200px;">请输入图形验证码，不区分大小写</p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="imgCodePop = false;clearPictureCode()">取 消</el-button>
              <el-button type="primary" @click="imgCodePop = false; sendMsgCode();">确 定</el-button>
            </span>
          </el-dialog>
          <el-form-item label="机构认证需验证手机号">{{userGatewayInfo.phone}}&nbsp;&nbsp;<span style="color:#999;">不是本人手机号？请检查登录账号，使用本人账号登录</span></el-form-item>
          <el-form-item label="短信验证码" prop="dxCode" class="tipSpace">
            <el-input placeholder="短信验证码" v-model="authenForm.dxCode" class="width215" @change="addMsgCode">
            </el-input>
            <el-button type="primary" size="small" class="getCode" :class="{'grayBtn':boolA}" @click="getPictureCode();imgCodePop = true;"
              :disabled="boolA" v-model="getCode">{{getCode}}
            </el-button>
          </el-form-item>
          <p class="entryTip">请查收手机短信，并填写短信中的验证码</p>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('authenForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="查看大图" :visible.sync="imgDlgVisible">
      <div class="textAlignCenter">
        <img :src="LargeImgSrc">
      </div>
    </el-dialog>
    <el-dialog custom-class="checkImg" title="范例" :visible.sync="dialogImgVisible">
      <img src="../../assets/img/orgCodeA.png" />
      <p class="middleIns">组织机构代码.jpg</p>
      <img src="../../assets/img/orgCodeB.png" />
      <p>三证合一或者五证合一后的证件</p>
    </el-dialog>
    <el-dialog custom-class="checkImg" title="范例" :visible.sync="dialogImgBVisible">
      <img src="../../assets/img/examplePlfmi.png" />
      <p>医疗机构执业许可证.jpg</p>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%">
      <span>请上传组织机构代码证明证件及医疗机构执业许可证</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="alreadyDialogVisible" width="30%">
      <span>该组织机构代码已认证，如有疑问请联系客服</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alreadyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="alreadyDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from "vuex";

  import region from "../../components/region";

  export default {
    components: {
      region
    },
    data() {
      var validateAbbrName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("机构简称不能为空"));
        } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) ||
          this.authenForm.abbrName.toString().length > 20
        ) {
          return callback(
            new Error("请检查机构简称格式，20位字符以内，限中文、数字或字母")
          );
        }
        return callback();
      };
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("机构名称不能为空"));
        } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
          return callback(new Error("请检查机构名称格式，限中文、数字或字母"));
        }
        return callback();
      };
      var validateAuthCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("组织机构代码不能为空"));
        } else if (!/^([A-Za-z0-9-])+$/.test(value) || (this.authenForm.authCode.toString().length != 10 && this.authenForm
            .authCode.toString().length != 18)) {
          return callback(
            new Error(
              "请检查组织机构代码格式，9位组织机构代码，如12345678-9；或18位的统一社会信用代码"
            )
          );
        }
        return callback();
      };
      var validateLicenceNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("医疗机构执业许可证登记号不能为空"));
        } else if (!/^[a-zA-Z0-9]+$/.test(value) ||
          this.authenForm.licenceNumber.toString().length !== 22
        ) {
          return callback(
            new Error("请检查医疗机构执业许可证登记号格式，限22位数字或者字母")
          );
        }
        return callback();
      };
      return {
        type: this.$route.params.type,
        authenForm: {},
        // provinces: [], //绑定省份代码
        // cities: [], //绑定城市代码
        // areas: [], //绑定区域代码
        test: "",
        timer: null,
        boolA: false,
        countNum: 60,
        getCode: "获取验证码",
        LargeImgSrc: "",
        imgCodePop: false,
        hasMenuChange: false,
        imgDlgVisible: false,
        dialogImgVisible: false,
        dialogImgBVisible: false,
        centerDialogVisible: false,
        leaveDialogVisible: false,
        alreadyDialogVisible: false,
        htOptions: [],
        codePro: "",
        codeCity: "",
        codeArea: "",
        rules: {
          abbrName: [{
              message: "请检查机构简称格式，20位字符以内，限中文或字母机构",
              trigger: "blur"
            },
            {
              validator: validateAbbrName,
              trigger: "blur"
            }
          ],
          name: [{
              message: "请检查机构名称格式，限中文或字母",
              trigger: "blur"
            },
            {
              validator: validateName,
              trigger: "blur"
            }
          ],
          projectCategory: [{
            required: true,
            message: "请选择机构类别",
            trigger: "blur"
          }],
          address: [{
            required: true,
            message: "机构地址不能为空",
            trigger: "blur"
          }],
          authCode: [{
              message: "请检查组织机构代码格式，9位组织机构代码，如12345678-9；或18位的统一社会信用代码",
              trigger: "blur"
            },
            {
              validator: validateAuthCode,
              trigger: "blur"
            }
          ],
          licenceNumber: [{
              message: "医疗机构执业许可证登记号不能为空",
              trigger: "blur"
            },
            {
              validator: validateLicenceNumber,
              trigger: "blur"
            }
          ],
          imgCode: [{
            required: true,
            message: "请检查图片验证码是否正确",
            trigger: "blur"
          }],
          dxCode: [{
            required: true,
            message: "请检查短信验证码是否正确",
            trigger: "blur"
          }]
        },
        p1: [],
        p2: [],
        error: "审核失败"
      };
    },
    computed: {
      ...mapState({
        hosptialCategoryList: state => state.application.hosptialCategory,
        provinceList: state => state.application.provinces,
        cityList: state => state.application.citys,
        areasList: state => state.application.areas,
        codeUrl: state => state.user.codeUrl,
        smsState: state => state.user.smsState,
        pictureUrl: state => state.application.pictureUrl,
        isMsgRight: state => state.user.isMsgRight,
        userGatewayInfo: state => state.user.userGatewayInfo,
        platformHospitalByGateway: state => state.application.platformHospital
      }),
      ...mapGetters({})
    },
    deactivated: function () {
      this.leaveDialogVisible = true;
    },
    async created() {
      await this.$store.dispatch({
        type: "getHosptialCategory"
      });
      await this.$store.dispatch({
        type: "getUserGateway"
      });
      if (this.type == "edit") {
        // TODO 编辑操作
        let res = await this.$store
          .dispatch({
            type: "getPlatformHospitalByGatewayInfo"
          })
        this.p1 = JSON.parse(res.data.codeUrl);
        this.p2 = JSON.parse(res.data.licenceUrl);
        this.authenForm = JSON.parse(JSON.stringify(res.data));
      }
    },
    mounted() {
      window.onbeforeunload = function (e) {
        //console.log(e)
        var dialogText = '确定要离开此页吗？';
        e.returnValue = dialogText;
        return dialogText;
      };
    },
    methods: {
      ...mapActions(["set_orgname"]),
      //图片验证
      beforeAvatarUpload(file) {
        const isType = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg');
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isType) {
          this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1M!');
        }
        return isType && isLt1M;
      }, //上传图片 机构代码文件
      async imgurlRequest(res) {
        let form = new FormData();
        form.append("file", res.file);
        await this.$store.dispatch({
          type: "uploadPicture",
          form: form
        });
        if (this.$store.state.application.pictureUrl) {
          this.p1.push({
            name: res.file.name,
            url: this.$store.state.application.pictureUrl
          });
          if (this.p1.length == 2) {
            this.p1.shift()
          };
          this.$message.success("图片上传成功");
          return;
        }
        this.$message.error("图片上传失败");
      },
      //图片超出数量提醒
      limitFile(file, fileList) {
        this.$message.error("上传的图片最多一张，请删除之后再重新上传");
      },
      //删除图片
      handleRemove(file, fileList) {
        this.p1 = fileList;
      },
      //上传图片 医疗机构执业许可证文件
      async imgurlRequest2(res) {
        let form = new FormData();
        form.append("file", res.file);
        await this.$store.dispatch({
          type: "uploadPicture",
          form: form
        });
        if (this.$store.state.application.pictureUrl) {
          this.p2.push({
            name: res.file.name,
            url: this.$store.state.application.pictureUrl
          });
          if (this.p2.length == 2) {
            this.p2.shift()
          };
          this.$message.success("图片上传成功");
          return;
        }
        this.$message.error("图片上传失败");
      },
      //删除图片
      handleRemove2(file, fileList) {
        this.p2 = fileList;
      },
      /**
       * 刷新图形验证码
       */
      async freshCode() {
        await this.$store.dispatch({
          type: "pictureCode",
          phone: this.$store.getters.userGatewayInfo.phone,
          purpose: "99"
        });
      },
      //获取短信验证码
      async sendMsgCode() {
        await this.$store.dispatch({
          type: "sendMsgCode",
          msgInfo: {
            phone: this.$store.getters.userGatewayInfo.phone,
            picture_code: this.authenForm.imgCode,
            purpose: "99"
          }
        });
        this.getCodeBtn();
      },
      //检查图形验证码是否填写
      addMsgCode() {
        if (!this.authenForm.imgCode) {
          this.authenForm.dxCode = '';
          this.$message.warning("请先获取短信验证码");
        }
      },
      checkBigImg(file) {
        this.imgDlgVisible = true;
        this.LargeImgSrc = this.file.url;
      },
      //提交机构
      async submitForm(formName) {
        await this.$refs[formName].validate(valid => {
          if (!valid) {
            return false;
          } else {
            if (!this.authenForm.provinceCode || !this.authenForm.cityCode || !this.authenForm.areaCode) {
              this.$message.warning("请选择机构地址的省市区信息");
              return false;
            }
            if (this.p1.length == 0 || this.p2.length == 0) {
              this.centerDialogVisible = true;
              return false;
            }
            this.hasMenuChange = false;
            //验证短信验证码
            this.$store.dispatch({
              type: "checkMsgCode",
              msgCodeInfo: {
                phone: this.$store.getters.userGatewayInfo.phone,
                msg_code: this.authenForm.dxCode,
                purpose: "99"
              }
            }).then(() => {
              if (!this.$store.getters.isMsgRight) {
                return false;
              }
              this.authenForm.codeUrl = JSON.stringify(this.p1);
              this.authenForm.licenceUrl = JSON.stringify(this.p2);
              let platformHospitalId;
              if (this.type == "add") {
                this.$store.dispatch({
                  type: "submitPlatformHospital",
                  authenForm: this.authenForm
                }).then(res => {
                  platformHospitalId = res.data;
                  this.$store
                    .dispatch({
                      type: "userBindPlatformHospital",
                      BindRequestInfo: {
                        org_id: platformHospitalId
                      }
                    })
                    .then(() => {
                      this.$store.dispatch({
                        type: "chooseOrg",
                        req: {
                          org_id: platformHospitalId
                        }
                      });
                    })
                    .then(() => {
                      this.set_orgname(this.authenForm.name);
                    })
                    .then(() => {
                      this.$store.dispatch({
                        type: "listOrganization"
                      });
                      this.$router.push({
                        path: "/authentication/authenStepThree/add"
                      });
                    });
                });
              }
              if (this.type == "edit") {
                this.$store
                  .dispatch({
                    type: "userPatchPlatformHospital",
                    pathAuthenForm: this.authenForm
                  })
                  .then(() => {
                    this.set_orgname(this.authenForm.name);
                    this.$store.dispatch({
                      type: "listOrganization"
                    });
                    this.$router.push({
                      path: "/authentication/authenStepThree/add"
                    });
                  });
              }
            });
          }
        });
      },
      // 清除图形验证码输入框
      clearPictureCode() {
        this.authenForm.imgCode = "";
      },
      // 获取短信验证码倒计时
      getPictureCode() {
        if (this.authenForm.imgCode) {
          this.authenForm.imgCode = "";
        }
        this.$store.dispatch({
          type: "pictureCode",
          phone: this.$store.getters.userGatewayInfo.phone,
          purpose: "99"
        });
      },
      // 获取短信验证码倒计时
      getCodeBtn() {
        let self = this;
        if (self.countNum < 1) {
          self.countNum = 60;
          self.boolA = false;
          self.getCode = "重新获取";
        } else {
          self.countNum--;
          self.boolA = true;
          self.getCode = "重新发送(" + self.countNum + ")";
          setTimeout(function () {
            self.getCodeBtn();
          }, 1000);
        }
      }
    },
    // 组件内导航钩子，处理表单未保存退出的情况
    beforeRouteLeave: function (to, from, next) {
      if (this.hasMenuChange) {
        next(false);
        setTimeout(() => {
          this.$confirm("系统将不会保存您所做的更改，确定要离开此页吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            // 选择确定
            next();
          });
        }, 20)
      } else {
        next();
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "authentication.scss";

  a {
    display: inline-block;
    margin-left: 20px;
  }

  .el-upload-list {
    width: 60%;
  }

</style>
